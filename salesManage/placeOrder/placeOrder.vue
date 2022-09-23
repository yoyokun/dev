<template>
	<view class="sk-info">
		<view class="form">
			<edit-form 
				ref="dialogForm" 
				labelWidth="100" 
				classForm="normalForm" 
				:form-data-source="formDataSource"
				:form-data-value="formDataValue" 
				@change="changeForm" 
				@chooseAddress="chooseAddress"
				@chooseCustomer="chooseCustomer">
			</edit-form>
		</view>
		<view v-if="chooseTempalte.length">
			<sales-billing
				v-for="item in chooseTempalte"
				:id="item"
				:ref="`billTable-${item}`"
				:key="item"
				:property-id-str="propertyIdStr"
				:template-data="templateObj[item]"
				:sysSpecificationClassifyData="sysSpecificationClassifyData"
				:bill-type="billType"
				:goods-customer-date="orderTime"
				:customer-id="customerId"
				:is-settle="isSettle"
				@changeTable="changeTable"
			/>
		</view>
		<view class="btn">
			<u-button :text="'结算'" type="success" hairline shape="circle" plain></u-button>
			<u-button :text="'结算'" type="warning" hairline shape="circle" plain>
			</u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import { settingMixin } from '@/common/settingMixin.js'
	import { salesOrderTemplateFindList, salesPayItemsFindList, moduleCommonSetFindByOrgId, salesOrderTemplateFindDataByTemplate } from '@/api/lpgSalesManageApi'
	import { userCustomerFindByIdList } from '@/api/lpgManageAppApi'
	import { createUniqueString, positiveInteger } from '@/utils'
	import { getTodayDate } from '@/utils/util.js'
	import SalesBilling from '@/salesManage/placeOrder/common/salesBilling.vue'
	export default {
		mixins: [settingMixin],
		components: {
			SalesBilling
		},
		props: {

		},
		data() {
			return {
				orderSourceParam: '', // 订单来源 有网上订单 呼叫中心订单 门店订单等
				billType: 1, // 开单类型 1正常开单，2补录单 3电话订单 4客服中心电话订单
				isSettle: false, // 是否结算 结算不可以改单，只能改结算方式
				orderTime: '', // 开单时间 用来做补录单
				formDataSource: [
					{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.placeOrder.form.customerName.label'),
						fieldName: 'customerName',
						placeholder: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
						options: [],
						lIcon: '/static/image/plo1.png',
						func: 'chooseCustomer',
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.placeOrder.form.address.label'),
						fieldName: 'address',
						lIcon: '/static/image/plo4.png',
						placeholder: this.$t('salesMg.placeOrder.form.address.placeholder'),
						func: 'chooseAddress'
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.placeOrder.form.linkMan.label'),
						fieldName: 'linkMan',
						placeholder: this.$t('salesMg.placeOrder.form.linkMan.placeholder'),
						lIcon: '/static/image/plo2.png',
						disabled: true
					},
					{
						type: 'number',
						labelText: this.$t('salesMg.placeOrder.form.phone.label'),
						fieldName: 'phone',
						placeholder: this.$t('salesMg.placeOrder.form.phone.placeholder'),
						lIcon: '/static/image/plo3.png',
						disabled: true
					},
					{
						type: 'multiple',
						labelText: this.$t('salesMg.placeOrder.form.orderTemp.label'),
						fieldName: 'templateId',
						placeholder: this.$t('salesMg.placeOrder.form.orderTemp.placeholder'),
						lIcon: '/static/image/plo5.png',
						showOptions: false,
						options: [],
						disabled: false,
						required: true,
						borderBottom: false,
						rules: [{
							type: 'array',
							required: true,
							message: this.$t('salesMg.placeOrder.form.orderTemp.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
				],
				formDataValue: {},
				customerId: '', // 用户id
				customerInfo: null, // 用户对象
				propertyIdStr: '', // 客户属性id
				orderType: '', // 客户开单方式
				addressId: '', // 地址id
				addressObj: {} ,// 地址对象
				collectionTypeId: '', // 支付方式
				pickMode: 4 ,// 提货方式
				licenseNumArr: [], // 车牌号码
				integralUse: '' ,// 客户积分
				settleTag: 1, // 是否有结算标签
				disCountTag: 1, // 是否有折扣标签
				integralTag: 1, // 是否有积分标签
				couponTag: 1, // 是否有优惠券标签
				decimalNum: '', // 保留位数，
				decimalMode: '', // 保留小数方式
				choosePayItemsData: [] ,// 收费项
				templateObj: {}, // 模板列表
				chooseTempalte: [], // 选中的模板
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
			this.orderSourceParam = options.orderSourceParam || ''
			this.billType = options.billType || 1
			this.isSettle = options.isSettle || false
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.placeOrder.titleText')
			})
			this.init()
		},
		onShow() {
			// 选择地址
			uni.$once('chooseAddress', (data) => {
				if (data.id == this.addressId) {
					return
				}
				this.addressId = data.id
				this.formDataValue = {
					address: this.$options.filters.addressSplicing(data),
					linkMan: data.linkman,
					phone: data.phone,
				}
			})
			// 选择客户
			uni.$once('chooseCustomer', async (data) => {
				if (data.id == this.customerId) {
					return
				}
				this.customerId = data.id
				// 获取客户信息
				await this.getCustomerInfo(this.customerId)
			})
		},
		onUnload() {
			uni.$off('chooseAddress')
			uni.$off('chooseCustomer')
		},
		methods: {
			// 初始化
			async init() {
				// 销售单基础设置
				await this.handleDelivery()
				// 获取配送点
				await this.getOrgListType({})
				// 获取收费项
				await this.getPayItems()
				// 获取规格
				await this.getSysSpecificationClassifySelectPropertyBox()
			},
			// 销售单基础设置，查询是否可以结算，折扣，优惠券，积分抵扣
			async handleDelivery() {
				const { returnValue: res } = await moduleCommonSetFindByOrgId({ subModuleType: 'salesOrder', moduleType: 'sales' })
				if (res) {
					this.settleTag = res.settleTag // 结算开关
					this.disCountTag = res.disCountTag // 折扣开关
					this.integralTag = res.integralTag // 积分开关
					this.couponTag = res.couponTag // 优惠券开关
					this.decimalNum = res.decimalNum // 保留位数，
					this.decimalMode = res.decimalMode // 保留小数方式，
				}
			},
			// 获取收费项
			async getPayItems() {
				const { returnValue: res } = await salesPayItemsFindList({ state: 1, itemType: this.orderSourceParam === 'internet' ? 2 : 1 })
				if (res) {
					const choosePayItemsData = []
					res.forEach((v) => {
						const obj = {
							itemName: v.itemName, // 收费项名称
							id: '',
							itemId: v.id, // 收费项id，
							startingMoney: v.startingMoney, // 收费项基础费用
							salesPayItemsDetailList: v.salesPayItemsDetailList, // 楼层费
							floor: 1, // 楼层
							chargeMoney: v.startingMoney, // 收费项价格（楼层费加基础费）自定义单价
							totalMoney: '', // 收费项总费用
							chargeMode: v.chargeMode, // 计费方式
							chargeTag: v.chargeTag, // 计费标记
							isChoose: false, // 是否选中
							disabled: false, // 是否可更改
							payItemsDataStr: JSON.stringify(v)
						}
						if (v.chargeMode === 2) {
							// 获取一楼的价格
							const findIndex = obj.salesPayItemsDetailList.findIndex(item => item.floor === obj.floor)
							// 按楼层 基础费加楼层费
							obj.chargeMoney = this.$bigDecimal.add(obj.startingMoney, obj.salesPayItemsDetailList[findIndex].floorFee)
							obj.disabled = true
						} else if (v.chargeMode === 3) {
							obj.disabled = true
						}
						choosePayItemsData.push(obj)
					})
					this.choosePayItemsData = choosePayItemsData
				}
			},
			// 选择客户
			chooseCustomer() {
				// 客户
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.customerId,
					orgId: this.userInfo.orgId
				})
			},
			// 选择地址
			chooseAddress() {
				if( this.customerId ) {
					this.goto('/infoManage/chooseAddress/chooseAddress', {
						customerId: this.customerId,
						addressId: this.addressId
					})
				}	
			},
			// 表单
			async changeForm(obj) {
				const queryParams = obj.queryParams
				const name = obj.name // 改变的字段
				if(name === 'templateId' && queryParams.templateId) {
					for(const key of queryParams.templateId) {
						if(!this.templateObj[key]) {
							// 查询模板详情
							await this.getTemplateDetail(key)
						}
					}
					// 选择了模板
					this.chooseTempalte = queryParams.templateId
				}
			},
			// 查询客户详情
			async getCustomerInfo(id) {
				const { returnValue: res } = await userCustomerFindByIdList({ id }, '加载中...')
				if (res) {
					this.customerInfo = res
					if (res.userAddress) {
						this.addressId = res.userAddress.id
						this.formDataValue = {
							address: this.$options.filters.addressSplicing(res.userAddress),
							customerName: res.customerName,
							linkMan: res.userAddress.linkman,
							phone: res.userAddress.phone,
						}
					} else if (!res.userAddress) {
						this.$refs.uToast.show({
							type: 'error',
							message: '该客户无地址，请添加！',
						})
					}
					// 客户的默认值
					this.collectionTypeId = res.userSettlement.collectionTypeId // 客户默认支付方式
					this.pickMode = res.userSettlement.pickMode ? res.userSettlement.pickMode : 4 // 提货方式
					this.licenseNumArr = res.userSettlement.licenseNum ? res.userSettlement.licenseNum.Split(',') : [] // 车牌号码
					this.integralUse = res.userSettlement.integralUse // 客户积分
					// 客户属性参数
					let propertyId = []
					propertyId.push(res.userSettlement.propertyIds)
					propertyId.push(res.userSettlement.salePropertyIds)
					propertyId.push(res.userSettlement.typeId)
					propertyId.push(res.userSettlement.regionId)
					// 过滤 null 空 undefined
					let propertyIdStr = propertyId.filter(item => item)
					this.propertyIdStr = [...new Set(propertyIdStr)].join(',')
					this.orderType = res.userSettlement.orderType
					// 获取模板
					await this.getTemplate()
				}
			},
			// 获取子单模板(客户的默认模板，客户价格)
			async getTemplate(chooseTempalte = '') {
				const { returnValue: res, returnObject } = await salesOrderTemplateFindList({
					state: 1,
					salesType: this.orderSourceParam === 'internet' ? 2 : 1,
				}, '加载中')
				// 子单模板多选
				const templateOption = []
				// 处理数据
				res.forEach((o) => {
					// 选择的内容
					templateOption.push({
						name: o.templateName,
						value: o.id,
						active: false
					})
				})
				this.formDataSource[4].options = templateOption
				
				if (chooseTempalte.length) {
					this.chooseTempalte = chooseTempalte
				} else {
					const arr = returnObject ? (returnObject.customerOrderTemplates ? returnObject.customerOrderTemplates.Split(',') : []) : []
					for(const key of arr) {
						if(!this.templateObj[key]) {
							// 查询模板详情
							await this.getTemplateDetail(key)
						}
					}
					// 默认选中
					this.chooseTempalte = arr
					this.formDataValue = {
						templateId: arr
					}
				}
			},
			// 获取子单模板详情
			async getTemplateDetail(id = '') {
				let goodsCustomerDate = ''
				// 处理日期，日期不同价格不同
				if (this.orderTime === '') {
					// 当前日期等于今日
					goodsCustomerDate = ''
				} else {
					goodsCustomerDate = this.orderTime
				}
				const { returnValue: o } = await salesOrderTemplateFindDataByTemplate({
					orderTypeIdstr: this.orderType,
					propertyIdStr: this.propertyIdStr,
					customerId: this.customerId,
					goodsCustomerDate,
					id
				}, '加载中')
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
									if (m.propValue === 'assistName-' + n.assistUnitsId) {
										v[m.propValue] = n.unitsName // 回填商品辅助单位的 单位
									}
									if (m.propValue === 'netContent-' + n.assistUnitsId) {
										if (l.numValue) {
											// 有保存的值
											v[m.propValue] = l.numValue
											// 基本单位的id 等于 结算数量的单位 id
											if (l.settleUnitsId === v.unitsId && !isWeight) {
												isWeight = true
												// 重量值 = 乘 转换值
												v.weight = this.$bigDecimal.multiply(v[m.propValue], l.changeValue)
											}
										} else {
											// 没有保存的值，回填默认值
											v[m.propValue] = n.netContent
											// 回填商品辅助单位的 计量值
											l.numValue = n.netContent // 表头辅助单位值（提交的时候用）
											// 基本单位的id 等于 结算数量的单位 id
											if (l.settleUnitsId === v.unitsId && !isWeight) {
												isWeight = true
												// 重量值 = 乘 转换值
												v.weight = this.$bigDecimal.multiply(v[m.propValue], l.changeValue)
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
				this.templateObj[id] = o
			},
			// 模板商品数据改变
			changeTable(){
				// 计算
				this.totalMoneyCalculate()
			},
			// 计算
			totalMoneyCalculate() {
				
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.sk-info {
		padding: 30rpx 20rpx;
		::v-deep .normalForm {
			// margin: 20rpx 20rpx;

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
		.btn {
			width: 632rpx;
			margin: 60rpx auto;
			@include flexMixin();

			.u-button {
				margin: 0rpx 10rpx;
			}
		}
	}
</style>
