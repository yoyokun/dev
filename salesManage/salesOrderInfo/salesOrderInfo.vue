<template>
	<view>
		<view class="tab">
			<u-tabs :scrollable="false" :list="tabSwitch" :current="current" @click="onTabSwitch" lineWidth="60"
				lineColor="#2A82E4" :activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}" :inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}" itemStyle="height: 45px;padding: 0 4px;"></u-tabs>
		</view>
		<view class="container" v-show="current==0">
			<view class="customerBox">
				<view class="title" @click="isShow = !isShow">
					<text class="name">基础信息</text>
					<u-icon v-if="isShow" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow">
					<description-list>
						<description :label="'订单编号'">{{ info.billNo }}</description>
						<description :label="'订单来源'">{{ info.orderSource | orderSource }}</description>
						<description :label="'订单金额'">{{ info.goodsTotalMoney }}</description>
						<description :label="'收费项金额'">{{ info.payItemsMoney }}</description>
						<description :label="'优惠金额'">{{ info.couponTotalMoney }}</description>
						<description :label="'应收金额'">{{ info.totalMoney }}</description>
						<description :label="'订单状态'">{{ info.orderState | orderState }}</description>
						<description :label="'物流状态'">{{ info.deliveryState | deliveryState }}</description>
						<description :label="'支付状态'">{{ info.payState | payState }}</description>
						<description :label="'支付类型'">{{ info.payType | payType }}</description>
						<description :label="'支付方式'">{{ info.payTypeName }}</description>
						<description :label="'销售时间'">{{ info.orderTime | dayjs }}
						</description>
						<description :label="'制单时间'">{{ info.createTime | dayjs }}</description>
						<description :label="'完成时间'">{{ info.finishTime | dayjs }}
						</description>
						<description :label="'操作时间'">{{ info.operationTime | dayjs }}
						</description>
						<description :label="'备注信息'">{{ info.remarks }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow1 = !isShow1">
					<text class="name">客户信息</text>
					<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow1">
					<description-list>
						<description :label="'客户编号'">{{ info.customerNo }}</description>
						<description :label="'客户名称'">{{ info.customerName }}</description>
						<description :label="'客户电话'">{{ salesOrderExtend.customerPhone }}</description>
						<description :label="'会员编号'">{{ salesOrderExtend.customerAccount }}</description>
						<description :label="'客户分类'">{{ salesOrderExtend.customerClassify | customerClassify }}
						</description>
						<description :label="'客户区域'">{{ salesOrderExtend.regionName }}</description>
						<description :label="'客户类型'">{{ salesOrderExtend.customerTypeName }}</description>
						<description :label="'客户标签'">{{ salesOrderExtend.propertyNames }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow2 = !isShow2">
					<text class="name">运输信息</text>
					<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow2">
					<description-list>
						<description :label="'提货方式'">{{ salesOrderTransport.pickMode | pickMode }}</description>
						<description :label="'预约时间'">{{ salesOrderTransport.bookingTime | dayjs }}</description>
						<description :label="'车牌号'">
							{{ (salesOrderTransport.pickMode !==1 && salesOrderTransport.pickMode !==4) ? salesOrderTransport.licenseNo : '' }}
						</description>
						<description :label="'收货人'">{{ salesOrderTransport.linkman }}</description>
						<description :label="'收货电话'">{{ salesOrderTransport.phone }}</description>
						<description :label="'收货地址'">{{ salesOrderTransport | addressSplicing }}</description>
						<description :label="'配送组织'">
							{{ salesOrderTransport.pickMode === 4 ? salesOrderTransport.deliverOrgName : '' }}
						</description>
						<description :label="'配送员/运输员'">
							{{ (salesOrderTransport.pickMode === 3 || salesOrderTransport.pickMode === 4) ? salesOrderTransport.deliverMan : '' }}
						</description>
						<description :label="'费用详细'">{{ info.payItemsName }}</description>
						<description :label="'合计运费'">{{ info.payItemsMoney }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow3 = !isShow3">
					<text class="name">订单折扣</text>
					<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow3">
					<description-list>
						<description :label="'优惠券号'">{{ info.coupon ? info.coupon.couponNo : '' }}</description>
						<description :label="'优惠券金额'">{{ info.couponMoney }}</description>
						<description :label="'抵扣积分'">{{ info.integralValue }}</description>
						<description :label="'抵扣积分金额'">{{ info.integralMoney }}</description>
						<description :label="'折扣金额'">{{ info.disCountMoney }}</description>
						<description :label="'折扣率（%）'">{{ info.disCountRate }}%</description>
						<description :label="'合计优惠'">{{ info.couponTotalMoney }}</description>
						<description :label="'成交金额（元）'">{{ info.totalMoney }}</description>
					</description-list>
				</view>
			</view>
			<view class="btn">
				<u-button :text="$t('common.btn.edit')" type="primary" hairline shape="circle" @click="submitForm">
				</u-button>
			</view>
		</view>
		<view class="container" v-show="current==1">
			<view class="customerBox">
				<view class="title">
					<text class="name">订单信息</text>
				</view>
				<view class="content">
					<description-list v-for="item in salesOrderDetailList" :key="item.id">
						<view class="basic-tle">{{item.billName}}
							<text
								class="tip-tle">{{$t('auditInfo.salesOrdersInfo.orderNums')}}：{{ item.subBillNo }}</text>
						</view>
						<us-table :table-column="item.printSetVo.tableColumn"
							:table-data="item.salesOrderDetailGoodsList || []"></us-table>
					</description-list>
					<description-list v-if="salesOrderPayitemsList.length"
						:title="$t('auditInfo.salesOrdersInfo.costMoney')">
						<description v-for="(item,index) in salesOrderPayitemsList" :key="item.id"
							:label="item.payItemsName">
							{{ item.payItemsMoney }},{{$t('auditInfo.salesOrdersInfo.totalUnit')}}{{item.payItemsTotalMoney}}
						</description>
						<view class="p-20">
							<total :info-data="infoData"></total>
						</view>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==2">
			<view class="customerBox">
				<view class="title">
					<text class="name">回瓶信息</text>
				</view>
				<view class="content">
					<description-list>
						<us-table :table-column="tableColumnBack" :table-data="salesOrderBackDetailList || []">
						</us-table>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==3">
			<view class="customerBox">
				<view class="title">
					<text class="name">溯源信息</text>
				</view>
				<view class="content">
					<description-list v-if="editId" :title="$t('auditInfo.salesOrdersInfo.sendTle')">
						<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
					</description-list>
					<description-list v-if="editId" :title="$t('auditInfo.salesOrdersInfo.recycleTle')">
						<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
					</description-list>
				</view>
			</view>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		salesOrderFindById
	} from '@/api/lpgSalesManageApi'
	import ServiceCylinderInfo from '../../userCenter/auditInfo/common/serviceCylinderInfo'
	export default {
		// 过滤器
		filters: {
			orderState(value) {
				const stateObj = {
					1: '待支付',
					2: '已结算',
					3: '已完成',
					4: '已关闭',
					5: '已作废 '
				}
				return stateObj[value] || ''
			},
			customerClassify(value) {
				const stateObj = {
					1: '居民',
					2: '非居民'
				}
				return stateObj[value] || ''
			},
			payState(value) {
				const stateObj = {
					1: '待支付',
					2: '已支付',
					3: '已取消'
				}
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = {
					1: '自提',
					2: '车辆自提',
					3: '车辆配送',
					4: '送气员配送'
				}
				return stateObj[value] || ''
			},
			payType(value) {
				const stateObj = {
					1: '线上支付',
					2: '线下支付',
					3: '线下支付 '
				}
				return stateObj[value] || ''
			},
			deliveryState(value) {
				const stateObj = {
					1: '待接单',
					2: '待发货',
					3: '配送中',
					4: '已送达'
				}
				return stateObj[value] || ''
			},
			orderSource(value) {
				const stateObj = {
					store: '门店',
					internet: '网上',
					phone: '电话至门店',
					callCenter: '客服中心'
				}
				return stateObj[value] || ''
			}
		},
		components: {
			ServiceCylinderInfo
		},
		data() {
			return {
				tabSwitch: [{
					name: '基本信息'
				}, {
					name: '订单信息'
				}, {
					name: '回瓶信息'
				}, {
					name: '溯源信息'
				}],
				current: 0,
				isShow: true,
				isShow1: true,
				isShow2: true,
				isShow3: true,
				info: {},
				salesOrderTransport: {},
				salesOrderExtend: {},
				salesOrderDetailList: [],
				salesOrderPayitemsList: [],
				tableColumnBack: [{
						prop: 'goodsName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.goodsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.propertyNames')
					},
					{
						prop: 'standardName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.unitsName')
					},
					{
						prop: 'totalNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.totalNum')
					},
					{
						prop: 'backNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.backNum')
					},
					{
						prop: 'lendNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.lendNum')
					},
					{
						prop: 'returnNum',
						label: this.$t('auditInfo.salesOrdersInfo.tableColumnBack.returnNum')
					}
				],
				infoData: [{
						name: '合计收费项(元)',
						value: '0',
						type: 'money'
					},
					{
						name: '合计订单金额(元)',
						value: '0',
						type: 'money'
					},
					{
						name: '优惠金额(元)',
						value: '0',
						type: 'money'
					},
					{
						name: '应收金额(元)',
						value: '0',
						type: 'money'
					}
				]
			}
		},
		async onLoad(options) {
			this.editId = options.editId||''
			if (options.editId) {
				this.getInfo(options.editId)
			}

		},
		onShow() {},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await salesOrderFindById({
					id
				})
				if (res) {
					const payTypeName = []
					const payItemsName = []
					// 结算信息
					res.salesOrderPayDetailList.forEach((v) => {
						payTypeName.push(`${v.collectionTypeName}:${v.payMoney}`)
					})
					res.payTypeName = payTypeName.join(',')
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.info = res
					this.salesOrderTransport = res.salesOrderTransport
					res.salesOrderDetailList.forEach((v) => {
						v.salesOrderDetailGoodsList.forEach((o) => {
							o.goodsPath = o.goodsPath.length ? (JSON.parse(o.goodsPath).length ? JSON
								.parse(o.goodsPath)[0].url : '') : ''
							o.assistUnitsList.forEach((n, j) => {
								v.printSetVo.tableColumn.forEach(m => {
									if (m.propValue === 'assistName-' + n
										.assistUnitsId) {
										o[m.propValue] = n.netContent
									}
									if (m.propValue === 'netContent-' + n
										.assistUnitsId) {
										o[m.propValue] = n.netContent
									}
								})
							})
						})
						v.salesOrderDetailGoodsList.push({
							amount: v.fillingNum,
							totalMoney: v.totalMoney,
							totalWeight: v.totalWeight,
							goodsName: '',
							propertyNames: '',
							unitsName: '合计',
							unitPrice: '',
							remarks: ''
						})
					})
					this.salesOrderDetailList = res.salesOrderDetailList
					this.salesOrderBackDetailList = res.salesOrderBackDetailList
					this.salesOrderExtend = res.salesOrderExtend
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
					this.infoData[0].value = res.payItemsMoney
					this.infoData[1].value = res.goodsTotalMoney
					this.infoData[2].value = res.couponTotalMoney
					this.infoData[3].value = res.totalMoney
				}
			},
			// 切换
			onTabSwitch(item) {
				this.current = item.index
			},
		},
		options: {
			styleIsolation: 'shared'

		}
	}
</script>

<style lang="scss" scoped>
	.basic-tle {
		padding: 0 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		border-bottom: 1px solid #eee;
	}

	.tip-tle {
		font-size: 26rpx;
		color: #999;
		font-weight: normal;
		margin-left: 20rpx;
	}

	::v-deep .u-form-item .u-line {
		border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
	}

	.container {
		padding-top: 48px;
	}

	.customerBox {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		margin: 20rpx 20rpx 10rpx 20rpx;

		.title {
			@include flexMixin();
			padding: 0rpx 10rpx;

			.name {
				font-size: 36rpx;
				font-weight: 500;
				line-height: 80rpx;

				&:before {
					display: inline-block;
					content: " ";
					width: 8rpx;
					height: 35rpx;
					background: rgba(42, 130, 228, 1);
					border-radius: 20rpx;
					top: 4rpx;
					margin-right: 10rpx;
					position: relative;
				}
			}
		}

		.content {
			border-top: 0.5rpx solid #f1eeee;
		}

		::v-deep .u-upload__button {
			margin: 0rpx;
		}
	}

	.btn {
		width: 632rpx;
		margin: 40rpx auto;
		@include flexMixin(column);

		.u-button {
			margin: 20rpx 10rpx;
		}
	}
</style>
