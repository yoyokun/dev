<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.priceStrategyInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.goodsTle')}}</view>
						<view class="desc">{{info.goodsTle}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.attrTle')}}</view>
						<view class="desc">{{info.attrTle}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.strategyNo')}}</view>
						<view class="desc">{{info.strategyNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.strategyName')}}</view>
						<view class="desc">{{info.strategyName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.orgName')}}</view>
						<view class="desc">{{info.orgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.classifyName')}}</view>
						<view class="desc">{{info.classifyName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.creator')}}</view>
						<view class="desc">{{info.creator}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.priceStrategyInfo.createTime')}}</view>
						<view class="desc">{{info.createTime}}</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.priceStrategyInfo.goodsTle')}}</view>
				<view class="basic-box">
					<UTable :table-column="tableColumn" :table-data="tableData">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="unitsName" slot-scope="row">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.unitsName}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.unitsName}}</view>
						</view>
						<view slot="propertyNames" slot-scope="row">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.propertyNames}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.propertyNames}}</view>
						</view>
						<view slot="listPrice" slot-scope="row">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.listPrice}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.listPrice}}</view>
						</view>
						<view slot="costPrice" slot-scope="row">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.costPrice}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.costPrice}}</view>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="unitsName" slot-scope="{row}">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.unitsName}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.unitsName}}</view>
						</view>
						<view slot="propertyNames" slot-scope="{row}">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.propertyNames}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.propertyNames}}</view>
						</view>
						<view slot="listPrice" slot-scope="{row}">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.listPrice}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.listPrice}}</view>
						</view>
						<view slot="costPrice" slot-scope="{row}">
							<view style="height: 60rpx;line-height: 60rpx;">{{row.data.costPrice}}</view>
							<view style="height: 60rpx;line-height: 60rpx;" v-for="(item,index) in row.data.child" :key="index">{{item.costPrice}}</view>
						</view>
						<!-- #endif -->
					</UTable>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.priceStrategyInfo.attrTle')}}</view>
				<view class="basic-box">
					<UTable :table-column="toDataPropertyColumn" :table-data="toDataProperty">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="state" slot-scope="row">
							{{ row.data.state | stateText }}
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="state" slot-scope="{row}">
							{{ row.data.state | stateText }}
						</view>
						<!-- #endif -->
					</UTable>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		goodsFindList,
		priceStrategyFindById
	} from '@/api/lpgManageAppApi'
	import UTable from './uTable'
	export default {
		name: 'PriceStrategyInfo',
		components: {UTable},
		// 过滤器
		filters: {
			stateText(value) {
				const stateObj = that.$t('auditInfo.priceStrategyInfo.stateText')
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
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.unitsName'),
						slot: 'unitsName'
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.propertyNames'),
						slot: 'propertyNames'
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.listPrice'),
						slot: 'listPrice'
					},
					{
						prop: 'costPrice',
						label: this.$t('auditInfo.priceStrategyInfo.tableColumn.costPrice'),
						slot: 'costPrice'
					}
				],
				tableData: [],
				info: {},
				toDataPropertyColumn: [{
						prop: 'propertyClassifyStr',
						label: this.$t('auditInfo.priceStrategyInfo.toDataPropertyColumn.propertyClassifyStr'),
					},
					{
						prop: 'propertyValue',
						label: this.$t('auditInfo.priceStrategyInfo.toDataPropertyColumn.propertyValue'),
					},
					{
						prop: 'price',
						label: this.$t('auditInfo.priceStrategyInfo.toDataPropertyColumn.price'),
					},
					{
						prop: 'state',
						label: this.$t('auditInfo.priceStrategyInfo.toDataPropertyColumn.state'),
						slot:'state'
					}
				],
				toDataProperty: []
			}
		},
		created() {
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
				} = await priceStrategyFindById({
					id
				})
				if (res) {
					this.info = res
					this.toDataProperty = res.priceStrategyPropertyList
					await this.getGoodsFindList(res.goodsIdStr)
				}
			},
			unique(arr, key) {
			    const map = new Map()
			    return arr.filter((item) => !map.has(item[key] + '') && map.set(item[key] + '', 1))
			},
			// 获取调价商品
			async getGoodsFindList(goodsIdStr) {
				const {
					returnValue: res
				} = await goodsFindList({
					goodsIdStr
				})
				let goodsArr = []
				res.forEach((item,index)=>{
					goodsArr.push({goodsId:item.goodsId})
				})
				goodsArr = this.unique(goodsArr,'goodsId')
				res.forEach((item,index)=>{
					goodsArr.forEach((val,key)=>{
						if((item.goodsId == val.goodsId) && !val.child){
							goodsArr[key] = item
							goodsArr[key].child = []
						}else if(item.goodsId == val.goodsId){
							goodsArr[key].child.push(item)
						}
					})
				})
				this.tableData = goodsArr
			},
		}
	}
</script>
<style lang="scss" scoped>
	.org-box {
		margin: 10px;
	}
</style>
