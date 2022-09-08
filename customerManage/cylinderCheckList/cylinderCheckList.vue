<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('cylinderCheckList.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_cylinderCheckList_add'}" @click="goto('/customerManage/addCylinderCheck/addCylinderCheck')"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="goto('/customerManage/addCylinderCheck/addCylinderCheck',{editId: item.id})">
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
	}
</style>
