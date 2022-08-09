<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.accountPeriodInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.outAccountId')}}</view>
						<view class="desc">{{info.outAccountId}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.balanceMoney')}}</view>
						<view class="desc">{{info.balanceMoney | toThousandFilter}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.lastMoney')}}</view>
						<view class="desc">{{info.lastMoney | toThousandFilter}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.effectTime')}}</view>
						<view class="desc">{{info.effectTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.agentName')}}</view>
						<view class="desc">{{info.agentName }}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.creator')}}</view>
						<view class="desc">{{info.creator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.createTime')}}</view>
						<view class="desc">{{info.createTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.accountPeriodInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		financeAccountRecordFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'AccountPeriodInfo',
		components: {},
		// 过滤器
		filters: {
		},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				info: {}
			}
		},
		computed: {
		},
		mounted() {
			this.$nextTick(async () => {
				if (this.editId) {
					// 编辑
					await this.getInfo(this.editId)
				}
			})
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await financeAccountRecordFindById({
					id
				})
				if (res) {
					res.lastMoney = this.$bigDecimal.round(this.$bigDecimal.subtract(res.balanceMoney, res.money), 2)
					this.info = res
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
