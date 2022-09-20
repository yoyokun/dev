<template>
	<view class="msg">
		<view class="msg-tle">{{title}}</view>
		<view class="msg-lst" v-for="(item,index) in info" :key="key">
			<view class="msg-time">{{item.releaseTime | dayjs}}</view>
			<view class="msg-content">
				<view class="msg-txt">{{item.contents}}</view>
				<!-- <view class="btn" v-if="item.links" @click="goto(item)">{{$t('systemMessage.viewBtn')}}</view> -->
			</view>
		</view>
	</view>
</template>
<script>
	import {
		sysMessageHistoryDataById
	} from '@/api/lpgManageAppApi'
	export default {
		data() {
			return {
				info: [],
				title: ''
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.$t('systemMessage.titleText')
			})
			if (options.editId) {
				this.getInfo(options.editId)
			}

		},
		onShow() {

		},
		methods: {
			goto(item) {
				if (item.links == 'NoticeSecurityCheck') {
					this.$navigateTo('')
				} else {
					this.$navigateTo(item.links)
				}
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await sysMessageHistoryDataById({
					id
				})
				if (res.length) {
					this.info = res
					this.title = res[0].title
					uni.setNavigationBarTitle({
						title: this.title
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: white;
	}

	.msg {
		padding: 0 40rpx;
		padding-bottom: 120rpx;

		.msg-tle {
			padding-top: 50rpx;
			font-size: 40rpx;
			text-align: center;
			word-break: break-all;
		}

		.msg-lst {
			padding-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30rpx;

			.msg-time {
				color: #999;
				font-size: 26rpx;
			}

			.msg-content {
				background: rgba(237, 237, 237, 1);
				border-radius: 30rpx;
				margin-top: 14rpx;
				width: 100%;
				box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
				border: 1px solid #f7f7f7;
				overflow: hidden;

				.msg-txt {
					padding: 30rpx;
					font-size: 26rpx;
					word-break: break-all;
				}

				.btn {
					text-align: center;
					padding: 20rpx;
					border-top: 1px solid #fff;
					color: #2979ff;

					&:active {
						background: #ddd;
					}
				}
			}

		}

	}
</style>
