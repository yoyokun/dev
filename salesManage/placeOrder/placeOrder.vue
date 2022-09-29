<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="100" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseAddress="chooseAddress"
				@chooseCustomer="chooseCustomer">
			</edit-form>
		</view>
		<view v-if="chooseTempalte.length">
			<sales-billing v-for="item in chooseTempalte" :id="item" :ref="`billTable-${item}`" :key="item"
				:property-id-str="propertyIdStr" :template-data="templateObj[item]"
				:sysSpecificationClassifyData="sysSpecificationClassifyData" :bill-type="billType"
				:goods-customer-date="orderTime" :customer-id="customerId" :is-settle="isSettle"
				@changeTable="changeTable" @click.native="getTempKey(item)" />
		</view>
		<!-- ====运输信息==== -->
		<view class="block">
			<view class="block-head">运输信息</view>
			<view class="block-box">
				<view class="item">
					<view class="label">提货方式：</view>
					<view class="content fill">
						<view class="fill-box">
							<u-radio-group class="radio-group" size="14" v-model="pickMode" placement="row"
								@change="pickModeChange">
								<u-radio class="radio-item" labelSize="13" label="送气员配送" name="4"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="车辆配送" name="3"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="车辆自提" name="2"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="自提" name="1"></u-radio>
							</u-radio-group>
						</view>
					</view>
				</view>
				<!-- ========= -->
				<block v-if="pickMode == 4">
					<view class="item">
						<view class="label">配送点：</view>
						<view class="content" @click="chooseOrg">
							<input class="input" placeholder="请选择配送点" type="text" disabled :value="defDeliveryName" />
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="item">
						<view class="label">配送员：</view>
						<view class="content" @click="chooseItem('choosePSY')">
							<input class="input" placeholder="请选择配送员" type="text" disabled :value="transportName" />
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</block>
				<!-- ========= -->
				<view class="item" v-if="pickMode == 3 || pickMode == 2">
					<view class="label">车牌号：</view>
					<view class="content">
						<input class="input" :disabled="isSettle" v-model="chooseLicenseNum" placeholder="请输入车牌号"
							type="text" />
					</view>
				</view>
				<view class="item" v-if="pickMode == 3">
					<view class="label">运输员：</view>
					<view class="content">
						<input class="input" v-model="transportName" :disabled="isSettle" placeholder="请输入运输员"
							type="text" />
					</view>
				</view>
				<!-- =========== -->
				<view class="item">
					<view class="label">预约时间：</view>
					<view class="content">
						<uni-datetime-picker :disabled="isSettle" v-model="bookingTime"></uni-datetime-picker>
					</view>
				</view>
				<view class="item" v-if="pickMode != 1">
					<view class="label">地址：</view>
					<view class="content" @click="chooseAddress">
						<input class="input" placeholder="请选择地址" type="text" disabled v-if="!address" />
						<view class="choose-address" v-else>{{ address }}</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="item" v-if="pickMode == 4 || pickMode == 3">
					<view class="label">{{pickMode==4?'配送费':'运费'}}：</view>
					<view class="content dfee">
						<view class="fee-item" :class="item.check?'on':''" v-for="(item,index) in choosePayItemsData"
							:key="index" @click="checkFee(index)">
							<u-icon size="32rpx" class="fee-check" name="checkmark-circle-fill"></u-icon>
							<view class="fee-label">{{ item.itemName }}</view>
							<block v-if="item.chargeMode == 2">
								<view class="fee-flr" v-show="item.check" @click.stop="chooseItem('floorFee',index)">
									<view class="flr">{{item.floor}}楼</view>
									<u-icon size="32rpx" class="" name="arrow-down"></u-icon>
								</view>
								<input v-show="item.check" @click.stop class="fee-input" type="number"
									placeholder="请输入费用" :disabled="item.disabled || isSettle" v-model="item.chargeMoney"
									@input="totalMoneyCalculate" />
							</block>
							<block v-else>
								<input v-show="item.check" class="fee-input" type="number" placeholder="请输入费用"
									:disabled="item.disabled || isSettle" v-model="item.chargeMoney"
									@input="totalMoneyCalculate" @click.stop />
							</block>
							<view v-show="item.check" class="fee-total">共{{ item.totalMoney }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<discount ref="discount" :is-settle="isSettle" :org-id="orgId" :dis-count-tag="disCountTag"
			:integral-tag="integralTag" :coupon-tag="couponTag" :customer-id="customerId"
			:goods-detail-id-str="goodsDetailIdStr" :total-money-all="totalMoneyTwoAll" :integral-use="integralUse"
			@change="changeDiscount" />


		<!-- ==========结算信息=========== -->
		<view class="block">
			<view class="block-head">结算信息</view>
			<view class="block-box">
				<view class="item">
					<view class="label">合计收费项(元)：</view>
					<view class="content">{{totalChargeMoneyAll}}</view>
				</view>
				<view class="item">
					<view class="label">合计订单金额(元)：</view>
					<view class="content">{{totalMoneyOrderAll}}</view>
				</view>
				<view class="item">
					<view class="label">合计金额(元)：</view>
					<view class="content">{{totalMoneyTwoAll}}</view>
				</view>
				<view class="item">
					<view class="label">优惠金额(元)：</view>
					<view class="content">{{couponMoneyAll}}</view>
				</view>
				<view class="item">
					<view class="label">应收金额(元)：</view>
					<view class="content">{{totalMoneyAll}}</view>
				</view>
				<view class="item">
					<view class="label bold">应收合计(元)：</view>
					<view class="content">{{totalMoneyAll}}</view>
				</view>
			</view>
			<settlement v-if="settleTag === 1 || isSettle" ref="settlement" :collection-type-id="collectionTypeId"
				:total-money-all="totalMoneyAll" :pay-data="payData" />
			<view class="block-box">
				<view class="item">
					<view class="label">备注：</view>
					<view class="content fill">
						<textarea placeholder="请输入备注" v-model="remarks"></textarea>
					</view>
				</view>
			</view>
		</view>

		<view class="btn">
			<u-button :text="'结算'" @click="saveData(3)" type="primary" hairline shape="circle"></u-button>
			<!-- <u-button :text="'结算并打印'" @click="saveData(5)" type="success" hairline shape="circle" plain></u-button> -->
		</view>
		<u-popup class="multiplePopup" mode="bottom" :show="showItem" :closeOnClickOverlay="false">
			<view class="btn">
				<text class="cancel" @click="closeItem">{{$t('common.editForm.cancelText')}}</text>
				<text class="confirm" @click="confirmItem">{{$t('common.editForm.confirmText')}}</text>
			</view>
			<scroll-view class="multipleBox" scroll-y="true">
				<view class="box" v-for="(subItems,subIndex) in itemList" :key="subItems.id"
					@click="checkItem(subIndex)">
					<view class="center">
						<view class="name" v-if="itemType=='floorFee'">{{ subItems.name }}楼</view>
						<view class="name" v-else>{{ subItems.name }}</view>
					</view>
					<image class="icon" v-if="subItems.active" mode="widthFix" src="/static/image/check.png" />
					<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
				</view>
			</scroll-view>
		</u-popup>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		salesOrderTemplateFindList,
		salesPayItemsFindList,
		moduleCommonSetFindByOrgId,
		salesOrderTemplateFindDataByTemplate,
		salesOrderSaveOrEdit
	} from '@/api/lpgSalesManageApi'
	import {
		userCustomerFindByIdList,
	} from '@/api/lpgManageAppApi'
	import {
		createUniqueString,
		positiveInteger,
		objectValueEmpty,
		checkPrice
	} from '@/utils'
	import {
		getTodayDate
	} from '@/utils/util.js'
	import SalesBilling from '@/salesManage/placeOrder/common/salesBilling.vue'
	import settlement from '@/salesManage/placeOrder/common/settlement.vue'
	import Discount from '@/salesManage/placeOrder/common/discount.vue'
	export default {
		mixins: [settingMixin],
		components: {
			SalesBilling,
			settlement,
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
						labelText: this.$t('salesMg.placeOrder.form.customerName.label'),
						fieldName: 'customerName',
						placeholder: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
						options: [],
						func: 'chooseCustomer',
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.placeOrder.form.linkMan.label'),
						fieldName: 'linkMan',
						placeholder: this.$t('salesMg.placeOrder.form.linkMan.placeholder'),
						disabled: true
					},
					{
						type: 'number',
						labelText: this.$t('salesMg.placeOrder.form.phone.label'),
						fieldName: 'phone',
						placeholder: this.$t('salesMg.placeOrder.form.phone.placeholder'),
						disabled: true
					},
					{
						type: 'multiple',
						labelText: this.$t('salesMg.placeOrder.form.orderTemp.label'),
						fieldName: 'templateId',
						placeholder: this.$t('salesMg.placeOrder.form.orderTemp.placeholder'),
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
				address: '',
				addressId: '', // 地址id
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
				choosePayItemsData: [], // 收费项
				choosePayItems: [], // 选中的收费项
				templateObj: {}, // 模板列表
				chooseTempalte: [], // 选中的模板
				tempKey: null,
				// =========
				goodsDetailIdStr: [],
				allShop: [],
				showItem: false,
				itemList: [],
				itemId: '',
				itemType: '',
				orgId: '', // 组织id
				defDeliveryName: '', //配送点名
				deliverManId: '', // 配送员id
				transportName: '', // 配送员名称
				chooseLicenseNum: '', // 车牌号
				bookingTime: '', // 预约时间
				totalMoneyOrderAll: 0, // 订单合计
				totalMoneyTwoAll: 0, // 总合计
				totalChargeMoneyAll: 0, // 收费项
				couponMoneyAll: 0, // 优惠金额
				totalMoneyAll: 0, // 应收金额
				remarks: '',
				// =============
				callRecordId: '',
				recordType: '',
				telId: '',
				orderSource: '',
				orderTime: '',
				billNo: '',
				pickModeId: '',
				editId: '',
				payData: [],
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
			this.billType = options.billType || 1
			this.isSettle = options.isSettle || false
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.placeOrder.titleText')
			})
			uni.$on('chooseGoods', (data) => {
				this.$refs[`billTable-${this.tempKey}`][0].initGoodData(data)
			})
			this.init()
		},
		onShow() {
			// 选择地址
			uni.$once('chooseAddress', async (data) => {
				if (data.id == this.addressId) {
					return
				}
				this.addressId = data.id
				this.formDataValue = {

					linkMan: data.linkman,
					phone: data.phone,
				}
				this.address = this.$options.filters.addressSplicing(data)
				this.addressObj = data
				// 计算
				this.totalMoneyCalculate()
				// 获取配送员
				// await this.getManagerDeliveryman({
				// 	orgId: data.defDelivery
				// })
				this.orgId = data.defDelivery
				this.deliverOrgId = data.defDelivery // 配送点
				this.deliverManId = data.defDeliveryman // 配送员
				this.defDeliveryName = data.defDeliveryName // 配送点名称
				this.transportName = data.defDeliverymanName // 配送员名称
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
			// 选择配送点
			uni.$on('chooseOrg', async (data) => {
				// 配送点名称
				this.defDeliveryName = data.name
				this.deliverOrgId = data.id // 配送点
				// 清空配送员id
				this.deliverManId = ''
				this.transportName = ''
				this.orgId = data.id
			})
		},
		onUnload() {
			uni.$off('chooseAddress')
			uni.$off('chooseCustomer')
			uni.$off('chooseGoods')
			uni.$off('chooseOrg')
		},
		methods: {
			// 订单折扣改变
			changeDiscount(data) {
				this.couponMoneyAll = data.couponMoneyAll // 优惠金额
				this.totalMoneyAll = data.discountDeal // 应收金额
			},
			// 提货方式改变
			pickModeChange() {
				// 清空选择的配送费
				this.choosePayItems = []
				this.choosePayItemsData.forEach(i => {
					i.check = false
				})
				// 计算金额
				this.totalMoneyCalculate()
			},

			// 选择收费项
			checkFee(index) {
				let obj = this.choosePayItemsData[index]
				obj.check = obj.check ? false : true
				let key = this.choosePayItems.indexOf(obj.itemId)
				if (key > -1) {
					this.choosePayItems.splice(key, 1)
				} else {
					this.choosePayItems.push(obj.itemId)
				}
				this.$set(this.choosePayItemsData, index, obj)
				this.totalMoneyCalculate()
			},
			// 选择选项
			async chooseItem(type, index = null) {
				if (type == 'choosePSY') {
					if (!this.orgId) {
						return
					}
					await this.getManagerDeliveryman({
						orgId: this.orgId
					})
					this.itemList = this.managerDeliveryman
					this.itemId = this.deliverManId
				}
				if (type == 'floorFee') {
					let obj = this.choosePayItemsData[index].salesPayItemsDetailList
					obj.forEach(i => {
						i.name = i.floor
						i.value = i.floor
					})
					this.itemList = obj
					this.itemId = this.choosePayItemsData[index].floor
				}
				this.itemType = type
				this.itemList.forEach(item => {
					item.active = false
					if (item.value == this.itemId) {
						item.active = true
					}
				})
				this.showItem = true
			},
			checkItem(index) {
				this.itemList.forEach(item => {
					item.active = false
				})
				let obj = this.itemList[index]
				obj.active = true
				this.$set(this.itemList, index, obj)
			},
			closeItem() {
				this.showItem = false
			},
			confirmItem() {
				let obj = this.itemList.filter(item => item.active == true)[0]
				this.itemId = obj.value
				if (this.itemType == 'choosePSY') {
					this.deliverManId = obj.value // 配送员
					this.transportName = obj.name // 配送员名称
				}
				if (this.itemType == 'floorFee') {
					this.choosePayItemsData.forEach((item, index) => {
						if (item.chargeMode == 2) {
							item.floor = obj.value
						}
					})
				}
				this.closeItem()
				this.totalMoneyCalculate()
			},
			getTempKey(key) {
				console.log(key)
				this.tempKey = key
			},
			// 初始化
			async init() {
				// 销售单基础设置
				await this.handleDelivery()
				// 获取收费项
				await this.getPayItems()
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
			// 获取收费项
			async getPayItems() {
				const {
					returnValue: res
				} = await salesPayItemsFindList({
					state: 1,
					itemType: this.orderSourceParam === 'internet' ? 2 : 1
				})
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
							const findIndex = obj.salesPayItemsDetailList.findIndex(item => item.floor === obj
								.floor)
							// 按楼层 基础费加楼层费
							obj.chargeMoney = this.$bigDecimal.add(obj.startingMoney, obj
								.salesPayItemsDetailList[findIndex].floorFee)
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
				if (this.customerId) {
					this.goto('/infoManage/chooseAddress/chooseAddress', {
						customerId: this.customerId,
						addressId: this.addressId
					})
				}
			},
			// 选择组织
			chooseOrg() {
				this.goto('/infoManage/chooseOrg/chooseOrg', {
					orgId: this.orgId
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
					this.totalMoneyCalculate()
				}
			},
			// 查询客户详情
			async getCustomerInfo(id) {
				const {
					returnValue: res
				} = await userCustomerFindByIdList({
					id
				}, '加载中...')
				if (res) {
					this.customerInfo = res
					if (res.userAddress) {
						this.addressId = res.userAddress.id
						this.formDataValue = {
							customerName: res.customerName,
							linkMan: res.userAddress.linkman,
							phone: res.userAddress.phone,
						}
						this.addressObj = res.userAddress
						this.address = this.$options.filters.addressSplicing(res.userAddress)
						// await this.getManagerDeliveryman({orgId:userAddress.defDelivery})
						this.deliverOrgId = res.userAddress.defDelivery // 配送点id
						this.orgId = res.userAddress.defDelivery // 配送点id
						this.deliverManId = res.userAddress.defDeliveryman // 配送员id
						this.defDeliveryName = res.userAddress.defDeliveryName // 配送点名称
						this.transportName = res.userAddress.defDeliverymanName // 配送员名称

					} else if (!res.userAddress) {
						this.$refs.uToast.show({
							type: 'error',
							message: '该客户无地址，请添加！',
						})
					}
					// 客户的默认值
					this.collectionTypeId = res.userSettlement.collectionTypeId // 客户默认支付方式
					this.pickMode = (res.userSettlement.pickMode ? res.userSettlement.pickMode : 4).toString() // 提货方式
					this.licenseNumArr = res.userSettlement.licenseNum ? res.userSettlement.licenseNum.Split(',') :
					[] // 车牌号码
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
				} = await salesOrderTemplateFindList({
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
				this.formDataSource[3].options = templateOption

				if (chooseTempalte.length) {
					this.chooseTempalte = chooseTempalte
				} else {
					const arr = res.map(i => i.id)
					arr.forEach(async (item, index) => {
						if (!this.templateObj[item]) {
							// 查询模板详情
							await this.getTemplateDetail(res[index])
						}
					})
					// 默认选中
					this.chooseTempalte = arr
					this.formDataValue = {
						templateId: arr
					}
				}
			},
			// 获取子单模板详情
			async getTemplateDetail(o) {
				let goodsCustomerDate = ''
				// 处理日期，日期不同价格不同
				if (this.orderTime === '') {
					// 当前日期等于今日
					goodsCustomerDate = ''
				} else {
					goodsCustomerDate = this.orderTime
				}
				// const {
				// 	returnValue: o
				// } = await salesOrderTemplateFindDataByTemplate({
				// 	orderTypeIdstr: this.orderType,
				// 	propertyIdStr: this.propertyIdStr,
				// 	customerId: this.customerId,
				// 	goodsCustomerDate,
				// 	id
				// }, '加载中')
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
				// 全部取消选择
				this.choosePayItemsData.forEach(v => {
					v.isChoose = false
				})
				// 计算收费项，遍历选中的项目
				this.choosePayItems.forEach((v) => {
					const findindex = this.choosePayItemsData.findIndex((item) => item.itemId === v)
					// 选中
					this.choosePayItemsData[findindex].isChoose = true
					// 计费方式 1 自定义（可修改）2 按楼层 3 固定值
					const chargeMode = this.choosePayItemsData[findindex].chargeMode
					// 计费标记 1按单 2按商品
					const chargeTag = this.choosePayItemsData[findindex].chargeTag
					if (chargeMode === 1 && chargeTag === 1) {
						// 自定义 按单
						// 总价格等于单价
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 1 && chargeTag === 2) {
						// 自定义 按商品 遍历商品
						const chargeMoney = this.choosePayItemsData[findindex].chargeMoney
						// 总价格等于修改过的价格*标记的商品数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, chargeMoney)
					} else if (chargeMode === 2 && chargeTag === 1) {
						// 按楼层 按单
						const salesPayItemsDetailList = this.choosePayItemsData[findindex].salesPayItemsDetailList
						// 选中的楼层
						const floor = this.choosePayItemsData[findindex].floor
						// 查找楼层
						const floorIndex = salesPayItemsDetailList.findIndex((item) => item.floor === floor)
						// 楼层费
						const floorFee = salesPayItemsDetailList[floorIndex].floorFee
						// 楼层费+基础费
						this.choosePayItemsData[findindex].chargeMoney = this.$bigDecimal.add(this
							.choosePayItemsData[findindex].startingMoney, floorFee)
						// 总价格等于 楼层费+基础费
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 2 && chargeTag === 2) {
						// 按楼层 按商品 遍历商品
						const salesPayItemsDetailList = this.choosePayItemsData[findindex].salesPayItemsDetailList
						// 选中的楼层
						const floor = this.choosePayItemsData[findindex].floor
						// 查找楼层
						const floorIndex = salesPayItemsDetailList.findIndex((item) => item.floor === floor)
						// 楼层费
						const floorFee = salesPayItemsDetailList[floorIndex].floorFee
						// 楼层费+基础费
						this.choosePayItemsData[findindex].chargeMoney = this.$bigDecimal.add(this
							.choosePayItemsData[findindex].startingMoney, floorFee)
						// 总价等于(楼层费+基础费)*按商品标记的数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, this
							.choosePayItemsData[findindex].chargeMoney)
					} else if (chargeMode === 3 && chargeTag === 1) {
						// 固定值 按单
						// 总价等于固定值
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 3 && chargeTag === 2) {
						// 固定值 按商品 遍历商品
						const chargeMoney = this.choosePayItemsData[findindex].chargeMoney
						// 总价等于固定值*按商品标记的数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, chargeMoney)
					}
				})
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
			// 计算
			totalMoneyCalculate() {
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
				this.choosePayItemsData.forEach((v) => {
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
				// this.totalMoneyAll = this.totalMoneyTwoAll
				// this.discountCalculate()
			},
			// 保存数据
			saveData(state = 3) {
				this.$refs.dialogForm.handleSubmit(async (obj) => {
					// 获取所有商品
					this.getAllShop()
					// 获取折扣
					const objDiscount = this.$refs.discount.getDiscount()
					if (this.pickMode == 4 && !this.deliverManId) {
						// this.$message.error('配送员不能为空')
						return false
					}
					// 提交
					const data = {
						id: this.editId,
						callRecordId: this.callRecordId ? this.callRecordId : (this.billType == 3 ? this
							.telId : ''), // 电话id
						recordType: this.recordType != '' ? this.recordType : (this.billType == 1 ? 0 :
							this.billType == 2 ? 1 : 0), // 是否是补录单（0 否  1 是）
						orderSource: this.orderSource ? this.orderSource : (this.billType == 3 ? 'phone' :
							'store'),
						orderTimeStr: this.orderTime, // 开单时间
						customerId: this.customerId,
						disCountMoney: objDiscount.disCountMoney, // 折扣金额
						disCountRate: objDiscount.disCountRate, // 折扣率
						couponDetailId: objDiscount.couponDetailId, // 优惠券id
						integralValue: objDiscount.integralValue, // 抵扣积分
						integralMoney: objDiscount.integralMoney, // 抵扣金额
						payType: 2, // 线下支付
						buttonValue: state,
						billNo: this.billNo, // 单据号
						remarks: this.remarks,
						salesOrderDetaiData: [], // 订单信息
						salesOrderTransportData: {
							id: this.pickModeId || '', // 运输信息id
							pickMode: this.pickMode, // 提货方式（1 自提 ，2 车辆自提 ，3 车辆配送 ，4 送气员配送
							bookingTimeStr: this.bookingTime, // 预约时间
							licenseNo: this.chooseLicenseNum, // 车牌号，
							province: objectValueEmpty(this.addressObj, 'province'), // 省，
							city: objectValueEmpty(this.addressObj, 'city'), // 市，
							area: objectValueEmpty(this.addressObj, 'area'), // 区，
							address: objectValueEmpty(this.addressObj, 'address'), // 详细地址，
							floor: objectValueEmpty(this.addressObj, 'floor'), // 楼层
							doorplate: objectValueEmpty(this.addressObj, 'doorplate'), // 门牌号，
							linkman: objectValueEmpty(this.addressObj, 'linkman'), // 收货人，
							phone: objectValueEmpty(this.addressObj, 'phone'), // 收货电话，
							latitude: objectValueEmpty(this.addressObj, 'latitude'), // 纬度，
							longitude: objectValueEmpty(this.addressObj, 'longitude'), // 经度，
							addressId: objectValueEmpty(this.addressObj, 'id'),
							deliverManId: this.deliverManId, // 运输员id/配送员id
							deliverMan: this.transportName, // 运输员/配送员
							deliverOrgId: this.orgId, // 配送点id，
							deliverOrgName: this.defDeliveryName // 配送点名称
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
							if (m.amount && m.settleAmount) {
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
									retreatState: 1, // 退气状态（1 正常   2 退气 3补气  4瓶底）
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
					this.choosePayItemsData.forEach((v) => {
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
							// this.$message.error('支付金额跟应收金额不一致')
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
						if (state == 5) {
							if (res1) {
								setPrint(res1)
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 3000)
								// this.handleReset()
							} else {
								this.$refs.uToast.show({
									type: 'error',
									message: '无打印内容,请先设置打印模板',
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

			// font-weight: bold;
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

	.choose-address {
		flex: 1;
		width: 1px;
		word-break: break-all;
	}

	.multiplePopup {
		.btn {
			@include flexMixin();
			height: 80rpx;

			.confirm {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(60, 156, 255);
			}

			.cancel {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(144, 145, 147);
			}
		}

		.multipleBox {
			height: 600rpx;
			padding: 0rpx 20rpx;
			box-sizing: border-box;

			.box {
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				@include flexMixin();

				&:last-child {
					border-bottom: 0rpx;
				}

				.center {
					flex: 1;

					.name {
						flex: 1;
						color: rgba(56, 56, 56, 1);
						font-size: 36rpx;
						font-weight: 500;
					}

					.desc {
						flex: 1;
						font-size: 32rpx;
						color: #707070;
						margin-right: 20rpx;
					}
				}

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
</style>
