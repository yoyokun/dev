<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.purGoodPlanInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.planDate')}}</view>
						<view class="desc">{{info.planDate}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.creator')}}</view>
						<view class="desc">{{info.creator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.state')}}</view>
						<view class="desc">{{info.state | state}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.purGoodPlanInfo.attachment')}}</view>
						<view class="desc">
							<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
								<text>{{ index+1 }}.{{ item.name }}</text>
								<text @click="downFile(item.url)">{{$t('auditInfo.purGoodPlanInfo.downloadTxt')}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.purGoodPlanInfo.buyTle')}}</view>
				<view class="basic-box">
					<us-table :table-column="tableColumn" :table-data="planDetailsData">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="arrivalTime" slot-scope="row">
							{{ row.data.arrivalTime ? UnixToDate(row.data.arrivalTime) : '' }}
						</view>
						<view slot="takeType" slot-scope="row">
							{{ row.data.takeType | takeType }}
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="arrivalTime" slot-scope="{row}">
							{{ row.data.arrivalTime ? UnixToDate(row.data.arrivalTime) : '' }}
						</view>
						<view slot="takeType" slot-scope="{row}">
							{{ row.data.takeType | takeType }}
						</view>
						<!-- #endif -->
					</us-table>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.purGoodPlanInfo.feeTle')}}</view>
				<view class="basic-box">
					<us-table :table-column="planCostsDataColumn" :table-data="planCostsData">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="proportion" slot-scope="row">
							{{ row.data.proportion&&row.data.proportion+'%' }}
						</view>
						<view slot="payState" slot-scope="row">
							{{ row.data.payState | payState }}
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="proportion" slot-scope="{row}">
							{{ row.data.proportion&&row.data.proportion+'%' }}
						</view>
						<view slot="payState" slot-scope="{row}">
							{{ row.data.payState | payState }}
						</view>
						<!-- #endif -->
					</us-table>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		purPlanFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		name: 'PurGoodPlanInfo',
		components: {
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('auditInfo.purGoodPlanInfo.stateTxt')
				return stateObj[value] || ''
			},
			payState(value) {
				const stateObj = that.$t('auditInfo.purGoodPlanInfo.payStateTxt')
				return stateObj[value] || ''
			},
			takeType(value) {
				const stateObj = that.$t('auditInfo.purGoodPlanInfo.takeTypeTxt')
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
				UnixToDate: UnixToDate,
				info: {},
				goodsObj: {
					goodsName: '',
					goodsDetailId: '',
					goodsId: ''
				},
				endDate: '',
				tableColumn: [{
						prop: 'goodsName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.goodsName'),
						// slot: 'goodsName',
					},
					{
						prop: 'mainorgName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.goodsName')
					},
					{
						prop: 'orderOrgName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.orderOrgName')
					},
					{
						prop: 'supplierName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.supplierName')
					},
					{
						prop: 'supplyName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.supplyName')
					},
					{
						prop: 'takeType',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.takeType'),
						slot: 'takeType'
					},
					{
						prop: 'transportName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.transportName')
					},
					{
						prop: 'license',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.license')
					},
					{
						prop: 'vehicleNum',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.vehicleNum')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.unitsName')
					},
					{
						prop: 'amount',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.amount')
					},
					{
						prop: 'goodsPrice',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.goodsPrice')
					},
					{
						prop: 'otherPrice',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.otherPrice')
					},
					{
						prop: 'otherMoneyData',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.otherMoneyData')
					},
					{
						prop: 'goodsMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.goodsMoney'),
					},
					{
						prop: 'freightPrice',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.freightPrice')
					},
					{
						prop: 'freightMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.freightMoney')
					},
					{
						prop: 'totalMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.totalMoney')
					},
					{
						prop: 'priceSpread',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.priceSpread')
					},
					{
						prop: 'salesPrice',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.salesPrice')
					},
					{
						prop: 'salesMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.salesMoney')
					},
					{
						prop: 'vehicleDriverName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.vehicleDriverName')
					},
					{
						prop: 'escortName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.escortName')
					},
					{
						prop: 'arrivalTime',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.arrivalTime'),
						slot: 'arrivalTime'
					},
					{
						prop: 'takeManagerName',
						label: this.$t('auditInfo.purGoodPlanInfo.tableColumn.takeManagerName')
					}
				],
				planDetailsData: [], // 商品
				planCostsDataColumn: [{
						prop: 'mainorgName',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'supplierModelName',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.supplierModelName')
					},
					{
						prop: 'supplierNo',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.supplierNo')
					},
					{
						prop: 'supplierName',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.supplierName')
					},
					{
						prop: 'balanceTypeName',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.balanceTypeName')
					},
					{
						prop: 'supplierMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.supplierMoney')
					},
					{
						prop: 'linkPaybillNo',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.linkPaybillNo')
					},
					{
						prop: 'remarks',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.remarks')
					},
					{
						prop: 'shouldMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.shouldMoney')
					},
					{
						prop: 'payMoney',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.payMoney')
					},
					{
						prop: 'proportion',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.proportion'),
						slot: 'proportion'
					},
					{
						prop: 'payState',
						label: this.$t('auditInfo.purGoodPlanInfo.planCostsDataColumn.payState'),
						slot: 'payState'
					}
				], // 费用
				planCostsData: [] // 费用
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
				} = await purPlanFindById({
					id
				})
				if (res) {
					res.attachment = res.attachment.length ? JSON.parse(res.attachment) : []
					this.info = res
					this.endDate = res.planDate
					this.goodsObj.goodsId = res.purPlanDetailsVos[0].goodsId
					this.goodsObj.goodsDetailId = res.purPlanDetailsVos[0].goodsDetailId
					this.goodsObj.goodsName = res.purPlanDetailsVos[0].goodsName
					this.planDetailsData = res.purPlanDetailsVos
					this.planCostsData = res.purPlanCostVos
				}
			},
			// 查看报价
			chooseOffer(goodsDetailId, goodsName, goodsId) {
				this.goodsObj.goodsDetailId = goodsDetailId
				this.goodsObj.goodsName = goodsName
				this.goodsObj.goodsId = goodsId
			},
			// 下载
			downFile(url) {
				window.open(url)
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
