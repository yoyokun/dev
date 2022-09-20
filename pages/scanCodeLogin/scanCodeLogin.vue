<template>
	<view class="scanCodeLogin">
		<view class="logo">
			<image class="img" src="@/static/image/pc.png" mode="widthFix"></image>
			<view class="name">{{$t('scanCodeLogin.title')}}</view>
		</view>
		<view class="btn">
			<u-button :text="$t('scanCodeLogin.signIn')" type="primary" hairline shape="circle" @click="getLogin"></u-button>
		</view>
		<view class="btn">
			<u-button :text="$t('scanCodeLogin.cancel')" type="primary" hairline shape="circle" plain @click="cancelFun"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import { sysManagerDecodeCode, sysManagerLoginCode } from '@/api/loginApi.js'
	export default {
		data() {
			return {
				obj: {}
			}
		},
		onLoad(option) {
			if (option.obj) {
				this.obj = JSON.parse(option.obj)
			}
		},
		computed: {},
		methods: {
			// 登录
			async getLogin() {
				const { returnValue: res } = await sysManagerDecodeCode(this.obj).catch(()=>{
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
				if(res){
					const { returnValue: val } = await sysManagerLoginCode({codeContent: res.codeContent}).catch(()=>{
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					})
					if(val){
						this.$refs.uToast.show({
							type: 'success',
							message: this.$t('login.loginSuccess'),
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				}
			},
			// 取消登录
			cancelFun() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
<style>
page{
	background: #fff;
}
</style>

<style scoped lang="scss">
.scanCodeLogin {
	.logo{
		width: 100%;
		background-image: url('~@/static/image/loginBg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		height: 700rpx;
		padding: 200rpx;
		box-sizing: border-box;
		.img{
			width: 350rpx;
			height: 350rpx;
			margin: 0 auto;
			display: block;
		}
		.name{
			color: rgba(112, 112, 112, 1);
			font-size: 24rpx;
			font-weight: 500;
			text-align: center;
			margin: 50rpx auto;
		}
	}
	.btn{
		width: 632rpx;
		margin: 60rpx auto;
	}
}
</style>
