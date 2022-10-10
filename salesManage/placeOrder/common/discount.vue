<template>
	<view>
		<!-- ========优惠券======= -->
		<view class="block" v-if="couponTag == 1">
			<view class="block-head">{{$t('salesMg.discount.couponName')}}</view>
			<view class="block-box">
				<view class="item">
					<view class="label">{{$t('salesMg.discount.couponNo')}}：</view>
					<view class="content">
						<input class="input" :placeholder="$t('salesMg.discount.couponNoPlaceholder')" type="text"
							@input="changeCoupon" v-model="couponNo" :disabled="isSettle" />
						<u-button size="small" class="choose-coupon" type="primary" @click="chooseCoupon">
							{{$t('salesMg.discount.chooseBtn')}}
						</u-button>
					</view>
				</view>
			</view>
		</view>

		<!-- ========订单折扣======= -->
		<view class="block" v-if="disCountTag == 1">
			<view class="block-head">{{$t('salesMg.discount.discountName')}}</view>
			<view class="block-box">
				<view class="item">
					<view class="content dfee">
						<view class="fee-item">
							<view class="fee-label">{{$t('salesMg.discount.disCountMoney')}}</view>
							<input class="fee-input" type="number" :placeholder="$t('salesMg.discount.disCountMoney')"
								v-model="disCountMoney" :disabled="isSettle"
								@blur="orderDiscount(disCountMoney, 'disCountMoney')" />
						</view>
						<view class="fee-item">
							<view class="fee-label">{{$t('salesMg.discount.disCountRate')}}</view>
							<input v-model="disCountRate" class="fee-input" type="number"
								:placeholder="$t('salesMg.discount.disCountRate')"
								@blur="orderDiscount(disCountRate, 'disCountRate')" />
							<view class="fee-total">%</view>
						</view>
						<view class="fee-item">
							<view class="fee-label">{{$t('salesMg.discount.discountDeal')}}</view>
							<input v-model="discountDeal" class="fee-input" type="number"
								:placeholder="$t('salesMg.discount.discountDeal')"
								@blur="orderDiscount(discountDeal, 'discountDeal')" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- ==========积分抵扣=========== -->
		<view class="block" v-if="integralTag==1&&formType==1">
			<view class="block-head">{{$t('salesMg.discount.pointName')}}</view>
			<view class="block-box">
				<view class="item">
					<view class="label">{{$t('salesMg.discount.integralUse')}}：</view>
					<view class="content">{{integralUse}}</view>
				</view>
				<view class="item">
					<view class="label">{{$t('salesMg.discount.maxIntegral')}}：</view>
					<view class="content">{{ maxIntegral }}</view>
				</view>
				<view class="item">
					<view class="content dfee">
						<view class="fee-item" :class="isUse?'on':''" @click="usePoint">
							<u-icon size="32rpx" class="fee-check" name="checkmark-circle-fill"></u-icon>
							<view class="fee-label">{{$t('salesMg.discount.integralValue')}}</view>
							<input @click.stop v-if="isUse" class="fee-input" type="number"
								:placeholder="$t('salesMg.discount.integralValue')" @input="integralValueChange"
								step="1" v-model="integralValue" />
						</view>
						<view class="fee-item" v-if="isUse">
							<view class="fee-label">{{$t('salesMg.discount.integralMoney')}}：</view>
							<view>-{{ integralMoney }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		couponFindCouponToVerify
	} from '@/api/lpgSalesManageApi'
	import {
		sysConfigGetCylinderSwitch
	} from '@/api/lpgManageAppApi'
	export default {
		name: 'Discount',
		components: {},
		props: {
			// 是否结算 结算不可以改单，只能改结算方式
			isSettle: {
				type: Boolean,
				default: false
			},
			// 合计金额（订单总金额+配送费）
			totalMoneyAll: {
				type: [Number, String],
				default: ''
			},
			// 折扣开关
			disCountTag: {
				type: Number,
				default: 1
			},
			// 积分开关
			integralTag: {
				type: Number,
				default: 1
			},
			// 优惠券开关
			couponTag: {
				type: Number,
				default: 1
			},
			// 客户id
			customerId: {
				type: String,
				default: ''
			},
			// 类型 1客户 2供应商 3组织
			formType: {
				type: [Number, String],
				default: 1
			},
			// 商品id
			goodsDetailIdStr: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 组织id
			orgId: {
				type: String,
				default: ''
			},
			// 客户积分
			integralUse: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				paraValue: 0, // 多少积分等于1元
				proportion: 0, // 抵扣比例 总金额的多少钱
				couponNo: '',
				couponDetailId: '',
				couponMoney: '', // 优惠券金额
				couponMoneyAll: '', // 总优惠金额
				money: '', // 打折前金额 - 优惠金额(优惠完的金额打折)
				disCountMoney: '', // 折扣金额
				disCountRate: '', // 折扣率%
				discountDeal: '', // 成交金额
				maxIntegral: 0, // 可用积分
				isUse: false,
				integralValue: '', // 使用积分
				integralMoney: '' // 积分抵扣金额
			}
		},
		watch: {
			totalMoneyAll() {
				this.discountCalculate()
			},
			formType(){
				this.usePoint(false)
			}
		},
		mounted() {
			this.getConfigGetCylinder()
			uni.$on('chooseCoupon', (data) => {
				if (data) {
					this.couponNo = data.couponNo
					this.couponDetailId = data.couponDetailId
					this.couponMoney = data.goodsCouponMoney
					this.discountCalculate()
				}

			})
		},
		methods: {
			async getConfigGetCylinder() {
				const {
					returnValue: res
				} = await sysConfigGetCylinderSwitch({
					key: 'sales_integral_use_rule'
				})
				if (res) {
					const arr = res.paraValue.Split(',')
					this.paraValue = arr[0]
					this.proportion = arr[1] || 0
				}
			},
			// 订单折扣
			orderDiscount(val, name) {
				if (this.money) {
					// 优惠完的金额打折
					if (name === 'disCountMoney') {
						// 折扣金额
						// 成交金额 = 优惠完的金额-折扣金额
						this.discountDeal = this.$bigDecimal.subtract(this.money, val)
						// 折扣率 折扣金额除成交金额*100
						this.disCountRate = this.$bigDecimal.round(this.$bigDecimal.multiply(this.$bigDecimal.divide(val,
							this
							.discountDeal), 100), 2)
					} else if (name === 'disCountRate') {
						// 折扣率
						// 折扣除100
						const rate = this.$bigDecimal.divide(val, 100)
						// 折扣金额 = 优惠完的金额*折扣率
						this.disCountMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(rate, this.money), 2)
						// 成交金额 = 优惠完的金额-折扣金额
						this.discountDeal = this.$bigDecimal.subtract(this.money, this.disCountMoney)
					} else if (name === 'discountDeal') {
						// 成交金额
						// 折扣金额 = 优惠完的金额-成交金额
						this.disCountMoney = this.$bigDecimal.round(this.$bigDecimal.subtract(this.money, val), 2)
						// 折扣率 折扣金额除成交金额*100
						this.disCountRate = this.$bigDecimal.round(this.$bigDecimal.multiply(this.$bigDecimal.divide(this
							.disCountMoney, val), 100), 2)
					}
					this.$emit('change', this.getDiscount())
				}
			},
			// 选择优惠券
			chooseCoupon() {
				if (!this.customerId) {
					this.$u.toast(this.$t('salesMg.discount.tips'))
					return
				}
				console.log(this.customerId)
				this.goto('/infoManage/chooseCoupon/chooseCoupon', {
					customerId: this.customerId,
					orgId: this.orgId,
					goodsDetailIdStr: encodeURIComponent(JSON.stringify(this.goodsDetailIdStr)),
					couponMoney: this.totalMoneyAll
				})
			},
			// 优惠券计算
			async changeCoupon() {
				this.couponDetailId = ''
				this.couponMoney = 0
				if (!this.customerId) {
					this.$u.toast(this.$t('salesMg.discount.tips'))
					return
				}
				const res = await couponFindCouponToVerify({
					couponNo: this.couponNo,
					orgId: this.orgId,
					customerId: this.customerId,
					couponMoney: this.totalMoneyAll,
					goodsDetailIdStr: JSON.stringify(this.goodsDetailIdStr)
				}).catch(err => {
					this.discountCalculate()
				})
				if (res && res.isSuccess) {
					this.couponNo = res.returnValue.couponNo
					this.couponDetailId = res.returnValue.couponDetailId
					this.couponMoney = res.returnValue.goodsCouponMoney
					this.discountCalculate()
				} else {
					this.discountCalculate()
				}
			},
			// 计算
			discountCalculate() {
				// 打折前金额 =  总金额 - 优惠券金额
				this.money = this.$bigDecimal.subtract(this.totalMoneyAll, this.couponMoney)
				// 成交金额 = 打折前金额 - 折扣金额
				this.discountDeal = this.$bigDecimal.subtract(this.money, this.disCountMoney)
				if (Number(this.discountDeal) === 0) {
					this.disCountRate = 0
				} else {
					// 折扣率 折扣金额除成交金额*100
					this.disCountRate = this.$bigDecimal.round(this.$bigDecimal.multiply(this.$bigDecimal.divide(this
						.disCountMoney, this.discountDeal), 100), 2)
				}
				// 可抵扣金额 = 成交金额 * 积分使用比例 除 100
				const maxMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(this.discountDeal, this.$bigDecimal
					.divide(
						this.proportion, 100)), 2)
				// 最大可抵扣积分
				const maxIntegral = this.$bigDecimal.multiply(maxMoney, this.paraValue)
				if (maxIntegral > this.integralUse) {
					this.maxIntegral = this.integralUse
				} else {
					this.maxIntegral = parseInt(maxIntegral)
				}
				// 通知外部
				this.$emit('change', this.getDiscount())
			},
			// 给外部使用
			getDiscount() {
				const momet = this.$bigDecimal.add(this.couponMoney, this.disCountMoney)
				const couponMoneyAll = this.$bigDecimal.add(momet, this.integralMoney)
				return {
					couponNo: this.couponNo,
					couponDetailId: this.couponDetailId,
					couponMoney: this.couponMoney, // 优惠券金额
					couponMoneyAll: couponMoneyAll, // 优惠总金额
					disCountMoney: this.disCountMoney, // 折扣金额
					disCountRate: this.disCountRate, // 折扣率%
					discountDeal: this.$bigDecimal.subtract(this.discountDeal, this.integralMoney), // 应收金额 成交金额-抵扣金额
					integralValue: this.integralValue, // 抵扣积分
					integralMoney: this.integralMoney // 抵扣金额
				}
			},
			// 清除
			getReset() {
				this.couponNo = ''
				this.couponDetailId = ''
				this.couponMoney = '' // 优惠券金额
				this.couponMoneyAll = '' // 总优惠金额
				this.money = '' // 打折前金额 - 优惠金额(优惠完的金额打折)
				this.disCountMoney = '' // 折扣金额
				this.disCountRate = '' // 折扣率%
				this.discountDeal = '' // 成交金额
				this.integralValue = '' // 使用积分
				this.integralMoney = '' // 积分抵扣金额
				this.isUse = false
			},
			// 写入
			getWrite(data) {
				this.couponNo = data.coupon ? data.coupon.couponNo : ''
				this.couponDetailId = data.couponDetailId
				this.couponMoney = data.couponMoney // 优惠券金额
				this.disCountMoney = data.disCountMoney // 折扣金额
				this.disCountRate = data.disCountRate // 折扣率%
				this.discountDeal = data.totalMoney // 成交金额
				this.integralValue = data.integralValue // 抵扣积分
				this.integralMoney = data.integralMoney // 抵扣金额
				if (data.integralValue) {
					this.isUse = true
				}
			},
			// 积分使用
			// 计算积分
			usePoint(type = '') {
				this.isUse = typeof type === 'object' ? (this.isUse ? false : true) : type
				this.integralValue = ''
				this.integralMoney = ''
				// 计算
				this.discountCalculate()
			},
			// 积分填写计算
			integralValueChange(e) {
				let val = e.detail.value
				// 抵扣金额=使用积分除积分规则
				this.integralMoney = this.$bigDecimal.round(this.$bigDecimal.divide(val, this.paraValue), 2)
				// 计算
				this.discountCalculate()
				if (val > this.maxIntegral || val < 0) {
					this.$nextTick(() => {
						this.integralValue = ''
						this.integralMoney = ''
						this.discountCalculate()
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.block {
		padding: 0 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		margin-top: 50rpx;

		.block-head {
			font-size: 36rpx;
			position: relative;
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			align-items: center;
			position: relative;
			padding-left: 10rpx;
			border-bottom: 1px solid #eee;

			&:before {
				display: block;
				content: '';
				height: 40rpx;
				width: 8rpx;
				border-radius: 8rpx;
				background: rgba(42, 130, 228, 1);
				position: absolute;
				left: -10rpx;
			}

			// font-weight: bold;
		}

		.block-box {
			.item {
				display: flex;
				min-height: 88rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				flex-wrap: wrap;
				border-bottom: 1px solid #eee;

				.label {
					min-width: 144rpx;
					height: 88rpx;
					line-height: 88rpx;

					&.bold {
						font-weight: bold;
					}
				}

				.content {
					flex: 1;
					width: 1px;
					display: flex;
					flex-wrap: wrap;
					align-items: center;

					>.picker {
						width: 100%;

						.pickerd {
							display: flex;
							align-items: center;
						}

						// display: inline-block;
					}

					.input {
						flex: 1;
						width: 1px;
						font-size: 28rpx;
					}

					&.dfee {
						flex: auto;
						width: 100%;

						.fee-item {
							width: 100%;
							display: flex;
							align-items: center;
							height: 88rpx;
							border-bottom: 1px solid #eee;

							&.on {

								::v-deep.fee-check .u-icon__icon,
								.fee-label {
									color: rgba(42, 130, 228, 1) !important;
								}
							}

							&:last-child {
								border-bottom: none;
							}

							::v-deep.fee-check {
								margin-right: 12rpx;
							}

							.fee-label {
								font-size: 28rpx;

								padding-bottom: 4rpx;
								white-space: nowrap;
							}

							.fee-input {
								height: 60rpx;
								width: 180rpx;
								background: rgba(247, 247, 247, 1);
								border-radius: 10rpx;
								font-size: 28rpx;
								margin-left: 10rpx;
								padding: 0 20rpx;
								box-sizing: border-box;
								color: rgba(212, 48, 48, 1) !important;

								>::v-deep input {
									color: rgba(212, 48, 48, 1) !important;
								}
							}

							.fee-flr {
								height: 60rpx;
								width: 180rpx;
								margin-left: 10rpx;
								display: flex;
								align-items: center;
								border: 1px solid #ccc;
								border-radius: 10rpx;
								box-sizing: border-box;
								padding: 0 20rpx;

								.flr {
									width: 1px;
									flex: 1;
								}
							}

							.fee-total {
								font-size: 26rpx;
								color: rgba(128, 128, 128, 1);
								margin-left: 10rpx;
								white-space: nowrap;
							}
						}
					}

					&.fill {
						flex: auto;
						width: 100%;
						padding-bottom: 30rpx;

						textarea {
							background: rgba(247, 247, 247, 1);
							height: 105rpx;
							width: 100%;
							padding: 20rpx;
							font-size: 28rpx;
							border-radius: 10rpx;

						}

						.pay-item {}

						.fill-box {
							width: 100%;
							padding: 30rpx;
							padding-top: 0;
							border-radius: 10rpx;
							background: rgba(247, 247, 247, 1);

							::v-deep .radio-group {
								flex-wrap: wrap;
							}

							::v-deep .radio-item {
								margin-right: 30rpx;
								margin-top: 30rpx;
							}

							&.pay-box {
								display: flex;
								flex-wrap: wrap;

								.pay-item {
									margin-top: 20rpx;
									width: 50%;
									font-size: 26rpx;
								}
							}
						}

					}
				}

			}
		}
	}

	.choose-coupon {
		width: 100rpx !important;
	}
</style>
