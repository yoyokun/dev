<template>
	<view class="block-box">
		<view class="item">
			<view class="label">支付情况：</view>
			<view class="content fill">
				<view class="fill-box pay-box">
					<view class="pay-item">线上支付：{{ onlinePayment }}</view>
					<view class="pay-item">未支付：{{nonPayment}}</view>
					<view class="pay-item">剩余金额：{{ residue }}</view>
				</view>
			</view>
		</view>
		<view class="item">
			<view class="label">支付方式：</view>
			<view class="content dfee">
				<view class="fee-item" :class="item.checked?'on':''" v-for="(item,index) in payType" :key="index"
					@click="checkPay(index)">
					<u-icon size="32rpx" class="fee-check" name="checkmark-circle-fill"></u-icon>
					<view class="fee-label">{{item.name}}</view>
					<input @click.stop v-if="item.checked" class="fee-input" v-model="item.value" type="number"
						placeholder="请输入费用" @input="validateInput(item.value, index)" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkPrice
	} from '@/utils'
	import {
		settingMixin
	} from '@/common/settingMixin'
	export default {
		name: 'Settlement',
		mixins: [settingMixin],
		props: {
			// 总金额
			totalMoneyAll: {
				type: [Number, String],
				default: 0
			},
			collectionTypeId: {
				type: [Number, String],
				default: ''
			},
			// 线上支付
			onlinePayment: {
				type: [Number, String],
				default: 0
			},
			// 已经支付的金额
			payData: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				nonPayment: 0, // 未支付
				residue: 0, // 剩余金额
				payType: []
			}
		},
		watch: {
			totalMoneyAll: {
				handler: function(val, oldVal) {
					// 未支付金额
					this.nonPayment = this.$bigDecimal.round(this.$bigDecimal.subtract(val, this.onlinePayment), 2)
					this.handleResidue()
					this.init()
				},
				immediate: true
			},
			collectionTypeId: {
				handler: function() {
					this.handleResidue()
					this.init()
				},
				immediate: true
			},
			payData: {
				handler: function(val, oldVal) {
					this.payType.forEach((v) => {
						val.forEach((m) => {
							if (v.collectionTypeId === m.collectionTypeId) {
								v.checked = true
								v.value = m.payMoney
								v.id = m.id
							}
						})
					})
					this.handleResidue()
				},
				immediate: true
			}
		},
		async mounted() {
			// 获取支付方式
			await this.getCustomerCollectionType()
			this.init()
		},
		methods: {
			init() {
				const payType = []
				this.customerCollectionType.forEach((v, index) => {
					payType.push({
						name: v.name,
						value: v.value === this.collectionTypeId ? this.totalMoneyAll : ((index === 0 && (
								this.collectionTypeId === null || this.collectionTypeId === '')) ? this
							.totalMoneyAll : ''),
						checked: v.value === this.collectionTypeId ? true : (!!((index === 0 && (this
							.collectionTypeId === null || this.collectionTypeId === '')))),
						id: '',
						collectionTypeId: v.value,
						payType: v.type
					})
				})
				this.payType = payType
				this.residue = 0
			},
			// 选择支付
			checkPay(index) {
				let obj = this.payType[index]
				obj.checked = obj.checked ? false : true
				if (!obj.checked) {
					// 没选中
					obj.value = ''
				}
				this.$set(this.payType, index, obj)
				this.handleResidue()
			},
			// 验证输入
			validateInput(val, index) {
				if (this.payType[index].value) {
					this.$nextTick(()=>{
						this.payType[index].value = checkPrice(val)
					})
				}
				this.handleResidue()
			},
			// 计算剩余金额
			handleResidue() {
				let totalMoney = 0
				this.payType.forEach((v, i) => {
					if (v.checked) {
						totalMoney = this.$bigDecimal.add(totalMoney, v.value)
					}
				})
				// 保留两位
				totalMoney = this.$bigDecimal.round(totalMoney, 2)
				this.residue = this.$bigDecimal.round(this.$bigDecimal.subtract(this.nonPayment, totalMoney), 2)
			},
			// 重置
			getReset() {
				this.payType.forEach((v, index) => {
					v.value = ''
					v.checked = (v.value && v.value === this.collectionTypeId) ? true : (!!((index === 0 && (this
						.collectionTypeId === null || this.collectionTypeId === ''))))
				})
			},
			// 获取结算
			getSettlement() {
				return {
					payType: this.payType.filter(item => item.checked && item.value),
					residue: (this.residue - 0)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
