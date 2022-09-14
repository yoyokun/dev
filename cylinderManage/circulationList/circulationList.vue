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
					<view class="head" v-if="item.billNo">
						<text>{{item.billNo}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('cylinderMg.circulationList.holderName')}}：</view>
							<view class="desc">{{item.holderName}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderMg.circulationList.flowNodeStr')}}：</view>
							<view class="desc">{{item.flowNodeStr}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderMg.circulationList.operationTime')}}：</view>
							<view class="desc">{{item.operationTime | dayjs}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderMg.circulationList.operator')}}：</view>
							<view class="desc">{{item.operator}}</view>
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
		cylinderFlowFindFlowList,
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
				totals: 0,
				searchOptions: [{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.flowState.label'),
						fieldName: 'flowState',
						options: this.$t('cylinderMg.circulationList.searchOptions.flowState.options')
					},
					{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.flowNode.label'),
						fieldName: 'flowNode',
						options: this.$t('cylinderMg.circulationList.searchOptions.flowNode.options')
					},
					{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.fillingState.label'),
						fieldName: 'fillingState',
						options: this.$t('cylinderMg.circulationList.searchOptions.fillingState.options')
					},
					{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.holderType.label'),
						fieldName: 'holderType',
						options: this.$t('cylinderMg.circulationList.searchOptions.holderType.options')
					},
					{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.state.label'),
						fieldName: 'state',
						options: this.$t('cylinderMg.circulationList.searchOptions.state.options')
					},
					{
						type: 'select',
						labelText: this.$t('cylinderMg.circulationList.searchOptions.modelId.label'),
						fieldName: 'modelId',
						options: []
					},
					{
						labelText: this.$t('cylinderMg.circulationList.searchOptions.createDateRange.label'),
						type: 'daterange',
						fieldName: 'createDateRange',
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('cylinderMg.circulationList.searchOptions.createDateRange.placeholder')
					}
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
			// 钢瓶型号
			await this.getSysSpecificationFindList()
			this.searchOptions[5].options = this.sysSpecification
		},
		async mounted() {
			
		},
		onLoad(options) {},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('cylinderMg.circulationList.titleText')
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
				} = await cylinderFlowFindFlowList(data)
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
