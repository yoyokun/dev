<template>
	<view>
		<view class="list">
			<view class="list-head">
				<view class="head-tle">{{$t('salesMg.confSend.sourceTle')}}</view>
				<view class="act-btn" @click="addData">
					<u-icon class="add-icon" name="plus-circle"></u-icon>
					<view class="add-txt">{{$t('salesMg.common.btn.add')}}</view>
				</view>
			</view>
			<view class="source-box" v-if="tableData&&tableData.length">
				<view class="source-list" v-for="(item,index) in tableData" :key="index">
					<view class="source-head">
						<view>
							<text>{{$t('salesMg.confSend.table.act')}}</text>
						</view>
						<view>
							<text>{{$t('salesMg.confSend.table.send')}}</text>
						</view>
						<view>
							<text>{{$t('salesMg.confSend.table.model')}}</text>
						</view>
					</view>
					<view class="source-content">
						<view class="source-del">
							<u-icon @click="removeData(index)" class="cross" name="minus-circle-fill"></u-icon>
						</view>
						<view class="source-cell">
							<view class="item">
								<view>
									<u-input type="text" class="code-input" v-model="item.codeKeyGive" :placeholder="$t('salesMg.confSend.table.placeholder')" inputAlign="center" @blur="searchCode(index,'give')">
										<view slot="suffix">
											<u-icon @click="toScan(index,'give')" size="40rpx" color="#3c9cff"
												name="scan"></u-icon>
										</view>
									</u-input>
								</view>
								<view>
									<text>{{item.modelNameGive}}</text>
								</view>
							</view>
							<view class="item gray">
								<view>
									<text>{{$t('salesMg.confSend.table.back')}}</text>
								</view>
								<view>
									<text>{{$t('salesMg.confSend.table.model')}}</text>
								</view>
							</view>
							<view class="item">
								<view>
									<u-input type="text" class="code-input" v-model="item.codeKeyCollect" :placeholder="$t('salesMg.confSend.table.placeholder')" inputAlign="center" @blur="searchCode(index,'collect')">
										<view slot="suffix">
											<u-icon @click="toScan(index,'collect')" size="40rpx" color="#3c9cff"
												name="scan"></u-icon>
										</view>
									</u-input>
								</view>
								<view>
									<text>{{item.modelNameCollect}}</text>
								</view>
							</view>
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
				tableData: [],
			}
		},
		// 过滤器
		filters: {},
		computed: {

		},
		async created() {
			this.addData()
		},
		async mounted() {

		},
		async onLoad(options) {

		},
		onUnload() {

		},
		onShow() {},
		methods: {
			addData() {
				this.tableData.push({
					ids: createUniqueString(),
					codeKeyGive: '',
					modelNameGive: '',
					give: {},
					codeKeyCollect: '',
					modelNameCollect: '',
					collect: {}
				})
			},
			removeData(index) {
				this.tableData.splice(index, 1)
			},
			// 查询二维码
			async searchCode(index, type, code = null) {
				if (type == 'give') {
					this.tableData[index].codeKeyGive = code || this.tableData[index].codeKeyGive
					code = this.tableData[index].codeKeyGive
				} else if (type == 'collect') {
					this.tableData[index].codeKeyCollect = code || this.tableData[index].codeKeyCollect
					code = this.tableData[index].codeKeyCollect
				}
				if (!code) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
					return
				}
				const {
					returnValue: res
				} = await cylinderArchivesFindByCodeKey({
					codeKey: code
				}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
				if (res) {
					const findIndex = this.tableData.findIndex(item => item.give.id == res.id || item.collect.id == res
						.id)
					if (findIndex == -1) {
						if (type == 'give') {
							// 送达
							this.tableData[index].modelNameGive = res.modelName
							this.tableData[index].give = res
						} else if (type == 'collect') {
							// 回收
							this.tableData[index].modelNameCollect = res.modelName
							this.tableData[index].collect = res
						}
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
			async toScan(index, type) {
				const code = await this.decodeQr()
				if (code) {
					this.searchCode(index, type, code)
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

	.source-box {
		font-size: 30rpx;

		.source-head {
			display: flex;
			align-items: center;
			background: rgb(229, 229, 229);

			>view {
				border-right: 1px solid #fff;
				min-height: 74rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
				width: 1px;
				color: rgb(56, 56, 56);
				padding: 10rpx;
				box-sizing: border-box;

				&:last-child {
					border-right: none;
				}
			}

			view:first-child {
				flex: none;
				width: 140rpx;
			}
		}

		.source-content {
			display: flex;

			.source-del {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;
				border-right: 1px solid #eee;

				.cross {
					::v-deep .u-icon__icon {
						color: red !important;
						font-size: 40rpx !important;
					}
				}
			}

			.source-cell {
				width: 1px;
				flex: 1;

				.item {
					min-height: 74rpx;
					display: flex;
					border-bottom: 1px solid #eee;

					&:last-child {
						border-bottom: none;
					}

					&.gray {
						background: rgb(247, 247, 247);
					}

					>view {
						width: 1px;
						flex: 1;
						border-right: 1px solid #eee;
						display: flex;
						align-items: center;
						justify-content: center;
						color: rgb(56, 56, 56);
						word-break: break-all;
						padding: 10rpx;
						box-sizing: border-box;

						&:last-child {
							border-right: none;
						}

						.code-input {
							height: 34rpx;
						}
					}
				}
			}
		}
	}
</style>
