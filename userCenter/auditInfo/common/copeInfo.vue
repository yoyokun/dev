<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.copeInfo.basicTle')">
			<description :label="$t('auditInfo.copeInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.copeInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.copeInfo.moneySourceType')">{{ info.moneySourceType | moneySourceType }}
			</description>
			<description :label="$t('auditInfo.copeInfo.formType')">{{ info.formType | formType }}</description>
			<description :label="$t('auditInfo.copeInfo.customerNo')">{{ info.customerNo }}</description>
			<description :label="$t('auditInfo.copeInfo.customerName')">{{ info.customerName }}</description>
			<description :label="$t('auditInfo.copeInfo.totalMoney')">{{ info.totalMoney | toThousandFilter }}
			</description>
			<description :label="$t('auditInfo.copeInfo.settleMoney')">{{ info.settleMoney | toThousandFilter }}
			</description>
			<description :label="$t('auditInfo.copeInfo.errearMoney')">{{ info.errearMoney | toThousandFilter }}
			</description>
			<description :label="$t('auditInfo.copeInfo.state')">{{ info.state | state }}</description>
			<description :label="$t('auditInfo.copeInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.copeInfo.linkBillNo')">{{ info.linkBillNo }}</description>
			<description :label="$t('auditInfo.copeInfo.linkType')">{{ info.linkType | linkType }}</description>
			<description :label="$t('auditInfo.copeInfo.orderTime')">{{ info.orderTime | dayjs }}</description>
			<description :label="$t('auditInfo.copeInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.copeInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
			<description :label="$t('auditInfo.copeInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		financeMoneyLogFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'CopeInfo',
		components: {},
		// 过滤器
		filters: {
			formType(value) {
				const stateObj = that.$t('auditInfo.copeInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			linkType(value) {
				const stateObj = that.$t('auditInfo.copeInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			moneySourceType(value) {
				const stateObj = that.$t('auditInfo.copeInfo.moneySourceTypeTxt')
				return stateObj[value] || ''
			},
			state(value) {
				const stateObj = that.$t('auditInfo.copeInfo.stateTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.copeInfo.checkStateTxt')
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
			// 返回
			goBack() {
				this.$emit('editClose')
			},
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
