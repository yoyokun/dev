<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.purGoodRequisitionInfo.basicTle')">
			<description :label="$t('auditInfo.purGoodRequisitionInfo.applyTime')">{{ info.applyTime | dayjs }}</description>
			<description :label="$t('auditInfo.purGoodRequisitionInfo.purOrgName')">{{ info.purOrgName }}</description>
			<description :label="$t('auditInfo.purGoodRequisitionInfo.creator')">{{ info.creator }}</description>
			<description :label="$t('auditInfo.purGoodRequisitionInfo.remarks')">{{ info.remarks }}</description>
			<description :label="$t('auditInfo.purGoodRequisitionInfo.state')">{{ info.state | state }}</description>
			<description :label="$t('auditInfo.purGoodRequisitionInfo.attachment')">
				<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
					<text>{{ index+1 }}.{{ item.name }}</text>
					<text
						@click="downFile(item.url)">{{$t('auditInfo.purGoodRequisitionInfo.downloadTxt')}}</text>
				</view>
			</description>
		</description-list>
		<description-list :title="$t('auditInfo.purGoodRequisitionInfo.goodsTle')">
			<us-table :table-column="tableColumn" :table-data="tableData">
				<!-- #ifdef H5 || APP-PLUS -->
				<view slot="vehicleNote" slot-scope="row">
					<view v-for="(item,index) in row.data.vehicleNote" :key="item">{{ index+1 }}.{{ item }}</view>
				</view>
				<view slot="startingTime" slot-scope="row">
					{{ row.data.startingTime | dayjs }}
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-->
				<view slot="vehicleNote" slot-scope="{row}">
					<view v-for="(item,index) in row.data.vehicleNote" :key="item">{{ index+1 }}.{{ item }}</view>
				</view>
				<view slot="startingTime" slot-scope="{row}">
					{{ row.data.startingTime | dayjs }}
				</view>
				<!-- #endif -->
			</us-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		purApplyFindById
	} from '@/api/lpgSalesManageApi'
	export default {
		name: 'PurGoodRequisitionInfo',
		components: {},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('auditInfo.purGoodRequisitionInfo.stateTxt')
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
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.goodsName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.propertyNames')
					},
					{
						prop: 'curStock',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.curStock')
					},
					{
						prop: 'amount',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.amount')
					},
					{
						prop: 'vehicleNum',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.vehicleNum')
					},
					{
						prop: 'vehicleNote',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.vehicleNote'),
						slot: 'vehicleNote',
					},
					{
						prop: 'startingTime',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.startingTime'),
						slot: 'startingTime',
					},
					{
						prop: 'schedulingId',
						label: this.$t('auditInfo.purGoodRequisitionInfo.tableColumn.schedulingId')
					}
				],
				tableData: [] // 商品
			}
		},
		computed: {},
		async created() {
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
				} = await purApplyFindById({
					id
				})
				if (res) {
					res.attachment = res.attachment.length ? JSON.parse(res.attachment) : []
					this.info = res
					res.purApplyGoodss.forEach(v => {
						v.vehicleNote = JSON.parse(v.vehicleNote)
					})
					this.tableData = res.purApplyGoodss
				}
			},
			// 下载
			downFile(url) {
				// #ifdef APP-PLUS
				plus.runtime.openURL(url)
				// #endif
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifdef MP
				
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
