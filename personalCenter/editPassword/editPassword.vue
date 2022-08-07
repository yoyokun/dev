<template>
  <view class="container">
		<view class="personalInfo">
			<view class="title">{{$t('editPassword.pageTitle')}}</view>
			<view class="grayred">{{$t('editPassword.pageGrayred')}}</view>
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
						<u-button :text="$t('editPassword.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
					</view>
				</template>
			</edit-form>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { sysManagerEditPwd } from '@/api/loginApi.js'
import EditForm from '@/components/editForm/index.vue'
export default {
	components:{
		EditForm
	},
  data() {
    return {
			formDataSource: [
				{
					type: 'password',
					labelText: this.$t('editPassword.form.oldPwd'),
					fieldName: 'oldPwd',
					placeholder: this.$t('editPassword.form.oldPwdPlace'),
					maxlength: 12,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('editPassword.form.oldPwdPlace'),
							trigger: ['change','blur']
						},
						{
						  min: 6,
						  max: 12,
						  message: this.$t('editPassword.form.oldPwdMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'password',
					labelText: this.$t('editPassword.form.newPwd'),
					fieldName: 'newPwd',
					placeholder: this.$t('editPassword.form.newPwdPlace'),
					maxlength: 12,
					rules: [
						{
							required: true, 
							message: this.$t('editPassword.form.newPwdPlace'),
							trigger: ['change','blur']
						},
						{
						  min: 6,
						  max: 12,
						  message: this.$t('editPassword.form.newPwdMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'password',
					labelText: this.$t('editPassword.form.newPwd1'),
					fieldName: 'newPwd1',
					placeholder: this.$t('editPassword.form.newPwd1Place'),
					maxlength: 12,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('editPassword.form.newPwd1Place'),
							trigger: ['change','blur']
						},
						{
						  min: 6,
						  max: 12,
						  message: this.$t('editPassword.form.newPwd1Message'),
							trigger: ['change','blur']
						},
						{
							validator: (rule, value, callback) => {
								return value === this.formDataValue.newPwd
							},
							message: this.$t('editPassword.form.newPwdError'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {}
    }
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('editPassword.titleText')
		});
	},
  methods: {
		// 表单改变
		changeForm(obj) {
			this.formDataValue = obj.queryParams
		},
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				const { returnValue: res, message } = await sysManagerEditPwd(data)
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
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.personalInfo{
	height: 100vh;
	position: relative;
	padding-top: 20rpx;
	box-sizing: border-box;
	.title{
		color: rgba(0, 0, 0, 1);
		letter-spacing: 4rpx;
		font-size: 48rpx;
		font-weight: 500;
		padding: 0rpx 32rpx;
		line-height: 64rpx;
	}
	::v-deep .normalForm{
		margin: 60rpx 20rpx;
		width: 710rpx;
		box-sizing: border-box;
		.u-form-item{
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			&:first-child{
				margin-bottom: 20rpx;
				border: 1rpx solid rgba(181, 216, 255, 1);
				box-shadow: none;
			}
			&:nth-child(2){
				border-bottom-right-radius: 0rpx;
				border-bottom-left-radius: 0rpx;
				border: 1rpx solid rgba(181, 216, 255, 1);
				border-bottom: 0rpx;
				box-shadow: none;
			}
			&:nth-child(3){
				border-top-right-radius: 0rpx;
				border-top-left-radius: 0rpx;
				border: 1rpx solid rgba(181, 216, 255, 1);
				border-top: 0rpx;
				box-shadow: none;
			}
		}
		.btn{
			width: 632rpx;
			margin: 60rpx auto;
		}
	}
}
</style>
