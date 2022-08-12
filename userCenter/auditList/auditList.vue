<template>
  <view class="list-part">
		<view class="tab">
			<u-tabs 
				:scrollable="false" 
				:list="tabSwitch" 
				:current="current"
				@click="onTabSwitch"
				lineWidth="60"
				lineColor="#2A82E4"
				:activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}"
				itemStyle="height: 45px;padding: 0 4px;"
			></u-tabs>
		</view>
		<view v-if="empty">
			<view class="schedule">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="getInfo(item)">
					<image src="/static/image/approval.png" mode="widthFix" class="icon"></image>
					<view class="content">
						<view class="title">
							<view class="name">{{ item.formName }}</view>
							<view class="data">{{ item.createTime | dayjs }}</view>
						</view>
						<view class="desc">{{ item.taskName }}</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</view>
		<view v-else class="schedule">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
    <loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { auditTaskWaitAuditTask, auditTaskHistoryTask, auditTaskCopyTask, auditTaskInitiateTask } from '@/api/lpgManageAppApi.js'
import paginationMixin from '@/common/paginationMixin.js'
export default {
  data() {
    return {
			tabSwitch: this.$t('auditList.tabSwitch'),
			tabSwitchId: 1,
			current: 0
    }
  },
	mixins: [paginationMixin],
  onLoad() {

  },
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('auditList.titleText')
		});
	},
  methods: {
		// 切换
		onTabSwitch(item) {
			this.current = item.index
		  this.tabSwitchId = item.id
		  this.getInit()
		},
    // 获取列表
    async findDataList() {
      const data = {
        page: this.pagination.getCurrentPage(),
        size: this.pagination.getCurrentSize()
      }
			if(this.tabSwitchId === 1) {
				// 要我审批
				const { returnValue: res } = await auditTaskWaitAuditTask(data)
				if (res) {
				  this.setMoreData(res)
				}
			} else if(this.tabSwitchId === 2) {
				//  我发起的
				const { returnValue: res } = await auditTaskInitiateTask(data)
				if (res) {
				  this.setMoreData(res)
				}
			} else if(this.tabSwitchId === 3) {
				//  抄送给我
				const { returnValue: res } = await auditTaskCopyTask(data)
				if (res) {
				  this.setMoreData(res)
				}
			} else if(this.tabSwitchId === 4) {
				// 审批历史
				const { returnValue: res } = await auditTaskHistoryTask(data)
				if (res) {
				  this.setMoreData(res)
				}
			}
			this.loadClose()
    },
		// 详情
		getInfo(item) {
			// 审批
			this.$navigateTo('/userCenter/auditInfo/auditInfo',{
				editId: item.id
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
	background: #fff;
}
</style>
<style lang="scss" scoped>
.schedule{
	padding-top: 90rpx;
}
</style>
