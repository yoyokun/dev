<template>
  <view class="list-part">
		<view class="tab">
			<u-tabs 
				:scrollable="false" 
				:list="tabSwitch" 
				:current="current"
				@click="onTabSwitch"
				lineWidth="60"
				lineColor="#2A82E4"
				:activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}"
				itemStyle="height: 45px;padding: 0 4px;"
			></u-tabs>
			<view class="search-box">
				<search @search="search"></search>
				<view class="total">
					<view class="num">{{$t('userWorkList.totalNum')}}：<text>{{totals}}</text></view>
				</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="workList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/userCenter/userWorkInfo/userWorkInfo',{ editId: item.id })">
					<view class="top">
						<view class="number">{{item.workNo}}</view>
						<view v-if="item.state === 5 || item.state === 6  || item.state === 4" class="state red">{{item.state | state}}</view>
						<view v-else-if="item.state === 1 || item.state === 2  || item.state === 3" class="state blue">{{item.state | state}}</view>
						<view v-else class="state ">{{item.state | state}}</view>
					</view>
					<view class="content">
						<view class="detail"><text class="name">{{$t('workList.customerName')}}</text><text class="value">{{item.customerName}}</text></view>
						<view class="detail"><text class="name">{{$t('workList.channel')}}</text><text class="value">{{item.channel}}</text></view>
						<view class="detail"><text class="name">{{$t('workList.formName')}}</text><text class="value">{{item.formName}}</text></view>
						<view class="detail"><text class="name">{{$t('workList.levelName')}}</text><text class="value">{{item.levelName}}</text></view>
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
import { auditWorkMyWorks } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			params: {},
			totals: 0,
			tabSwitch: this.$t('userWorkList.tabSwitch'),
			tabSwitchId: '',
			current: 0
    }
  },
	mixins: [paginationMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('workList.stateObj')
			return stateObj[value] || ''
		}
	},
	created(){
		that = this
	},
  onLoad() {

  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('userWorkList.titleText')
		});
	},
  methods: {
		// 搜索
		search(e) {
			this.params = { ...e }
			this.getInit()
		},
		// 切换
		onTabSwitch(item) {
			this.current = item.index
		  this.tabSwitchId = item.id
		  this.getInit()
		},
    // 获取列表
    async findDataList() {
      const data = {
				...(this.params||{}),
				...{
					stateStr: this.tabSwitchId,
					page: this.pagination.getCurrentPage(),
					size: this.pagination.getCurrentSize()
				}
      }
			const { returnValue: res, totals } = await auditWorkMyWorks(data)
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
</style>
<style lang="scss" scoped>
.search-box{
	position: relative;
}
.workList{
	padding: 310rpx 20rpx 0rpx 20rpx;
}
</style>
