<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.priceCustomerInfo.basicTle')">
			<description :label="$t('auditInfo.priceCustomerInfo.customerNo')">{{ info.customerNo }}</description>
			<description :label="$t('auditInfo.priceCustomerInfo.customerName')">{{ info.customerName }}</description>
			<description :label="$t('auditInfo.priceCustomerInfo.typeName')">{{ checkInfo.typeName }}</description>
			<description :label="$t('auditInfo.priceCustomerInfo.regionName')">{{ checkInfo.regionName }}</description>
			<description :label="$t('auditInfo.priceCustomerInfo.propertyNames')">{{ checkInfo.propertyNames }}
			</description>
			<description :label="$t('auditInfo.priceCustomerInfo.salePropertyNames')">{{ checkInfo.salePropertyNames }}
			</description>
		</description-list>
		<description-list :title="$t('auditInfo.priceCustomerInfo.customTle')">
			<us-table :table-column="tableColumnGoods" :table-data="tableDataGoods">
				<!-- #ifdef H5 || APP-PLUS -->
				<view slot="unitsName" slot-scope="row">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.unitsName}}
					</view>
				</view>
				<view slot="propertyNames" slot-scope="row">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.propertyNames}}
					</view>
				</view>
				<view slot="listPrice" slot-scope="row">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.listPrice}}
					</view>
				</view>
				<view slot="unitPrice" slot-scope="row">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.unitPrice}}
					</view>
				</view>
				<view slot="act" slot-scope="row">
					<view class="custom-slot action" v-for="(item,index) in row.data.child" :key="index">
						<u-button type="success" plain size="mini" @click="showInfo(row.data)">配置</u-button>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-->
				<view slot="unitsName" slot-scope="{row}">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.unitsName}}
					</view>
				</view>
				<view slot="propertyNames" slot-scope="{row}">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.propertyNames}}
					</view>
				</view>
				<view slot="listPrice" slot-scope="{row}">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.listPrice}}
					</view>
				</view>
				<view slot="listPrice" slot-scope="{row}">
					<view class="custom-slot" v-for="(item,index) in row.data.child" :key="index">
						{{item.listPrice}}
					</view>
				</view>
				<view slot="act" slot-scope="{row}">
					<view class="custom-slot action" v-for="(item,index) in row.data.child" :key="index">
						<u-button type="success" plain size="mini" @click="showInfo(row.data)">配置</u-button>
					</view>
				</view>
				<!-- #endif -->
			</us-table>
		</description-list>
		<u-popup mode="center" closeable :show="show" @close="close">
			<policy-configuration :edit-id="editId" :is-cache="true"
				:price-strategy-info="priceStrategyInfo" :table-data-goods-info="tableDataGoodsInfo" />
		</u-popup>
	</view>
</template>
<script>
	import {
		goodsFindList,
		userCustomerfindByIdDefault
	} from '@/api/lpgManageAppApi'
	import PolicyConfiguration from './policyConfiguration'
	export default {
		name: 'CouponInfo',
		components: {
			PolicyConfiguration
		},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				show:false,
				info: {},
				checkInfo: {},
				tableColumnGoods: [{
						prop: 'goodsNo',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.goodsNo')
					},
					{
						prop: 'goodsName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.goodsName')
					},
					{
						prop: 'brandName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.brandName')
					},
					{
						prop: 'goodsClassifyName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.goodsClassifyName')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.unitsName'),
						slot: 'unitsName'
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.propertyNames'),
						slot: 'propertyNames'
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.listPrice'),
						slot: 'listPrice'
					},
					{
						prop: 'unitPrice',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.unitPrice'),
						slot: 'unitPrice'
					},
					{
						prop: 'act',
						label: this.$t('auditInfo.priceCustomerInfo.tableColumnGoods.act'),
						slot: 'act'
					}
				],
				tableDataGoods: [], // 商品列表
				tableDataGoodsInfo: [], // 配置数据
				priceStrategyInfo: [] // 配置缓存数据
			}
		},
		computed: {},
		mounted() {
			this.$nextTick(() => {
				if (this.editId) {
					// 编辑
					this.getInfo(this.editId)
				}
			})
		},
		methods: {
			close(){
				this.show = false
			},
			unique(arr, key) {
				const map = new Map()
				return arr.filter((item) => !map.has(item[key] + '') && map.set(item[key] + '', 1))
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await userCustomerfindByIdDefault({
					id
				})
				if (res) {
					if (res.userSettlement.checkState === 1 || res.userSettlement.checkState === 2) {
						// 1 待提交 2 待审核 读取缓存数据
						const checkInfo = JSON.parse(res.userSettlement.checkInfo)
						this.checkInfo = checkInfo
						this.priceStrategyInfo = checkInfo.priceStrategyInfo
					}
					this.info = res
					const propertyIds = res.userSettlement.propertyIds.length ? res.userSettlement.propertyIds.Split(
						',') : ''
					const salePropertyIds = res.userSettlement.salePropertyIds.length ? res.userSettlement
						.salePropertyIds.Split(',') : ''
					await this.getGoodList(propertyIds, salePropertyIds, res.userSettlement.typeId, res.userSettlement
						.regionId)
				}
			},
			// 配置
			showInfo(val) {
				this.tableDataGoodsInfo = [val]
				this.show = true
			},
			// 查询商品
			async getGoodList(propertyIds, salePropertyIds, typeId, regionId) {
				const id = []
				id.push(propertyIds)
				id.push(salePropertyIds)
				id.push(typeId)
				id.push(regionId)
				// 过滤 null 空 undefined
				const newArr = id.filter(item => item)
				// 查询 标签 已上架 客户报价显示的商品
				const {
					returnValue: res
				} = await goodsFindList({
					isShowCustomerPrice: true,
					customerId: this.editId,
					propertyIdStr: [...new Set(newArr)].join(','),
					state: 4
				})
				// 计算合并的行
				let goodsArr = []
				res.forEach((item, index) => {
					goodsArr.push({
						goodsId: item.goodsId
					})
				})
				goodsArr = this.unique(goodsArr, 'goodsId')
				res.forEach((item, index) => {
					goodsArr.forEach((val, key) => {
						if ((item.goodsId == val.goodsId) && !val.child) {
							goodsArr[key] = item
							goodsArr[key].child = [item]
						} else if (item.goodsId == val.goodsId) {
							goodsArr[key].child.push(item)
						}
					})
				})
				this.tableDataGoods = goodsArr
			},
		}

	}
</script>
<style lang="scss" scoped>
	.custom-slot {
		height: 60rpx;
		line-height: 60rpx;

		&.action {
			line-height: auto;
			display: flex;
			align-items: center;
		}
	}
</style>
