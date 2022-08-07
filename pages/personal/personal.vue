<template>
	<view class="container">
		<view class="userInfo">
			<view class="bg">
				<view class="box">
					<image class="img" :src="userInfo.headPhoto | pictureJson(avatar)" mode="aspectFill" />
					<view class="info">
					  <text class="name">{{ userInfo.name }}</text>
					  <text class="phone">{{ userInfo.phone }}</text>
					</view>
					<view class="org">
						<view class="orgName" @click="show = true">
							<image class="icon" src="/static/image/local.png" mode="widthFix"></image>
							{{userInfo.orgName}}
						</view>
						<view class="logout-btn" @click="logout">{{$t('personal.signOut')}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="part">
		  <view class="form-box" @click="goto('/personalCenter/editInfo/editInfo')">
		  	<view class="title">
					<image class="icon" src="/static/image/titleOne.png" mode="widthFix" />
					{{$t('personal.boxOne.titleOne')}}
				</view>
		  	<u-icon name="arrow-right" color="#2A82E4" size="15" bold></u-icon>
		  </view>
		  <view class="form-box" @click="goto('/personalCenter/jobDetails/jobDetails')">
				<view class="title">
					<image class="icon" src="/static/image/titleTwo.png" mode="widthFix" />
					{{$t('personal.boxOne.titleTwo')}}
				</view>
		  	<u-icon name="arrow-right" color="#2A82E4" size="15" bold></u-icon>
		  </view>
		  <view class="form-box" @click="goto('/personalCenter/printSettings/printSettings')">
				<view class="title">
					<image class="icon" src="/static/image/titleThree.png" mode="widthFix" />
					{{$t('personal.boxOne.titleThree')}}
				</view>
		  	<u-icon name="arrow-right" color="#2A82E4" size="15" bold></u-icon>
		  </view>
		  <view class="form-box" @click="goto('/personalCenter/agreement/agreement')">
				<view class="title">
					<image class="icon" src="/static/image/titleFour.png" mode="widthFix" />
					{{$t('personal.boxOne.titleFour')}}
				</view>
		  	<u-icon name="arrow-right" color="#2A82E4" size="15" bold></u-icon>
		  </view>
		</view>
		<!--切换身份-->
		<u-picker 
		:show="show" 
		ref="uPicker" 
		:closeOnClickOverlay="true" 
		:defaultIndex="defaultIndex" 
		:columns="inIdentityList" 
		keyName="orgName" 
		@confirm="switchOrg" 
		@close="show = false"
		@cancel="show = false"></u-picker>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import {
	sysManagerFindBytoken,
	sysManagerChangerIdentity
} from '@/api/loginApi'
export default {
	data() {
		return {
			show: false
		}
	},
	onShow() {
		this.getInfo()
	},
	computed: {
		inIdentityList() {
			return [this.userInfo.inIdentityList]
		},
		defaultIndex() {
			const orgId = this.userInfo.orgId
			const findIndex = this.userInfo.inIdentityList.findIndex(item=>item.orgId === orgId)
			return [findIndex]
		}
	},
	methods: {
		// 获取详情
		async getInfo() {
			const { returnValue: res } = await sysManagerFindBytoken()
			this.$store.commit('user/SET_USERINFO', res)
		},
		// 切换身份
		async switchOrg({value}) {
			if(this.userInfo.orgId !== value[0].orgId) {
				const { returnValue: res } = await sysManagerChangerIdentity({ identityId: value[0].id })
				if (res) {
					location.reload()
				}
			}
			this.show = false
		},
		// 退出
		logout() {
			this.$store.dispatch('user/logout', {}).then(() => {
				// 退出成功
				this.$refs.uToast.show({
					type: 'success',
					message: this.$t('personal.signOutSuccess')
				})
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}).catch(() => {
			
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
<style lang="scss" scoped>
.userInfo{
	width: 100%;
	.bg{
		background-image: url('~@/static/image/personalBg.png');
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 290rpx;
	}
	.box{
		@include flexMixin(row,flex-start,center);
		padding: 30rpx 30rpx;
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
				color: rgba(255, 255, 255, 1);
				font-size: 36rpx;
				font-weight: 500;
				line-height: 46rpx;
			}
			.phone{
				display: block;
				line-height: 46rpx;
				color: rgba(255, 255, 255, 1);
				font-size: 24rpx;
			}
		}
		.org{
			@include flexMixin(column,flex-start,flex-end);
			.orgName{
				@include flexMixin();
				color: rgba(255, 255, 255, 1);
				font-size: 28rpx;
				line-height: 80rpx;
				.icon{
					width: 24rpx;
					height: 32rpx;
				}
			}
			.logout-btn{
				color: rgba(255, 255, 255, 1);
				font-size: 28rpx;
				border: 1rpx solid rgba(255, 255, 255, 1);
				padding: 8rpx 30rpx;
				border-radius: 100rpx;
			}
		}
	}
}
// 会员
.part{
	width: 682rpx;
	box-sizing: border-box;
	margin: 0rpx 34rpx;
	margin-top: 20rpx;
	.form-box{
		border-bottom: 1rpx solid rgba(229, 229, 229, 1);
		padding: 0rpx;
		&:last-child{
			border: none;
		}
		.title{
			color: rgba(0, 0, 0, 1);
			font-size: 28rpx;
			font-weight: 400;
		}
		.icon{
			width: 48rpx;
			height: 48rpx;
			margin-right: 30rpx;
		}
	}
}
</style>
