<template>
	<view>
		<view class="block">
			<view class="block-head">{{$t('salesMg.delivery.tle')}}</view>
			<view class="block-box">
				<view class="item">
					<view class="label">{{$t('salesMg.delivery.pickMode')}}：</view>
					<view class="content fill">
						<view class="fill-box">
							<u-radio-group class="radio-group" size="14" v-model="pickMode" placement="row"
								@change="pickModeChange">
								<u-radio class="radio-item" labelSize="13" label="送气员配送" name="4" v-if="type=='sales'"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="车辆配送" name="3"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="车辆自提" name="2"></u-radio>
								<u-radio class="radio-item" labelSize="13" label="自提" name="1"></u-radio>
							</u-radio-group>
						</view>
					</view>
				</view>
				<!-- ========= -->
				<block v-if="pickMode == 4">
					<view class="item">
						<view class="label">{{$t('salesMg.delivery.defDeliveryName')}}：</view>
						<view class="content" @click="chooseOrg">
							<input class="input" :placeholder="$t('salesMg.delivery.defDeliveryNamePlaceholder')" type="text" disabled :value="defDeliveryName" />
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="item">
						<view class="label">{{$t('salesMg.delivery.transportName')[0]}}：</view>
						<view class="content" @click="chooseItem('choosePSY')">
							<input class="input" :placeholder="$t('salesMg.delivery.transportNamePlaceholder')[0]" type="text" disabled :value="transportName" />
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
				</block>
				<!-- ========= -->
				<view class="item" v-if="pickMode == 3 || pickMode == 2">
					<view class="label">{{$t('salesMg.delivery.chooseLicenseNum')}}：</view>
					<view class="content">
						<input class="input" :disabled="isSettle" v-model="chooseLicenseNum" :placeholder="$t('salesMg.delivery.chooseLicenseNumPlaceholder')"
							type="text" />
					</view>
				</view>
				<view class="item" v-if="pickMode == 3">
					<view class="label">{{$t('salesMg.delivery.transportName')[1]}}：</view>
					<view class="content">
						<input class="input" v-model="transportName" :disabled="isSettle" :placeholder="$t('salesMg.delivery.transportNamePlaceholder')[1]" type="text" />
					</view>
				</view>
				<!-- =========== -->
				<view class="item">
					<view class="label">{{$t('salesMg.delivery.bookingTime')}}：</view>
					<view class="content">
						<uni-datetime-picker :disabled="isSettle" v-model="bookingTime"></uni-datetime-picker>
					</view>
				</view>
				<view class="item" v-if="pickMode != 1">
					<view class="label">{{$t('salesMg.delivery.address')}}：</view>
					<view class="content" @click="chooseAddress">
						<input class="input" :placeholder="$t('salesMg.delivery.addressPlaceholder')" type="text" disabled v-if="!address" />
						<view class="choose-address" v-else>{{ address }}</view>
						<u-icon name="arrow-right" v-if="type=='sales'"></u-icon>
					</view>
				</view>
				<view class="item" v-if="pickMode == 4 || pickMode == 3">
					<view class="label">{{pickMode==4?$t('salesMg.delivery.feeName')[0]:$t('salesMg.delivery.feeName')[1]}}：</view>
					<view class="content dfee">
						<view class="fee-item" :class="item.check?'on':''" v-for="(item,index) in choosePayItemsData"
							:key="index" @click="checkFee(index)">
							<u-icon size="32rpx" class="fee-check" name="checkmark-circle-fill"></u-icon>
							<view class="fee-label">{{ item.itemName }}</view>
							<block v-if="item.chargeMode == 2">
								<view class="fee-flr" v-show="item.check" @click.stop="chooseItem('floorFee',index)">
									<view class="flr">{{item.floor}}{{$t('salesMg.delivery.floor')}}</view>
									<u-icon size="32rpx" class="" name="arrow-down"></u-icon>
								</view>
								<input v-show="item.check" @click.stop class="fee-input" type="number"
									:placeholder="$t('salesMg.delivery.feePlaceholder')" :disabled="item.disabled || isSettle" v-model="item.chargeMoney"
									@input="$emit('change','')" />
							</block>
							<block v-else>
								<input v-show="item.check" class="fee-input" type="number" :placeholder="$t('salesMg.delivery.feePlaceholder')"
									:disabled="item.disabled || isSettle" v-model="item.chargeMoney"
									@input="$emit('change','')" @click.stop />
							</block>
							<view v-show="item.check" class="fee-total">{{$t('salesMg.delivery.total')}}{{ item.totalMoney }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup class="multiplePopup" mode="bottom" :show="showItem" :closeOnClickOverlay="false">
			<view class="btn">
				<text class="cancel" @click="closeItem">{{$t('common.editForm.cancelText')}}</text>
				<text class="confirm" @click="confirmItem">{{$t('common.editForm.confirmText')}}</text>
			</view>
			<scroll-view class="multipleBox" scroll-y="true">
				<view class="box" v-for="(subItems,subIndex) in itemList" :key="subItems.id"
					@click="checkItem(subIndex)">
					<view class="center">
						<view class="name" v-if="itemType=='floorFee'">{{ subItems.name }}{{$t('salesMg.delivery.floor')}}</view>
						<view class="name" v-else>{{ subItems.name }}</view>
					</view>
					<image class="icon" v-if="subItems.active" mode="widthFix" src="/static/image/check.png" />
					<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import {
		salesPayItemsFindList,
	} from '@/api/lpgSalesManageApi'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	export default {
		mixins: [settingMixin],
		name: '',
		components: {},
		props: {
			chargeMode:{
				type: [Number, String],
				default: ''
			},
			type: {
				type: String,
				default: 'sales'
			},
			pickModes: {
				type: [Number, String],
				default: '4'
			},
			addressObj: {
				type: Object,
				default: () => {}
			},
			isSettle: {
				type: Boolean,
				default: false,
			},
			customerId: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				choosePayItemsData: [],
				itemType: '',
				showItem: false,
				itemList: [],
				choosePayItems: [],
				transportName: '',
				defDeliveryName: '',
				address: '',
				bookingTime: '',
				chooseLicenseNum: '',
				pickMode: '',
				addressId: '',
				deliverOrgId: '',
				deliverManId: '',
				addressInfo: null,
			}
		},
		watch: {
			pickModes: {
				handler(data) {
					this.pickMode = data
				},
				deep: true,
				immediate: true
			},
			addressObj: {
				handler(data) {
					this.address = this.$options.filters.addressSplicing(data)
					this.addressId = data.id
					this.deliverOrgId = data.defDelivery // 配送点id
					this.deliverManId = data.defDeliveryman // 配送员id
					this.defDeliveryName = data.defDeliveryName // 配送点名称
					this.transportName = data.defDeliverymanName // 配送员名称
					if (data.bookingTime) {
						this.bookingTime = data.bookingTime
					}
					if (data.chooseLicenseNum) {
						this.chooseLicenseNum = data.chooseLicenseNum
					}
					this.addressInfo = data
				},
				deep: true,
				immediate: true
			},
		},
		beforeDestroy() {
			uni.$off('chooseAddress')
			uni.$off('chooseOrg')
		},
		async mounted() {
			if (!this.choosePayItemsData || !this.choosePayItemsData.length) {
				// 获取收费项
				await this.getPayItems()
			}
			// 选择配送点
			uni.$on('chooseOrg', async(data) => {
				// 配送点名称
				this.defDeliveryName = data.name
				this.deliverOrgId = data.id // 配送点
				// 清空配送员id
				this.deliverManId = ''
				this.transportName = ''
			})
			// 选择地址
			uni.$on('chooseAddress', async(data) => {
				if (data.id === this.addressId) {
					return
				}
				this.addressId = data.id
				const formDataValue = {
					linkMan: data.linkman,
					phone: data.phone,
				}
				this.address = this.$options.filters.addressSplicing(data)
				this.addressInfo = data
				// 获取配送员
				this.deliverOrgId = data.defDelivery // 配送点
				this.deliverManId = data.defDeliveryman // 配送员
				this.defDeliveryName = data.defDeliveryName // 配送点名称
				this.transportName = data.defDeliverymanName // 配送员名称
				this.$emit('change', {
					formDataValue: formDataValue
				})
			})
		},
		methods: {
			async writeData(res) {
				if (!this.choosePayItemsData || !this.choosePayItemsData.length) {
					// 获取收费项
					await this.getPayItems()
				}
				const salesOrderPayitemsList = res.salesOrderPayitemsList
				const choosePayItems = []
				salesOrderPayitemsList.forEach((v) => {
					const findIndex = this.choosePayItemsData.findIndex((item) => item.itemId === v.payItemsId)
					// 回填id
					this.choosePayItemsData[findIndex].isChoose = true
					this.choosePayItemsData[findIndex].id = v.id
					this.choosePayItemsData[findIndex].chargeMoney = v.payItemsMoney
					this.choosePayItemsData[findIndex].totalMoney = v.payItemsTotalMoney
					this.choosePayItemsData[findIndex].payItemsDataStr = v.payItemsDataStr
					this.choosePayItemsData[findIndex].check = true
					this.choosePayItemsData[findIndex].floor = v.floor
					this.choosePayItemsData[findIndex].disabled = JSON.parse(v.payItemsDataStr).chargeMode !==
						1
					choosePayItems.push(v.payItemsId)
				})
				this.choosePayItems = choosePayItems // 选中的收费项
			},
			// 选择收费项
			checkFee(index) {
				const obj = this.choosePayItemsData[index]
				obj.check = !obj.check
				const key = this.choosePayItems.indexOf(obj.itemId)
				if (key > -1) {
					this.choosePayItems.splice(key, 1)
				} else {
					this.choosePayItems.push(obj.itemId)
				}
				this.$set(this.choosePayItemsData, index, obj)
				this.$emit('change', '')
			},
			// 选择选项
			async chooseItem(type, index = null) {
				if (type === 'choosePSY') {
					if (!this.deliverOrgId) {
						return
					}
					await this.getManagerDeliveryman({
						orgId: this.deliverOrgId
					})
					this.itemList = this.managerDeliveryman
					this.itemId = this.deliverManId
				}
				if (type === 'floorFee') {
					const obj = this.choosePayItemsData[index].salesPayItemsDetailList
					obj.forEach(i => {
						i.name = i.floor
						i.value = i.floor
					})
					this.itemList = obj
					this.itemId = this.choosePayItemsData[index].floor
				}
				this.itemType = type
				this.itemList.forEach(item => {
					item.active = false
					if (item.value === this.itemId) {
						item.active = true
					}
				})
				this.showItem = true
			},
			checkItem(index) {
				this.itemList.forEach(item => {
					item.active = false
				})
				const obj = this.itemList[index]
				obj.active = true
				this.$set(this.itemList, index, obj)
			},
			closeItem() {
				this.showItem = false
			},
			confirmItem() {
				const obj = this.itemList.filter(item => item.active === true)[0]
				this.itemId = obj.value
				if (this.itemType === 'choosePSY') {
					this.deliverManId = obj.value // 配送员
					this.transportName = obj.name // 配送员名称
				}
				if (this.itemType === 'floorFee') {
					this.choosePayItemsData.forEach((item, index) => {
						if (item.chargeMode === 2) {
							item.floor = obj.value
						}
					})
				}
				this.closeItem()
				this.$emit('change', '')
			},
			// 选择地址
			chooseAddress() {
				if (this.customerId) {
					this.goto('/infoManage/chooseAddress/chooseAddress', {
						customerId: this.customerId,
						addressId: this.addressId
					})
				}
			},
			// 选择组织
			chooseOrg() {
				this.goto('/infoManage/chooseOrg/chooseOrg', {
					orgId: this.deliverOrgId
				})
			},
			// 提货方式改变
			pickModeChange() {
				// 清空选择的配送费
				this.choosePayItems = []
				this.choosePayItemsData.forEach(i => {
					i.check = false
				})
				// 计算金额
				this.$emit('change', '')
			},
			getPayData() {
				return {
					choosePayItemsData: this.choosePayItemsData,
					data: {
						pickMode: this.pickMode,
						bookingTime: this.bookingTime,
						chooseLicenseNum: this.chooseLicenseNum,
						addressObj: this.addressInfo,
						deliverManId: this.deliverManId,
						transportName: this.transportName,
						deliverOrgId: this.deliverOrgId,
						defDeliveryName: this.defDeliveryName
					}
				}
			},
			// 计算收费项
			payTotalMoney(num) {
				// 全部取消选择
				this.choosePayItemsData.forEach(v => {
					v.isChoose = false
				})
				// 计算收费项，遍历选中的项目
				this.choosePayItems.forEach((v) => {
					const findindex = this.choosePayItemsData.findIndex((item) => item.itemId === v)
					// 选中
					this.choosePayItemsData[findindex].isChoose = true
					// 计费方式 1 自定义（可修改）2 按楼层 3 固定值
					const chargeMode = this.choosePayItemsData[findindex].chargeMode
					// 计费标记 1按单 2按商品
					const chargeTag = this.choosePayItemsData[findindex].chargeTag
					if (chargeMode === 1 && chargeTag === 1) {
						// 自定义 按单
						// 总价格等于单价
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 1 && chargeTag === 2) {
						// 自定义 按商品 遍历商品
						const chargeMoney = this.choosePayItemsData[findindex].chargeMoney
						// 总价格等于修改过的价格*标记的商品数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, chargeMoney)
					} else if (chargeMode === 2 && chargeTag === 1) {
						// 按楼层 按单
						const salesPayItemsDetailList = this.choosePayItemsData[findindex].salesPayItemsDetailList
						// 选中的楼层
						const floor = this.choosePayItemsData[findindex].floor
						// 查找楼层
						const floorIndex = salesPayItemsDetailList.findIndex((item) => item.floor === floor)
						// 楼层费
						const floorFee = salesPayItemsDetailList[floorIndex].floorFee
						// 楼层费+基础费
						this.choosePayItemsData[findindex].chargeMoney = this.$bigDecimal.add(this
							.choosePayItemsData[findindex].startingMoney, floorFee)
						// 总价格等于 楼层费+基础费
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 2 && chargeTag === 2) {
						// 按楼层 按商品 遍历商品
						const salesPayItemsDetailList = this.choosePayItemsData[findindex].salesPayItemsDetailList
						// 选中的楼层
						const floor = this.choosePayItemsData[findindex].floor
						// 查找楼层
						const floorIndex = salesPayItemsDetailList.findIndex((item) => item.floor === floor)
						// 楼层费
						const floorFee = salesPayItemsDetailList[floorIndex].floorFee
						// 楼层费+基础费
						this.choosePayItemsData[findindex].chargeMoney = this.$bigDecimal.add(this
							.choosePayItemsData[findindex].startingMoney, floorFee)
						// 总价等于(楼层费+基础费)*按商品标记的数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, this
							.choosePayItemsData[findindex].chargeMoney)
					} else if (chargeMode === 3 && chargeTag === 1) {
						// 固定值 按单
						// 总价等于固定值
						this.choosePayItemsData[findindex].totalMoney = this.choosePayItemsData[findindex]
							.chargeMoney
					} else if (chargeMode === 3 && chargeTag === 2) {
						// 固定值 按商品 遍历商品
						const chargeMoney = this.choosePayItemsData[findindex].chargeMoney
						// 总价等于固定值*按商品标记的数量
						this.choosePayItemsData[findindex].totalMoney = this.$bigDecimal.multiply(num, chargeMoney)
					}
				})
			},
			// 获取收费项
			async getPayItems() {
				const {
					returnValue: res
				} = await salesPayItemsFindList({
					state: 1,
					itemType: this.orderSourceParam === 'internet' ? 2 : 1,
					chargeMode:this.chargeMode
				})
				if (res) {
					const choosePayItemsData = []
					res.forEach((v) => {
						const obj = {
							itemName: v.itemName, // 收费项名称
							id: '',
							itemId: v.id, // 收费项id，
							startingMoney: v.startingMoney, // 收费项基础费用
							salesPayItemsDetailList: v.salesPayItemsDetailList, // 楼层费
							floor: 1, // 楼层
							chargeMoney: v.startingMoney, // 收费项价格（楼层费加基础费）自定义单价
							totalMoney: '', // 收费项总费用
							chargeMode: v.chargeMode, // 计费方式
							chargeTag: v.chargeTag, // 计费标记
							isChoose: false, // 是否选中
							disabled: false, // 是否可更改
							payItemsDataStr: JSON.stringify(v)
						}
						if (v.chargeMode === 2) {
							// 获取一楼的价格
							const findIndex = obj.salesPayItemsDetailList.findIndex(item => item.floor === obj
								.floor)
							// 按楼层 基础费加楼层费
							obj.chargeMoney = this.$bigDecimal.add(obj.startingMoney, obj
								.salesPayItemsDetailList[findIndex].floorFee)
							obj.disabled = true
						} else if (v.chargeMode === 3) {
							obj.disabled = true
						}
						choosePayItemsData.push(obj)
					})
					this.choosePayItemsData = choosePayItemsData
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.choose-address {
		flex: 1;
		width: 1px;
		word-break: break-all;
	}

	.multiplePopup {
		.btn {
			@include flexMixin();
			height: 80rpx;

			.confirm {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(60, 156, 255);
			}

			.cancel {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(144, 145, 147);
			}
		}

		.multipleBox {
			height: 600rpx;
			padding: 0rpx 20rpx;
			box-sizing: border-box;

			.box {
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				@include flexMixin();

				&:last-child {
					border-bottom: 0rpx;
				}

				.center {
					flex: 1;

					.name {
						flex: 1;
						color: rgba(56, 56, 56, 1);
						font-size: 36rpx;
						font-weight: 500;
					}

					.desc {
						flex: 1;
						font-size: 32rpx;
						color: #707070;
						margin-right: 20rpx;
					}
				}

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}

	.block {
		padding: 0 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		margin-top: 50rpx;

		.block-head {
			font-size: 36rpx;
			position: relative;
			height: 90rpx;
			line-height: 90rpx;
			display: flex;
			align-items: center;
			position: relative;
			padding-left: 10rpx;
			border-bottom: 1px solid #eee;

			&:before {
				display: block;
				content: '';
				height: 40rpx;
				width: 8rpx;
				border-radius: 8rpx;
				background: rgba(42, 130, 228, 1);
				position: absolute;
				left: -10rpx;
			}

			// font-weight: bold;
		}

		.block-box {
			.item {
				display: flex;
				min-height: 88rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333;
				flex-wrap: wrap;
				border-bottom: 1px solid #eee;

				.label {
					min-width: 144rpx;
					height: 88rpx;
					line-height: 88rpx;

					&.bold {
						font-weight: bold;
					}
				}

				.content {
					flex: 1;
					width: 1px;
					display: flex;
					flex-wrap: wrap;

					>.picker {
						width: 100%;

						.pickerd {
							display: flex;
							align-items: center;
						}

						// display: inline-block;
					}

					.input {
						flex: 1;
						width: 1px;
						font-size: 28rpx;
					}

					&.dfee {
						flex: auto;
						width: 100%;

						.fee-item {
							width: 100%;
							display: flex;
							align-items: center;
							height: 88rpx;
							border-bottom: 1px solid #eee;

							&.on {

								::v-deep.fee-check .u-icon__icon,
								.fee-label {
									color: rgba(42, 130, 228, 1) !important;
								}
							}

							&:last-child {
								border-bottom: none;
							}

							::v-deep.fee-check {
								margin-right: 12rpx;
							}

							.fee-label {
								font-size: 28rpx;

								padding-bottom: 4rpx;
								white-space: nowrap;
							}

							.fee-input {
								height: 60rpx;
								width: 180rpx;
								background: rgba(247, 247, 247, 1);
								border-radius: 10rpx;
								font-size: 28rpx;
								margin-left: 10rpx;
								padding: 0 20rpx;
								box-sizing: border-box;
								color: rgba(212, 48, 48, 1) !important;

								>::v-deep input {
									color: rgba(212, 48, 48, 1) !important;
								}
							}

							.fee-flr {
								height: 60rpx;
								width: 180rpx;
								margin-left: 10rpx;
								display: flex;
								align-items: center;
								border: 1px solid #ccc;
								border-radius: 10rpx;
								box-sizing: border-box;
								padding: 0 20rpx;

								.flr {
									width: 1px;
									flex: 1;
								}
							}

							.fee-total {
								font-size: 26rpx;
								color: rgba(128, 128, 128, 1);
								margin-left: 10rpx;
								white-space: nowrap;
							}
						}
					}

					&.fill {
						flex: auto;
						width: 100%;
						padding-bottom: 30rpx;

						textarea {
							background: rgba(247, 247, 247, 1);
							height: 105rpx;
							width: 100%;
							padding: 20rpx;
							font-size: 28rpx;
							border-radius: 10rpx;

						}

						.pay-item {}

						.fill-box {
							width: 100%;
							padding: 30rpx;
							padding-top: 0;
							border-radius: 10rpx;
							background: rgba(247, 247, 247, 1);

							::v-deep .radio-group {
								flex-wrap: wrap;
							}

							::v-deep .radio-item {
								margin-right: 30rpx;
								margin-top: 30rpx;
							}

							&.pay-box {
								display: flex;
								flex-wrap: wrap;

								.pay-item {
									margin-top: 20rpx;
									width: 50%;
									font-size: 26rpx;
								}
							}
						}

					}
				}

			}
		}
	}
</style>
