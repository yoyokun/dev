<template>
	<view class="version">
		<view class="logo">
			<image class="img" mode="widthFix" src="@/static/image/qxt_logo.png"></image>
		</view>
		<view class="app-name">{{$t('version.appName')}}</view>
		<view class="version-name">{{$t('version.versionName')}}：{{version}}</view>
		<view class="release-time">{{$t('version.release')}}：{{releaseTime | dayjs('YYYY-MM-DD')}}</view>
		<u-button class="update-btn" @click="updateApp" type="primary" shape="circle">{{$t('version.updateBtn')}}</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: "1.0",
				releaseTime: "2022-09-20"
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('version.titleText')
			})
		},
		onShow(){
			const vsInfo = uni.getStorageSync('version')
			if(vsInfo){
				this.version = vsInfo.vsNo
				this.releaseTime = vsInfo.createTime
			}
			console.log(vsInfo)
		},
		computed: {},
		mounted() {
		},
		methods: {
			updateApp() {
				// #ifdef APP-PLUS
				const server = "http://code.cygmgs.com/cygmAuthorization/sysEdition/findNew?sysId=5"; //检查更新地址
				uni.request({
					url: server,
					success: (res) => {
						if (res.data.isSuccess) {
							const row = res.data.returnValue
							uni.setStorageSync('version',row)
							if (row.vsNo !== `v${this.version}`) {
								// 提醒用户更新
								uni.showModal({
									title: this.$t('version.tips')[0],
									content: row.vsRemark,
									success: (res) => {
										if (res.confirm) {
											plus.runtime.openURL(row.path);
										} else if (res.cancel) {
										}
									}
								})
							} else {
								this.$u.toast(this.$t('version.tips')[1])
							}
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	page{
		background: rgba(247, 250, 252, 1);
	}
	.version{
		text-align: center;
		padding: 120rpx 70rpx;
		.logo{
			.img{
				background: white;
				width: 150rpx;
				height: 150rpx;
			}
		}
		.app-name{
			font-size: 40rpx;
			margin-top: 40rpx;
		}
		.version-name{
			font-size: 28rpx;
			margin-top: 30rpx;
		}
		.release-time{
			margin-top: 20rpx;
			font-size: 28rpx;
			color: #999;
		}
		.update-btn{
			margin-top: 100rpx;
			box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.04);
		}
	}
</style>
