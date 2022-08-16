<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.receivableInfo.basicTle')">
			<description :label="$t('auditInfo.receivableInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.receivableInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.receivableInfo.moneySourceType')">{{ info.moneySourceType | moneySourceType }}</description>
			<description :label="$t('auditInfo.receivableInfo.formType')">{{ info.formType | formType }}</description>
			<description :label="$t('auditInfo.receivableInfo.customerNo')">{{ info.customerNo }}</description>
			<description :label="$t('auditInfo.receivableInfo.totalMoney')">{{ info.totalMoney | toThousandFilter }}</description>
			<description :label="$t('auditInfo.receivableInfo.settleMoney')">{{ info.settleMoney | toThousandFilter }}</description>
			<description :label="$t('auditInfo.receivableInfo.errearMoney')">{{ info.errearMoney | toThousandFilter }}</description>
			<description :label="$t('auditInfo.receivableInfo.state')">{{ info.state | state }}</description>
			<description :label="$t('auditInfo.receivableInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.receivableInfo.linkBillNo')">{{ info.linkBillNo }}</description>
			<description :label="$t('auditInfo.receivableInfo.linkType')">{{ info.linkType | linkType }}</description>
			<description :label="$t('auditInfo.receivableInfo.orderTime')">{{ info.orderTime | dayjs }}</description>
			<description :label="$t('auditInfo.receivableInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.receivableInfo.operationTime')">{{ info.operationTime }}</description>
			<description :label="$t('auditInfo.receivableInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		financeMoneyLogFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'ReceivableInfo',
		components: {},
		// 过滤器
		filters: {
			formType(value) {
				const stateObj = that.$t('auditInfo.receivableInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			linkType(value) {
				const stateObj = that.$t('auditInfo.receivableInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			moneySourceType(value) {
				const stateObj = that.$t('auditInfo.receivableInfo.moneySourceTypeTxt')
				return stateObj[value] || ''
			},
			state(value) {
				const stateObj = that.$t('auditInfo.receivableInfo.stateTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.receivableInfo.checkStateTxt')
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
				} = await financeMoneyLogFindById({
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
