<template>
	<view>
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs activeStyle="color:rgb(42, 130, 228)" :scrollable="false" :list="busMenu" :current="current"
					:itemStyle="{flex:'1',height:'44px'}" @change="changeTabs"></u-tabs>
			</view>
		</view>

		<view class="basic" v-show="current == 0">
			<description-list :title="$t('auditInfo.salesOrdersInfo.basicTle')">
				<description :label="$t('auditInfo.salesOrdersInfo.billNo')">{{ info.billNo }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.orderSource')">{{ info.orderSource | orderSource }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.goodsTotalMoney')">{{ info.goodsTotalMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.payItemsMoney')">{{ info.payItemsMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.totalMoney')">{{ info.totalMoney }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.orderState')">{{ info.orderState | orderState }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.deliveryState')">{{ info.deliveryState }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.payState')">{{ info.payState | payState }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.payType')">{{ info.payType | payType }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.orderTime')">
					{{ info.orderTime ? UnixToDate(info.orderTime) : '' }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.createTime')">{{ info.createTime | dayjs }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.finishTime')">
					{{ info.finishTime ? UnixToDate(info.finishTime) : '' }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.operationTime')">
					{{ info.operationTime ? UnixToDate(info.operationTime) : '' }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.remarks')">{{ info.remarks }}</description>
			</description-list>
			<description-list :title="$t('auditInfo.salesOrdersInfo.customTle')">
				<description :label="$t('auditInfo.salesOrdersInfo.customerNo')">{{ info.customerNo }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.customerName')">{{ info.customerName }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.customerPhone')">{{ info.customerPhone }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.customerAccount')">{{ info.customerAccount }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.customerClassify')">
					{{ info.customerClassify | customerClassify }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.regionName')">{{ info.regionName }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.customerTypeName')">{{ info.customerTypeName }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.propertyNames')">{{ info.propertyNames }}
				</description>
			</description-list>
			<description-list :title="$t('auditInfo.salesOrdersInfo.deliverTle')">
				<description :label="$t('auditInfo.salesOrdersInfo.pickMode')">
					{{ salesOrderTransport.pickMode | pickMode }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.bookingTime')">
					{{ salesOrderTransport.bookingTime | dayjs }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.licenseNo')">
					{{(salesOrderTransport.pickMode !==1 && salesOrderTransport.pickMode !==4) ? salesOrderTransport.licenseNo : ''}}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.linkman')">{{ salesOrderTransport.linkman }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.phone')">{{ salesOrderTransport.phone }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.salesOrderTransport')">
					{{salesOrderTransport.salesOrderTransport | addressSplicing}}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.deliverOrgName')">
					{{salesOrderTransport.pickMode === 4 ? salesOrderTransport.deliverOrgName : ''}}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.deliverMan')">
					{{(salesOrderTransport.pickMode === 3 || salesOrderTransport.pickMode === 4) ? salesOrderTransport.deliverMan : ''}}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.payItemsName')">
					{{ salesOrderTransport.payItemsName }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.payItemsMoney')">
					{{ salesOrderTransport.payItemsMoney }}</description>
			</description-list>
			<description-list :title="$t('auditInfo.salesOrdersInfo.orderTle')">
				<description :label="$t('auditInfo.salesOrdersInfo.couponNo')">
					{{ info.coupon ? info.coupon.couponNo : '' }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.couponMoney')">{{ info.couponMoney }}</description>
				<description :label="$t('auditInfo.salesOrdersInfo.integralValue')">{{ info.integralValue }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.integralMoney')">{{ info.integralMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.disCountMoney')">{{ info.disCountMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.disCountRate')">{{ info.disCountRate }}%
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
				</description>
				<description :label="$t('auditInfo.salesOrdersInfo.totalMoney')">{{ info.totalMoney }}</description>
			</description-list>
		</view>
		<view class="basic" v-show="current == 1">
			<description-list v-for="item in salesOrderDetailList" :key="item.id">
				<view class="basic-tle">{{item.billName}}
					<text class="tip-tle">{{$t('auditInfo.salesOrdersInfo.orderNums')}}：{{ item.subBillNo }}</text>
				</view>
				<us-table :table-column="item.printSetVo.tableColumn"
					:table-data="item.salesOrderDetailGoodsList || []"></us-table>
			</description-list>
			<description-list v-if="salesOrderPayitemsList.length" :title="$t('auditInfo.salesOrdersInfo.costMoney')">
				<description v-for="(item,index) in salesOrderPayitemsList" :key="item.id" :label="item.payItemsName">
					{{ item.payItemsMoney }},{{$t('auditInfo.salesOrdersInfo.totalUnit')}}{{item.payItemsTotalMoney}}
				</description>
				<view class="p-20">
					<total :info-data="infoData"></total>
				</view>
			</description-list>
		</view>
		<view class="basic" v-show="current == 2">
			<description-list>
				<us-table :table-column="tableColumnBack" :table-data="salesOrderBackDetailList || []"></us-table>
			</description-list>
		</view>
		<view class="basic" v-show="current == 3">
			<description-list v-if="editId" :title="$t('auditInfo.salesOrdersInfo.sendTle')">
				<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
			</description-list>
			<description-list v-if="editId" :title="$t('auditInfo.salesOrdersInfo.recycleTle')">
				<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
			</description-list>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		salesOrderFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	import ServiceCylinderInfo from './serviceCylinderInfo'
	export default {
		name: 'SalesOrdersInfo',
		components: {
			ServiceCylinderInfo
		},
		// 过滤器
		filters: {
			orderState(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.orderStateTxt')
				return stateObj[value] || ''
			},
			customerClassify(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.customerClassifyTxt')
				return stateObj[value] || ''
			},
			payState(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.payStateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.pickModeTxt')
				return stateObj[value] || ''
			},
			payType(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.payTypeTxt')
				return stateObj[value] || ''
			},
			deliveryState(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.deliveryStateTxt')
				return stateObj[value] || ''
			},
			orderSource(value) {
				const stateObj = that.$t('auditInfo.salesOrdersInfo.orderSourceTxt')
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
				current: 0,
				busMenu: this.$t('auditInfo.salesOrdersInfo.tabs'),
				UnixToDate: UnixToDate,
				info: {},
				salesOrderTransport: {},
				salesOrderDetailList: [],
				salesOrderBackDetailList: [],
				salesOrderPayitemsList: [],
				salesOrderExtend: {},
				tableColumnBack: [{
						prop: 'goodsName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.goodsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.propertyNames')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.unitsName')
					},
					{
						prop: 'totalNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.totalNum')
					},
					{
						prop: 'backNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.backNum')
					},
					{
						prop: 'lendNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.lendNum')
					},
					{
						prop: 'returnNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.returnNum')
					}
				],
				infoData: [{
						name: this.$t('auditInfo.salesOrdersInfo.infoData.countFee'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('auditInfo.salesOrdersInfo.infoData.countOrder'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('auditInfo.salesOrdersInfo.infoData.freeMoney'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('auditInfo.salesOrdersInfo.infoData.money'),
						value: '0',
						type: 'money'
					}
				]
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
				} = await salesOrderFindById({
					id
				})
				if (res) {
					const payTypeName = []
					const payItemsName = []
					// 结算信息
					res.salesOrderPayDetailList.forEach((v) => {
						payTypeName.push(`${v.collectionTypeName}:${v.payMoney}`)
					})
					res.payTypeName = payTypeName.join(',')
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.info = res
					this.salesOrderTransport = res.salesOrderTransport
					res.salesOrderDetailList.forEach((v) => {
						v.salesOrderDetailGoodsList.forEach((o) => {
							o.goodsPath = o.goodsPath.length ? (JSON.parse(o.goodsPath).length ? JSON
								.parse(o.goodsPath)[0].url : '') : ''
							o.assistUnitsList.forEach((n, j) => {
								v.printSetVo.tableColumn.forEach(m => {
									if (m.propValue === 'assistName-' + n
										.assistUnitsId) {
										o[m.propValue] = n.netContent
									}
									if (m.propValue === 'netContent-' + n
										.assistUnitsId) {
										o[m.propValue] = n.netContent
									}
								})
							})
						})
						v.salesOrderDetailGoodsList.push({
							amount: v.fillingNum,
							totalMoney: v.totalMoney,
							totalWeight: v.totalWeight,
							goodsName: '',
							propertyNames: '',
							unitsName: '合计',
							unitPrice: '',
							remarks: ''
						})
					})
					this.salesOrderDetailList = res.salesOrderDetailList
					this.salesOrderBackDetailList = res.salesOrderBackDetailList
					this.salesOrderExtend = res.salesOrderExtend
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
					this.infoData[0].value = res.payItemsMoney
					this.infoData[1].value = res.goodsTotalMoney
					this.infoData[2].value = res.couponTotalMoney
					this.infoData[3].value = res.totalMoney
					this.getSummaries()
				}
			},
			// 合计
			getSummaries() {
				let countArr = {}
				if (!this.salesOrderBackDetailList.length) return
				this.salesOrderBackDetailList.forEach((val, key) => {
					this.tableColumnBack.forEach((item, index) => {
						if (index == 0) {
							countArr[item.prop] = this.$t(
								'auditInfo.salesOrdersInfo.tableColumnBack.count')
						} else if (['totalNum', 'backNum', 'lendNum', 'returnNum'].indexOf(item.prop) != -
							1) {
							countArr[item.prop] = (countArr[item.prop] ? countArr[item.prop] : 0) +
								parseInt(val[item.prop])
						}
					})
				})
				this.salesOrderBackDetailList.push(countArr)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.tip-tle {
		font-size: 26rpx;
		color: #999;
		font-weight: normal;
		margin-left: 20rpx;
	}
	.p-20{
		padding: 20rpx;
	}
</style>
