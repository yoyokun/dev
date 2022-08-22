<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="100"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			@change="changeForm"
			@chooseCustomer="chooseCustomer"
			@chooseCodeKey="chooseCodeKey"
			>
			<template v-slot:extra>
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
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { cylinderArchivesFindById, cylinderArchivesSaveOrEdit, cylinderArchivesDeleteByIds, assetCodeFindByKey, assetCodeSaveOrEdit } from '@/api/lpgManageAppApi.js'
import { UnixToDate, getDayAddYears, DateToUnix, formatDate } from '@/utils/util.js'
import { checkMix } from '@/utils/index.js'
import { settingMixin } from '@/common/settingMixin.js'
import permision from "@/common/wa-permission/permission.js"
import qrcode from "@/utils/reqrcode.js"
export default {
	mixins: [settingMixin],
  data() {
    return {
			isSave: true,
			editId: '',
			formDataSource: [
				{
					type: 'picker',
					labelText: this.$t('addCylinderArchives.form.orgId'),
					fieldName: 'orgId',
					placeholder: this.$t('addCylinderArchives.form.orgIdPlace'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCylinderArchives.form.orgIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('addCylinderArchives.form.ownerType'),
					fieldName: 'ownerType',
					placeholder: this.$t('addCylinderArchives.form.ownerTypePlace'),
					required: true,
					showOptions: false,
					disabled: false,
					options: this.$t('addCylinderArchives.form.ownerTypeOptions'),
					rules: [
						{
							type: 'number',
							required: true,
							message: this.$t('addCylinderArchives.form.ownerTypePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseBtn',
					labelText: this.$t('addCylinderArchives.form.ownerId'),
					fieldName: 'ownerName',
					placeholder: this.$t('addCylinderArchives.form.ownerIdPlace'),
					maxlength: 50,
					required: true,
					disabled: false,
					func: 'chooseCustomer',
					rules: [
						{
							required: true,
							message: this.$t('addCylinderArchives.form.ownerIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.billNo'),
					fieldName: 'billNo',
					placeholder: this.$t('addCylinderArchives.form.billNoPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.cylinderNo'),
					fieldName: 'cylinderNo',
					placeholder: this.$t('addCylinderArchives.form.cylinderNoPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'chooseText',
					labelText: this.$t('addCylinderArchives.form.codeKey'),
					fieldName: 'codeKey',
					placeholder: this.$t('addCylinderArchives.form.codeKeyplace'),
					func: 'chooseCodeKey',
					btnType: 'scan',
					disabled: false,
					rules: [
						{
							pattern: /^[0-9a-zA-Z]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
						  message: this.$t('addCylinderArchives.form.codeKeyMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('addCylinderArchives.form.modelId'),
					fieldName: 'modelId',
					placeholder: this.$t('addCylinderArchives.form.modelIdPlace'),
					required: true,
					showOptions: false,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addCylinderArchives.form.modelIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.fillingMedium'),
					fieldName: 'fillingMedium',
					placeholder: this.$t('addCylinderArchives.form.fillingMediumPlace'),
					maxlength: 50,
					disabled: false
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.initWeight'),
					fieldName: 'initWeight',
					placeholder: this.$t('addCylinderArchives.form.initWeightPlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.initWeightMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.maxWeight'),
					fieldName: 'maxWeight',
					placeholder: this.$t('addCylinderArchives.form.maxWeightPlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.maxWeightMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.volume'),
					fieldName: 'volume',
					placeholder: this.$t('addCylinderArchives.form.volumePlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.volumeMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.thickness'),
					fieldName: 'thickness',
					placeholder: this.$t('addCylinderArchives.form.thicknessPlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.thicknessMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.ratedPressure'),
					fieldName: 'ratedPressure',
					placeholder: this.$t('addCylinderArchives.form.ratedPressurePlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.ratedPressureMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('addCylinderArchives.form.waterPressure'),
					fieldName: 'waterPressure',
					placeholder: this.$t('addCylinderArchives.form.waterPressurePlace'),
					maxlength: 50,
					disabled: false,
					rules: [
						{
							pattern: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,5})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('addCylinderArchives.form.waterPressuremessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
				  type: 'picker',
				  labelText: this.$t('addCylinderArchives.form.supplierId'),
				  fieldName: 'supplierId',
				  placeholder: this.$t('addCylinderArchives.form.supplierIdPlace'),
				  showOptions: false,
				  options: [],
					disabled: false
				},
				{
				  type: 'date',
				  labelText: this.$t('addCylinderArchives.form.factoryDateStr'),
				  fieldName: 'factoryDateStr',
					disabled: false,
				  placeholder: this.$t('addCylinderArchives.form.factoryDateStrPlace')
				},
				{
				  type: 'actionSheet',
				  labelText: this.$t('addCylinderArchives.form.state'),
				  fieldName: 'state',
				  placeholder: this.$t('addCylinderArchives.form.statePlace'),
				  showOptions: false,
				  options: this.$t('addCylinderArchives.form.stateOptions'),
					disabled: false
				},
				{
					type: 'date',
					labelText: this.$t('addCylinderArchives.form.nextCheckDateStr'),
					fieldName: 'nextCheckDateStr',
					disabled: true,
					placeholder: this.$t('addCylinderArchives.form.nextCheckDateStrPlace')
				},
				{
					type: 'date',
					labelText: this.$t('addCylinderArchives.form.scrapDateStr'),
					fieldName: 'scrapDateStr',
					disabled: true,
					placeholder: this.$t('addCylinderArchives.form.scrapDateStrPlace')
				},
				{
					type: 'datetime',
					labelText: this.$t('addCylinderArchives.form.dealWithTimeStr'),
					fieldName: 'dealWithTimeStr',
					disabled: false,
					placeholder: this.$t('addCylinderArchives.form.dealWithTimeStrPlace')
				},
				{
					type: 'textarea',
					labelText: this.$t('addCylinderArchives.form.scrapNote'),
					fieldName: 'scrapNote',
					disabled: false,
					placeholder: this.$t('addCylinderArchives.form.scrapNotePlace'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('addCylinderArchives.form.picture'),
					fieldName: 'picture',
					limit: 5,
					borderBottom: false,
					disabled: false,
					defaultValue: []
				}
			],
			formDataValue: {},
			ownerType: '',
			info: {},
			ownerId: ''
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('addCylinderArchives.titleTextInfo')
			});
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addCylinderArchives.titleText')
			});
		}
		await this.init()
		if (this.editId) {
			this.formDataSource.forEach(v=>{
				v.disabled = true
			})
			this.getInfo()
		} else {
			this.formDataValue = {
				orgId: this.userInfo.orgId
			}
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('chooseCustomer', (data) => {
			this.ownerId = data.id
			this.formDataValue = {
				ownerName: data.customerName
			}
		})
		// 添加监听事件
		uni.$once('chooseOrg', (data) => {
			this.ownerId = data.id
			this.formDataValue = {
				ownerName: data.name
			}
		})
		// 添加监听事件
		uni.$once('chooseSupplier', (data) => {
			this.ownerId = data.id
			this.formDataValue = {
				ownerName: data.supplierName
			}
		})
	},
  methods: {
		// 初始化
		async init() {
			// 获取组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			// 钢瓶型号
			await this.getSysSpecificationFindList()
			this.formDataSource[6].options = this.sysSpecification
      // 制造单位
      await this.getPurSupplier()
      this.formDataSource[14].options = this.purSupplierList
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			if (name === 'modelId' && queryParams.modelId) {
				const findIndex = this.sysSpecification.findIndex(item => item.value === queryParams.modelId)
				if (findIndex !== -1) {
					queryParams.maxWeight = this.sysSpecification[findIndex].maxVolume // 最大充装量
					queryParams.fillingMedium = this.sysSpecification[findIndex].fillingMedium // 充装介质
					queryParams.volume = this.sysSpecification[findIndex].cylinderVolume // 钢瓶容积
					queryParams.thickness = this.sysSpecification[findIndex].designThickness // 设计壁厚
					this.formDataValue = queryParams
				}
			} else if (name === 'codeKey' && queryParams.codeKey) {
				// 查询二维码存在，不存在新增
				this.getCodeKey(queryParams.codeKey)
			} else if (name === 'ownerType' && queryParams.ownerType ) {
				// 产权分类
				this.ownerType = queryParams.ownerType
				this.ownerId = ''
				queryParams.ownerName = ''
				this.formDataValue = queryParams
			} else if (name === 'factoryDateStr' && queryParams.factoryDateStr) {
				// 出厂日期改变
				queryParams.nextCheckDateStr = getDayAddYears(queryParams.factoryDateStr, 4) // 下次检验日期加4年
				queryParams.scrapDateStr = getDayAddYears(queryParams.factoryDateStr, 12) // 报废日期日期加12年
				if (DateToUnix(queryParams.scrapDateStr) < DateToUnix()) {
					queryParams.state = 3
				} else {
					queryParams.state = 1
				}
				this.formDataValue = queryParams
			}
		},
    // 详情
    async getInfo() {
			const { returnValue: res } = await cylinderArchivesFindById({ id: this.editId })
      if (res) {
				this.ownerType = res.ownerType
				this.ownerId = res.ownerId
				// 图片转换
				res.picture = this.$options.filters.pictureConversion(res.picture)
				res.factoryDateStr = res.factoryDate ? formatDate(res.factoryDate) : ''
				res.nextCheckDateStr = res.nextCheckDate ? formatDate(res.nextCheckDate) : ''
				res.scrapDateStr = res.scrapDate ? formatDate(res.scrapDate) : ''
				res.dealWithTimeStr = res.dealWithTime ? UnixToDate(res.dealWithTime) : ''
				this.formDataValue = res
				this.info = res
      }
    },
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				data.id = this.editId || ''
				data.ownerId = this.ownerId
				data.picture = this.$options.filters.isArrayToString(data.picture)
				const { returnValue: res, message } = await cylinderArchivesSaveOrEdit(data)
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
    },
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.deleteTitle'),
				content: this.$t('common.deleteContent'),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await cylinderArchivesDeleteByIds({ ids: [this.editId] })
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
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addCylinderArchives.titleTextEdit')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = false
			})
		},
		// 选择客户
		chooseCustomer() {
			if(!this.isSave){
				return false
			}
			
			if(this.ownerType === 1) {
				// 组织
				this.goto('/infoManage/chooseOrg/chooseOrg',{
					orgId: this.ownerId
				})
			} else if(this.ownerType === 2) {
				// 客户
				this.goto('/infoManage/chooseCustomer/chooseCustomer',{
					customerId: this.ownerId,
					orgId: this.userInfo.orgId
				})
			} else if(this.ownerType === 4) {
				// 检测厂
				this.goto('/infoManage/chooseSupplier/chooseSupplier',{
					supplierId: this.ownerId
				})
			}
		},
		// 选择二维码
		async chooseCodeKey() {
			if(!this.isSave){
				return false
			}
			// #ifdef APP-PLUS
			// 判断有无权限
			var result = await permision.requestAndroidPermission("android.permission.CAMERA")
			if (result === 1) {
				uni.scanCode({
					success: (res) => {
						if (res.result) {
							this.getCodeKey(res.result)
						}
					}
				});
			}
			// #endif
			// #ifdef H5
			uni.chooseImage({
				count: 1,
				sourceType: ["camera"],
				sizeType: ["original"],
				success: (res) => {
					const resFile = res.tempFilePaths[0]
					qrcode.decode(resFile)
					qrcode.callback = (imgRes) => {
						if (imgRes === "error decoding QR Code") {
							uni.$u.toast(this.$t('addCylinderArchives.codeErr'))
						} else {
							this.getCodeKey(imgRes)
						}
					}
				}
			});
			// #endif
		},
		// 查询二维码是否存在
		async getCodeKey(codeKey) {
			const { returnValue: res } = await assetCodeFindByKey({ key: checkMix(codeKey) })
			if (res) {
				this.formDataValue = Object.assign(this.formDataValue,{ codeKey:checkMix(codeKey) })
			} else {
				uni.showModal({
					title: this.$t('common.addTitle'),
					content: this.$t('common.addContent'),
					success: async(param) => {
						if (param.confirm) {
							const { returnValue: resVal, message } = await assetCodeSaveOrEdit({
								qrKey: checkMix(codeKey)
							})
							if (resVal) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								this.formDataValue = Object.assign(this.formDataValue,{ codeKey:checkMix(codeKey) })
							}
						} else {
							this.formDataValue = Object.assign(this.formDataValue,{ codeKey: '' })
						}
					}
				})
			}
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
		@include flexMixin();
		.u-button{
			margin: 0rpx 10rpx;
		}
	}
}
</style>
