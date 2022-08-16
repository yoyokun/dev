<template>
	<view>
		<view class="tabs">
			<view class="tabs-content">
				<u-tabs :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
					@change="changeTabs"></u-tabs>
			</view>
		</view>
		<view class="basic" v-show="current == 0">
			<description-list :title="$t('auditInfo.goodsInfo.basicTle')">
				<description :label="$t('auditInfo.goodsInfo.goodsClassifyName')">{{ info.goodsClassifyName }}
				</description>
				<description :label="$t('auditInfo.goodsInfo.goodsNo')">{{ info.goodsNo }}</description>
				<description :label="$t('auditInfo.goodsInfo.goodsName')">{{ info.goodsName }}</description>
				<description :label="$t('auditInfo.goodsInfo.brandName')">{{ info.brandName }}</description>
				<description :label="$t('auditInfo.goodsInfo.orgName')">{{ info.orgName }}</description>
				<description :label="$t('auditInfo.goodsInfo.sortNo')">{{ info.sortNo }}</description>
				<description :label="$t('auditInfo.goodsInfo.remarks')">{{ info.remarks }}</description>
				<description :label="$t('auditInfo.goodsInfo.goodsPath')">
					<image class="img" v-for="item in info.goodsPath" :key="item.id" :src="item.url">
				</description>
			</description-list>
			<description-list :title="$t('auditInfo.goodsInfo.markTle')">
				<description :label="$t('auditInfo.goodsInfo.virtualSales')">{{ info.virtualSales }}</description>
				<description :label="$t('auditInfo.goodsInfo.businessTagName')">{{ info.businessTagName }}</description>
				<description :label="$t('auditInfo.goodsInfo.isShowCustomerPrice')">
					{{ info.isShowCustomerPrice?$t('auditInfo.goodsInfo.isShowCustomerPriceTxt')[0]:$t('auditInfo.goodsInfo.isShowCustomerPriceTxt')[1] }}
				</description>
				<description :label="$t('auditInfo.goodsInfo.isShowInter')">
					{{ info.isShowInter?$t('auditInfo.goodsInfo.isShowInterTxt')[0]:$t('auditInfo.goodsInfo.isShowInterTxt')[1] }}
				</description>
				<description :label="$t('auditInfo.goodsInfo.isCostTag')">
					{{ info.isCostTag?$t('auditInfo.goodsInfo.isCostTagTxt')[0]:$t('auditInfo.goodsInfo.isCostTagTxt')[1] }}
				</description>
			</description-list>
			<description-list :title="$t('auditInfo.goodsInfo.moneyTle')">
				<description :label="$t('auditInfo.goodsInfo.taxRate')">{{ info.taxRate }}</description>
				<description :label="$t('auditInfo.goodsInfo.saleRate')">{{ info.saleRate }}</description>
				<description :label="$t('auditInfo.goodsInfo.computMethod')">{{ info.computMethod | computMethod }}
				</description>
				<description :label="$t('auditInfo.goodsInfo.staffPre')">{{ info.staffPre }}</description>
			</description-list>
		</view>
		<view class="basic" v-show="current == 1">
			<description-list :title="$t('auditInfo.goodsInfo.unitTle')">
				<description :label="$t('auditInfo.goodsInfo.unitsName')">{{ info.unitsName }}</description>
				<us-table :table-column="tableColumnAssist" :table-data="info.assistUnitsList"></us-table>
			</description-list>
			<description-list :title="$t('auditInfo.goodsInfo.stockTle')">
				<description :label="$t('auditInfo.goodsInfo.stockWarn')">{{ info.stockWarn | stockWarn }}</description>
				<block v-if="info.stockWarn">
					<description :label="$t('auditInfo.goodsInfo.stockWarnValue')">{{ info.stockWarnValue }}
					</description>
					<description :label="$t('auditInfo.goodsInfo.stockSendType')">
						{{ info.stockSendType | stockSendType }}
					</description>
					<description :label="$t('auditInfo.goodsInfo.stockSendName')">{{ info.stockSendName }}</description>
				</block>
			</description-list>
			<description-list :title="$t('auditInfo.goodsInfo.priceTle')">
				<description :label="$t('auditInfo.goodsInfo.isMorePrice')">
					{{ info.isMorePrice ? $t('auditInfo.goodsInfo.isMorePriceTxt')[0] : $t('auditInfo.goodsInfo.isMorePriceTxt')[1] }}
				</description>
				<block v-if="!info.isMorePrice">
					<description :label="$t('auditInfo.goodsInfo.standardName')">
						{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?info.goodsDetailVoList[0].standardName:'' }}
					</description>
					<description :label="$t('auditInfo.goodsInfo.listPrice')">
						{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].listPrice):'' }}
					</description>
					<description :label="$t('auditInfo.goodsInfo.costPrice')">
						{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].costPrice):'' }}
					</description>
					<description :label="$t('auditInfo.goodsInfo.curStock')">
						{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].curStock):'' }}
					</description>
				</block>
				<block v-else>
					<description :label="$t('auditInfo.goodsInfo.toDataProperty')">
						<view v-for="item in toDataProperty" :key="item.id">
							<view>
								<view style="display: flex;align-items: center;"><text>属性：</text>
									<u-tag size="mini" :text="item.name" plain plainFill></u-tag>
								</view>
								<view style="display: flex;margin-top: 10rpx;">
									<u-tag v-for="itemBox in item.children" :key="itemBox.id" size="mini" type="success"
										:text="itemBox.name" plain plainFill></u-tag>
								</view>
							</view>
						</view>
					</description>
					<us-table :table-column="tableColumnProperty" :table-data="info.goodsDetailVoList">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="state" slot-scope="row">
							{{ row.data.state | stateProperty }}
						</view>
						<view slot="curStock" slot-scope="row">
							{{ parseFloat(row.data.curStock) }}
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="state" slot-scope="{row}">
							{{ row.data.state | stateProperty }}
						</view>
						<view slot="curStock" slot-scope="{row}">
							{{ parseFloat(row.data.curStock) }}
						</view>
						<!-- #endif -->
					</us-table>
				</block>
			</description-list>
		</view>
		<view class="basic" v-show="current == 2">
			<view style="padding: 20rpx;">
				<rich-text :nodes="info.content"></rich-text>
			</view>
		</view>
	</view>
</template>
<script>
	let that = null
	import {
		goodsFindById
	} from '@/api/lpgManageAppApi'
	import {
		settingMixin
	} from '@/common/settingMixin'
	export default {
		name: 'ShopInfo',
		components: {},
		// 过滤器
		filters: {
			stateProperty(value) {
				const stateObj = that.$t('auditInfo.goodsInfo.statePropertyTxt')
				return stateObj[value] || ''
			},
			stockWarn(value) {
				const stateObj = that.$t('auditInfo.goodsInfo.stockWarnTxt')
				return stateObj[value] || ''
			},
			computMethod(value) {
				const stateObj = that.$t('auditInfo.goodsInfo.computMethodTxt')
				return stateObj[value] || ''
			},
			stockSendType(value) {
				const stateObj = that.$t('auditInfo.goodsInfo.stockSendTypeTxt')
				return stateObj[value] || ''
			}
		},
		mixins: [settingMixin],
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				current: 0, // tabs索引
				busMenu: this.$t('auditInfo.goodsInfo.tabs'),
				tableColumnAssist: [{
						prop: 'aliasName',
						label: this.$t('auditInfo.goodsInfo.tableColumnAssist.aliasName'),
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.goodsInfo.tableColumnAssist.unitsName'),
					},
					{
						prop: 'netContent',
						label: this.$t('auditInfo.goodsInfo.tableColumnAssist.netContent'),
					}
				], // 辅助单位
				toDataProperty: [], // 属性
				tableColumnProperty: [{
						prop: 'propertyValueStr',
						label: this.$t('auditInfo.goodsInfo.tableColumnProperty.propertyValueStr')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.goodsInfo.tableColumnProperty.standardName')
					},
					{
						prop: 'listPrice',
						label: this.$t('auditInfo.goodsInfo.tableColumnProperty.listPrice')
					},
					{
						prop: 'costPrice',
						label: this.$t('auditInfo.goodsInfo.tableColumnProperty.costPrice')
					},
					{
						prop: 'curStock',
						label: this.$t('auditInfo.goodsInfo.tableColumnProperty.curStock'),
						slot: 'curStock'
					},
					{
						prop: 'state',
						label: '参数状态',
						slot: 'state'
					}
				],
				info: {}
			}
		},
		async created() {
			that = this
		},
		mounted() {
			this.$nextTick(async () => {
				if (this.editId) {
					// 详情
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
				} = await goodsFindById({
					id
				})
				res.goodsPath = res.goodsPath.length ? JSON.parse(res.goodsPath) : []
				if (res.isMorePrice) {
					// 多属性价格
					await this.getPropertyClassifySelectPropertyBox({
						propertyDetails: res.propertyDetails
					})
					this.toDataProperty = this.arrayMerging(this.propertyClassifySelectProperty, '', [])
				}
				if (res) {
					this.info = res
				}
			},
			// 数组合并
			arrayMerging(res, name, childs) {
				res.forEach((v, i) => {
					if (v.type === 2) {
						// 属性下面有值
						const obj = {
							name: name + '/' + v.name,
							id: v.id,
							children: v.children,
							pid: v.pid,
							disabled: v.disabled
						}
						childs.push(obj)
					} else {
						const label = name ? name + '/' + v.name : v.name
						childs = this.arrayMerging(v.children, label, childs) // 获取子节点
					}
				})
				return childs
			}
		}
	}
</script>
<style lang="scss" scoped>
	.org-box {
		margin: 10px;
	}
</style>
