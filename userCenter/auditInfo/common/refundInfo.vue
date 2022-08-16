<template>
	<view>
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
					@change="changeTabs"></u-tabs>
			</view>
		</view>

		<view class="basic" v-show="current == 0">
			<description-list :title="$t('auditInfo.refundInfo.basicTle')">
				<description :label="$t('auditInfo.refundInfo.orgName')">{{ info.orgName }}</description>
				<description :label="$t('auditInfo.refundInfo.billNo')">{{ info.billNo }}</description>
				<description :label="$t('auditInfo.refundInfo.formType')">{{ info.formType | formType }}</description>
				<description :label="$t('auditInfo.refundInfo.customerNo')">{{ info.customerNo }}</description>
				<description :label="$t('auditInfo.refundInfo.customerName')">{{ info.customerName }}</description>
				<description :label="$t('auditInfo.refundInfo.customerPhone')">{{ info.customerPhone }}</description>
				<description :label="$t('auditInfo.refundInfo.checkState')">{{ info.checkState | checkState }}</description>
				<description :label="$t('auditInfo.refundInfo.creator')">{{ info.creator }}</description>
				<description :label="$t('auditInfo.refundInfo.createTime')">{{ info.createTime | dayjs }}</description>
				<description :label="$t('auditInfo.refundInfo.totalMoney')">{{ info.totalMoney }}</description>
				<description :label="$t('auditInfo.refundInfo.refundTime')">{{info.refundTime ? UnixToDate(info.refundTime) : ''}}</description>
				<description :label="$t('auditInfo.refundInfo.linkBillNo')">{{ info.linkBillNo }}</description>
				<description :label="$t('auditInfo.refundInfo.linkType')">{{ info.linkType | linkType }}</description>
				<description :label="$t('auditInfo.refundInfo.operator')">{{ info.operator }}</description>
				<description :label="$t('auditInfo.refundInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
			</description-list>
			<description-list :title="$t('auditInfo.refundInfo.orderTle')">
				<us-table :table-column="tableColumn" :table-data="tableData">
					<!-- #ifdef H5 || APP-PLUS -->
					<view slot="orderState" slot-scope="row">
						{{ row.data.orderState | orderState }}
					</view>
					<view slot="payType" slot-scope="row">
						{{ row.data.payType | payType }}
					</view>
					<view slot="deliveryState" slot-scope="row">
						{{ row.data.deliveryState | deliveryState }}
					</view>
					<view slot="orderTime" slot-scope="row">
						{{ row.data.orderTime ? UnixToDate(row.data.orderTime) : '' }}
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-->
					<view slot="orderState" slot-scope="{row}">
						{{ row.data.orderState | orderState }}
					</view>
					<view slot="payType" slot-scope="{row}">
						{{ row.data.payType | payType }}
					</view>
					<view slot="deliveryState" slot-scope="{row}">
						{{ row.data.deliveryState | deliveryState }}
					</view>
					<view slot="orderTime" slot-scope="{row}">
						{{ row.data.orderTime ? UnixToDate(data.scope.orderTime) : '' }}
					</view>
					<!-- #endif -->
				</us-table>
			</description-list>
			<description-list :title="$t('auditInfo.refundInfo.refundTle')">
				<us-table :table-column="tableColumnRefund" :table-data="tableDataRefund">
				</us-table>
			</description-list>
			<description-list v-if="salesOrderPayitemsList.length" :title="$t('auditInfo.refundInfo.moneyTle')">
				<description v-for="(item,index) in salesOrderPayitemsList" :key="item.id" :label="item.payItemsName">{{ item.payItemsMoney }}</description>
			</description-list>
		</view>
		<view class="basic source" v-show="current == 1">
			<description-list v-if="editId" :title="$t('auditInfo.refundInfo.sourceTle')">
				<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
			</description-list>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		salesOrderFindList,
		salesOrderRefundFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	import ServiceCylinderInfo from './serviceCylinderInfo'
	export default {
		name: 'RefundInfo',
		components: {ServiceCylinderInfo},
		// 过滤器
		filters: {
			linkType(value) {
				const stateObj = that.$t('auditInfo.refundInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.refundInfo.checkStateTxt')
				return stateObj[value] || ''
			},
			orderState(value) {
				const stateObj = that.$t('auditInfo.refundInfo.orderStateTxt')
				return stateObj[value] || ''
			},
			payType(value) {
				const stateObj = that.$t('auditInfo.refundInfo.payTypeTxt')
				return stateObj[value] || ''
			},
			deliveryState(value) {
				const stateObj = that.$t('auditInfo.refundInfo.deliveryStateTxt')
				return stateObj[value] || ''
			},
			formType(value) {
				const stateObj = that.$t('auditInfo.refundInfo.formTypeTxt')
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
				current:0,
				busMenu:this.$t('auditInfo.refundInfo.tabs'),
				UnixToDate: UnixToDate,
				info: {},
				salesOrderPayitemsList: [],
				tableColumn: [{
						prop: 'billNo',
						label: this.$t('auditInfo.refundInfo.tableColumn.billNo')
					},
					{
						prop: 'orderTime',
						label: this.$t('auditInfo.refundInfo.tableColumn.orderTime'),
						slot: 'orderTime'
					},
					{
						prop: 'totalWeight',
						label: this.$t('auditInfo.refundInfo.tableColumn.totalWeight')
					},
					{
						prop: 'totalMoney',
						label: this.$t('auditInfo.refundInfo.tableColumn.totalMoney')
					},
					{
						prop: 'orderState',
						label: this.$t('auditInfo.refundInfo.tableColumn.orderState'),
						slot: 'orderState'
					},
					{
						prop: 'deliveryState',
						label: this.$t('auditInfo.refundInfo.tableColumn.deliveryState'),
						slot: 'deliveryState'
					},
					{
						prop: 'payType',
						label: this.$t('auditInfo.refundInfo.tableColumn.payType'),
						slot: 'payType'
					},
					{
						prop: 'collectionTypeName',
						label: this.$t('auditInfo.refundInfo.tableColumn.collectionTypeName')
					},
					{
						prop: 'remarks',
						label: this.$t('auditInfo.refundInfo.tableColumn.remarks')
					}
				],
				tableData: [], // 订单数据
				tableColumnRefund: [{
						prop: 'goodsName',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.goodsName')
					},
					{
						prop: 'linkGoodsName',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.linkGoodsName')
					},
					{
						prop: 'linkPropertyNames',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.linkPropertyNames')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.unitsName')
					},
					{
						prop: 'unitPrice',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.unitPrice')
					},
					{
						prop: 'totalNum',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.totalNum')
					},
					{
						prop: 'totalMoney',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.totalMoney')
					},
					{
						prop: 'refundNum',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.refundNum')
					},
					{
						prop: 'refundMoney',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.refundMoney')
					},
					{
						prop: 'remarks',
						label: this.$t('auditInfo.refundInfo.tableColumnRefund.remarks')
					}
				],
				tableDataRefund: [] // 退款数据
			}
		},
		computed: {},
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
			// 切换tabs
			changeTabs(e) {
				this.current = e.index
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await salesOrderRefundFindById({
					id
				})
				if (res) {
					this.info = res
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
					this.tableDataRefund = res.salesOrderRefundDetailList
					await this.getSalesOrder(res.linkBillNo)
				}
			},
			// 查询订单信息
			async getSalesOrder(billNo) {
				const {
					returnValue: res
				} = await salesOrderFindList({
					keyword: billNo
				})
				if (res) {
					this.tableData = res
				}
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
