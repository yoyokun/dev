<template>
  <view class="container">
		<view class="customerBox">
			<view class="title" @click="isShow = !isShow">
				<text class="name">{{$t('addCustomer.formTitle')}}</text>
				<u-icon v-if="isShow" name="arrow-down" color="#666666" size="18"></u-icon>
				<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
			</view>
			<view class="content" v-show="isShow">
				<edit-form
					ref="dialogForm"
					labelWidth="100"
					classForm="normalForm"
					:form-data-source="formDataSource"
					:form-data-value="formDataValue"
					@change="changeForm">
				</edit-form>
			</view>
		</view>
		<view class="customerBox">
			<view class="title" @click="isShow1 = !isShow1">
				<text class="name">{{$t('addCustomer.form1Title')}}</text>
				<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
				<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
			</view>
			<view class="content" v-show="isShow1">
				<edit-form
					ref="dialogForm1"
					labelWidth="100"
					classForm="normalForm"
					:form-data-source="formDataSource1"
					:form-data-value="formDataValue1"
					@change="changeForm1"
					>
				</edit-form>
			</view>
		</view>
		<view class="customerBox">
			<view class="title" @click="isShow2 = !isShow2">
				<text class="name">{{$t('addCustomer.form2Title')}}</text>
				<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
				<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
			</view>
			<view class="content" v-show="isShow2">
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
		<view class="customerBox">
			<view class="title" @click="isShow3 = !isShow3">
				<text class="name">{{$t('addCustomer.form3Title')}}</text>
				<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
				<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
			</view>
			<view class="content" v-show="isShow3">
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
		<view class="btn">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
		</view>
		<!-- ?????? toast ?????? -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { userCustomerSaveOrEdit, userCustomerCheckCustomerNo, userCustomerCheckAccount, userCustomerGrantOrgUse } from '@/api/lpgManageAppApi.js'
import { UnixToDate, getDayAddYears, DateToUnix, formatDate } from '@/utils/util.js'
import { settingMixin } from '@/common/settingMixin.js'
import { regionData } from 'element-china-area-data'
export default {
	mixins: [settingMixin],
  data() {
		// ??????????????????
		const validateCustomerNo = async(rule, value, callback) => {
			const { returnValue: res } = await userCustomerCheckCustomerNo({ customerNo: value })
			if (res) {
				return true
			} else {
				return false
			}
		}
		// ?????????????????????
		const validatePhone = async(rule, value, callback) => {
			const { returnValue: res } = await userCustomerCheckAccount({ phone: value })
			if (res === 2) {
				callback(new Error(this.$t('addCustomer.form.customerPresence')))
			} else if (res === 3) {
				uni.showModal({
					title: this.$t('common.authTitle'),
					content: this.$t('common.authContent'),
					confirmText: this.$t('common.authConfirmText'),
					success: async(param) => {
						if (param.confirm) {
							const { returnValue: res } = await userCustomerGrantOrgUse({ phone: value })
							if (res) {
								// ????????????
								uni.navigateBack({
									delta: 1
								})
							}
						} else {
							callback(new Error(this.$t('addCustomer.form.customerAuthorization')))
						}
					}
				})
				callback(new Error(this.$t('addCustomer.form.customerAuthorization')))
			} else {
				callback()
			}
		}
    return {
			isShow: true,
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
							// ???????????????????????????????????????
							transform(value) {
								return String(value);
							},
						  message: this.$t('addCustomer.form.phoneMessage'),
							trigger: ['change','blur']
						},
						{
							validator: validatePhone,
							message: '',
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
							// ???????????????????????????????????????
							transform(value) {
								return String(value);
							},
						  message: this.$t('addCustomer.form.customerNoMessage'),
							trigger: ['change','blur']
						},
						{
							validator: validateCustomerNo,
							message: this.$t('addCustomer.form.customerNoRepeat'),
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
							// ???????????????????????????????????????
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
			isShow1: true,
			formDataSource1: [
				{
					type: 'text',
					labelText: this.$t('addCustomer.form1.linkman'),
					fieldName: 'linkman',
					placeholder: this.$t('addCustomer.form1.linkmanPlace'),
					maxlength: 30,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form1.linkTel'),
					fieldName: 'linkTel',
					placeholder: this.$t('addCustomer.form1.linkTelPlace'),
					maxlength: 11,
					disabled: false,
					rules: [
						{
							pattern: /^[0-9]*$/,
							// ???????????????????????????????????????
							transform(value) {
								return String(value);
							},
						  message: this.$t('addCustomer.form1.linkTelMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'cascader',
					labelText: this.$t('addCustomer.form1.provinces'),
					fieldName: 'provinces',
					placeholder: this.$t('addCustomer.form1.provincesPlace'),
					isProvinces: true,
					required: true,
					options: regionData,
					defaultValue: [],
					rules: [
						{
							type: 'array',
							required: true,
							message: this.$t('addCustomer.form1.provincesPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('addCustomer.form1.address'),
					fieldName: 'address',
					placeholder: this.$t('addCustomer.form1.addressPlace'),
					maxlength: 50,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCustomer.form1.addressPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'number',
					labelText: this.$t('addCustomer.form1.floor'),
					fieldName: 'floor',
					placeholder: this.$t('addCustomer.form1.floorPlace'),
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form1.doorplate'),
					fieldName: 'doorplate',
					placeholder: this.$t('addCustomer.form1.doorplatePlace'),
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form1.defDelivery'),
					fieldName: 'defDelivery',
					placeholder: this.$t('addCustomer.form1.defDeliveryPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form1.defDeliveryman'),
					fieldName: 'defDeliveryman',
					placeholder: this.$t('addCustomer.form1.defDeliverymanPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('addCustomer.form1.cardNumber'),
					fieldName: 'cardNumber',
					placeholder: this.$t('addCustomer.form1.cardNumberPlace'),
					disabled: false,
					borderBottom: false
				}
			],
			formDataValue1: {},
			isShow2: false,
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
			isShow3: false,
			formDataSource3: [
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.typeId'),
					fieldName: 'typeId',
					placeholder: this.$t('addCustomer.form3.typeIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('addCustomer.form3.regionId'),
					fieldName: 'regionId',
					placeholder: this.$t('addCustomer.form3.regionIdPlace'),
					showOptions: false,
					options: [],
					disabled: false
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
							// ???????????????????????????????????????
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
							// ???????????????????????????????????????
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
					disabled: false
				},
				{
					type: 'multiple',
					labelText: this.$t('addCustomer.form3.salePropertyIds'),
					fieldName: 'salePropertyIds',
					placeholder: this.$t('addCustomer.form3.salePropertyIdsPlace'),
					showOptions: false,
					options: [],
					disabled: false
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
			latitude: '',
			longitude: ''
		}
  },
  async onLoad(options) {
		uni.setNavigationBarTitle({
			title: this.$t('addCustomer.titleText')
		});
		await this.init()
		this.formDataValue = {
			orgId: this.userInfo.orgId
		}
  },
	onShow() {
	},
  methods: {
		// ?????????
		async init() {
			// ???????????????
			await this.getOrgListType({ orgType: 3 })
			this.formDataSource1[6].options = this.orgTypeList
			// ??????????????????
			await this.getOrgList()
			this.formDataSource2[0].options = this.orgList
			// ???????????????
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource2[1].options = this.managerList
			// ??????????????????
			await this.getCustomerSource()
			this.formDataSource2[2].options = this.customerSourceList
			// ??????????????????
			await this.getCustomerType()
			this.formDataSource3[0].options = this.customerTypeList
			// ??????????????????
			await this.getCustomerArea()
			this.formDataSource3[1].options = this.customerAreaList
			// ??????????????????
			await this.geCustomerProperty()
			this.formDataSource3[4].options = this.arrayMergingCommon(this.customertProperty)
			// ??????????????????
			await this.getPropertyClassifySelectPropertyBox({ type: 'coupon' })
			this.formDataSource3[5].options = this.arrayMergingCommon(this.propertyClassifySelectProperty)
			// ??????????????????
			await this.getCustomerCollectionType()
			this.formDataSource3[6].options = this.customerCollectionType
			// ??????????????????
			await this.getCustomerBalanceType()
			this.formDataSource3[7].options = this.customerBalanceType
			// ??????????????????
			await this.getSubOrderType()
			this.formDataSource3[8].options = this.subOrderType
		},
		// ????????????
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // ???????????????
			if (name === 'phone' && queryParams.phone) {
				const linkTel = this.formDataValue1.linkTel ? this.formDataValue1.linkTel : queryParams.phone
				this.formDataValue1 = {
					linkTel: linkTel
				}
			} else if (name === 'customerName' && queryParams.customerName) {
				const linkman = this.formDataValue1.linkman ? this.formDataValue1.linkman : queryParams.customerName
				this.formDataValue1 = {
					linkman: linkman
				}
			}
		},
		// ????????????
		async changeForm1(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // ???????????????
			// ???????????????
			if (name === 'provinces' || name === 'address') {
				// ??????????????????????????????
				if (queryParams.province && queryParams.city && queryParams.area && queryParams.address) {
					this.geocoder(queryParams.districtName)
				}
			}else if (name === 'defDelivery' && queryParams.defDelivery) {
				// ??????????????????????????????
				await this.getManagerDeliveryman({ orgId: queryParams.defDelivery })
				this.formDataSource1[7].options = this.managerDeliveryman
				// ???????????????
				queryParams.defDeliveryman = ''
				this.formDataValue1 = queryParams
			}
		},
		// ????????????
		async changeForm2(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // ???????????????
			if (name === 'orgId' && queryParams.orgId) {
				// ????????????????????????????????????
				await this.getManagerFindList({ orgId: queryParams.orgId })
				this.formDataSource2[1].options = this.managerList
				if (queryParams.orgId === this.userInfo.orgId) {
					// ??????????????????
					queryParams.managerId = this.userInfo.id
				} else {
					// ??????????????????
					queryParams.managerId = ''
				}
				this.formDataValue2 = queryParams
			}
		},
		// ???????????????
		geocoder(address) {
			this.$jsonp('https://apis.map.qq.com/ws/geocoder/v1/', {
		    key: this.mapKey,
		    callbackName: 'getJsonData',
		    output: 'jsonp',
		    address: address
		  }).then(json => {
				const result = json.result
				this.latitude = result.location.lat
				this.longitude = result.location.lng
		  })
		},
    // ??????
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				this.$refs.dialogForm1.handleSubmit(async(res1) => {
					this.$refs.dialogForm2.handleSubmit(async(res2) => {
						this.$refs.dialogForm3.handleSubmit(async(res3) => {
							// ????????????
							data.addressData = {
								province: res1.province,
								city: res1.city,
								area: res1.area,
								address: res1.address,
								doorplate: res1.doorplate,
								floor: res1.floor,
								longitude: this.longitude,
								latitude: this.latitude,
								defDelivery: res1.defDelivery,
								defDeliveryman: res1.defDeliveryman,
								cardNumber: res1.cardNumber
							}
							// ?????????
							data.contactData = {
								linkman: res1.linkman,
								linkTel: res1.linkTel
							}
							// ????????????
							data.orgData = {
								orgId: res2.orgId,
								managerId: res2.managerId,
								sourceId: res2.sourceId,
								archives: this.$options.filters.isArrayToString(res2.archives)
							}
							// ????????????
							data.settlementData = {
								money: res3.money,
								creditLines: res3.creditLines,
								typeId: res3.typeId,
								regionId: res3.regionId,
								propertyIds: Array.isArray(res3.propertyIds) ? res3.propertyIds.join(',') : '',
								salePropertyIds: Array.isArray(res3.salePropertyIds) ? res3.salePropertyIds.join(',') : '',
								balanceTypeId: res3.balanceTypeId,
								collectionTypeId: res3.collectionTypeId,
								pickMode: res3.pickMode,
								orderType: Array.isArray(res3.orderType) ? res3.orderType.join(',') : '',
								licenseNum: res3.licenseNum ? res3.licenseNum.replace(/???/, ',') : ''
							}
							data.addressData = JSON.stringify(data.addressData)
							data.contactData = JSON.stringify(data.contactData)
							data.orgData = JSON.stringify(data.orgData)
							data.settlementData = JSON.stringify(data.settlementData)
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
				})
			})
    }
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin();
	.u-button{
		margin: 0rpx 10rpx;
	}
}
</style>
