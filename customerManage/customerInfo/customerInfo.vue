<template>
	<view class="list-part">
		<view class="tab">
			<u-tabs 
				:scrollable="false" 
				:list="tabSwitch" 
				:current="current"
				@click="onTabSwitch"
				lineWidth="60"
				lineColor="#2A82E4"
				:activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}"
				itemStyle="height: 45px;padding: 0 4px;"
			></u-tabs>
		</view>
		<view class="tabcontent" v-if="tabSwitchId === 1 || tabSwitchId === 2">
			<view class="customerBox" v-show="tabSwitchId === 1">
				<view class="title">
					<text class="name">{{$t('addCustomer.formTitle')}}</text>
				</view>
				<view class="content">
					<edit-form
						ref="dialogForm"
						labelWidth="100"
						classForm="normalForm"
						:form-data-source="formDataSource"
						:form-data-value="formDataValue"
						>
					</edit-form>
				</view>
			</view>
			<view class="customerBox" v-show="tabSwitchId === 1">
				<view class="title">
					<text class="name">{{$t('addCustomer.form2Title')}}</text>
				</view>
				<view class="content">
					<edit-form
						ref="dialogForm2"
						labelWidth="100"
						classForm="normalForm"
						:form-data-source="formDataSource2"
						:form-data-value="formDataValue2"
						@change="changeForm2"
						>
					</edit-form>
				</view>
			</view>
			<view class="customerBox" v-show="tabSwitchId === 2">
				<view class="title">
					<text class="name">{{$t('addCustomer.form3Title')}}</text>
				</view>
				<view class="content">
					<edit-form
						ref="dialogForm3"
						labelWidth="100"
						classForm="normalForm"
						:form-data-source="formDataSource3"
						:form-data-value="formDataValue3"
						>
					</edit-form>
				</view>
			</view>
			<view class="btn" v-if="isSave">
				<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
			</view>
			<view class="btn" v-else>
				<!-- 编辑 -->
				<u-button
					v-permission="{ permission:'app_customerList_edit'}" 
					:text="$t('common.btn.edit')" 
					type="primary" 
					hairline 
					shape="circle" 
					@click="handleEdit">
				</u-button>
				<!-- 启用 禁用 -->
				<u-button 
					v-if="info.orgIdTop === userInfo.orgId || info.createOrgId === userInfo.orgId"
					v-permission="{ permission:'app_customerList_status'}" 
					:text="info.state===1 ? $t('common.btn.disable') : $t('common.btn.enable')" 
					type="warning" 
					hairline 
					shape="circle" 
					plain 
					@click="handleUpdate">
				</u-button>
				<!-- 删除 -->
				<u-button 
					v-if="info.orgIdTop === userInfo.orgId || info.createOrgId === userInfo.orgId"
					v-permission="{ permission:'app_customerList_delete'}"
					class="m-l20"
					:text="$t('common.btn.delete')"
					type="error"
					hairline
					shape="circle"
					plain
					@click="handleDelete"></u-button>
			</view>
		</view>
		<view class="tabcontent" v-if="tabSwitchId === 3">
			<view v-show="showList">
				<view class="search-box">
					<search @search="search"></search>
					<text class="add" @click="handleAdd">{{$t('common.btn.add')}}</text>
				</view>
				<view v-if="empty">
					<view class="customerList">
						<view v-for="(item,index) in dataList" :key="index" class="box">
							<text class="state" v-if="item.isDefault === 1">{{item.isDefault | isDefault}}</text>
							<view class="center">
								<view class="flex">
									<view class="blod m-r20 name"><image src="/static/image/name.png" class="icon" mode="widthFix"></image>{{item.linkman}}</view>
									<view class="blod name"><image src="/static/image/phone.png" class="icon" mode="widthFix"></image>{{item.linkTel}}</view>
								</view>
								<view class="flex">
									<view class="m-r20 name blod">{{item.creator}}</view>
									<view class="name">{{item.createTime | dayjs}}</view>
								</view>
							</view>
							<view class="right">
								<u-button
									:text="$t('common.btn.edit')" 
									type="primary" 
									hairline 
									shape="circle" 
									plain
									size="small"
									@click="handleEdit(item.id)">
								</u-button>
							</view>
						</view>
					</view>
					<loading v-if="loading" class="loading" />
					<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
				</view>
				<view v-else class="customerList">
					<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
				</view>
				<loading v-if="loadingCenter" class="loading-center" />
			</view>
			<view v-if="!showList">
				<user-contact :customer-id="editId" :editId="contactId" @editClose="editClose" @refresh="getInit"/>
			</view>
		</view>
		<view class="tabcontent" v-if="tabSwitchId === 4">
			<view v-show="showList">
				<view class="search-box">
					<search @search="search"></search>
					<text class="add" @click="handleAdd">{{$t('common.btn.add')}}</text>
				</view>
				<view v-if="empty">
					<view class="customerList">
						<view v-for="(item,index) in dataList" :key="index" class="box">
							<text class="state" v-if="item.isDefault === 1">{{item.isDefault | isDefault}}</text>
							<view class="center">
								<view class="flex">
									<view class="name">{{item | addressSplicing}}</view>
								</view>
								<view class="flex">
									<view class="m-r20 name blod">{{item.linkman}}</view>
									<view class="name blod">{{item.phone}}</view>
								</view>
							</view>
							<view class="right">
								<u-button
									:text="$t('common.btn.edit')" 
									type="primary" 
									hairline 
									shape="circle" 
									plain
									size="small"
									@click="handleEdit(item.id)">
								</u-button>
							</view>
						</view>
					</view>
					<loading v-if="loading" class="loading" />
					<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
				</view>
				<view v-else class="customerList">
					<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
				</view>
				<loading v-if="loadingCenter" class="loading-center" />
			</view>
			<view v-if="!showList">
				<user-address :customer-id="editId" :editId="contactId" @editClose="editClose" @refresh="getInit"/>
			</view>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
let that = null
import { 
	userCustomerfindByIdDefault,
	userCustomerSaveOrEdit,
	userSettlementSaveOrEdit,
	userCustomerDeleteByIds,
	userCustomerUpdateState,
	userAddressFindList,
	userContactFindList
} from '@/api/lpgManageAppApi.js'
import { UnixToDate, getDayAddYears, DateToUnix, formatDate } from '@/utils/util.js'
import { settingMixin } from '@/common/settingMixin.js'
import { regionData } from 'element-china-area-data'
import paginationMixin from '@/common/paginationMixin.js'
import UserContact from './common/userContact'
import UserAddress from './common/userAddress'
export default {
	mixins: [paginationMixin,settingMixin],
	components: {
		UserContact,
		UserAddress
	},
	data() {
		return {
			isSave: true,
			tabSwitch: this.$t('customerInfo.tabSwitch'),
			tabSwitchId: 1,
			current: 0,
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('addCustomer.form.customerName'),
					fieldName: 'customerName',
					placeholder: this.$t('addCustomer.form.customerNamePlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCustomer.form.customerNamePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('addCustomer.form.phonePlace'),
					maxlength: 11,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCustomer.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^[0-9]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCustomer.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form.customerNo'),
					fieldName: 'customerNo',
					placeholder: this.$t('addCustomer.form.customerNoPlace'),
					maxlength: 30,
					disabled: false,
					rules: [
						{
							pattern: /^[0-9a-zA-Z]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCustomer.form.customerNoMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form.nickname'),
					fieldName: 'nickname',
					placeholder: this.$t('addCustomer.form.nickname'),
					maxlength: 30,
					disabled: false
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addCustomer.form.classify'),
					fieldName: 'classify',
					placeholder: this.$t('addCustomer.form.classifyPlace'),
					showOptions: false,
					disabled: false,
					defaultValue: 1,
					options: this.$t('addCustomer.form.classifyPlaceOptions'),
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form.IDNumber'),
					fieldName: 'IDNumber',
					placeholder: this.$t('addCustomer.form.IDNumberPlace'),
					maxlength: 18,
					disabled: false,
					rules: [
						{
							pattern: /^[0-9a-zA-Z]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCustomer.form.IDNumberMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addCustomer.form.state'),
					fieldName: 'state',
					placeholder: this.$t('addCustomer.form.statePlace'),
					showOptions: false,
					disabled: false,
					defaultValue: 1,
					options: this.$t('addCustomer.form.stateOptions'),
				},
				{
					type: 'textarea',
					labelText: this.$t('addCustomer.form.remarks'),
					fieldName: 'remarks',
					disabled: false,
					placeholder: this.$t('addCustomer.form.remarksPlace'),
					borderBottom: false,
					maxlength: 100
				}
			],
			formDataValue: {},
			formDataSource2: [
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form2.orgId'),
					fieldName: 'orgId',
					placeholder: this.$t('addCustomer.form2.orgIdplace'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCustomer.form2.orgIdplace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form2.managerId'),
					fieldName: 'managerId',
					placeholder: this.$t('addCustomer.form2.managerIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form2.sourceId'),
					fieldName: 'sourceId',
					placeholder: this.$t('addCustomer.form2.sourceIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'upload',
					labelText: this.$t('addCustomer.form2.archives'),
					fieldName: 'archives',
					borderBottom: false,
					limit: 5,
					defaultValue: []
				}
			],
			formDataValue2: {},
			formDataSource3: [
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.typeId'),
					fieldName: 'typeId',
					placeholder: this.$t('addCustomer.form3.typeIdPlace'),
					showOptions: false,
					options: [],
					disabled: true
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.regionId'),
					fieldName: 'regionId',
					placeholder: this.$t('addCustomer.form3.regionIdPlace'),
					showOptions: false,
					options: [],
					disabled: true
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form3.money'),
					fieldName: 'money',
					placeholder: this.$t('addCustomer.form3.moneyPlace'),
					maxlength: 12,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCustomer.form3.moneyMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form3.creditLines'),
					fieldName: 'creditLines',
					placeholder: this.$t('addCustomer.form3.creditLinesPlace'),
					maxlength: 12,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCustomer.form3.creditLinesMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'multiple',
					labelText: this.$t('addCustomer.form3.propertyIds'),
					fieldName: 'propertyIds',
					placeholder: this.$t('addCustomer.form3.propertyIdsPlace'),
					showOptions: false,
					options: [],
					disabled: true
				},
				{
					type: 'multiple',
					labelText: this.$t('addCustomer.form3.salePropertyIds'),
					fieldName: 'salePropertyIds',
					placeholder: this.$t('addCustomer.form3.salePropertyIdsPlace'),
					showOptions: false,
					options: [],
					disabled: true
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.collectionTypeId'),
					fieldName: 'collectionTypeId',
					placeholder: this.$t('addCustomer.form3.collectionTypeIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.balanceTypeId'),
					fieldName: 'balanceTypeId',
					placeholder: this.$t('addCustomer.form3.balanceTypeIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'multiple',
					labelText: this.$t('addCustomer.form3.orderType'),
					fieldName: 'orderType',
					placeholder: this.$t('addCustomer.form3.orderTypePlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addCustomer.form3.pickMode'),
					fieldName: 'pickMode',
					placeholder: this.$t('addCustomer.form3.pickModePlace'),
					showOptions: false,
					options: this.$t('addCustomer.form3.pickModeOptions'),
					disabled: false
				},
				{
					type: 'textarea',
					labelText: this.$t('addCustomer.form3.licenseNum'),
					fieldName: 'licenseNum',
					disabled: false,
					placeholder: this.$t('addCustomer.form3.licenseNumPlace'),
					borderBottom: false,
					maxlength: 100
				}
			],
			formDataValue3: {},
			info: {},
			editId: '',
			userOrgId: '' ,// 附加信息id
			userSettlementId: '', // 结算信息
			params: {},
			showList: true,
			contactId: ''
		}
	},
	// 过滤器
	filters: {
		isDefault(value) {
			const stateObj = that.$t('customerInfo.isDefault')
			return stateObj[value] || ''
		}
	},
	async created(){
		that = this
	},
	async onLoad(options) {
		this.editId = options.editId || ''
		this.isSave = false
		await this.init()
		uni.setNavigationBarTitle({
			title: this.$t('customerInfo.titleText')
		});
		this.formDataSource.forEach(v=>{
			v.disabled = true
		})
		this.formDataSource2.forEach(v=>{
			v.disabled = true
		})
		this.formDataSource3.forEach(v=>{
			v.disabled = true
		})
		await this.getInfo()
	},
	methods: {
		// 初始化
		async init() {
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource2[0].options = this.orgList
			// 获取客户来源
			await this.getCustomerSource()
			this.formDataSource2[2].options = this.customerSourceList
			// 获取客户类型
			await this.getCustomerType()
			this.formDataSource3[0].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.formDataSource3[1].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.formDataSource3[4].options = this.arrayMergingCommon(this.customertProperty)
			// 获取优惠标签
			await this.getPropertyClassifySelectPropertyBox({ type: 'coupon' })
			this.formDataSource3[5].options = this.arrayMergingCommon(this.propertyClassifySelectProperty)
			// 获取支付方式
			await this.getCustomerCollectionType()
			this.formDataSource3[6].options = this.customerCollectionType
			// 获取结算账期
			await this.getCustomerBalanceType()
			this.formDataSource3[7].options = this.customerBalanceType
			// 获取开单类型
			await this.getSubOrderType()
			this.formDataSource3[8].options = this.subOrderType
		},
		// 切换
		onTabSwitch(item) {
			this.current = item.index
		  this.tabSwitchId = item.id
			if(item.id === 3 || item.id === 4) {
				this.getInit()
			}
		},
		// 表单改变
		async changeForm2(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			if (name === 'orgId' && queryParams.orgId) {
				// 归属组织变化，查归属成员
				await this.getManagerFindList({ orgId: queryParams.orgId })
				this.formDataSource2[1].options = this.managerList
				if (queryParams.orgId === this.userInfo.orgId) {
					// 默认归属成员
					queryParams.managerId = this.userInfo.id
				} else {
					// 重置归属成员
					queryParams.managerId = ''
				}
				this.formDataValue2 = queryParams
			}
		},
		// 详情
		async getInfo() {
			const { returnValue: res } = await userCustomerfindByIdDefault({ id: this.editId  })
		  if (res) {
				res.IDNumber = res.iDNumber
			  this.userOrgId = res.userOrg.id // 附加信息
				this.userSettlementId = res.userSettlement.id // 结算信息
				// 查归属成员
				await this.getManagerFindList({ orgId: res.userOrg.orgId })
				this.formDataSource2[1].options = this.managerList
				// 图片转换
				res.userOrg.archives = this.$options.filters.pictureConversion(res.userOrg.archives)
				res.userSettlement.creditLines = parseFloat(res.userSettlement.creditLines)
				const propertyIds = res.userSettlement.propertyIds.length ? res.userSettlement.propertyIds.Split(',') : ''
				const salePropertyIds = res.userSettlement.salePropertyIds.length ? res.userSettlement.salePropertyIds.Split(',') : ''
				const orderType = res.userSettlement.orderType.length ? res.userSettlement.orderType.Split(',') : ''
				this.formDataValue = Object.assign({}, res, res.userOrg)
				this.formDataValue2 = Object.assign({}, res, res.userOrg)
				this.formDataValue3 = Object.assign({}, res.userSettlement, { propertyIds, salePropertyIds, orderType })
				this.info = res
		  }
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('customerInfo.titleTextEdit')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = false
			})
			this.formDataSource2.forEach(v=>{
				v.disabled = false
			})
			this.formDataSource3.forEach((v,i)=>{
				if(i !== 0 && i !== 1 && i !== 4 && i !== 5){
					v.disabled = false
				}
			})
		},
		// 提交
		submitForm() {
			if(this.tabSwitchId === 1){
				this.$refs.dialogForm.handleSubmit(async(data) => {
					this.$refs.dialogForm2.handleSubmit(async(res2) => {
						data.id = this.editId
						// 附加信息
						data.orgData = {
							id: this.userOrgId,
							orgId: res2.orgId,
							managerId: res2.managerId,
							sourceId: res2.sourceId,
							archives: this.$options.filters.isArrayToString(res2.archives)
						}
						data.orgData = JSON.stringify(data.orgData)
						const { returnValue: res, message } = await userCustomerSaveOrEdit(data)
						if (res) {
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					})
				})
			} else if(this.tabSwitchId === 2){
				this.$refs.dialogForm3.handleSubmit(async(data) => {
					data.id = this.userSettlementId
					data.propertyIds = Array.isArray(data.propertyIds) ? data.propertyIds.join(',') : ''
					data.salePropertyIds = Array.isArray(data.salePropertyIds) ? data.salePropertyIds.join(',') : ''
					data.orderType = Array.isArray(data.orderType) ? data.orderType.join(',') : ''
					data.licenseNum = data.licenseNum ? data.licenseNum.replace(/，/, ',') : ''
					const { returnValue: res, message } = await userSettlementSaveOrEdit(data)
					if (res) {
						this.$refs.uToast.show({
							type: 'success',
							message: message,
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 2000)
					}
				})
			}
		},
		// 启用禁用
		handleUpdate() {
			const text = this.info.state === 1 ? this.$t('common.tipsTle')[3] : this.$t('common.tipsTle')[4]
			const content = this.info.state === 1 ? this.$t('common').disableTxt(this.info.customerName) : this.$t('common').enableTxt(this.info.customerName)
			uni.showModal({
				title: text,
				content: content,
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await userCustomerUpdateState({ ids: [this.editId], state: this.info.state === 2 ? 1 : 2 })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
							  uni.navigateBack({
							    delta: 1
							  })
							}, 2000)
						}
					}
				}
			})
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.customerName),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await userCustomerDeleteByIds({ ids: [this.editId] })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
							  uni.navigateBack({
							    delta: 1
							  })
							}, 2000)
						}
					}
				}
			})
		},
		// 搜索
		search(e) {
			this.params = { ...e }
			this.getInit()
		},
		// 联系人 联系地址
		async findDataList() {
		  const data = {
				...(this.params||{}),
				...{
					customerId: this.editId,
					page: this.pagination.getCurrentPage(),
					size: this.pagination.getCurrentSize()
				}
		  }
			if(this.tabSwitchId === 3){
				const { returnValue: res, totals } = await userContactFindList(data)
				if (res) {
				  this.setMoreData(res)
				}
			} else if(this.tabSwitchId === 4){
				const { returnValue: res, totals } = await userAddressFindList(data)
				if (res) {
				  this.setMoreData(res)
				}
			}
			this.loadClose()
		},
		// 添加联系人
		handleAdd() {
			this.showList = false
			this.contactId = ''
		},
		// 编辑联系人
		handleEdit(id) {
			this.showList = false
			this.contactId = id
		},
		// 关闭
		editClose() {
			this.showList = true
			this.contactId = ''
		}
	}
}
</script>

<style lang="scss" scoped>
.tab{
	border: none;
}
.tabcontent{
	padding-top: 82rpx;
}
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
}
.customerBox{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	width: 710rpx;
	padding: 10rpx 10rpx;
	box-sizing: border-box;
	margin: 20rpx 20rpx 10rpx 20rpx;
	.title{
		@include flexMixin();
		padding: 0rpx 10rpx;
		.name{
			font-size: 36rpx;
			font-weight: 500;
			line-height: 80rpx;
			&:before{
				display: inline-block;
				content:" ";
				width: 8rpx;
				height: 35rpx;
				background: rgba(42, 130, 228, 1);
				border-radius: 20rpx;
				top: 4rpx;
				margin-right: 10rpx;
				position: relative;
			}
		}
	}
	.content{
		border-top: 0.5rpx solid #f1eeee;     
	}
	::v-deep .u-upload__button{
		margin: 0rpx;
	}
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin(column);
	.u-button{
		margin: 20rpx 10rpx;
	}
}
.search-box{
	@include flexMixin();
	.add{
		white-space: nowrap;
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(42, 130, 228, 1);
		padding-right: 20rpx;
	}
}
.customerList{
	padding: 140rpx 20rpx 0rpx 20rpx;
	.box{
		border: none;
		background: #fff;
		position: relative;
		.state{
			right: 0rpx;
			border-top-left-radius: 0rpx !important;
			border-bottom-right-radius: 0rpx !important;
			border-top-right-radius: 16rpx;
			border-bottom-left-radius: 16rpx;
			font-size: 20rpx !important;
			padding: 2rpx 15rpx !important;
			position: absolute;
			top:0rpx;
			color: rgba(42, 130, 228, 1) !important;
			background: rgba(181, 216, 255, 1) !important;
		}
		.center{
			padding-left: 10rpx;
			border: none;
			border-radius: 16rpx;
			.flex{
				margin-top: 16rpx !important;
				.name{
					@include flexMixin(row,flex-start,center);
				}
			}
			
		}
		.right{
			width: 180rpx;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
		}
	}
}
</style>
