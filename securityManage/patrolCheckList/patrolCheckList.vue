<template>
  <view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('security.patrolCheckList.totalNum')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_patrolCheckList_add'}" @click="goto('/securityManage/addPatrolCheck/addPatrolCheck')"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="workList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/securityManage/addPatrolCheck/addPatrolCheck',{ editId: item.id })">
					<view class="top">
						<view class="number">{{item.billNo}}</view>
						<view v-if="item.state === 1" class="state green">{{item.state | state}}</view>
						<view v-else-if="item.state === 3 || item.state === 4" class="state red">{{item.state | state}}</view>
						<view v-else class="state blue">{{item.state | state}}</view>
					</view>
					<view class="content">
						<view class="detail"><text class="name">{{$t('security.patrolCheckList.unitName')}}</text><text class="value">{{item.unitName}}</text></view>
						<view class="detail"><text class="name">{{$t('security.patrolCheckList.levelName')}}</text><text class="value">{{item.levelName}}</text></view>
						<view class="detail"><text class="name">{{$t('security.patrolCheckList.managerName')}}</text><text class="value">{{item.managerName}}</text></view>
						<view class="detail"><text class="name">{{$t('security.patrolCheckList.checkTime')}}</text><text class="value">{{item.checkTime | dayjs}}</text></view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="workList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
    <loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
let that = null
import { riskPollingFindList } from '@/api/lpgSecurityManageApi.js'
import paginationMixin from '@/common/paginationMixin.js'
import { settingMixin } from '@/common/settingMixin.js'
export default {
  data() {
    return {
			searchOptions: [
				{
					labelText: this.$t('security.patrolCheckList.search.unitId'),
					type: 'select',
					fieldName: 'unitId',
					options: []
				},
				{
					labelText: this.$t('security.patrolCheckList.search.state'),
					type: 'select',
					fieldName: 'state',
					options: this.$t('security.patrolCheckList.search.stateOptions')
				}
			],
			params: {},
			totals: 0
    }
  },
	mixins: [paginationMixin,settingMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.patrolCheckList.stateObj')
			return stateObj[value] || ''
		}
	},
	async created(){
		that = this
		await this.init()
	},
  onLoad() {

  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('security.patrolCheckList.titleText')
		})
	},
  methods: {
		async init() {
			// 获取风险单元
			await this.getRiskUnitList()
			this.searchOptions[0].options = this.riskUnitList
		},
		// 搜索
		search(e) {
			this.params = { ...e }
			this.getInit()
		},
    // 获取列表
    async findDataList() {
      const data = {
				...(this.params||{}),
				...{
					page: this.pagination.getCurrentPage(),
					size: this.pagination.getCurrentSize()
				}
      }
      const { returnValue: res, totals } = await riskPollingFindList(data)
      if (res) {
        this.setMoreData(res)
				this.totals = totals
      }
			this.loadClose()
    }
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>
<style>
page{
	background: #F7F7F7;
}
</style>
<style lang="scss" scoped>
.workList{
	padding: 250rpx 20rpx 0rpx 20rpx;
}
</style>
