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
					<text class="name">{{$t('salesMg.salesOrderInfo.basicTle')}}</text>
					<u-icon v-if="isShow" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow">
					<description-list>
						<description :label="$t('salesMg.salesOrderInfo.billNo')">{{ info.billNo }}</description>
						<description :label="$t('salesMg.salesOrderInfo.orderSource')">
							{{ info.orderSource | orderSource }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.goodsTotalMoney')">{{ info.goodsTotalMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payItemsMoney')">{{ info.payItemsMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.totalMoney')">{{ info.totalMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.orderState')">{{ info.orderState | orderState }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.deliveryState')">
							{{ info.deliveryState | deliveryState }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payState')">{{ info.payState | payState }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payType')">{{ info.payType | payType }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payTypeName')">{{ info.payTypeName }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.orderTime')">{{ info.orderTime | dayjs }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.createTime')">{{ info.createTime | dayjs }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.finishTime')">{{ info.finishTime | dayjs }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.operationTime')">
							{{ info.operationTime | dayjs }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.remarks')">{{ info.remarks }}</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow1 = !isShow1">
					<text class="name">{{$t('salesMg.salesOrderInfo.customerTle')}}</text>
					<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow1">
					<description-list>
						<description :label="$t('salesMg.salesOrderInfo.customerNo')">{{ info.customerNo }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.customerName')">{{ info.customerName }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.customerPhone')">
							{{ salesOrderExtend.customerPhone }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.customerAccount')">
							{{ salesOrderExtend.customerAccount }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.customerClassify')">
							{{ salesOrderExtend.customerClassify | customerClassify }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.regionName')">{{ salesOrderExtend.regionName }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.customerTypeName')">
							{{ salesOrderExtend.customerTypeName }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.propertyNames')">
							{{ salesOrderExtend.propertyNames }}
						</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow2 = !isShow2">
					<text class="name">{{$t('salesMg.salesOrderInfo.deliverTle')}}</text>
					<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow2">
					<description-list>
						<description :label="$t('salesMg.salesOrderInfo.pickMode')">
							{{ salesOrderTransport.pickMode | pickMode }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.bookingTime')">
							{{ salesOrderTransport.bookingTime | dayjs }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.licenseNo')">
							{{ (salesOrderTransport.pickMode !==1 && salesOrderTransport.pickMode !==4) ? salesOrderTransport.licenseNo : '' }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.linkman')">{{ salesOrderTransport.linkman }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.phone')">{{ salesOrderTransport.phone }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.addressSplicing')">
							{{ salesOrderTransport | addressSplicing }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.deliverOrgName')">
							{{ salesOrderTransport.pickMode == 4 ? salesOrderTransport.deliverOrgName : '' }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.deliverMan')">
							{{ (salesOrderTransport.pickMode == 3 || salesOrderTransport.pickMode == 4) ? salesOrderTransport.deliverMan : '' }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payItemsName')">{{ info.payItemsName }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.payItemsMoney')">{{ info.payItemsMoney }}
						</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow3 = !isShow3">
					<text class="name">{{$t('salesMg.salesOrderInfo.discountTle')}}</text>
					<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow3">
					<description-list>
						<description :label="$t('salesMg.salesOrderInfo.couponNo')">
							{{ info.coupon ? info.coupon.couponNo : '' }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.couponMoney')">{{ info.couponMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.integralValue')">{{ info.integralValue }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.integralMoney')">{{ info.integralMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.disCountMoney')">{{ info.disCountMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.disCountRate')">{{ info.disCountRate }}%
						</description>
						<description :label="$t('salesMg.salesOrderInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
						</description>
						<description :label="$t('salesMg.salesOrderInfo.totalMoney')">{{ info.totalMoney }}
						</description>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==1">
			<view class="customerBox">
				<view class="title">
					<text class="name">{{$t('salesMg.salesOrderInfo.orderTle')}}</text>
				</view>
				<view class="content">
					<description-list v-for="item in salesOrderDetailList" :key="item.id">
						<view class="basic-tle">{{item.billName}}
							<text class="tip-tle">{{$t('salesMg.salesOrderInfo.orderNums')}}：{{ item.subBillNo }}</text>
						</view>
						<us-table :table-column="item.printSetVo.tableColumn"
							:table-data="item.salesOrderDetailGoodsList || []"></us-table>
					</description-list>
					<description-list v-if="salesOrderPayitemsList.length"
						:title="$t('salesMg.salesOrderInfo.costMoney')">
						<description v-for="(item,index) in salesOrderPayitemsList" :key="item.id"
							:label="item.payItemsName">
							{{ item.payItemsMoney }},{{$t('salesMg.salesOrderInfo.totalUnit')}}{{item.payItemsTotalMoney}}
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
					<text class="name">{{$t('salesMg.salesOrderInfo.backTle')}}</text>
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
					<text class="name">{{$t('salesMg.salesOrderInfo.sourceTle')}}</text>
				</view>
				<view class="content">
					<description-list v-if="editId" :title="$t('salesMg.salesOrderInfo.sendTle')">
						<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
					</description-list>
					<description-list v-if="editId" :title="$t('salesMg.salesOrderInfo.recycleTle')">
						<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
					</description-list>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button v-permission="{ permission:'app_salesOrder_edit'}" v-if="!info.orderTime" :text="$t('common.btn.edit')" type="primary" hairline shape="circle"
				@click="goto('/salesManage/addSalesOrder/addSalesOrder',{editId:info.id,orderSourceParam:info.orderSource})">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_receive'}" v-if="(info.deliveryState == 1 && info.payType == 3) || (info.deliveryState == 1 && info.payType == 1 && (info.orderState == 1 || info.orderState == 2))"
				:text="$t('salesMg.salesOrderInfo.btn.receive')" type="primary" hairline plain shape="circle"
				@click="handleReceiving(info)">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_submit'}" v-if="sendConfig.checkTag == 1 && info.orderSource == 'store' && (info.checkState == 1 || info.checkState == 4) && info.orderState == 3"
				:text="$t('salesMg.salesOrderInfo.btn.sub')" type="success" plain hairline shape="circle"
				@click="handleSubmit(info)">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_invalid'}" v-if="info.orderTime && info.orderState!=5" :text="$t('salesMg.salesOrderInfo.btn.void')"
				type="error" plain hairline shape="circle" @click="handleVoid(info)"></u-button>
			<u-button v-permission="{ permission:'app_salesOrder_delete'}" v-if="(info.orderSource == 'internet' && info.orderState == 4) || (info.orderState == 4 || info.orderState == 5) || !info.orderTime"
				:text="$t('salesMg.salesOrderInfo.btn.del')" type="error" plain hairline shape="circle"
				@click="handleDelete(info)">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_hangUp'}" v-if="!info.hangUpType && info.orderTime" :text="$t('salesMg.salesOrderInfo.btn.up')"
				type="success" plain hairline shape="circle" @click="handleHangUp(info,true)">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_hangUp'}" v-if="info.hangUpType && info.orderTime" :text="$t('salesMg.salesOrderInfo.btn.down')"
				type="warning" plain hairline shape="circle" @click="handleHangUp(info,false)">
			</u-button>
			<u-button v-permission="{ permission:'app_salesOrder_settle'}" v-if="info.orderState != 4 && info.orderState != 5" :text="$t('salesMg.salesOrderInfo.btn.count')" type="primary" plain hairline shape="circle" @click=""></u-button>
			<u-button v-permission="{ permission:'app_salesOrder_delivery'}" v-if="info.orderTime && (info.pickMode == 3 || info.pickMode == 4) && ((info.deliveryState == 2 && info.orderState != 5) ||
            (info.deliveryState == 3 && (info.shipmentState == 1 || info.shipmentState == 4)))" :text="$t('salesMg.salesOrderInfo.btn.delivery')" type="success" plain hairline shape="circle"
				@click="handleAssign(info)"></u-button>
			<u-button v-permission="{ permission:'app_salesOrder_service'}" v-if="(info.deliveryState == 2 || (info.deliveryState == 3 && info.shipmentState != 3))
            && info.orderTime && sendConfig.execSwitch == 1" :text="$t('salesMg.salesOrderInfo.btn.conf')" type="success" plain hairline shape="circle"
				@click="handleDelivery"></u-button>
		</view>
		<!-- 配送 -->
		<u-modal :show="psShow" :title="$t('salesMg.confSend.popup.tle')" :closeOnClickOverlay="true"
			:showCancelButton="true" @cancel="closePs" @close="closePs" @confirm="confPs">
			<view class="ps-main">
				<edit-form v-if="info.pickMode == 4" ref="dialogFormManager" form-width="100%"
					:form-data-source="formDataSourceManager" :form-data-value="formDataValueManager"
					@change="changeForm">
					<template v-slot:other>
						<u-form-item :label="$t('salesMg.confSend.popup.address')">
							<view style="line-height: 40rpx;">{{ salesOrderTransport | addressSplicing }}</view>
						</u-form-item>
					</template>
				</edit-form>
				<edit-form v-if="info.pickMode == 3" ref="dialogFormVehicle" form-width="100%"
					:form-data-source="formDataSourceVehicle" :form-data-value="formDataValueVehicle">
					<template v-slot:other>
						<u-form-item :label="$t('salesMg.confSend.popup.address')">
							<view style="line-height: 40rpx;">{{ salesOrderTransport | addressSplicing }}</view>
						</u-form-item>
					</template>
				</edit-form>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<!-- 作废 -->
		<u-modal :show="showModal" :title="$t('common.descTle')" :closeOnClickOverlay="true" :showCancelButton="true"
			@cancel="closeModal" @close="closeModal" @confirm="confVoid">
			<view class="modal-main">
				<view>{{$t('common.descTips')}}</view>
				<u-textarea v-model="modalParams.value" maxlength="100" class="modal-text" confirmType="done"
					:placeholder="$t('common.descPlaceholder')"></u-textarea>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		salesOrderFindById,
		salesOrderTakeOrder,
		salesOrderCheckOrderData,
		salesOrderToVoid,
		salesOrderUpdateHangUpType,
		salesOrderToDistribution,
		salesOrderDeleteByIds,
		moduleCommonSetFindByOrgId,
		salesOrderToArrived
	} from '@/api/lpgSalesManageApi'
	import ServiceCylinderInfo from '../../userCenter/auditInfo/common/serviceCylinderInfo'
	import {
		UnixToDate
	} from '@/utils/util.js'
	export default {
		mixins: [settingMixin],
		// 过滤器
		filters: {
			orderState(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.orderStateTxt')
				return stateObj[value] || ''
			},
			customerClassify(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.customerClassifyTxt')
				return stateObj[value] || ''
			},
			payState(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.payStateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.pickModeTxt')
				return stateObj[value] || ''
			},
			payType(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.payTypeTxt')
				return stateObj[value] || ''
			},
			deliveryState(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.deliveryStateTxt')
				return stateObj[value] || ''
			},
			orderSource(value) {
				const stateObj = that.$t('salesMg.salesOrderInfo.orderSourceTxt')
				return stateObj[value] || ''
			}
		},
		components: {
			ServiceCylinderInfo
		},
		data() {
			return {
				showModal: false,
				modalParams: {},
				tabSwitch: this.$t('salesMg.salesOrderInfo.tab'),
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
				salesOrderBackDetailList: [],
				tableColumnBack: [{
						prop: 'goodsName',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.goodsName')
					},
					{
						prop: 'propertyNames',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.propertyNames')
					},
					{
						prop: 'standardName',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.standardName')
					},
					{
						prop: 'unitsName',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.unitsName')
					},
					{
						prop: 'totalNum',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.totalNum')
					},
					{
						prop: 'backNum',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.backNum')
					},
					{
						prop: 'lendNum',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.lendNum')
					},
					{
						prop: 'returnNum',
						label: this.$t('salesMg.salesOrderInfo.tableColumnBack.returnNum')
					}
				],
				infoData: [{
						name: this.$t('salesMg.salesOrderInfo.infoData.countFee'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('salesMg.salesOrderInfo.infoData.countOrder'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('salesMg.salesOrderInfo.infoData.freeMoney'),
						value: '0',
						type: 'money'
					},
					{
						name: this.$t('salesMg.salesOrderInfo.infoData.money'),
						value: '0',
						type: 'money'
					}
				],
				formDataSourceManager: [{
						type: 'picker',
						labelText: this.$t('salesMg.salesOrderInfo.form.deliverOrgId.label'),
						fieldName: 'deliverOrgId',
						placeholder: this.$t('salesMg.salesOrderInfo.form.deliverOrgId.placeholder'),
						options: [],
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.deliverOrgId.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'picker',
						labelText: this.$t('salesMg.salesOrderInfo.form.deliverManId.label'),
						fieldName: 'deliverManId',
						placeholder: this.$t('salesMg.salesOrderInfo.form.deliverManId.placeholder'),
						options: [],
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.deliverManId.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'datetime',
						labelText: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.label'),
						fieldName: 'bookingTimeStr',
						placeholder: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.placeholder'),
							trigger: ['change', 'blur']
						}]
					}
				],
				formDataValueManager: {},
				formDataSourceVehicle: [{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderInfo.form.licenseNo.label'),
						fieldName: 'licenseNo',
						placeholder: this.$t('salesMg.salesOrderInfo.form.licenseNo.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.licenseNo.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.salesOrderInfo.form.deliverMan.label'),
						fieldName: 'deliverMan',
						placeholder: this.$t('salesMg.salesOrderInfo.form.deliverMan.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.deliverMan.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'datetime',
						labelText: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.label'),
						fieldName: 'bookingTimeStr',
						placeholder: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('salesMg.salesOrderInfo.form.bookingTimeStr.placeholder'),
							trigger: ['change', 'blur']
						}]
					}
				],
				formDataValueVehicle: {},
				psShow: false,
				moduleType: 'sales',
				subModuleType: 'salesOrder',
				sendConfig: {},
				backBottle: false, // 确认送达是否有回瓶单
				cylinderScanCode: false, // 确认送达是否需要扫码
				cylinderScanSetting: false, // 钢瓶溯源是否开启
				cylinderPattern: '' // 模式 1 扫码模式 2 一对一置换模式
			}
		},
		async onLoad(options) {
			that = this
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.salesOrderInfo.titleText')
			})
			this.editId = options.editId || ''
			if (options.editId) {
				this.getInfo(options.editId)
			}
			// 确认送达设置
			const {
				returnValue: res
			} = await moduleCommonSetFindByOrgId({
				subModuleType: this.subModuleType,
				moduleType: this.moduleType
			})
			this.sendConfig = res
			// 钢瓶溯源设置
			await this.getConfigGetCylinder((res) => {
				if (res[0] == '1') {
					// 开启
					this.cylinderScanSetting = true
				} else {
					this.cylinderScanSetting = false
				}
				// 模式
				this.cylinderPattern = res[4]
			})
			await this.getOrgList()
			this.formDataSourceManager[0].options = this.orgList
			this.$set(this.formDataValueManager, 'deliverOrgId', this.userInfo.orgId)
			await this.getManagerDeliveryman()
			this.formDataSourceManager[1].options = this.managerDeliveryman
		},
		onShow() {
			if(this.editId){
				this.getInfo(this.editId)
			}
		},
		methods: {
			// 确认送达
			async handleDelivery() {
				if (this.sendConfig) {
					// 钢瓶溯源
					this.cylinderScanCode = this.sendConfig.execCondition.includes('cylinderScanCode')
					// 回瓶单
					this.backBottle = this.sendConfig.execCondition.includes('backBottle')
					if (this.backBottle || (this.cylinderScanCode && this.cylinderScanSetting)) {
						this.$navigateTo('../confSend/confSend', {
							editId: this.editId,
							backBottle: this.backBottle,
							cylinderScanCode: this.cylinderScanCode,
							cylinderScanSetting: this.cylinderScanSetting,
							cylinderPattern: this.cylinderPattern
						})
					} else {
						this.getToArrived()
					}
				} else {
					this.getToArrived()
				}
			},
			getToArrived() {
				uni.showModal({
					title: '确认送达提示',
					content: `真的要确认送达 ${this.info.billNo} 该条数据吗?`,
					success: async (ret) => {
						if (ret.confirm) {
							const obj = {
								ids: []
							}
							obj.ids.push(this.info.id)
							const {
								returnValue: res,
								message
							} = await salesOrderToArrived(obj)
							if (res) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								this.getInfo(this.editId)
							}
						}
					},
				})
			},
			// 配送
			confPs() {
				const temp = this.info.salesOrderTransport
				if (this.info.pickMode == 3) {
					this.$refs.dialogFormVehicle.handleSubmit(async (param) => {
						const data = {
							id: this.editId,
							salesOrderTransportData: {
								id: temp.id,
								pickMode: temp.pickMode, // 提货方式（1 自提 ，2 车辆自提 ，3 车辆配送 ，4 送气员配送
								bookingTimeStr: param.bookingTimeStr, // 预约时间
								licenseNo: param.licenseNo, // 车牌号，
								province: temp.province, // 省，
								city: temp.city, // 市，
								area: temp.area, // 区，
								address: temp.address, // 详细地址，
								doorplate: temp.doorplate, // 门牌号，
								linkman: temp.linkman, // 收货人，
								phone: temp.phone, // 收货电话，
								latitude: temp.latitude, // 纬度，
								longitude: temp.longitude, // 经度，
								floor: temp.floor, // 楼层，
								deliverMan: param.deliverMan, // 运输员/配送员
							}
						}
						data.salesOrderTransportData = JSON.stringify(data.salesOrderTransportData)
						const {
							returnValue: res,
							message
						} = await salesOrderToDistribution(data)
						if (res) {
							this.psShow = false
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							this.getInfo(this.editId)
						}
					})
				} else if (this.info.pickMode == 4) {
					this.$refs.dialogFormManager.handleSubmit(async (param) => {
						const data = {
							id: this.editId,
							salesOrderTransportData: {
								id: temp.id,
								pickMode: temp.pickMode, // 提货方式（1 自提 ，2 车辆自提 ，3 车辆配送 ，4 送气员配送
								bookingTimeStr: param.bookingTimeStr, // 预约时间
								province: temp.province, // 省，
								city: temp.city, // 市，
								area: temp.area, // 区，
								address: temp.address, // 详细地址，
								doorplate: temp.doorplate, // 门牌号，
								linkman: temp.linkman, // 收货人，
								phone: temp.phone, // 收货电话，
								latitude: temp.latitude, // 纬度，
								longitude: temp.longitude, // 经度，
								floor: temp.floor, // 楼层，
								deliverManId: param.deliverManId, // 运输员id/配送员id
								deliverMan: this.managerDeliveryman.filter((item) => item.value == param
									.deliverManId)[0].name, // 运输员/配送员
								deliverOrgId: param.deliverOrgId, // 配送点id，
								deliverOrgName: this.orgList.filter((item) => item.value == param
									.deliverOrgId)[0].name // 配送点名称
							}
						}
						data.salesOrderTransportData = JSON.stringify(data.salesOrderTransportData)
						const {
							returnValue: res,
							message
						} = await salesOrderToDistribution(data)
						if (res) {
							this.psShow = false
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							this.getInfo(this.editId)
						}
					})
				}

			},
			closePs() {
				this.psShow = false
			},
			async handleAssign(data) {
				const salesOrderTransport = data.salesOrderTransport
				if (salesOrderTransport.pickMode == 3) {
					this.psShow = true
					// 车辆配送
					setTimeout(() => {
						this.formDataValueVehicle = {
							deliverMan: salesOrderTransport.deliverMan,
							licenseNo: salesOrderTransport.licenseNo,
							bookingTimeStr: salesOrderTransport.bookingTime ? UnixToDate(
								salesOrderTransport
								.bookingTime) : ''
						}
					}, 100)
				} else if (salesOrderTransport.pickMode == 4) {
					this.psShow = true
					// 配送员配送
					setTimeout(() => {
						this.formDataValueManager = {
							deliverManId: salesOrderTransport.deliverManId,
							deliverOrgId: salesOrderTransport.deliverOrgId,
							bookingTimeStr: salesOrderTransport.bookingTime ? UnixToDate(
								salesOrderTransport
								.bookingTime) : ''
						}
					}, 100)
				}
			},
			// 配送员form表单改变
			async changeForm(obj) {
				const queryParams = obj.queryParams
				const name = obj.name // 改变的字段
				if (name == 'deliverOrgId' && queryParams.deliverOrgId) {
					// 配送点改变，重新查找配送员
					await this.getManagerDeliveryman({
						orgId: queryParams.deliverOrgId
					})
					this.formDataSourceManager[1].options = this.managerDeliveryman
					queryParams.deliverManId = ''
					this.$refs.dialogFormManager.resetPicker('deliverManId', [0], [0])
					this.formDataValueManager = queryParams
				}
			},
			// 挂起
			handleHangUp(data, type) {
				uni.showModal({
					title: this.$t('common.tipsTle')[2],
					content: this.$t('common').delTxt(data.billNo),
					title: type ? this.$t('common.tipsTle')[6] : this.$t('common.tipsTle')[7],
					content: type ? this.$t('common').hangUpTxt(data.billNo) : this.$t('common').hangDownTxt(data
						.billNo),
					success: async (ret) => {
						if (ret.confirm) {
							const obj = {
								ids: [],
								hangUpType: type
							}
							obj.ids.push(data.id)
							const {
								returnValue: res,
								message
							} = await salesOrderUpdateHangUpType(obj)
							if (res) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								this.getInfo(this.editId)
							}
						}
					},
				})
			},
			// 作废
			async confVoid() {
				const remarks = this.modalParams.value && this.modalParams.value.replace(/\s*/g, "")
				if (!remarks) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('common.descPlaceholder'),
					})
					return
				}
				const {
					returnValue: res,
					message
				} = await salesOrderToVoid({
					ids: [this.modalParams.voidData.id],
					invalidRemarks: remarks || ''
				}).catch(err => {
					this.closeModal()
				})
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					this.getInfo(this.editId)
				}
				this.closeModal()
			},
			closeModal() {
				this.showModal = false
				this.modalParams = {}
			},
			handleVoid(data) {
				this.showModal = true
				this.modalParams.voidData = data
			},
			handleSubmit(data) {
				uni.showModal({
					title: this.$t('common.tipsTle')[1],
					content: this.$t('common').subTxt(data.billNo),
					success: async (ret) => {
						if (ret.confirm) {
							const obj = {
								ids: []
							}
							obj.ids.push(data.id)
							const {
								returnValue: res,
								message
							} = await salesOrderCheckOrderData(obj)
							if (res) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								this.getInfo(this.editId)
							}
						}
					},
				})
			},
			handleDelete(data) {
				uni.showModal({
					title: this.$t('common.tipsTle')[2],
					content: this.$t('common').delTxt(data.billNo),
					success: async (ret) => {
						if (ret.confirm) {
							const {
								returnValue: res,
								message
							} = await salesOrderDeleteByIds({
								ids: [data.id]
							})
							if (res) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								setTimeout(function() {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						}
					},
				})
			},
			// 接单
			handleReceiving(data) {
				uni.showModal({
					title: this.$t('common.tipsTle')[5],
					content: this.$t('common').receiveTxt(data.billNo),
					success: async (ret) => {
						if (ret.confirm) {
							const obj = {
								ids: []
							}
							obj.ids.push(data.id)
							const {
								returnValue: res,
								message
							} = await salesOrderTakeOrder(obj)
							if (res) {
								this.$refs.uToast.show({
									type: 'success',
									message: message,
								})
								this.getInfo(this.editId)
							}
						}
					}
				})
			},
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
						payItemsName.push(
							`${v.payItemsName}:${v.payItemsMoney},${this.$t('salesMg.salesOrderInfo.totalUnit')}${v.payItemsTotalMoney} `
						)
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
									if (m.propValue == 'assistName-' + n
										.assistUnitsId) {
										o[m.propValue] = n.netContent
									}
									if (m.propValue == 'netContent-' + n
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
							unitsName: that.$t('salesMg.salesOrderInfo.tableColumnBack.count'),
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
	.modal-main {
		width: 100%;
		font-size: 28rpx;

		&>view {
			margin-bottom: 20rpx;
		}

		::v-deep .modal-text {
			font-size: 28rpx;

			.u-textarea__field {
				font-size: 28rpx;
			}
		}
	}

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
		margin: 60rpx auto;
		@include flexMixin();

		.u-button {
			margin: 0rpx 10rpx;
		}
	}
</style>
