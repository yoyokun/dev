<template>
	<view class="list-part">
		<view class="search-box">
			<search @search="search"></search>
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" :class="['box',item.active?'active': '']"
					@click.stop="goto('/customerManage/customerInfo/customerInfo',{ editId: item.id })">
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
							<view v-for="(tag,indexTag) in item.propertyName.split(',')" class="ptag m-l10 m-t10"
								:key="indexTag">{{tag}}</view>
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
		userCustomerFindList
	} from '@/api/lpgManageAppApi.js'
	import paginationMixin from '@/common/paginationMixin.js'
	export default {
		data() {
			return {
				params: {},
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
		created() {
			that = this
		},
		onLoad(options) {
			this.customerId = options.customerId || ''
			this.orgId = options.orgId || ''
			this.multiple = options.multiple || false
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('chooseCustomer.titleText')
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
						state: 1,
						orgId: this.orgId,
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await userCustomerFindList(data)
				if (res) {
					let ids = []
					if(this.multiple){
						ids = ids.concat(this.customerId.split(','))
					}else{
						ids.push(this.customerId)
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
					uni.$emit('chooseCustomer', data)
				}else{
					uni.$emit('chooseCustomer', data[0])
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
</style>
