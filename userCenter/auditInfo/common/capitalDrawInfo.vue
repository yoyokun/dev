<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.capitalDrawInfo.basicTle')">
			<description :label="$t('auditInfo.capitalDrawInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.outAccountName')[Math.ceil(info.moneyType/2)-1]">{{info.outAccountName}}</description>
			<description v-if="info.moneyType >= 3" :label="$t('auditInfo.capitalDrawInfo.inAccountName')">{{info.inAccountName}}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.moneyType')">{{info.moneyType | moneyType}}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.moneyTxt')[info.moneyType-1 - 1 >= 3 ? 2 : info.moneyType-1]">{{info.money | toThousandFilter}}</description>
			<description v-if="info.moneyType !== 1" :label="$t('auditInfo.capitalDrawInfo.poundage')">{{ info.poundage | toThousandFilter }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.effectTime')">{{info.effectTime | dayjs}}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.agentName')">{{ info.agentName }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.linkNo')">{{ info.linkNo }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.creator')">{{ info.creator }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.createTime')">{{ info.createTime | dayjs }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.billNumber')">{{ info.billNumber }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.remarks')">{{ info.remarks }}</description>
			<description :label="$t('auditInfo.capitalDrawInfo.credentials')">
				<image class="img" mode="aspectFill" v-for="item in info.credentials" :key="item.id" :src="item.url"></image>
			</description>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		financeAccountRecordFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'CapitalDrawInfo',
		components: {},
		// 过滤器
		filters: {
			moneyType(value) {
				const stateObj = that.$t('auditInfo.capitalDrawInfo.moneyTypeTxt')
				return stateObj[value] || ''
			}
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
		computed: {},
		created() {
			that = this
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
					res.credentials = res.credentials.length ? JSON.parse(res.credentials) : []
					this.info = res
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
