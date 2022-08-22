<template>
	<view class="auditInfo">
		<u-steps :current="active" class="step">
			<u-steps-item v-for="item in auditRecordVos" :title="item.levelName" :key="item.auditTime"
				:desc="item.auditTime | dayjs"></u-steps-item>
		</u-steps>
		<view class="audit-info-content">
			<!-- 业务单 -->
			<business-info v-if="info.formKey === 'salesBusiness'" :edit-id="info.linkId" />
			<!--资金期初-->
			<account-period-info v-if="info.formKey === 'financeAccountRecord_2'" :edit-id="info.linkId" />
			<!--资金支取-->
			<capital-draw-info v-if="info.formKey === 'financeAccountRecord_1'" :edit-id="info.linkId" />
			<!--应收单-->
			<receivable-info v-if="info.formKey === 'cashMoneyLog'" :edit-id="info.linkId" />
			<!--应付单-->
			<cope-info v-if="info.formKey === 'payMoneyLog'" :edit-id="info.linkId" />
			<!--收款单-->
			<gathering-info v-if="info.formKey === 'cashMoneyBillLog'" :edit-id="info.linkId" />
			<!--付款单-->
			<payment-info v-if="info.formKey === 'payMoneyBillLog'" :edit-id="info.linkId" />
			<!--调价单-->
			<price-plan-info v-if="info.formKey === 'pricePlan'" :edit-id="info.linkId" />
			<!--盘点单-->
			<stock-taking-info v-if="info.formKey === 'stockCheck'" :edit-id="info.linkId" />
			<!--充装转换-->
			<filling-change-info v-if="info.formKey === 'fillingChangeLog'" :edit-id="info.linkId" />
			<!--采购入库-->
			<pur-good-tank-car-house-info v-if="info.formKey === 'purInStorage'" :edit-id="info.linkId" />
			<!--单据详情-->
			<goods-info v-if="info.formKey === 'goods'" :edit-id="info.linkId" />
			<!--价格策略-->
			<price-strategy-info v-if="info.formKey === 'priceStrategy'" :edit-id="info.linkId" />
			<!--出入库单-->
			<single-output-info v-if="info.formKey === 'stockInOut'" :edit-id="info.linkId" />
			<!--退款单-->
			<refund-info v-if="info.formKey === 'salesOrderRefund'" :edit-id="info.linkId" />
			<!-- 销售单 -->
			<sales-orders-info v-if="info.formKey === 'salesOrder'" :edit-id="info.linkId" />
			<!--采购申请-->
			<pur-good-requisition-info v-if="info.formKey === 'purApply'" :edit-id="info.linkId" />
			<!--采购单-->
			<pur-good-order-info v-if="info.formKey === 'purOrder'" :edit-id="info.linkId" />
			<!--采购计划-->
			<pur-good-plan-info v-if="info.formKey === 'purPlan'" :edit-id="info.linkId" />
			<!--优惠券-->
			<coupon-info v-if="info.formKey === 'coupon'" :edit-id="info.linkId" />
			<!--客户价格策略-->
			<price-customer-info v-if="info.formKey === 'customerPrice'" :edit-id="info.linkId" />
			<!--客户钢瓶盘点-->
			<user-cylinder-check-info v-if="info.formKey === 'customerCheck'" :edit-id="info.linkId" />
		</view>
		<view class="time-line" v-if="auditRecordVosReverse.length">
			<view class="time-line-tle">{{$t('auditInfo.trendsTle')}}</view>
			<view class="item-list" v-for="(item,index) in auditRecordVosReverse" :key="index">
				<view class="item-box">
					<view class="item-time">{{ item.auditTime | dayjs }}</view>
					<view class="item-content">
						<view class="item-info">
							<u-image class="avatar" :src="item.headPhoto[0] ? item.headPhoto[0].url : ''" shape="circle"></u-image>
							<view class="user-time">
								<view class="username">{{ item.managerName }}</view>
								<view class="deal-time">{{ item.status === 3 ? $t('auditInfo.dealTimeTxt')[0] : $t('auditInfo.dealTimeTxt')[1] }}{{ item.auditTime | dayjs }}</view>
							</view>
							<view class="status">
								<text>{{$t('auditInfo.statusTxt')[item.status]}}</text>
							</view>
						</view>
						<view class="item-deal" v-if="item.status!==3">
							<view>{{ $t('auditInfo.auditOptTxt') + item.auditResult }}</view>
							<view>{{ $t('auditInfo.copyNoteTxt') + item.copyIdsName }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		auditTaskFindById,
		auditLevelGetPushMans
	} from '@/api/lpgManageAppApi.js'
	import BusinessInfo from './common/businessInfo'
	import AccountPeriodInfo from './common/accountPeriodInfo'
	import CapitalDrawInfo from './common/capitalDrawInfo'
	import ReceivableInfo from './common/receivableInfo'
	import CopeInfo from './common/copeInfo'
	import GatheringInfo from './common/gatheringInfo'
	import PaymentInfo from './common/paymentInfo'
	import PricePlanInfo from './common/pricePlanInfo'
	import StockTakingInfo from './common/stockTakingInfo'
	import FillingChangeInfo from './common/fillingChangeInfo'
	import PurGoodTankCarHouseInfo from './common/purGoodTankCarHouseInfo'
	import GoodsInfo from './common/goodsInfo'
	import PriceStrategyInfo from './common/priceStrategyInfo'
	import SingleOutputInfo from './common/singleOutputInfo'
	import RefundInfo from './common/refundInfo'
	import SalesOrdersInfo from './common/salesOrdersInfo'
	import PurGoodRequisitionInfo from './common/purGoodRequisitionInfo'
	import PurGoodOrderInfo from './common/purGoodOrderInfo'
	import PurGoodPlanInfo from './common/purGoodPlanInfo'
	import CouponInfo from './common/couponInfo'
	import PriceCustomerInfo from './common/priceCustomerInfo'
	import UserCylinderCheckInfo from './common/userCylinderCheckInfo'
	export default {
		components: {
			BusinessInfo,
			AccountPeriodInfo,
			CapitalDrawInfo,
			ReceivableInfo,
			CopeInfo,
			GatheringInfo,
			PaymentInfo,
			PricePlanInfo,
			StockTakingInfo,
			FillingChangeInfo,
			PurGoodTankCarHouseInfo,
			GoodsInfo,
			PriceStrategyInfo,
			SingleOutputInfo,
			RefundInfo,
			SalesOrdersInfo,
			PurGoodRequisitionInfo,
			PurGoodOrderInfo,
			PurGoodPlanInfo,
			CouponInfo,
			PriceCustomerInfo,
			UserCylinderCheckInfo,
		},
		data() {
			return {
				editId: '',
				info: {},
				active: 0,
				auditRecordVos: [],
				auditRecordVosReverse: []
			}
		},
		onLoad(options) {
			this.editId = options.editId || ''
			if (this.editId) {
				this.getInfo(this.editId)
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('auditInfo.titleText')
			});
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await auditTaskFindById({
					id
				})
				if (res) {
					this.info = res
					this.active = res.auditRecordVos.length
					res.auditRecordVos.forEach((v) => {
						v.headPhoto = v.headPhoto.length ? JSON.parse(v.headPhoto) : []
					})
					// 查找审批
					for (let i = 0; i < res.auditRecordVos.length; i++) {
						if (res.auditRecordVos[i].status === 4) {
							this.active = i
							break
						}
					}
					const [...auditRecordVosReverse] = res.auditRecordVos
					this.auditRecordVos = res.auditRecordVos
					// 过滤数组并倒序
					this.auditRecordVosReverse = auditRecordVosReverse.filter(item => item.status !== 4).reverse()
					this.getAuditLevelGetPushMans(res.levelId)
				}
			},
			// 获取抄送人
			async getAuditLevelGetPushMans(levelId) {
				const {
					returnValue: res
				} = await auditLevelGetPushMans({
					levelId
				})
				const arr = []
				res.forEach((v) => {
					arr.push({
						label: v.name,
						value: v.id
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auditInfo {
		// padding: 0 30rpx;
		padding: 30rpx;

		.step {
			margin-bottom: 30rpx;
		}
		description-list{
			margin-bottom: 40rpx;
		}
		.audit-info-content {
			background: white;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			// height: 600rpx;
			// overflow-y: scroll;
			::v-deep .basic {
				// padding: 20rpx 20rpx;
				.basic-tle{
					padding: 0 20rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-weight: bold;
					border-bottom: 1px solid #eee;
				}
				.img{
					width: 100rpx;
					height: 100rpx;
					margin-right: 12rpx;
					margin-top: 12rpx;
				}
				.down-list{
					text:first-child{
						margin-right: 10rpx;
					}
					text:last-child{
						color: #2979ff;
						cursor: pointer;
					}
				}
			}
		}
		.time-line{
			margin-top: 30rpx;
			background: white;
			padding: 20rpx 30rpx;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			font-size: 28rpx;
			.time-line-tle{
				font-weight: bold;
				// padding: 10rpx 0;
				padding-bottom: 20rpx;
				
			}
			.item-list{
				&:last-child{
					border-color: transparent;
				}
				position: relative;
				padding-left: 30rpx;
				padding-bottom: 30rpx;
				margin-left: 6rpx;
				border-left: 2px solid #e6e6e6;
				&::before{
					content: '';
					display: block;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background: #e6e6e6;
					left: -6px;
					top: 0px;
					position: absolute;
				}
				.item-box{
					font-size: 26rpx;
					.item-time{
						color: #999;
					}
					.item-content{
						.item-info{
							display: flex;
							margin-top: 10rpx;
							align-items: center;
							.avatar{
								width: 100rpx;
								height: 100rpx;
								margin-right: 12rpx;
								::v-deep .u-image,::v-deep .u-image__image,::v-deep .u-image__error,::v-deep .u-image__loading{
									width: 100%!important;
									height: 100%!important;
								}
							}
							.user-time{
								width: 1px;
								flex: 1;
								.username{
									font-weight: bold;
								}
								.deal-time{
									margin-top: 20rpx;
									font-size: 12px;
									color: #666;
								}
							}
							.status{
								color: #333;
							}
						}
					}
					.item-deal{
						view{
							margin-top: 10rpx;
							color: #333;
						}
					}
				}
			}
		}
		
	}
</style>
