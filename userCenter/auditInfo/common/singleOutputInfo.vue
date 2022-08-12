<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.singleOutputInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.orgName')}}</view>
						<view class="desc">{{info.orgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.stockFormType')}}</view>
						<view class="desc">{{info.stockFormType | stockFormType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.customerName')}}</view>
						<view class="desc">{{info.customerName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.linkBillNo')}}</view>
						<view class="desc">{{info.linkBillNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.linkType')}}</view>
						<view class="desc">{{info.linkType | linkType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.licenseNo')}}</view>
						<view class="desc">{{info.licenseNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.deliverMan')}}</view>
						<view class="desc">{{info.deliverMan}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.filePath')}}</view>
						<view class="desc">
							<image class="img" v-for="item in info.filePath" :key="item.id" :src="item.url"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.singleOutputInfo.orderTle')}}</view>
				<view class="basic-box" v-for="item in stockInoutLogList" :key="item.id">
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.subBillNo')}}</view>
						<view class="desc">{{info.subBillNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.singleOutputInfo.inOutName')}}</view>
						<view class="desc">{{item.inOutName + (item.inOutType === 1 ? $t('auditInfo.singleOutputInfo.inOutNameTxt')[0] : $t('auditInfo.singleOutputInfo.inOutNameTxt')[1])}}</view>
					</view>
					<UTable :table-column="tableColumn" :table-data="item.stockInoutLogDetailsList"></UTable>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		stockBillLogFindById
	} from '@/api/lpgManageAppApi'
	import UTable from './uTable'
	export default {
		name: 'SingleOutputInfo',
		components: {UTable},
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
