<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			@change="changeForm"
			@chooseCustomer="chooseCustomer"
			>
			<template v-slot:extra>
				<view class="btn" v-if="isSave">
					<u-button v-if="isAssign" :text="$t('common.btn.assignment')" type="primary" hairline shape="circle" @click="submitForm(1)"></u-button>
					<u-button v-else :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm(2)"></u-button>
				</view>
				<view class="btn" v-else>
					<!-- 编辑 -->
					<u-button 
						v-if="formDataValue.state===1" 
						v-permission="{ permission:'app_workList_edit'}" 
						:text="$t('common.btn.edit')" 
						type="primary" 
						hairline 
						shape="circle"  
						@click="handleEdit">
					</u-button>
					<!-- 删除 -->
					<u-button 
						v-if="formDataValue.state===1 || formDataValue.state===5" 
						v-permission="{ permission:'app_workList_delete'}" 
						:text="$t('common.btn.delete')" 
						type="error" 
						hairline 
						shape="circle" 
						plain 
						@click="handleDelete">
					</u-button>
					<!-- 分派 -->
					<u-button
						v-if="formDataValue.state===1 || formDataValue.state===4 || formDataValue.state===6"
						v-permission="{ permission:'app_workList_assignment'}" 
						:text="$t('common.btn.assignment')" 
						type="primary" 
						hairline 
						shape="circle" 
						plain 
						@click="handleUpdate">
					</u-button>
					<!-- 作废 -->
					<u-button 
						v-if="formDataValue.state===2 || formDataValue.state===3 || formDataValue.state===4 || formDataValue.state===6"
						v-permission="{ permission:'app_workList_invalid'}" 
						:text="$t('common.btn.toVoid')" 
						type="error" 
						hairline 
						shape="circle" 
						plain 
						@click="handleVoid">
					</u-button>
					<!-- 结果 -->
					<u-button 
						v-if="formDataValue.state===7" 
						v-permission="{ permission:'app_workList_result'}" 
						:text="$t('common.btn.result')" 
						type="primary" 
						hairline 
						shape="circle" 
						plain 
						@click="handleResult">
					</u-button>
				</view>
			</template>
		</edit-form>
		<!-- 作废 -->
		<u-modal :show="show" :title="$t('common.descTle')" :closeOnClickOverlay="true"
			:asyncClose="true" :showCancelButton="true" @confirm="confirm" @cancel="show = false" @close="show = false">
			<view class="modal-main">
				<view>{{$t('common.descTips')}}</view>
				<u-textarea v-model="invalidNote" maxlength="100" class="modal-text" confirmType="done"
					:placeholder="$t('common.descPlaceholder')"></u-textarea>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { auditWorkSaveOrEdit, auditWorkFindById, auditWorkDeleteByIds, auditWorkInvalidWork, auditWorkAssignWork } from '@/api/lpgManageAppApi.js'
import { UnixToDate } from '@/utils/util.js'
import { settingMixin } from '@/common/settingMixin.js'
export default {
	mixins: [settingMixin],
  data() {
    return {
			isSave: true,
			isAssign: false, // 分派
			editId: '',
			formDataSource: [
				{
					type: 'actionSheet',
					labelText: this.$t('addWork.form.formKey'),
					fieldName: 'formKey',
					placeholder: this.$t('addWork.form.formKeyPlace'),
					required: true,
					showOptions: false,
					disabled: false,
					options: [],
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.formKeyPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseBtn',
					labelText: this.$t('addWork.form.customerId'),
					fieldName: 'customerName',
					placeholder: this.$t('addWork.form.customerIdPlace'),
					maxlength: 30,
					required: true,
					show: true,
					disabled: false,
					func: 'chooseCustomer',
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.customerIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('addWork.form.unitId'),
					fieldName: 'unitId',
					placeholder: this.$t('addWork.form.unitIdPlace'),
					required: true,
					showOptions: false,
					options: [],
					show: false,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.unitIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
				  type: 'picker',
				  labelText: this.$t('addWork.form.levelId'),
				  fieldName: 'levelId',
				  placeholder: this.$t('addWork.form.levelIdPlace'),
				  showOptions: false,
					required: true,
				  options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.levelIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'number',
					labelText: this.$t('addWork.form.cutoff'),
					fieldName: 'cutoff',
					placeholder: this.$t('addWork.form.cutoffPlace'),
					required: true,
					maxlength: 12,
					disabled: false,
					rules: [
						{
							type: 'number',
							required: true,
							message: this.$t('addWork.form.cutoffPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
				  type: 'picker',
				  labelText: this.$t('addWork.form.toOrgId'),
				  fieldName: 'toOrgId',
				  placeholder: this.$t('addWork.form.toOrgIdPlace'),
				  showOptions: false,
					required: true,
				  options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.toOrgIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('addWork.form.toManagerId'),
					fieldName: 'toManagerId',
					placeholder: this.$t('addWork.form.toManagerIdPlace'),
					showOptions: false,
					disabled: false,
					options: []
				},
				{
				  type: 'datetime',
				  labelText: this.$t('addWork.form.actionTimeStr'),
				  fieldName: 'actionTimeStr',
					disabled: false,
				  placeholder: this.$t('addWork.form.actionTimeStrPlace')
				},
				{
					type: 'datetime',
					labelText: this.$t('addWork.form.makeTimeStr'),
					fieldName: 'makeTimeStr',
					disabled: false,
					placeholder: this.$t('addWork.form.makeTimeStrPlace')
				},
				{
					type: 'textarea',
					labelText: this.$t('addWork.form.remarks'),
					fieldName: 'remarks',
					disabled: false,
					placeholder: this.$t('addWork.form.remarksPlace'),
					borderBottom: false,
					maxlength: 100
				}
			],
			formDataValue: {},
			info: {},
			show: false,
			invalidNote: '',
			customerId: ''
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleTextInfo')
			});
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleText')
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
				toOrgId: this.userInfo.orgId
			}
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('chooseCustomer', (data) => {
			this.customerId = data.id
			this.formDataValue = {
				customerName: data.customerName
			}
		})
	},
  methods: {
		// 初始化
		async init() {
			// 获取工单类型
			await this.getWorkType()
			this.formDataSource[0].options = this.workType
			// 获取风险单元
			await this.getRiskUnitList()
			this.formDataSource[2].options = this.riskUnitList
			// 获取工单等级
			await this.getWorkLevel()
			this.formDataSource[3].options = this.workLevel
			// 获取处理组织
			await this.getOrgList()
			this.formDataSource[5].options = this.orgList
			// 获取人员
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource[6].options = this.managerList
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			if (name === 'toOrgId' && queryParams.toOrgId) {
				// 处理组织改变，处理员要重新选择
				await this.getManagerFindList({ orgId: queryParams.toOrgId })
				this.formDataSource[6].options = this.managerList
				// 重置处理员
				queryParams.toManagerId = ''
				this.formDataValue = queryParams
			} else if (name === 'formKey' && queryParams.formKey) {
				if (queryParams.formKey === 'polling') {
					// 巡检单 选择风险单元
					this.formDataSource[1].show = false
					this.formDataSource[2].show = true
				} else {
					// 选择客户
					this.formDataSource[1].show = true
					this.formDataSource[2].show = false
				}
			}
		},
    // 详情
    async getInfo() {
			const { returnValue: res } = await auditWorkFindById({ id: this.editId })
      if (res) {
				res.actionTimeStr = res.actionTime ? UnixToDate(res.actionTime) : ''
				res.makeTimeStr = res.makeTime ? UnixToDate(res.makeTime) : ''
				if (res.formKey === 'polling') {
					// 巡检单
					res.unitId = res.customerId
					this.formDataSource[1].show = false
					this.formDataSource[2].show = true
				} else {
					this.formDataSource[1].show = true
					this.formDataSource[2].show = false
				}
				this.formDataValue = res
				this.info = res
      }
    },
    // 提交
    submitForm(type) {
			if(type === 1) {
				// 分派
				this.$refs.dialogForm.handleSubmit(async(data) => {
					data.id = this.editId || ''
					if (data.formKey === 'polling') {
						data.customerId = data.unitId
					} else {
						data.customerId = this.customerId
					}
					const { returnValue: res, message } = await auditWorkAssignWork(data)
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
			} else {
				// 添加编辑
				this.$refs.dialogForm.handleSubmit(async(data) => {
					data.id = this.editId || ''
					if (data.formKey === 'polling') {
						data.customerId = data.unitId
					}
					const { returnValue: res, message } = await auditWorkSaveOrEdit(data)
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
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.workNo),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await auditWorkDeleteByIds({ ids: [this.editId] })
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
		// 作废
		handleVoid() {
			this.show = true
			this.invalidNote = ''
		},
		// 作废确认
		async confirm() {
			if (!this.invalidNote) {
				uni.$u.toast(this.$t('common.descPlaceholder'))
				return false
			}
			const { returnValue: res, message } = await auditWorkInvalidWork({ id: this.editId, invalidNote: this.invalidNote })
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
		},
		// 分派
		handleUpdate() {
			this.isSave = true
			this.isAssign = true
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleTextAssign')
			});
			this.formDataSource.forEach((v,i)=>{
				if(i > 3 && i !== 8){
					v.disabled = false
				} else {
					v.show = false
				}
			})
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleTextEdit')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = false
			})
		},
		// 选择客户
		chooseCustomer() {
			this.goto('/infoManage/chooseCustomer/chooseCustomer',{
				customerId: this.customerId,
				orgId: this.userInfo.orgId
			})
		},
		// 结果
		handleResult() {
			// 查看安检 整改 巡检 详情
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
	.addRole{
		@include flexMixin(row,flex-end);
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(42, 130, 228, 1);
		width: 100%;
	}
	.draggable{
		padding: 10rpx 16rpx;
	}
	.org-box{
		width: 100%;
		background: rgba(247, 247, 247, 1);
		@include flexMixin(row,flex-start,flex-start);
		padding: 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		.center{
			flex: 1;
			.org-label{
				color: rgba(56, 56, 56, 1);
				font-size: 32rpx;
				display: block;
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
				.u-icon{
					margin-left: 20rpx;
				}
			}
		}
		.icon{
			width: 36rpx;
			height: 40rpx;
		}
	}
}
</style>
