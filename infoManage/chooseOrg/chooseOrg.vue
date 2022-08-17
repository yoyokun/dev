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
				<view v-for="(item,index) in dataList" :key="index" class="chooseCommonBox" @click.stop="chooseBox(index)">
					<view class="center">
						<view class="flex">
							<text class="name">{{ item.name }}</text>
						</view>
						<view class="flex">
							<view class="ptag m-r20">{{ item.orgModel | orgModel }}</view>
							<view class="tag m-r20">{{ item.orgType | orgType }}</view>
						</view>
					</view>
					<image class="icon" v-if="item.active" mode="widthFix" src="/static/image/check.png" />
					<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
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
import { sysOrgFindList } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			keyword: '',
			orgId: '' // 组织id
    }
  },
	mixins: [paginationMixin],
	// 过滤器
	filters: {
		orgModel(value) {
			const stateObj = that.$t('chooseOrg.orgModelObj')
			return stateObj[value] || ''
		},
		orgType(value) {
			const stateObj = that.$t('chooseOrg.orgTypeObj')
			return stateObj[value] || ''
		}
	},
	created(){
		that = this
	},
  onLoad(options) {
		this.orgId = options.orgId || ''
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('chooseOrg.titleText')
		})
	},
  methods: {
    // 获取列表
    async findDataList() {
      const data = {
				keyword: this.keyword,
				state: 1,
        page: this.pagination.getCurrentPage(),
        size: this.pagination.getCurrentSize()
      }
      const { returnValue: res, totals } = await sysOrgFindList(data)
      if (res) {
				res.forEach(v=>{
					if(v.id === this.orgId){
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
			uni.$emit('chooseOrg', data[0])
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
	padding: 120rpx 0rpx 0rpx 0rpx;
}
</style>
