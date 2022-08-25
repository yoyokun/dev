<template>
	<view class="policy-content">
		<description-list :title="$t('auditInfo.priceCustomerInfo.goodsTle')">
			<us-table :table-column="tableColumnGoodsInfo" :table-data="tableDataGoodsInfo"></us-table>
		</description-list>
		<description-list :title="$t('auditInfo.priceCustomerInfo.ployTle')">
			<us-table :table-column="tableColumnStrategy" :table-data="tableDataStrategy">
				<!-- #ifdef H5 || APP-PLUS -->
				<view slot="customerPriceState" slot-scope="row">
					{{ row.data.customerPriceState | customerPriceState }}
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-->
				<view slot="customerPriceState" slot-scope="{row}">
					{{ row.data.customerPriceState | customerPriceState }}
				</view>
				<!-- #endif -->
			</us-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		priceStrategyFindCustomerSalesPriceList,
		priceStrategyUpdateCustomerPriceStrategyState
	} from '@/api/lpgManageAppApi'

	export default {
		name: 'PolicyConfiguration',
		components: {},
		// 过滤器
		filters: {
			customerPriceState(value) {
				const stateObj = that.$t('auditInfo.priceCustomerInfo.customerPriceStateTxt')
				return stateObj[value] || ''
			}
		},
		props: {
			editId: {
				type: String,
				default: ''
			},
			tableDataGoodsInfo: {
				type: Array,
				default: () => {
					return []
				}
			},
			priceStrategyInfo: {
				type: Array,
				default: () => {
					return []
				}
			},
			isCache: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				tableColumnGoodsInfo: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.unitsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.propertyNames')
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoodsInfo.listPrice')
					}
				], // 配置表头
				tableColumnStrategy: [{
						prop: 'strategyNo',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.strategyNo')
					},
					{
						prop: 'strategyName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.strategyName'),
					},
					{
						prop: 'linkValue',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.linkValue'),
					},
					{
						prop: 'strategyValue',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.strategyValue')
					},
					{
						prop: 'curListPrice',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.curListPrice')
					},
					{
						prop: 'customerPriceState',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnStrategy.customerPriceState'),
						slot: 'customerPriceState'
					}
				],
				tableDataStrategy: []
			}
		},
		async created() {
			that = this
			await this.getStrategy(this.editId, this.tableDataGoodsInfo[0].goodsDetailId)
		},
		methods: {
			// 配置
			async getStrategy(customerId, goodsDetailId) {
				const {
					returnValue: res
				} = await priceStrategyFindCustomerSalesPriceList({
					customerId: customerId,
					goodsDetailId: goodsDetailId
				})
				if (res) {
					res.forEach(v => {
						if (v.priceType !== 'total') {
							v.linkValue = v.propertyClassifyStr + ':' + v.propertyValue
							v.strategyValue = v.priceType === 'add' ? this.$t('auditInfo.priceCustomerInfo.strategy.add') : (v.priceType === 'fixed' ? this.$t('auditInfo.priceCustomerInfo.strategy.fixed') : this.$t('auditInfo.priceCustomerInfo.strategy.other')) + ':' + v.price
						} else {
							v.strategyValue = this.$t('auditInfo.priceCustomerInfo.strategy.total') + ':'
						}
					})
					if (this.isCache) {
						// 缓存数据
						res.forEach(v => {
							this.priceStrategyInfo.forEach(m => {
								if (v.id === m.strategyPropertyId) {
									// 填充缓存数据
									v.customerPriceState = m.customerPriceState
								}
							})
						})
					}
					console.log(res)
					this.tableDataStrategy = res
				}
			},
			// 关闭的回调
			close() {
				this.$emit('dialogCancel')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.policy-content {
		width: 690rpx;
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
