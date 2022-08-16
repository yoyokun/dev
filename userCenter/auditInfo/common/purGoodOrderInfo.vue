<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.purGoodOrderInfo.basicTle')">
			<description :label="$t('auditInfo.purGoodOrderInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.orderDate')">{{ info.orderDate | dayjs('YYYY-MM-DD') }}
			</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.businessTypeName')">{{ info.businessTypeName }}
			</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.state')">{{ info.state }}</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.remarks')">{{ info.remarks }}</description>
			<description :label="$t('auditInfo.purGoodOrderInfo.attachment')">
				<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
					<text>{{ index+1 }}.{{ item.name }}</text>
					<text @click="downFile(item.url)">{{$t('auditInfo.purGoodOrderInfo.downloadTxt')}}</text>
				</view>
			</description>
		</description-list>
		<description-list :title="$t('auditInfo.purGoodOrderInfo.buyTle')">
			<us-table :table-column="tableColumn" :table-data="planDetailsData">
				<!-- #ifdef H5 || APP-PLUS -->
				<view slot="takeType" slot-scope="row">
					{{ row.data.takeType | takeType }}
				</view>
				<view slot="arrivalTime" slot-scope="row">
					{{ row.data.arrivalTime ? UnixToDate(row.data.arrivalTime) : '' }}
				</view>
				<view slot="attachment" slot-scope="row">
					<view class="down-list" v-for="(item,index) in row.data.attachment" :key="item.id">
						<text>{{ index+1 }}.{{ item.name }}</text>
						<text @click="downFile(item.url)">{{$t('auditInfo.purGoodOrderInfo.downloadTxt')}}</text>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-->
				<view slot="takeType" slot-scope="{row}">
					{{ row.data.takeType | takeType }}
				</view>
				<view slot="arrivalTime" slot-scope="{row}">
					{{ row.data.arrivalTime ? UnixToDate(row.data.arrivalTime) : '' }}
				</view>
				<view slot="attachment" slot-scope="{row}">
					<view class="down-list" v-for="(item,index) in row.data.attachment" :key="item.id">
						<text>{{ index+1 }}.{{ item.name }}</text>
						<text @click="downFile(item.url)">{{$t('auditInfo.purGoodOrderInfo.downloadTxt')}}</text>
					</view>
				</view>
				<!-- #endif -->
			</us-table>
		</description-list>
		<description-list :title="$t('auditInfo.purGoodOrderInfo.feeTle')">
			<us-table :table-column="planCostsDataColumn" :table-data="planCostsData">
				<!-- #ifdef H5 || APP-PLUS -->
				<view slot="proportion" slot-scope="row">
					{{ row.data.proportion && row.data.proportion + '%' }}
				</view>
				<view slot="payState" slot-scope="row">
					{{ row.data.payState | payState }}
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-->
				<view slot="proportion" slot-scope="{row}">
					{{ row.data.proportion && row.data.proportion + '%' }}
				</view>
				<view slot="payState" slot-scope="{row}">
					{{ row.data.payState | payState }}
				</view>
				<!-- #endif -->
			</us-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		purOrderFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		name: 'PurGoodOrderInfo',
		components: {},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('auditInfo.purGoodOrderInfo.stateTxt')
				return stateObj[value] || ''
			},
			payState(value) {
				const stateObj = that.$t('auditInfo.purGoodOrderInfo.payStateTxt')
				return stateObj[value] || ''
			},
			takeType(value) {
				const stateObj = that.$t('auditInfo.purGoodOrderInfo.takeTypeTxt')
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
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.goodsName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.standardName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.propertyNames')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.unitsName')
					},
					{
						prop: 'mainorgName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.mainorgName')
					},
					{
						prop: 'orderOrgName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.orderOrgName')
					},
					{
						prop: 'inStorageBillNo',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.inStorageBillNo')
					},
					{
						prop: 'supplierName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.supplierName')
					},
					{
						prop: 'supplyName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.supplyName')
					},
					{
						prop: 'takeType',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.takeType'),
						slot: 'takeType'
					},
					{
						prop: 'transportName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.transportName'),
					},
					{
						prop: 'license',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.license')
					},
					{
						prop: 'vehicleNum',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.vehicleNum')
					},
					{
						prop: 'amount',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.amount')
					},
					{
						prop: 'auditNum',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.auditNum')
					},
					{
						prop: 'inStorageNum',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.inStorageNum')
					},
					{
						prop: 'settleNum',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.settleNum')
					},
					{
						prop: 'goodsPrice',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.goodsPrice')
					},
					{
						prop: 'otherPrice',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.otherPrice')
					},
					{
						prop: 'otherMoneyData',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.otherMoneyData')
					},
					{
						prop: 'settlePrice',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.settlePrice')
					},
					{
						prop: 'goodsMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.goodsMoney')
					},
					{
						prop: 'freightPrice',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.freightPrice')
					},
					{
						prop: 'freightMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.freightMoney')
					},
					{
						prop: 'totalMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.totalMoney')
					},
					{
						prop: 'priceSpread',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.priceSpread')
					},
					{
						prop: 'salesPrice',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.salesPrice')
					},
					{
						prop: 'salesMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.salesMoney')
					},
					{
						prop: 'vehicleDriverName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.vehicleDriverName')
					},
					{
						prop: 'escortName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.escortName')
					},
					{
						prop: 'arrivalTime',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.arrivalTime'),
						slot: 'arrivalTime'
					},
					{
						prop: 'attachment',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.attachment'),
						slot: 'attachment'
					},
					{
						prop: 'takeManagerName',
						label: this.$t('auditInfo.purGoodOrderInfo.tableColumn.takeManagerName')
					}
				],
				planDetailsData: [], // 商品
				planCostsDataColumn: [{
						prop: 'mainorgName',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'supplierModelName',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'supplierNo',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'supplierName',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'balanceTypeName',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'supplierMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'linkPaybillNo',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'remarks',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'shouldMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'payMoney',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.mainorgName')
					},
					{
						prop: 'proportion',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.proportion'),
						slot: 'proportion'
					},
					{
						prop: 'payState',
						label: this.$t('auditInfo.purGoodOrderInfo.planCostsDataColumn.payState'),
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
				} = await purOrderFindById({
					id
				})
				if (res) {
					res.attachment = res.attachment.length ? JSON.parse(res.attachment) : []
					this.info = res
					res.purOrderDetailsVos.forEach((v) => {
						v.attachment = v.attachment.length ? JSON.parse(v.attachment) : []
					})
					this.planDetailsData = res.purOrderDetailsVos
					this.planCostsData = res.purOrderCostVos
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
				uni.setClipboardData({
					data: url,
					success: () => {
						this.$nextTick(() => {
							uni.showToast({
								title: '链接已复制，请在浏览器打开',
								duration: 2000
							});
						})
					}
				});
				// #endif
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
