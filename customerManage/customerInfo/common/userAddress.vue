<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			@change="changeForm"
			>
			<template v-slot:extra>
				<view class="btn">
					<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
					<u-button :text="$t('common.btn.cancel')" type="default" hairline shape="circle" plain @click="handleCancel"></u-button>
					<u-button :text="$t('common.btn.delete')" v-if="editId" type="error" hairline shape="circle" plain @click="handleDelete"></u-button>
				</view>
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { userAddressSaveOrEdit, userAddressDeleteByIds, userAddressFindById } from '@/api/lpgManageAppApi.js'
import { formatDate } from '@/utils/util.js'
import { regionData } from 'element-china-area-data'
import { settingMixin } from '@/common/settingMixin.js'
export default {
	mixins: [settingMixin],
  data() {
    return {
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('userAddress.form.linkman'),
					fieldName: 'linkman',
					placeholder: this.$t('userAddress.form.linkmanPlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('userAddress.form.linkmanPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('userAddress.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('userAddress.form.phonePlace'),
					maxlength: 11,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('userAddress.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^[0-9]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('userAddress.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'cascader',
					labelText: this.$t('userAddress.form.provinces'),
					fieldName: 'provinces',
					placeholder: this.$t('userAddress.form.provincesPlace'),
					isProvinces: true,
					required: true,
					options: regionData,
					defaultValue: [],
					rules: [
						{
							type: 'array',
							required: true,
							message: this.$t('userAddress.form.provincesPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('userAddress.form.address'),
					fieldName: 'address',
					placeholder: this.$t('userAddress.form.addressPlace'),
					maxlength: 50,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('userAddress.form.addressPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'number',
					labelText: this.$t('userAddress.form.floor'),
					fieldName: 'floor',
					placeholder: this.$t('userAddress.form.floorPlace'),
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('userAddress.form.doorplate'),
					fieldName: 'doorplate',
					placeholder: this.$t('userAddress.form.doorplatePlace'),
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('userAddress.form.defDelivery'),
					fieldName: 'defDelivery',
					placeholder: this.$t('userAddress.form.defDeliveryPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'picker',
					labelText: this.$t('userAddress.form.defDeliveryman'),
					fieldName: 'defDeliveryman',
					placeholder: this.$t('userAddress.form.defDeliverymanPlace'),
					showOptions: false,
					options: [],
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('userAddress.form.cardNumber'),
					fieldName: 'cardNumber',
					placeholder: this.$t('userAddress.form.cardNumberPlace'),
					disabled: false
				},
				{
					type: 'textarea',
					labelText: this.$t('userAddress.form.remarks'),
					fieldName: 'remarks',
					placeholder: this.$t('userAddress.form.remarksPlace'),
					maxlength: 100
				},
				{
					type: 'switch',
					labelText: this.$t('userAddress.form.isDefault'),
					fieldName: 'isDefault',
					inputAlign: 'right',
					activeValue: 1,
					inactiveValue: 2,
					defaultValue: 2,
					borderBottom: false
				}
			],
			formDataValue: {},
			latitude: '',
			longitude: ''
		}
  },
	props: {
		customerId: {
			type: [Number, String],
			default: ''
		},
		editId: {
			type: String,
			default: ''
		}
	},
	async mounted() {
		await this.init()
		this.$nextTick(async() => {
			if (this.editId) {
				await this.getInfo(this.editId)
			}
		})
	},
  methods: {
		// 初始化
		async init() {
			// 获取配送点
			await this.getOrgListType({ orgType: 3 })
			this.formDataSource[6].options = this.orgTypeList
		},
    // 详情
    async getInfo() {
			const { returnValue: res } = await userAddressFindById({ id: this.editId })
      if (res) {
				if(res.defDelivery){
					// 配送点变化，查配送员
					await this.getManagerDeliveryman({ orgId: res.defDelivery })
					this.formDataSource[7].options = this.managerDeliveryman
				}
				res.provinces = [res.province, res.city, res.area]
				this.latitude = res.latitude
				this.longitude = res.longitude
				this.formDataValue = res
      }
    },
		// 表单改变
		async changeForm(obj) {
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
				this.formDataSource[7].options = this.managerDeliveryman
				// 重置配送员
				queryParams.defDeliveryman = ''
				this.formDataValue = queryParams
			}
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
				data.id = this.editId || ''
				data.customerId = this.customerId
				data.latitude = this.latitude
				data.longitude = this.longitude
				const { returnValue: res, message } = await userAddressSaveOrEdit(data)
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					this.$emit('refresh')
					this.$emit('editClose')
				}
			})
    },
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.deleteTitle'),
				content: this.$t('common.deleteContent'),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await userAddressDeleteByIds({ ids: [this.editId] })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							this.$emit('refresh')
							this.$emit('editClose')
						}
					}
				}
			})
		},
		// 取消
		handleCancel() {
			this.$emit('editClose')
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
::v-deep .normalForm{
	margin: 20rpx 20rpx;
	.u-form{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
	}
	::v-deep .u-upload__button{
		margin: 0rpx;
	}
	.btn{
		width: 632rpx;
		margin: 60rpx auto;
		@include flexMixin(column);
		.u-button{
			margin: 20rpx 10rpx;
		}
	}
}
</style>
