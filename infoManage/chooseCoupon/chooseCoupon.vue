<template>
	<view class="list-part">
		<view class="search-box">
			<search :search-options="searchOptions" @search="search"></search>
		</view>
		<view v-if="empty">
			<view class="bilList" v-if="dataList.length">
				<view class="list" v-for="(item,index) in dataList" :key="index" @click="chooseBox(index)">
					<view class="main-content">
						<view>
							<view class="tle">{{item.couponNo}}</view>
							<view class="desc">
								<view class="item">
									<text class="label">优惠券名称</text>
									<text class="txt">{{item.couponName}}</text>
								</view>
								<view class="item">
									<text class="label">使用商品</text>
									<text class="txt">{{item.useGoodsType | useGoodsType}}</text>
								</view>
								<view class="item">
									<text class="label">使用门槛</text>
									<text class="txt">{{item.useType | useType}}</text>
								</view>
								<view class="item">
									<text class="label">有效期</text>
									<text class="txt">{{item.vaildStartTime | dayjs}} -
										{{item.vaildEndTime | dayjs}}</text>
								</view>
							</view>
						</view>
						<view class="check">
							<image class="icon" v-if="item.active" mode="widthFix" src="/static/image/check.png" />
							<image v-else class="icon" mode="widthFix" src="/static/image/uncheck.png" />
						</view>
					</view>

				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="bilList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<view class="bottom-part">
			<view class="btnAdd" @click="chooseSave">{{$t('common.btn.confirm')}}</view>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		couponFindCustomerCouponList
	} from '@/api/lpgSalesManageApi'
	import paginationMixin from '@/common/paginationMixin.js'
	export default {
		mixins: [paginationMixin],
		props: {

		},
		data() {
			return {
				couponMoney: '',
				customerId: '',
				goodsDetailIdStr: '',
				orgId: '',
				multiple: false,
				searchOptions: [{
						type: 'select',
						labelText: '优惠券类型',
						fieldName: 'couponType',
						options: [{
								name: '线上',
								value: 1
							},
							{
								name: '线下',
								value: 2
							}
						]
					},
					{
						type: 'select',
						labelText: '使用门槛',
						fieldName: 'useType',
						options: [{
								name: '无门槛',
								value: 1
							},
							{
								name: '满减',
								value: 2
							}
						]
					},
					{
						type: 'select',
						labelText: '使用门槛',
						fieldName: 'useGoodsType',
						options: [{
								name: '全部商品',
								value: 1
							},
							{
								name: '部分商品',
								value: 2
							}
						]
					}
				]
			}
		},
		computed: {
			onePageRow() {
				return 6
			}
		},
		// 过滤器
		filters: {
			useType(value) {
				const stateObj = {
					1: '无门槛',
					2: '满减'
				}
				return stateObj[value] || ''
			},
			useGoodsType(value) {
				const stateObj = {
					1: '全部商品',
					2: '部分商品'
				}
				return stateObj[value] || ''
			}
		},
		created() {},
		async mounted() {},
		onLoad(options) {
			this.orgId = options.orgId || ''
			this.couponMoney = options.couponMoney || ''
			this.goodsDetailIdStr = decodeURIComponent(options.goodsDetailIdStr) || ''
			this.customerId = options.customerId || ''
			this.multiple = options.multiple || false
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: '选择优惠券'
			})
		},
		methods: {
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
						size: this.pagination.getCurrentSize(),
						orgId: this.orgId,
						couponMoney: this.couponMoney,
						customerId: this.customerId,
						goodsDetailIdStr: this.goodsDetailIdStr
					}
				}
				const {
					returnValue: res,
					totals
				} = await couponFindCustomerCouponList(data)
				if (res) {
					let ids = []
					if (this.multiple) {
						ids = ids.concat(this.billId.split(','))
					} else {
						ids.push(this.billId)
					}
					res.forEach(v => {
						if (ids.indexOf(v.billId) > -1) {
							v.active = true
						} else {
							v.active = false
						}
					})
					this.setMoreData(res)
					this.totals = totals
				}
				this.loadClose()
			},
			// 选择
			chooseBox(index) {
				if (this.multiple) {
					this.dataList[index].active = this.dataList[index].active == true ? false : true
				} else {
					this.dataList.forEach(v => {
						v.active = false
					})
					this.dataList[index].active = true
				}

			},
			// 确定
			chooseSave() {
				// 过滤选中的数据返回
				let data = []
				data = this.dataList.filter(v => v.active === true)
				if (this.multiple) {
					uni.$emit('chooseCoupon', data)
				} else {
					uni.$emit('chooseCoupon', data[0])
				}
				uni.navigateBack({
					delta: 1
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<style>
	page {
		background: #F7F7F7;
	}
</style>
<style lang="scss" scoped>
	.list-part {
		padding-bottom: 120rpx;

		.search-box {
			display: flex;
			align-items: center;
			padding: 0;

			::v-deep .u-search__action {
				display: none;
			}
		}

		.bilList {
			padding: 136rpx 20rpx 0rpx 20rpx;

			.list {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2rpx 4rpx 0px rgba(229, 229, 229, 0.5);
				border-radius: 20rpx;
				padding: 20rpx 20rpx;
				margin-bottom: 30rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.tle {
					font-size: 32rpx;
					word-break: break-all;
					font-weight: bold;
				}

				.main-content {
					display: flex;
					align-items: center;

					.check {
						display: flex;
						justify-content: flex-end;
						padding: 16rpx 0rpx;

						image {
							width: 48rpx;
							height: 48rpx;
						}
					}
				}

				.desc {
					display: flex;
					font-size: 28rpx;
					color: #383838;
					flex-wrap: wrap;
					margin-top: 10rpx;
					line-height: 44rpx;
					flex-wrap: wrap;

					.item {
						&:nth-child(3n) {
							// margin-right: 0;
						}

						margin-right: 30rpx;
						// min-width: calc(100% / 3);
						width: 100%;
						word-break: break-all;
						display: flex;
						align-items: flex-start;
						flex-wrap: wrap;

						text:first-child {
							color: #666;

							&::after {
								display: inline-block;
								content: "：";
							}
						}

						text:last-child {
							color: #000;
						}
					}
				}
			}

			.filter {
				background: white;
				border-radius: 20rpx;
				display: flex;

				.filter-menu {
					width: 200rpx;
					border-right: 2px solid #E5E5E5;

					.item {
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						font-size: 32rpx;
						border-bottom: 1px solid #E5E5E5;

						&:last-child {
							border-bottom: none;
						}
					}
				}

				.filter-box {
					width: 1px;
					flex: 1;
				}
			}
		}
	}
</style>
