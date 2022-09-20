<template>
	<view class="container">
		<view class="list-box" v-for="item in menu" :key="item.groupsId">
			<view class="title">
				{{ item.groupsName }}
			</view>
			<view class="content">
				<view class="box" v-for="subItem in item.sysAuthorities" :key="subItem.id" @click="goto(subItem.path)">
					<image class="icon" mode="aspectFit" :src="'/static/settingIcon/' + subItem.icon + '.png'"></image>
					<view class="text">{{ subItem.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	mounted() {
		console.log(this.menu.length)
	},
	onShow(){
		uni.setTabBarItem({
			index: 0,
			text: this.$t('tabbar.index')
		})
		uni.setTabBarItem({
			index: 1,
			text: this.$t('tabbar.information')
		})
		uni.setTabBarItem({
			index: 2,
			text: this.$t('tabbar.schedule')
		})
		uni.setTabBarItem({
			index: 3,
			text: this.$t('tabbar.personal')
		})
	},
	async onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			const res = await this.decodeQrLogin()
			if(res){
				const data = JSON.parse(res)
				//  1：扫描登录
				//  2：跳转链接
				//  3：微信支付码
				//  4：身份卡识别码
				//  5：工单识别码
				//  6：设备识别码
				//  8: 登录后token
				if (data.codeType === "1") {
					this.goto('/pages/scanCodeLogin/scanCodeLogin',{
						obj: encodeURIComponent(JSON.stringify(data))
					})
				}
			}
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.list-box{
	border: 1rpx solid rgba(181, 216, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(181, 216, 255, 0.26);
	border-radius: 12rpx;
	margin: 20rpx 40rpx;
	width: 670rpx;
	.title{
		color: rgba(42, 130, 228, 1);
		font-size: 28rpx;
		font-weight: 500;
		background: rgba(240, 247, 255, 0.45);
		height: 80rpx;
		line-height: 80rpx;
		padding: 0rpx 30rpx;
	}
	.content{
		margin: 0rpx 28rpx;
		border-top: 1rpx solid rgba(181, 216, 255, 1);
		@include flexMixin(row,flex-start);
		flex-flow: wrap;
		.box{
			width: 25%;
			text-align: center;
			padding: 20rpx 0rpx;
			.icon{
				width: 80rpx;
				height: 80rpx;
			}
			.text{
				color: rgba(128, 128, 128, 1);
				font-size: 24rpx;
				font-weight: 400;
			}
		}
	}
}
</style>
