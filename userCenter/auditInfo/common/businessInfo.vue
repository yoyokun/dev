<template>
	<view class="business-info">
		<view class="audit-info-content">
			<view class="tabs">
				<view class="tabs-content">
					<u-tabs :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
						@change="changeTabs"></u-tabs>
				</view>
			</view>

			<view class="basic" v-show="current == 0">
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.businessInfo.basic.basicTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.orgName')}}</view>
							<view class="desc">{{info.orgName}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.billNo')}}</view>
							<view class="desc">{{info.billNo}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.formType')}}</view>
							<view class="desc">{{info.formType | formType}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.customerNo')}}</view>
							<view class="desc">{{info.customerNo}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.customerName')}}</view>
							<view class="desc">{{info.customerName}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.checkState')}}</view>
							<view class="desc">{{info.checkState | checkState}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.goodsTotalMoney')}}</view>
							<view class="desc">{{info.goodsTotalMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.payItemsMoney')}}</view>
							<view class="desc">{{info.payItemsMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.couponTotalMoney')}}</view>
							<view class="desc">{{info.couponTotalMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.totalMoney')[0]}}</view>
							<view class="desc">{{info.totalMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.creator')}}</view>
							<view class="desc">{{info.creator}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.billTime')}}</view>
							<view class="desc">{{info.billTime | dayjs}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.totalMoney')[1]}}</view>
							<view class="desc">{{info.totalMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.totalWeight')}}</view>
							<view class="desc">{{info.totalWeight}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.totalNum')}}</view>
							<view class="desc">{{info.totalNum}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.linkBillNo')}}</view>
							<view class="desc">{{info.linkBillNo}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.linkType')}}</view>
							<view class="desc">{{info.linkType}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.printCount')}}</view>
							<view class="desc">{{info.printCount}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.remarks')}}</view>
							<view class="desc">{{info.remarks}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.operator')}}</view>
							<view class="desc">{{info.operator}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.operationTime')}}</view>
							<view class="desc">{{info.operationTime | dayjs}}</view>
						</view>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.businessInfo.basic.deliverTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.pickMode')}}</view>
							<view class="desc">{{salesOrderTransport.pickMode | pickMode}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.bookingTime')}}</view>
							<view class="desc">
								{{salesOrderTransport.bookingTime ? UnixToDate(salesOrderTransport.bookingTime) : ''}}
							</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.licenseNo')}}</view>
							<view class="desc">{{salesOrderTransport.licenseNo}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.deliverMan')}}</view>
							<view class="desc">{{salesOrderTransport.deliverMan}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.addressSplicing')}}</view>
							<view class="desc">{{salesOrderTransport | addressSplicing}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.payItemsMoney')}}</view>
							<view class="desc">{{info.billNo}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.payItemsName')}}</view>
							<view class="desc">{{info.billNo}}</view>
						</view>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.businessInfo.basic.orderTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.couponNo')}}</view>
							<view class="desc">{{ info.coupon ? info.coupon.couponNo : '' }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.couponMoney')}}</view>
							<view class="desc">{{info.couponMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.integralValue')}}</view>
							<view class="desc">{{info.integralValue}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.integralMoney')}}</view>
							<view class="desc">{{info.integralMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.disCountMoney')}}</view>
							<view class="desc">{{info.disCountMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.disCountRate')}}</view>
							<view class="desc">{{info.disCountRate}}%</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.couponTotalMoney')}}</view>
							<view class="desc">{{info.couponTotalMoney}}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.businessInfo.basic.totalMoney')[2]}}</view>
							<view class="desc">{{info.totalMoney}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		salesBusinessFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		name: 'BusinessInfo',
		components: {},
		// 过滤器
		filters: {
			linkType(value) {
				const stateObj = that.$t('auditInfo.businessInfo.basic.linkTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.businessInfo.basic.checkStateTxt')
				return stateObj[value] || ''
			},
			formType(value) {
				const stateObj = that.$t('auditInfo.businessInfo.basic.formTypeTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('auditInfo.businessInfo.basic.pickModeTxt')
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
				// tabs菜单
				busMenu: [{
					name: this.$t('auditInfo.businessInfo.tabs.basicTle'),
				}, {
					name: this.$t('auditInfo.businessInfo.tabs.sourceTle'),
				}],
				current: 0, // tabs索引
				type: '1',
				UnixToDate: UnixToDate,
				info: {},
				salesTransferDetailList: [],
				tableColumn: [],
				salesOrderTransport: {},
				salesOrderPayitemsList: []
			}
		},
		computed: {

		},
		created(){
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
				} = await salesBusinessFindById({
					id
				})
				if (res) {
					const payItemsName = []
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.tableColumn = res.printSetVo && res.printSetVo.tableColumn
					res.salesBusinessDetailList.forEach(v => {
						v.goodsPath = v.goodsPath.length ? (JSON.parse(v.goodsPath).length ? JSON.parse(v
							.goodsPath)[0].url : '') : ''
						v.assistUnitsList.forEach((n, j) => {
							this.tableColumn.forEach(m => {
								if (m.propValue === 'assistName-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
								if (m.propValue === 'netContent-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
							})
						})
					})
					this.salesTransferDetailList = res.salesBusinessDetailList
					this.salesOrderTransport = res.salesOrderTransport ? res.salesOrderTransport : {}
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.business-info {
		position: relative;
		.tabs {
			height: 44px;
			width: 100%;
			.tabs-content {
				position: absolute;
				width: 100%;
				height: 44px;
				background: white;
			}
		}
	}
</style>
