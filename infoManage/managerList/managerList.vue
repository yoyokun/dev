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
				<view class="num">{{$t('managerList.totalNum')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_managerList_add'}" @click="goto('/infoManage/addManager/addManager')"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="managerList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="goto('/infoManage/addManager/addManager',{ editId: item.id })">
					<image :src="item.headPhoto | pictureJson" mode="aspectFill" class="icon"></image>
					<view class="content">
						<view class="title">
							<view class="empNo">{{ item.empNo }}</view>
							<view class="empNo">{{ item.account }}</view>
						</view>
						<view class="desc">
							<view class="name"><image src="/static/image/name.png" mode="widthFix" class="img"></image>{{ item.name }}</view>
							<view class="name"><image src="/static/image/phone.png" mode="widthFix" class="img"></image>{{ item.phone }}</view>
						</view>
					</view>
					<view :class="['right', item.state === 2 ? 'red' : '']">
						{{item.state | state}}
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="managerList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
    <loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
let that = null
import { sysManagerFindList } from '@/api/loginApi.js'
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
			const stateObj = that.$t('common.stateObj')
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
			title: this.$t('managerList.titleText')
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
      const { returnValue: res, totals } = await sysManagerFindList(data)
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
.managerList{
	padding: 250rpx 20rpx 0rpx 20rpx;
	.box{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		@include flexMixin();
		padding: 24rpx 10rpx;
		&:last-child{
			margin-bottom: 0rpx;
		}
		.icon{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
			margin-right: 20rpx;
		}
		.content{
			flex: 1;
			.title{
				@include flexMixin(row,flex-start);
				width: 100%;
				margin-bottom: 20rpx;
				.empNo{
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
					margin-right: 50rpx;
					&:last-child{
						margin: 0rpx;
					}
				}
			}
			.desc{
				@include flexMixin(row,flex-start);
				width: 100%;
				.img{
					width: 32rpx;
					height: 32rpx;
					margin-right: 5rpx;
				}
				.name{
					@include flexMixin(row,flex-start);
					font-size: 32rpx;
					font-weight: 400;
					color: rgba(56, 56, 56, 1);
					margin-right: 30rpx;
					&:last-child{
						margin: 0rpx;
					}
				}
			}
		}
		.right{
			font-size: 32rpx;
			font-weight: 400;
			color: rgba(42, 130, 228, 1);
		}
	}
}
</style>
