<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('stockMg.common.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_fillOrderList_add'}" @click="goto('/stockManage/addFillOrder/addFillOrder')">
					<u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}
				</view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index"
					@click="goto('/stockManage/addFillOrder/addFillOrder',{editId: item.id})">
					<view class="head">
						<text>{{item.billNo}}</text>
						<text class="status" v-if="item.checkState==3">{{$t('stockMg.common.checkStateTxt')[0]}}</text>
						<text class="status green"
							v-if="item.checkState==1">{{$t('stockMg.common.checkStateTxt')[1]}}</text>
						<text class="status warning"
							v-if="item.checkState==2">{{$t('stockMg.common.checkStateTxt')[2]}}</text>
						<text class="status gray"
							v-if="item.checkState==5">{{$t('stockMg.common.checkStateTxt')[3]}}</text>
						<text class="status red"
							v-if="item.checkState==4">{{$t('stockMg.common.checkStateTxt')[4]}}</text>
						<text class="status gray"
							v-if="item.checkState==6">{{$t('stockMg.common.checkStateTxt')[5]}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('stockMg.fillOrderList.fillTime')}}：</view>
							<view class="desc">{{item.fillingStartTime|dayjs('YYYY-MM-DD HH:mm')}} - {{item.fillingEndTime|dayjs('YYYY-MM-DD HH:mm')}}</view>
						</view>
						<view class="flex-item">
							<view class="item">
								<view class="label">{{$t('stockMg.fillOrderList.systemTotalNum')}}：</view>
								<view class="desc">{{item.systemTotalNum}}{{$t('stockMg.fillOrderList.unit')}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('stockMg.fillOrderList.planTotalWeight')}}：</view>
								<view class="desc">{{item.planTotalWeight}}kg</view>
							</view>
						</view>
						<view class="flex-item">
							<view class="item">
								<view class="label">{{$t('stockMg.fillOrderList.realTotalNum')}}：</view>
								<view class="desc">{{item.realTotalNum}}{{$t('stockMg.fillOrderList.unit')}}</view>
							</view>
							<view class="item">
								<view class="label">{{$t('stockMg.fillOrderList.realTotalWeight')}}：</view>
								<view class="desc">{{item.realTotalWeight}}kg</view>
							</view>
						</view>
						<view class="item">
							<view class="label">{{$t('stockMg.fillOrderList.profit')}}：</view>
							<view class="desc">{{ $bigDecimal.round($bigDecimal.subtract(item.planTotalWeight, item.realTotalWeight), 2) }}kg</view>
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
		fillingChangeLogFindList,
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
						labelText: this.$t('stockMg.fillOrderList.searchOptions.orgIdStr.label'),
						fieldName: 'orgIdStr',
						options: []
					},
					{
						labelText: this.$t('stockMg.fillOrderList.searchOptions.checkStateStr.label'),
						type: 'select',
						fieldName: 'checkStateStr',
						options: this.$t('stockMg.fillOrderList.searchOptions.checkStateStr.options')
					},
					{
						labelText: this.$t('stockMg.fillOrderList.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange',
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('stockMg.fillOrderList.searchOptions.createDateRange.placeholder')
					}
				],
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('stockMg.fillOrderList.stateTxt')
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
			this.searchOptions[0].options = this.orgList
		},
		async mounted() {

		},
		onLoad(options) {},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('stockMg.fillOrderList.titleText')
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
				} = await fillingChangeLogFindList(data)
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
		.flex-item{
			display: flex;
			margin-top:20rpx;
			.item{
				flex:1;
				width: 1px;
				margin-top: 0;
			}
		}
	}
</style>
