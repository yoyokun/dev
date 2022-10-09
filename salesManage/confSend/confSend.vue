<template>
	<view class="sk-info">
		<view class="list">
			<view class="list-head">
				<view class="head-tle">回单</view>
				<view class="act-btn" @click="chooseGoods">
					<u-icon class="add-icon" name="plus-circle"></u-icon>
					<view class="add-txt">{{$t('stockMg.common.btn.addGoodsTxt')}}</view>
				</view>
			</view>
			<view class="goods">
				<view class="goods-list" v-for="(val,key) in listGoods" :key="key">
					<view class="goods-head">
						<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
					</view>
					<view class="attr-del">
						<view class="attr">
							<view class="attr-txt">
								{{ val.goodsClassifyName ? val.goodsClassifyName + "," : "" }}
								{{ val.propertyNames ? val.propertyNames + "," : "" }}
								{{ val.standardName ? val.standardName + "," : "" }}
								{{ val.brandName }}
							</view>
							<u-icon class="arrow-right" name="arrow-right"></u-icon>
							<view class="attr-box">
								<view class="attr-item">
									<view class="item-tle">{{$t('chooseGoods.goodsClassifyName')}}：</view>
									<view class="item-txt">{{val.goodsClassifyName}}</view>
								</view>
								<view class="attr-item" v-if="val.propertyNames">
									<view class="item-tle">{{$t('chooseGoods.propertyNames')}}：</view>
									<view class="item-txt">{{val.propertyNames}}</view>
								</view>
								<view class="attr-item" v-if="val.standardName">
									<view class="item-tle">{{$t('chooseGoods.standardName')}}：</view>
									<view class="item-txt">{{val.standardName}}</view>
								</view>
								<view class="attr-item" v-if="val.brandName">
									<view class="item-tle">{{$t('chooseGoods.brandName')}}：</view>
									<view class="item-txt">{{val.brandName}}</view>
								</view>
								<view class="attr-item" v-if="val.unitsName">
									<view class="item-tle">{{$t('chooseGoods.unitsName')}}：</view>
									<view class="item-txt">{{val.unitsName}}</view>
								</view>
							</view>
						</view>
						<u-icon class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(key)">
						</u-icon>
					</view>

					<view class="info-cell">
						<view class="cell">
							<view class="cell-label">出库数：</view>
							<view class="cell-content">2</view>
						</view>
						<view class="cell">
							<view class="cell-label">回瓶数：</view>
							<view class="cell-content">
								<input type="number" :placeholder="'回瓶数'" v-model="val.checkNums" @input="changeNums($event,key)" />
							</view>
						</view>
					</view>
					<view class="info-cell">
						<view class="cell">
							<view class="cell-label">借瓶数：</view>
							<view class="cell-content">2</view>
						</view>
						<view class="cell">
							<view class="cell-label">还瓶数：</view>
							<view class="cell-content">2</view>
						</view>
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
		</view>
		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
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
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				listGoods:[{}],
				codeKey: '',
				tableColumn: [{
					prop: 'cylinderNo',
					label: this.$t('cylinderMg.addCirculation.tableColumn.cylinderNo'),
					width: '160rpx',
					align: 'center'
				}, {
					prop: 'codeKey',
					label: this.$t('cylinderMg.addCirculation.tableColumn.codeKey'),
					width: '210rpx',
					align: 'center'
				}, {
					prop: 'modelName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.modelName'),
					width: '160rpx',
					align: 'center'
				}, {
					prop: 'holderName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.holderName'),
					width: '170rpx',
					align: 'center'
				}],
				tableData: []
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
			uni.setNavigationBarTitle({
				title: '确认送达'
			});
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
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
					multiple: true
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

		.table {
			margin-top: 30rpx;
		}

		.code-box {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			.tle{
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
	}

	.list {
		&:last-child {
			margin-bottom: 0rpx;
		}

		margin-bottom: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;

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


		.goods {
			.goods-list {
				padding: 30rpx 30rpx;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}

				.goods-head {
					display: flex;

					.goods-tle {
						flex: 1;
						width: 1px;
						word-break: break-all;
						font-size: 32rpx;
						color: #000;
						line-height: 38rpx;
					}

					.goods-reason {
						font-size: 28rpx;
						line-height: 38rpx;
						margin-left: 10rpx;
						color: #666;

						&.on {
							color: rgba(42, 130, 228, 1);
						}
					}
				}

				.attr-del {
					display: flex;
					justify-content: space-between;
					margin-top: 30rpx;
					align-items: center;

					.remove-goods {
						::v-deep .u-icon__icon {
							color: rgba(255, 79, 35, 1.0) !important;
							font-size: 46rpx !important;
						}
					}
				}

				.attr {
					padding: 0 10rpx;
					height: 50rpx;
					display: flex;
					align-items: center;
					width: 360rpx;
					background: rgba(247, 247, 247, 1);
					border-radius: 4rpx;
					position: relative;

					&:hover {
						.arrow-right {
							transform: rotate(90deg);
						}

						.attr-box {
							display: block;
						}
					}

					.attr-txt {
						color: rgba(56, 56, 56, 1);
						font-size: 28rpx;
						width: 1px;
						flex: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.attr-box {
						display: none;
						z-index: 20;
						position: absolute;
						left: 0;
						background: rgba(247, 247, 247, 1);
						border-radius: 16rpx;
						top: 74rpx;
						width: 100%;
						padding: 20rpx;
						box-sizing: border-box;

						.attr-item {
							display: flex;
							font-size: 24rpx;
							margin-bottom: 10rpx;
							color: #000;
							font-weight: bold;

							&:last-child {
								margin-bottom: 0;
							}

							.item-tle {
								color: rgba(56, 56, 56, 1);
								font-weight: normal;
							}
						}

						&::before {
							content: '';
							position: absolute;
							top: -15rpx;
							left: calc(50% - 15rpx);
							transform: translate(-50%, 0%);
							transform: rotate(45deg);
							display: block;
							width: 30rpx;
							height: 30rpx;
							background: rgba(247, 247, 247, 1);
						}
					}
				}

				.info-cell {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					line-height: 30rpx;
					margin-top: 30rpx;
					justify-content: space-between;
					flex-wrap: wrap;
					.cell {
						display: flex;
						align-items: center;
						width: 50%;
						.cell-label {
							color: rgba(128, 128, 128, 1);
						}

						.cell-content {
							input {
								width: 120rpx;
								font-size: 30rpx;
								text-align: center;
								border-bottom: 1px solid #ccc;
							}
						}
					}
				}
			}
		}
	}
</style>
