<template>
  <view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('security.rectificationList.totalNum')}}：<text>{{totals}}</text></view>
			</view>
		</view>
		<view v-if="empty">
			<view class="workList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/securityManage/rectificationInfo/rectificationInfo',{ editId: item.id })">
					<view class="top">
						<view class="number">{{item.billNo}}</view>
						<view v-if="item.state === 1" class="state green">{{item.state | state}}</view>
						<view v-else-if="item.state === 3 || item.state === 4 || item.state === 5" class="state red">{{item.state | state}}</view>
						<view v-else class="state blue">{{item.state | state}}</view>
					</view>
					<view class="content">
						<view class="detail"><text class="name">{{$t('security.rectificationList.customerName')}}</text><text class="value">{{item.customerName}}</text></view>
						<view class="detail"><text class="name">{{$t('security.rectificationList.managerName')}}</text><text class="value">{{item.managerName}}</text></view>
						<view class="detail"><text class="name">{{$t('security.rectificationList.rectifyTime')}}</text><text class="value">{{item.rectifyTime | dayjs}}</text></view>
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
import { safeRectifyMyList } from '@/api/lpgSecurityManageApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			searchOptions: [
				{
					labelText: this.$t('security.rectificationList.search.classify'),
					type: 'select',
					fieldName: 'classify',
					options: this.$t('security.rectificationList.search.classifyOptions')
				},
				{
					labelText: this.$t('security.rectificationList.search.state'),
					type: 'select',
					fieldName: 'state',
					options: this.$t('security.rectificationList.search.stateOptions')
				}
			],
			params: {},
			totals: 0
    }
  },
	mixins: [paginationMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.rectificationList.stateObj')
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
			title: this.$t('security.userRectificationList.titleText')
		})
	},
  methods: {
		// 搜索
		search(e) {
			this.params = { ...e }
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
      const { returnValue: res, totals } = await safeRectifyMyList(data)
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
	padding: 230rpx 20rpx 0rpx 20rpx;
}
</style>
