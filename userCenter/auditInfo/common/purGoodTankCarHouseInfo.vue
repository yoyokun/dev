<template>
	<view class="audit-info-content">
		<view class="basic">
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.basicTle')}}</view>
				<view class="basic-box">
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.billNo')}}</view>
						<view class="desc">{{info.billNo}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.inDate')}}</view>
						<view class="desc">{{info.inDate | dayjs('YYYY-MM-DD')}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.orderOrgName')}}</view>
						<view class="desc">{{info.orderOrgName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.takeManagerName')}}</view>
						<view class="desc">{{info.takeManagerName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.supplierName')}}</view>
						<view class="desc">{{info.supplierName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.supplyName')}}</view>
						<view class="desc">{{info.supplyName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.takeType')}}</view>
						<view class="desc">{{info.takeType | takeType}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.vehicleNum')}}</view>
						<view class="desc">{{info.vehicleNum}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.transportName')}}</view>
						<view class="desc">{{info.transportName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.license')}}</view>
						<view class="desc">{{info.license}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.vehicleDriverName')}}</view>
						<view class="desc">{{info.vehicleDriverName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.escortName')}}</view>
						<view class="desc">{{info.escortName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.inoutReasonName')}}</view>
						<view class="desc">{{info.inoutReasonName}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.remarks')}}</view>
						<view class="desc">{{info.remarks}}</view>
					</view>
					<view class="item">
						<view class="tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.attachment')}}</view>
						<view class="desc">
							<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
								<text>{{ index+1 }}.{{ item.name }}</text>
								<text @click="downFile(item.url)">{{$t('auditInfo.PurGoodTankCarHouseInfo.downloadTxt')}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="basic-item">
				<view class="basic-tle">{{$t('auditInfo.PurGoodTankCarHouseInfo.tableTle')}}</view>
				<view class="basic-box">
					<UTable :table-column="tableColumn" :table-data="purInStorageGoods"></UTable>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		purInStorageFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util.js'
	export default {
		name: 'PurGoodTankCarHouseInfo',
		components: {},
		// 过滤器
		filters: {
			takeType(value) {
				const stateObj = that.$t('auditInfo.PurGoodTankCarHouseInfo.takeTypeTxt')
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
						prop: 'goodsName',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.goodsName')
					},
					{
						prop: 'goodsNo',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.goodsNo')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.standardName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.goodsClassifyName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.propertyNames')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.unitsName')
					},
					{
						prop: 'amount',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.amount')
					},
					{
						prop: 'auditNum',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.auditNum')
					},
					{
						prop: 'inStorageNum',
						label: this.$t('auditInfo.PurGoodTankCarHouseInfo.tableColumn.inStorageNum')
					}
				],
				purInStorageGoods: [] // 商品
			}
		},
		computed: {

		},
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
				} = await purInStorageFindById({
					id
				})
				if (res) {
					res.attachment = res.attachment.length ? JSON.parse(res.attachment) : []
					this.info = res
					this.purInStorageGoods = res.purInStorageGoods
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
	.down-list{
		text:first-child{
			margin-right: 10rpx;
		}
		text:last-child{
			color: #2979ff;
			cursor: pointer;
		}
	}
</style>
