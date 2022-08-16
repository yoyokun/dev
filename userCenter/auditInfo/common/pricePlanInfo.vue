<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.pricePlanInfo.basicTle')">
			<description :label="$t('auditInfo.pricePlanInfo.planNo')">{{ info.planNo }}</description>
			<description :label="$t('auditInfo.pricePlanInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.pricePlanInfo.planName')">{{ info.planName }}</description>
			<description :label="$t('auditInfo.pricePlanInfo.planType')">{{info.planType === 1 ? $t('auditInfo.pricePlanInfo.planTypeTxt')[0] : $t('auditInfo.pricePlanInfo.planTypeTxt')[1]}}</description>
			<description :label="$t('auditInfo.pricePlanInfo.planTime')">{{info.planTime?UnixToDate(info.planTime):''}}</description>
			<description :label="$t('auditInfo.pricePlanInfo.execTime')">{{info.execTime?UnixToDate(info.execTime):''}}</description>
			<description :label="$t('auditInfo.pricePlanInfo.creator')">{{ info.creator }}</description>
			<description :label="$t('auditInfo.pricePlanInfo.createTime')">{{ info.createTime | dayjs }}</description>
			<description :label="$t('auditInfo.pricePlanInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
		</description-list>
		<description-list>
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
		</description-list>
	</view>
</template>
<script>
	import {
		pricePlanFindById,
		pricePlanDetailFindList
	} from '@/api/lpgManageAppApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		name: 'ShopInfo',
		components: {},
		// 过滤器
		filters: {},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				UnixToDate: UnixToDate,
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.propertyNames')
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.listPrice')
					},
					{
						prop: 'nowPrice',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.nowPrice')
					}
				],
				tableData: [],
				info: {}
			}
		},
		async created() {},
		mounted() {
			this.$nextTick(async () => {
				if (this.editId) {
					// 编辑
					await this.getInfo(this.editId)
					// 查询商品
					await this.getPricePlanDetailFindList(this.editId)
				}
			})
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await pricePlanFindById({
					id
				})
				if (res) {
					this.info = res
				}
			},
			// 获取调价商品
			async getPricePlanDetailFindList(id) {
				const {
					returnValue: res
				} = await pricePlanDetailFindList({
					planId: id
				})
				// 计算合并的行
				// this.getSpanArrTable(res)
				this.tableData = res
			},
			// 合并行
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 4 ||
					columnIndex === 3 || columnIndex === 2 || columnIndex === 1 || columnIndex === 0) {
					const _row = this.spanArr[rowIndex]
					const _col = _row > 0 ? 1 : 0
					return {
						rowspan: _row,
						colspan: _col
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
