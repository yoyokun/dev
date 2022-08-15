<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.singleOutputInfo.basicTle')">
			<description :label="$t('auditInfo.singleOutputInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.orgName')">{{ info.orgName }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.stockFormType')">{{ info.stockFormType | stockFormType }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.customerName')">{{ info.customerName }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.linkBillNo')">{{ info.linkBillNo }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.linkType')">{{ info.linkType | linkType }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.licenseNo')">{{ info.licenseNo }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.deliverMan')">{{ info.deliverMan }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.remarks')">{{ info.remarks }}</description>
			<description :label="$t('auditInfo.singleOutputInfo.filePath')">
				<image class="img" v-for="item in info.filePath" :key="item.id" :src="item.url"></image>
			</description>
		</description-list>
		<description-list :title="$t('auditInfo.singleOutputInfo.orderTle')">
			<block v-for="item in stockInoutLogList" :key="item.id">
				<description :label="$t('auditInfo.singleOutputInfo.subBillNo')">{{ info.subBillNo }}</description>
				<description :label="$t('auditInfo.singleOutputInfo.inOutName')">{{item.inOutName + (item.inOutType === 1 ? $t('auditInfo.singleOutputInfo.inOutNameTxt')[0] : $t('auditInfo.singleOutputInfo.inOutNameTxt')[1])}}</description>
				<us-table :table-column="tableColumn" :table-data="item.stockInoutLogDetailsList"></us-table>
			</block>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		stockBillLogFindById
	} from '@/api/lpgSalesManageApi.js'
	export default {
		name: 'SingleOutputInfo',
		components: {},
		// 过滤器
		filters: {
			stockFormType(value) {
				const stateObj = that.$t('auditInfo.singleOutputInfo.stockFormTypeTxt')
				return stateObj[value] || ''
			},
			linkType(value) {
				const stateObj = that.$t('auditInfo.singleOutputInfo.linkType')
				return stateObj[value] || ''
			},
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
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.propertyNames')
					},
					{
						prop: 'stockNum',
						label: this.$t('auditInfo.singleOutputInfo.tableColumn.stockNum')
					}
				],
				stockInoutLogList: []
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
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await stockBillLogFindById({
					id
				})
				if (res) {
					res.filePath = res.filePath.length ? JSON.parse(res.filePath) : []
					this.info = res
					this.stockInoutLogList = res.stockInoutLogList
				}
			}
		}
	}
</script>
<style lang="scss" scoped></style>
