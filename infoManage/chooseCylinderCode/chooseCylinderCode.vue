<template>
  <view class="list-part">
		<view class="search-box">
			<search @search="search"></search>
		</view>
		<view v-if="empty">
			<view class="customerList">
				<view v-for="(item,index) in dataList" :key="index" class="chooseCommonBox" @click.stop="chooseBox(index)">
					<view class="center">
						<view class="flex">
							<text class="name">{{ item.qrKey }}</text>
						</view>
						<view class="flex">
							<text class="name">{{ item.prodState | prodState }}</text>
							<text class="name">{{ item.state | state }}</text>
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
import { assetCodeFindList } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			multiple: false,
			params: {},
			codeId: '' // 二维码id
    }
  },
		// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('chooseCylinderCode.state')
			return stateObj[value] || ''
		},
		prodState(value) {
			const stateObj = that.$t('chooseCylinderCode.prodState')
			return stateObj[value] || ''
		}
	},
	mixins: [paginationMixin],
	created(){
		that = this
	},
  onLoad(options) {
		this.multiple = options.multiple || false
		if(this.multiple){
			this.codeId = options.codeId.Split(',') || []
		} else {
			this.codeId = options.codeId || ''
		}
		
  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('chooseCylinderCode.titleText')
		})
	},
  methods: {
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
      const { returnValue: res, totals } = await assetCodeFindList(data)
      if (res) {
				let ids = []
				res.forEach(v=>{
					v.active = false
					if(this.codeId.indexOf(v.id) > -1) {
						v.active = true
					}
				})
        this.setMoreData(res)
				this.totals = totals
      }
			this.loadClose()
    },
		// 选择
		chooseBox(index) {
			if (this.multiple) {
				this.dataList[index].active = !this.dataList[index].active
			} else {
				this.dataList.forEach(v => {
					v.active = false
				})
				this.dataList[index].active = true
			}
		},
		// 确定
		chooseSave() {
			// 过滤选中的数据返回
			const data = this.dataList.filter(item=>item.active === true)
			if (this.multiple) {
				uni.$emit('chooseCylinderCode', data)
			} else {
				uni.$emit('chooseCylinderCode', data[0])
			}
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
