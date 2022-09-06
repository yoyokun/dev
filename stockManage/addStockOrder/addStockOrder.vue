<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @toScan="toScan">
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
						<view class="on" v-if="item.orderReason">{{item.orderReason.label}}</view>
						<view v-else>{{$t('stockMg.addStockOrder.orderReasonPlaceholder')}}</view>
					</view>
					<view class="act-btn" @click="chooseGoods(index)" v-if="!isSave">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">{{$t('stockMg.addStockOrder.addGoodsTxt')}}</view>
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
									{{ val.brandName ? val.brandName + "," : "" }}
									{{ val.goodsClassifyName ? val.goodsClassifyName + "," : "" }}
									{{ val.propertyNames ? val.propertyNames + "," : "" }}
									{{ val.standardName }}
								</view>
								<u-icon class="arrow-right" name="arrow-right"></u-icon>
								<view class="attr-box">
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.addStockOrder.propertyNames')}}：</view>
										<view class="item-txt">{{val.propertyNames}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.addStockOrder.standardName')}}：</view>
										<view class="item-txt">{{val.standardName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.addStockOrder.unitsName')}}：</view>
										<view class="item-txt">{{val.unitsName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.addStockOrder.brandName')}}：</view>
										<view class="item-txt">{{val.brandName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.addStockOrder.goodsClassifyName')}}：</view>
										<view class="item-txt">{{val.goodsClassifyName}}</view>
									</view>
								</view>
							</view>
							<u-icon v-if="!isSave" class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(index,key)">
							</u-icon>
						</view>

						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addStockOrder.netContent')}}：</view>
								<view class="cell-content">{{val['netContent-' + val.assistUnitsList[0].assistUnitsId]}}
								</view>
							</view>
							<view class="nums"><text>x</text><input maxlength="4" type="number" :placeholder="$t('stockMg.addStockOrder.stockNumsTxt')"
									v-model="val.stockNum" /></view>
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
		<u-picker :closeOnClickOverlay="true" :show="show" :columns="[stockInoutReason]" keyName="label"
			@confirm="confReason" @close="close" @cancel="close"></u-picker>

		<view class="btn" v-if="!isSave">
			<u-button :text="$t('stockMg.addStockOrder.addChildBtn')" plain type="primary" hairline shape="circle" @click="addListOrder">
			</u-button>
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>
		
		<view class="btn" v-else>
			<u-button :text="$t('common.btn.edit')" v-if="infos.checkState==1||infos.checkState==4" type="primary" hairline
				shape="circle" plain @click="changeEdit(false)">
			</u-button>
			<u-button :text="$t('cylinderCheckList.btns')[2]" @click="handleUpdate(infos,2)" v-if="infos.checkState==1" type="success" hairline
				shape="circle" plain>
			</u-button>
			<u-button :text="$t('cylinderCheckList.btns')[3]" @click="handleUpdate(infos,7)" v-if="infos.checkState==2" type="warning" hairline
				shape="circle" plain>
			</u-button>
			<u-button :text="$t('common.btn.delete')"
				type="error" hairline shape="circle" v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" plain @click="handleDelete(infos)">
			</u-button>
			<u-button :text="$t('common.btn.toVoid')"
				@click="handleVoid(infos)" v-if="infos.checkState==3||infos.checkState==6" type="info" hairline shape="circle" plain></u-button>
		</view>
		
		<!-- 作废 -->
		<u-modal :show="showModal" :title="$t('cylinderCheckList.descTle')" :closeOnClickOverlay="true"
			:asyncClose="true" :showCancelButton="true" @cancel="closeModal" @close="closeModal" @confirm="confVoid">
			<view class="modal-main">
				<view>{{$t('cylinderCheckList.descTips')}}</view>
				<u-textarea v-model="modalParams.value" class="modal-text"
					:placeholder="$t('cylinderCheckList.descPlaceholder')"></u-textarea>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import qrcode from "@/utils/reqrcode.js"
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
						type: 'picker',
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
						type: 'picker',
						labelText: this.$t('stockMg.addStockOrder.form.customerId.label'),
						fieldName: 'customerId',
						placeholder: this.$t('stockMg.addStockOrder.form.customerId.placeholder'),
						required: true,
						options: [],
						rules: [{
							required: true,
							message: this.$t('stockMg.addStockOrder.form.customerId.placeholder'),
							trigger: ['change', 'blur']
						}],
						show:false,
					},
					{
						type: 'text',
						labelText: this.$t('stockMg.addStockOrder.form.linkBillNo.label'),
						fieldName: 'linkBillNo',
						placeholder: this.$t('stockMg.addStockOrder.form.linkBillNo.placeholder'),
						maxlength: 50,
						func: 'toScan',
						suffix: {
							suffixIcon: 'scan',
							color: 'rgba(42, 130, 228, 1)'
						}
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
				infos:{},
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
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleTextEdit')
				});
				await this.getInfo(this.editId)
			}else{
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleText')
				});
			}
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			this.$set(this.formDataValue, 'orgId', this.userInfo.orgId)
			await this.getManagerDeliveryman()
			this.formDataSource[5].options = this.managerDeliveryman
			await this.getStockInoutReason()
			uni.$on('chooseGoods', (res) => {
				res.forEach((item, index) => {
					item.stockNum = 1
					item.ids = createUniqueString()
					item.id = ''
					item.costMoney = (item.stockNum * item.costPrice).toFixed(2)
					this.listOrder[this.tempIndex].stockInoutLogDetailData.push(item)
				})
			})
			

		},
		onUnload() {
			uni.$off('chooseGoods')
		},
		onShow() {

		},
		methods: {
			// 作废
			async confVoid() {
				const obj = {
					ids: [],
					remarks: this.modalParams.value || ''
				}
				obj.ids.push(this.modalParams.voidData.id)
				const {
					returnValue: res,
					message
				} = await stockBillLogToVoid(obj).catch(err=>{
					this.closeModal()
				})
				if (res) {
					uni.showToast({
						title: message,
						icon: 'none'
					})
					this.getInfo(that.editId)
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
				const that = this
				if (type === 7) {
					uni.showModal({
						title: that.$t('cylinderCheckList.tipsTle')[0],
						content: that.$t('cylinderCheckList').backTxt(data.billNo),
						success: async function(res) {
							if (res.confirm) {
								const obj = {
									linkId: data.id
								}
								const {
									returnValue: res,
									message
								} = await auditTaskRecallTaskByLinkId(obj)
								if (res) {
									uni.showToast({
										title: message,
										icon: 'none'
									})
									that.getInfo(that.editId)
								}
							}
						}
					})
				} else {
					uni.showModal({
						title: that.$t('cylinderCheckList.tipsTle')[1],
						content: that.$t('cylinderCheckList').subTxt(data.billNo),
						success: async function(res) {
							if (res.confirm) {
								const obj = {
									ids: [data.id],
									state: type
								}
								const {
									returnValue: res,
									message
								} = await stockBillLogUpdateState(obj)
								if (res) {
									uni.showToast({
										title: message,
										icon: 'none'
									})
									that.getInfo(that.editId)
								}
							}
						}
					})
				}
			},
			// 删除
			handleDelete(data) {
				const that = this
				uni.showModal({
					title: that.$t('cylinderCheckList.tipsTle')[2],
					content: that.$t('cylinderCheckList').delTxt(data.billNo),
					success: async function(res) {
						if (res.confirm) {
							const obj = {
								ids: [data.id]
							}
							const {
								returnValue: res,
								message
							} = await stockBillLogDeleteByIds(obj)
							if (res) {
								uni.showToast({
									title: message,
									icon: 'none'
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
					if (res.stockFormType == 1) {
						await this.getCustomer(res.orgId)
						this.formDataSource[2].options = this.customerList
					} else if (res.stockFormType == 2) {
						await this.getPurSupplier()
						this.formDataSource[2].options = this.purSupplierList
					} else if (res.stockFormType == 3) {
						await this.getsysOrgDataList()
						this.formDataSource[2].options = this.sysOrgData
					}
					data.filePath = res.filePath.length ? JSON.parse(res.filePath) : [],
						data.stockFormType = res.stockFormType.toString()
					this.formDataSource[7].defaultValue = data.filePath
					data.orgId = res.orgId
					data.customerId = res.customerId
					data.linkBillNo = res.linkBillNo
					data.remarks = res.remarks
					data.licenseNo = res.licenseNo
					data.deliverManId = res.deliverManId
					data.checkState = res.checkState
					data.stockSourceType = res.stockSourceType
					this.linkId = res.linkId||''
					this.linkTypes = res.linkType||''
					this.formDataValue = data
					if(res.stockInoutLogList && res.stockInoutLogList.length){
						let listOrder = []
						res.stockInoutLogList.forEach((item,index)=>{
							let obj = {}
							obj.orderReason = {
								label: item.inOutName + (item.inOutType === 1 ? this.$t('stockMg.common.stockTypeTxt.in') : this.$t('stockMg.common.stockTypeTxt.out')),
								value: item.inOutReasonId,
								type: item.inOutType,
								reasonName: item.inOutName
							}
							obj.id = item.id
							obj.stockInoutLogDetailData = []
							if(item.stockInoutLogDetailsList && item.stockInoutLogDetailsList.length){
								item.stockInoutLogDetailsList.forEach((val,key)=>{
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
					params.customerId = data.customerId
					params.id = this.editId||''
					params.stockSourceType = 'stock'
					params.checkState = this.infos.checkState||1
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
							id: item.id||'',
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
						uni.showToast({
							title: message,
							icon: 'none'
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
				if(this.isSave){
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
				if (e.type == 'blur' && e.name == 'linkBillNo' && params.linkBillNo) {
					this.getLinkId(params.linkBillNo)
				}
				if (e.name == 'customerId') {
					this.linkId = ''
					this.linkTypes = ''
					params.linkBillNo = ''
				}

				if ((e.name == 'stockFormType' && params.stockFormType && (params.stockFormType != this.formDataValue
						.stockFormType)) || (params.stockFormType == 1 && e.name == 'orgId')) {
					this.formDataSource[2].show = true
					if (params.stockFormType == 1) {
						// 客户
						await this.getCustomer(params.orgId)
						this.formDataSource[2].options = this.customerList
					} else if (params.stockFormType == 2) {
						// 供应商
						await this.getPurSupplier()
						this.formDataSource[2].options = this.purSupplierList
					} else if (params.stockFormType == 3) {
						// 组织
						await this.getOrgList()
						this.formDataSource[2].options = this.orgList
					}
					params.customerId = ''
					this.$refs.dialogForm.resetPicker('customerId',[0],[0])
					if(!params.deliverManId){
						this.$refs.dialogForm.resetPicker('deliverManId',[0],[0])
					}
				}
				this.formDataValue = params
			},
			// 通过单号查找关联id
			getLinkId(value) {
				if (!value) {
					return
				}
				const params = {
					linkScope: "stock",
					billNo: value
				}
				sysLinkBillFindLinkBillObject(params).then(async (res) => {
					const data = res.returnValue
					if (data) {
						this.linkId = data.billId
						this.linkTypes = data.billType
						this.formDataSource[2].show = true
						if (data.formType === 1) {
							// 客户
							await this.getCustomer(data.orgId)
							this.formDataSource[2].options = this.customerList
						} else if (data.formType === 2) {
							// 供应商
							await this.getPurSupplier()
							this.formDataSource[2].options = this.purSupplierList
						} else if (data.formType === 3) {
							// 组织
							await this.getOrgList()
							this.formDataSource[2].options = this.orgList
						}
						let obj = {
							linkBillNo: data.billNo,
							customerId: data.customerId,
							stockFormType: (data.formType).toString()
						}
						this.formDataValue = {
							...this.formDataValue,
							...obj
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: this.$t('stockMg.addStockOrder.errNumsTxt')
						})
					}
				})
			},
			// 扫描二维码
			toScan(e) {
				if(this.isSave){
					return
				}
				// #ifdef APP-PLUS
				var result = await permision.requestAndroidPermission("android.permission.CAMERA")
				if (result === 1) {
					uni.scanCode({
						scanType: 'qrCode',
						success(res) {
							if (res.result) {
								this.getLinkId(res.result)
							}
						},
						fail(err) {
							console.log(err)
						}
					});
				}
				// #endif
				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sourceType: ["camera"],
					sizeType: ["original"],
					success: (res) => {
						const resFile = res.tempFilePaths[0]
						qrcode.decode(resFile)
						qrcode.callback = (imgRes) => {
							if (imgRes === "error decoding QR Code") {
								uni.showToast({
									icon: 'none',
									title: this.$t('stockMg.addStockOrder.errQrTxt')
								})
							} else {
								this.getLinkId(imgRes)
							}
						}
					}
				});
				// #endif
			}
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
