<template>
  <view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('customerList.totalNum')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_customerList_add'}" @click="goto('/customerManage/addCustomer/addCustomer')"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click.stop="goto('/customerManage/customerInfo/customerInfo',{ editId: item.id })">
					<view class="center">
						<text class="state" v-if="item.state === 1">{{item.state | state}}</text>
						<text class="state bgred" v-else>{{item.state | state}}</text>
						<view class="flex">
							<text class="blod m-r20">{{item.customerNo}}</text>
							<text class="blod">{{item.customerName}}</text>
						</view>
						<view class="flex">
							<view class="m-r20 name" v-if="item.linkman"><image src="/static/image/name.png" class="icon" mode="widthFix"></image>{{item.linkman}}</view>
							<view class="name" v-if="item.linkTel"><image src="/static/image/phone.png" class="icon" mode="widthFix"></image>{{item.linkTel}}</view>
							<view class="money">{{$t('customerList.money')}}:<text class="red">{{item.money}}</text></view>
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
		<view v-else class="customerList">
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
			searchOptions: [
				{
					labelText: this.$t('customerList.search.typeId'),
					type: 'select',
					fieldName: 'typeId',
					options: []
				},
				{
					labelText: this.$t('customerList.search.regionId'),
					type: 'select',
					fieldName: 'regionId',
					options: []
				},
				{
					labelText: this.$t('customerList.search.propertyIds'),
					type: 'select',
					fieldName: 'propertyIds',
					options: [],
				},
				{
					labelText: this.$t('customerList.search.state'),
					type: 'select',
					fieldName: 'state',
					options: this.$t('addCustomer.form.stateOptions')
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
			const stateObj = that.$t('chooseCustomer.stateObj')
			return stateObj[value] || ''
		},
		classify(value) {
			const stateObj = that.$t('chooseCustomer.classifyObj')
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
			title: this.$t('customerList.titleText')
		})
	},
  methods: {
		async init() {
			// 获取客户类型
			await this.getCustomerType()
			this.searchOptions[1].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.searchOptions[2].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.searchOptions[3].options = this.customertProperty
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
	.box{
		border: none;
		.center{
			padding-left: 10rpx;
			border: none;
			border-radius: 16rpx;
			.flex{
				margin-top: 16rpx !important;
				.name{
					@include flexMixin(row,flex-start,center);
				}
				.money{
					flex: 1;
					text-align: right;
					padding-right: 20rpx;
					color: rgba(0, 0, 0, 1);
					font-size: 32rpx;
					.red{
						font-size: 36rpx;
						color: rgba(212, 48, 48, 1);
					}
				}
			}
			.state{
				right: 0rpx;
				border-top-left-radius: 0rpx !important;
				border-bottom-right-radius: 0rpx !important;
				border-top-right-radius: 16rpx;
				border-bottom-left-radius: 16rpx;
				font-size: 30rpx !important;
				padding: 6rpx 20rpx !important;
				&.bgred{
					background: rgba(212, 48, 48, 1);
				}
			}
		}
	}
}
</style>
