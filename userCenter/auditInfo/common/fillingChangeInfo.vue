<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.fillingChangeInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.orgName')}}</view>
						<view class="desc">{{info.orgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.inOutName')}}</view>
						<view class="desc">
							{{ info.inOutName + (info.inOutType === 1 ? $t('auditInfo.fillingChangeInfo.inOutNameTxt')[0] : $t('auditInfo.fillingChangeInfo.inOutNameTxt')[1]) }}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.systemTotalNum')}}</view>
						<view class="desc">{{info.systemTotalNum}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.realTotalNum')}}</view>
						<view class="desc">{{info.realTotalNum}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.systemTotalWeight')}}</view>
						<view class="desc">{{info.systemTotalWeight}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.realTotalWeight')}}</view>
						<view class="desc">{{info.realTotalWeight}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.planTotalWeight')}}</view>
						<view class="desc">
							{{ $bigDecimal.round($bigDecimal.subtract(info.realTotalWeight, info.planTotalWeight), 2) }}
						</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.checkState')}}</view>
						<view class="desc">{{info.checkState | checkState}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.operator')}}</view>
						<view class="desc">{{info.operator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.operationTime')}}</view>
						<view class="desc">{{info.operationTime | dayjs}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.fillingChangeInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.fillingChangeInfo.tableTle')}}</view>
				<view style="padding: 20rpx 0;">
					<total :info-data="infoData"></total>
				</view>

				<view class="basic-box">
					<UTable :table-column="tableColumn" :table-data="tableData"></UTable>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		fillingChangeLogFindById
	} from '@/api/lpgSalesManageApi'
	import UTable from './uTable'
	import total from './total'
	export default {
		name: 'FillingChangeInfo',
		components: {
			UTable,
			total,
		},
		// 过滤器
		filters: {
			checkState(value) {
				const stateObj = that.$t('auditInfo.fillingChangeInfo.checkStateTxt')
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
				info: {},
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.propertyNames')
					},
					{
						prop: 'systemNum',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.systemNum')
					},
					{
						prop: 'realNum',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.realNum')
					},
					{
						prop: 'planWeight',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.planWeight')
					},
					{
						prop: 'realWeight',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.realWeight')
					},
					{
						prop: 'profit',
						label: this.$t('auditInfo.fillingChangeInfo.tableColumn.profit')
					}
				],
				tableData: [],
				infoData: [{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillNums'),
						value: '0',
						type: 'number'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillWgtSet'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.fillWgt'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.BEAmount'),
						value: '0',
						type: 'weight'
					},
					{
						name: this.$t('auditInfo.fillingChangeInfo.infoData.BERate'),
						value: '0',
						type: 'number'
					}
				]
			}
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
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await fillingChangeLogFindById({
					id
				})
				if (res) {
					this.info = res
					res.fillingChangeLogDetailList.forEach(v => {
						v.profit = this.$bigDecimal.round(this.$bigDecimal.subtract(v.realWeight, v
							.planWeight), 2)
					})
					this.tableData = res.fillingChangeLogDetailList
					this.infoData[0].value = res.systemTotalNum
					this.infoData[1].value = res.systemTotalWeight
					this.infoData[2].value = res.planTotalWeight
					this.calculate()
					this.getSummaries()
				}
			},
			// 计算
			calculate() {
				this.infoData[3].value = this.$bigDecimal.subtract(this.infoData[2].value, this.infoData[1].value) || 0
				if (this.infoData[1].value !== '0.00') {
					this.infoData[4].value = this.$bigDecimal.divide(this.$bigDecimal.subtract(this.infoData[2].value, this
						.infoData[1].value), this.infoData[1].value, 2) || 0
				}
			},
			// 合计
			getSummaries() {
				let countArr = {}
				this.tableData.forEach((val,key)=>{
					this.tableColumn.forEach((item,index)=>{
						if(index==0){
							countArr[item.prop] = this.$t('auditInfo.fillingChangeInfo.tableColumn.count')
						}else if(['systemNum','realNum','planWeight','realWeight','profit'].indexOf(item.prop) != -1){
							countArr[item.prop] = (countArr[item.prop]?countArr[item.prop]:0) + parseInt(val[item.prop])
						}
					})
				})
				this.tableData.push(countArr)
			}
		}
	}
</script>
<style lang="scss" scoped></style>
