<template>
	<view>
		<view class="list">
			<view class="list-head">
				<view class="head-tle">{{title}}</view>
			</view>
			<view class="code-box">
				<view class="tle">{{$t('salesMg.confSend.codeKey.label')}}：</view>
				<u-input type="text" class="code-input" v-model="codeKey" shape="circle" :placeholder="$t('salesMg.confSend.codeKey.placeholder')">
					<view slot="suffix">
						<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
					</view>
				</u-input>
				<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
					{{$t('cylinderMg.addCirculation.btn.conf')}}
				</u-button>
			</view>
			<view class="code-info" v-if="tableData&&tableData.length">
				<view class="info-list" v-for="(item,index) in tableData" :key="index">
					<view class="head">
						<view class="item">
							<view>{{$t('salesMg.confSend.cylinderNo')}}：</view>
							<view>{{item.cylinderNo}}</view>
						</view>
						<u-icon @click="removeData(index)" class="cross" name="minus-circle-fill"></u-icon>
					</view>
					<view class="content">
						<view class="item">
							<view>{{$t('salesMg.confSend.codeKeyNo')}}：</view>
							<view>{{item.codeKey}}</view>
						</view>
						<view class="item">
							<view>{{$t('salesMg.confSend.modelName')}}：</view>
							<view>{{item.modelName}}</view>
						</view>
						<view class="item">
							<view>{{$t('salesMg.confSend.fillingStateStr')}}：</view>
							<view>{{item.fillingStateStr}}</view>
						</view>
						<view class="item">
							<view>{{$t('salesMg.confSend.holderName')}}：</view>
							<view>{{item.holderName}}</view>
						</view>
						<view class="item">
							<view>{{$t('salesMg.confSend.cylinderFlow')}}：</view>
							<view>{{item.cylinderFlow&&item.cylinderFlow.node | node}}</view>
						</view>
						<view class="item">
							<view>{{$t('salesMg.confSend.stateStr')}}：</view>
							<view>{{item.stateStr}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		cylinderArchivesFindByCodeKey,
	} from '@/api/lpgManageAppApi'
	import {
		createUniqueString,
	} from '@/utils'
	export default {
		mixins: [settingMixin],
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				codeKey: '',
				tableData: [],
			}
		},
		// 过滤器
		filters: {
			node(value) {
				const stateObj = that.$t('salesMg.confSend.nodeTxt')
				return stateObj[value] || ''
			}
		},
		computed: {

		},
		async created() {
			that = this
		},
		async mounted() {

		},
		async onLoad(options) {

		},
		onUnload() {

		},
		onShow() {},
		methods: {
			removeData(index) {
				this.tableData.splice(index, 1)
			},
			// 查询二维码
			async searchCode(code = null) {
				this.codeKey = code || this.codeKey
				if (!this.codeKey) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
					return
				}
				const {
					returnValue: res
				} = await cylinderArchivesFindByCodeKey({
					codeKey: this.codeKey
				}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
				if (res) {
					const findIndex = this.tableData.findIndex(item => item.id == res.id)
					if (findIndex == -1) {
						this.tableData.push(res)
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('salesMg.confSend.tips')
						})
					}
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
				}
			},
			// 扫码
			async toScan() {
				const code = await this.decodeQr()
				if (code) {
					this.searchCode(code)
				}
			},
			// 获取钢瓶信息
			getCylinderData() {
				return this.tableData
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		margin-bottom: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
	}

	.list-head {
		height: 90rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		position: relative;

		&:before {
			display: block;
			content: '';
			height: 40rpx;
			width: 8rpx;
			border-radius: 8rpx;
			background: rgba(42, 130, 228, 1);
		}

		.head-tle {
			margin-left: 16rpx;
			font-size: 36rpx;
			width: 1px;
			flex: 1;
			color: #000;
		}

		.act-btn {
			display: flex;
			height: 60rpx;
			border-radius: 60rpx;
			background: rgba(42, 130, 228, 1);
			box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
			align-items: center;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: white;

			.add-icon {
				::v-deep .u-icon__icon {
					color: white !important;
					line-height: auto !important;
					font-size: 34rpx !important;
				}
			}

			.add-txt {
				margin-left: 10rpx;
			}
		}
	}

	.code-box {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.tle {
			font-size: 28rpx;
		}

		.code-input {
			flex: 1;
			width: 1rpx;
			margin-right: 30rpx;
		}

		.code-btn {
			width: 100rpx !important;
		}

	}

	.code-info {
		padding: 0 30rpx;

		.info-list {
			border-bottom: 1px solid #eee;
			padding: 28rpx 0;

			.item {
				display: flex;
				color: #666;
				font-size: 30rpx;
				align-items: center;
				line-height: 38rpx;

				>view:last-child {
					color: #000;
					word-break: break-all;
					width: 1px;
					flex: 1;
				}
			}

			.head {
				display: flex;
				align-items: center;

				.item {
					flex: 1;
					width: 1px;
				}

				.cross {
					::v-deep .u-icon__icon {
						color: red !important;
						font-size: 40rpx !important;
					}
				}
			}

			.content {
				display: flex;
				flex-wrap: wrap;

				.item {
					width: calc(50% - 3px);
					margin-top: 18rpx;

					&:nth-child(odd) {
						margin-right: 6px;
					}
				}
			}
		}
	}
</style>
