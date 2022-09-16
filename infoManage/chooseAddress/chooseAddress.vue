<template>
	<view class="list-part">
		<view class="search-box">
			<search @search="search"></search>
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" class="box">
					<text class="state" v-if="item.isDefault === 1">{{item.isDefault | isDefault}}</text>
					<view class="center">
						<view class="flex">
							<view class="name">{{item | addressSplicing}}</view>
						</view>
						<view class="flex">
							<view class="m-r20 name blod">{{item.linkman}}</view>
							<view class="name blod">{{item.phone}}</view>
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
			<view class="btnAdd" @click="chooseSave">{{$t('common.btn.confirm')}}</view>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		userAddressFindList
	} from '@/api/lpgManageAppApi.js'
	import paginationMixin from '@/common/paginationMixin.js'
	export default {
		data() {
			return {
				params: {},
				customerId: '', // 客户id
				addressId: '', // 选中的id
				multiple: false // 单选
			}
		},
		mixins: [paginationMixin],
		// 过滤器
		filters: {
			isDefault(value) {
				const stateObj = that.$t('customerInfo.isDefault')
				return stateObj[value] || ''
			}
		},
		created() {
			that = this
		},
		onLoad(options) {
			this.customerId = options.customerId || ''
			this.addressId = options.addressId || ''
			this.multiple = options.multiple || false
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('chooseAddress.titleText')
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
						customerId: this.customerId,
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await userAddressFindList(data)
				if (res) {
					let ids = []
					if(this.multiple){
						ids = ids.concat(this.addressId.split(','))
					}else{
						ids.push(this.addressId)
					}
					res.forEach(v => {
						if (ids.indexOf(v.id) > -1) {
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
				if(this.multiple){
					this.dataList[index].active = this.dataList[index].active == true ? false : true
				}else{
					this.dataList.forEach(v => {
						v.active = false
					})
					this.dataList[index].active = true
				}
				
			},
			// 确定
			chooseSave() {
				// 过滤选中的数据返回
				const data = this.dataList.filter(item => item.active === true)
				if(this.multiple){
					uni.$emit('chooseAddress', data)
				}else{
					uni.$emit('chooseAddress', data[0])
				}
				uni.navigateBack({
					delta: 1
				})
			}
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<style>
	page {
		background: #F7F7F7;
	}
</style>
<style lang="scss" scoped>
	.list-part {
		padding-bottom: 120rpx;
	}
	.customerList{
		padding: 140rpx 20rpx 0rpx 20rpx;
		.box{
			border: none;
			background: #fff;
			position: relative;
			.state{
				right: 0rpx;
				border-top-left-radius: 0rpx !important;
				border-bottom-right-radius: 0rpx !important;
				border-top-right-radius: 16rpx;
				border-bottom-left-radius: 16rpx;
				font-size: 20rpx !important;
				padding: 2rpx 15rpx !important;
				position: absolute;
				top:0rpx;
				color: rgba(42, 130, 228, 1) !important;
				background: rgba(181, 216, 255, 1) !important;
			}
			.center{
				padding-left: 10rpx;
				border: none;
				border-radius: 16rpx;
				.flex{
					margin-top: 16rpx !important;
					.name{
						@include flexMixin(row,flex-start,center);
					}
				}
				
			}
			.right{
				padding: 0rpx 30rpx;
				box-sizing: border-box;
			}
		}
	}
</style>
