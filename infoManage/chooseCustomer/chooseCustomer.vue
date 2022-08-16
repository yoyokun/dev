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
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" :class="['box',item.active?'active': '']" @click.stop="goto('/infoManage/customerInfo/customerInfo',{ editId: item.id })">
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
					<view class="right" @click.stop="chooseBox(index)">
						<image class="icon" v-if="item.active" mode="widthFix" src="/static/image/check.png" />
						<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="customerList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<view class="bottom-part">
			<view class="btnAdd" @click="chooseSave">{{$t('chooseCustomer.save')}}</view>
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
			customerId: '', // 选中的id
			orgId: '' // 组织id
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
  onLoad(options) {
		this.customerId = options.customerId || ''
		this.orgId = options.orgId || ''
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('chooseCustomer.titleText')
		})
	},
  methods: {
    // 获取列表
    async findDataList() {
      const data = {
				keyword: this.keyword,
				state: 1,
				orgId: this.orgId,
        page: this.pagination.getCurrentPage(),
        size: this.pagination.getCurrentSize()
      }
      const { returnValue: res, totals } = await userCustomerFindList(data)
      if (res) {
				res.forEach(v=>{
					if(v.id === this.customerId){
						v.active = true
					} else {
						v.active = false
					}
				})
        this.setMoreData(res)
				this.totals = totals
      }
			this.loadClose()
    },
		// 选择
		chooseBox(index) {
			this.dataList.forEach(v=>{
				v.active = false
			})
			this.dataList[index].active = true
		},
		// 确定
		chooseSave() {
			// 过滤选中的数据返回
			const data = this.dataList.filter(item=>item.active === true)
			uni.$emit('chooseCustomer', data[0])
			uni.navigateBack({
				delta: 1
			})
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
.list-part{
	padding-bottom: 120rpx;
}
.customerList{
	padding: 150rpx 20rpx 0rpx 20rpx;
	.box{
		background: rgba(229, 229, 229, 0.45);
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(247, 247, 247, 1);
		margin-bottom: 30rpx;
		border-radius: 16rpx;
		border: 1rpx solid rgba(229, 229, 229, 1);  
		@include flexMixin();
		&:last-child{
			margin-bottom: 0rpx;
		}
		&.active{
			background: rgba(240, 247, 255, 0.45);
			border: 1rpx solid rgba(181, 216, 255, 1);   
			.center{
				border-right: 1rpx solid rgba(181, 216, 255, 1);  
			}
		}
		.center{
			flex: 1;
			font-size: 32rpx;
			font-weight: 500;
			color: rgba(56, 56, 56, 1);
			position: relative;
			background: #fff;
			padding-bottom: 20rpx;
			border-bottom-left-radius: 16rpx;
			border-right: 1rpx solid rgba(229, 229, 229, 1);  
			.blod{
				color: rgba(0, 0, 0, 1);
			}
			.flex{
				@include flexMixin(row,flex-start,flex-start);
				width: 100%;
				margin-top: 50rpx;
				padding-left: 10rpx;
				box-sizing: border-box;
				line-height: 50rpx;
				.left{
					flex: 1;
					@include flexMixin(column,flex-start,flex-start);
				}
			}
			.state{
				background: rgba(42, 130, 228, 1);
				position: absolute;
				font-size: 20rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				padding: 6rpx 15rpx;
				border-top-left-radius: 16rpx;
				border-bottom-right-radius: 16rpx;
			}
			.tags{
				@include flexMixin(row,flex-start);
				flex-wrap: wrap;
			}
		}
		.right{
			padding: 0rpx 12rpx;
		}
		.icon{
			width: 48rpx;
			height: 48rpx;
		}
	}
}
</style>
