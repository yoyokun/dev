<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.stockTakingInfo.basicTle')">
			<description :label="$t('auditInfo.stockTakingInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.lockState')">{{ info.lockState }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.state')">{{ info.state | state }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.billTime')">{{ info.billTime | dayjs }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.stockTakingInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
		<description-list :title="$t('auditInfo.stockTakingInfo.tableTle')">
			<us-table :table-column="tableColumn" :table-data="stockCheckLogDetailsList"></us-table>
		</description-list>
	</view>
</template>
<script>
	import {
		stockCheckLogFindById
	} from '@/api/lpgSalesManageApi'
	let that = null
	export default {
		name: 'StockTakingInfo',
		components: {},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('auditInfo.stockTakingInfo.stateTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.stockTakingInfo.checkStateTxt')
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
				info: {},
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.propertyNames')
					},
					{
						prop: 'systemStockNum',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.systemStockNum')
					},
					{
						prop: 'checkStockNum',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.checkStockNum')
					},
					{
						prop: 'differences',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.differences')
					},
					{
						prop: 'inOutName',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.inOutName')
					},
					{
						prop: 'remarks',
						label: this.$t('auditInfo.stockTakingInfo.tableColumn.remarks')
					}
				],
				stockCheckLogDetailsList: []
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
				} = await stockCheckLogFindById({
					id
				})
				if (res) {
					this.info = res
					res.stockCheckLogDetailsList.forEach((v) => {
						v.differences = this.$bigDecimal.round(this.$bigDecimal.subtract(v.checkStockNum, v
							.systemStockNum), 2)
						v.inOutName = v.inOutName + (v.inOutType === 1 ? '入库' : '出库')
					})
					this.stockCheckLogDetailsList = res.stockCheckLogDetailsList
				}
			}
		}
	}
</script>
<style lang="scss" scoped></style>
