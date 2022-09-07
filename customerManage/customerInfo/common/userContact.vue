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
import { userContactSaveOrEdit, userContactDeleteByIds, userContactFindById } from '@/api/lpgManageAppApi.js'
import { formatDate } from '@/utils/util.js'
export default {
  data() {
    return {
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('userContact.form.linkman'),
					fieldName: 'linkman',
					placeholder: this.$t('userContact.form.linkmanPlace'),
					maxlength: 30,
					required: true,
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('userContact.form.linkmanPlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('userContact.form.linkTel'),
					fieldName: 'linkTel',
					placeholder: this.$t('userContact.form.linkTelPlace'),
					maxlength: 11,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('userContact.form.linkTelPlace'),
							trigger: ['change','blur']
						},
						{
							pattern: /^[0-9]*$/,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: this.$t('userContact.form.linkTelMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('userContact.form.named'),
					fieldName: 'named',
					placeholder: this.$t('userContact.form.namedPlace'),
					showOptions: false,
					options: this.$t('userContact.form.namedOptions'),
					defaultValue: this.$t('userContact.form.namedOptions')[0].value
				},
				{
					type: 'text',
					labelText: this.$t('userContact.form.position'),
					fieldName: 'position',
					placeholder: this.$t('userContact.form.positionPlace'),
					maxlength: 30
				},
				{
					type: 'date',
					labelText: this.$t('userContact.form.birthdayStr'),
					fieldName: 'birthdayStr',
					placeholder: this.$t('userContact.form.birthdayStrPlace'),
				},
				{
					type: 'textarea',
					labelText: this.$t('userContact.form.remarks'),
					fieldName: 'remarks',
					placeholder: this.$t('userContact.form.remarksPlace'),
					maxlength: 100
				},
				{
					type: 'switch',
					labelText: this.$t('userContact.form.isDefault'),
					fieldName: 'isDefault',
					inputAlign: 'right',
					activeValue: 1,
					inactiveValue: 2,
					defaultValue: 2,
					borderBottom: false
				}
			],
			formDataValue: {}
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
	mounted() {
		this.$nextTick(async() => {
			if (this.editId) {
				await this.getInfo(this.editId)
			}
		})
	},
  methods: {
    // 详情
    async getInfo() {
			const { returnValue: res } = await userContactFindById({ id: this.editId })
      if (res) {
				res.birthdayStr = res.birthday ? formatDate(res.birthday) : ''
				this.formDataValue = res
      }
    },
		// 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				data.id = this.editId || ''
				data.customerId = this.customerId
				const { returnValue: res, message } = await userContactSaveOrEdit(data)
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
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.linkman),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await userContactDeleteByIds({ ids: [this.editId] })
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
