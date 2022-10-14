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
						<description label="业务组织">{{ info.orgName }}</description>
						<description label="单号">{{ info.billNo }}</description>
						<description label="业务类型">{{ info.businessTypeName }}</description>
						<description label="往来类型">{{ info.formType | formType }}</description>
						<description label="往来编号">{{ info.customerNo }}</description>
						<description label="往来名称">{{ info.customerName }}</description>
						<description label="订单状态">{{ info.checkState | checkState }}</description>
						<description label="订单金额">{{ info.goodsTotalMoney }}</description>
						<description label="收费项金额">{{ info.payItemsMoney }}</description>
						<description label="优惠金额">{{ info.couponTotalMoney }}</description>
						<description label="应收金额">{{ info.totalMoney }}</description>
						<description label="开单人">{{ info.creator }}</description>
						<description label="开单时间">{{ info.billTime | dayjs }}</description>
						<description label="金额（元）">{{ info.totalMoney }}</description>
						<description label="重量">{{ info.totalWeight }}</description>
						<description label="数量">{{ info.totalNum }}</description>
						<description label="关联单号">{{ info.linkBillNo }}</description>
						<description label="单据类型">{{ info.linkType | linkType }}</description>
						<description label="打印">{{ info.printCount }}</description>
						<description label="备注">{{ info.remarks }}</description>
						<description label="操作人">{{ info.operator }}</description>
						<description label="操作时间">{{ info.operationTime | dayjs }}</description>
					</description-list>
				</view>
			</view>

			<view class="customerBox" style="padding: 0;">
				<view class="title" @click="isShow1 = !isShow1"
					:style="isShow1?'padding: 10rpx 20rpx 0 20rpx;':'padding:10rpx 20rpx 10rpx 20rpx;'">
					<text class="name">{{$t('salesMg.allotOrderInfo.goodsTle')}}</text>
					<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow1">
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
						</view>
						<view class="info-cell">
							<view class="cell remarks">
								<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
								<view class="cell-content">
									<textarea disabled v-model="item.remarks"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="total">
						<view class="total-tle">
							<text>{{$t('chooseGoods.total')}}：</text>
						</view>
						<view class="total-main">
							<view class="item">
								<text>{{$t('salesMg.receiveAllotOrder.amount')}}：</text>
								<text>{{countNums(salesTransferDetailList)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow2 = !isShow2">
					<text class="name">运输信息</text>
					<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow2">
					<description-list>
						<description label="运输方式">{{ salesOrderTransport.pickMode | pickMode }}</description>
						<description label="预约时间">
							{{ salesOrderTransport.bookingTime | dayjs }}
						</description>
						<description label="车牌号">{{ salesOrderTransport.licenseNo }}</description>
						<description label="配送员/运输员">{{ salesOrderTransport.deliverMan }}</description>
						<description label="收货地址">{{ salesOrderTransport | addressSplicing }}</description>
						<description label="物流费用">{{ info.payItemsMoney }}</description>
						<description label="费用详细">{{ info.payItemsName }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow3 = !isShow3">
					<text class="name">订单折扣</text>
					<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow3">
					<description-list>
						<description label="优惠券号">{{ info.coupon ? info.coupon.couponNo : '' }}</description>
						<description label="优惠券金额">{{ info.couponMoney }}</description>
						<description label="抵扣积分">{{ info.integralValue }}</description>
						<description label="抵扣金额">{{ info.integralMoney }}</description>
						<description label="折扣金额">{{ info.disCountMoney }}</description>
						<description label="折扣率（%）">{{ info.disCountRate }}%</description>
						<description label="合计优惠">{{ info.couponTotalMoney }}</description>
						<description label="成交金额（元）">{{ info.totalMoney }}</description>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==1">
			<view class="customerBox">
				<view class="title">
					<text class="name">{{$t('salesMg.salesOrderInfo.sourceTle')}}</text>
				</view>
				<view class="content">
					<description-list v-if="editId" :title="$t('salesMg.salesOrderInfo.sendTle')">
						<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
					</description-list>
					<description-list v-if="editId" :title="$t('salesMg.salesOrderInfo.recycleTle')">
						<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
					</description-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that = null
	import {
		salesBusinessFindById
	} from '@/api/lpgSalesManageApi'
	import ServiceCylinderInfo from '../../userCenter/auditInfo/common/serviceCylinderInfo'
	export default {
		// 过滤器
		filters: {
			linkType(value) {
				const stateObj = {
					order: '订单',
					transfer: '调拨单',
					purchase: '采购 '
				}
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = {
					1: '待提交',
					2: '待审核',
					3: '已审核',
					4: '未通过',
					5: '已作废'
				}
				return stateObj[value] || ''
			},
			formType(value) {
				const stateObj = {
					1: '客户',
					2: '供应商',
					3: '组织 '
				}
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = {
					1: '自提',
					2: '车辆自提',
					3: '车辆配送'
				}
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
				title: this.$t('业务单详情')
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
				} = await salesBusinessFindById({
					id
				})
				if (res) {
					const payItemsName = []
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.info = res
					this.tableColumn = res.printSetVo.tableColumn
					res.salesBusinessDetailList.forEach(v => {
						v.goodsPath = this.$options.filters.pictureJson(v.goodsPath)
						v.assistUnitsList.forEach((n, j) => {
							this.tableColumn.forEach(m => {
								if (m.propValue === 'assistName-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
								if (m.propValue === 'netContent-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
							})
						})
					})
					this.salesTransferDetailList = res.salesBusinessDetailList
					this.salesOrderTransport = res.salesOrderTransport || {}
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
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
