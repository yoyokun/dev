<template>
  <view class="container">
		<view class="personalInfo">
			<view class="title">{{$t('editPhone.pageTitle')}}</view>
			<view class="grayred">{{$t('editPhone.pageGrayred')}}</view>
			<edit-form
				ref="dialogForm"
				labelWidth="80"
				classForm="normalForm"
				:form-data-source="formDataSource"
				:form-data-value="formDataValue"
				@verifyCode="verifyCode"
				>
				<template v-slot:extra>
					<view class="btn">
						<u-button :text="$t('editPhone.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
					</view>
				</template>
			</edit-form>
		</view>
    <!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { sysManagerEditPhoneSendCode, sysManagerEditPhone } from '@/api/loginApi.js'
export default {
  data() {
    return {
      sendCodeDisabled: false,
      currentTime: 60, // 倒计时60秒
			formDataSource: [
				{
					type: 'text',
					labelText: this.$t('editPhone.form.oldPhone'),
					fieldName: 'oldPhone',
					borderBottom: false,
					disabled: true
				},
				{
					type: 'text',
					labelText: this.$t('editPhone.form.phone'),
					fieldName: 'phone',
					placeholder: this.$t('editPhone.form.phonePlace'),
					maxlength: 11,
					rules: [
						{
							required: true, 
							message: this.$t('editPhone.form.phonePlace'),
							trigger: ['change','blur']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: this.$t('editPhone.form.phoneMessage'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'chooseText',
					labelText: this.$t('editPhone.form.verifyCode'),
					fieldName: 'verifyCode',
					placeholder: this.$t('editPhone.form.verifyCodePlace'),
					btnText: this.$t('editPhone.form.verifyCodeBtnText'),
					btnDisabled: false,
					func: 'verifyCode',
					borderBottom: false,
					maxlength: 6,
					rules: [
						{
							required: true, 
							message: this.$t('editPhone.form.verifyCodePlace'),
							trigger: ['change','blur']
						},
						{
						  min: 4,
						  max: 6,
						  message: this.$t('editPhone.form.verifyCodeMessage'),
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
			title: this.$t('editPhone.titleText')
		});
		this.$nextTick(()=>{
			this.formDataValue = {
				oldPhone: this.userInfo.phone
			}
		})
	},
  methods: {
    // 获取验证码
    async verifyCode(obj) {
			const queryParams = obj.queryParams
      if (this.sendCodeDisabled) {
        return false
      }
			if (!uni.$u.test.mobile(queryParams.phone)) {
				this.$refs.uToast.show({
					type: 'error',
					message: this.$t('editPhone.form.phoneMessage'),
				})
				return false
			}
      const { returnValue: res, message } = await sysManagerEditPhoneSendCode({ phone: queryParams.phone })
      if (res) {
        uni.showToast({
          title: message,
          icon: 'none'
        })
        this.getCode()
      }
    },
    // 倒计时
    getCode() {
      let currentTime = this.currentTime
			this.formDataSource[2].btnText = `${currentTime}s` + this.$t('editPhone.form.verifyCodeBtnMessage')
			this.formDataSource[2].btnDisabled = true
      this.sendCodeDisabled = true
      const interval = setInterval(() => {
				this.formDataSource[2].btnText = `${(currentTime - 1)}s`+ this.$t('editPhone.form.verifyCodeBtnMessage')
        currentTime--
        if (currentTime <= 0) {
          clearInterval(interval)
					this.formDataSource[2].btnText = this.$t('editPhone.form.verifyCodeBtnText')
					this.formDataSource[2].btnDisabled = false
          this.sendCodeDisabled = false
          this.currentTime = 60
        }
      }, 1000)
    },
    // 修改
    submitForm() {
			this.$refs.dialogForm.handleSubmit(async(data) => {
				const { returnValue: res, message } = await sysManagerEditPhone(data)
				if (res) {
					const userInfo = Object.assign({}, this.userInfo, { phone: data.phone })
					this.$store.commit('SET_USERINFO', userInfo)
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
