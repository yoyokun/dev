<template>
  <view class="list-part">
		<view class="search-box">
			<u-search
				:height="35"
				:placeholder="$t('common.searchPlaceholder')" 
				v-model="keyword" 
				:actionText="$t('common.searchText')" 
				@search="getInit"
				@custom="getInit"
				@clear="getInit"
			></u-search>
			<view class="total">
				<view class="num">{{$t('cylinderArchivesList.totalNum')}}：<text class="blue">{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_cylinderArchivesList_add'}" @click="goto('/infoManage/addCylinderArchives/addCylinderArchives')"><u-icon name="plus-circle" color="#2A82E4" size="20"></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="workList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/infoManage/addCylinderArchives/addCylinderArchives',{ editId: item.id })">
					<view class="top">
						<view class="number">{{item.modelName}}</view>
						<view v-if="item.state === 3" class="state red">{{item.state | state}}</view>
						<view v-else-if="item.state === 1" class="state blue">{{item.state | state}}</view>
						<view v-else class="state ">{{item.state | state}}</view>
					</view>
					<view class="content">
						<view class="detail"><text class="name">{{$t('cylinderArchivesList.billNo')}}</text><text class="value">{{item.billNo}}</text></view>
						<view class="detail"><text class="name">{{$t('cylinderArchivesList.cylinderNo')}}</text><text class="value">{{item.cylinderNo}}</text></view>
						<view class="detail"><text class="name">{{$t('cylinderArchivesList.codeKey')}}</text><text class="value">{{item.codeKey}}</text></view>
						<view class="detail"><text class="name">{{$t('cylinderArchivesList.fillingStateStr')}}</text><text class="value">{{item.fillingStateStr}}</text></view>
						<view class="detail"><text class="name">{{$t('cylinderArchivesList.operationTime')}}</text><text class="value">{{item.operationTime | dayjs}}</text></view>
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
import { cylinderArchivesFindList } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			keyword: '',
			totals: 0
    }
  },
	mixins: [paginationMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('cylinderArchivesList.stateObj')
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
			title: this.$t('cylinderArchivesList.titleText')
		})
	},
  methods: {
    // 获取列表
    async findDataList() {
      const data = {
				keyword: this.keyword,
        page: this.pagination.getCurrentPage(),
        size: this.pagination.getCurrentSize()
      }
      const { returnValue: res, totals } = await cylinderArchivesFindList(data)
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
