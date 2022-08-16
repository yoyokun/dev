<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.PurGoodTankCarHouseInfo.basicTle')">
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.inDate')">{{ info.inDate | dayjs('YYYY-MM-DD') }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.orderOrgName')">{{ info.orderOrgName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.takeManagerName')">{{ info.takeManagerName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.supplierName')">{{ info.supplierName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.supplyName')">{{ info.supplyName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.takeType')">{{ info.takeType | takeType }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.vehicleNum')">{{ info.vehicleNum }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.transportName')">{{ info.transportName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.license')">{{ info.license }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.vehicleDriverName')">{{ info.vehicleDriverName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.escortName')">{{ info.escortName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.inoutReasonName')">{{ info.inoutReasonName }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.remarks')">{{ info.remarks }}</description>
			<description :label="$t('auditInfo.PurGoodTankCarHouseInfo.attachment')">
				<view class="down-list" v-for="(item,index) in info.attachment" :key="item.id">
					<text>{{ index+1 }}.{{ item.name }}</text>
					<text
						@click="downFile(item.url)">{{$t('auditInfo.PurGoodTankCarHouseInfo.downloadTxt')}}</text>
				</view>
			</description>
		</description-list>
		<description-list :title="$t('auditInfo.PurGoodTankCarHouseInfo.tableTle')">
			<us-table :table-column="tableColumn" :table-data="purInStorageGoods"></us-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		purInStorageFindById
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util'
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

</style>
