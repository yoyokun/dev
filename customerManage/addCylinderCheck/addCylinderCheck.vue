<template>
	<view class="gp-info">

		<view class="form">
			<edit-form ref="dialogForm" labelWidth="100" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseCustomer="chooseCustomer">
				<template v-slot:other>

					<view class="form-item require">
						<view class="item-top">
							<view class="label">{{$t('addCylinderCheck.form.customerName.label')}}</view>
							<view class="desc" @click="chooseCustomer">
								<input disabled type="text"
									:placeholder="customArr.length?'':$t('addCylinderCheck.form.customerName.placeholder')" />
							</view>
							<u-icon name="arrow-right" class="arrow"></u-icon>
						</view>
						<view class="item-bottom" @click="chooseCustomer" v-if="customArr.length">
							<view class="item-cell" v-for="(item, index) in customArr" :key="index">
								<text>{{item.name}}</text>
								<u-icon @click.stop.native="delCustom(index)" color="#999" class="icon"
									name="close-circle-fill" v-if="!isSave"></u-icon>
							</view>
						</view>

					</view>
				</template>
			</edit-form>
		</view>
		<block v-if="customerInfo">
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
				:text="$t('cylinderCheckList.btns')[2]" @click="handleUpdate(infos,2)" type="success" hairline
				shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_delete'}"
				v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" :text="$t('common.btn.delete')"
				type="error" hairline shape="circle" plain @click="handleDelete(infos)">
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_revert'}" v-if="infos.checkState==2"
				:text="$t('cylinderCheckList.btns')[3]" @click="handleUpdate(infos,7)" type="warning" hairline
				shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderCheckList_invalid'}"
				v-if="infos.checkState==3||infos.checkState==6" :text="$t('cylinderCheckList.btns')[4]"
				@click="handleVoid(infos)" type="info" hairline shape="circle" plain></u-button>
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
						placeholder: this.$t('addCylinderCheck.form.billTime.placeholder')
					},
					{
						type: 'text',
						labelText: this.$t('addCylinderCheck.form.remarks.label'),
						fieldName: 'remarks',
						placeholder: this.$t('addCylinderCheck.form.remarks.placeholder'),
						disabled: false
					}
				],
				customerInfo: null,
				tableColumn: [{
						prop: 'standardName',
						label: this.$t('addCylinderCheck.tableColumn.standardName'),
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
			changeForm(e) {
				this.formDataValue = e.queryParams
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
			},
			// 转化正整数
			checkNum(e, key, index) {
				this.customerInfo[index].userCylinderCheckDetailList[key].checkStockNum = e.detail.value
				let nums = Math.abs(Math.round(e.detail.value))
				this.$nextTick(function() {
					this.customerInfo[index].userCylinderCheckDetailList[key].checkStockNum = nums
				});

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
				const obj = {
					ids: [],
					invalidRemarks: this.modalParams.value || ''
				}
				obj.ids.push(this.modalParams.voidData.id)
				const {
					returnValue: res,
					message
				} = await userCylinderCheckToVoid(obj).catch(err=>{
					this.closeModal()
				})
				if (res) {
					uni.showToast({
						title: message,
						icon: 'none'
					})
					this.getInfo({
						customerIds: that.customerIds,
						id: that.editId
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
							} = await userCylinderCheckDeleteByIds(obj)
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
			// 提交 撤回
			handleUpdate(data, type) {
				const that = this
				if (type === 7) {
					uni.showModal({
						title: that.$t('common.tipsTle')[0],
						content: that.$t('common').backTxt(data.billNo),
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
									that.getInfo({
										customerIds: that.customerIds,
										id: that.editId
									})
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
								} = await userCylinderCheckUpdateState(obj)
								if (res) {
									uni.showToast({
										title: message,
										icon: 'none'
									})
									that.getInfo({
										customerIds: that.customerIds,
										id: that.editId
									})
								}
							}
						}
					})
				}
			},
			// 保存数据
			async saveData() {
				if (!this.formDataValue.billTime || !this.customerInfo) {
					uni.showToast({
						title: this.$t('addCylinderCheck.tipsTxt'),
						icon: 'none'
					})
					return
				}
				let data = {
					...this.formDataValue
				}
				data.billTimeStr = this.UnixToDate(data.billTime)
				delete data.customArr
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
						obj.userCylinderCheckData.push({
							id: val.id || '',
							standardId: val.standardId,
							standardName: val.standardName,
							systemStockNum: val.systemStockNum,
							checkStockNum: val.checkStockNum
						})
					})
					data.checkDetailData.push(obj)
				})
				data.checkDetailData = JSON.stringify(data.checkDetailData)
				const {
					returnValue: res,
					message
				} = await userCylinderCheckSaveOrEdit(data)
				if (res) {
					uni.showToast({
						title: message,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1500)
				}
			},
			// 计算差异
			countDiffNum(data) {
				return data.checkStockNum - data.systemStockNum
			},
			// 获取详情
			async getInfo(params) {
				const {
					returnValue: res,
					titleObject: titleObject
				} = await userCylinderCheckFindById(params)
				let customArr = []
				// 获取显示的sku
				let column = null
				let skuId = []
				titleObject.tableColumn.forEach((item, index) => {
					if (item.prop == 'standardCheckNum') {
						column = item
					}
				})
				if (column.childrenList.length > 0) {
					column.childrenList.forEach((item, index) => {
						skuId.push(item.defaultId)
					})
				}
				// 过滤多余sku
				res.userCylinderCheckCustomerVoList.forEach((item, index) => {
					let skuArr = []
					customArr.push({
						id: item.customerId,
						name: item.customerName
					})
					item.userCylinderCheckDetailList = item.userCylinderCheckDetailList.filter((val => skuId
						.indexOf(val.standardId) > -1))
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
			@include flexMixin();

			.u-button {
				margin: 0rpx 10rpx;
			}
		}

		.form {
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);

			.form-item {
				display: flex;
				align-items: center;
				font-size: 15px;
				line-height: 15px;
				min-height: 46rpx;
				border-bottom: 1px solid #eee;
				padding: 20rpx 20rpx;
				flex-wrap: wrap;

				.item-top {
					width: 100%;
					display: flex;
					align-items: center;
					font-size: 15px;
					line-height: 15px;
				}

				.item-bottom {
					width: 100%;
					border-radius: 20rpx;
					background: rgba(247, 247, 247, 1);
					padding: 24rpx 20rpx;
					margin-top: 20rpx;
					display: flex;
					flex-wrap: wrap;
					padding-top: 0;

					.item-cell {
						display: flex;
						align-items: center;
						padding: 0 20rpx;
						height: 56rpx;
						border-radius: 56rpx;
						background: rgba(0, 0, 0, 0.06);
						margin-right: 20rpx;
						margin-top: 24rpx;

						.icon {
							margin-left: 30rpx;
						}
					}
				}

				&.require {
					position: relative;

					&::before {
						content: '*';
						color: red;
						position: absolute;
						display: none;
						// display: block;
						left: 8rpx;
					}
				}

				.label {
					min-width: 100px;
				}

				.desc {
					width: 1px;
					flex: 1;
					font-size: 28rpx;
				}

				.arrow {}

				input {
					font-size: 15px;
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
