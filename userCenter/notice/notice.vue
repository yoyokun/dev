<template>
	<view class="msg">
		<view class="msg-tle">{{title}}</view>
		<view class="msg-lst">
			<view class="msg-time">{{info.releaseTime | dayjs}}</view>
			<view class="msg-desc">
				<view>{{$t('notice.source')}}：{{ info.source }}</view>
				<view>{{$t('notice.clickNum')}}：{{ info.clickNum }}</view>
			</view>
			<view class="msg-content">
				<view class="msg-txt">
					<u-parse :content="info.contents"></u-parse>
				</view>
				
			</view>
		</view>
	</view>
</template>
<script>
	import { sysMessageReadMessage } from '@/api/lpgManageAppApi'
	export default {
		data() {
			return {
				info: null,
				title: ''
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.$t('notice.titleText')
			})
			if (options.editId) {
				this.getInfo(options.editId)
			}

		},
		onShow() {

		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await sysMessageReadMessage({
					id
				})
				if (res) {
					this.info = res
					this.title = res.title
					uni.setNavigationBarTitle({
						title: this.title
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: white;
	}
	.msg {
		padding: 0 40rpx;
		padding-bottom: 120rpx;
		.msg-tle{
			padding-top: 50rpx;
			font-size: 40rpx;
			text-align: center;
			word-break: break-all;
		}
		.msg-lst{
			padding-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30rpx;
			.msg-time{
				color: #999;
				font-size: 26rpx;
			}
			.msg-desc{
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin-top: 14rpx;
				font-size: 26rpx;
				color: #333;
			}
			.msg-content{
				background: rgba(237, 237, 237, 1);
				border-radius: 30rpx;
				margin-top: 14rpx;
				width: 100%;
				box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.04);
				border: 1px solid #f7f7f7;
				overflow: hidden;
				.msg-txt{
					padding: 30rpx;
					font-size: 26rpx;
					word-break: break-all;
				}
			}
			
		}
		
	}
</style>
