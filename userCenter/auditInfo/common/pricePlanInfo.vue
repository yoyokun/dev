<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.pricePlanInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.planNo')}}</view>
						<view class="desc">{{info.planNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.orgName')}}</view>
						<view class="desc">{{info.orgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.planName')}}</view>
						<view class="desc">{{info.planName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.planType')}}</view>
						<view class="desc">
							{{info.planType === 1 ? $t('auditInfo.pricePlanInfo.planTypeTxt')[0] : $t('auditInfo.pricePlanInfo.planTypeTxt')[1]}}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.planTime')}}</view>
						<view class="desc">{{info.planTime?UnixToDate(info.planTime):''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.execTime')}}</view>
						<view class="desc">{{info.execTime?UnixToDate(info.planTime):''}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.creator')}}</view>
						<view class="desc">{{info.creator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.createTime')}}</view>
						<view class="desc">{{info.createTime | dayjs }}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.pricePlanInfo.operationTime')}}</view>
						<view class="desc">{{info.operationTime | dayjs}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<!-- <view class="basic-tle">{{$t('auditInfo.pricePlanInfo.basicTle')}}</view> -->
				<view class="basic-box">
					<UTable :table-column="tableColumn" :table-data="tableData"></UTable>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		pricePlanFindById,
		pricePlanDetailFindList
	} from '@/api/lpgManageAppApi'
	import UTable from './uTable'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		name: 'ShopInfo',
		components: {UTable},
		// 过滤器
		filters: {},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				UnixToDate: UnixToDate,
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.propertyNames')
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.listPrice')
					},
					{
						prop: 'nowPrice',
						label: this.$t('auditInfo.pricePlanInfo.tableColumn.nowPrice')
					}
				],
				tableData: [],
				info: {}
			}
		},
		async created() {},
		mounted() {
			this.$nextTick(async () => {
				if (this.editId) {
					// 编辑
					await this.getInfo(this.editId)
					// 查询商品
					await this.getPricePlanDetailFindList(this.editId)
				}
			})
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await pricePlanFindById({
					id
				})
				if (res) {
					this.info = res
				}
			},
			// 获取调价商品
			async getPricePlanDetailFindList(id) {
				const {
					returnValue: res
				} = await pricePlanDetailFindList({
					planId: id
				})
				// 计算合并的行
				// this.getSpanArrTable(res)
				this.tableData = res
			},
			// 合并行
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 4 ||
					columnIndex === 3 || columnIndex === 2 || columnIndex === 1 || columnIndex === 0) {
					const _row = this.spanArr[rowIndex]
					const _col = _row > 0 ? 1 : 0
					return {
						rowspan: _row,
						colspan: _col
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>
