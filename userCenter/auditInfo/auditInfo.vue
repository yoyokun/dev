<template>
	<view class="auditInfo">

		<view class="step-box">
			<u-steps :current="active" class="step">
				<u-steps-item class="step-item" v-for="item in auditRecordVos" :title="item.levelName"
					:key="item.auditTime" :desc="item.auditTime | dayjs"></u-steps-item>
			</u-steps>
		</view>

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
							<u-image class="avatar" :src="item.headPhoto[0] ? item.headPhoto[0].url : ''"
								shape="circle"></u-image>
							<view class="user-time">
								<view class="username">{{ item.managerName }}</view>
								<view class="deal-time">
									{{ item.status === 3 ? $t('auditInfo.dealTimeTxt')[0] : $t('auditInfo.dealTimeTxt')[1] }}{{ item.auditTime | dayjs }}
								</view>
							</view>
							<view class="status">
								<!-- <u-icon name="checkbox-mark"></u-icon> -->
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
		<view class="actions">
			<view class="actions-box">
				<u-button class="button" type="primary" @click="openPopup">{{$t('auditInfo.actionBtn')[0]}}</u-button>
			</view>
		</view>

		<u-popup :show="showPopup" customStyle="overflow:hidden" closeable :round="10" mode="center"
			@close="closePopup">
			<view>
				<view class="popup-box">
					<view class="item">
						<view class="lable">{{$t('auditInfo.auditResultTxt')}}:</view>
						<view class="ibox">
							<u-textarea v-model="formData.auditResult" maxlength="300" class="textareas"
								:placeholder="$t('auditInfo.auditResultPlaceholder')" count></u-textarea>
						</view>
					</view>
					<view class="item">
						<view class="lable">{{$t('auditInfo.copyIdsTxt')}}:</view>
						<view class="ibox">
							<view class="ilst" @click="checkNotice(item.value)" v-for="(item,index) in copyOptions"
								:key="index" :class="formData.copyIds.indexOf(item.value) > -1 ?'on':''">{{item.label}}
							</view>
						</view>
					</view>
					<view class="tips">{{$t('auditInfo.tips')}}</view>
				</view>
				<view class="popup-action">
					<view class="btn conf" @click="handleExamine(1)">{{$t('auditInfo.actionBtn')[1]}}</view>
					<view class="btn danger" @click="handleExamine(2)">{{$t('auditInfo.actionBtn')[2]}}</view>
				</view>
			</view>

		</u-popup>
	</view>

</template>

<script>
	import {
		auditTaskFindById,
		auditLevelGetPushMans,
		auditTaskAuditTask
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
				auditRecordVosReverse: [],
				showPopup: false,
				copyOptions: [],
				formData: {
					auditResult: '',
					copyIds: [],
				},
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
			// 审批
			async handleExamine(state) {
				let data = this.formData
				data.id = this.editId
				data.status = state
				data.copyIds = Array.isArray(data.copyIds) ? data.copyIds.join(',') : data.copyIds
				const {
					returnValue: res,
					message
				} = await auditTaskAuditTask(data)
				uni.showToast({
					title: message,
					icon: 'none'
				})
				this.getInfo(this.editId)
				this.closePopup()

			},
			// 选择抄送通知
			checkNotice(id) {
				const index = this.formData.copyIds.indexOf(id)
				if (index > -1) {
					this.formData.copyIds.splice(index, 1)
				} else {
					this.formData.copyIds.push(id)
				}

			},
			// 审核弹窗
			openPopup() {
				this.showPopup = true
			},
			closePopup() {
				this.formData = {
					auditResult: '',
					copyIds: [],
				}
				this.showPopup = false
			},
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
				this.copyOptions = arr
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auditInfo {

		overflow-y: scroll;
		box-sizing: border-box;
		padding: 30rpx;

		.step-box {
			margin-bottom: 30rpx;
			background: white;
			padding: 24rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			border-radius: 20rpx;
		}

		.step {

			.step-item {
				::v-deep .u-text {
					width: auto !important;

					.u-text__value--content,
					.u-text__value--main {
						font-size: 32rpx !important;
						color: #333 !important;
					}
				}
			}
		}

		description-list {
			margin-bottom: 40rpx;
		}

		.audit-info-content {
			background: white;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);

			::v-deep .tabs {
				border-bottom: 1px solid #ddd;
			}

			::v-deep .basic {
				.basic-tle {
					padding: 0 20rpx;
					height: 80rpx;
					line-height: 80rpx;
					font-weight: bold;
					border-bottom: 1px solid #eee;
				}

				.img {
					width: 100rpx;
					height: 100rpx;
					margin-right: 12rpx;
					margin-top: 12rpx;

				}

				.down-list {
					text:first-child {
						margin-right: 10rpx;
					}

					text:last-child {
						color: #2979ff;
						cursor: pointer;
					}
				}
			}
		}

		.time-line {
			margin-top: 30rpx;
			background: white;
			padding: 20rpx 30rpx;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			font-size: 28rpx;

			.time-line-tle {
				font-weight: bold;
				// padding: 10rpx 0;
				padding-bottom: 20rpx;

			}

			.item-list {
				&:last-child {
					border-color: transparent;
				}

				position: relative;
				padding-left: 30rpx;
				padding-bottom: 30rpx;
				margin-left: 6rpx;
				border-left: 2px solid #e6e6e6;

				&::before {
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

				.item-box {
					font-size: 26rpx;

					.item-time {
						color: #999;
					}

					.item-content {
						.item-info {
							display: flex;
							margin-top: 10rpx;
							align-items: center;

							.avatar {
								width: 100rpx;
								height: 100rpx;
								margin-right: 12rpx;

								::v-deep .u-image,
								::v-deep .u-image__image,
								::v-deep .u-image__error,
								::v-deep .u-image__loading {
									width: 100% !important;
									height: 100% !important;
								}
							}

							.user-time {
								width: 1px;
								flex: 1;

								.username {
									font-weight: bold;
								}

								.deal-time {
									margin-top: 20rpx;
									font-size: 12px;
									color: #666;
								}
							}

							.status {
								color: #333;
							}
						}
					}

					.item-deal {
						view {
							margin-top: 10rpx;
							color: #333;
						}
					}
				}
			}
		}

		.actions {
			height: calc(100rpx + constant(safe-area-inset-bottom));
			height: calc(100rpx + env(safe-area-inset-bottom));

			.actions-box {
				position: fixed;
				height: calc(100rpx + constant(safe-area-inset-bottom));
				height: calc(100rpx + env(safe-area-inset-bottom));
				width: 100%;
				bottom: 0;
				left: 0;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: white;
				box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;

				.button {
					height: 70rpx !important;
					width: 540rpx;
				}
			}
		}

		.popup-action {
			display: flex;

			.btn {
				flex: 1;
				height: 84rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 28rpx;
				color: #666;
				border-top: 1px solid #eee;
				border-right: 1px solid #eee;

				&:last-child {
					border-right: none;
				}

				&.conf {
					color: #2979ff;
				}

				&:active {
					background: #eee;
				}

				&.danger {
					color: red;
				}
			}
		}

		.popup-box {
			padding: 30rpx;
			width: 600rpx;

			.tips {
				font-size: 26rpx;
				color: #666;
			}

			.item {
				font-size: 28rpx;
				margin-bottom: 20rpx;

				.textareas {
					margin-top: 20rpx;
					font-size: 28rpx;
				}

				::v-deep .u-textarea__field {
					font-size: 28rpx;
				}

				.ibox {
					display: flex;
					flex-wrap: wrap;
				}

				.ilst {
					padding: 0 20rpx;
					height: 54rpx;
					line-height: 54rpx;
					border: 1px solid #eee;
					border-radius: 54rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #666;

					&.on {
						border-color: rgb(42, 130, 228);
						// color: rgb(42, 130, 228);
						background: rgb(42, 130, 228);
						color: white;
					}
				}
			}
		}
	}
</style>
