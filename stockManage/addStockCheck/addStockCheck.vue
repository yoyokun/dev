<template>
	<view class="sk-info">
		<view class="form" v-show="!isSave">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm">
			</edit-form>
		</view>

		<view class="list-box">
			<view class="list" v-show="isSave&&editId">
				<description-list :title="$t('stockMg.addStockCheck.baseTle')">
					<description :label="$t('stockMg.addStockCheck.billNo')">{{ infos.billNo }}</description>
					<description :label="$t('stockMg.addStockCheck.orgName')">{{ infos.orgName }}</description>
					<description :label="$t('stockMg.addStockCheck.checkState')">{{ infos.checkState | checkState }}
					</description>
					<description :label="$t('stockMg.addStockCheck.lockState')">{{ infos.lockState | lockState }}
					</description>
					<description :label="$t('stockMg.addStockCheck.state')">{{ infos.state | state }}</description>
					<description :label="$t('stockMg.addStockCheck.billTime')">{{ infos.billTime | dayjs }}
					</description>
					<description :label="$t('stockMg.addStockCheck.creator')">{{ infos.creator }}</description>
					<description :label="$t('stockMg.addStockCheck.operationTime')">{{ infos.operationTime | dayjs }}
					</description>
					<description :label="$t('stockMg.addStockCheck.operator')">{{ infos.operator }}</description>
					<description :label="$t('stockMg.addStockCheck.remarks')">{{ infos.remarks }}</description>
				</description-list>
			</view>
			<view class="list">
				<view class="list-head">
					<view class="head-tle">{{$t('stockMg.addStockCheck.stockGoodsTle')}}</view>
					<view class="act-btn" @click="chooseGoods" v-if="!isSave">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">{{$t('stockMg.common.btn.addGoodsTxt')}}</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(val,key) in listGoods" :key="key">
						<view class="goods-head">
							<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
							<view class="goods-reason on" @click="chooseReason(key)"
								v-if="val.reason&&val.reason.reasonName">
								{{val.reason.name}} >
							</view>
							<view class="goods-reason" @click="chooseReason(key)" v-else>
								{{$t('stockMg.addStockCheck.reasonTxt')}} >
							</view>
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
								@click="removeOrderGoods(key)">
							</u-icon>
						</view>

						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addStockCheck.curStock')}}：</view>
								<view class="cell-content">{{val.curStock}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addStockCheck.checkNums')}}：</view>
								<view class="cell-content">
									<input type="number" :disabled="isSave"
										:placeholder="$t('stockMg.addStockCheck.checkNums')" v-model="val.checkNums"
										@input="changeNums($event,key)" />
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addStockCheck.diffNums')}}：</view>
								<view class="cell-content" :class="countDiffNum(val) < 0 ? 'red':'green'">
									{{countDiffNum(val)}}
								</view>
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
			<u-button :text="$t('stockMg.common.btn.dealStock')" type="error" hairline shape="circle" @click="saveData">
			</u-button>
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>

		<view class="btn" v-else>
			<u-button v-permission="{ permission:'app_stockCheckList_edit'}" :text="$t('common.btn.edit')"
				v-if="infos.checkState==1||infos.checkState==4" type="primary" hairline shape="circle" plain
				@click="changeEdit(false)">
			</u-button>
			<u-button v-permission="{ permission:'app_stockCheckList_submit'}" :text="$t('common.btn.submit')"
				@click="handleUpdate(infos,2)" v-if="infos.checkState==1" type="success" hairline shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_stockCheckList_revert'}" :text="$t('common.btn.withdraw')"
				@click="handleUpdate(infos,7)" v-if="infos.checkState==2" type="warning" hairline shape="circle" plain>
			</u-button>
			<u-button v-permission="{ permission:'app_stockCheckList_delete'}" :text="$t('common.btn.delete')"
				type="error" hairline shape="circle"
				v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" plain @click="handleDelete(infos)">
			</u-button>
			<u-button v-permission="{ permission:'app_stockCheckList_invalid'}"
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
	let that = null
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		stockCheckLogSaveOrEdit,
		stockCheckLogFindById,
		stockCheckLogDeleteByIds,
		stockCheckLogUpdateState,
		stockCheckLogToVoid
	} from '@/api/lpgSalesManageApi'
	import {
		auditTaskRecallTaskByLinkId
	} from '@/api/lpgManageAppApi'
	import {
		checkPrice
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
						type: 'text',
						labelText: this.$t('stockMg.addStockCheck.form.orgName.label'),
						fieldName: 'orgName',
						disabled: true,
						required: true,
					},
					{
						type: 'switch',
						labelText: this.$t('stockMg.addStockCheck.form.lockState.label'),
						fieldName: 'lockState',
						required: true,
						inputAlign: 'right',
						defaultValue: 1,
						activeValue: 1,
						inactiveValue: 0,

					},
					{
						type: 'textarea',
						labelText: this.$t('stockMg.addStockCheck.form.remarks.label'),
						fieldName: 'remarks',
						placeholder: this.$t('stockMg.addStockCheck.form.remarks.placeholder'),
						borderBottom: false
					},
				],
				formDataValue: {},
				listGoods: [],
				show: false,
				stockInoutReason: [],
				infos: {},
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('stockMg.stockCheckList.stateTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('stockMg.addStockCheck.checkStateTxt')
				return stateObj[value] || ''
			},
			lockState(value) {
				const stateObj = that.$t('stockMg.addStockCheck.lockStateTxt')
				return stateObj[value] || ''
			},
		},
		computed: {

		},
		async created() {
			that = this
		},
		async mounted() {

		},
		async onLoad(options) {
			const that = this
			setTimeout(function() {
				that.$set(that.formDataValue, 'orgName', that.userInfo.orgName)
			}, 1)

			this.editId = options.editId || ''
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockCheck.titleTextInfo')
				});
				await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockCheck.titleText')
				});
			}
			this.getStockInoutReason()
			uni.$once('chooseGoods', (res) => {
				res.forEach((item, index) => {
					item.checkNums = 1
					item.id = ''
					this.listGoods.push(item)
				})
				const hash = {}
				this.listGoods = this.listGoods.reduce((preVal, curVal) => {
					hash[curVal.goodsDetailId] ? '' : (hash[curVal.goodsDetailId] = true && preVal
						.push(curVal))
					return preVal
				}, [])
			})


		},
		onUnload() {
			uni.$off('chooseGoods')
		},
		onShow() {

		},
		methods: {
			changeNums(e, key) {
				const nums = checkPrice(e.detail.value)
				let item = this.listGoods[key]
				item.checkNums = e.detail.value
				this.$set(this.listGoods, key, item)
				this.$nextTick(function() {
					item.checkNums = nums
					this.$set(this.listGoods, key, item)
				})
			},
			// 计算差异
			countDiffNum(data) {
				return this.$bigDecimal.round(this.$bigDecimal.subtract(data.checkNums, data.curStock), 2)
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
				} = await stockCheckLogToVoid({
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
				if (isSave == false && this.infos) {
					uni.setNavigationBarTitle({
						title: this.$t('stockMg.addStockCheck.titleTextEdit')
					});
				}
				if (isSave) {
					this.formDataSource.forEach((v, k) => {
						v.disabled = true
					})
				} else {
					this.formDataSource.forEach((v, k) => {
						v.disabled = false
						if (k == 0) {
							v.disabled = true
						}
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
								} = await stockCheckLogUpdateState({
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
							} = await stockCheckLogDeleteByIds({
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
				} = await stockCheckLogFindById({
					id
				})
				if (res) {
					this.infos = res
					this.formDataValue.lockState = res.lockState == true ? 1 : 0
					this.formDataValue.remarks = res.remarks
					if (res.stockCheckLogDetailsList.length) {
						res.stockCheckLogDetailsList.forEach(i => {
							i.checkNums = i.checkStockNum
							i.curStock = i.systemStockNum
							i.reason = {
								name: i.inOutName + (i.inOutType === 1 ? this.$t(
									'stockMg.common.stockTypeTxt.in') : this.$t(
									'stockMg.common.stockTypeTxt.out')),
								value: i.inOutReasonId,
								type: i.inOutType,
								reasonName: i.inOutName
							}
						})
						this.listGoods = res.stockCheckLogDetailsList
					}
				}
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					let params = data
					delete params.orgName
					params.id = this.infos.id || ''
					params.checkState = this.infos.checkState || 1
					params.lockState = params.lockState > 0 ? true : false
					params.checkDetailData = []
					this.listGoods.forEach((item, index) => {
						let obj = {
							goodsDetailId: item.goodsDetailId,
							goodsId: item.goodsId,
							systemStockNum: item.curStock,
							checkStockNum: item.checkNums,
							id: item.id ? item.id : ''
						}
						if (item.reason && item.reason.inOutReasonId) {
							obj.inOutReasonId = item.reason.value
						}
						params.checkDetailData.push(obj)
					})
					params.checkDetailData = JSON.stringify(params.checkDetailData)
					const {
						returnValue: res,
						message
					} = await stockCheckLogSaveOrEdit(params)
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
				this.listGoods[this.tempIndex].reason = e.value[0]
				this.close()
			},
			close() {
				this.show = false
			},
			// 移除商品
			removeOrderGoods(index) {
				this.listGoods.splice(index, 1)
			},
			// 选择商品
			chooseGoods() {
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					multiple: true
				})
			},
			// 表单
			async changeForm(e) {
				let params = e.queryParams
				console.log(params)
				this.formDataValue = params
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

	.sk-info {
		padding: 30rpx 20rpx;

		.form {
			margin-bottom: 30rpx;
		}

		::v-deep .normalForm {
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
				&:last-child {
					margin-bottom: 0rpx;
				}

				margin-bottom: 30rpx;
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

					.act-btn {
						display: flex;
						height: 60rpx;
						border-radius: 60rpx;
						background: rgba(42, 130, 228, 1);
						box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
						align-items: center;
						padding: 0 20rpx;
						font-size: 28rpx;
						color: white;

						.add-icon {
							::v-deep .u-icon__icon {
								color: white !important;
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

							.goods-reason {
								font-size: 28rpx;
								line-height: 38rpx;
								margin-left: 10rpx;
								color: #666;

								&.on {
									color: rgba(42, 130, 228, 1);
								}
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
							font-size: 30rpx;
							line-height: 30rpx;
							margin-top: 30rpx;
							justify-content: space-between;

							.cell {
								display: flex;
								align-items: center;

								.cell-label {
									color: rgba(128, 128, 128, 1);
								}

								.cell-content {
									input {
										width: 120rpx;
										font-size: 30rpx;
										text-align: center;
										border-bottom: 1px solid #ccc;
									}
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
