<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('security.cylinderSecurityList.totolTxt')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_cylinderCheckList_add'}"
					@click="goto('/securityManage/addCylinderSecurity/addCylinderSecurity')">
					<u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}
				</view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="goto('/securityManage/addCylinderSecurity/addCylinderSecurity',{editId: item.id})">
					<view class="head">
						<text>{{$t('security.cylinderSecurityList.vehicleNum')}}：{{item.vehicleNum}}</text>
						<text class="status" v-if="item.state==1">{{$t('security.cylinderSecurityList.stateTxt.1')}}</text>
						<text class="status red" v-if="item.state==2">{{$t('security.cylinderSecurityList.stateTxt.2')}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('security.cylinderSecurityList.cylinderNum')}}：</view>
							<view class="desc">{{item.cylinderNum}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('security.cylinderSecurityList.receiveDate')}}：</view>
							<view class="desc">{{item.receiveDate | dayjs}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('security.cylinderSecurityList.creator')}}：</view>
							<view class="desc">{{item.creator}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('security.cylinderSecurityList.createTime')}}：</view>
							<view class="desc">{{item.createTime | dayjs}}</view>
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
		safeCylinderFindList,
	} from '@/api/lpgSecurityManageApi'
	import paginationMixin from '@/common/paginationMixin.js'
	export default {
		mixins: [paginationMixin],
		props: {

		},
		data() {
			return {
				totals: 0,
				searchOptions: [{
					labelText: this.$t('security.cylinderSecurityList.searchOptions.createDateRange.label'),
					type: 'daterange',
					fieldName: 'createDateRange',
					startName: 'startDate', // 开始日期字段
					endName: 'endDate', // 结束日期字段
					placeholder: this.$t('security.cylinderSecurityList.searchOptions.createDateRange.placeholder')
				}]
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

		},
		async mounted() {

		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('security.cylinderSecurityList.titleText')
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
				} = await safeCylinderFindList(data)
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
