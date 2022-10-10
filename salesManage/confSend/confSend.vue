<template>
	<view class="sk-info">
		<view class="list">
			<view class="list-head">
				<view class="head-tle">回单</view>
				<view class="act-btn">
					<u-icon class="add-icon" name="plus-circle"></u-icon>
					<view class="add-txt" @click="addList">添加</view>
				</view>
			</view>
			<view class="list-box" v-if="listGoods&&listGoods.length">
				<view class="back-item" v-for="(item,index) in listGoods" :key="index">
					<view class="goods-cell">
						<view class="label">出库商品</view>
						<view class="content">
							<view class="goods-item" v-if="item.outGoodsDetailNames">
								<text>{{item.outGoodsDetailNames}}</text>
								<u-icon class="cross" name="close-circle-fill"></u-icon>
							</view>
						</view>
						<u-icon class="plus" name="plus-circle" @click="chooseGoods"></u-icon>
					</view>
					<view class="goods-cell">
						<view class="label">回瓶商品</view>
						<view class="content">
							<view class="goods-item" v-if="item.backGoodsDetailNames">
								<text>{{item.backGoodsDetailNames}}</text>
								<u-icon class="cross" name="close-circle-fill"></u-icon>
							</view>
						</view>
						<u-icon class="plus" name="plus-circle" @click="chooseGoods"></u-icon>
					</view>
					<view class="goods-act">
						<view class="cell">
							<view class="name">出库数</view>
							<view class="txt">{{item.outNum}}</view>
						</view>
						<view class="cell">
							<view class="name">回瓶数</view>
							<input class="txt" step="1" type="number" v-model="item.backNum" />
						</view>
						<view class="cell">
							<view class="name">借瓶数</view>
							<view class="txt">{{item.lendNum}}</view>
						</view>
						<view class="cell">
							<view class="name">还瓶数</view>
							<view class="txt">{{item.returnNum}}</view>
						</view>
					</view>
					<view class="goods-del">
						<u-icon class="del" name="trash"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-head">
				<view class="head-tle">送达钢瓶</view>
			</view>
			<view class="code-box">
				<view class="tle">钢瓶码：</view>
				<u-input type="text" class="code-input" v-model="codeKey" shape="circle"
					:placeholder="$t('cylinderMg.addCirculation.form.codeKey.placeholder')">
					<view slot="suffix">
						<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
					</view>
				</u-input>
				<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
					{{$t('cylinderMg.addCirculation.btn.conf')}}
				</u-button>
			</view>
			<view class="code-info">
				<view class="info-list" v-for="i in 2">
					<view class="head">
						<view class="item">
							<view>瓶身编号：</view>
							<view>22222</view>
						</view>
						<u-icon class="cross" name="minus-circle-fill"></u-icon>
					</view>
					<view class="content">
						<view class="item">
							<view>钢瓶二维码：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>钢瓶型号：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>充装状态：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>持有人：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>流转环节：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>流转状态：</view>
							<view>22222</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="list-head">
				<view class="head-tle">回收钢瓶</view>
			</view>
			<view class="code-box">
				<view class="tle">钢瓶码：</view>
				<u-input type="text" class="code-input" v-model="codeKey" shape="circle"
					:placeholder="$t('cylinderMg.addCirculation.form.codeKey.placeholder')">
					<view slot="suffix">
						<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
					</view>
				</u-input>
				<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
					{{$t('cylinderMg.addCirculation.btn.conf')}}
				</u-button>
			</view>
			<view class="code-info">
				<view class="info-list" v-for="i in 2">
					<view class="head">
						<view class="item">
							<view>瓶身编号：</view>
							<view>22222</view>
						</view>
						<u-icon class="cross" name="minus-circle-fill"></u-icon>
					</view>
					<view class="content">
						<view class="item">
							<view>钢瓶二维码：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>钢瓶型号：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>充装状态：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>持有人：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>流转环节：</view>
							<view>22222</view>
						</view>
						<view class="item">
							<view>流转状态：</view>
							<view>22222</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="list">
			<view class="list-head">
				<view class="head-tle">钢瓶溯源</view>
				<view class="act-btn">
					<u-icon class="add-icon" name="plus-circle"></u-icon>
					<view class="add-txt">添加</view>
				</view>
			</view>
			<view class="source-box">
				<view class="source-list" v-for="i in 2">
					<view class="source-head">
						<view>
							<text>操作</text>
						</view>
						<view>
							<text>确认送达</text>
						</view>
						<view>
							<text>钢瓶型号</text>
						</view>
					</view>
					<view class="source-content">
						<view class="source-del">
							<u-icon class="cross" name="minus-circle-fill"></u-icon>
						</view>
						<view class="source-cell">
							<view class="item">
								<view>
									<u-input type="text" class="code-input" v-model="codeKey" placeholder="钢瓶二维码"
										inputAlign="center">
										<view slot="suffix">
											<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
										</view>
									</u-input>
								</view>
								<view>
									<text>jalwjegwaegk</text>
								</view>
							</view>
							<view class="item gray">
								<view>
									<text>客户回瓶</text>
								</view>
								<view>
									<text>钢瓶型号</text>
								</view>
							</view>
							<view class="item">
								<view>
									<u-input type="text" class="code-input" v-model="codeKey" placeholder="钢瓶二维码"
										inputAlign="center">
										<view slot="suffix">
											<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
										</view>
									</u-input>
								</view>
								<view>
									<text>jalwjegwaegk</text>
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
		assetCodeFillingState
	} from '@/api/lpgManageAppApi'
	import {
		salesOrderFindBackBottleData
	} from '@/api/lpgSalesManageApi'
	import {
		createUniqueString,
	} from '@/utils'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				codeKey: '',
				editId: '',
				backBottle: false, // 确认送达是否有回瓶单
				cylinderScanCode: false, // 确认送达是否需要扫码
				cylinderScanSetting: false, // 钢瓶溯源是否开启
				cylinderPattern: '', // 模式 1 扫码模式 2 一对一置换模式
				listGoods: [],
			}
		},
		// 过滤器
		filters: {},
		computed: {

		},
		async created() {

		},
		async mounted() {

		},
		async onLoad(options) {
			this.backBottle = options.backBottle == 'true' ? true : false
			this.cylinderScanCode = options.cylinderScanCode == 'true' ? true : false
			this.cylinderScanSetting = options.cylinderScanSetting == 'true' ? true : false
			this.cylinderPattern = options.cylinderPattern
			this.editId = options.editId || ''
			if (this.backBottle) {
				// 回瓶单数据
				const {
					returnValue: res
				} = await salesOrderFindBackBottleData({
					id: this.editId
				})
				this.listGoods = res
			}
			uni.setNavigationBarTitle({
				title: '确认送达'
			});
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			// 添加回单
			addList() {
				this.listGoods.push({
					ids: createUniqueString(),
					id: '',
					outGoodsDetailNames: '', // 出库商品
					outGoodsDetailId: '',
					backGoodsDetailNames: '', // 回瓶商品
					backGoodsDetailId: '',
					backNum: 0,
					outNum: 0,
					lendNum: 0,
					returnNum: 0
				})
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
					if (res.securityState == 2) {
						this.saveData(res)
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('security.securityReset.tips.noSecurity')
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
			// 保存数据
			async saveData(data) {
				const {
					isSuccess: res,
					message
				} = await assetCodeFillingState({
					codeKeys: this.codeKey
				}, this.$t('cylinderMg.addCirculation.loadTxt.saving'))
				if (res) {
					this.tableData.push(data)
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
				}
			},
			// 选择商品
			chooseGoods() {
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					businessTag: 'cylinder'
				})
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.sk-info {
		padding: 30rpx 20rpx;

		::v-deep .normalForm {
			.u-form {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				width: 710rpx;
				padding: 10rpx 10rpx;
				box-sizing: border-box;

				.u-form-item .u-line {
					border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
				}
			}

			::v-deep .u-upload__button {
				margin: 0rpx;
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
	}

	.list {
		&:last-child {
			margin-bottom: 0rpx;
		}

		margin-bottom: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;

		.list-box {
			padding: 0 30rpx;

			.back-item {
				border-bottom: 1px dashed rgb(42, 130, 228);

				&:last-child {
					border-bottom: none;
				}

				.goods-cell {
					display: flex;
					padding: 28rpx 0;
					border-bottom: 1px solid #eee;
					align-items: center;

					.label {
						font-size: 30rpx;
						margin-right: 30rpx;
					}

					.content {
						flex: 1;

						.goods-item {
							display: flex;
							align-items: center;
							padding: 12rpx 22rpx;
							min-height: 50rpx;
							border-radius: 50rpx;
							background: rgba(0, 0, 0, 0.08);
							font-size: 28rpx;
							word-break: break-all;
							width: fit-content;
							box-sizing: border-box;

							.cross {
								margin-left: 14rpx;
							}
						}
					}

					.plus {
						margin-left: 30rpx;

						::v-deep .u-icon__icon {
							color: rgb(42, 130, 228) !important;
							font-size: 40rpx !important;
						}
					}
				}

				.goods-act {
					display: flex;
					padding: 28rpx 0;
					border-bottom: 1px solid #eee;

					.cell {
						flex: 1;
						width: 1px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						border-right: 1px solid #eee;

						&:last-child {
							border-right: none;
						}

						.name {
							font-size: 30rpx;
							color: rgb(128, 128, 128);
						}

						input {
							border: 1px solid #eee;

						}

						.txt {
							height: 50rpx;
							line-height: 50rpx;
							margin-top: 14rpx;
							font-size: 30rpx;
							width: 100rpx;
							text-align: center;
							padding: 0 10rpx;
							box-sizing: border-box;
						}
					}
				}

				.goods-del {
					padding: 28rpx 0;
					display: flex;
					justify-content: flex-end;

					.del {
						::v-deep .u-icon__icon {
							color: red !important;
							font-size: 44rpx !important;
						}
					}
				}
			}
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

	}
</style>
