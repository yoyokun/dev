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
				<view class="num">{{$t('customerList.totalNum')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_customerList_add'}" @click="goto('/customerManage/addCustomer/addCustomer')"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click.stop="goto('/customerManage/customerInfo/customerInfo',{ editId: item.id })">
					<view class="center">
						<text class="state">{{item.state | state}}</text>
						<view class="flex">
							<view class="left">
								<text class="blod">{{item.customerNo}}</text>
								<text class="blod">{{item.customerName}}</text>
							</view>
							<view class="left">
								<text>{{item.classify | classify}}</text>
								<text>{{item.typeName}}</text>
							</view>
						</view>
						<view v-if="item.propertyName" class="tags">
							<view v-for="(tag,indexTag) in item.propertyName.Split(',')" class="ptag m-l10 m-t10" :key="indexTag">{{tag}}</view>
						</view>
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
import { userCustomerFindList } from '@/api/lpgManageAppApi.js'
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
			const stateObj = that.$t('chooseCustomer.stateObj')
			return stateObj[value] || ''
		},
		classify(value) {
			const stateObj = that.$t('chooseCustomer.classifyObj')
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
			title: this.$t('customerList.titleText')
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
      const { returnValue: res, totals } = await userCustomerFindList(data)
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
.customerList{
	padding: 250rpx 20rpx 0rpx 20rpx;
}
</style>
