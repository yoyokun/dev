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
							<view class="tle">{{item.billNo}}</view>
							<view class="desc">
								<view class="item">
									<text class="label">{{$t('chooseBill.billTypeName')}}</text>
									<text class="txt">{{item.billTypeName}}</text>
								</view>
								<view class="item">
									<text class="label">{{$t('chooseBill.orgName')}}</text>
									<text class="txt">{{item.orgName}}</text>
								</view>
								<view class="item">
									<text class="label">{{$t('chooseBill.customerName')}}</text>
									<text class="txt">{{item.customerName}}</text>
								</view>
								<view class="item">
									<text class="label">{{$t('chooseBill.billStateName')}}</text>
									<text class="txt">{{item.billStateName}}</text>
								</view>
								<view class="item">
									<text class="label">{{$t('chooseBill.operator')}}</text>
									<text class="txt">{{item.operator}}</text>
								</view>
								<view class="item">
									<text class="label">{{$t('chooseBill.operationTime')}}</text>
									<text class="txt">{{item.operationTime|dayjs}}</text>
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
		sysLinkBillFindLinkBillList,
		sysLinkBillFindList
	} from '@/api/lpgManageAppApi'
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
				formType: '',
				orgId: '',
				customerId: '',
				billsType: '',
				linkScope: 'stock',
				searchOptions: [
					{
						labelText: this.$t('chooseBill.searchOptions.billCodeTypeStr.label'),
						type: 'select',
						fieldName: 'billCodeTypeStr',
						defaultValue: '',
						multiple:true,
						options: [],
					},
					{
						labelText: this.$t('chooseBill.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange', // 固定
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('chooseBill.searchOptions.createDateRange.placeholder')
					}
				]
			}
		},
		computed: {
			onePageRow() {
				return 5
			}
		},
		// 过滤器
		filters: {},
		created() {},
		async mounted() {
			
		},
		async onLoad(options) {
			this.orgId = this.userInfo.orgId
			this.billId = options.billId || ''
			this.multiple = options.multiple || false
			this.linkScope = options.type || this.linkScope
			// 获取单据类型
			await this.getBillType({ linkScope: this.linkScope })
			this.searchOptions[0].options = this.billType
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('chooseBill.titleText')
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
						formType: this.formType,
						orgIdStr: this.orgId,
						customerId: this.customerId,
						moneyType: this.billsType,
						linkScope: this.linkScope
					}
				}
				const {
					returnValue: res,
					totals
				} = await sysLinkBillFindLinkBillList(data)
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
					uni.$emit('chooseBill', data)
				} else {
					uni.$emit('chooseBill', data[0])
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
						min-width: calc(100% / 3);
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
