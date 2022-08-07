<template>
  <view class="container">
		<view class="personalInfo">
			<edit-form
				ref="dialogForm"
				labelWidth="80"
				classForm="normalForm"
				:form-data-source="formDataSource"
				:form-data-value="formDataValue"
				@change="changeForm"
				@verifyCode="verifyCode"
				>
				<template v-slot:extra>
					<view class="btn">
						<u-button :text="$t('forgetPassword.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
					</view>
				</template>
			</edit-form>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { sysManagerEditPwdSendCode, sysManagerEditPwdCode } from '@/api/loginApi.js'
import EditForm from '@/components/editForm/index.vue'
export default {
	components:{
		EditForm
	},
  data() {
    return {
      sendCodeDisabled: false,
      currentTime: 60, // 倒计时60秒
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('forgetPassword.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('forgetPassword.form.phonePlace'),
					maxlength: 11,
					rules: [
						{
							required: true, 
							message: this.$t('forgetPassword.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: this.$t('forgetPassword.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseText',
					labelText: this.$t('forgetPassword.form.verifyCode'),
					fieldName: 'verifyCode',
					placeholder: this.$t('forgetPassword.form.verifyCodePlace'),
					btnText: this.$t('forgetPassword.form.verifyCodeBtnText'),
					btnDisabled: false,
					func: 'verifyCode',
					maxlength: 6,
					rules: [
						{
							required: true, 
							message: this.$t('forgetPassword.form.verifyCodePlace'),
							trigger: ['change','blur']
						},
						{
						  min: 4,
						  max: 6,
						  message: this.$t('forgetPassword.form.verifyCodeMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('forgetPassword.form.newPwd'),
					fieldName: 'newPwd',
					placeholder: this.$t('forgetPassword.form.newPwdPlace'),
					maxlength: 12,
					rules: [
						{
							required: true, 
							message: this.$t('forgetPassword.form.newPwdPlace'),
							trigger: ['change','blur']
						},
						{
						  min: 6,
						  max: 12,
						  message: this.$t('forgetPassword.form.newPwdMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'text',
					labelText: this.$t('forgetPassword.form.newPwd1'),
					fieldName: 'newPwd1',
					placeholder: this.$t('forgetPassword.form.newPwd1Place'),
					maxlength: 12,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('forgetPassword.form.newPwd1Place'),
							trigger: ['change','blur']
						},
						{
						  min: 6,
						  max: 12,
						  message: this.$t('forgetPassword.form.newPwd1Message'),
							trigger: ['change','blur']
						},
						{
							validator: (rule, value, callback) => {
								return value === this.formDataValue.newPwd
							},
							message: this.$t('forgetPassword.form.newPwdError'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {}
		}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
		// 表单改变
		changeForm(obj) {
			this.formDataValue = obj.queryParams
		},
    // 获取验证码
    async verifyCode(obj) {
			const queryParams = obj.queryParams
      if (this.sendCodeDisabled) {
        return false
      }
			if (!uni.$u.test.mobile(queryParams.phone)) {
				this.$refs.uToast.show({
					type: 'error',
					message: this.$t('forgetPassword.form.phoneMessage'),
				})
				return false
			}
      const { returnValue: res, message } = await sysManagerEditPwdSendCode({ phone: queryParams.phone })
      if (res) {
				this.$refs.uToast.show({
					type: 'success',
					message: message,
				})
        this.getCode()
      }
    },
    // 倒计时
    getCode() {
      let currentTime = this.currentTime
			this.formDataSource[1].btnText = `${currentTime}s`+ this.$t('forgetPassword.form.verifyCodeBtnMessage')
			this.formDataSource[1].btnDisabled = true
      this.sendCodeDisabled = true
      const interval = setInterval(() => {
				this.formDataSource[1].btnText = `${(currentTime - 1)}s`+ this.$t('forgetPassword.form.verifyCodeBtnMessage')
        currentTime--
        if (currentTime <= 0) {
          clearInterval(interval)
					this.formDataSource[1].btnText = this.$t('forgetPassword.form.verifyCodeBtnText')
					this.formDataSource[1].btnDisabled = false
          this.sendCodeDisabled = false
          this.currentTime = 60
        }
      }, 1000)
    },
    // 修改
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				const { returnValue: res, message } = await sysManagerEditPwdCode(data)
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
	padding-top: 40rpx;
	box-sizing: border-box;
	::v-deep .normalForm{
		.u-form{
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			margin: 0rpx 20rpx;
			width: 710rpx;
			padding: 10rpx 10rpx;
			box-sizing: border-box;
			border: 1rpx solid rgba(181, 216, 255, 1);
		}
		.btn{
			width: 632rpx;
			margin: 60rpx auto;
		}
	}
}
::v-deep .chooseBtn{
	border-radius: 30rpx;
}
</style>
