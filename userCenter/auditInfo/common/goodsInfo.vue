<template>
	<view class="business-info">
		<view class="audit-info-content">
			<view class="tabs">
				<view class="tabs-content">
					<u-tabs :scrollable="false" :list="busMenu" :current="current" :itemStyle="{flex:'1',height:'44px'}"
						@change="changeTabs"></u-tabs>
				</view>
			</view>
			<view class="basic" v-show="current == 0">
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.basicTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.goodsClassifyName')}}</view>
							<view class="desc">{{ info.goodsClassifyName }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.goodsNo')}}</view>
							<view class="desc">{{ info.goodsNo }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.goodsName')}}</view>
							<view class="desc">{{ info.goodsName }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.brandName')}}</view>
							<view class="desc">{{ info.brandName }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.orgName')}}</view>
							<view class="desc">{{ info.orgName }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.sortNo')}}</view>
							<view class="desc">{{ info.sortNo }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.remarks')}}</view>
							<view class="desc">{{ info.remarks }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.goodsPath')}}</view>
							<view class="desc">
								<image class="img" v-for="item in info.goodsPath" :key="item.id" :src="item.url">
								</image>
							</view>
						</view>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.markTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.virtualSales')}}</view>
							<view class="desc">{{ info.virtualSales }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.businessTagName')}}</view>
							<view class="desc">{{ info.businessTagName }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.isShowCustomerPrice')}}</view>
							<view class="desc">
								{{ info.isShowCustomerPrice?$t('auditInfo.goodsInfo.isShowCustomerPriceTxt')[0]:$t('auditInfo.goodsInfo.isShowCustomerPriceTxt')[1] }}
							</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.isShowInter')}}</view>
							<view class="desc">
								{{ info.isShowInter?$t('auditInfo.goodsInfo.isShowInterTxt')[0]:$t('auditInfo.goodsInfo.isShowInterTxt')[1] }}
							</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.isCostTag')}}</view>
							<view class="desc">
								{{ info.isCostTag?$t('auditInfo.goodsInfo.isCostTagTxt')[0]:$t('auditInfo.goodsInfo.isCostTagTxt')[1] }}
							</view>
						</view>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.moneyTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.taxRate')}}</view>
							<view class="desc">{{ info.taxRate }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.saleRate')}}</view>
							<view class="desc">{{ info.saleRate }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.computMethod')}}</view>
							<view class="desc">{{ info.computMethod | computMethod }}</view>
						</view>
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.staffPre')}}</view>
							<view class="desc">{{ info.staffPre }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="basic" v-show="current == 1">
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.unitTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.unitsName')}}</view>
							<view class="desc">{{ info.unitsName }}</view>
						</view>
						<UTable :table-column="tableColumnAssist" :table-data="info.assistUnitsList">
						</UTable>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.stockTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.stockWarn')}}</view>
							<view class="desc">{{ info.stockWarn | stockWarn }}</view>
						</view>
						<block v-if="info.stockWarn">
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.stockWarnValue')}}</view>
								<view class="desc">{{ info.stockWarnValue }}</view>
							</view>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.stockSendType')}}</view>
								<view class="desc">{{ info.stockSendType | stockSendType }}</view>
							</view>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.stockSendName')}}</view>
								<view class="desc">{{ info.stockSendName }}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="basic-item">
					<view class="basic-tle">{{$t('auditInfo.goodsInfo.priceTle')}}</view>
					<view class="basic-box">
						<view class="item">
							<view class="tle">{{$t('auditInfo.goodsInfo.isMorePrice')}}</view>
							<view class="desc">{{ info.isMorePrice ? $t('auditInfo.goodsInfo.isMorePriceTxt')[0] : $t('auditInfo.goodsInfo.isMorePriceTxt')[1] }}</view>
						</view>
						<block v-if="!info.isMorePrice">
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.standardName')}}</view>
								<view class="desc">{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?info.goodsDetailVoList[0].standardName:'' }}</view>
							</view>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.listPrice')}}</view>
								<view class="desc">{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].listPrice):'' }}</view>
							</view>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.costPrice')}}</view>
								<view class="desc">{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].costPrice):'' }}</view>
							</view>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.curStock')}}</view>
								<view class="desc">{{ info.goodsDetailVoList&&info.goodsDetailVoList.length?parseFloat(info.goodsDetailVoList[0].curStock):'' }}</view>
							</view>
						</block>
						<block v-else>
							<view class="item">
								<view class="tle">{{$t('auditInfo.goodsInfo.toDataProperty')}}</view>
								<view class="desc">
									<view v-for="item in toDataProperty" :key="item.id">
									  <view>
										<view style="display: flex;align-items: center;" ><text>属性：</text><u-tag size="mini" :text="item.name" plain plainFill></u-tag></view>
										<view style="display: flex;margin-top: 10rpx;">
											<u-tag v-for="itemBox in item.children" :key="itemBox.id" size="mini" type="success" :text="itemBox.name" plain plainFill></u-tag>
										</view>
									  </view>
									</view>
								</view>
							</view>
							<UTable :table-column="tableColumnProperty" :table-data="info.goodsDetailVoList">
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
								
							</UTable>
						</block>
					</view>
				</view>
			</view>
			<view class="basic" v-show="current == 2">
				<view class="basic-item">
					<rich-text :nodes="info.content"></rich-text>
				</view>
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
	import UTable from './uTable'
	export default {
		name: 'ShopInfo',
		components: {
			UTable
		},
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
