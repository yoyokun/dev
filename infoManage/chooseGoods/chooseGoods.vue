<template>
	<view class="list-part">
		<view class="search-box">
			<search :search-options="searchOptions" @search="search"></search>
		</view>
		<view v-if="empty">
			<view class="goodsList" v-if="dataList.length">
				<view class="list" v-for="(item,index) in dataList" :key="index">
					<view class="tle">{{item.goodsNo}} - {{item.goodsName}}</view>
					<view class="desc">
						<view class="item">
							<text class="label">{{$t('chooseGoods.brandName')}}</text>
							<text class="txt">{{item.brandName}}</text>
						</view>
						<view class="item">
							<text class="label">{{$t('chooseGoods.goodsClassifyName')}}</text>
							<text class="txt">{{item.goodsClassifyName}}</text>
						</view>
						<view class="item">
							<text class="label">{{$t('chooseGoods.unitsName')}}</text>
							<text class="txt">{{item.unitsName}}</text>
						</view>
					</view>
					<view class="sku" v-for="(val,key) in item.child" :key="key" @click.stop="chooseBox(index,key)">
						<view class="desc">
							<view class="item">
								<text class="label">{{$t('chooseGoods.standardName')}}</text>
								<text class="txt">{{val.standardName}}</text>
							</view>
							<view class="item">
								<text class="label">{{$t('chooseGoods.propertyNames')}}</text>
								<text class="txt">{{val.propertyNames}}</text>
							</view>
							<block v-if="val.assistUnitsList&&val.assistUnitsList.length"
								v-for="(i,k) in val.assistUnitsList" :key="k">
								<view class="item" v-if="i.unitsName&&i.netContent">
									<text class="label">{{i.unitsName}}</text>
									<text class="txt">{{i.netContent}}</text>
								</view>
							</block>
							<view class="item">
								<text class="label">{{$t('chooseGoods.listPrice')}}</text>
								<text class="txt">{{val.listPrice}}</text>
							</view>
							<view class="item">
								<text class="label">{{$t('chooseGoods.costPrice')}}</text>
								<text class="txt">{{val.costPrice}}</text>
							</view>
							<view class="item">
								<text class="label">{{$t('chooseGoods.curStock')}}</text>
								<text class="txt">{{val.curStock}}</text>
							</view>
						</view>
						<view class="check">
							<image class="icon" v-if="val.active" mode="widthFix" src="/static/image/check.png" />
							<image v-else class="icon" mode="widthFix" src="/static/image/uncheck.png" />
						</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="goodsList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<view class="bottom-part">
			<view class="btnAdd" @click="chooseSave">{{$t('common.btn.confirm')}}</view>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- ?????? toast ?????? -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		goodsFindList
	} from '@/api/lpgManageAppApi'
	import paginationMixin from '@/common/paginationMixin.js'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	let that = null
	export default {
		mixins: [paginationMixin, settingMixin],
		data() {
			return {
				goodsId: '', // ???????????????id
				goodsIdStr: '', // ??????sku
				propertyIdStr: '', // ????????????
				goodsCustomerDate: '', // ??????
				customerId: '', // ??????id
				businessTag: '',
				// ??????id
				orgId: '',
				searchOptions: [{
						type: 'select',
						labelText: this.$t('chooseGoods.searchOptions.goodsClassifyId.label'),
						fieldName: 'goodsClassifyId',
						placeholder: this.$t('chooseGoods.searchOptions.goodsClassifyId.placeholder'),
						defaultValue: '',
						options: []
					},
					{
						labelText: this.$t('chooseGoods.searchOptions.brandId.label'),
						type: 'select',
						fieldName: 'brandId',
						defaultValue: '',
						options: [],
						placeholder: this.$t('chooseGoods.searchOptions.brandId.placeholder')
					},
					{
						labelText: this.$t('chooseGoods.searchOptions.unitsId.label'),
						type: 'select',
						fieldName: 'unitsId',
						defaultValue: '',
						options: [],
						placeholder: this.$t('chooseGoods.searchOptions.unitsId.placeholder')
					},
					{
						type: 'text',
						labelText: this.$t('chooseGoods.searchOptions.startListPrice.label'),
						fieldName: 'startListPrice',
						placeholder: this.$t('chooseGoods.searchOptions.startListPrice.placeholder')
					},
					{
						type: 'text',
						labelText: '',
						fieldName: 'endListPrice',
						placeholder: this.$t('chooseGoods.searchOptions.endListPrice.placeholder')
					},
					{
						type: 'text',
						labelText: this.$t('chooseGoods.searchOptions.startCostPrice.label'),
						fieldName: 'startCostPrice',
						placeholder: this.$t('chooseGoods.searchOptions.startCostPrice.placeholder')
					},
					{
						type: 'text',
						labelText: this.$t('chooseGoods.searchOptions.endCostPrice.label'),
						fieldName: 'endCostPrice',
						placeholder: this.$t('chooseGoods.searchOptions.endCostPrice.placeholder')
					},
					{
						labelText: this.$t('chooseGoods.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange', // ??????
						startName: 'startDate', // ??????????????????
						endName: 'endDate', // ??????????????????
						placeholder: this.$t('chooseGoods.searchOptions.createDateRange.placeholder')
					}
				]
			}
		},
		computed: {
			onePageRow() {
				return 5
			}
		},
		// ?????????
		filters: {},
		created() {
			that = this
		},
		async mounted() {
			// ????????????
			await this.getGoodsClassifyList({
				orgId: this.orgId
			})
			this.searchOptions[0].options = this.treeToList(this.treeDataGoodsClassify)
			// ????????????
			await this.getBrandList({
				orgId: this.orgId
			})
			this.searchOptions[1].options = this.brandList
			// ????????????
			await this.getFieldUnitList()
			this.searchOptions[2].options = this.measuringUnitData
		},
		onLoad(options) {
			this.goodsId = options.goodsId || ''
			this.goodsIdStr = options.goodsIdStr || ''
			this.propertyIdStr = options.propertyIdStr || ''
			this.goodsCustomerDate = options.goodsCustomerDate || ''
			this.customerId = options.customerId || ''
			this.orgId = options.orgId || ''
			this.multiple = options.multiple || false
			this.businessTag = options.businessTag || ''
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('chooseGoods.titleText')
			})
		},
		methods: {
			search(e) {
				this.params = {
					...e
				}
				this.getInit()
			},
			// ????????????
			async findDataList() {
				const data = {
					...(this.params || {}),
					...{
						state: 4,
						propertyIdStr: this.propertyIdStr,
						goodsCustomerDate: this.goodsCustomerDate,
						customerId: this.customerId,
						goodsIdStr: this.goodsIdStr,
						businessTag: this.businessTag,
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await goodsFindList(data)
				if (res) {
					let goodsArr = {}
					let ids = []
					if (this.multiple) {
						ids = ids.concat(this.goodsId.split(','))
					} else {
						ids.push(this.goodsId)
					}
					res.forEach(v => {
						if (ids.indexOf(v.goodsDetailId) > -1) {
							v.active = true
						} else {
							v.active = false
						}
						if (goodsArr.hasOwnProperty(v.goodsId)) {
							goodsArr[v.goodsId].child.push(v)
						} else {
							goodsArr[v.goodsId] = v
							goodsArr[v.goodsId].child = [v]
						}
					})
					goodsArr = Object.values(goodsArr)
					this.setMoreData(goodsArr)
					this.totals = totals
				}
				this.loadClose()
			},
			// ??????
			chooseBox(index, key) {
				if (this.multiple) {
					this.dataList[index].child[key].active = this.dataList[index].child[key].active == true ? false : true
				} else {
					this.dataList.forEach(v => {
						v.child.forEach(i => {
							i.active = false
						})
					})
					this.dataList[index].child[key].active = true
				}

			},
			// ??????
			chooseSave() {
				// ???????????????????????????
				let data = []
				this.dataList.forEach((item, index) => {
					data = data.concat(item.child.filter(v => v.active === true))
				})
				if (this.multiple) {
					uni.$emit('chooseGoods', data)
				} else {
					uni.$emit('chooseGoods', data[0])
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

		.goodsList {
			padding: 136rpx 20rpx 0rpx 20rpx;

			.list {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 2rpx 4rpx 0px rgba(229, 229, 229, 0.5);
				border-radius: 20rpx;
				padding: 40rpx 20rpx;
				margin-bottom: 30rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.tle {
					font-size: 32rpx;
					word-break: break-all;
					font-weight: bold;
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
						width: calc(100% / 3);
						display: flex;
						// padding: 0 10rpx;
						// width: fit-content;
						// align-items: center;
						align-items: flex-start;
						flex-wrap: wrap;

						text:first-child {
							color: #666;

							&::after {
								display: inline-block;
								content: "???";
							}
						}

						text:last-child {
							// width: 1px;
							// flex: 1;
							color: #000;
							// word-break: break-all;
						}
					}
				}

				.sku {
					background: #F7F7F7;
					border-radius: 10rpx;
					padding: 0 16rpx;
					margin-top: 20rpx;

					.desc {
						padding: 30rpx 0;
						border-bottom: 1px solid #E5E5E5;
						margin-top: 0;
						// line-height: 58rpx;

						.item {
							margin-bottom: 20rpx;
							flex-wrap: wrap;
							padding: 0 2rpx;
							box-sizing: border-box;

							&:nth-last-child(-n+3) {
								margin-bottom: 0;
							}

							.txt {
								word-break: break-all;
							}
						}
					}

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
