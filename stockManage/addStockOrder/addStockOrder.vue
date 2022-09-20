<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseBill="chooseBill"
				@chooseCustomer="chooseCustomer">
			</edit-form>
		</view>

		<view class="list-box" v-for="(item,index) in listOrder" :key="index">
			<view class="list">
				<view class="list-head">
					<view class="head-tle">{{$t('stockMg.addStockOrder.orderChildTxt')}}</view>
					<view class="head-icon" v-if="!isSave" @click="removeOrderGoods(index)">
						<u-icon name="trash"></u-icon>
					</view>
				</view>
				<view class="list-act">
					<view class="act-reason" @click="chooseReason(index)">
						<view>{{$t('stockMg.addStockOrder.orderReasonTxt')}}：</view>
						<view class="on" v-if="item.orderReason">{{item.orderReason.name}}</view>
						<view v-else>{{$t('stockMg.addStockOrder.orderReasonPlaceholder')}}</view>
					</view>
					<view class="act-btn" @click="chooseGoods(index)" v-if="!isSave">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">{{$t('stockMg.common.btn.addGoodsTxt')}}</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(val,key) in item.stockInoutLogDetailData">
						<view class="goods-head">
							<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
							<view class="goods-price">￥{{val.costPrice}}</view>
							<view class="goods-unit">/{{val.unitsName}}</view>
						</view>
						<view class="attr-del">
							<view class="attr">
								<view class="attr-txt">
									{{ val.goodsClassifyName ? val.goodsClassifyName + "," : "" }}
									{{ val.propertyNames ? val.propertyNames + "," : "" }}
									{{ val.standardName ? val.standardName + "," : "" }}
									{{ val.brandName }}
								</view>
								<u-icon class="arrow-right" name="arrow-right"></u-icon>
								<view class="attr-box">
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.goodsClassifyName')}}：</view>
										<view class="item-txt">{{val.goodsClassifyName}}</view>
									</view>
									<view class="attr-item" v-if="val.propertyNames">
										<view class="item-tle">{{$t('stockMg.common.propertyNames')}}：</view>
										<view class="item-txt">{{val.propertyNames}}</view>
									</view>
									<view class="attr-item" v-if="val.standardName">
										<view class="item-tle">{{$t('stockMg.common.standardName')}}：</view>
										<view class="item-txt">{{val.standardName}}</view>
									</view>
									<view class="attr-item" v-if="val.brandName">
										<view class="item-tle">{{$t('stockMg.common.brandName')}}：</view>
										<view class="item-txt">{{val.brandName}}</view>
									</view>
									<view class="attr-item" v-if="val.unitsName">
										<view class="item-tle">{{$t('stockMg.common.unitsName')}}：</view>
										<view class="item-txt">{{val.unitsName}}</view>
									</view>
								</view>
							</view>
							<u-icon v-if="!isSave" class="remove-goods" name="minus-circle-fill"
								@click="removeOrderGoods(index,key)">
							</u-icon>
						</view>

						<view class="info-cell">
							<view class="cell-unit">
								<block v-if="val.assistUnitsList&&val.assistUnitsList.length" v-for="(o,k) in val.assistUnitsList" :key="k">
									<view class="cell" v-if="o.unitsName&&o.netContent">
										<view class="cell-label">{{o.unitsName}}：</view>
										<view class="cell-content">{{o.netContent}}</view>
									</view>
								</block>
								
							</view>

							<view class="nums"><text>x</text><input maxlength="4" type="number"
									:placeholder="$t('stockMg.addStockOrder.stockNumsTxt')" v-model="val.stockNum"
									@input="checkNum($event,index,key)" />
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addStockOrder.costMoney')}}：</view>
								<view class="cell-content">{{val.costMoney}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 出入库原因 -->
		<u-picker :closeOnClickOverlay="true" :show="show" :columns="[stockInoutReason]" keyName="name"
			@confirm="confReason" @close="close" @cancel="close"></u-picker>

		<view class="btn" v-if="!isSave">
			<u-button :text="$t('stockMg.addStockOrder.addChildBtn')" plain type="primary" hairline shape="circle"
				@click="addListOrder">
			</u-button>
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>

		<view class="btn" v-else>
			<u-button v-permission="{ permission:'app_stockOrderList_edit'}" :text="$t('common.btn.edit')"
				v-if="infos.checkState==1||infos.checkState==4" type="primary" hairline shape="circle" plain
				@click="changeEdit(false)">
			</u-button>
			<u-button v-permission="{ permission:'app_stockOrderList_submit'}" :text="$t('common.btn.submit')"
				@click="handleUpdate(infos,2)" v-if="infos.checkState==1" type="success" hairline shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_stockOrderList_revert'}" :text="$t('common.btn.withdraw')"
				@click="handleUpdate(infos,7)" v-if="infos.checkState==2" type="warning" hairline shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_stockOrderList_delete'}" :text="$t('common.btn.delete')"
				type="error" hairline shape="circle"
				v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" plain @click="handleDelete(infos)">
			</u-button>
			<u-button v-permission="{ permission:'app_stockOrderList_invalid'}" :text="$t('common.btn.toVoid')"
				@click="handleVoid(infos)" v-if="infos.checkState==3||infos.checkState==6" type="error" hairline
				shape="circle" plain></u-button>
		</view>

		<!-- 作废 -->
		<u-modal :show="showModal" :title="$t('common.descTle')" :closeOnClickOverlay="true" :showCancelButton="true" @cancel="closeModal" @close="closeModal" @confirm="confVoid">
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
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		sysLinkBillFindLinkBillObject,
		stockBillLogSaveOrEdit,
		stockBillLogFindById,
		stockBillLogDeleteByIds,
		stockBillLogUpdateState,
		stockBillLogToVoid
	} from '@/api/lpgSalesManageApi'
	import {
		auditTaskRecallTaskByLinkId
	} from '@/api/lpgManageAppApi'
	import {
		createUniqueString
	} from '@/utils'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				showModal: false,
				modalParams: {},
				isSave: false,
				formDataSource: [{
						type: 'picker',
						labelText: this.$t('stockMg.addStockOrder.form.orgId.label'),
						fieldName: 'orgId',
						placeholder: this.$t('stockMg.addStockOrder.form.orgId.placeholder'),
						options: [],
						required: true,
						rules: [{
							required: true,
							message: this.$t('stockMg.addStockOrder.form.orgId.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'actionSheet',
						labelText: this.$t('stockMg.addStockOrder.form.stockFormType.label'),
						fieldName: 'stockFormType',
						placeholder: this.$t('stockMg.addStockOrder.form.stockFormType.placeholder'),
						required: true,
						options: this.$t('stockMg.addStockOrder.form.stockFormType.options'),
						rules: [{
							required: true,
							message: this.$t('stockMg.addStockOrder.form.stockFormType.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'chooseBtn',
						labelText: this.$t('stockMg.addStockOrder.form.customerId.label'),
						fieldName: 'customerName',
						placeholder: this.$t('stockMg.addStockOrder.form.customerId.placeholder'),
						required: true,
						func: 'chooseCustomer',
						rules: [{
							required: true,
							message: this.$t('stockMg.addStockOrder.form.customerId.placeholder'),
							trigger: ['change', 'blur']
						}],
						show: false,
					},
					{
						type: 'chooseBtn',
						labelText: this.$t('stockMg.addStockOrder.form.linkBillNo.label'),
						fieldName: 'linkBillNo',
						placeholder: this.$t('stockMg.addStockOrder.form.linkBillNo.placeholder'),
						func: 'chooseBill'
					},
					{
						type: 'text',
						labelText: this.$t('stockMg.addStockOrder.form.licenseNo.label'),
						fieldName: 'licenseNo',
						placeholder: this.$t('stockMg.addStockOrder.form.licenseNo.placeholder'),
						maxlength: 50,
					},
					{
						type: 'picker',
						labelText: this.$t('stockMg.addStockOrder.form.deliverManId.label'),
						fieldName: 'deliverManId',
						placeholder: this.$t('stockMg.addStockOrder.form.deliverManId.placeholder'),
						required: true,
						options: [],
						rules: [{
							required: true,
							message: this.$t('stockMg.addStockOrder.form.deliverManId.placeholder'),
							trigger: ['change', 'blur']
						}],
					},
					{
						type: 'textarea',
						labelText: this.$t('stockMg.addStockOrder.form.remarks.label'),
						fieldName: 'remarks',
						placeholder: this.$t('stockMg.addStockOrder.form.remarks.placeholder'),
					},
					{
						type: 'upload',
						labelText: this.$t('stockMg.addStockOrder.form.filePath.label'),
						fieldName: 'filePath',
						borderBottom: false,
						limit: 2,
						defaultValue: []
					}
				],
				formDataValue: {},
				listOrder: [],
				tempIndex: null,
				show: false,
				stockInoutReason: [],
				linkId: '',
				linkTypes: '',
				infos: {},
				customerId: '',
			}
		},
		// 过滤器
		filters: {},
		computed: {

		},
		async created() {

		},
		async mounted() {

		},
		async onLoad(options) {
			this.editId = options.editId || ''
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			this.$set(this.formDataValue, 'orgId', this.userInfo.orgId)
			await this.getManagerDeliveryman()
			this.formDataSource[5].options = this.managerDeliveryman
			await this.getStockInoutReason()
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleTextEdit')
				});
				await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleText')
				});
			}
			uni.$on('chooseGoods', (res) => {
				res.forEach((item, index) => {
					item.stockNum = 1
					item.ids = createUniqueString()
					item.id = ''
					item.costMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(item.stockNum,
						item.costPrice), 2)
					this.listOrder[this.tempIndex].stockInoutLogDetailData.push(item)
				})
			})
			uni.$on('chooseBill', async (res) => {
				if (res) {
					this.linkId = res.billId
					this.linkTypes = res.billType
					this.formDataSource[2].show = true
					this.customerId = res.customerId
					let obj = {
						linkBillNo: res.billNo,
						customerName: res.customerName,
						stockFormType: (res.formType).toString()
					}
					this.formDataValue = {
						...this.formDataValue,
						...obj
					}
				}
			})
			uni.$on('chooseCustomer', (data) => {
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.customerName)
			})
			// 添加监听事件
			uni.$on('chooseOrg', (data) => {
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.name)
			})
			// 添加监听事件
			uni.$on('chooseSupplier', (data) => {
				console.log(data)
				this.customerId = data.id
				this.$set(this.formDataValue, 'customerName', data.supplierName)
			})
		},
		onUnload() {
			uni.$off('chooseGoods')
			uni.$off('chooseBill')
			uni.$off('chooseCustomer')
			uni.$off('chooseOrg')
			uni.$off('chooseSupplier')
		},
		onShow() {

		},
		methods: {
			// 转化正整数
			checkNum(e, index, key) {
				let item = this.listOrder[index]
				item.stockInoutLogDetailData[key].stockNum = e.detail.value
				this.$set(this.listOrder, index, item)
				let nums = Math.abs(Math.round(e.detail.value))
				this.$nextTick(function() {
					item.stockInoutLogDetailData[key].stockNum = nums
					item.stockInoutLogDetailData[key].costMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(
						nums, item.stockInoutLogDetailData[key].costPrice), 2)
					this.$set(this.listOrder, index, item)
				});

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
				} = await stockBillLogToVoid({
					ids: [this.modalParams.voidData.id],
					remarks: remarks || ''
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
			changeEdit(isSave = this.isSave) {
				this.isSave = isSave
				if (isSave) {
					this.formDataSource.forEach(v => {
						v.disabled = true
					})
				} else {
					this.formDataSource.forEach(v => {
						v.disabled = false
					})
				}
				this.formDataSource = [...this.formDataSource]
			},
			// 提交 撤回
			handleUpdate(data, type) {
				if (type === 7) {
					uni.showModal({
						title: this.$t('common.tipsTle')[0],
						content: this.$t('common').backTxt(data.billNo),
						success: async (res) => {
							if (res.confirm) {
								const {
									returnValue: res,
									message
								} = await auditTaskRecallTaskByLinkId({
									linkId: data.id
								})
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
				} else {
					uni.showModal({
						title: this.$t('common.tipsTle')[1],
						content: this.$t('common').subTxt(data.billNo),
						success: async (res) => {
							if (res.confirm) {
								const {
									returnValue: res,
									message
								} = await stockBillLogUpdateState({
									ids: [data.id],
									state: type
								})
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
				}
			},
			// 删除
			handleDelete(data) {
				uni.showModal({
					title: this.$t('common.tipsTle')[2],
					content: this.$t('common').delTxt(data.billNo),
					success: async (res) => {
						if (res.confirm) {
							const {
								returnValue: res,
								message
							} = await stockBillLogDeleteByIds({
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
					}
				});
			},
			// 获取详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await stockBillLogFindById({
					id
				})
				if (res) {
					this.infos = res
					let data = {}
					this.formDataSource[2].show = true
					data.filePath = res.filePath.length ? JSON.parse(res.filePath) : [],
						data.stockFormType = res.stockFormType.toString()
					this.formDataSource[7].defaultValue = data.filePath
					data.orgId = res.orgId
					data.linkBillNo = res.linkBillNo
					data.customerName = res.customerName
					data.remarks = res.remarks
					data.licenseNo = res.licenseNo
					data.deliverManId = res.deliverManId
					data.checkState = res.checkState
					data.stockSourceType = res.stockSourceType
					this.linkId = res.linkId || ''
					this.linkTypes = res.linkType || ''
					this.customerId = res.customerId
					this.formDataValue = data
					if (res.stockInoutLogList && res.stockInoutLogList.length) {
						let listOrder = []
						res.stockInoutLogList.forEach((item, index) => {
							let obj = {}
							obj.orderReason = {
								name: item.inOutName + (item.inOutType === 1 ? this.$t(
									'stockMg.common.stockTypeTxt.in') : this.$t(
									'stockMg.common.stockTypeTxt.out')),
								value: item.inOutReasonId,
								type: item.inOutType,
								reasonName: item.inOutName
							}
							obj.id = item.id
							obj.stockInoutLogDetailData = []
							if (item.stockInoutLogDetailsList && item.stockInoutLogDetailsList.length) {
								item.stockInoutLogDetailsList.forEach((val, key) => {
									val.stockNum = parseInt(val.stockNum)
									obj.stockInoutLogDetailData.push(val)
								})
							}
							listOrder.push(obj)
						})
						this.listOrder = listOrder
					}

				}
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					let params = {}
					params.customerId = this.customerId
					params.id = this.editId || ''
					params.stockSourceType = 'stock'
					params.checkState = this.infos.checkState || 1
					params.orgId = data.orgId
					params.stockFormType = data.stockFormType
					params.remarks = data.remarks
					params.linkBillNo = data.linkBillNo
					params.licenseNo = data.licenseNo
					params.deliverManId = data.deliverManId
					params.linkId = this.linkId
					params.linkType = this.linkTypes
					params.filePath = JSON.stringify(data.filePath)
					params.stockInoutData = []
					this.listOrder.forEach((item, index) => {
						const obj = {
							inOutReasonId: '',
							id: item.id || '',
							stockInoutLogDetailData: []
						}
						if (item.orderReason) {
							obj.inOutReasonId = item.orderReason.value
						}
						if (item.stockInoutLogDetailData.length) {
							item.stockInoutLogDetailData.forEach((val, key) => {
								const goods = {
									goodsDetailId: val.goodsDetailId,
									goodsId: val.goodsId,
									stockNum: val.stockNum,
									costMoney: val.costMoney,
									ids: val.ids,
									id: val.id ? val.id : ''
								}
								obj.stockInoutLogDetailData.push(goods)
							})
						}

						params.stockInoutData.push(obj)
					})
					params.stockInoutData = JSON.stringify(params.stockInoutData)
					const {
						returnValue: res,
						message
					} = await stockBillLogSaveOrEdit(params)
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
				})
			},
			// 选择出入库原因
			chooseReason(index) {
				if (this.isSave) {
					return
				}
				this.show = true
				this.tempIndex = index
			},
			confReason(e) {
				this.listOrder[this.tempIndex].orderReason = e.value[0]
				this.close()
			},
			close() {
				this.show = false
			},
			// 移除子单
			removeOrderGoods(index, key = null) {
				if (key != null) {
					this.listOrder[index].stockInoutLogDetailData.splice(key, 1)
				} else {
					this.listOrder.splice(index, 1)
				}
			},
			// 添加子单
			addListOrder() {
				this.listOrder.push({
					stockInoutLogDetailData: []
				})
			},
			// 选择客户
			chooseCustomer() {
				if (this.isSave) {
					return
				}
				if (this.formDataValue.stockFormType == 1) {
					// 客户
					this.goto('/infoManage/chooseCustomer/chooseCustomer', {
						customerId: this.customerId,
						orgId: this.userInfo.orgId
					})
				} else if (this.formDataValue.stockFormType == 2) {
					// 供应商
					this.goto('/infoManage/chooseSupplier/chooseSupplier', {
						supplierId: this.customerId
					})
				} else if (this.formDataValue.stockFormType == 3) {
					// 组织
					this.goto('/infoManage/chooseOrg/chooseOrg', {
						orgId: this.customerId
					})
				}
			},
			// 选择商品
			chooseGoods(index) {
				this.tempIndex = index
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					multiple: true
				})
			},
			// 表单
			async changeForm(e) {
				let params = e.queryParams
				if ((e.name == 'customerName' && (params.customerName != this.formDataValue.customerName)) || (e
						.name == 'stockFormType' && (params.stockFormType != this.formDataValue.stockFormType))) {
					this.linkId = ''
					this.linkTypes = ''
					params.linkBillNo = ''
				}

				if ((e.name == 'stockFormType' && params.stockFormType && (params.stockFormType != this.formDataValue
						.stockFormType)) || (params.stockFormType == 1 && e.name == 'orgId')) {
					this.formDataSource[2].show = true
					params.customerName = ''
					this.customerId = ''
					if (!params.deliverManId) {
						this.$refs.dialogForm.resetPicker('deliverManId', [0], [0])
					}
				}
				this.formDataValue = params
			},
			// 选择单据
			chooseBill() {
				if (this.isSave) {
					return
				}
				this.$navigateTo('/infoManage/chooseBill/chooseBill', {
					billId: this.linkId
				})
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.sk-info {
		padding: 30rpx 20rpx;

		::v-deep .normalForm {
			// margin: 20rpx 20rpx;

			.u-form {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				width: 710rpx;
				padding: 10rpx 10rpx;
				box-sizing: border-box;

				.u-form-item .u-line {
					border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
				}
			}

			::v-deep .u-upload__button {
				margin: 0rpx;
			}
		}

		.list-box {
			.list {
				margin-top: 30rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;

				.list-head {
					height: 90rpx;
					display: flex;
					align-items: center;
					padding: 0 30rpx;
					position: relative;

					&:before {
						display: block;
						content: '';
						height: 40rpx;
						width: 8rpx;
						border-radius: 8rpx;
						background: rgba(42, 130, 228, 1);
					}

					.head-tle {
						margin-left: 16rpx;
						font-size: 36rpx;
						width: 1px;
						flex: 1;
						color: #000;
					}

					.head-icon {
						::v-deep .u-icon__icon {
							color: red !important;
							font-size: 44rpx !important;
						}
					}
				}

				.list-act {
					padding: 8rpx 30rpx;
					background: rgba(247, 247, 247, 1);
					display: flex;
					align-items: center;

					.act-reason {
						width: 1px;
						flex: 1;
						display: flex;
						font-size: 28rpx;
						color: rgba(128, 128, 128, 1);
						height: 60rpx;
						line-height: 60rpx;

						.on {
							color: rgba(42, 130, 228, 1);
						}
					}

					.act-btn {
						display: flex;
						height: 60rpx;
						border-radius: 60rpx;
						background: white;
						box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
						align-items: center;
						padding: 0 20rpx;
						font-size: 28rpx;
						color: rgba(42, 130, 228, 1);

						.add-icon {
							::v-deep .u-icon__icon {
								color: rgba(42, 130, 228, 1) !important;
								line-height: auto !important;
								font-size: 34rpx !important;
							}
						}

						.add-txt {
							margin-left: 10rpx;
						}
					}
				}

				.goods {
					.goods-list {
						padding: 30rpx 30rpx;
						border-bottom: 1px solid #eee;

						&:last-child {
							border-bottom: none;
						}

						.goods-head {
							display: flex;

							.goods-tle {
								flex: 1;
								width: 1px;
								word-break: break-all;
								font-size: 32rpx;
								color: #000;
								line-height: 38rpx;
							}

							.goods-price {
								font-size: 36rpx;
								line-height: 38rpx;
								font-weight: bold;
								color: red;
								margin-left: 10rpx;
							}

							.goods-unit {
								font-size: 28rpx;
								line-height: 38rpx;
								margin-left: 10rpx;
							}
						}

						.attr-del {
							display: flex;
							justify-content: space-between;
							margin-top: 30rpx;
							align-items: center;

							.remove-goods {
								::v-deep .u-icon__icon {
									color: rgba(255, 79, 35, 1.0) !important;
									font-size: 46rpx !important;
								}
							}
						}

						.attr {
							padding: 0 10rpx;
							height: 50rpx;
							display: flex;
							align-items: center;
							width: 360rpx;
							background: rgba(247, 247, 247, 1);
							border-radius: 4rpx;
							position: relative;

							&:hover {
								.arrow-right {
									transform: rotate(90deg);
								}

								.attr-box {
									display: block;
								}
							}

							.attr-txt {
								color: rgba(56, 56, 56, 1);
								font-size: 28rpx;
								width: 1px;
								flex: 1;
								text-overflow: ellipsis;
								overflow: hidden;
								white-space: nowrap;
							}

							.attr-box {
								display: none;
								z-index: 20;
								position: absolute;
								left: 0;
								background: rgba(247, 247, 247, 1);
								border-radius: 16rpx;
								top: 74rpx;
								width: 100%;
								padding: 20rpx;
								box-sizing: border-box;

								.attr-item {
									display: flex;
									font-size: 24rpx;
									margin-bottom: 10rpx;
									color: #000;
									font-weight: bold;

									&:last-child {
										margin-bottom: 0;
									}

									.item-tle {
										color: rgba(56, 56, 56, 1);
										font-weight: normal;
									}
								}

								&::before {
									content: '';
									position: absolute;
									top: -15rpx;
									left: calc(50% - 15rpx);
									transform: translate(-50%, 0%);
									transform: rotate(45deg);
									display: block;
									width: 30rpx;
									height: 30rpx;
									background: rgba(247, 247, 247, 1);
								}
							}

						}

						.info-cell {
							display: flex;
							align-items: center;
							font-size: 32rpx;
							line-height: 32rpx;
							margin-top: 30rpx;

							.cell-unit {
								flex: 1;
								width: 1px;
								display: flex;
								flex-direction: column;

								.cell {
									width: 100%;
									margin-top: 30rpx;

									&:first-child {
										margin-top: 0rpx;
									}
								}
							}

							.cell {
								width: 1px;
								flex: 1;
								display: flex;
								align-items: center;

								.cell-label {
									color: rgba(128, 128, 128, 1);
								}
							}

							.nums {
								color: rgba(128, 128, 128, 1);
								display: flex;
								align-items: center;

								input {
									width: 50rpx;
									text-align: right;
									border-bottom: 1px solid #ccc;
									text-align: center;
								}
							}
						}
					}
				}
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
	}
</style>
