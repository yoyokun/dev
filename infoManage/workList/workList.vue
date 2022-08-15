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
				<view class="num">{{$t('workList.totalNum')}}：<text class="blue">{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_workList_add'}" @click="goto('/infoManage/addWork/addWork')"><u-icon name="plus-circle" color="#2A82E4" size="20"></u-icon>{{$t('workList.addWork')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="workList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/infoManage/addWork/addWork',{ editId: item.id })">
					<view class="top">
						<view class="number">{{item.workNo}}</view>
						<view class="state">{{item.state | state}}</view>
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
import { auditWorkFindList } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			that: this,
			keyword: '',
			totals: 0
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
			title: this.$t('workList.titleText')
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
      const { returnValue: res, totals } = await auditWorkFindList(data)
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
	.box{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		padding: 10rpx 10rpx;
		&:last-child{
			margin-bottom: 0rpx;
		}
		.top{
			border-bottom: 1rpx solid rgba(229, 229, 229, 1);   
			@include flexMixin();
			line-height: 70rpx;
			padding: 0rpx 10rpx;
			.number{
				font-size: 32rpx;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
			}
			.state{
				color: rgba(56, 56, 56, 1);
				font-size: 28rpx;
				font-weight: 400;
			}
		}
		.content{
			padding: 10rpx 10rpx;
			line-height: 50rpx;
			.detail{
				font-size: 32rpx;
				font-weight: 400;
				.name{
					color: rgba(112, 112, 112, 1);
					&::after {
					  display: inline-block;
					  content: '：';
					}
				}
				.value{
					color: rgba(56, 56, 56, 1);
				}
			}
		}
	}
}
</style>
