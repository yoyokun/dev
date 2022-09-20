<template>
  <view class="container">
		<view class="loginKey" @click="goto('/pages/secretKey/secretKey', {}, false)">{{$t('login.setting')}}</view>
		<view class="logo">
			<image class="img" mode="widthFix" src="@/static/image/qxt_logo.png"></image>
			<view class="name">{{$t('login.title')}}</view>
		</view>
		<edit-form
			ref="dialogForm"
			labelWidth="0"
			classForm="normalForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue"
			>
			<template v-slot:extra>
				<view class="forget" @click="goto('/pages/forgetPassword/forgetPassword', {}, false)">{{$t('login.forget')}}</view>
				<view class="btn">
					<u-button :text="$t('login.signIn')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
				</view>
				<view class="btn">
					<u-button :text="$t('login.scanCode')" type="primary" hairline shape="circle" plain @click="submitCode"></u-button>
				</view>
			</template>
		</edit-form>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
			formDataSource: [
				{
					type: 'text',
					labelText: '',
					fieldName: 'phone',
					placeholder: this.$t('login.form.phonePlace'),
					maxlength: 12,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('login.form.phonePlace'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'password',
					labelText: '',
					fieldName: 'password',
					placeholder: this.$t('login.form.passwordPlace'),
					maxlength: 12,
					borderBottom: false,
					rules: [
						{
							required: true, 
							message: this.$t('login.form.passwordPlace'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {}
    }
  },
	// 在onShow生命周期设置导航栏标题
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('login.titleText')
		});
	},
  methods: {
    // 提交
    submitForm() {
			this.$refs.dialogForm.handleSubmit((data) => {
				this.$store.dispatch('user/login', data)
				.then(() => {
					this.$refs.uToast.show({
						type: 'success',
						message: this.$t('login.loginSuccess'),
					})
				  setTimeout(() => {
						this.goto('/pages/index/index')
				  }, 2000)
				})
			})
    },
		// 扫码登录
		async submitCode() {
			const res = await this.decodeQrLogin()
			if(res){
				const data = JSON.parse(res)
				// 设置token
				this.$store.commit('user/SET_TOKEN', data.codeContent)
				this.$refs.uToast.show({
					type: 'success',
					message: this.$t('login.loginSuccess'),
				})
				setTimeout(() => {
					this.goto('/pages/index/index')
				}, 1000)
			}
		}
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>
<style>
page{
	background: #fff;
}
</style>
<style lang="scss" scoped>
.loginKey{
	color: rgba(56, 56, 56, 1);
	letter-spacing: 4rpx;
	font-size: 28rpx;
	font-weight: 400;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
}
.logo{
	width: 100%;
	background-image: url('~@/static/image/loginBg.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	height: 600rpx;
	padding: 200rpx;
	box-sizing: border-box;
	.img{
		width: 188rpx;
		height: 188rpx;
		background: #fff;
		border-radius: 100%;
		padding: 8rpx;
		box-sizing: border-box;
		margin: 0 auto;
		display: block;
	}
	.name{
		color: rgba(42, 130, 228, 1);
		font-size: 40rpx;
		font-weight: 500;
		text-align: center;
		margin-top: 20rpx;
	}
}
::v-deep .normalForm{
	width: 100%;
	padding: 64rpx 76rpx;
	box-sizing: border-box;
	.u-form-item{
		margin-bottom: 20rpx;
		padding: 0rpx;
		.u-form-item__body{
			background: rgba(244, 246, 255, 1);
			border-radius: 100rpx;
			padding: 20rpx;
		}
	}
	.forget{
		color: rgba(42, 130, 228, 1);
		font-size: 24rpx;
		text-align: right;
	}
	.btn{
		margin-top: 50rpx;
	}
}
</style>
