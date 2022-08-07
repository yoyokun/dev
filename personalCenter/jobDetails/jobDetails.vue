<template>
  <view class="container">
		<view class="jobInfo">
			<view class="box">
				<image class="img" :src="userInfo.headPhoto | pictureJson(avatar)" mode="aspectFill" />
				<view class="info">
				  <text class="name">{{ userInfo.name }}</text>
				</view>
			</view>
			<view class="form-box">
				<view class="title">
					<image class="icon" src="/static/image/orgName.png" mode="widthFix" />
					{{$t('jobDetails.orgName')}}
				</view>
				<view class="value">{{ userInfo.orgName }}</view>
			</view>
			<view class="form-box">
				<view class="title">
					<image class="icon" src="/static/image/roleNames.png" mode="widthFix" />
					{{$t('jobDetails.roleNames')}}
				</view>
				<view class="value">{{ userInfo.deptNames }} / {{ userInfo.roleNames }}</view>
			</view>
		</view>
    <!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('jobDetails.titleText')
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.jobInfo{
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	border: 1rpx solid rgba(181, 216, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(181, 216, 255, 0.26);
	border-radius: 12rpx;
	margin: 60rpx 40rpx;
	width: 670rpx;
	padding: 10rpx;
	.box{
		@include flexMixin(row,flex-start,center);
		padding: 20rpx 20rpx;
		.img{
			width: 128rpx;
			height: 128rpx;
			border-radius: 100%;
		}
		.info{
			padding-left: 20rpx;
			flex: 1;
			.name{
				display: block;
				color: rgba(56, 56, 56, 1);
				font-size: 36rpx;
				font-weight: 500;
				line-height: 46rpx;
			}
			.phone{
				display: block;
				line-height: 46rpx;
				color: rgba(56, 56, 56, 1);
				font-size: 24rpx;
			}
		}
	}
	.form-box{
		border-bottom: 1rpx solid rgba(181, 216, 255, 1);
		padding: 0rpx;
		.icon{
			width: 45rpx;
			height: 45rpx;
			margin-right: 20rpx;
			margin-left: 20rpx;
		}
		&:last-child{
			border: none;
		}
		.value{
			text-align: right;
		}
	}
}
</style>
