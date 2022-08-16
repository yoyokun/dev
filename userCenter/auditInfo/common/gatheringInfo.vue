<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.gatheringInfo.basicTle')">
			<description :label="$t('auditInfo.gatheringInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.gatheringInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.gatheringInfo.payer')">{{ info.payer }}</description>
			<description :label="$t('auditInfo.gatheringInfo.shroffer')">{{ info.shroffer }}</description>
			<description :label="$t('auditInfo.gatheringInfo.transTypeName')">{{ info.transTypeName }}</description>
			<description :label="$t('auditInfo.gatheringInfo.formType')">{{ info.formType | formType }}</description>
			<description :label="$t('auditInfo.gatheringInfo.customerNo')">{{ info.customerNo }}</description>
			<description :label="$t('auditInfo.gatheringInfo.customerName')">{{ info.customerName }}</description>
			<description :label="$t('auditInfo.gatheringInfo.moneyTxt')">{{info.money | toThousandFilter}}</description>
			<description :label="$t('auditInfo.gatheringInfo.collectionTypeName')">{{ info.collectionTypeName }}</description>
			<description :label="$t('auditInfo.gatheringInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.gatheringInfo.moneySourceType')">{{ info.moneySourceType | moneySourceType }}</description>
			<description :label="$t('auditInfo.gatheringInfo.linkBillNo')">{{ info.linkBillNo }}</description>
			<description :label="$t('auditInfo.gatheringInfo.linkType')">{{ info.linkType | linkType }}</description>
			<description :label="$t('auditInfo.gatheringInfo.billTime')">{{ info.billTime | dayjs }}</description>
			<description :label="$t('auditInfo.gatheringInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.gatheringInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
			<description :label="$t('auditInfo.gatheringInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		financeMoneyBillLogFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'GatheringInfo',
		components: {},
		// 过滤器
		filters: {
			formType(value) {
				const stateObj = that.$t('auditInfo.gatheringInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			linkType(value) {
				const stateObj = that.$t('auditInfo.gatheringInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			moneySourceType(value) {
				const stateObj = that.$t('auditInfo.gatheringInfo.moneySourceTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.gatheringInfo.checkStateTxt')
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
		created() {
			that = this
		},
		mounted() {
			this.$nextTick(() => {
				if (this.editId) {
					// 编辑
					this.getInfo(this.editId)
				}
			})
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await financeMoneyBillLogFindById({
					id
				})
				if (res) {
					this.info = res
				}
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
