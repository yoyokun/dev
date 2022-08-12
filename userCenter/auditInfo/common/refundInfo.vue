<template>
	<view class="audit-info-content">
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
					@change="changeTabs"></u-tabs>
			</view>
		</view>

		<view class="basic" v-show="current == 0">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.refundInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.orgName')}}</view>
						<view class="desc">{{info.orgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.formType')}}</view>
						<view class="desc">{{info.formType | formType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.customerNo')}}</view>
						<view class="desc">{{info.customerNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.customerName')}}</view>
						<view class="desc">{{info.customerName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.customerPhone')}}</view>
						<view class="desc">{{info.customerPhone}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.checkState')}}</view>
						<view class="desc">{{info.checkState | checkState}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.creator')}}</view>
						<view class="desc">{{info.creator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.createTime')}}</view>
						<view class="desc">{{info.createTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.totalMoney')}}</view>
						<view class="desc">{{info.totalMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.refundTime')}}</view>
						<view class="desc">{{info.refundTime ? UnixToDate(info.refundTime) : ''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.linkBillNo')}}</view>
						<view class="desc">{{info.linkBillNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.linkType')}}</view>
						<view class="desc">{{info.linkType | linkType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.operator')}}</view>
						<view class="desc">{{info.operator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.refundInfo.operationTime')}}</view>
						<view class="desc">{{info.operationTime | dayjs}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.refundInfo.orderTle')}}</view>
				<view class="basic-box">
					<UTable :table-column="tableColumn" :table-data="tableData">
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
					</UTable>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.refundInfo.refundTle')}}</view>
				<view class="basic-box">
					<UTable :table-column="tableColumnRefund" :table-data="tableDataRefund">
					</UTable>
				</view>
			</view>
			<view class="basic-item" v-if="salesOrderPayitemsList.length">
				<view class="basic-tle">{{$t('auditInfo.refundInfo.moneyTle')}}</view>
				<view class="basic-box">
					<view class="item" v-for="(item,index) in salesOrderPayitemsList" :key="item.id">
						<view class="tle">{{item.payItemsName}}</view>
						<view class="desc">{{ item.payItemsMoney }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="basic source" v-show="current == 1">
			<view class="basic-item"  v-if="editId">
				<view class="basic-tle">{{$t('auditInfo.refundInfo.sourceTle')}}</view>
				<view class="basic-box">
					<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		salesOrderFindList,
		salesOrderRefundFindById
	} from '@/api/lpgManageAppApi'
	import {
		UnixToDate
	} from '@/utils/util'
	import UTable from './uTable'
	import ServiceCylinderInfo from './serviceCylinderInfo'
	export default {
		name: 'RefundInfo',
		components: {UTable,ServiceCylinderInfo},
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
