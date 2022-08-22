<template>
  <view class="container">
		<view class="customerBox">
			<view class="title" @click="isShow = !isShow">
				<text class="name">{{$t('orgInfo.formTitle')}}</text>
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
				<text class="name">{{$t('orgInfo.form1Title')}}</text>
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
				<text class="name">{{$t('orgInfo.form2Title')}}</text>
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
				<text class="name">{{$t('orgInfo.form3Title')}}</text>
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
					@change="changeForm3"
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
				v-permission="{ permission:'app_cylinderArchivesList_edit'}" 
				:text="$t('common.btn.edit')" 
				type="primary" 
				hairline 
				shape="circle" 
				plain 
				@click="handleEdit">
			</u-button>
			<!-- 删除 -->
			<u-button 
				v-if="formDataValue.state===3" 
				v-permission="{ permission:'app_cylinderArchivesList_delete'}" 
				:text="$t('common.btn.delete')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleDelete">
			</u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { sysOrgSaveOrEdit, sysOrgFindById } from '@/api/lpgManageAppApi.js'
import { UnixToDate, getDayAddYears, DateToUnix, formatDate } from '@/utils/util.js'
import { settingMixin } from '@/common/settingMixin.js'
import { regionData } from 'element-china-area-data'
export default {
	mixins: [settingMixin],
  data() {
    return {
			isSave: true,
			editId: '',
			isShow: true,
			formDataSource: [
				{
					type: 'picker',
					labelText: this.$t('orgInfo.form.supId'),
					fieldName: 'supId',
					placeholder: this.$t('orgInfo.form.supIdPlace'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form.name'),
					fieldName: 'name',
					placeholder: this.$t('orgInfo.form.namePlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.namePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form.shortName'),
					fieldName: 'shortName',
					placeholder: this.$t('orgInfo.form.shortNamePlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.shortNamePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form.orgType'),
					fieldName: 'orgType',
					placeholder: this.$t('orgInfo.form.orgTypePlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form.orgTypeOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.orgTypePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form.realName'),
					fieldName: 'realName',
					placeholder: this.$t('orgInfo.form.realNamePlace'),
					maxlength: 30,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.realNamePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('orgInfo.form.phonePlace'),
					maxlength: 11,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^[0-9]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
						  message: this.$t('orgInfo.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'cascader',
					labelText: this.$t('orgInfo.form.provinces'),
					fieldName: 'provinces',
					placeholder: this.$t('orgInfo.form.provincesPlace'),
					isProvinces: true,
					required: true,
					options: regionData,
					defaultValue: [],
					rules: [
						{
							type: 'array',
							required: true,
							message: this.$t('orgInfo.form.provincesPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form.address'),
					fieldName: 'address',
					placeholder: this.$t('orgInfo.form.addressPlace'),
					maxlength: 50,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.addressPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form.state'),
					fieldName: 'state',
					placeholder: this.$t('orgInfo.form.statePlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form.stateOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form.statePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'number',
					labelText: this.$t('orgInfo.form.distScope'),
					fieldName: 'distScope',
					maxlength: 6,
					placeholder: this.$t('orgInfo.form.distScopePlace'),
					disabled: false
				},
				{
					type: 'textarea',
					labelText: this.$t('orgInfo.form.remarks'),
					fieldName: 'remarks',
					disabled: false,
					placeholder: this.$t('orgInfo.form.remarksPlace'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('orgInfo.form.orgLogo'),
					fieldName: 'orgLogo',
					borderBottom: false,
					limit: 1,
					defaultValue: []
				}
			],
			formDataValue: {},
			isShow1: true,
			formDataSource1: [
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.legalPerson'),
					fieldName: 'legalPerson',
					placeholder: this.$t('orgInfo.form1.legalPersonPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.creditCode'),
					fieldName: 'creditCode',
					placeholder: this.$t('orgInfo.form1.creditCodePlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.orgFax'),
					fieldName: 'orgFax',
					placeholder: this.$t('orgInfo.form1.orgFaxPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.orgWeb'),
					fieldName: 'orgWeb',
					placeholder: this.$t('orgInfo.form1.orgWebPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.invoiceUp'),
					fieldName: 'invoiceUp',
					placeholder: this.$t('orgInfo.form1.invoiceUpPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('orgInfo.form1.orgEin'),
					fieldName: 'orgEin',
					placeholder: this.$t('orgInfo.form1.orgEinPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'upload',
					labelText: this.$t('orgInfo.form1.businessLicense'),
					fieldName: 'businessLicense',
					borderBottom: false,
					limit: 2,
					defaultValue: []
				}
			],
			formDataValue1: {},
			isShow2: false,
			formDataSource2: [
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form2.orgModel'),
					fieldName: 'orgModel',
					placeholder: this.$t('orgInfo.form2.orgModelPlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form2.orgModelOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form2.orgModelPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form2.syncType'),
					fieldName: 'syncType',
					placeholder: this.$t('orgInfo.form2.syncTypePlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form2.syncTypeOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form2.syncTypePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form2.priceState'),
					fieldName: 'priceState',
					placeholder: this.$t('orgInfo.form2.priceStatePlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form2.priceStateOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form2.priceStatePlace'),
							trigger: ['change','blur']
						}
					]
				},
			],
			formDataValue2: {},
			isShow3: false,
			formDataSource3: [
				{
					type: 'actionSheet',
					labelText: this.$t('orgInfo.form3.openMall'),
					fieldName: 'openMall',
					placeholder: this.$t('orgInfo.form3.openMallPlace'),
					showOptions: false,
					required: true,
					disabled: false,
					defaultValue: '',
					options: this.$t('orgInfo.form3.openMallOptions'),
					rules: [
						{
							required: true,
							message: this.$t('orgInfo.form3.openMallPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'datetimerange',
					labelText: this.$t('orgInfo.form3.openTimeRange'),
					fieldName: 'openTimeRange',
					disabled: false,
					placeholder: this.$t('orgInfo.form3.openTimeRangePlace')
				},
				{
					type: 'upload',
					labelText: this.$t('orgInfo.form3.storeBackground'),
					fieldName: 'storeBackground',
					borderBottom: false,
					limit: 1,
					defaultValue: []
				}
			],
			formDataValue3: {},
			info: {},
			latitude: '',
			longitude: ''
		}
  },
  async onLoad(options) {
		this.isSave = false
		uni.setNavigationBarTitle({
			title: this.$t('orgInfo.titleText')
		});
		await this.init()
		this.formDataSource.forEach(v=>{
			v.disabled = true
		})
		this.formDataSource1.forEach(v=>{
			v.disabled = true
		})
		this.formDataSource2.forEach(v=>{
			v.disabled = true
		})
		this.formDataSource3.forEach(v=>{
			v.disabled = true
		})
		this.getInfo()
  },
	onShow() {
	},
  methods: {
		// 初始化
		async init() {
			
		},
    // 详情
    async getInfo() {
			const { returnValue: res } = await sysOrgFindById({ id: this.userInfo.orgId })
      if (res) {
				res.provinces = [res.province, res.city, res.area]
				// 图片转换
				res.businessLicense = this.$options.filters.pictureConversion(res.businessLicense)
				res.storeBackground = this.$options.filters.pictureConversion(res.storeBackground)
				res.orgLogo = this.$options.filters.pictureConversion(res.orgLogo)
				if (res.orgModel === 1) {
					// 直营
					this.formDataSource2[1].options = this.$t('orgInfo.form2.syncTypeOptions').splice(0,2)
					res.syncType = 3
				} else if (res.orgModel === 2 || res.orgModel === 3) {
					// 加盟
					this.formDataSource2[1].options = this.$t('orgInfo.form2.syncTypeOptions')
				}
				this.formDataValue = res
				this.formDataValue1 = res
				this.formDataValue2 = res
				this.formDataValue3 = res
				this.info = res
      }
    },
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
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
		// 表单改变
		async changeForm1(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			// 经纬度查询
			if (name === 'provinces' || name === 'address') {
				// 省市区和地址发生变化
				if (queryParams.province && queryParams.city && queryParams.area && queryParams.address) {
					this.geocoder(queryParams.districtName)
				}
			}else if (name === 'defDelivery' && queryParams.defDelivery) {
				// 配送点变化，查配送员
				await this.getManagerDeliveryman({ orgId: queryParams.defDelivery })
				this.formDataSource1[7].options = this.managerDeliveryman
				// 重置配送员
				queryParams.defDeliveryman = ''
				this.formDataValue1 = queryParams
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
		// 表单改变
		async changeForm3(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
		},
		// 查询经纬度
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
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				this.$refs.dialogForm1.handleSubmit(async(res1) => {
					this.$refs.dialogForm2.handleSubmit(async(res2) => {
						this.$refs.dialogForm3.handleSubmit(async(res3) => {
							// 地址信息
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
							// 联系人
							data.contactData = {
								linkman: res1.linkman,
								linkTel: res1.linkTel
							}
							// 附加信息
							data.orgData = {
								orgId: res2.orgId,
								managerId: res2.managerId,
								sourceId: res2.sourceId,
								archives: this.$options.filters.isArrayToString(res2.archives)
							}
							// 结算信息
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
								licenseNum: res3.licenseNum ? res3.licenseNum.replace(/，/, ',') : ''
							}
							data.addressData = JSON.stringify(data.addressData)
							data.contactData = JSON.stringify(data.contactData)
							data.orgData = JSON.stringify(data.orgData)
							data.settlementData = JSON.stringify(data.settlementData)
							const { returnValue: res, message } = await sysOrgSaveOrEdit(data)
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
	@include flexMixin();
	.u-button{
		margin: 0rpx 10rpx;
	}
}
</style>
