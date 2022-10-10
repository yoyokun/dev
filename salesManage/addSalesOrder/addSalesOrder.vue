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
				@chooseCustomer="chooseCustomer">
			</edit-form>
		</view>
		<view v-if="chooseTempalte.length">
			<sales-billing
				v-for="item in chooseTempalte" :id="item" :ref="`billTable-${item}`"
				:key="item"
				:property-id-str="propertyIdStr"
				:template-data="templateObj[item]"
				:sysSpecificationClassifyData="sysSpecificationClassifyData"
				:bill-type="billType"
				:goods-customer-date="orderTime"
				:customer-id="customerId"
				:is-settle="isSettle"
				@changeTable="changeTable"
				@click.native="getTempKey(item)" />
		</view>
		<!-- ====运输信息==== -->
		<delivery
			ref="delivery"
			:customer-id="customerId"
			:pick-modes="pickMode"
			:address-obj="addressObj"
			@change="changeDelivery" />
		<!-- 折扣 -->
		<discount
			ref="discount"
			:is-settle="isSettle"
			:org-id="orgIdShipment"
			:dis-count-tag="disCountTag"
			:integral-tag="integralTag"
			:coupon-tag="couponTag"
			:customer-id="customerId"
			:goods-detail-id-str="goodsDetailIdStr"
			:total-money-all="totalMoneyTwoAll"
			:integral-use="integralUse"
			@change="changeDiscount" />
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
				<view class="item">
					<view class="label bold">{{$t('salesMg.common.countPay')}}：</view>
					<view class="content">{{totalMoneyAll}}</view>
				</view>
			</view>
			<settlement
				v-if="settleTag === 1 || isSettle"
				ref="settlement"
				:collection-type-id="collectionTypeId"
				:total-money-all="totalMoneyAll"
				:pay-data="payData" />
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
			<u-button :text="$t('salesMg.common.btn.pay')" @click="saveData(3)" type="primary" hairline shape="circle" plain></u-button>
			<!-- <u-button :text="'结算并打印'" @click="saveData(5)" type="success" hairline shape="circle" plain></u-button> -->
		</view>

		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		salesOrderTemplateFindOnlyList,
		moduleCommonSetFindByOrgId,
		salesOrderTemplateFindDataByTemplate,
		salesOrderSaveOrEdit,
		salesOrderFindById
	} from '@/api/lpgSalesManageApi'
	import {
		userCustomerFindByIdList,
	} from '@/api/lpgManageAppApi'
	import {
		createUniqueString,
		objectValueEmpty,
	} from '@/utils'
	import {
		UnixToDate
	} from '@/utils/util.js'
	import SalesBilling from '@/salesManage/placeOrder/common/salesBilling.vue'
	import settlement from '@/salesManage/placeOrder/common/settlement.vue'
	import Discount from '@/salesManage/placeOrder/common/discount.vue'
	import delivery from '@/salesManage/placeOrder/common/delivery.vue'
	export default {
		mixins: [settingMixin],
		components: {
			SalesBilling,
			settlement,
			delivery,
			Discount
		},
		props: {

		},
		data() {
			return {
				orderSourceParam: '', // 订单来源 有网上订单 呼叫中心订单 门店订单等
				billType: 1, // 开单类型 1正常开单，2补录单 3电话订单 4客服中心电话订单
				isSettle: false, // 是否结算 结算不可以改单，只能改结算方式
				orderTime: '', // 开单时间 用来做补录单
				formDataSource: [{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.common.form.customerName.label'),
						fieldName: 'customerName',
						placeholder: this.$t('salesMg.common.form.customerName.placeholder'),
						options: [],
						func: 'chooseCustomer',
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.common.form.customerName.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.common.form.linkMan.label'),
						fieldName: 'linkMan',
						placeholder: this.$t('salesMg.common.form.linkMan.placeholder'),
						disabled: true
					},
					{
						type: 'number',
						labelText: this.$t('salesMg.common.form.phone.label'),
						fieldName: 'phone',
						placeholder: this.$t('salesMg.common.form.phone.placeholder'),
						disabled: true
					},
					{
						type: 'multiple',
						labelText: this.$t('salesMg.common.form.orderTemp.label'),
						fieldName: 'templateId',
						placeholder: this.$t('salesMg.common.form.orderTemp.placeholder'),
						showOptions: false,
						options: [],
						disabled: false,
						required: true,
						borderBottom: false,
						rules: [{
							type: 'array',
							required: true,
							message: this.$t('salesMg.common.form.orderTemp.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
				],
				formDataValue: {},
				customerId: '', // 用户id
				customerInfo: null, // 用户对象
				propertyIdStr: '', // 客户属性id
				orderType: '', // 客户开单方式
				addressObj: {}, // 地址对象
				collectionTypeId: '', // 支付方式
				pickMode: '4', // 提货方式
				licenseNumArr: [], // 车牌号码
				integralUse: 0, // 客户积分
				settleTag: 1, // 是否有结算标签
				disCountTag: 1, // 是否有折扣标签
				integralTag: 1, // 是否有积分标签
				couponTag: 1, // 是否有优惠券标签
				decimalNum: '', // 保留位数，
				decimalMode: '', // 保留小数方式
				templateObj: {}, // 模板列表
				chooseTempalte: [], // 选中的模板
				tempKey: null,
				// =========
				goodsDetailIdStr: [], // 所有商品id（优惠券用到）
				allShop: [], // 所有填写的商品
				totalMoneyOrderAll: 0, // 订单合计
				totalMoneyTwoAll: 0, // 总合计
				totalChargeMoneyAll: 0, // 收费项
				couponMoneyAll: 0, // 优惠金额
				totalMoneyAll: 0, // 应收金额
				remarks: '',
				// =============
				callRecordId: '', // 电话id
				recordType: '', // 是否是补录单（0 否  1 是）
				telId: '', // 电话id
				orderSource: '', // 单据详情的订单来源
				billNo: '', // 单据号 补录单会用到
				pickModeId: '', // 配送方式的id
				editId: '',
				payData: [], // 收款数据
				orgIdShipment: '', // 单据的组织
				info: null, // 单据详情
			}
		},
		// 过滤器
		filters: {},
		computed: {

		},
		watch: {},
		async created() {

		},
		async mounted() {

		},
		async onLoad(options) {
			this.orderSourceParam = options.orderSourceParam || ''
			this.editId = options.editId || ''
			this.billType = options.billType || 1
			this.isSettle = options.isSettle || false
			uni.setNavigationBarTitle({
				title: this.$t(this.$t('salesMg.addSalesOrder.titleText'))
			})
			// 子单添加商品
			uni.$on('chooseGoods', (data) => {
				this.$refs[`billTable-${this.tempKey}`][0].initGoodData(data)
			})
			await this.init()
			if (this.editId) {
				// 编辑
				await this.getInfo(this.editId)
			}
		},
		onShow() {
			// 选择客户
			uni.$once('chooseCustomer', async(data) => {
				if (data.id === this.customerId) {
					return
				}
				this.customerId = data.id
				// 获取客户信息
				await this.getCustomerInfo(this.customerId)
			})
		},
		onUnload() {
			uni.$off('chooseCustomer')
			uni.$off('chooseGoods')
		},
		methods: {
			// 获取详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await salesOrderFindById({
					id
				})
				if (res) {
					// 回填客户
					this.customerId = res.customerId
					this.orderSource = res.orderSource
					this.callRecordId = res.callRecordId // 电话id
					this.recordType = res.recordType // 订单类型
					this.remarks = res.remarks
					// 写入折扣金额
					this.$refs.discount.getWrite(res)
					// 获取用户信息
					await this.getCustomerInfo(res.customerId)
					// 回填商品信息
					this.renderShop(res)
					// 回填运输信息
					await this.renderTransport(res)
					// 回填收费项
					this.renderPayItemsData(res)
					// 回填合计
					this.totalChargeMoneyAll = res.payItemsMoney // 收费项
					this.totalMoneyOrderAll = res.goodsTotalMoney // 订单合计
					this.totalMoneyTwoAll = this.$bigDecimal.round(this.$bigDecimal.add(res.payItemsMoney, res
						.goodsTotalMoney), 2) // 总合计
					this.payData = res.salesOrderPayDetailList // 结算信息
					this.info = res
				}
			},
			// 回填收费项
			renderPayItemsData(res) {
				this.$refs.delivery.writeData(res)
			},
			// 回填运输信息
			async renderTransport(res) {
				const salesOrderTransport = res.salesOrderTransport
				this.pickModeId = salesOrderTransport.id
				this.pickMode = salesOrderTransport.pickMode.toString() // 提货方式（1 自提 ，2 车辆自提 ，3 车辆配送 ，4 送气员配送
				const addressObj = {}
				addressObj.province = salesOrderTransport.province
				addressObj.city = salesOrderTransport.city
				addressObj.area = salesOrderTransport.area
				addressObj.address = salesOrderTransport.address
				addressObj.doorplate = salesOrderTransport.doorplate
				addressObj.linkman = salesOrderTransport.linkman
				addressObj.phone = salesOrderTransport.phone
				addressObj.latitude = salesOrderTransport.latitude
				addressObj.longitude = salesOrderTransport.longitude
				addressObj.floor = salesOrderTransport.floor
				addressObj.id = salesOrderTransport.addressId
				addressObj.bookingTime = salesOrderTransport.bookingTime ? UnixToDate(salesOrderTransport.bookingTime) : '' // 预约时间
				addressObj.chooseLicenseNum = salesOrderTransport.licenseNo // 车牌号，
				addressObj.id = salesOrderTransport.addressId
				addressObj.defDeliveryman = salesOrderTransport.deliverManId // 运输员id/配送员id
				addressObj.defDeliverymanName = salesOrderTransport.deliverMan // 运输员/配送员
				addressObj.defDelivery = salesOrderTransport.deliverOrgId // 配送点id，
				addressObj.defDeliveryName = salesOrderTransport.deliverOrgName // 配送点名称
				this.addressObj = addressObj
			},
			// 回填商品数据
			renderShop(res) {
				const salesOrderDetailList = res.salesOrderDetailList
				const templateData = this.templateObj
				// 选中模板
				let chooseTempalte = []
				salesOrderDetailList.forEach((v) => {
					if (this.chooseTempalte.indexOf(v.orderTemplateId) > -1) {
						// 添加已经有的商品模板
						chooseTempalte.push(v.orderTemplateId)
					}
				})
				chooseTempalte = [...new Set(chooseTempalte)]
				// 选中的模板
				this.chooseTempalte = chooseTempalte
				this.formDataValue = {
					...this.formDataValue,
					...{
						templateId: this.chooseTempalte && this.chooseTempalte.length ? this.chooseTempalte : ''
					}
				}
				this.$nextTick(() => {
					// 遍历历史商品
					salesOrderDetailList.forEach((v) => {
						const obj = templateData[v.orderTemplateId]
						if (obj) {
							// 模板id等于商品模板id
							if (obj.templateId === v.orderTemplateId) {
								obj.id = v.id // 编辑的id
								// 复制模板的商品数据
								const tableData = JSON.parse(JSON.stringify(obj.tableData))
								obj.tableData = []							
								obj.tableColumn = v.printSetVo.tableColumn // 防止表头发生改变
								// 遍历订单商品数据
								v.salesOrderDetailGoodsList.forEach((p) => {
									p.ids = createUniqueString()
									p.checked = p.changePriceTag !== 2
									const index = tableData.findIndex(item => item.goodsDetailId === p.goodsDetailId)
									// 把商品的默认辅助单位填进去
									p.defaultAssistUnitsList = tableData[index].defaultAssistUnitsList
									// 商品的辅助单位
									p.templateGoodsAssistList = []
									// 遍历辅助单位初始值
									res.templateAssistUnitsList.forEach((l) => {
										// 商品辅助单位值
										p.templateGoodsAssistList.push({
											assistUnitsId: l.assistUnitsId,
											salesUnitsId: l.salesUnitsId, // 销售单位id
											settleUnitsId: l.settleUnitsId, // 结算单位id
											numValue: '', // 辅助单位值
											changeValue: l.changeValue
										})
										// 造model数据
										obj.tableColumn.forEach(m => {
											if (m.propValue === 'assistName-' + l.assistUnitsId) {
												p[m.propValue] = ''
											}
											if (m.propValue === 'netContent-' + l.assistUnitsId) {
												p[m.propValue] = ''
											}
										})
									})
									// 有辅助单位数据，回填
									if (p.assistUnitsList.length) {
										p.templateGoodsAssistList.forEach((l) => {
											// 遍历商品辅助单位默认值
											p.assistUnitsList.forEach((n) => {
												if (l.assistUnitsId === n.assistUnitsId) {
													// 遍历表头显示字段
													obj.tableColumn.forEach(m => {
														if (m.propValue === 'assistName-' + n.assistUnitsId) {
															p[m.propValue] = n.unitsName // 回填商品辅助单位的 单位
														}
														if (m.propValue === 'netContent-' + n.assistUnitsId) {
															// 没有保存的值，回填默认值
															p[m.propValue] = n.netContent
															// 回填商品辅助单位的 计量值
															l.numValue = n.netContent // 表头辅助单位值（提交的时候用）
														}
													})
												}
											})
										})
									}
									obj.tableData.push(p)
								})
								this.templateObj[obj.templateId] = obj
								this.$refs[`billTable-${obj.templateId}`][0].writeData(obj)
							}
						}
					})
				})
			},
			// 物流信息改变
			changeDelivery(data) {
				if (data && data.formDataValue) {
					this.formDataValue = data.formDataValue
				}
				this.totalMoneyCalculate()
			},
			// 订单折扣改变
			changeDiscount(data) {
				this.couponMoneyAll = data.couponMoneyAll // 优惠金额
				this.totalMoneyAll = data.discountDeal // 应收金额
			},
			getTempKey(key) {
				this.tempKey = key
			},
			// 初始化
			async init() {
				// 销售单基础设置
				await this.handleDelivery()
				this.orgIdShipment = this.userInfo.orgId
				// 获取规格
				await this.getSysSpecificationClassifySelectPropertyBox()
			},
			// 销售单基础设置，查询是否可以结算，折扣，优惠券，积分抵扣
			async handleDelivery() {
				const {
					returnValue: res
				} = await moduleCommonSetFindByOrgId({
					subModuleType: 'salesOrder',
					moduleType: 'sales'
				})
				if (res) {
					this.settleTag = res.settleTag // 结算开关
					this.disCountTag = res.disCountTag // 折扣开关
					this.integralTag = res.integralTag // 积分开关
					this.couponTag = res.couponTag // 优惠券开关
					this.decimalNum = res.decimalNum // 保留位数，
					this.decimalMode = res.decimalMode // 保留小数方式，
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
			// 表单
			async changeForm(obj) {
				const queryParams = obj.queryParams
				const name = obj.name // 改变的字段
				if (name === 'templateId' && queryParams.templateId) {
					for (const key of queryParams.templateId) {
						if (!this.templateObj[key]) {
							// 查询模板详情
							await this.getTemplateDetail(key)
						}
					}
					// 选择了模板
					this.chooseTempalte = queryParams.templateId
					setTimeout(() => {
						this.totalMoneyCalculate()
					},1)
				}
			},
			// 查询客户详情
			async getCustomerInfo(id) {
				const {
					returnValue: res
				} = await userCustomerFindByIdList({
					id
				}, this.$t('salesMg.common.loading'))
				if (res) {
					this.customerInfo = res
					if (res.userAddress) {
						this.formDataValue = {
							customerName: res.customerName,
							linkMan: res.userAddress.linkman,
							phone: res.userAddress.phone,
						}
						this.addressObj = res.userAddress
					} else if (!res.userAddress) {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('salesMg.common.message')[0],
						})
					}
					// 客户的默认值
					this.collectionTypeId = res.userSettlement.collectionTypeId // 客户默认支付方式
					this.pickMode = (res.userSettlement.pickMode ? res.userSettlement.pickMode : 4).toString() // 提货方式
					this.licenseNumArr = res.userSettlement.licenseNum ? res.userSettlement.licenseNum.Split(',')
					: [] // 车牌号码
					this.integralUse = res.userSettlement.integralUse // 客户积分
					// 客户属性参数
					const propertyId = []
					propertyId.push(res.userSettlement.propertyIds)
					propertyId.push(res.userSettlement.salePropertyIds)
					propertyId.push(res.userSettlement.typeId)
					propertyId.push(res.userSettlement.regionId)
					// 过滤 null 空 undefined
					const propertyIdStr = propertyId.filter(item => item)
					this.propertyIdStr = [...new Set(propertyIdStr)].join(',')
					this.orderType = res.userSettlement.orderType
					// 重置muban
					this.templateObj = {}
					// 获取模板
					await this.getTemplate()
					this.totalMoneyCalculate()
				}
			},
			// 获取子单模板(客户的默认模板，客户价格)
			async getTemplate(chooseTempalte = '') {
				const {
					returnValue: res,
					returnObject
				} = await salesOrderTemplateFindOnlyList({
					state: 1,
					salesType: this.orderSourceParam === 'internet' ? 2 : 1,
				}, this.$t('salesMg.common.loading'))
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
				this.formDataSource[3].options = templateOption

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
						templateId: this.chooseTempalte && this.chooseTempalte.length ? this.chooseTempalte : ''
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
				const {
					returnValue: o
				} = await salesOrderTemplateFindDataByTemplate({
					orderTypeIdstr: this.orderType,
					propertyIdStr: this.propertyIdStr,
					customerId: this.customerId,
					goodsCustomerDate,
					id
				}, this.$t('salesMg.common.loading'))
				// 处理数据
				o.templateId = o.id
				o.id = '' // 清除id
				o.decimalNum = this.decimalNum
				o.decimalMode = this.decimalMode
				o.tableColumn = o.printSetVo.tableColumn
				o.goodsVoList.forEach(v => {
					v.ids = createUniqueString()
					v.checked = v.changePriceTag !== 2
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
										} else {
											// 没有保存的值，回填默认值
											v[m.propValue] = n.netContent
											// 回填商品辅助单位的 计量值
											l.numValue = n.netContent // 表头辅助单位值（提交的时候用）
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
			// 模板商品数据改变
			changeTable() {
				// 计算
				this.totalMoneyCalculate()
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
						if ((m.amount - 0) || (m.settleAmount - 0)) {
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
				this.totalMoneyTwoAll = this.$bigDecimal.round(this.$bigDecimal.add(totalChargeMoneyAll,
					totalMoneyOrderAll), 2) // 总合计
			},
			// 保存数据
			saveData(state = 3) {
				this.$refs.dialogForm.handleSubmit(async(obj) => {
					const payData = this.$refs.delivery.getPayData()
					// 获取所有商品
					this.getAllShop()
					// 获取折扣
					const objDiscount = this.$refs.discount.getDiscount()
					if (payData.data.pickMode === 4 && !payData.data.deliverManId) {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('salesMg.common.message')[1],
						})
						return false
					}
					// 提交
					const data = {
						id: this.editId,
						callRecordId: this.callRecordId ? this.callRecordId : (this.billType === 3 ? this
							.telId : ''), // 电话id
						recordType: this.recordType !== '' ? this.recordType : (this.billType === 1 ? 0
							: this.billType === 2 ? 1 : 0), // 是否是补录单（0 否  1 是）
						orderSource: this.orderSource ? this.orderSource : (this.billType === 3 ? 'phone'
							: 'store'),
						orderTimeStr: this.orderTime, // 开单时间
						customerId: this.customerId,
						disCountMoney: objDiscount.disCountMoney, // 折扣金额
						disCountRate: objDiscount.disCountRate, // 折扣率
						couponDetailId: objDiscount.couponDetailId || '', // 优惠券id
						integralValue: objDiscount.integralValue, // 抵扣积分
						integralMoney: objDiscount.integralMoney, // 抵扣金额
						payType: 2, // 线下支付
						buttonValue: state,
						billNo: this.billNo, // 单据号
						remarks: this.remarks,
						salesOrderDetaiData: [], // 订单信息
						salesOrderTransportData: {
							id: this.pickModeId || '', // 运输信息id
							pickMode: payData.data.pickMode, // 提货方式（1 自提 ，2 车辆自提 ，3 车辆配送 ，4 送气员配送
							bookingTimeStr: payData.data.bookingTime, // 预约时间
							licenseNo: payData.data.chooseLicenseNum, // 车牌号，
							province: objectValueEmpty(payData.data.addressObj, 'province'), // 省，
							city: objectValueEmpty(payData.data.addressObj, 'city'), // 市，
							area: objectValueEmpty(payData.data.addressObj, 'area'), // 区，
							address: objectValueEmpty(payData.data.addressObj, 'address'), // 详细地址，
							floor: objectValueEmpty(payData.data.addressObj, 'floor'), // 楼层
							doorplate: objectValueEmpty(payData.data.addressObj, 'doorplate'), // 门牌号，
							linkman: objectValueEmpty(payData.data.addressObj, 'linkman'), // 收货人，
							phone: objectValueEmpty(payData.data.addressObj, 'phone'), // 收货电话，
							latitude: objectValueEmpty(payData.data.addressObj, 'latitude'), // 纬度，
							longitude: objectValueEmpty(payData.data.addressObj, 'longitude'), // 经度，
							addressId: objectValueEmpty(payData.data.addressObj, 'id'),
							deliverManId: payData.data.deliverManId, // 运输员id/配送员id
							deliverMan: payData.data.transportName, // 运输员/配送员
							deliverOrgId: payData.data.deliverOrgId, // 配送点id，
							deliverOrgName: payData.data.defDeliveryName // 配送点名称
						}, // 运输信息
						salesOrderPayitemsData: [], // 收费项
						salesOrderPayDetailData: [] // 收款数据
					}
					// 遍历商品
					this.allShop.forEach((v) => {
						const obj = {
							id: v.id, // id，
							billName: v.billName, // 子单模板名称，
							totalMoney: v.totalMoney, // 总金额
							inOutReasonId: v.inOutReasonId, // 出入库原因id，
							loseStockState: v.loseStockState, // 负库存销售，
							decimalNum: v.decimalNum, // 保留位数，
							decimalMode: v.decimalMode, // 保留小数方式，
							printMode: v.printMode, // 打印方式，
							printTemplateId: v.printTemplateId, // 打印模板id，
							orderTemplateId: v.orderTemplateId, // 销售模板id，
							salesOrderDetailGoodsJson: []
						}
						v.data.forEach((m) => {
							if ((m.amount - 0) || (m.settleAmount - 0)) {
								const templateGoodsAssistList = []
								// 提交有值的
								m.templateGoodsAssistList.forEach(v => {
									if (v.numValue) {
										templateGoodsAssistList.push(v)
									}
								})
								const good = {
									goodsId: m.goodsId, // 商品id
									id: this.editId ? m.id : '', // id
									goodsDetailId: m.goodsDetailId, // 商品详情id
									retreatState: m.retreatState || 1, // 退气状态（1 正常   2 退气 3补气  4瓶底）
									changePriceTag: m.changePriceTag, // 是否转换
									weight: m.weight,
									unitPrice: m.unitPrice, // 商品销售价
									standardId: m.standardId, // 商品规格
									settleAmount: m.settleAmount,
									templateGoodsAssistList: templateGoodsAssistList,
									amount: m.amount, // 数量
									isCostTag: m.isCostTag, // 费用标记
									totalMoney: m.totalMoney, // 总金额
									remarks: m.remarks // 备注
								}
								obj.salesOrderDetailGoodsJson.push(good)
							}
						})
						// 有商品数据
						if (obj.salesOrderDetailGoodsJson.length > 0) {
							data.salesOrderDetaiData.push(obj)
						}
					})

					// 遍历收费项
					payData.choosePayItemsData.forEach((v) => {
						if (v.isChoose) {
							const obj = {
								id: v.id || '', // id，
								payItemsId: v.itemId, // 收费项id，
								payItemsName: v.itemName, // 收费项名称，
								payItemsMoney: v.chargeMoney, // 收费项金额
								floor: v.floor,
								payItemsTotalMoney: v.totalMoney,
								payItemsDataStr: v.payItemsDataStr
							}
							data.salesOrderPayitemsData.push(obj)
						}
					})
					if (this.settleTag === 1) {
						// 有结算
						const settlementData = this.$refs.settlement.getSettlement()
						// 遍历结算
						settlementData.payType.forEach((v) => {
							const obj = {
								id: v.id, // id，
								collectionTypeId: v.collectionTypeId, // 收款类型id，
								collectionTypeName: v.name, // 收款类型名称，
								payMoney: v.value, // 收款金额，
								payType: v.payType // 支付类型（1 实收, 2 挂账）
							}
							data.salesOrderPayDetailData.push(obj)
						})
						if (settlementData.residue !== 0 && state === 3) {
							this.$refs.uToast.show({
								type: 'error',
								message: this.$t('salesMg.common.message')[2],
							})
							return false
						}
					}
					data.salesOrderDetaiData = JSON.stringify(data.salesOrderDetaiData)
					data.salesOrderPayitemsData = JSON.stringify(data.salesOrderPayitemsData)
					data.salesOrderPayDetailData = JSON.stringify(data.salesOrderPayDetailData)
					data.salesOrderTransportData = JSON.stringify(data.salesOrderTransportData)
					const {
						returnValue: res,
						returnObject: res1,
						message
					} = await salesOrderSaveOrEdit(data)
					if (res) {
						if (state === 5) {
							if (res1) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 3000)
							} else {
								this.$refs.uToast.show({
									type: 'error',
									message: this.$t('salesMg.common.message')[3],
								})
							}
						} else {
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
								uni.navigateBack()
							}, 3000)
						}
					}
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
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

					>.picker {
						width: 100%;

						.pickerd {
							display: flex;
							align-items: center;
						}

						// display: inline-block;
					}

					.input {
						flex: 1;
						width: 1px;
						font-size: 28rpx;
					}

					&.dfee {
						flex: auto;
						width: 100%;

						.fee-item {
							width: 100%;
							display: flex;
							align-items: center;
							height: 88rpx;
							border-bottom: 1px solid #eee;

							&.on {

								::v-deep.fee-check .u-icon__icon,
								.fee-label {
									color: rgba(42, 130, 228, 1) !important;
								}
							}

							&:last-child {
								border-bottom: none;
							}

							::v-deep.fee-check {
								margin-right: 12rpx;
							}

							.fee-label {
								font-size: 28rpx;

								padding-bottom: 4rpx;
								white-space: nowrap;
							}

							.fee-input {
								height: 60rpx;
								width: 180rpx;
								background: rgba(247, 247, 247, 1);
								border-radius: 10rpx;
								font-size: 28rpx;
								margin-left: 10rpx;
								padding: 0 20rpx;
								box-sizing: border-box;
								color: rgba(212, 48, 48, 1) !important;

								>::v-deep input {
									color: rgba(212, 48, 48, 1) !important;
								}
							}

							.fee-flr {
								height: 60rpx;
								width: 180rpx;
								margin-left: 10rpx;
								display: flex;
								align-items: center;
								border: 1px solid #ccc;
								border-radius: 10rpx;
								box-sizing: border-box;
								padding: 0 20rpx;

								.flr {
									width: 1px;
									flex: 1;
								}
							}

							.fee-total {
								font-size: 26rpx;
								color: rgba(128, 128, 128, 1);
								margin-left: 10rpx;
								white-space: nowrap;
							}
						}
					}

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

						.pay-item {}

						.fill-box {
							width: 100%;
							padding: 30rpx;
							padding-top: 0;
							border-radius: 10rpx;
							background: rgba(247, 247, 247, 1);

							::v-deep .radio-group {
								flex-wrap: wrap;
							}

							::v-deep .radio-item {
								margin-right: 30rpx;
								margin-top: 30rpx;
							}

							&.pay-box {
								display: flex;
								flex-wrap: wrap;

								.pay-item {
									margin-top: 20rpx;
									width: 50%;
									font-size: 26rpx;
								}
							}
						}

					}
				}

			}
		}
	}

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

		>.btn {
			width: 632rpx;
			margin: 60rpx auto;
			@include flexMixin();

			.u-button {
				margin: 0rpx 10rpx;
			}
		}
	}
</style>
