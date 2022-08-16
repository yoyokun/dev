<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.paymentInfo.basicTle')">
			<description :label="$t('auditInfo.paymentInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.paymentInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.paymentInfo.payer')">{{ info.payer }}</description>
			<description :label="$t('auditInfo.paymentInfo.shroffer')">{{ info.shroffer }}</description>
			<description :label="$t('auditInfo.paymentInfo.transTypeName')">{{ info.transTypeName }}</description>
			<description :label="$t('auditInfo.paymentInfo.formType')">{{ info.formType | formType }}</description>
			<description :label="$t('auditInfo.paymentInfo.customerNo')">{{ info.customerNo }}</description>
			<description :label="$t('auditInfo.paymentInfo.customerName')">{{ info.customerName }}</description>
			<description :label="$t('auditInfo.paymentInfo.moneyTxt')">{{info.money | toThousandFilter}}</description>
			<description :label="$t('auditInfo.paymentInfo.collectionTypeName')">{{ info.collectionTypeName }}</description>
			<description :label="$t('auditInfo.paymentInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.paymentInfo.moneySourceType')">{{ info.moneySourceType | moneySourceType }}</description>
			<description :label="$t('auditInfo.paymentInfo.linkBillNo')">{{ info.linkBillNo }}</description>
			<description :label="$t('auditInfo.paymentInfo.linkType')">{{ info.linkType | linkType }}</description>
			<description :label="$t('auditInfo.paymentInfo.billTime')">{{ info.billTime | dayjs }}</description>
			<description :label="$t('auditInfo.paymentInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.paymentInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
			<description :label="$t('auditInfo.paymentInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		financeMoneyBillLogFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'PaymentInfo',
		components: {},
		// 过滤器
		filters: {
			formType(value) {
				const stateObj = that.$t('auditInfo.paymentInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			linkType(value) {
				const stateObj = that.$t('auditInfo.paymentInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			moneySourceType(value) {
				const stateObj = that.$t('auditInfo.paymentInfo.moneySourceTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.paymentInfo.checkStateTxt')
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
