<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('salesMg.common.totalTxt')}}：<text>{{totals}}</text></view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="goto('/salesManage/allotOrderInfo/allotOrderInfo',{editId:item.id})">
					<view class="head">
						<text>{{item.billNo}}</text>
						<text class="status green" v-if="item.state==3">{{$t('salesMg.common.allotStateTxt')[0]}}</text>
						<text class="status warning"
							v-if="item.state==1">{{$t('salesMg.common.allotStateTxt')[1]}}</text>
						<text class="status"
							v-if="item.state==2">{{$t('salesMg.common.allotStateTxt')[2]}}</text>
						<text class="status red"
							v-if="item.state==5">{{$t('salesMg.common.allotStateTxt')[3]}}</text>
						<text class="status gray "
							v-if="item.state==4">{{$t('salesMg.common.allotStateTxt')[4]}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('salesMg.allotReciveList.outOrgName')}}：</view>
							<view class="desc">{{item.outOrgName}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('salesMg.allotReciveList.inOrgName')}}：</view>
							<view class="desc">{{item.inOrgName}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('salesMg.allotReciveList.billTime')}}：</view>
							<view class="desc">{{item.billTime | dayjs}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('salesMg.allotReciveList.pickMode')}}：</view>
							<view class="desc">{{item.pickMode | pickMode}}</view>
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
	let that = null
	import {
		salesTransferFindList,
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
				searchOptions: [
					{
						labelText: this.$t('salesMg.allotReciveList.searchOptions.stateStr.label'),
						type: 'select',
						fieldName: 'stateStr',
						multiple: true,
						options: this.$t('salesMg.allotReciveList.searchOptions.stateStr.options'),
					},
					{
						type: 'select',
						labelText: this.$t('salesMg.allotReciveList.searchOptions.outOrgId.label'),
						fieldName: 'outOrgId',
						options: []
					},
					{
						labelText: this.$t('salesMg.allotReciveList.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange',
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('salesMg.allotReciveList.searchOptions.createDateRange.placeholder')
					}
				],
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('salesMg.allotReciveList.stateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.allotReciveList.pickModeTxt')
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
			// 获取应用组织
			await this.getOrgList()
			this.searchOptions[1].options = this.orgList
		},
		async mounted() {

		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.allotReciveList.titleText')
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
				} = await salesTransferFindList(data)
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
