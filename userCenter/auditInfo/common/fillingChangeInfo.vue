<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.fillingChangeInfo.basicTle')">
			<description :label="$t('auditInfo.fillingChangeInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.inOutName')">{{ info.inOutName + (info.inOutType === 1 ? $t('auditInfo.fillingChangeInfo.inOutNameTxt')[0] : $t('auditInfo.fillingChangeInfo.inOutNameTxt')[1]) }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.systemTotalNum')">{{ info.systemTotalNum }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.realTotalNum')">{{ info.realTotalNum }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.systemTotalWeight')">{{ info.systemTotalWeight }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.realTotalWeight')">{{ info.realTotalWeight }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.planTotalWeight')">{{ $bigDecimal.round($bigDecimal.subtract(info.realTotalWeight, info.planTotalWeight), 2) }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.checkState')">{{ info.checkState | checkState }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.operator')">{{ info.operator }}</description>
			<description :label="$t('auditInfo.fillingChangeInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
		</description-list>
		<description-list :title="$t('auditInfo.fillingChangeInfo.tableTle')">
			<view class="p-20">
				<total :info-data="infoData"></total>
			</view>
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		fillingChangeLogFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'FillingChangeInfo',
		components: {
		},
		// 过滤器
		filters: {
			checkState(value) {
				const stateObj = that.$t('auditInfo.fillingChangeInfo.checkStateTxt')
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
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.propertyNames')
					},
					{
						prop: 'systemNum',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.systemNum')
					},
					{
						prop: 'realNum',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.realNum')
					},
					{
						prop: 'planWeight',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.planWeight')
					},
					{
						prop: 'realWeight',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.realWeight')
					},
					{
						prop: 'profit',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.profit')
					}
				],
				tableData: [],
				infoData: [{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillNums'),
						value: '0',
						type: 'number'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillWgtSet'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillWgt'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.BEAmount'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.BERate'),
						value: '0',
						type: 'number'
					}
				]
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
				} = await fillingChangeLogFindById({
					id
				})
				if (res) {
					this.info = res
					res.fillingChangeLogDetailList.forEach(v => {
						v.profit = this.$bigDecimal.round(this.$bigDecimal.subtract(v.realWeight, v
							.planWeight), 2)
					})
					this.tableData = res.fillingChangeLogDetailList
					this.infoData[0].value = res.systemTotalNum
					this.infoData[1].value = res.systemTotalWeight
					this.infoData[2].value = res.planTotalWeight
					this.calculate()
					this.getSummaries()
				}
			},
			// 计算
			calculate() {
				this.infoData[3].value = this.$bigDecimal.subtract(this.infoData[2].value, this.infoData[1].value) || 0
				if (this.infoData[1].value !== '0.00') {
					this.infoData[4].value = this.$bigDecimal.divide(this.$bigDecimal.subtract(this.infoData[2].value, this
						.infoData[1].value), this.infoData[1].value, 2) || 0
				}
			},
			// 合计
			getSummaries() {
				let countArr = {}
				this.tableData.forEach((val, key) => {
					this.tableColumn.forEach((item, index) => {
						if (index == 0) {
							countArr[item.prop] = this.$t('auditInfo.fillingChangeInfo.tableColumn.count')
						} else if (['systemNum', 'realNum', 'planWeight', 'realWeight', 'profit'].indexOf(
								item.prop) != -1) {
							countArr[item.prop] = (countArr[item.prop] ? countArr[item.prop] : 0) +
								parseInt(val[item.prop])
						}
					})
				})
				this.tableData.push(countArr)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.p-20{
		padding: 20rpx;
	}
</style>
