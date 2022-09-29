<template>
	<view class="list-part">
		<view class="tabs">
			<u-tabs activeStyle="color:rgb(42, 130, 228)" :scrollable="false" :list="orderStatus" :current="current" :itemStyle="{flex:'1',height:'44px'}" @change="changeTabs"></u-tabs>
		</view>
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('salesMg.common.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" @click="">
					<u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}
				</view>
			</view>
		</view>
		<scroll-view class="scroll-box" scroll-y="true" @scrolltolower="loadMore">
			<block v-if="empty">
				<view class="gp-box" v-if="dataList.length">
					<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="">
						<view class="head">
							<text>{{item.billNo}}</text>
							<text class="status green"
								v-if="item.orderState==3">{{$t('salesMg.common.orderStateTxt')[2]}}</text>
							<text class="status warning"
								v-if="item.orderState==1">{{$t('salesMg.common.orderStateTxt')[0]}}</text>
							<text class="status"
								v-if="item.orderState==2">{{$t('salesMg.common.orderStateTxt')[1]}}</text>
							<text class="status gray"
								v-if="item.orderState==5">{{$t('salesMg.common.orderStateTxt')[4]}}</text>
							<text class="status red"
								v-if="item.orderState==4">{{$t('salesMg.common.orderStateTxt')[3]}}</text>
						</view>
						<view class="main-box">
							<view class="item">
								<view class="label">{{$t('salesMg.salesOrderList.customerNo')}}：</view>
								<view class="desc">{{item.customerNo}} - {{item.customerName}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('salesMg.salesOrderList.totalSaleMoney')}}：</view>
								<view class="desc">{{item.totalSaleMoney}} &ensp; {{item.payState | payState}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('salesMg.salesOrderList.orderTime')}}：</view>
								<view class="desc">{{item.orderTime | dayjs}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('salesMg.salesOrderList.pickMode')}}：</view>
								<view class="desc">{{item.pickMode | pickMode}} &ensp;
									{{item.deliveryState|deliveryState}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="loading" class="noData">
					<loading class="loading" />
				</view>	
				
				<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
			</block>
			<view v-else class="gp-box">
				<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
			</view>
			<loading v-if="loadingCenter" class="loading-center" />
		</scroll-view>

		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		salesOrderFindList,
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
				current: 0,
				orderStatus: this.$t('salesMg.salesOrderList.tabs'),
				searchOptions: [{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.saleDateRange.label'),
						type: 'datetimerange',
						fieldName: 'saleDateRange',
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.saleDateRange.placeholder'),
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.orderStateStr.label'),
						type: 'select',
						fieldName: 'orderStateStr',
						multiple: true,
						options: this.$t('salesMg.salesOrderList.searchOptions.orderStateStr.options'),
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.customerNo.label'),
						fieldName: 'customerNo',
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.customerNo.placeholder'),
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.customerName.label'),
						fieldName: 'customerName',
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.customerName.placeholder'),
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.licenseNo.label'),
						fieldName: 'licenseNo',
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.licenseNo.placeholder'),
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.startMoney.label'),
						fieldName: 'startMoney',
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.startMoney.placeholder'),
					},
					{
						type: 'text',
						labelText: '',
						fieldName: 'endMoney',
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.endMoney.placeholder'),
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.customerTypeId.label'),
						type: 'select',
						fieldName: 'customerTypeId',
						options: []
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.regionId.label'),
						type: 'select',
						fieldName: 'regionId',
						options: []
					},
					{
						type: 'select',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.propertyId.label'),
						fieldName: 'propertyId',
						options: [],
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange',
						startName: 'startRecordTime', // 开始日期字段
						endName: 'endRecordTime', // 结束日期字段
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.createDateRange.placeholder'),
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.createDate1.label'),
						type: 'datetimerange',
						fieldName: 'createDate1',
						startName: 'startFinishTime', // 开始日期字段
						endName: 'endFinishTime', // 结束日期字段
						placeholder: this.$t('salesMg.salesOrderList.searchOptions.createDate1.placeholder'),
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.deliveryState.label'),
						type: 'select',
						fieldName: 'deliveryState',
						options: this.$t('salesMg.salesOrderList.searchOptions.deliveryState.options'),
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.payType.label'),
						type: 'select',
						fieldName: 'payType',
						options: this.$t('salesMg.salesOrderList.searchOptions.payType.options')
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.collectionTypeId.label'),
						type: 'select',
						fieldName: 'collectionTypeId',
						options: []
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.pickMode.label'),
						type: 'select',
						fieldName: 'pickMode',
						options: this.$t('salesMg.salesOrderList.searchOptions.pickMode.options')
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.orderSource.label'),
						type: 'select',
						fieldName: 'orderSource',
						options: this.$t('salesMg.salesOrderList.searchOptions.orderSource.options')
					},
					{
						labelText: this.$t('salesMg.salesOrderList.searchOptions.hangUpType.label'),
						type: 'select',
						fieldName: 'hangUpType',
						options: this.$t('salesMg.salesOrderList.searchOptions.hangUpType.options'),
					},
					{
						type: 'select',
						labelText: this.$t('salesMg.salesOrderList.searchOptions.orgIdStr.label'),
						fieldName: 'orgIdStr',
						multiple: false,
						options: []
					}
				],
			}
		},
		// 过滤器
		filters: {
			payState(value) {
				const stateObj = that.$t('salesMg.salesOrderList.payStateTxt')
				return stateObj[value] || ''
			},
			orderState(value) {
				const stateObj = that.$t('salesMg.salesOrderList.orderStateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.salesOrderList.pickModeTxt')
				return stateObj[value] || ''
			},
			deliveryState(value) {
				const stateObj = that.$t('salesMg.salesOrderList.deliveryStateTxt')
				return stateObj[value] || ''
			},

		},
		computed: {
			onePageRow() {
				return 5
			}
		},
		async created() {
			that = this
			// 获取客户类型
			await this.getCustomerType()
			this.searchOptions[7].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.searchOptions[8].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.searchOptions[9].options = this.arrayMergingCommon(this.customertProperty)
			// 获取支付方式
			await this.getCustomerCollectionType()
			this.searchOptions[14].options = this.customerCollectionType
			// 获取应用组织
			await this.getOrgList()
			this.searchOptions[18].options = this.orgList
		},
		async mounted() {

		},
		onLoad(options) {},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.salesOrderList.titleText')
			})
		},
		methods: {
			// 加载更多
			loadMore(){
				if(this.searchEnding){
					return
				}
				// 正在加载
				if (this.loading) {
					return
				}
				this.loading = true
				this.findDataList()
			},
			// 切换tabs
			changeTabs(e) {
				let params = {}
				params.orderStateStr = e.index
				if (e.index == 0) {
					params.orderStateStr = ''
				}
				if (e.index == 4) {
					params.orderStateStr = '4,5'
				}
				this.search(params)
				this.current = e.index
			},
			// 搜索
			search(e) {
				this.current = 0
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
				} = await salesOrderFindList(data)
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
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		.scroll-box {
			flex: 1;
			height: 1px;
		}
		.gp-box {
			padding-top: 30rpx;
			.gp-main:last-child{
				margin-bottom: 0;
			}
		}
		.noData{
			padding-bottom: 120rpx;
		}
	}

	.tabs {
		background: white;
		border-bottom: 1px solid #eee;
	}

	.search-box {
		position: static;
		padding-bottom: 20rpx;
		.total {
			margin-bottom: 0;
		}
	}
</style>
