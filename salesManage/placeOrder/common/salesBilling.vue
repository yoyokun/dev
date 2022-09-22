<template>
	<view class="">
		<view class="list-box" v-for="(item,index) in listOrder" :key="index">
			<view class="list">
				<view class="list-head">
					<view class="head-tle">3432423</view>
					<view class="act-btn" @click="chooseGoods(index)">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">商品</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(val,key) in item.salesOrderDetailGoodsJson" :key="key">
						<view class="goods-head">
							<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
							<view class="goods-price">￥{{val.unitPrice}}</view>
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
										<view class="item-tle">{{$t('stockMg.common.goodsClassifyName')}}：</view>
										<view class="item-txt">{{val.goodsClassifyName}}</view>
									</view>
									<view class="attr-item" v-if="val.propertyNames">
										<view class="item-tle">{{$t('stockMg.common.propertyNames')}}：</view>
										<view class="item-txt">{{val.propertyNames}}</view>
									</view>
									<view class="attr-item" v-if="val.standardName">
										<view class="item-tle">{{$t('stockMg.common.standardName')}}：</view>
										<view class="item-txt">{{val.standardName}}</view>
									</view>
									<view class="attr-item" v-if="val.brandName">
										<view class="item-tle">{{$t('stockMg.common.brandName')}}：</view>
										<view class="item-txt">{{val.brandName}}</view>
									</view>
									<view class="attr-item" v-if="val.unitsName">
										<view class="item-tle">{{$t('stockMg.common.unitsName')}}：</view>
										<view class="item-txt">{{val.unitsName}}</view>
									</view>
								</view>
							</view>
							<u-icon class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(index,key)">
							</u-icon>
						</view>
		
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">规格：</view>
								<view class="cell-content">{{val.standardName}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">数量：</view>
								<view class="cell-content">
									<view class="nums"><text>x</text><input min="1" maxlength="4" type="number"
											v-model="val.amount" :placeholder="'数量'" step="1"
											@input="checkNum($event,index,key)" />
									</view>
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">结算数量：</view>
								<view class="cell-content">{{val.settleAmount}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">金额：</view>
								<view class="cell-content">{{val.totalMoney}}</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">备注：</view>
								<view class="cell-content">
									<textarea v-model="val.remarks" placeholder="请输入备注"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="total">
						<view class="total-tle">
							<text>合计：</text>
						</view>
						<view class="total-main">
							<view class="item">
								<text>数量：</text>
								<text>{{item.amount}}</text>
							</view>
							<view class="item">
								<text>金额：</text>
								<text class="red">{{item.totalMoney}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'salesBilling',
		props: {
			// 模板ids
			id: {
				type: String,
				default: ''
			},
			// 所有模板
			templateData: {
				type: [Array, Object],
				default() {
					return []
				}
			},
			// 客户标签选择商品时用
			propertyIdStr: {
				type: String,
				default: ''
			},
			// 开单类型 1正常开单，2补录单 3电话订单 4客服中心电话订单
			billType: {
				type: [Number, String],
				default: 1
			},
			// 报价日期选择商品时用
			goodsCustomerDate: {
				type: [Number, String],
				default: ''
			},
			// 客户id选择商品时用
			customerId: {
				type: [Number, String],
				default: ''
			},
			// 是否结算 true 结算，不可更改单
			isSettle: {
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style>
</style>