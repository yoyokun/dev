<template>
	<view class="search">
		<view class="search-content">
			<u-search :showAction="false"></u-search>
			<u-button class="button" type="primary" icon="search"></u-button>
			<u-button class="button" type="info" plain icon="reload"></u-button>
		</view>

		<view class="filter">
			<view class="item" @click="openStatus">状态:未选择 ᕗ</view>
			<view class="item" @click="showCalendar">{{startDate&&endDate ? startDate + '~' + endDate:'日期范围'}} ᕗ</view>
		</view>
		<u-picker :closeOnClickOverlay="true" @close="close" keyName="label" :show="show" :columns="columns" @confirm="statusConfirm" @cancel="close"></u-picker>
		<uni-calendar ref="calendar" :clearDate="false" range :insert="false" @confirm="confirm" />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				startDate: null,
				endDate: null,
				show: false,
				columns: [
					[{
							label: '已发行',
							value: 1
						},
						{
							label: '已领取',
							value: 2
						},
						{
							label: '已使用',
							value: 3
						},
						{
							label: '已过期',
							value: 4
						}
					]
				]
			}
		},
		methods: {
			statusConfirm(e) {
				console.log(e)
				this.show = false
			},
			close(){
				this.show = false
			},
			openStatus() {
				this.show = true
			},
			showCalendar() {
				this.$refs.calendar.open()
			},
			confirm(e) {
				if (e.range.before && e.range.after) {
					this.startDate = e.range.before
					this.endDate = e.range.after
				} else {
					this.startDate = e.range.before
					this.endDate = e.range.before
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		padding: 20rpx;

		.search-content {
			display: flex;
			align-items: center;

			.button {
				width: 70rpx;
				height: 70rpx !important;
				margin-left: 20rpx;
			}
		}

		.filter {
			display: flex;
			margin-top: 20rpx;
			font-size: 26rpx;

			.item {
				flex: 1;
				text-align: center;
				height: 40rpx;
				line-height: 40rpx;
			}
		}
	}
</style>
