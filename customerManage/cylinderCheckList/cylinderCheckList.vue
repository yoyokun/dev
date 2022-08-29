<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('cylinderCheckList.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_cylinderCheckList_add'}" @click="addData"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="editData(item.id,true)">
					<view class="head">
						<text>{{item.billNo}}</text>
						<text class="status" v-if="item.checkState==3">{{$t('cylinderCheckList.checkStateTxt')[0]}}</text>
						<text class="status green" v-if="item.checkState==1">{{$t('cylinderCheckList.checkStateTxt')[1]}}</text>
						<text class="status warning" v-if="item.checkState==2">{{$t('cylinderCheckList.checkStateTxt')[2]}}</text>
						<text class="status gray" v-if="item.checkState==5">{{$t('cylinderCheckList.checkStateTxt')[3]}}</text>
						<text class="status red" v-if="item.checkState==4">{{$t('cylinderCheckList.checkStateTxt')[4]}}</text>
						<text class="status gray" v-if="item.checkState==6">{{$t('cylinderCheckList.checkStateTxt')[5]}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.checkNum')}}：</view>
							<view class="desc">{{item.checkNum}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.systemNum')}}：</view>
							<view class="desc">{{item.systemNum}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.creator')}}：</view>
							<view class="desc">{{item.creator}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.billTime')}}：</view>
							<view class="desc">{{item.billTime | dayjs}}</view>
						</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</block>
		<view v-else class="gp-box">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>

	</view>
</template>

<script>
	import {
		userCylinderCheckFindList,
	} from '@/api/lpgManageAppApi'
	import paginationMixin from '@/common/paginationMixin.js'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	export default {
		mixins: [paginationMixin, settingMixin],
		props: {
			
		},
		data() {
			return {
				totals:0,
				showModal: false,
				modalParams:{},
				searchOptions: [{
						labelText: this.$t('cylinderCheckList.searchOptions.typeId.label'),
						type: 'select',
						fieldName: 'typeId',
						options: []
					},
					{
						labelText: this.$t('cylinderCheckList.searchOptions.regionId.label'),
						type: 'select',
						fieldName: 'regionId',
						options: []
					},
					{
						type: 'select',
						labelText: this.$t('cylinderCheckList.searchOptions.propertyIds.label'),
						fieldName: 'propertyIds',
						options: [],
					},
					{
						labelText: this.$t('cylinderCheckList.searchOptions.state.label'),
						type: 'select',
						fieldName: 'state',
						options: this.$t('cylinderCheckList.searchOptions.state.options')
					}
				]
			}
		},
		// 过滤器
		filters: {},
		computed: {
			onePageRow() {
				return 5
			}
		},
		async created() {
			// 获取客户类型
			await this.getCustomerType()
			this.searchOptions[0].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.searchOptions[1].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.searchOptions[2].options = this.arrayMergingCommon(this.customertProperty)
		},
		async mounted() {

		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('cylinderCheckList.titleText')
			})
		},
		methods: {
			addData(){
				uni.navigateTo({
					url:'/customerManage/addCylinderCheck/addCylinderCheck'
				})
			},
			editData(id,show = false){
				this.$navigateTo('/customerManage/addCylinderCheck/addCylinderCheck',{
					editId: id,
					show: show,
				})
			},
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
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await userCylinderCheckFindList(data)
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
				// line-height: 98rpx;
				display: flex;
				align-items: center;
				color: white;
				font-size: 30rpx;
				border-radius: 20rpx 20rpx 0 0;
				padding: 0 28rpx;
				margin-bottom: -20rpx;
				background: linear-gradient(218.16deg, rgba(104, 169, 242, 1) 0%, rgba(41, 128, 227, 1) 100%);
				justify-content: space-between;

				text {
					margin-top: -20rpx;

					&.button {
						width: 160rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: white;
						border-radius: 60rpx;
						color: #2A82E4;
						text-align: center;
						font-weight: bold;
					}
				}
			}

			.gp-main {
				background: white;
				border-radius: 20rpx;
				box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
				margin-bottom: 30rpx;
				font-size: 30rpx;

				.head {
					padding: 0 20rpx;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;

					.status {
						color: #2A82E4;

						&.green {
							color: #43CF7C;
						}

						&.warning {
							color: #FF8D1A;
						}

						&.gray {
							color: #808080;
						}

						&.red {
							color: rgba(212, 48, 48, 1);
						}
					}
				}

				.main-box {
					padding: 34rpx 24rpx;

					.item {
						display: flex;
						font-size: 28rpx;
						line-height: 28rpx;
						align-items: center;
						color: rgba(112, 112, 112, 1);
						margin-top: 20rpx;

						&:first-child {
							margin-top: 0;
						}

						.label {
							min-width: 140rpx;
						}

						.desc {
							color: rgba(56, 56, 56, 1);
						}
					}
				}
			}
		}

	}
</style>
