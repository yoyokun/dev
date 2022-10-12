<template>
	<view class="sk-info">
		<view class="list">
			<view class="code-box">
				<u-input prefixIcon="search" type="text" class="code-input" v-model="codeOrder" shape="circle"
					:placeholder="$t('salesMg.receiveAllotOrder.codeOrder')">
					<view slot="suffix">
						<u-icon @click="toScan(1)" size="40rpx" color="#3c9cff" name="scan"></u-icon>
					</view>
				</u-input>
				<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchOrder">
					{{$t('salesMg.receiveAllotOrder.btn.conf')}}
				</u-button>
			</view>
			<view class="info-box" v-if="info">
				<description-list :title="$t('salesMg.receiveAllotOrder.baseTle')">
					<description :label="$t('salesMg.receiveAllotOrder.billNo')">
						{{info.billNo}}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.state')">
						{{ info.state | state }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.outOrgName')">
						<view class="text">
							{{info.outOrgName}}
						</view>
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.orgAddress')">
						<view class="text">
							{{ info.outOrgAddress }}
						</view>
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.inOrgName')">
						<view class="text">
							{{info.inOrgName}}
						</view>
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.orgAddress')">
						<view class="text">
							{{ info.inOrgAddress }}
						</view>
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.billTime')">
						{{ info.billTime | dayjs }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.amount')">
						{{ info.totalNum }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.totalWeight')">
						{{ info.totalWeight }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.remarks')	">
						<view class="text">
							{{info.remarks}}
						</view>
					</description>
				</description-list>
			</view>

			<view class="info-box" v-if="info">
				<description-list :title="$t('salesMg.receiveAllotOrder.deliveryTle')">
					<description :label="$t('salesMg.receiveAllotOrder.pickMode')">
						{{ salesOrderTransport.pickMode | pickMode }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.bookingTime')">
						{{info.bookingTime|dayjs}}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.licenseNo')">
						{{ salesOrderTransport.licenseNo }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.deliverMan')">
						{{ salesOrderTransport.deliverMan }}
					</description>
					<description :label="$t('salesMg.receiveAllotOrder.address')">
						{{ salesOrderTransport | addressSplicing }}
					</description>
				</description-list>
			</view>
		</view>

		<block v-if="info">
			<view class="list">
				<view class="list-head">
					<view class="head-tle">{{$t('salesMg.receiveAllotOrder.goodsTle')}}</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(item,index) in salesTransferDetailList" :key="item.ids">
						<view class="goods-head">
							<view class="goods-tle">{{item.goodsNo}} - {{item.goodsName}}</view>
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
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.sku')}}：</view>
								<view class="cell-content">{{item.standardName}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.unitsName')}}：</view>
								<view class="cell-content">{{item.unitsName}}</view>
							</view>
							<block v-for="val in tableColumnUnit" :key="val.id">
								<view class="cell"
									v-if="val.supType === 'assistUnits' && val.propValue.includes('netContent')">
									<view class="cell-label">{{val.labelName}}：</view>
									<view class="cell-content">{{item[val.propValue]}}</view>
								</view>
							</block>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.amount')}}：</view>
								<view class="cell-content">
									<view class="nums">
										<input v-model="item.amount" @input="validateInput($event,index,'amount')"
											type="text" :placeholder="$t('salesMg.receiveAllotOrder.amount')" />
									</view>

								</view>
							</view>
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.receiptNum')}}：</view>
								<view class="cell-content">
									<view class="nums">
										<input v-model="item.receiptNum"
											@input="validateInput($event,index,'receiptNum')" type="text"
											:placeholder="$t('salesMg.receiveAllotOrder.receiptNum')" />
									</view>

								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">{{$t('salesMg.receiveAllotOrder.diff')}}：</view>
								<view class="cell-content">{{countDiff(item)}}</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell remarks">
								<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
								<view class="cell-content">
									<textarea v-model="item.remarks"
										:placeholder="$t('chooseGoods.remarksPlace')"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="reason">
						<description :label="$t('salesMg.receiveAllotOrder.inReason.label')">
							<view class="reason-picker" @click="openReason">
								<text v-if="!inReason"
									class="gray">{{$t('salesMg.receiveAllotOrder.inReason.placeholder')}}</text>
								<text v-else>{{inReason.name}}</text>
								<u-icon name="arrow-right"></u-icon>
							</view>
						</description>
					</view>

					<view class="total">
						<view class="total-tle">
							<text>{{$t('chooseGoods.total')}}：</text>
						</view>
						<view class="total-main">
							<view class="item" v-for="(item,index) in totalUnitCount">
								<text>{{index}}：</text>
								<text>{{item}}</text>
							</view>
							<view class="item">
								<text>{{$t('salesMg.receiveAllotOrder.amount')}}：</text>
								<text>{{countNums(salesTransferDetailList)}}</text>
							</view>
							<view class="item">
								<text>{{$t('salesMg.receiveAllotOrder.receiptNum')}}：</text>
								<text>{{countNums(salesTransferDetailList,1)}}</text>
							</view>
						</view>
					</view>
					<view class="other">
						<view class="label">{{$t('salesMg.receiveAllotOrder.backTotalMoney')}}：</view>
						<view class="desc">{{info.backTotalMoney}}</view>
					</view>
					<view class="other" v-if="salesOrderPayDetailList&&salesOrderPayDetailList.length">
						<view class="label">{{$t('salesMg.receiveAllotOrder.payType')}}：</view>
						<view class="desc">
							<text v-for="(item,index) in salesOrderPayDetailList"
								:key="index">{{item.collectionTypeName}}：{{item.payMoney}}</text>
						</view>
					</view>
				</view>

			</view>

			<view class="list">
				<view class="code-box">
					<u-input prefixIcon="search" type="text" class="code-input" v-model="codeKey" shape="circle"
						:placeholder="$t('salesMg.confSend.codeKey.placeholder')">
						<view slot="suffix">
							<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
						</view>
					</u-input>
					<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
						{{$t('salesMg.receiveAllotOrder.btn.conf')}}
					</u-button>
				</view>

				<view class="table">
					<us-table :table-column="tableColumn" :table-data="tableData">
						<!-- #ifdef H5 || APP-PLUS -->
						<view slot="remove" slot-scope="row" @click="romveData(row)">
							<u-icon class="remove-list" name="minus-circle-fill"></u-icon>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<view slot="remove" slot-scope="{row}" @click="romveData(row)">
							<u-icon class="remove-list" name="minus-circle-fill"></u-icon>
						</view>
						<!-- #endif -->
					</us-table>
				</view>

			</view>

			<view class="btn">
				<u-button :text="$t('salesMg.receiveAllotOrder.btn.normal')" type="primary" hairline shape="circle"
					@click="saveData(3)">
				</u-button>
				<u-button :text="$t('salesMg.receiveAllotOrder.btn.error')" type="error" hairline shape="circle" plain
					@click="saveData(4)"></u-button>
			</view>
		</block>

		<u-picker :closeOnClickOverlay="true" :show="showReason" :columns="[stockInoutReason]" keyName="name"
			@confirm="confReason" @close="close" @cancel="close"></u-picker>

		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		integer
	} from '@/utils'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		salesTransferFindByBillNo,
		salesTransferTransferReceipt,
	} from '@/api/lpgSalesManageApi'
	import {
		cylinderArchivesFindByCodeKey
	} from '@/api/lpgManageAppApi'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				codeOrder: '',
				codeKey: '',
				tableColumn: [{
					prop: 'remove',
					label: this.$t('salesMg.receiveAllotOrder.tableColumn.remove'),
					width: '100rpx',
					align: 'center',
					slot: 'remove'
				}, {
					prop: 'cylinderNo',
					label: this.$t('salesMg.receiveAllotOrder.tableColumn.cylinderNo'),
					width: '160rpx',
					align: 'center'
				}, {
					prop: 'codeKey',
					label: this.$t('salesMg.receiveAllotOrder.tableColumn.codeKey'),
					width: '210rpx',
					align: 'center'
				}, {
					prop: 'modelName',
					label: this.$t('salesMg.receiveAllotOrder.tableColumn.modelName'),
					width: '160rpx',
					align: 'center'
				}],
				tableData: [],
				cylinderScanSetting: '',
				info: null,
				tableColumnUnit: [],
				salesTransferDetailList: [],
				salesOrderTransport: {},
				showReason: false,
				inReason: null,
				stockInoutReason: [],
				nums: 0,
				receptNums: 0,
				totalUnitCount: {},
				salesOrderPayDetailList: [],
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('salesMg.receiveAllotOrder.stateTxt')
				return stateObj[value] || ''
			},
			pickMode(value) {
				const stateObj = that.$t('salesMg.receiveAllotOrder.pickModeTxt')
				return stateObj[value] || ''
			}
		},
		computed: {

		},
		async created() {
			that = this
		},
		async mounted() {

		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.receiveAllotOrder.titleText')
			});
			// 出入库原因
			await this.getStockInoutReason()
			// 钢瓶溯源
			await this.getConfigGetCylinder((res) => {
				if (res[0] === '1') {
					// 开启
					this.cylinderScanSetting = true
				} else {
					this.cylinderScanSetting = false
				}
			})
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			resetInfo() {
				this.info = null
				this.tableData = null
				this.inReason = null
				this.codeOrder = null
				this.codeKey = null
			},
			// 保存
			async saveData(state) {
				if (!this.inReason) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('salesMg.receiveAllotOrder.inReason.placeholder')
					})
					return
				}
				const data = {
					id: this.info.id,
					state: state,
					inType: this.inReason.type,
					inName: this.inReason.reasonName,
					inReasonId: this.inReason.value,
					transferDetailData: [] // 订单信息
				}
				this.salesTransferDetailList.forEach(v => {
					data.transferDetailData.push({
						id: v.id,
						receiptNum: v.receiptNum
					})
				})
				data.transferDetailData = JSON.stringify(data.transferDetailData)
				if (this.cylinderScanSetting) {
					// 有钢瓶溯源
					data.transferCodeData = []
					const serviceCylinderData = this.tableData
					serviceCylinderData.forEach(v => {
						data.transferCodeData.push({
							cylinderId: v.id // 钢瓶ID
						})
					})
					data.transferCodeData = JSON.stringify(data.transferCodeData)
				}
				const {
					returnValue: res,
					message
				} = await salesTransferTransferReceipt(data)
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					this.resetInfo()
				}
			},
			// 移除数据
			romveData(row) {
				this.tableData.splice(row.index, 1)
			},
			// 选择原因
			openReason() {
				this.showReason = true
			},
			confReason(e) {
				this.inReason = e.value[0]
				this.close()
			},
			close() {
				this.showReason = false
			},
			// 计算
			countDiff(data) {
				return data.amount - data.receiptNum
			},
			countNums(data, type = null) {
				let nums = 0
				let receiptNums = 0
				data.forEach(i => {
					nums += i.amount
					receiptNums += i.receiptNum
				})
				if (type) {
					return receiptNums
				} else {
					return nums
				}
			},
			// 验证 只能输入正整数,价格
			validateInput(e, index, key) {
				const nums = e.detail.value
				// 数量
				this.salesTransferDetailList[index][key] = integer(nums)
			},
			// 查询单号
			async searchOrder(code = null) {
				this.codeOrder = code || this.codeOrder
				if (!this.codeOrder) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
					return
				}
				const {
					returnValue: res
				} = await salesTransferFindByBillNo({
					billNo: this.codeOrder
				}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
				if (res) {
					this.info = res
					this.tableColumnUnit = res.printSetVo.tableColumn
					let totalUnitCount = {}
					res.salesTransferDetailList.forEach(v => {
						v.goodsPath = this.$options.filters.pictureJson(v.goodsPath)
						v.assistUnitsList.forEach((n, j) => {
							this.tableColumnUnit.forEach(m => {
								if (m.propValue == 'assistName-' + n.assistUnitsId) {
									let ele = totalUnitCount[m
										.labelName] || 0
									ele += parseFloat(n.netContent)
									totalUnitCount[m.labelName] = ele
									v[m.propValue] = n.netContent
								}
								if (m.propValue == 'netContent-' + n.assistUnitsId) {
									let ele = totalUnitCount[m
										.labelName] || 0
									ele += parseFloat(n.netContent)
									totalUnitCount[m.labelName] = ele
									v[m.propValue] = n.netContent
								}
							})
						})
					})
					this.totalUnitCount = totalUnitCount
					this.salesTransferDetailList = res.salesTransferDetailList
					this.salesOrderTransport = res.salesOrderTransport
					this.salesOrderPayDetailList = res.salesOrderPayDetailList
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})

				}
			},
			// 查询二维码
			async searchCode(code = null) {
				this.codeKey = code || this.codeKey
				if (!this.codeKey) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
					return
				}
				const {
					returnValue: res
				} = await cylinderArchivesFindByCodeKey({
					codeKey: this.codeKey
				}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
				if (res) {
					const findIndex = this.tableData.findIndex(item => item.id == res.id)
					if (findIndex == -1) {
						this.tableData.push(res)
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('salesMg.confSend.tips')
						})
					}
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})

				}
			},
			// 扫码
			async toScan(type = null) {
				const code = await this.decodeQr(type)
				if (code) {
					if (type == 1) {
						this.searchOrder(code)
					} else {
						this.searchCode(code)
					}

				}
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.sk-info {
		padding: 30rpx;

		.list {
			margin-bottom: 60rpx;

			.goods {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				overflow: hidden;

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

								.nums {
									color: rgba(128, 128, 128, 1);
									display: flex;
									align-items: center;
									flex: 1;

									input {
										width: 150rpx;
										text-align: right;
										font-size: 28rpx;
										border-bottom: 1px solid #ccc;
										text-align: center;
									}
								}

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

				.other {
					display: flex;
					font-size: 28rpx;
					align-items: center;
					padding: 20rpx 20rpx;
					line-height: 36rpx;
					border-top: 1px solid #eee;

					.label {
						color: #666;
					}

					.desc {
						flex: 1;
						width: 1px;
						display: flex;
						flex-wrap: wrap;

						text {
							word-break: break-all;
							margin-right: 20rpx;
						}
					}
				}
			}
		}

		.table {
			margin-top: 30rpx;
		}

		.list-head {
			// height: 90rpx;
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			// padding: 0 30rpx;
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

		.info-box {
			border-radius: 14rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
			margin-top: 30rpx;

			::v-deep .basic-box {
				.tle {
					color: #666;
				}

				.item {
					min-height: 70rpx;
					line-height: 70rpx;
				}
			}

			.text {
				word-break: break-all;
				line-height: 40rpx;
				padding: 14rpx 0;
			}
		}
		.reason{
			::v-deep .item {
				min-height: 80rpx;
				line-height: 80rpx;
				.tle {
					color: #666;
					&::before{
						display: inline-block;
						content: '*';
						color: red;
					}
				}
				border-bottom: 1px solid #eee;
			}
			.reason-picker {
				display: flex;
				align-items: center;
			
				>text {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					width: 1px;
					flex: 1;
			
					&.gray {
						color: #666;
					}
				}
			}
		}
		

		.code-box {
			width: 100%;
			display: flex;
			align-items: center;
			// padding: 20rpx 30rpx;
			box-sizing: border-box;

			.tle {
				font-size: 28rpx;
			}

			.code-input {
				flex: 1;
				width: 1rpx;
				margin-right: 30rpx;
				background: white;
				box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px 0;
			}

			.code-btn {
				width: 100rpx !important;
				box-shadow: 0px 2px 4px 0px rgba(42, 130, 228, 0.2);
			}

		}

		.remove-list {
			display: flex;
			align-items: center;
			justify-content: center;

			::v-deep .u-icon__icon {
				color: red !important;
				font-size: 40rpx !important;
			}
		}

		>.btn {
			width: 632rpx;
			margin: 60rpx auto;
			@include flexMixin();

			.u-button {
				margin: 0rpx 10rpx;
			}
		}
	}
</style>
