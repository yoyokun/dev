<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('cylinderList.totalTxt')}}：<text>{{totals}}</text></view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<!-- <view class="gp-top">{{$t('cylinderList.totalTxt')}}：{{totals}}</view> -->
				<view class="gp-main">
					<view class="list" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
						<text>{{item.customerNo}}</text>
						<text>{{item.customerName}}</text>
						<text>{{item.cylinderNum}}个</text>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</block>
		<view v-else class="goodsList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
	  findCustomerCylinderList,
	} from '@/api/lpgManageAppApi'
	import paginationMixin from '@/common/paginationMixin.js'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	export default {
		mixins: [paginationMixin,settingMixin],
		props: {
			
		},
		data() {
			return {
				totals: 0,
				searchOptions: [{
						type: 'select',
						labelText: this.$t('cylinderList.searchOptions.state.label'),
						fieldName: 'state',
						options: this.$t('cylinderList.searchOptions.state.options'),
					},
					{
						labelText: this.$t('cylinderList.searchOptions.typeId.label'),
						type: 'select',
						fieldName: 'typeId',
						options: []
					},
					{
						labelText: this.$t('cylinderList.searchOptions.regionId.label'),
						type: 'select',
						fieldName: 'regionId',
						options: []
					},
					{
						type: 'select',
						labelText: this.$t('cylinderList.searchOptions.propertyIds.label'),
						fieldName: 'propertyIds',
						options: [],
					}
				]
			}
		},
		// 过滤器
		filters: {},
		async created() {
			// 获取客户类型
			await this.getCustomerType()
			this.searchOptions[1].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.searchOptions[2].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.searchOptions[3].options = this.arrayMergingCommon(this.customertProperty)
		},
		async mounted() {
			
		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('cylinderList.titleText')
			})
		},
		methods: {
			search(e) {
				this.params = {
					...e
				}
				this.getInit()
			},
			toDetail(item){
				this.$navigateTo('/customerManage/cylinderInfo/cylinderInfo',{
					editId: item.id,
					cylinderNum:item.cylinderNum
				})
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
				const {
					returnValue: res,
					totals
				} = await findCustomerCylinderList(data)
				this.setMoreData(res)
				this.totals = totals
				this.loadClose()
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F7F7F7;
	}

	.list-part {
		padding-bottom: 120rpx;

		// .search-box {
		// 	display: flex;
		// 	align-items: center;
		// 	padding: 0;
		// 	background: #F7F7F7;

		// 	::v-deep .u-search__content {
		// 		background-color: white !important;
		// 	}

		// 	::v-deep .u-search__action {
		// 		display: none;
		// 	}
		// }

		.gp-box {
			// padding: 0 30rpx;
			padding: 240rpx 20rpx 0rpx 20rpx;

			.gp-top {
				height: 110rpx;
				line-height: 98rpx;
				color: white;
				font-size: 30rpx;
				border-radius: 20rpx 20rpx 0 0;
				padding: 0 28rpx;
				background: linear-gradient(218.16deg, rgba(104, 169, 242, 1) 0%, rgba(41, 128, 227, 1) 100%);
			}

			.gp-main {
				background: white;
				border-radius: 20rpx;
				margin-top: -20rpx;

				.list {
					height: 100rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #eee;

					&:last-child {
						border-bottom: none;
					}

					text {
						flex: 1;
						text-align: center;
						word-break: break-all;
						font-size: 30rpx;
						color: #383838;
						padding: 0 10rpx;
					}
				}
			}
		}
	}
</style>
