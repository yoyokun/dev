<template>
	<view>
		<search :search-options="searchOptions" @search="search"></search>
		<us-table :table-column="tableColumn" :table-data="tableData" :pagination="pagination" @currentChange="getList">
			<!-- #ifdef H5 || APP-PLUS -->
			<view slot="state" slot-scope="row">
				{{ row.data.state | state }}
			</view>
			<view slot="vaildEndTime" slot-scope="row">
				{{ row.data.vaildEndTime | dayjs }}
			</view>
			<view slot="receiveTime" slot-scope="row">
				{{ row.data.receiveTime | dayjs }}
			</view>
			<view slot="useTime" slot-scope="row">
				{{ row.data.useTime | dayjs }}
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-->
			<view slot="state" slot-scope="{row}">
				{{ row.data.state | state }}
			</view>
			<view slot="vaildEndTime" slot-scope="{row}">
				{{ row.data.vaildEndTime | dayjs }}
			</view>
			<view slot="receiveTime" slot-scope="{row}">
				{{ row.data.receiveTime | dayjs }}
			</view>
			<view slot="useTime" slot-scope="{row}">
				{{ row.data.useTime | dayjs }}
			</view>
			<!-- #endif -->
		</us-table>
	</view>
</template>
<script>
	let that = null
	import {
		couponDetailFindList
	} from '@/api/lpgSalesManageApi'

	export default {
		name: 'CouponDetailList',
		components: {
		},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('auditInfo.couponInfo.stateTxt')
				return stateObj[value] || ''
			}
		},
		data() {
			return {
				pagination: {
					page: 1,
					total: 0,
					size: 10,
				},
				searchOptions: [
					{
						type: 'select',
						labelText: this.$t('auditInfo.couponInfo.searchOptions.state.label'),
						fieldName: 'state',
						placeholder: this.$t('auditInfo.couponInfo.searchOptions.state.placeholder'),
						options: this.$t('auditInfo.couponInfo.searchOptions.state.options'),
					},
					{
						labelText: this.$t('auditInfo.couponInfo.searchOptions.createDateRange.label'),
						type: 'datetimerange',
						fieldName: 'createDateRange', // 固定
						startName: 'startDate', // 开始日期字段
						endName: 'endDate', // 结束日期字段
						placeholder: this.$t('auditInfo.couponInfo.searchOptions.createDateRange.placeholder')
					}
				],
				tableColumn: [{
						prop: 'couponNo',
						label: this.$t('auditInfo.couponInfo.tableColumnCoupon.couponNo')
					},
					{
						prop: 'vaildEndTime',
						label: this.$t('auditInfo.couponInfo.tableColumnCoupon.vaildEndTime'),
						slot: 'vaildEndTime'
					},
					{
						prop: 'state',
						label: this.$t('auditInfo.couponInfo.tableColumnCoupon.state'),
						slot: 'state'
					},
					// {
					// 	prop: 'receiveTime',
					// 	label: this.$t('auditInfo.couponInfo.tableColumnCoupon.receiveTime'),
					// 	slot: 'receiveTime'
					// },
					// {
					// 	prop: 'useTime',
					// 	label: this.$t('auditInfo.couponInfo.tableColumnCoupon.useTime'),
					// 	slot: 'useTime'
					// },
					// {
					// 	prop: 'customerName',
					// 	label: this.$t('auditInfo.couponInfo.tableColumnCoupon.customerName')
					// },
					// {
					// 	prop: 'linkType',
					// 	label: this.$t('auditInfo.couponInfo.tableColumnCoupon.linkType'),
					// 	slot: 'linkType'
					// }
				],
				tableData: [],
			}
		},
		computed: {

		},
		async created() {
			that = this
			const obj = {
				page: this.pagination.page,
				size: this.pagination.size
			}
			await this.getList(obj)
		},
		async mounted() {},
		methods: {
			search(obj){
				const params ={...obj,...{page:1,size:this.pagination.size}}
				this.getList(params)
			},
			// 获取Table列表
			async getList(obj) {
				const requestParameters = Object.assign({}, this.queryParam, obj || {}, {
					id: this.editId
				})
				const res = await couponDetailFindList(requestParameters)
				this.tableData = res.returnValue
				this.pagination.total = res.totals
			},
		}
	}
</script>
<style lang="scss" scoped>
</style>
