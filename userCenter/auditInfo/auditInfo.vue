<template>
	<view class="auditInfo">
		<u-steps :current="active" class="step">
			<u-steps-item v-for="item in auditRecordVos" :title="item.levelName" :key="item.auditTime"
				:desc="item.auditTime | dayjs"></u-steps-item>
		</u-steps>
		<view>
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
	export default {
		components: {
			BusinessInfo,
			AccountPeriodInfo,
			CapitalDrawInfo,
			ReceivableInfo,
			CopeInfo,
			GatheringInfo,
			PaymentInfo,
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
			// text-align: center;
		}

		::v-deep .audit-info-content {
			background: white;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			height: 600rpx;
			overflow-y: scroll;

			.basic {
				padding: 10rpx 20rpx;

				.basic-item {
					font-size: 28rpx;

					&:last-child {
						.basic-box {
							.item:last-child {
								border: none;
							}
						}
					}

					.basic-tle {
						padding: 0 20rpx;
						height: 80rpx;
						line-height: 80rpx;
						font-weight: bold;
						border-bottom: 1px solid #eee;
					}

					.basic-box {
						.item {
							border-bottom: 1px solid #eee;
							min-height: 60rpx;
							line-height: 60rpx;
							padding: 0 20rpx;
							display: flex;

							.tle::after {
								display: inline-block;
								content: '：';
							}

							.desc {
								width: 1px;
								flex: 1;
								.img{
									width: 100rpx;
									height: 100rpx;
									margin-right: 12rpx;
									margin-top: 12rpx;
								}
							}
						}
					}
				}
			}
		}
		.time-line{
			margin-top: 30rpx;
			background: white;
			padding: 30rpx;
			border-radius: 16rpx;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
			font-size: 28rpx;
			.time-line-tle{
				font-weight: bold;
				padding-bottom: 30rpx;
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
								::v-deep .u-image,::v-deep .u-image__image{
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
