<template>
	<view>
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs activeStyle="color:rgb(42, 130, 228)" :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
					@change="changeTabs"></u-tabs>
			</view>
		</view>
		<view class="basic" v-show="current == 0">
			<description-list :title="$t('auditInfo.couponInfo.basicTle')">
				<description :label="$t('auditInfo.couponInfo.classifyName')">{{ info.classifyName }}</description>
				<description :label="$t('auditInfo.couponInfo.couponName')">{{ info.couponName }}</description>
				<description :label="$t('auditInfo.couponInfo.orgName')">{{ info.orgName }}</description>
				<description :label="$t('auditInfo.couponInfo.couponType')">{{ info.couponType | couponType }}</description>
				<description :label="$t('auditInfo.couponInfo.couponNum')">{{ info.couponNum }}</description>
				<description :label="$t('auditInfo.couponInfo.couponMoney')">{{ info.couponMoney }}</description>
				<description :label="$t('auditInfo.couponInfo.drawPropertyNames')">{{ info.drawPropertyNames }}</description>
				<description :label="$t('auditInfo.couponInfo.receiveNum')">{{ info.receiveNum }}</description>
				<description :label="$t('auditInfo.couponInfo.validType')">{{ info.validType | validType }}</description>
				<description v-if="info.validType === 1" :label="$t('auditInfo.couponInfo.vaildStartTime')">{{ info.vaildStartTime | dayjs }} - {{ info.vaildStartTime | dayjs }}</description>
				<description v-if="info.validType === 2" :label="$t('auditInfo.couponInfo.vaildDay')">{{ info.vaildDay }}</description>
				<description :label="$t('auditInfo.couponInfo.useGoodsType')">{{ info.useGoodsType | useGoodsType }}</description>
				<description :label="$t('auditInfo.couponInfo.useType')">{{ info.useType | useType }}</description>
				<description v-if="info.useType === 2" :label="$t('auditInfo.couponInfo.classifyName')">满 {{ info.reduceMoney }} 元可用</description>
			</description-list>
			<description-list v-if="info.useGoodsType === 2" :title="$t('auditInfo.couponInfo.goodsTle')">
				<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
			</description-list>
		</view>
		<view class="basic" v-show="current == 1">
			<coupon-detail-list :edit-id="editId"></coupon-detail-list>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		couponFindById
	} from '@/api/lpgSalesManageApi'
	import CouponDetailList from './couponDetailList'
	export default {
		name: 'CouponInfo',
		components: {
			CouponDetailList
		},
		// 过滤器
		filters: {
			couponType(value) {
				const stateObj = that.$t('auditInfo.couponInfo.couponTypeTxt')
				return stateObj[value] || ''
			},
			validType(value) {
				const stateObj = that.$t('auditInfo.couponInfo.validTypeTxt')
				return stateObj[value] || ''
			},
			useType(value) {
				const stateObj = that.$t('auditInfo.couponInfo.useTypeTxt')
				return stateObj[value] || ''
			},
			useGoodsType(value) {
				const stateObj = that.$t('auditInfo.couponInfo.useGoodsTypeTxt')
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
				busMenu: this.$t('auditInfo.couponInfo.tabs'),
				info: {},
				tableColumn: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.couponInfo.tableColumn.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.couponInfo.tableColumn.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.couponInfo.tableColumn.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.couponInfo.tableColumn.goodsClassifyName')
					}
				],
				tableData: []
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
			// 切换tabs
			changeTabs(e) {
				this.current = e.index
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await couponFindById({
					id
				})
				if (res) {
					this.tableData = res.goodsVoList
					this.info = res
				}
			}
		}

	}
</script>
<style lang="scss" scoped>
</style>
