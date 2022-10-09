<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseBill="chooseBill"
				@chooseCustomer="chooseCustomer">
			</edit-form>
		</view>
		<view v-if="chooseTempalte.length">
			<sales-billing v-for="item in chooseTempalte" :id="item" :ref="`billTable-${item}`" :key="item"
				:template-data="templateObj[item]" :sysSpecificationClassifyData="sysSpecificationClassifyData"
				:customer-id="customerId" @changeTable="changeTable" @click.native="getTempKey(item)" />
		</view>
		<!-- ====运输信息==== -->
		<delivery ref="delivery" type="biz" :pick-modes="pickMode" :addressObj="addressObj" @change="changeDelivery" charge-mode="1" />
		<!-- 折扣 -->
		<discount ref="discount" :org-id="orgIdShipment" :dis-count-tag="disCountTag" :integral-tag="integralTag"
			:coupon-tag="couponTag" :customer-id="customerId" :goods-detail-id-str="goodsDetailIdStr"
			:total-money-all="totalMoneyTwoAll" :integral-use="integralUse" @change="changeDiscount" />
		<!-- ==========结算信息=========== -->
		<view class="block">
			<view class="block-head">{{$t('salesMg.common.countInfoTle')}}</view>
			<view class="block-box">
				<view class="item">
					<view class="label">{{$t('salesMg.common.totalFee')}}：</view>
					<view class="content">{{totalChargeMoneyAll}}</view>
				</view>
				<view class="item">
					<view class="label">{{$t('salesMg.common.totalOrderMoney')}}：</view>
					<view class="content">{{totalMoneyOrderAll}}</view>
				</view>
				<view class="item">
					<view class="label">{{$t('salesMg.common.totalMoney')}}：</view>
					<view class="content">{{totalMoneyTwoAll}}</view>
				</view>
				<view class="item">
					<view class="label">{{$t('salesMg.common.dicountMoney')}}：</view>
					<view class="content">{{couponMoneyAll}}</view>
				</view>
				<view class="item">
					<view class="label">{{$t('salesMg.common.payMoney')}}：</view>
					<view class="content">{{totalMoneyAll}}</view>
				</view>
			</view>
			<view class="block-box">
				<view class="item">
					<view class="label">{{$t('salesMg.common.remarks.label')}}：</view>
					<view class="content fill">
						<textarea :placeholder="$t('salesMg.common.remarks.placeholder')" v-model="remarks"></textarea>
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button :text="$t('salesMg.common.btn.save')" @click="saveData(1)" type="primary" hairline shape="circle"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		createUniqueString
	} from '@/utils'
	import {
		salesTransferTemplateFindByOrgId,
		purSupplierFindById
	} from '@/api/lpgSalesManageApi'
	import { sysOrgFindById, userCustomerFindByIdList } from '@/api/lpgManageAppApi'
	import SalesBilling from '@/salesManage/placeOrder/common/salesBilling.vue'
	import settlement from '@/salesManage/placeOrder/common/settlement.vue'
	import Discount from '@/salesManage/placeOrder/common/discount.vue'
	import delivery from '@/salesManage/placeOrder/common/delivery.vue'
	export default {
		mixins: [settingMixin],
		props: {

		},
		components: {
			SalesBilling,
			settlement,
			delivery,
			Discount
		},
		data() {
			return {
				formDataSource: [{
						type: 'picker',
						labelText: '业务组织',
						fieldName: 'orgId',
						placeholder: '请选择业务组织',
						options: [],
						required: true,
						rules: [{
							required: true,
							message: '请选择业务组织',
							trigger: ['change', 'blur']
						}]
					}, {
						type: 'datetime',
						labelText: '开单时间',
						fieldName: 'billTimeStr',
						placeholder: '选择开单时间',
						options: [],
						required: true,
						rules: [{
							required: true,
							message: '选择开单时间',
							trigger: ['change', 'blur']
						}]
					}, {
						type: 'picker',
						labelText: '出入库原因',
						fieldName: 'inOutReasonId',
						placeholder: '选择出入库原因',
						options: [],
						required: true,
						rules: [{
							required: true,
							message: '选择出入库原因',
							trigger: ['change', 'blur']
						}]
					}, {
						type: 'picker',
						labelText: '业务类型',
						fieldName: 'businessTypeId',
						placeholder: '选择业务类型',
						options: [],
						required: true,
						rules: [{
							required: true,
							message: '选择业务类型',
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'actionSheet',
						labelText: '往来类型',
						fieldName: 'formType',
						placeholder: '请选择往来类型',
						required: true,
						options: [{
								name: '客户',
								value: '1'
							},
							{
								name: '供应商',
								value: '2'
							},
							{
								name: '组织',
								value: '3'
							}
						],
						rules: [{
							required: true,
							message: '请选择往来类型',
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'chooseBtn',
						labelText: '来源名称',
						fieldName: 'customerName',
						placeholder: '请选择来源名称',
						required: true,
						func: 'chooseCustomer',
						rules: [{
							required: true,
							message: '请选择来源名称',
							trigger: ['change', 'blur']
						}],
						show: false,
					},
					{
						type: 'chooseBtn',
						labelText: '关联单号',
						fieldName: 'linkBillNo',
						placeholder: '请选择关联单号',
						func: 'chooseBill',
						borderBottom: false,
					}
				],
				formDataValue: {},
				tempKey: null,
				linkId: '',
				linkTypes: '',
				customerId: '',
				templateType: 2,
				templateObj: {}, // 模板列表
				chooseTempalte: [], // 选中的模板
				disCountTag: 1, // 是否有折扣标签
				integralTag: 1, // 是否有积分标签
				couponTag: 1, // 是否有优惠券标签
				decimalNum: '', // 保留位数，
				decimalMode: '', // 保留小数方式
				// =========
				goodsDetailIdStr: [], // 所有商品id（优惠券用到）
				allShop: [], // 所有填写的商品
				totalMoneyOrderAll: 0, // 订单合计
				totalMoneyTwoAll: 0, // 总合计
				totalChargeMoneyAll: 0, // 收费项
				couponMoneyAll: 0, // 优惠金额
				totalMoneyAll: 0, // 应收金额
				remarks: '',
				pickMode: '3',
				orgIdShipment: '',
				integralUse: 0,
				addressObj: {},
			}
		},
		// 过滤器
		filters: {},
		computed: {

		},
		async created() {

		},
		async mounted() {

		},
		async onLoad(options) {
			this.editId = options.editId || ''
			if (this.editId) {
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleTextEdit')
				});
				// await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('业务开单')
				});
			}
			// 子单添加商品
			uni.$on('chooseGoods', (data) => {
				this.$refs[`billTable-${this.tempKey}`][0].initGoodData(data)
			})
			await this.init()
		},
		onUnload() {},
		onShow() {
			uni.$once('chooseBill', async (res) => {
				if (res) {
					this.linkId = res.billId
					this.linkTypes = res.billType
					this.formDataSource[5].show = true
					this.customerId = res.customerId
					let obj = {
						linkBillNo: res.billNo,
						customerName: res.customerName,
						formType: (res.formType).toString()
					}
					this.formDataValue = {
						...this.formDataValue,
						...obj
					}
				}
			})
			uni.$once('chooseCustomer', (data) => {
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.customerName)
			})
			// 添加监听事件
			uni.$once('chooseOrg', (data) => {
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.name)
			})
			// 添加监听事件
			uni.$once('chooseSupplier', (data) => {
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.supplierName)
			})
		},
		methods: {
			// 查询地址
			async getAddress() {
				if (this.formDataValue.formType == 1) {
					// 客户地址
					const {
						returnValue: res
					} = await userCustomerFindByIdList({
						id: this.customerId
					})
					if (res) {
						// 配送地址
						this.addressObj = res.userAddress
						this.integralUse = res.userSettlement.integralUse
					}
				} else if (this.formDataValue.formType == 2) {
					// 供应商地址
					const {
						returnValue: res
					} = await purSupplierFindById({
						id: this.customerId
					})
					if (res) {
						this.addressObj = res
					}
				} else if (this.formDataValue.formType == 3) {
					// 组织地址
					const {
						returnValue: res
					} = await sysOrgFindById({
						id: this.customerId
					})
					if (res) {
						this.addressObj = res
					}
				}
			},
			// 订单折扣改变
			changeDiscount(data) {
				this.couponMoneyAll = data.couponMoneyAll // 优惠金额
				this.totalMoneyAll = data.discountDeal // 应收金额
			},
			// 物流信息改变
			changeDelivery(data) {
				this.totalMoneyCalculate()
			},
			// 获取所有商品
			getAllShop() {
				const allShop = []
				const goodsDetailIdStr = []
				// 遍历选择的模板
				this.chooseTempalte.forEach((v) => {
					if (this.$refs[`billTable-${v}`][0]) {
						this.$refs[`billTable-${v}`][0].getShop((data) => {
							allShop.push(data)
						})
					}
				})
				this.allShop = allShop
				// 遍历所有商品获取商品id
				this.allShop.forEach((v) => {
					v.data.forEach((m) => {
						if (m.amount) {
							const findIndex = goodsDetailIdStr.findIndex(item => item.goodsId === m
								.goodsId)
							if (findIndex === -1) {
								// 没有重复的id
								goodsDetailIdStr.push({
									goodsId: m.goodsId,
									totalMoney: m.totalMoney
								})
							} else {
								goodsDetailIdStr[findIndex].totalMoney = this.$bigDecimal.round(this
									.$bigDecimal.add(m.totalMoney, goodsDetailIdStr[findIndex]
										.totalMoney), 2)
							}
						}
					})
				})
				this.goodsDetailIdStr = goodsDetailIdStr
			},
			// 计算收费项
			payTotalMoney() {
				// 查询所有商品
				this.getAllShop()
				// 获取标记商品的数量
				var num = 0
				this.allShop.forEach((v) => {
					v.data.forEach((m) => {
						if (m.isCostTag && m.amount) {
							num = this.$bigDecimal.add(num, m.amount)
						}
					})
				})
				this.$refs.delivery.payTotalMoney(num)
			},
			// 计算
			totalMoneyCalculate() {
				const payData = this.$refs.delivery.getPayData()
				// 计算收费项
				this.payTotalMoney()
				let totalChargeMoneyAll = 0 // 合计收费项
				let totalMoneyOrderAll = 0 // 合计订单金额
				// 商品订单金额
				this.allShop.forEach((v) => {
					totalMoneyOrderAll = this.$bigDecimal.round(this.$bigDecimal.add(totalMoneyOrderAll, v
						.totalMoney), 2)
				})
				// 收费项
				payData.choosePayItemsData.forEach((v) => {
					if (v.isChoose) {
						totalChargeMoneyAll = this.$bigDecimal.round(this.$bigDecimal.add(totalChargeMoneyAll, v
							.totalMoney), 2)
					}
				})
				// 记录
				this.totalChargeMoneyAll = totalChargeMoneyAll // 收费项
				this.totalMoneyOrderAll = totalMoneyOrderAll // 订单合计
				console.log(this.totalMoneyOrderAll)
				this.totalMoneyTwoAll = this.$bigDecimal.round(this.$bigDecimal.add(totalChargeMoneyAll,
					totalMoneyOrderAll), 2) // 总合计
			},
			// 模板商品数据改变
			changeTable() {
				// 计算
				this.totalMoneyCalculate()
			},
			getTempKey(key) {
				this.tempKey = key
			},
			async init() {
				// 获取应用组织
				await this.getOrgList()
				this.formDataSource[0].options = this.orgList
				this.$set(this.formDataValue, 'orgId', this.userInfo.orgId)
				// 出入库原因
				await this.getStockInoutReason()
				this.formDataSource[2].options = this.stockInoutReason
				// 获取业务类型
				await this.getBusinessTypeList()
				this.formDataSource[3].options = this.businessTypeList
				// 销售单基础设置
				this.orgIdShipment = this.userInfo.orgId
				// 获取规格
				await this.getSysSpecificationClassifySelectPropertyBox()
				// 获取模板
				await this.getTransferTemplate(this.orgIdShipment)
				this.totalMoneyCalculate()
			},
			// 获取组织模板
			async getTransferTemplate(id) {
				const {
					returnValue: res
				} = await salesTransferTemplateFindByOrgId({
					orgId: id,
					templateType: this.templateType
				})
				if (res) {
					// 模板对象
					this.transferTemplateObj = res
					this.disCountTag = res.disCountTag
					this.integralTag = res.integralTag
					this.couponTag = res.couponTag
					this.decimalNum = res.decimalNum // 保留位数，
					this.decimalMode = res.decimalMode // 保留小数方式，
					this.formDataValue = {
						inOutReasonId: res.outReasonId, // 默认出入库原因
						businessTypeId: res.businessTypeId // 默认业务类型
					}
					const arr = [res.id]
					arr.forEach(async (item, index) => {
						if (!this.templateObj[item]) {
							// 查询模板详情
							await this.getTemplateDetail(res)
						}
					})
					// 默认选中
					this.chooseTempalte = arr
				}
			},
			// 获取子单模板详情
			async getTemplateDetail(o) {
				let goodsCustomerDate = ''
				// 处理数据
				o.templateId = o.id
				o.id = '' // 清除id
				o.decimalNum = this.decimalNum
				o.decimalMode = this.decimalMode
				o.tableColumn = o.printSetVo.tableColumn
				o.goodsVoList.forEach(v => {
					v.ids = createUniqueString()
					// 商品的结算辅助单位
					v.templateGoodsAssistList = []
					// 遍历辅助单位初始值
					o.templateAssistUnitsList.forEach((l) => {
						// 商品辅助单位值
						v.templateGoodsAssistList.push({
							assistUnitsId: l.assistUnitsId,
							salesUnitsId: l.salesUnitsId, // 销售单位id
							settleUnitsId: l.settleUnitsId, // 结算单位id
							numValue: '', // 辅助单位值
							changeValue: l.changeValue
						})
						// 用表头造table数据的初始字段 初始值为空
						o.tableColumn.forEach(m => {
							if (m.propValue === 'assistName-' + l.assistUnitsId) {
								v[m.propValue] = ''
							}
							if (m.propValue === 'netContent-' + l.assistUnitsId) {
								v[m.propValue] = ''
							}
						})
					})
					// 有辅助单位数据，回填
					if (v.assistUnitsList.length) {
						v.templateGoodsAssistList.forEach((l) => {
							// 遍历商品辅助单位默认值
							v.assistUnitsList.forEach((n) => {
								if (l.assistUnitsId === n.assistUnitsId) {
									l.numValue = n.netContent // 表头辅助单位值
								}
							})
						})
					}
					// 回填表头 有返回值，填返回值，否则填默认值
					let isWeight = false // 重量值是否匹配过，多条默认匹配第一条
					v.templateGoodsAssistList.forEach((l) => {
						// 遍历商品辅助单位默认值
						v.defaultAssistUnitsList.forEach((n) => {
							if (l.assistUnitsId === n.assistUnitsId) {
								// 遍历表头显示字段
								o.tableColumn.forEach(m => {
									if (m.propValue === 'assistName-' + n
										.assistUnitsId) {
										v[m.propValue] = n.unitsName // 回填商品辅助单位的 单位
									}
									if (m.propValue === 'netContent-' + n
										.assistUnitsId) {
										if (l.numValue) {
											// 有保存的值
											v[m.propValue] = l.numValue
											// 基本单位的id 等于 结算数量的单位 id
											if (l.settleUnitsId === v.unitsId && !
												isWeight) {
												isWeight = true
												// 重量值 = 乘 转换值
												v.weight = this.$bigDecimal.multiply(v[
														m.propValue], l
													.changeValue)
											}
										} else {
											// 没有保存的值，回填默认值
											v[m.propValue] = n.netContent
											// 回填商品辅助单位的 计量值
											l.numValue = n
												.netContent // 表头辅助单位值（提交的时候用）
											// 基本单位的id 等于 结算数量的单位 id
											if (l.settleUnitsId === v.unitsId && !
												isWeight) {
												isWeight = true
												// 重量值 = 乘 转换值
												v.weight = this.$bigDecimal.multiply(v[
														m.propValue], l
													.changeValue)
											}
										}
									}
								})
							}
						})
					})
				})
				o.tableData = o.goodsVoList
				// 模板对象
				this.templateObj[o.templateId] = o
			},

			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {

				})
			},
			// 选择客户
			chooseCustomer() {
				if (this.formDataValue.formType == 1) {
					// 客户
					this.goto('/infoManage/chooseCustomer/chooseCustomer', {
						customerId: this.customerId,
						orgId: this.userInfo.orgId
					})
				} else if (this.formDataValue.formType == 2) {
					// 供应商
					this.goto('/infoManage/chooseSupplier/chooseSupplier', {
						supplierId: this.customerId
					})
				} else if (this.formDataValue.formType == 3) {
					// 组织
					this.goto('/infoManage/chooseOrg/chooseOrg', {
						orgId: this.customerId
					})
				}
			},
			// 选择商品
			chooseGoods(index) {
				this.tempIndex = index
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					multiple: true
				})
			},
			// 表单
			async changeForm(e) {
				console.log(e)
				let params = e.queryParams
				if(e.name == 'customerName'||e.name=='linkBillNo'){
					this.getAddress()
				}
				if ((e.name == 'customerName' && (params.customerName != this.formDataValue.customerName)) || (e
						.name == 'formType' && (params.formType != this.formDataValue.formType))) {
					this.linkId = ''
					this.linkTypes = ''
					params.linkBillNo = ''
				}
				if (!params.inOutReasonId) {
					this.$refs.dialogForm.resetPicker('inOutReasonId', [0], [0])
				}
				if (!params.businessTypeId) {
					this.$refs.dialogForm.resetPicker('businessTypeId', [0], [0])
				}
				if ((e.name == 'formType' && params.formType && (params.formType != this.formDataValue.formType)) || (
						params.formType == 1 && e.name == 'orgId')) {
					this.formDataSource[5].show = true
					params.customerName = ''
					this.customerId = ''
					this.addressObj = {}
				}
				this.formDataValue = params
			},
			// 选择单据
			chooseBill() {
				this.$navigateTo('/infoManage/chooseBill/chooseBill', {
					billId: this.linkId,
					type: 'refundOrder'
				})
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.sk-info {
		padding: 30rpx 20rpx;
		>.btn {
			width: 632rpx;
			margin: 60rpx auto;
			@include flexMixin();
		
			.u-button {
				margin: 0rpx 10rpx;
			}
		}
		::v-deep .normalForm {
			.u-form {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				width: 710rpx;
				padding: 10rpx 10rpx;
				box-sizing: border-box;

				.u-form-item .u-line {
					border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
				}
			}

			::v-deep .u-upload__button {
				margin: 0rpx;
			}
		}

		.block {
			padding: 0 30rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			margin-top: 50rpx;

			.block-head {
				font-size: 36rpx;
				position: relative;
				height: 90rpx;
				line-height: 90rpx;
				display: flex;
				align-items: center;
				position: relative;
				padding-left: 10rpx;
				border-bottom: 1px solid #eee;

				&:before {
					display: block;
					content: '';
					height: 40rpx;
					width: 8rpx;
					border-radius: 8rpx;
					background: rgba(42, 130, 228, 1);
					position: absolute;
					left: -10rpx;
				}
			}

			.block-box {
				.item {
					display: flex;
					min-height: 88rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					color: #333;
					flex-wrap: wrap;
					border-bottom: 1px solid #eee;

					.label {
						min-width: 144rpx;
						height: 88rpx;
						line-height: 88rpx;

						&.bold {
							font-weight: bold;
						}
					}

					.content {
						flex: 1;
						width: 1px;
						display: flex;
						flex-wrap: wrap;

						&.fill {
							flex: auto;
							width: 100%;
							padding-bottom: 30rpx;

							textarea {
								background: rgba(247, 247, 247, 1);
								height: 105rpx;
								width: 100%;
								padding: 20rpx;
								font-size: 28rpx;
								border-radius: 10rpx;

							}
						}
					}

				}
			}
		}
	}
</style>
