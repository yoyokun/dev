<template>
	<view class="info">
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
					<text class="name">{{$t('salesMg.bizOrderInfo.baseTle')}}</text>
					<u-icon v-if="isShow" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow">
					<description-list>
						<description :label="$t('salesMg.bizOrderInfo.orgName')">{{ info.orgName }}</description>
						<description :label="$t('salesMg.bizOrderInfo.billNo')">{{ info.billNo }}</description>
						<description :label="$t('salesMg.bizOrderInfo.businessTypeName')">{{ info.businessTypeName }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.formType')">{{ info.formType | formType }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.customerNo')">{{ info.customerNo }}</description>
						<description :label="$t('salesMg.bizOrderInfo.customerName')">{{ info.customerName }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.checkState')">{{ info.checkState | checkState }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.goodsTotalMoney')">{{ info.goodsTotalMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.payItemsMoney')">{{ info.payItemsMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.totalMoney')">{{ info.totalMoney }}</description>
						<description :label="$t('salesMg.bizOrderInfo.creator')">{{ info.creator }}</description>
						<description :label="$t('salesMg.bizOrderInfo.billTime')">{{ info.billTime | dayjs }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.totalMoney')">{{ info.totalMoney }}</description>
						<description :label="$t('salesMg.bizOrderInfo.totalWeight')">{{ info.totalWeight }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.totalNum')">{{ info.totalNum }}</description>
						<description :label="$t('salesMg.bizOrderInfo.linkBillNo')">{{ info.linkBillNo }}</description>
						<description :label="$t('salesMg.bizOrderInfo.linkType')">{{ info.linkType | linkType }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.remarks')">{{ info.remarks }}</description>
						<description :label="$t('salesMg.bizOrderInfo.operator')">{{ info.operator }}</description>
						<description :label="$t('salesMg.bizOrderInfo.operationTime')">{{ info.operationTime | dayjs }}
						</description>
					</description-list>
				</view>
			</view>

			<view class="customerBox" style="padding: 0;">
				<view class="title" @click="isShow1 = !isShow1"
					:style="isShow1?'padding: 10rpx 20rpx 0 20rpx;':'padding:10rpx 20rpx 10rpx 20rpx;'">
					<text class="name">{{$t('salesMg.bizOrderInfo.goodsTle')}}</text>
					<u-icon v-if="isShow1" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow1">
					<view class="goods-list" v-for="(item,index) in salesTransferDetailList" :key="item.ids">
						<view class="goods-head">
							<view class="goods-tle">{{item.goodsNo}} - {{item.goodsName}}</view>
							<view class="goods-price">￥{{item.unitPrice}}</view>
						</view>
						<view class="attr-del">
							<view class="attr">
								<view class="attr-txt">
									{{ item.goodsClassifyName ? item.goodsClassifyName + "," : "" }}
									{{ item.propertyNames ? item.propertyNames + "," : "" }}
									{{ item.businessTagName ? item.businessTagName + "," : "" }}
									{{ item.brandName }}
								</view>
								<u-icon class="arrow-right" name="arrow-right"></u-icon>
								<view class="attr-box">
									<view class="attr-item">
										<view class="item-tle">{{$t('chooseGoods.goodsClassifyName')}}：</view>
										<view class="item-txt">{{item.goodsClassifyName}}</view>
									</view>
									<view class="attr-item" v-if="item.propertyNames">
										<view class="item-tle">{{$t('chooseGoods.propertyNames')}}：</view>
										<view class="item-txt">{{item.propertyNames}}</view>
									</view>
									<view class="attr-item" v-if="item.businessTagName">
										<view class="item-tle">{{$t('chooseGoods.businessTagName')}}：</view>
										<view class="item-txt">{{item.businessTagName}}</view>
									</view>
									<view class="attr-item" v-if="item.brandName">
										<view class="item-tle">{{$t('chooseGoods.brandName')}}：</view>
										<view class="item-txt">{{item.brandName}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('chooseGoods.standardName')}}：</view>
								<view class="cell-content">{{item.standardName}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('chooseGoods.unitsName')}}：</view>
								<view class="cell-content">{{item.unitsName}}</view>
							</view>
						</view>
						<view class="info-cell">
							<block v-for="val in tableColumn" :key="val.id">
								<view class="cell"
									v-if="val.supType === 'assistUnits' && val.propValue.includes('netContent')">
									<view class="cell-label">{{val.labelName}}：</view>
									<!-- 显示 -->
									<view class="cell-content" v-if="item.unitsType === 1">{{item[val.propValue]}}
									</view>
									<!-- 编辑 -->
									<view class="cell-content" v-if="item.unitsType === 2">
										<view class="nums">{{item[val.propValue]}}</view>
									</view>
								</view>
							</block>
							<view class="cell">
								<view class="cell-label">{{$t('chooseGoods.amount')}}：</view>
								<view class="cell-content">
									<view class="nums">{{item.amount}}</view>
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('chooseGoods.settleAmount')}}：</view>
								<view class="cell-content">{{item.settleAmount}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('chooseGoods.totalMoney')}}：</view>
								<view class="cell-content">{{item.totalMoney}}</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell remarks">
								<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
								<view class="cell-content">
									<textarea disabled v-model="item.remarks"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="total">
						<view class="total-tle">
							<text>{{$t('chooseGoods.total')}}：</text>
						</view>
						<view class="total-main">
							<view class="item">
								<text>{{$t('chooseGoods.amount')}}：</text>
								<text>{{info.totalNum}}</text>
							</view>
							<view class="item">
								<text>{{$t('chooseGoods.totalMoney')}}：</text>
								<text class="red">{{info.goodsTotalMoney}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow2 = !isShow2">
					<text class="name">{{$t('salesMg.bizOrderInfo.deliveryTle')}}</text>
					<u-icon v-if="isShow2" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow2">
					<description-list>
						<description :label="$t('salesMg.bizOrderInfo.pickMode')">
							{{ salesOrderTransport.pickMode | pickMode }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.bookingTime')">
							{{ salesOrderTransport.bookingTime | dayjs }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.licenseNo')">{{ salesOrderTransport.licenseNo }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.deliverMan')">{{ salesOrderTransport.deliverMan }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.address')">
							{{ salesOrderTransport | addressSplicing }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.payItemsMoney')">{{ info.payItemsMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.payItemsName')">{{ info.payItemsName }}
						</description>
					</description-list>
				</view>
			</view>
			<view class="customerBox">
				<view class="title" @click="isShow3 = !isShow3">
					<text class="name">{{$t('salesMg.bizOrderInfo.discountTle')}}</text>
					<u-icon v-if="isShow3" name="arrow-down" color="#666666" size="18"></u-icon>
					<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
				</view>
				<view class="content" v-show="isShow3">
					<description-list>
						<description :label="$t('salesMg.bizOrderInfo.coupon')">
							{{ info.coupon ? info.coupon.couponNo : '' }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.couponMoney')">{{ info.couponMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.integralValue')">{{ info.integralValue }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.integralMoney')">{{ info.integralMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.disCountMoney')">{{ info.disCountMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.disCountRate')">{{ info.disCountRate }}%
						</description>
						<description :label="$t('salesMg.bizOrderInfo.couponTotalMoney')">{{ info.couponTotalMoney }}
						</description>
						<description :label="$t('salesMg.bizOrderInfo.totalMoney')">{{ info.totalMoney }}</description>
					</description-list>
				</view>
			</view>
		</view>
		<view class="container" v-show="current==1">
			<view class="customerBox">
				<view class="title">
					<text class="name">{{$t('salesMg.bizOrderInfo.sourceTle')}}</text>
				</view>
				<view class="content">
					<description-list v-if="editId" :title="$t('salesMg.bizOrderInfo.sendTle')">
						<service-cylinder-info node-type="confirmDelivery" :link-id="editId" />
					</description-list>
					<description-list v-if="editId" :title="$t('salesMg.bizOrderInfo.recycleTle')">
						<service-cylinder-info node-type="recycleCylinder" :link-id="editId" />
					</description-list>
				</view>
			</view>
		</view>
		<view class="btn">
			<u-button v-permission="{ permission:'app_bizList_edit'}" v-if="info.checkState===1 || info.checkState===4" @click="goto('/salesManage/addBizOrder/addBizOrder',{editId: editId})" :text="$t('common.btn.edit')" type="primary" hairline shape="circle"></u-button>
			<u-button v-permission="{ permission:'app_bizList_delete'}" v-if="info.checkState===1 || info.checkState===4 || info.checkState===5" @click="handleDelete(info)" :text="$t('common.btn.delete')" type="error" plain hairline shape="circle"></u-button>
			<u-button v-permission="{ permission:'app_bizList_submit'}" v-if="info.checkState===1" @click="handleUpdate(info,2)" :text="$t('common.btn.submit')" type="success" plain hairline shape="circle"></u-button>
			<u-button v-permission="{ permission:'app_bizList_revert'}" v-if="info.checkState===2" @click="handleUpdate(info,7)" :text="$t('common.btn.withdraw')" type="warning" plain hairline shape="circle"></u-button>
			<u-button v-permission="{ permission:'app_bizList_invalid'}" v-if="info.checkState===3" @click="handleVoid(info)" :text="$t('common.btn.toVoid')" type="error" plain hairline shape="circle"></u-button>
			<u-button v-permission="{ permission:'app_bizList_send'}" v-if="info.checkState===3 && cylinderScanSetting" @click="goto('/salesManage/scanSend/scanSend',{editId:editId,cylinderScanSetting:cylinderScanSetting,cylinderPattern:cylinderPattern})" :text="$t('salesMg.bizOrderInfo.btn.conf')" type="success" plain hairline shape="circle">
			</u-button>
		</view>

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
		salesBusinessFindById,
		salesBusinessToVoid,
		salesBusinessDeleteByIds,
		salesBusinessUpdateState
	} from '@/api/lpgSalesManageApi'
	import {
		auditTaskRecallTaskByLinkId
	} from '@/api/lpgManageAppApi'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import ServiceCylinderInfo from '../../userCenter/auditInfo/common/serviceCylinderInfo'
	export default {
		mixins: [settingMixin],
		// 过滤器
		filters: {
			linkType(value) {
				const stateObj = that.$t('salesMg.bizOrderInfo.linkTypeTxt')
				return stateObj[value] || ''
			},
			checkState(value) {
				const stateObj = that.$t('salesMg.bizOrderInfo.checkStateTxt')
				return stateObj[value] || ''
			},
			formType(value) {
				const stateObj = that.$t('salesMg.bizOrderInfo.formTypeTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.bizOrderInfo.pickModeTxt')
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
				editId: '',
				tabSwitch: this.$t('salesMg.bizOrderInfo.tabs'),
				current: 0,
				isShow: true,
				isShow1: true,
				isShow2: true,
				isShow3: true,
				tableColumn: [],
				info: {},
				salesTransferDetailList: [],
				salesOrderTransport: {},
				cylinderScanSetting: false,
				cylinderPattern: '',
			}
		},
		async onLoad(options) {
			that = this
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.bizOrderInfo.titleText')
			})
			// 钢瓶溯源
			await this.getConfigGetCylinder((res) => {
				if (res[0] === '1') {
					// 开启
					this.cylinderScanSetting = true
				} else {
					this.cylinderScanSetting = false
				}
				// 模式
				this.cylinderPattern = res[4]
			})
			this.editId = options.editId || ''
			if (options.editId) {
				this.getInfo(options.editId)
			}
		},
		onShow() {
			if (this.editId) {
				this.getInfo(this.editId)
			}
		},
		methods: {
			// 提交 撤回
			handleUpdate(data, type) {
				if (type == 7) {
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
								} = await salesBusinessUpdateState({
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
					success: async (ret) => {
						if (ret.confirm) {
							const {
								returnValue: res,
								message
							} = await salesBusinessDeleteByIds({
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
				} = await salesBusinessToVoid({
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
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await salesBusinessFindById({
					id
				})
				if (res) {
					const payItemsName = []
					// 收费项
					res.salesOrderPayitemsList.forEach((v) => {
						payItemsName.push(`${v.payItemsName}:${v.payItemsMoney},共${v.payItemsTotalMoney} `)
					})
					res.payItemsName = payItemsName.join(',')
					this.info = res
					this.tableColumn = res.printSetVo.tableColumn
					res.salesBusinessDetailList.forEach(v => {
						v.goodsPath = this.$options.filters.pictureJson(v.goodsPath)
						v.assistUnitsList.forEach((n, j) => {
							this.tableColumn.forEach(m => {
								if (m.propValue === 'assistName-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
								if (m.propValue === 'netContent-' + n.assistUnitsId) {
									v[m.propValue] = n.netContent
								}
							})
						})
					})
					this.salesTransferDetailList = res.salesBusinessDetailList
					this.salesOrderTransport = res.salesOrderTransport || {}
					this.salesOrderPayitemsList = res.salesOrderPayitemsList
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

	.container {
		padding: 48px 0;
		padding-bottom: 0px;
	}

	.total {
		display: flex;
		font-size: 28rpx;
		min-height: 80rpx;

		.total-tle {

			padding: 0 20rpx;
			background: rgba(42, 130, 228, 1);
			color: white;
			display: flex;
			// justify-content: center;
			align-items: center;
		}

		.total-main {
			display: flex;
			flex: 1;
			width: 1px;
			background: rgba(240, 247, 255, 0.35);
			align-items: center;
			padding: 10rpx 20rpx;
			flex-wrap: wrap;

			.item {
				margin-right: 30rpx;
				word-break: break-all;

				>text:first-child {
					color: gray;
				}

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}

	.customerBox {
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		margin: 20rpx 20rpx 10rpx 20rpx;
		overflow: hidden;

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
					font-size: 28rpx;
					color: #000;
					line-height: 38rpx;
					font-weight: bold;
				}

				.goods-price {
					font-size: 28rpx;
					line-height: 38rpx;
					font-weight: bold;
					color: red;
					margin-left: 10rpx;
				}
			}

			.attr-del {
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
				align-items: center;
			}

			.attr {
				padding: 0 10rpx;
				height: 50rpx;
				display: flex;
				align-items: center;
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
					max-width: 360rpx;
					width: fit-content;
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
					width: 360rpx;
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
						left: 10rpx;
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
				font-size: 28rpx;
				line-height: 28rpx;
				flex-wrap: wrap;

				.cell {
					width: 50%;
					display: flex;
					align-items: center;
					margin-top: 30rpx;

					&.remarks {
						width: 100%;
					}

					.cell-label {
						color: rgba(128, 128, 128, 1);
						white-space: nowrap;
					}

					.cell-content {
						flex: 1;
						display: flex;

						textarea {
							width: 100%;
							background: rgba(247, 247, 247, 1);
							height: 110rpx;
							border-radius: 14rpx;
							padding: 20rpx;
							box-sizing: border-box;
							font-size: 28rpx;
						}
					}
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

	.info {
		.btn {
			width: 100%;
			padding: 60rpx 20rpx;
			padding-top: 40rpx;
			box-sizing: border-box;
			@include flexMixin();
			flex-wrap: wrap;
			justify-content: center;

			.u-button {
				margin: 0rpx 10rpx;
				width: calc(100% / 2 - 40rpx);
				margin-top: 20rpx;
			}
		}
	}
</style>
