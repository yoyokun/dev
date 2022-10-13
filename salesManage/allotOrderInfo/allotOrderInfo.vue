<template>
	<view>
		<view class="tab">
			<u-tabs :scrollable="false" :list="tabSwitch" :current="current" @click="onTabSwitch" lineWidth="60"
				lineColor="#2A82E4" :activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}" :inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}" itemStyle="height: 45px;padding: 0 4px;"></u-tabs>
		</view>
		<view class="container" v-show="current==0">
			<view class="customerBox">
				<view class="title" @click="isShow = !isShow">
					<text class="name">{{$t('salesMg.allotOrderInfo.baseTle')}}</text>
					<u-icon v-if="isShow" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow">
					<description-list>
						<description :label="$t('salesMg.allotOrderInfo.billNo')">{{ info.billNo }}</description>
						<description :label="$t('salesMg.allotOrderInfo.state')">{{ info.state | state }}</description>
						<description :label="$t('salesMg.allotOrderInfo.outOrgName')">{{ info.outOrgName }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.outName')">
							{{ info.outName }}{{ info.outType == 1 ? $t('salesMg.allotOrderInfo.in') : $t('salesMg.allotOrderInfo.out') }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.outOrgAddress')">{{ info.outOrgAddress }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.inOrgName')">{{ info.inOrgName }}</description>
						<description v-if="info.inName" :label="$t('salesMg.allotOrderInfo.inName')">
							{{ info.inName }}{{ info.inType == 1 ? $t('salesMg.allotOrderInfo.in') : $t('salesMg.allotOrderInfo.out') }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.inOrgAddress')">{{ info.inOrgAddress }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.creator')">{{ info.creator }}</description>
						<description :label="$t('salesMg.allotOrderInfo.operationTime')">{{ info.operationTime|dayjs }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.billTime')">{{ info.billTime|dayjs}}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.totalNum')">{{ info.totalNum }}</description>
						<description :label="$t('salesMg.allotOrderInfo.totalWeight')">{{ info.totalWeight }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.remarks')">{{ info.remarks }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow1 = !isShow1">
					<text class="name">{{$t('salesMg.allotOrderInfo.payTle')}}</text>
					<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow1">
					<description-list>
						<description :label="$t('salesMg.allotOrderInfo.payTypeName')">{{ info.payTypeName }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.backTotalMoney')">{{ info.backTotalMoney }}
						</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox" style="padding: 0;">
				<view class="title" @click="isShow2 = !isShow2" :style="isShow2?'padding: 10rpx 20rpx 0 20rpx;':'padding:10rpx 20rpx 10rpx 20rpx;'">
					<text class="name">{{$t('salesMg.allotOrderInfo.goodsTle')}}</text>
					<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow2">
					<view class="goods-list" v-for="(item,index) in salesTransferDetailList" :key="item.ids">
						<view class="goods-head">
							<view class="goods-tle">{{item.goodsNo}} - {{item.goodsName}}</view>
						</view>
						<view class="attr-del">
							<view class="attr">
								<view class="attr-txt">
									{{ item.goodsClassifyName ? item.goodsClassifyName + "," : "" }}
									{{ item.propertyNames ? item.propertyNames + "," : "" }}
									{{ item.businessTagName ? item.businessTagName + "," : "" }}
									{{ item.brandName }}
								</view>
								<u-icon class="arrow-right" name="arrow-right"></u-icon>
								<view class="attr-box">
									<view class="attr-item">
										<view class="item-tle">{{$t('chooseGoods.goodsClassifyName')}}：</view>
										<view class="item-txt">{{item.goodsClassifyName}}</view>
									</view>
									<view class="attr-item" v-if="item.propertyNames">
										<view class="item-tle">{{$t('chooseGoods.propertyNames')}}：</view>
										<view class="item-txt">{{item.propertyNames}}</view>
									</view>
									<view class="attr-item" v-if="item.businessTagName">
										<view class="item-tle">{{$t('chooseGoods.businessTagName')}}：</view>
										<view class="item-txt">{{item.businessTagName}}</view>
									</view>
									<view class="attr-item" v-if="item.brandName">
										<view class="item-tle">{{$t('chooseGoods.brandName')}}：</view>
										<view class="item-txt">{{item.brandName}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.sku')}}：</view>
								<view class="cell-content">{{item.standardName}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.unitsName')}}：</view>
								<view class="cell-content">{{item.unitsName}}</view>
							</view>
							<block v-for="val in tableColumn" :key="val.id">
								<view class="cell"
									v-if="val.supType === 'assistUnits' && val.propValue.includes('netContent')">
									<view class="cell-label">{{val.labelName}}：</view>
									<view class="cell-content">{{item[val.propValue]}}</view>
								</view>
							</block>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.amount')}}：</view>
								<view class="cell-content">{{item.amount}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.receiptNum')}}：</view>
								<view class="cell-content">{{item.receiptNum}}</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell remarks">
								<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
								<view class="cell-content">
									<textarea disabled v-model="item.remarks"
										:placeholder="$t('chooseGoods.remarksPlace')"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="total">
						<view class="total-tle">
							<text>{{$t('chooseGoods.total')}}：</text>
						</view>
						<view class="total-main">
							<!-- <view class="item" v-for="(item,index) in totalUnitCount" :key="index">
								<text>{{index}}：</text>
								<text>{{item}}</text>
							</view> -->
							<view class="item">
								<text>{{$t('salesMg.receiveAllotOrder.amount')}}：</text>
								<text>{{countNums(salesTransferDetailList)}}</text>
							</view>
							<view class="item">
								<text>{{$t('salesMg.receiveAllotOrder.receiptNum')}}：</text>
								<text>{{countNums(salesTransferDetailList,1)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow3 = !isShow3">
					<text class="name">{{$t('salesMg.allotOrderInfo.deliveryTle')}}</text>
					<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow3">
					<description-list>
						<description :label="$t('salesMg.allotOrderInfo.pickMode')">
							{{ salesOrderTransport.pickMode | pickMode }}</description>
						<description :label="$t('salesMg.allotOrderInfo.bookingTime')">
							{{ salesOrderTransport.bookingTime | dayjs}}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.licenseNo')">{{ salesOrderTransport.licenseNo }}
						</description>
						<description :label="$t('salesMg.allotOrderInfo.deliverMan')">
							{{ salesOrderTransport.deliverMan }}</description>
						<description :label="$t('salesMg.allotOrderInfo.address')" col="24">
							{{ salesOrderTransport | addressSplicing }}</description>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==1">
			<view class="customerBox">
				<view class="title">
					<text class="name">{{$t('salesMg.allotOrderInfo.sourceTle')}}</text>
				</view>
				<view class="content">
					<description-list v-if="editId">
						<service-cylinder-info node-type="transferReceive" :link-id="editId" />
					</description-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that = null
	import {
		salesTransferFindById
	} from '@/api/lpgSalesManageApi'
	import ServiceCylinderInfo from '../../userCenter/auditInfo/common/serviceCylinderInfo'
	export default {
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('salesMg.allotOrderInfo.stateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.allotOrderInfo.pickModeTxt')
				return stateObj[value] || ''
			}
		},
		components: {
			ServiceCylinderInfo
		},
		data() {
			return {
				editId: '',
				tabSwitch: this.$t('salesMg.allotOrderInfo.tabs'),
				current: 0,
				isShow: true,
				isShow1: true,
				isShow2: true,
				isShow3: true,
				tableColumn: [],
				info: {},
				salesTransferDetailList: [],
				salesOrderTransport: {},
				// totalUnitCount: {},
			}
		},
		async onLoad(options) {
			that = this
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.allotOrderInfo.titleText')
			})
			this.editId = options.editId || ''
			if (options.editId) {
				this.getInfo(options.editId)
			}
		},
		onShow() {

		},
		methods: {
			countNums(data, type = null) {
				let nums = 0
				let receiptNums = 0
				data.forEach(i => {
					nums += i.amount
					receiptNums += i.receiptNum
				})
				if (type) {
					return receiptNums
				} else {
					return nums
				}
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await salesTransferFindById({
					id
				})
				if (res) {
					const payTypeName = []
					res.salesOrderPayDetailList.forEach((v) => {
						payTypeName.push(`${v.collectionTypeName}:${v.payMoney}`)
					})
					res.payTypeName = payTypeName.join(',')
					this.info = res
					this.tableColumn = res.printSetVo.tableColumn
					// let totalUnitCount = {}
					res.salesTransferDetailList.forEach(v => {
						v.goodsPath = this.$options.filters.pictureJson(v.goodsPath)
						v.assistUnitsList.forEach((n, j) => {
							this.tableColumn.forEach(m => {
								if (m.propValue == 'assistName-' + n.assistUnitsId) {
									// let ele = totalUnitCount[m
									// 	.labelName] || 0
									// ele += parseFloat(n.netContent)
									// totalUnitCount[m.labelName] = ele
									v[m.propValue] = n.netContent
								}
								if (m.propValue == 'netContent-' + n.assistUnitsId) {
									// let ele = totalUnitCount[m
									// 	.labelName] || 0
									// ele += parseFloat(n.netContent)
									// totalUnitCount[m.labelName] = ele
									v[m.propValue] = n.netContent
								}
							})
						})
					})
					// this.totalUnitCount = totalUnitCount
					this.salesTransferDetailList = res.salesTransferDetailList
					this.salesOrderTransport = res.salesOrderTransport
				}
			},
			// 切换
			onTabSwitch(item) {
				this.current = item.index
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.basic-tle {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-bottom: 1px solid #eee;
	}

	.tip-tle {
		font-size: 26rpx;
		color: #999;
		font-weight: normal;
		margin-left: 20rpx;
	}

	.container {
		padding: 48px 0;
		padding-bottom: 60px;
	}

	.total {
		display: flex;
		font-size: 28rpx;
		min-height: 80rpx;

		.total-tle {

			padding: 0 20rpx;
			background: rgba(42, 130, 228, 1);
			color: white;
			display: flex;
			// justify-content: center;
			align-items: center;
		}

		.total-main {
			display: flex;
			flex: 1;
			width: 1px;
			background: rgba(240, 247, 255, 0.35);
			align-items: center;
			padding: 10rpx 20rpx;
			flex-wrap: wrap;

			.item {
				margin-right: 30rpx;
				word-break: break-all;

				>text:first-child {
					color: gray;
				}

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}

	.customerBox {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		margin: 20rpx 20rpx 10rpx 20rpx;
		overflow: hidden;
		.title {
			@include flexMixin();
			padding: 0rpx 10rpx;

			.name {
				font-size: 36rpx;
				font-weight: 500;
				line-height: 80rpx;

				&:before {
					display: inline-block;
					content: " ";
					width: 8rpx;
					height: 35rpx;
					background: rgba(42, 130, 228, 1);
					border-radius: 20rpx;
					top: 4rpx;
					margin-right: 10rpx;
					position: relative;
				}
			}
		}

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
					font-size: 28rpx;
					color: #000;
					line-height: 38rpx;
					font-weight: bold;
				}

				.goods-price {
					font-size: 28rpx;
					line-height: 38rpx;
					font-weight: bold;
					color: red;
					margin-left: 10rpx;
				}
			}

			.attr-del {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				align-items: center;
			}

			.attr {
				padding: 0 10rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
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
					max-width: 360rpx;
					width: fit-content;
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
					width: 360rpx;
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
						left: 10rpx;
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
				font-size: 28rpx;
				line-height: 28rpx;
				flex-wrap: wrap;

				.cell {
					width: 50%;
					display: flex;
					align-items: center;
					margin-top: 30rpx;

					&.remarks {
						width: 100%;
					}

					.cell-label {
						color: rgba(128, 128, 128, 1);
						white-space: nowrap;
					}

					.cell-content {
						flex: 1;
						display: flex;

						textarea {
							width: 100%;
							background: rgba(247, 247, 247, 1);
							height: 110rpx;
							border-radius: 14rpx;
							padding: 20rpx;
							box-sizing: border-box;
							font-size: 28rpx;
						}
					}
				}


			}
		}

		.content {
			border-top: 0.5rpx solid #f1eeee;
		}

		::v-deep .u-upload__button {
			margin: 0rpx;
		}
	}
</style>
