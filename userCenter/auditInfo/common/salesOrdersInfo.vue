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
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.orderSource')}}</view>
						<view class="desc">{{info.orderSource | orderSource}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.goodsTotalMoney')}}</view>
						<view class="desc">{{info.goodsTotalMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payItemsMoney')}}</view>
						<view class="desc">{{info.payItemsMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.couponTotalMoney')}}</view>
						<view class="desc">{{info.couponTotalMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.totalMoney')}}</view>
						<view class="desc">{{info.totalMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.orderState')}}</view>
						<view class="desc">{{info.orderState | orderState}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.deliveryState')}}</view>
						<view class="desc">{{info.deliveryState}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payState')}}</view>
						<view class="desc">{{info.payState | payState}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payType')}}</view>
						<view class="desc">{{info.payType | payType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payTypeName')}}</view>
						<view class="desc">{{info.payTypeName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.orderTime')}}</view>
						<view class="desc">{{info.orderTime ? UnixToDate(info.orderTime) : ''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.createTime')}}</view>
						<view class="desc">{{info.createTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.finishTime')}}</view>
						<view class="desc">{{info.finishTime ? UnixToDate(info.finishTime) : ''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.operationTime')}}</view>
						<view class="desc">{{info.operationTime ? UnixToDate(info.operationTime) : ''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.customTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerNo')}}</view>
						<view class="desc">{{info.customerNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerName')}}</view>
						<view class="desc">{{info.customerName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerPhone')}}</view>
						<view class="desc">{{salesOrderExtend.customerPhone}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerAccount')}}</view>
						<view class="desc">{{salesOrderExtend.customerAccount}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerClassify')}}</view>
						<view class="desc">{{salesOrderExtend.customerClassify | customerClassify}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.regionName')}}</view>
						<view class="desc">{{salesOrderExtend.regionName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.customerTypeName')}}</view>
						<view class="desc">{{salesOrderExtend.customerTypeName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.propertyNames')}}</view>
						<view class="desc">{{salesOrderExtend.propertyNames}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.deliverTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.pickMode')}}</view>
						<view class="desc">{{salesOrderTransport.pickMode | pickMode}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.bookingTime')}}</view>
						<view class="desc">{{salesOrderTransport.bookingTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.licenseNo')}}</view>
						<view class="desc">
							{{(salesOrderTransport.pickMode !==1 && salesOrderTransport.pickMode !==4) ? salesOrderTransport.licenseNo : ''}}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.linkman')}}</view>
						<view class="desc">{{salesOrderTransport.linkman}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.phone')}}</view>
						<view class="desc">{{salesOrderTransport.phone}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.salesOrderTransport')}}</view>
						<view class="desc">{{salesOrderTransport.salesOrderTransport | addressSplicing}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.deliverOrgName')}}</view>
						<view class="desc">
							{{salesOrderTransport.pickMode === 4 ? salesOrderTransport.deliverOrgName : ''}}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.deliverMan')}}</view>
						<view class="desc">
							{{(salesOrderTransport.pickMode === 3 || salesOrderTransport.pickMode === 4) ? salesOrderTransport.deliverMan : ''}}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payItemsName')}}</view>
						<view class="desc">{{info.payItemsName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.payItemsMoney')}}</view>
						<view class="desc">{{info.payItemsMoney}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.orderTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.couponNo')}}</view>
						<view class="desc">{{ info.coupon ? info.coupon.couponNo : '' }}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.couponMoney')}}</view>
						<view class="desc">{{info.couponMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.integralValue')}}</view>
						<view class="desc">{{info.integralValue}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.integralMoney')}}</view>
						<view class="desc">{{info.integralMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.disCountMoney')}}</view>
						<view class="desc">{{info.disCountMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.disCountRate')}}</view>
						<view class="desc">{{info.disCountRate}}%</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.couponTotalMoney')}}</view>
						<view class="desc">{{info.couponTotalMoney}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.salesOrdersInfo.totalMoney')}}</view>
						<view class="desc">{{info.totalMoney}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="basic" v-show="current == 1">
			<view class="basic-item" v-for="item in salesOrderDetailList" :key="item.id">
				<view class="basic-tle">{{item.billName}}
					<text class="tip-tle">{{$t('auditInfo.salesOrdersInfo.orderNums')}}：{{ item.subBillNo }}</text>
				</view>
				<view class="basic-box">
					<us-table :table-column="item.printSetVo.tableColumn"
						:table-data="item.salesOrderDetailGoodsList || []"></us-table>
				</view>
			</view>
			<view class="basic-item" v-if="salesOrderPayitemsList.length">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.costMoney')}}</view>
				<view class="basic-box" v-for="(item,index) in salesOrderPayitemsList" :key="item.id">
					<view class="item">
						<view class="tle">{{item.payItemsName}}</view>
						<view class="desc">{{ item.payItemsMoney }},{{$t('auditInfo.salesOrdersInfo.totalUnit')}}{{item.payItemsTotalMoney}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="basic" v-show="current == 2">
			<view class="basic-item">
				<view class="basic-box">
					<us-table :table-column="tableColumnBack"
						:table-data="salesOrderBackDetailList || []"></us-table>
				</view>
			</view>
		</view>
		<view class="basic" v-show="current == 3">
			<view class="basic-item"  v-if="editId">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.sendTle')}}</view>
				<view class="basic-box">
					<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
				</view>
			</view>
			<view class="basic-item" v-if="editId">
				<view class="basic-tle">{{$t('auditInfo.salesOrdersInfo.recycleTle')}}</view>
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
				if(!this.salesOrderBackDetailList.length) return
				this.salesOrderBackDetailList.forEach((val,key)=>{
					this.tableColumnBack.forEach((item,index)=>{
						if(index==0){
							countArr[item.prop] = this.$t('auditInfo.salesOrdersInfo.tableColumnBack.count')
						}else if(['totalNum','backNum','lendNum','returnNum'].indexOf(item.prop) != -1){
							countArr[item.prop] = (countArr[item.prop]?countArr[item.prop]:0) + parseInt(val[item.prop])
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
</style>
