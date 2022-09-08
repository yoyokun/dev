<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('stockMg.common.totalTxt')}}：<text>{{totals}}</text></view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index">
					<view class="head">
						<text>{{item.goodsNo}} - {{item.goodsName}}</text>
						<view class="unit" v-if="item.unitsName">
							<text class="label">{{$t('stockMg.stockList.unit')}}：</text>
							<text class="desc">{{item.unitsName}}</text>
						</view>
					</view>
					<view class="main-box">
						<view class="attr-del">
							<view class="attr">
								<view class="attr-txt">
									{{ item.goodsClassifyName ? item.goodsClassifyName + "," : "" }}
									{{ item.propertyNames ? item.propertyNames + "," : "" }}
									{{ item.standardName ? item.standardName + "," : "" }}
									{{ item.brandName }}
								</view>
								<u-icon class="arrow-right" name="arrow-right"></u-icon>
								<view class="attr-box">
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.goodsClassifyName')}}：</view>
										<view class="item-txt">{{item.goodsClassifyName}}</view>
									</view>
									<view class="attr-item" v-if="item.propertyNames">
										<view class="item-tle">{{$t('stockMg.common.propertyNames')}}：</view>
										<view class="item-txt">{{item.propertyNames}}</view>
									</view>
									<view class="attr-item" v-if="item.standardName">
										<view class="item-tle">{{$t('stockMg.common.standardName')}}：</view>
										<view class="item-txt">{{item.standardName}}</view>
									</view>
									<view class="attr-item" v-if="item.brandName">
										<view class="item-tle">{{$t('stockMg.common.brandName')}}：</view>
										<view class="item-txt">{{item.brandName}}</view>
									</view>
									<view class="attr-item" v-if="item.unitsName">
										<view class="item-tle">{{$t('stockMg.common.unitsName')}}：</view>
										<view class="item-txt">{{item.unitsName}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="flex-item">
							<view class="item">
								<view class="label">{{$t('stockMg.stockList.systemStockNum')}}：</view>
								<view class="desc">{{item.systemStockNum}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('stockMg.stockList.inWayStockNum')}}：</view>
								<view class="desc">{{item.inWayStockNum}}</view>
							</view>
						</view>
						<view class="item">
							<view class="label">{{$t('stockMg.stockList.realStockNum')}}：</view>
							<view class="desc">{{item.realStockNum}}</view>
						</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</block>
		<view v-else class="gp-box">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>

	</view>
</template>

<script>
	import {
		stockGoodsInoutLogFindList,
	} from '@/api/lpgSalesManageApi'
	import paginationMixin from '@/common/paginationMixin.js'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	export default {
		mixins: [paginationMixin, settingMixin],
		props: {

		},
		data() {
			return {
				totals: 0,
				searchOptions: [{
						type: 'select',
						labelText: this.$t('stockMg.stockList.searchOptions.orgIdStr.label'),
						fieldName: 'orgIdStr',
						options: []
					},
					{
						labelText: this.$t('stockMg.stockList.searchOptions.goodsClassifyId.label'),
						type: 'select',
						fieldName: 'goodsClassifyId',
						options: []
					},
					{
						labelText: this.$t('stockMg.stockList.searchOptions.propertyIds.label'),
						type: 'select',
						fieldName: 'propertyIds',
						options: []
					},
					{
						labelText: this.$t('stockMg.stockList.searchOptions.state.label'),
						type: 'select',
						fieldName: 'state',
						options: this.$t('stockMg.stockList.searchOptions.state.options')
					},
				],
			}
		},
		// 过滤器
		filters: {
			
		},
		computed: {
			onePageRow() {
				return 5
			}
		},
		async created() {
			// 获取应用组织
			await this.getOrgList()
			this.searchOptions[0].options = this.orgList
			// 获取分类
			await this.getGoodsClassifyList()
			this.searchOptions[1].options = this.treeToList(this.treeDataGoodsClassify)
			await this.getPropertyClassifySelectPropertyBox({ type: 'goods' })
			this.searchOptions[2].options = this.arrayMergingCommon(this.propertyClassifySelectProperty)
		},
		async mounted() {

		},
		onLoad(options) {},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('stockMg.stockList.titleText')
			})
		},
		methods: {
			// 搜索
			search(e) {
				this.params = {
					...e
				}
				this.getInit()
			},
			// 获取列表
			async findDataList() {
				const data = {
					...(this.params || {}),
					...{
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await stockGoodsInoutLogFindList(data)
				this.setMoreData(res)
				this.totals = totals
				this.loadClose()
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F7F7F7;
	}

	.list-part {
		padding-bottom: 120rpx;

		.head {
			min-height: 1px;
			padding: 20rpx 24rpx;
			box-sizing: border-box;
			height: auto;
			>text{
				width: 1px;
				flex: 1;
			}
			.unit {
				font-size: 28rpx;
				margin-left: 20rpx;
				.label {
					color: #707070;
				}

				.desc {
					color: #383838;
				}
			}
		}

		.attr-del {
			display: flex;
			justify-content: space-between;
			// margin-top: 20rpx;
			align-items: center;
		}

		.attr {
			padding: 0 10rpx;
			height: 50rpx;
			display: flex;
			align-items: center;
			// width: 360rpx;
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
					left: 20rpx;
					// left: calc(50% - 15rpx);
					// transform: translate(-50%, 0%);
					// transform: translate(0%, 0%);
					transform: rotate(45deg);
					display: block;
					width: 30rpx;
					height: 30rpx;
					background: rgba(247, 247, 247, 1);
				}
			}

		}

		.flex-item {
			display: flex;
			margin-top: 20rpx;

			.item {
				margin-right: 30rpx;
				flex: 1;
				width: 1px;
				margin-top: 0;

				&:last-child {
					margin-right: 0;
				}
			}


		}
	}
</style>
