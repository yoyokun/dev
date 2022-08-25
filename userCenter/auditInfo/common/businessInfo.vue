<template>
	<view>
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs activeStyle="color:rgb(42, 130, 228)" :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
					@change="changeTabs"></u-tabs>
			</view>
		</view>

		<view class="basic" v-show="current == 0">
			<description-list :title="$t('auditInfo.businessInfo.basicTle')">
				<description :label="$t('auditInfo.businessInfo.orgName')">{{ info.orgName }}</description>
				<description :label="$t('auditInfo.businessInfo.billNo')">{{ info.billNo }}</description>
				<description :label="$t('auditInfo.businessInfo.formType')">{{ info.formType | formType }}</description>
				<description :label="$t('auditInfo.businessInfo.customerNo')">{{ info.customerNo }}</description>
				<description :label="$t('auditInfo.businessInfo.customerName')">{{ info.customerName }}</description>
				<description :label="$t('auditInfo.businessInfo.checkState')">{{ info.checkState | checkState }}</description>
				<description :label="$t('auditInfo.businessInfo.goodsTotalMoney')">{{ info.goodsTotalMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.payItemsMoney')">{{ info.payItemsMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.couponTotalMoney')">{{ info.couponTotalMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.totalMoney')[0]">{{ info.totalMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.creator')">{{ info.creator }}</description>
				<description :label="$t('auditInfo.businessInfo.billTime')">{{ info.billTime | dayjs }}</description>
				<description :label="$t('auditInfo.businessInfo.totalMoney')[1]">{{ info.totalMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.totalWeight')">{{ info.totalWeight }}</description>
				<description :label="$t('auditInfo.businessInfo.totalNum')">{{ info.totalNum }}</description>
				<description :label="$t('auditInfo.businessInfo.linkBillNo')">{{ info.linkBillNo }}</description>
				<description :label="$t('auditInfo.businessInfo.linkType')">{{ info.linkType }}</description>
				<description :label="$t('auditInfo.businessInfo.printCount')">{{ info.printCount }}</description>
				<description :label="$t('auditInfo.businessInfo.remarks')">{{ info.remarks }}</description>
				<description :label="$t('auditInfo.businessInfo.operator')">{{ info.operator }}</description>
				<description :label="$t('auditInfo.businessInfo.operationTime')">{{ info.operationTime | dayjs }}</description>
			</description-list>
			<description-list :title="$t('auditInfo.businessInfo.goodsTle')">
				<us-table :table-column="tableColumn" :table-data="salesTransferDetailList"></us-table>
			</description-list>
			<description-list :title="$t('auditInfo.businessInfo.deliverTle')">
				<description :label="$t('auditInfo.businessInfo.pickMode')">{{ info.pickMode | pickMode }}</description>
				<description :label="$t('auditInfo.businessInfo.bookingTime')">{{salesOrderTransport.bookingTime ? UnixToDate(salesOrderTransport.bookingTime) : ''}}</description>
				<description :label="$t('auditInfo.businessInfo.licenseNo')">{{ info.licenseNo }}</description>
				<description :label="$t('auditInfo.businessInfo.deliverMan')">{{ info.deliverMan }}</description>
				<description :label="$t('auditInfo.businessInfo.addressSplicing')">{{ info.addressSplicing }}</description>
				<description :label="$t('auditInfo.businessInfo.payItemsMoney')">{{ info.payItemsMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.payItemsName')">{{ info.payItemsName }}</description>
			</description-list>
			<description-list :title="$t('auditInfo.businessInfo.orderTle')">
				<description :label="$t('auditInfo.businessInfo.couponNo')">{{ info.coupon ? info.coupon.couponNo : '' }}</description>
				<description :label="$t('auditInfo.businessInfo.couponMoney')">{{ info.couponMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.integralValue')">{{ info.integralValue }}</description>
				<description :label="$t('auditInfo.businessInfo.integralMoney')">{{ info.integralMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.disCountMoney')">{{ info.disCountMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.disCountRate')">{{ info.disCountRate }}</description>
				<description :label="$t('auditInfo.businessInfo.couponTotalMoney')">{{ info.couponTotalMoney }}</description>
				<description :label="$t('auditInfo.businessInfo.totalMoney')[2]">{{ info.totalMoney }}</description>
			</description-list>
		</view>
		<view class="basic" v-show="current == 1">
			<description-list v-if="editId" :title="$t('auditInfo.businessInfo.sendTle')">
				<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
			</description-list>
			<description-list v-if="editId" :title="$t('auditInfo.businessInfo.recycleTle')">
				<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
			</description-list>
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
	import ServiceCylinderInfo from './serviceCylinderInfo'
	export default {
		name: 'BusinessInfo',
		components: {
			ServiceCylinderInfo
		},
		// 过滤器
		filters: {
			linkType(value) {
				const stateObj = that.$t('auditInfo.businessInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('auditInfo.businessInfo.checkStateTxt')
				return stateObj[value] || ''
			},
			formType(value) {
				const stateObj = that.$t('auditInfo.businessInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('auditInfo.businessInfo.pickModeTxt')
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
				busMenu: this.$t('auditInfo.businessInfo.tabs'),
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
				} = await salesBusinessFindById({
					id
				})
				if (res) {
					const payItemsName = []
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},${this.$t('auditInfo.businessInfo.totalTxt')}${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.info = res
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
</style>
