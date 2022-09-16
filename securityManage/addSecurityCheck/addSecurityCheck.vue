<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			@chooseCustomer="chooseCustomer"
			@chooseAddress="chooseAddress"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue">
		</edit-form>

		<!-- 安检结果 -->
		<edit-form
			v-if="state === 2"
			ref="dialogForm1"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			:form-data-source="formDataSource1"
			:form-data-value="formDataValue1">
			<template v-slot:other>
				<u-form-item v-if="endDecide.includes('2')" :label="$t('security.addSecurityCheck.form.customerSign.label')" :borderBottom="endDecide.includes('3')">
					<view class="singnImg" @click="signCanvas(1)">
						<image class="img" v-if="customerSign" :src="customerSign" mode="widthFix"></image>
						<text v-else class="text">点击签名</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(1)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="endDecide.includes('3')" :label="$t('security.addSecurityCheck.form.managerSign.label')" :borderBottom="cylinderCode === 1 || cylinderCode === 2">
					<view class="singnImg" @click="signCanvas(2)">
						<image class="img" v-if="managerSign" :src="managerSign" mode="widthFix"></image>
						<text v-else class="text">点击签名</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(2)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="cylinderCode === 1 || cylinderCode === 2" :label="$t('security.addSecurityCheck.form.cylinderNum.label')">
					<view class="singnImg" @click="signCanvas(2)">
						<image class="img" v-if="managerSign" :src="managerSign" mode="widthFix"></image>
						<text v-else class="text">点击签名</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(2)"></u-icon> 
				</u-form-item>
			</template>
		</edit-form>
		<view class="btn" v-if="isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
		</view>
		<view class="btn" v-else>
			<u-button v-if="info.state === 1" v-permission="{ permission:'app_patrolCheckList_edit'}" :text="$t('common.btn.patrolCheck')" type="primary" hairline shape="circle" @click="handleEdit"></u-button>
			<u-button v-permission="{ permission:'app_patrolCheckList_delete'}" :text="$t('common.btn.delete')" type="error" hairline shape="circle" plain @click="handleDelete"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
let that = null
import { userCustomerFindByIdList } from '@/api/lpgManageAppApi.js'
import { safeSecuritySaveOrEdit, safeSecurityFindById, safeSecurityDeleteByIds, safeTemplateFindById } from '@/api/lpgSecurityManageApi.js'
import { settingMixin } from '@/common/settingMixin.js'
export default {
	mixins: [settingMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.securityCheckList.stateObj')
			return stateObj[value] || ''
		}
	},
  data() {
    return {
			isEdit: false,
			isSave: true,
			editId: '',
			info: {},
			formDataSource: [
				{
					type: 'chooseBtn',
					labelText: this.$t('security.addSecurityCheck.form.customerName.label'),
					fieldName: 'customerName',
					placeholder: this.$t('security.addSecurityCheck.form.customerName.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					func: 'chooseCustomer',
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.customerName.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseBtn',
					labelText: this.$t('security.addSecurityCheck.form.address.label'),
					fieldName: 'address',
					placeholder: this.$t('security.addSecurityCheck.form.address.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					func: 'chooseAddress',
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.address.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.orgId.label'),
					fieldName: 'orgId',
					placeholder: this.$t('security.addSecurityCheck.form.orgId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.orgId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.managerId.label'),
					fieldName: 'managerId',
					placeholder: this.$t('security.addSecurityCheck.form.managerId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.managerId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addSecurityCheck.form.templateId.label'),
					fieldName: 'templateId',
					placeholder: this.$t('security.addSecurityCheck.form.templateId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.templateId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('security.addSecurityCheck.form.state.label'),
					fieldName: 'state',
					placeholder: this.$t('security.addSecurityCheck.form.state.placeholder'),
					showOptions: false,
					required: true,
					options: this.$t('security.addSecurityCheck.form.state.options'),
					disabled: false,
					borderBottom: false,
					rules: [
						{
							required: true,
							type: 'number',
							message: this.$t('security.addSecurityCheck.form.state.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.refuseNote.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addSecurityCheck.form.refuseNote.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.refuseNote.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.refuseNote1.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addSecurityCheck.form.refuseNote1.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addSecurityCheck.form.refuseNote1.placeholder'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {},
			orgId: '', // 组织id
			state: '', // 状态
			customerId: '', // 客户id
			addressId: '', // 客户联系人id
			classify: '', // 客户类型 用来查询模板
			endDecide: [],
			cylinderCode: '',
			formDataSource1: [
				{
					type: 'textarea',
					labelText: this.$t('security.addSecurityCheck.form.remarks.label'),
					fieldName: 'remarks',
					borderBottom: true,
					placeholder: this.$t('security.addSecurityCheck.form.remarks.placeholder'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('security.addSecurityCheck.form.picture.label'),
					fieldName: 'picture',
					limit: 2,
					borderBottom: true,
					show: false,
					defaultValue: []
				}
			],
			formDataValue1: {},
			customerSign: '',
			managerSign: ''
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		await this.init()
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('security.addSecurityCheck.titleTextInfo')
			});
			this.formDataSource1.forEach(v=>{
				v.disabled = true
			})
			this.getInfo()
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addSecurityCheck.titleText')
			});
			this.formDataValue = {
				orgId: this.userInfo.orgId,
				managerId: this.userInfo.id,
				state: 2
			}
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('saveSignCanvas', (data) => {
			if(data.type === '1') {
				this.customerSign = data.url
			} else if(data.type === '2') {
				this.managerSign = data.url
			}
		})
		// 添加监听事件
		uni.$once('chooseCustomer', async(data) => {
			this.customerId = data.id
			await this.getCustomerInfo(this.customerId)
		})
		// 添加监听事件
		uni.$once('chooseAddress', async(data) => {
			this.addressId = data.id
			this.formDataValue = {
				address: this.$options.filters.addressSplicing(data)
			}
		})
	},
	async created(){
		that = this
	},
  methods: {
		// 初始化
		async init() {
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[2].options = this.orgList
			// 查归属成员
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource[3].options = this.managerList
		},
		// 选择客户
		chooseCustomer() {
			this.goto('/infoManage/chooseCustomer/chooseCustomer',{
				customerId: this.customerId,
				orgId: this.userInfo.orgId
			})
		},
		// 查询客户详情
		async getCustomerInfo(id, addressId) {
			const { returnValue: res } = await userCustomerFindByIdList({ id })
			if (res) {
				this.classify = res.classify
				if (!addressId && res.userAddress) {
					this.addressId = res.userAddress.id
					this.formDataValue = {
						address: this.$options.filters.addressSplicing(res.userAddress),
						customerName: res.customerName
					}
					// textarea 触发 input 事件bug
					this.getTemplate()
				} else if (!addressId && !res.userAddress) {
					this.addressId = ''
					this.formDataValue = {
						address: '',
						customerName: ''
					}
					this.$refs.uToast.show({
						type: 'error',
						message: '该客户无地址，请添加！',
					})
				}
			}
		},
		// 选择地址
		chooseAddress() {
			this.goto('/infoManage/chooseAddress/chooseAddress',{
				customerId: this.customerId,
				addressId: this.addressId
			})
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			this.orgId = queryParams.orgId
			this.state = queryParams.state
			if (name === 'orgId' && queryParams.orgId) {
				// 组织变化，查归属成员
				await this.getManagerFindList({ orgId: queryParams.orgId })
				this.formDataSource[3].options = this.managerList
				if (queryParams.orgId === this.userInfo.orgId) {
					// 默认归属成员
					queryParams.managerId = this.userInfo.id
				} else {
					// 重置归属成员
					queryParams.managerId = ''
				}
				this.formDataValue = queryParams
				this.getTemplate(queryParams)
			} else if(name === 'templateId' && queryParams.templateId) {
				this.templateChange(queryParams.templateId)
			} else if(name === 'state' && queryParams.state) {
				if(queryParams.state === 2) {
					// 正常安检
					this.formDataSource[5].borderBottom = false
					this.formDataSource[6].show = false
					this.formDataSource[7].show = false
				} else if(queryParams.state === 3) {
					// 无法安检
					this.formDataSource[5].borderBottom = true
					this.formDataSource[6].show = true
					this.formDataSource[7].show = false
				} else if(queryParams.state === 5) {
					// 客户拒检
					this.formDataSource[5].borderBottom = true
					this.formDataSource[6].show = false
					this.formDataSource[7].show = true
				}
			}
		},
		// 查询模板
		async getTemplate(queryParams) {
			if(this.orgId && this.classify){
				await this.getTemplateList({
					orgId: this.orgId,
					state: 1,
					classify: this.classify
				})
				this.formDataSource[4].options = this.templateList
				// 默认第一个
				this.formDataValue = {
					templateId: this.templateList[0].value
				}
				this.templateChange(this.templateList[0].value)
			}
		},
		// 选择模板改变
		async templateChange(templateId) {
			// 查询模板详情
			const { returnValue: res } = await safeTemplateFindById({ id: templateId })
			if (res) {
				for (const key in res.safeTemplateItemVo) {
					res.safeTemplateItemVo[key].picture = []
				}
				// 对象的深度拷贝  Object.assign 只能实现对象属性的一层拷贝
				this.safeTemplateItemVo = JSON.parse(JSON.stringify(res.safeTemplateItemVo))
				this.templateInfo = res
				this.endDecide = res.endDecide ? res.endDecide.Split(',') : [],
				this.cylinderCode = res.cylinderCode
				if(this.endDecide.includes('1')) {
					this.formDataSource1[0].borderBottom = true
					this.formDataSource1[1].show = true
					if(this.endDecide.includes('2') || this.endDecide.includes('3')) {
						this.formDataSource1[1].borderBottom = true
					} else {
						this.formDataSource1[1].borderBottom = false
					}
				} else {
					this.formDataSource1[1].show = false
				}
				if(this.endDecide.length === 0 && res.cylinderCode === 3) {
					this.formDataSource1[0].borderBottom = false
				}
			}
		},
		// 详情
    async getInfo() {
			const { returnValue: res } = await safeSecurityFindById({ id: this.editId })
      if (res) {
				this.managerSign = res.managerSign
				this.customerSign = res.customerSign
				res.picture = this.$options.filters.pictureConversion(res.picture)
				this.formDataValue = res
				this.formDataValue1 = res
				this.info = res
      }
    },
    // 提交
    submitForm() {
			if(this.state === 2) {
				this.$refs.dialogForm.handleSubmit(async(data) => {
					this.$refs.dialogForm1.handleSubmit(async(parma) => {
						const obj = Object.assign(data,parma)
						this.handleSave(obj)
					})
				})
			} else {
				this.$refs.dialogForm.handleSubmit(async(parma) => {
					this.handleSave(parma)
				})
			}
    },
		// 保存
		async handleSave(obj) {
			obj.id = this.editId || ''
			obj.addressId = this.addressId
			obj.customerId = this.customerId
			obj.managerSign = this.managerSign
			obj.customerSign = this.customerSign
			obj.picture = this.$options.filters.isArrayToString(obj.picture)
			const { returnValue: res, message } = await safeSecuritySaveOrEdit(obj)
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
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.billNo),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await safeSecurityDeleteByIds({ ids: [this.editId] })
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
				title: this.$t('security.addSecurityCheck.titleTextEdit')
			});
			this.formDataSource1.forEach(v=>{
				v.disabled = false
			})
			this.$refs.dialogForm1.resetPicker('levelId', [0], [0])
		},
		// 签名
		signCanvas(type) {
			if(this.isSave) {
				this.goto('/securityManage/signCanvas/signCanvas',{ type: type })
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
.box-case{
	@include flexMixin(row,flex-start);
	background: #E8E8E8;
	font-size: 28rpx;
	font-weight: 400;
	color: rgba(56, 56, 56, 1);
	display: inline-flex;
	padding: 8rpx 20rpx;
	border-radius: 28rpx;
	margin: 10rpx 20rpx 10rpx 0rpx;
	line-height: 40rpx;
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
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin(column);
	.u-button{
		margin: 20rpx 10rpx;
	}
}
.customerBox .title .name{
	font-size: 34rpx;
	line-height: 40rpx;
	padding: 20rpx 0rpx;
}
.customerBox .content{
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(128, 128, 128, 1);
	padding: 20rpx;
}
.singnImg{
	flex: 1;
	.img{
		width: 200rpx;
	}
	.text{
		color: rgba(166, 166, 166, 1);
	}
}
.description{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	margin: 30rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
}
</style>
