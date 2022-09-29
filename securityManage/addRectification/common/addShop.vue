<template>
	<view class="list">
		<view class="list-head">
			<view class="act-btn" @click="chooseGoods">
				<u-icon class="add-icon" name="plus-circle"></u-icon>
				<view class="add-txt">{{$t('chooseGoods.addShop')}}</view>
			</view>
		</view>
		<view class="goods" v-if="tableData.length">
			<view class="goods-list" v-for="(item,index) in tableData" :key="item.ids">
				<view class="goods-head">
					<view class="goods-tle">{{item.goodsNo}} - {{item.goodsName}}</view>
					<view class="goods-price">￥{{item.unitPrice}}</view>
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
					<u-icon class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(index)">
					</u-icon>
				</view>
				<view class="info-cell">
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.standardName')}}：</view>
						<view class="cell-content">{{item.standardName}}</view>
					</view>
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.unitsName')}}：</view>
						<view class="cell-content">{{item.unitsName}}</view>
					</view>
				</view>
				<view class="info-cell">
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.amount')}}：</view>
						<view class="cell-content">
							<view class="nums">
								<input min="1" maxlength="4" type="number" v-model="item.amount" :placeholder="$t('chooseGoods.weight')" step="1"
									@input="validateInput(index,item,'amount')" />
							</view>
						</view>
					</view>
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.weight')}}：</view>
						<view class="cell-content">
							<view class="nums">
								<input v-model="item.weight" :placeholder="$t('chooseGoods.weight')" @input="validateInput(index,item,'weight')" />
							</view>
						</view>
					</view>
				</view>
				<view class="info-cell">
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.totalMoney')}}：</view>
						<view class="cell-content">{{item.totalMoney}}</view>
					</view>
				</view>
				<view class="info-cell">
					<view class="cell remarks">
						<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
						<view class="cell-content">
							<textarea v-model="item.remarks" :placeholder="$t('chooseGoods.remarksPlace')"></textarea>
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
						<text>{{$t('chooseGoods.amount')}}：</text>
						<text>{{totalAmount}}</text>
					</view>
					<view class="item">
						<text>{{$t('chooseGoods.weight')}}：</text>
						<text>{{totalNetWeight}}</text>
					</view>
					<view class="item">
						<text>{{$t('chooseGoods.totalMoney')}}：</text>
						<text class="red">{{totalMoney}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { positiveCheckPrice, integer } from '@/utils'
	export default {
		name: 'AddShop',
		props: {
			// 商品数据
			shopData: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				digits: 3, // 金额保留位数
				digitsNetContent: 2, // 净含量保留位数
				totalAmount: '', // 总数量
				totalNetWeight: '', // 总重量
				totalMoney: '', // 总金额
				tableData: []
			}
		},
		watch: {
			// 监听 shopData 改变
			shopData: {
				async handler() {
					this.tableData = this.shopData
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			// 选择商品
			uni.$once('chooseGoods', (data) => {
				this.initGoodData(data)
			})
		},
		methods: {
			// 添加商品处理商品数据
			initGoodData(data) {
				// 判断是否有重复的商品
				data.forEach((v) => {
					// 查询改属性是否已存在
					const findIndex = this.tableData.findIndex((item) => item.goodsDetailId === v.goodsDetailId)
					// 已存在不处理
					if (findIndex === -1) {
						// 不存在，添加
						this.tableData.push({...v,...{
							id: '',
							amount: '',
							weight: v.netContent,
							totalWeight: 0,
							totalMoney: 0,
							remarks: ''
						}})
					}
				})
				this.tableChange(data, '', 'add')
			},
			// 选择商品
			chooseGoods() {
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					multiple: true
				})
			},
			// 保存商品的回调数据
			tableChange(data, index, value) {
				if (value === 'add') {
					// 多个商品 合并
					this.tableData = this.tableData.concat(data)
				}
				// 合计
				this.getSummaries()
				// 触发给外部
				this.$emit('changeTable', this.tableData)
			},
			// 合计
			getSummaries(param) {
				console.log('合计')
				let totalMoney = 0 // 总金额
				let totalAmount = 0 // 总数量
				let totalNetWeight = 0 // 总重量
				// 合计
				this.tableData.forEach((item, index) => {
					// 合计数量
					const value = Number(item.amount)
					totalAmount = this.$bigDecimal.add(totalAmount, value)
					// 合计金额
					const value1 = Number(item.totalMoney)
					totalMoney = this.$bigDecimal.add(totalMoney, value1)
					// 合计重量
					const value2 = Number(item.totalWeight)
					totalNetWeight = this.$bigDecimal.add(totalNetWeight, value2)
				})
				
				const num = new this.$bigDecimal(totalMoney)
				// 四舍五入
				totalMoney = num.round(this.digitsNetContent, this.$bigDecimal.RoundingModes.HALF_UP).value
				
				this.totalMoney = totalMoney
				this.totalAmount = totalAmount
				this.totalNetWeight = totalNetWeight
			},
			// 删除商品
			removeOrderGoods(index) {
				this.tableData.splice(index, 1)
			},
			// 验证 只能输入正整数,价格
			validateInput(index, row, key) {
				if (key === 'amount') {
					// 只能输入正负整数
					this.tableData[index].amount = integer(row.amount)
				} else if (key === 'weight') {
					// 只能输入正负两位小数
					this.tableData[index].weight = positiveCheckPrice(row.weight)
				}
				// 编辑的时候计算
				this.setData(row, index)
				this.tableChange()
			},
			// 计算单个商品的金额
			setData(row, index) {
				var num = row.amount
				// 总净含量(四舍五入)
				row.totalWeight = new this.$bigDecimal((num * row.weight)).round(this.digitsNetContent, this.$bigDecimal.RoundingModes.HALF_UP).value
				// 金额小计
				row.totalMoney = new this.$bigDecimal((row.unitPrice * num)).round(this.digits, this.$bigDecimal.RoundingModes.HALF_UP).value
				this.tableData[index] = row
			},
			// 获取商品数据（给外部调用）
			getShop(fun) {
				const obj = {
					data: [], // 商品信息
					totalAmount: this.totalAmount, // 总瓶数
					totalNetWeight: this.totalNetWeight, // 总重量
					totalMoney: this.totalMoney // 总金额
				}
				this.tableData.forEach((v) => {
					if (v.amount) {
						// 多个商品 数量不能位0和空
						obj.data.push(v)
					}
				})
				return obj
			}
		}
	}
</script>

<style lang="scss" scoped>
.list {
	margin: 0rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
	.list-head {
		height: 90rpx;
		display: flex;
		align-items: center;
		position: relative;
		.act-btn {
			display: flex;
			height: 60rpx;
			border-radius: 60rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
			align-items: center;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: rgba(42, 130, 228, 1);

			.add-icon {
				::v-deep .u-icon__icon {
					color: rgba(42, 130, 228, 1) !important;
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
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		overflow: hidden;

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
				font-size: 28rpx;
				line-height: 28rpx;
				flex-wrap: wrap;
				.cell {
					width: 50%;
					display: flex;
					align-items: center;
					margin-top: 30rpx;
					&.remarks{
						width: 100%;
					}

					.cell-label {
						color: rgba(128, 128, 128, 1);
						white-space: nowrap;
					}

					.cell-content {
						flex: 1;
						display: flex;
						.nums {
							color: rgba(128, 128, 128, 1);
							display: flex;
							align-items: center;
							flex: 1;
							input {
								width: 150rpx;
								text-align: right;
								font-size: 28rpx;
								border-bottom: 1px solid #ccc;
								text-align: center;
							}
						}

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

		.total {
			display: flex;
			font-size: 28rpx;

			.total-tle {
				height: 80rpx;
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
				padding: 0 20rpx;

				.item {
					margin-right: 30rpx;

					>text:first-child {
						color: gray;
					}

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
}
</style>