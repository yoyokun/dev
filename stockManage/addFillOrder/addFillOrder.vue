<template>
	<view class="sk-info">
		<view class="form" v-show="!isSave">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @toScan="toScan">
			</edit-form>
		</view>

		<view class="list-box">
			<view class="list" v-show="isSave&&editId">
				<description-list :title="$t('stockMg.addFillOrder.baseTle')">
					<description :label="$t('stockMg.addFillOrder.billNo')">{{ infos.billNo }}</description>
					<description :label="$t('stockMg.addFillOrder.orgName')">{{ infos.orgName }}</description>
					<description :label="$t('stockMg.addFillOrder.checkState')">{{ infos.checkState | checkState }}
					</description>
					<description :label="$t('stockMg.addFillOrder.fillTime')">{{infos.fillingStartTime|dayjs('YYYY-MM-DD HH:mm')}} - {{infos.fillingEndTime|dayjs('YYYY-MM-DD HH:mm')}}</description>
					<description :label="$t('stockMg.addFillOrder.inOutName')">{{infos.inOutName + (infos.inOutType === 1 ? this.$t('stockMg.common.stockTypeTxt.in') : this.$t('stockMg.common.stockTypeTxt.out'))}}
					</description>
					<description :label="$t('stockMg.addFillOrder.operationTime')">{{ infos.operationTime | dayjs }}
					</description>
					<description :label="$t('stockMg.addFillOrder.operator')">{{ infos.operator }}</description>
					<description :label="$t('stockMg.addFillOrder.remarks')">{{ infos.remarks }}</description>
				</description-list>
			</view>
			<view class="list">
				<view class="list-head">
					<view class="head-tle">{{$t('stockMg.addFillOrder.goodsTle')}}</view>
					<view class="act-btn" @click="chooseGoods" v-if="!isSave">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">{{$t('stockMg.common.btn.addGoodsTxt')}}</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(val,key) in listGoods" :key="key">
						<view class="goods-head">
							<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
							<view class="goods-fill">
								<text>{{$t('stockMg.addFillOrder.profit')}}</text><text class="nums red">{{val.profit}}</text><text>kg</text>
							</view>
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
										<view class="item-tle">{{$t('stockMg.common.propertyNames')}}：</view>
										<view class="item-txt">{{val.propertyNames}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.standardName')}}：</view>
										<view class="item-txt">{{val.standardName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.unitsName')}}：</view>
										<view class="item-txt">{{val.unitsName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.brandName')}}：</view>
										<view class="item-txt">{{val.brandName}}</view>
									</view>
									<view class="attr-item">
										<view class="item-tle">{{$t('stockMg.common.goodsClassifyName')}}：</view>
										<view class="item-txt">{{val.goodsClassifyName}}</view>
									</view>
								</view>
							</view>
							<u-icon v-if="!isSave" class="remove-goods" name="minus-circle-fill"
								@click="removeOrderGoods(key)">
							</u-icon>
						</view>

						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addFillOrder.systemNum')}}：</view>
								<view class="cell-content">{{val.systemNum}}{{$t('stockMg.addFillOrder.unit')}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addFillOrder.planWeight')}}：</view>
								<view class="cell-content">{{val.planWeight}}kg</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addFillOrder.realNum')}}：</view>
								<view class="cell-content">
									<input type="number" :placeholder="$t('stockMg.addFillOrder.realNum')" @input="changeNums($event,key,'realNum')" v-model="val.realNum" />
									<text>{{$t('stockMg.addFillOrder.unit')}}</text>
								</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('stockMg.addFillOrder.realWeight')}}：</view>
								<view class="cell-content">
									<input :placeholder="$t('stockMg.addFillOrder.realWeight')" type="number" v-model="val.realWeight"
										@input="changeNums($event,key,'realWeight')" />
									<text>kg</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btn" v-if="!isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>

		<view class="btn" v-else>
			<u-button :text="$t('common.btn.edit')" v-if="infos.checkState==1||infos.checkState==4" type="primary"
				hairline shape="circle" plain @click="changeEdit(false)">
			</u-button>
			<u-button :text="$t('cylinderCheckList.btns')[2]" @click="handleUpdate(infos,2)" v-if="infos.checkState==1"
				type="success" hairline shape="circle" plain>
			</u-button>
			<u-button :text="$t('cylinderCheckList.btns')[3]" @click="handleUpdate(infos,7)" v-if="infos.checkState==2"
				type="warning" hairline shape="circle" plain>
			</u-button>
			<u-button :text="$t('common.btn.delete')" type="error" hairline shape="circle"
				v-if="infos.checkState==1||infos.checkState==5||infos.checkState==4" plain @click="handleDelete(infos)">
			</u-button>
			<u-button :text="$t('common.btn.toVoid')" @click="handleVoid(infos)"
				v-if="(infos.checkState==3||infos.checkState==6)&& infos.moneySourceType ==='money'" type="info" hairline shape="circle" plain></u-button>
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
	let that = null
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import qrcode from "@/utils/reqrcode.js"
	import {
		fillingChangeLogSaveOrEdit,
		fillingChangeLogFindById,
		fillingChangeLogDeleteByIds,
		fillingChangeLogUpdateState,
		fillingChangeLogToVoid,
		fillingLogFindGoodsDataList
	} from '@/api/lpgSalesManageApi'
	import {
		auditTaskRecallTaskByLinkId
	} from '@/api/lpgManageAppApi'
	import {
		checkPrice
	} from '@/utils'
	import {
		UnixToDate
	} from '@/utils/util.js'
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
						labelText: this.$t('stockMg.addFillOrder.form.orgName.label'),
						fieldName: 'orgName',
						disabled: true,
					},
					{
						type: 'datetimerange',
						labelText: this.$t('stockMg.addFillOrder.form.fillingRange.label'),
						fieldName: 'fillingRange',
						startName: 'minRecordEndTime', // 开始日期字段
						endName: 'maxRecordEndTime', // 结束日期字段
					},
					{
						type: 'picker',
						labelText: this.$t('stockMg.addFillOrder.form.inOutReasonId.label'),
						fieldName: 'inOutReasonId',
						placeholder: this.$t('stockMg.addFillOrder.form.inOutReasonId.placeholder'),
						options: [],
						rules: [{
							required: true,
							message: this.$t('stockMg.addFillOrder.form.inOutReasonId.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'textarea',
						labelText: this.$t('stockMg.addFillOrder.form.remarks.label'),
						fieldName: 'remarks',
						placeholder: this.$t('stockMg.addFillOrder.form.remarks.placeholder'),
						borderBottom: false,
						rules: [{
							required: true,
							message: this.$t('stockMg.addFillOrder.form.remarks.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
				],
				formDataValue: {},
				listGoods: [],
				stockInoutReason: [],
				infos: {},
				infoData: {
					totalCount: 0,
					totalWeight: 0,
					planTotalWeight: 0,
					profitWeight: 0,
					profitRate: 0,
				}
			}
		},
		// 过滤器
		filters: {
			checkState(value) {
				const stateObj = that.$t('stockMg.addFillOrder.checkStateTxt')
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
			uni.$on('chooseGoods', (res) => {
				res.forEach((item, index) => {
					item.systemNum = 0
					item.planWeight = 0
					item.profit = (0).toFixed(2)
					item.id = ''
					item.realNum = 0
					item.realWeight = 0
					this.listGoods.push(item)
				})
				const hash = {}
				this.listGoods = this.listGoods.reduce((preVal, curVal) => {
					hash[curVal.goodsDetailId] ? '' : (hash[curVal.goodsDetailId] = true && preVal
						.push(curVal))
					return preVal
				}, [])
			})
			const that = this
			setTimeout(function() {
				that.$set(that.formDataValue, 'orgName', that.userInfo.orgName)
			}, 1)
			this.editId = options.editId || ''
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addFillOrder.titleTextInfo')
				});
				await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addFillOrder.titleText')
				});
			}
			await this.getStockInoutReason()
			this.formDataSource[2].options = this.stockInoutReason
			await this.getGoodsDataList()
		},
		onUnload() {
			uni.$off('chooseGoods')
		},
		onShow() {

		},
		methods: {
			changeNums(e, key, field) {
				const nums = checkPrice(e.detail.value)
				let item = this.listGoods[key]
				if(field=='realWeight'){
					item.realWeight = e.detail.value
					this.$set(this.listGoods, key, item)
					this.$nextTick(function() {
						item.realWeight = nums
						item.profit = this.$bigDecimal.round(this.$bigDecimal.subtract(item.planWeight, item
							.realWeight), 2)
						this.$set(this.listGoods, key, item)
					})
				}else if(field=='realNum'){
					item.realNum = e.detail.value
					this.$set(this.listGoods, key, item)
					this.$nextTick(function() {
						item.realNum = nums
						this.$set(this.listGoods, key, item)
					})
				}
				
			},
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
				} = await fillingChangeLogToVoid(obj).catch(err => {
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
				if (isSave == false && this.infos) {
					uni.setNavigationBarTitle({
						title: this.$t('stockMg.addFillOrder.titleTextEdit')
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
								} = await fillingChangeLogUpdateState(obj)
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
							} = await fillingChangeLogDeleteByIds(obj)
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
				const that = this
				const {
					returnValue: res
				} = await fillingChangeLogFindById({
					id
				})
				if (res) {
					this.infos = res
					this.formDataValue.remarks = res.remarks
					this.formDataValue.inOutReasonId = res.inOutReasonId
					if (res.fillingStartTime && res.fillingEndTime) {
						this.formDataValue.fillingRange = [UnixToDate(res.fillingStartTime), UnixToDate(res
							.fillingEndTime)]
					}
					if (res.fillingChangeLogDetailList.length) {
						res.fillingChangeLogDetailList.forEach(i => {
							i.profit = this.$bigDecimal.round(this.$bigDecimal.subtract(i.planWeight, i
								.realWeight), 2)
						})
						this.listGoods = res.fillingChangeLogDetailList
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
					params.minRecordEndTime = ''
					params.maxRecordEndTime = ''
					if (params.fillingRange && params.fillingRange.length) {
						params.minRecordEndTime = params.fillingRange[0]
						params.maxRecordEndTime = params.fillingRange[1]
					}
					delete params.fillingRange
					params.systemTotalNum = this.infoData.totalCount
					params.systemTotalWeight = this.infoData.totalWeight
					params.planTotalWeight = this.infoData.planTotalWeight
					params.fillingChangeData = []
					let realTotalNum = 0
					let realTotalWeight = 0
					this.listGoods.forEach((item, index) => {
						realTotalNum += parseInt(item.realNum)
						realTotalWeight += item.realWeight
						let obj = {
							goodsDetailId: item.goodsDetailId,
							goodsName: item.goodsName,
							goodsId: item.goodsId,
							goodsNo: item.goodsNo,
							goodsClassifyName: item.goodsClassifyName,
							brandName: item.brandName,
							unitsName: item.unitsName,
							unitsType: item.unitsType,
							propertyIds: item.propertyIdStr,
							propertyNames: item.propertyNames,
							standardName: item.standardName,
							systemNum: item.systemNum,
							planWeight: item.planWeight,
							realNum: item.realNum || 0,
							realWeight: item.realWeight || 0,
							id: item.id || ''
						}
						params.fillingChangeData.push(obj)
					})
					if (!params.fillingChangeData.length) {
						uni.showToast({
							icon: 'none',
							title: this.$t('stockMg.addFillOrder.tips')
						})
						return
					}
					params.realTotalWeight = realTotalWeight
					params.realTotalNum = realTotalNum
					params.fillingChangeData = JSON.stringify(params.fillingChangeData)
					const {
						returnValue: res,
						message
					} = await fillingChangeLogSaveOrEdit(params)
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
				this.formDataValue = params
				if (e.name == 'fillingRange' && params.fillingRange && params.fillingRange.length) {
					// 获取充装明细
					await this.getGoodsDataList({
						fillingStartTime: params.fillingRange[0],
						fillingEndTime: params.fillingRange[1]
					})
				}
			},
			// 获取充装明细
			async getGoodsDataList(obj) {
				const {
					returnValue: res,
					returnObject
				} = await fillingLogFindGoodsDataList(obj || {})
				if (res.length) {
					this.infoData.totalCount = returnObject.totalCount || 0
					this.infoData.totalWeight = returnObject.totalWeight || 0
					this.infoData.planTotalWeight = returnObject.planTotalWeight || 0
					this.formDataValue = {
						fillingRange: [returnObject.minDate, returnObject.maxDate]
					}
					this.calculate()
					res.forEach(v => {
						v.propertyIdStr = v.propertyIds
						v.propertyNames = v.propertyNames
						v.netContent = v.standardName
						v.systemNum = v.fillingNum
						v.realNum = v.fillingNum
						v.realWeight = v.weight
						v.profit = this.$bigDecimal.round(this.$bigDecimal.subtract(v.planWeight, v
								.realWeight),
							2)
					})
					this.listGoods = res
				}
			},
			// 计算
			calculate() {
				this.infoData.profitWeight = this.$bigDecimal.subtract(this.infoData.planTotalWeight, this.infoData
					.totalWeight) || 0
				if (this.infoData.totalWeight !== '0.00') {
					this.infoData.profitRate = this.$bigDecimal.divide(this.$bigDecimal.subtract(this.infoData
						.planTotalWeight, this
						.infoData.totalWeight), this.infoData.totalWeight, 2) || 0
				}
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

				.u-form-item__body__left {
					width: 90px !important;
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

							.goods-fill {
								font-size: 30rpx;
								line-height: 38rpx;
								color: #666;
								margin-left: 10rpx;

								.nums {
									margin: 0 10rpx;
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
								width: 1px;
								flex: 1;
								margin-right: 40rpx;

								&:last-child {
									margin-right: 0;
								}

								.cell-label {
									color: rgba(128, 128, 128, 1);
								}

								.cell-content {
									display: flex;
									align-items: center;

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
