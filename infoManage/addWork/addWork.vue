<template>
  <view class="container">
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			>
			<template v-slot:extra>
				<view class="btn" v-if="isSave">
					<u-button :text="$t('addWork.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
				</view>
				<view class="btn" v-else>
					<u-button v-permission="{ permission:'app_workList_edit'}" :text="$t('addWork.edit')" type="primary" hairline shape="circle" plain @click="handleEdit"></u-button>
					<u-button v-permission="{ permission:'app_workList_delete'}" class="m-l20" :text="$t('addWork.delete')" type="error" hairline shape="circle" plain @click="handleDelete"></u-button>
				</view>
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { auditWorkSaveOrEdit, auditWorkFindById, auditWorkDeleteByIds } from '@/api/lpgManageAppApi.js'
import EditForm from '@/components/editForm/index.vue'
import { formatDate } from '@/utils/util.js'
import { settingMixin } from '@/common/settingMixin.js'
export default {
	components:{
		EditForm
	},
	mixins: [settingMixin],
  data() {
    return {
			isSave: true,
			editId: '',
			formDataSource: [
				{
					type: 'actionSheet',
					labelText: this.$t('addWork.form.formKey'),
					fieldName: 'formKey',
					placeholder: this.$t('addWork.form.formKeyPlace'),
					required: true,
					showOptions: false,
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
					type: 'text',
					labelText: this.$t('addWork.form.customerId'),
					fieldName: 'customerId',
					placeholder: this.$t('addWork.form.customerIdPlace'),
					maxlength: 30,
					required: true,
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
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.unitIdPlace'),
							trigger: ['change','blur']
						}
					]
				},
        {
          type: 'datetime',
          labelText: this.$t('addWork.form.actionTimeStr'),
          fieldName: 'actionTimeStr',
          placeholder: this.$t('addWork.form.actionTimeStrPlace')
        },
				{
					type: 'number',
					labelText: this.$t('addWork.form.cutoff'),
					fieldName: 'cutoff',
					placeholder: this.$t('addWork.form.cutoffPlace'),
					required: true,
					maxlength: 12,
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.cutoffPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'datetime',
					labelText: this.$t('addWork.form.makeTimeStr'),
					fieldName: 'makeTimeStr',
					placeholder: this.$t('addWork.form.makeTimeStrPlace')
				},
        {
          type: 'picker',
          labelText: this.$t('addWork.form.levelId'),
          fieldName: 'levelId',
          placeholder: this.$t('addWork.form.levelIdPlace'),
          showOptions: false,
					required: true,
          options: [],
					rules: [
						{
							required: true,
							message: this.$t('addWork.form.levelIdPlace'),
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
					options: []
				},
				{
					type: 'textarea',
					labelText: this.$t('addWork.form.remarks'),
					fieldName: 'remarks',
					placeholder: this.$t('addWork.form.remarksPlace'),
					borderBottom: false,
					maxlength: 100
				}
			],
			formDataValue: {},
			toData: [] // 选中的组织
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		await this.init()
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleTextInfo')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = true
			})
			this.getInfo()
		} else {
			this.isSave = true
			this.formDataValue = {
				toOrgId: this.userInfo.orgId
			}
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleText')
			});
		}
  },
	onShow() {
		// 添加监听事件
		uni.$once('chooseData', (data) => {
			this.toData = data
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
			this.formDataSource[6].options = this.workLevel
			// 获取处理组织
			await this.getOrgList()
			this.formDataSource[7].options = this.orgList
			// 获取人员
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource[8].options = this.managerList
		},
    // 详情
    async getInfo() {
			const { returnValue: res } = await auditWorkFindById({ id: this.editId })
      if (res) {
				res.birthdayStr = res.birthday ? formatDate(res.birthday) : ''
				this.formDataValue = res
      }
    },
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				data.id = this.editId || ''
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
    },
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.deleteTitle'),
				content: this.$t('common.deleteContent'),
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
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('addWork.titleTextEdit')
			});
			this.formDataSource.forEach(v=>{
				v.disabled = false
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
