<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('stockMg.stockOrderList.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" @click="goto('/stockManage/addStockOrder/addStockOrder')">
					<u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}
				</view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index"
					@click="goto('/stockManage/addStockOrder/addStockOrder',{editId: item.id})">
					<view class="head">
						<text>{{item.billNo}}</text>
						<text class="status" v-if="item.checkState==3">{{$t('stockMg.stockOrderList.checkStateTxt')[0]}}</text>
						<text class="status green" v-if="item.checkState==1">{{$t('stockMg.stockOrderList.checkStateTxt')[1]}}</text>
						<text class="status warning" v-if="item.checkState==2">{{$t('stockMg.stockOrderList.checkStateTxt')[2]}}</text>
						<text class="status gray" v-if="item.checkState==5">{{$t('stockMg.stockOrderList.checkStateTxt')[3]}}</text>
						<text class="status red" v-if="item.checkState==4">{{$t('stockMg.stockOrderList.checkStateTxt')[4]}}</text>
						<text class="status gray" v-if="item.checkState==6">{{$t('stockMg.stockOrderList.checkStateTxt')[5]}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('stockMg.stockOrderList.customerName')}}：</view>
							<view class="desc">{{item.customerName}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('stockMg.stockOrderList.linkBillNo')}}：</view>
							<view class="desc">{{item.linkBillNo}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('stockMg.stockOrderList.operationTime')}}：</view>
							<view class="desc">{{item.operationTime | dayjs}}</view>
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
		stockBillLogFindList,
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
				showModal: false,
				modalParams: {},
				searchOptions: [{
						type: 'select',
						labelText: this.$t('stockMg.stockOrderList.searchOptions.orgIdStr.label'),
						fieldName: 'orgIdStr',
						options: []
					},
					{
						labelText: this.$t('stockMg.stockOrderList.searchOptions.stockFormType.label'),
						type: 'select',
						fieldName: 'stockFormType',
						options: this.$t('stockMg.stockOrderList.searchOptions.stockFormType.options')
					},
					{
						labelText: this.$t('stockMg.stockOrderList.searchOptions.linkType.label'),
						type: 'select',
						fieldName: 'linkType',
						options: this.$t('stockMg.stockOrderList.searchOptions.linkType.options')
					},
					{
						labelText: this.$t('stockMg.stockOrderList.searchOptions.checkState.label'),
						type: 'select',
						fieldName: 'checkState',
						options: this.$t('stockMg.stockOrderList.searchOptions.checkState.options')
					}
				]
			}
		},
		// 过滤器
		filters: {},
		computed: {
			onePageRow() {
				return 5
			}
		},
		async created() {
			// 获取应用组织
			await this.getOrgList()
			this.searchOptions[0].options = this.orgList
		},
		async mounted() {

		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('stockMg.stockOrderList.titleText')
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
				} = await stockBillLogFindList(data)
				console.log(res)
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
	}
</style>
