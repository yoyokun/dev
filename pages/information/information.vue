<template>
	<view class="list-part">
		<view v-if="empty">
			<view class="schedule">
				<view v-for="(item,index) in dataList" :key="index" class="box" @click="toDetail(item)">
					<image v-if="item.type === 1" src="/static/image/system.png" mode="widthFix" class="icon"></image>
					<image v-if="item.type === 2" src="/static/image/message.png" mode="widthFix" class="icon"></image>
					<view class="content">
						<view class="title">
							<view class="name">{{ item.title }}</view>
							<view class="data">{{ item.releaseTime | dayjs }}</view>
						</view>
						<view class="desc">{{ item.source }}</view>
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
	import {
		sysMessageMyMessages
	} from '@/api/lpgManageAppApi.js'
	import paginationMixin from '@/common/paginationMixin.js'
	export default {
		data() {
			return {}
		},
		mixins: [paginationMixin],
		onLoad() {

		},
		methods: {
			// 获取列表
			async findDataList() {
				const data = {
					page: this.pagination.getCurrentPage(),
					size: this.pagination.getCurrentSize()
				}
				const {
					returnValue: res
				} = await sysMessageMyMessages(data)
				if (res) {
					this.setMoreData(res)
				}
				this.loadClose()
			},
			// 跳转详情
			toDetail(item) {
				if (item.type == 1) {
					this.$navigateTo('/userCenter/systemMessage/systemMessage', {
						editId: item.id
					})
				} else if (item.type == 2) {
					this.$navigateTo('/userCenter/notice/notice', {
						editId: item.id
					})
				}
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>
<style>
	page {
		background: #fff;
	}
</style>
<style lang="scss" scoped>

</style>
