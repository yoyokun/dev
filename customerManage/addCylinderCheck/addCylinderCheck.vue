<template>
	<view class="gp-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="100" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue">
				<template v-slot:other>
					<u-form-item required :label="$t('addCylinderCheck.form.customerName.label')">
						<view class="item-top" @click="chooseCustomer">
							<view class="desc">
								<text v-if="customArr.length === 0">{{$t('addCylinderCheck.form.customerName.placeholder')}}</text>
							</view>
							<u-icon name="arrow-right" class="arrow"></u-icon>
						</view>
					</u-form-item>
					<view class="form-item" v-if="customArr.length">
						<view class="item-bottom" @click="chooseCustomer">
							<view class="item-cell" v-for="(item, index) in customArr" :key="index">
								<text>{{item.name}}</text>
								<u-icon @click.stop.native="delCustom(index)" color="#999" class="icon"
									name="close-circle-fill" v-if="!isSave" size="20"></u-icon>
							</view>
						</view>
					</view>
				</template>
			</edit-form>
		</view>
		<block v-if="customerInfo.length">
			<block v-for="(item,index) in customerInfo" :key='index'>
				<view class="info-main">
					<view class="head">
						<view class="gp-no">{{item.customerNo}}</view>
						<view class="gp-user">{{item.customerName}}</view>
						<view class="state" v-if="item.state != 2">{{$t('addCylinderCheck.stateTxt')[0]}}
						</view>
						<view class="state red" v-else>{{$t('addCylinderCheck.stateTxt')[1]}}</view>
					</view>
					<view class="main-box">
						<view class="item">
							<view>{{item.linkman}}</view>
							<view>{{item.linkTel}}</view>
						</view>
						<view class="item">{{item.province + item.city + item.area + item.address}}</view>
						<view class="item">
							<view>{{$t('addCylinderCheck.floorTxt')}}：{{item.floor}}</view>
							<view>{{$t('addCylinderCheck.doorNo')}}：{{item.doorplate}}</view>
						</view>
					</view>
				</view>
				<view class="table">
					<us-table :table-column="tableColumn" :table-data="item.userCylinderCheckDetailList">
						<view slot="checkStockNum" slot-scope="row">
							<input :disabled="isSave" class="input-stock" type="digit"
								:placeholder="$t('addCylinderCheck.stockNumPlaceholder')"
								:value="row.data.checkStockNum" @input="checkNum($event,row.index,index)" />
						</view>
						<view slot="diffNum" slot-scope="row">
							<text class="diff-num"
								:class="countDiffNum(row.data) < 0 ? 'red':''">{{countDiffNum(row.data)}}</text>
						</view>
					</us-table>
				</view>
			</block>
		</block>
		<view class="btn" v-if="!isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>
		<view class="btn" v-else>
			<u-button v-permission="{ permission:'app_cylinderCheckList_edit'}"
				v-if="infos.checkState==1||infos.checkState==4" :text="$t('common.btn.edit')" type="primary" hairline
				shape="circle" plain @click="changeEdit(false)">
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_submit'}" v-if="infos.checkState==1"
				:text="$t('common.btn.submit')" @click="handleUpdate(infos,2)" type="success" hairline
				shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_delete'}"
				v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" :text="$t('common.btn.delete')"
				type="error" hairline shape="circle" plain @click="handleDelete(infos)">
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_revert'}" v-if="infos.checkState==2"
				:text="$t('common.btn.withdraw')" @click="handleUpdate(infos,7)" type="warning" hairline
				shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_invalid'}"
				v-if="infos.checkState==3||infos.checkState==6" :text="$t('common.btn.toVoid')"
				@click="handleVoid(infos)" type="error" hairline shape="circle" plain></u-button>
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
		UnixToDate
	} from '@/utils/util'
	import {
		userCylinderCheckFindById,
		auditTaskRecallTaskByLinkId,
		userCylinderCheckUpdateState,
		userCylinderCheckSaveOrEdit,
		userCylinderCheckDeleteByIds,
		userCylinderCheckToVoid,
		userCylinderCheckFindCustomerIds
	} from '@/api/lpgManageAppApi'
	import {
		positiveInteger
	} from '@/utils'
	export default {
		data() {
			return {
				showModal: false,
				modalParams: {},
				isSave: false,
				UnixToDate: UnixToDate,
				customArr: [],
				formDataValue: {
					billTime: '',
					remarks: ''
				},
				infos: {},
				formDataSource: [{
						type: 'datetime',
						labelText: this.$t('addCylinderCheck.form.billTime.label'),
						fieldName: 'billTime',
						disabled: false,
						placeholder: this.$t('addCylinderCheck.form.billTime.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('addCylinderCheck.form.billTime.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('addCylinderCheck.form.remarks.label'),
						fieldName: 'remarks',
						placeholder: this.$t('addCylinderCheck.form.remarks.placeholder'),
						disabled: false
					}
				],
				customerInfo: [],
				tableColumn: [{
						prop: 'showName',
						label: this.$t('addCylinderCheck.tableColumn.showName'),
						width: '200rpx',
						align: 'center'
					},
					{
						prop: 'systemStockNum',
						label: this.$t('addCylinderCheck.tableColumn.systemStockNum'),
						width: '150rpx',
						align: 'center'
					},
					{
						prop: 'checkStockNum',
						label: this.$t('addCylinderCheck.tableColumn.checkStockNum'),
						width: '150rpx',
						align: 'center',
						slot: 'checkStockNum'
					},
					{
						prop: 'diffNum',
						label: this.$t('addCylinderCheck.tableColumn.diffNum'),
						width: '150rpx',
						align: 'center',
						slot: 'diffNum'
					}
				],
				tableData: []
			}
		},
		async onLoad(options) {
			uni.$on('chooseCustomer', (data) => {
				let customArr = []
				let customerIds = []
				data.forEach(i => {
					customerIds.push(i.id)
					let obj = {
						id: i.id,
						name: i.customerName
					}
					customArr.push(obj)
				})
				this.customArr = customArr
				this.customerIds = customerIds.join(',')
				this.getInfo({
					customerIds: customerIds.join(',')
				})
			})
			this.editId = options.editId || ''
			if (this.editId) {
				uni.setNavigationBarTitle({
					title: this.$t('addCylinderCheck.titleTextEdit')
				});
				this.changeEdit(true)
				const {
					returnValue: res
				} = await userCylinderCheckFindCustomerIds({
					id: this.editId
				})
				if (res) {
					this.customerIds = res
					this.getInfo({
						customerIds: res,
						id: this.editId
					})
				}
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('addCylinderCheck.titleText')
				});
			}
		},
		onShow() {

		},
		onUnload() {
			uni.$off('chooseCustomer')
		},
		methods: {
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
			},
			// 转化正整数
			checkNum(e, key, index) {
				this.customerInfo[index].userCylinderCheckDetailList[key].checkStockNum = positiveInteger(e.detail.value)
			},
			// 删除客户
			delCustom(index) {
				const id = this.customArr[index].id
				const ids = this.customerIds.split(',')
				let idsArr = []
				this.customArr.splice(index, 1)
				ids.forEach(i => {
					if (i != id) {
						idsArr.push(i)
					}
				})
				this.customerIds = idsArr.join(',')
				this.customerInfo = this.customerInfo.filter(i => i.customerId != id)
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
				} = await userCylinderCheckToVoid({
					ids: [this.modalParams.voidData.id],
					remarks: remarks || ''
				}).catch(err=>{
					this.closeModal()
				})
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					this.getInfo({
						customerIds: this.customerIds,
						id: this.editId
					})
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
							} = await userCylinderCheckDeleteByIds({
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
									this.getInfo({
										customerIds: this.customerIds,
										id: this.editId
									})
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
								} = await userCylinderCheckUpdateState({
									ids: [data.id],
									state: type
								})
								if (res) {
									this.$refs.uToast.show({
										type: 'success',
										message: message,
									})
									this.getInfo({
										customerIds: this.customerIds,
										id: this.editId
									})
								}
							}
						}
					})
				}
			},
			// 保存数据
			async saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					if (!(this.customerInfo&&this.customerInfo.length)) {
							this.$refs.uToast.show({
								type: 'error',
								message: this.$t('addCylinderCheck.form.customerName.placeholder'),
							})
							return
						}
						data.billTimeStr = this.UnixToDate(data.billTime)
						delete data.billTime
						data.id = this.editId || ''
						data.checkDetailData = []
						this.customerInfo.forEach((item, index) => {
							let obj = {
								id: item.id,
								customerId: item.customerId,
								userCylinderCheckData: []
							}
							item.userCylinderCheckDetailList.forEach((val, key) => {
								if(val.checkStockNum !== '') {
									obj.userCylinderCheckData.push({
										id: val.id || '',
										stockSetId: val.stockSetId,
										showName: val.showName,
										systemStockNum: val.systemStockNum,
										checkStockNum: val.checkStockNum
									})
								}
							})
							data.checkDetailData.push(obj)
						})
						data.checkDetailData = JSON.stringify(data.checkDetailData)
						const {
							returnValue: res,
							message
						} = await userCylinderCheckSaveOrEdit(data)
						if (res) {
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					
				})
				},
			// 计算差异
			countDiffNum(data) {
				return this.$bigDecimal.round(this.$bigDecimal.subtract(data.checkStockNum, data.systemStockNum), 2)
			},
			// 获取详情
			async getInfo(params) {
				const {
					returnValue: res,
					titleObject: titleObject
				} = await userCylinderCheckFindById(params)
				let customArr = []
				res.userCylinderCheckCustomerVoList.forEach((item, index) => {
					customArr.push({
						id: item.customerId,
						name: item.customerName
					})
				})
				this.customArr = customArr
				if (this.editId) {
					this.formDataValue.billTime = res.billTime
					this.formDataValue.remarks = res.remarks
				}
				this.customerInfo = res.userCylinderCheckCustomerVoList
				this.infos = res
			},
			chooseCustomer() {
				if (this.isSave) {
					return
				}
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.customerIds,
					orgId: this.userInfo.orgId,
					multiple: true
				})
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

	.gp-info {
		padding: 30rpx 20rpx;

		.btn {
			width: 632rpx;
			margin: 60rpx auto;
			@include flexMixin(column);
			.u-button{
				margin: 20rpx 10rpx;
			}
		}

		.form {
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
			.item-top {
				width: 100%;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				line-height: 50rpx;
				.desc {
					width: 1px;
					flex: 1;
					font-size: 28rpx;
					color: #606266;
				}
			}
			.form-item {
				padding: 0rpx 20rpx 20rpx 20rpx;
				.item-bottom {
					width: 100%;
					border-radius: 10rpx;
					background: rgba(247, 247, 247, 1);
					padding: 24rpx 20rpx;
					display: flex;
					flex-wrap: wrap;
					padding-top: 0;
					box-sizing: border-box;
					.item-cell {
						display: flex;
						align-items: center;
						padding: 0 20rpx;
						height: 56rpx;
						border-radius: 56rpx;
						background: rgba(0, 0, 0, 0.06);
						margin-right: 20rpx;
						margin-top: 24rpx;
						font-size: 30rpx;
						.icon {
							margin-left: 30rpx;
						}
					}
				}
			}
		}

		.info-main {
			margin-top: 30rpx;
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
			font-size: 28rpx;
			line-height: 28rpx;

			.head {
				display: flex;
				align-items: center;
				font-weight: bold;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;

				.state {
					font-weight: normal;
					color: rgba(42, 130, 228, 1);

					.red {
						color: red;
					}
				}
			}

			.main-box {
				padding: 20rpx 30rpx;

				.item {
					display: flex;
					align-items: center;
					// margin-top: 30rpx;
					padding: 20rpx 0rpx;
					word-break: break-all;

					>view {
						min-width: 200rpx;
					}
				}
			}
		}

		.table {
			margin-top: 30rpx;
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
			overflow: hidden;

			.input-stock {
				font-size: 26rpx;
				color: #999;
				border-bottom: 1px solid #ccc;
			}

			.diff-num.red {
				color: red;
			}
		}

		.actions {
			height: calc(100rpx + constant(safe-area-inset-bottom));
			height: calc(100rpx + env(safe-area-inset-bottom));

			.actions-box {
				position: fixed;
				height: calc(100rpx + constant(safe-area-inset-bottom));
				height: calc(100rpx + env(safe-area-inset-bottom));
				width: 100%;
				bottom: 0;
				left: 0;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: white;
				box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;

				.button {
					height: 70rpx !important;
					width: 600rpx;
				}
			}
		}
	}
</style>
