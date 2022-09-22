<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="100" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseAddress="chooseAddress"
				@chooseCustomer="chooseCustomer" @chooseTemp="chooseTemp">
			</edit-form>
		</view>

		<view class="list-box" v-for="(item,index) in listOrder" :key="index">
			<view class="list">
				<view class="list-head">
					<view class="head-tle">{{item.billName}}</view>
					<view class="act-btn" @click="chooseGoods(index)">
						<u-icon class="add-icon" name="plus-circle"></u-icon>
						<view class="add-txt">商品</view>
					</view>
				</view>
				<view class="goods">
					<view class="goods-list" v-for="(val,key) in item.salesOrderDetailGoodsJson" :key="key">
						<view class="goods-head">
							<view class="goods-tle">{{val.goodsNo}} - {{val.goodsName}}</view>
							<view class="goods-price">￥{{val.unitPrice}}</view>
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
							<u-icon class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(index,key)">
							</u-icon>
						</view>

						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">规格：</view>
								<view class="cell-content">{{val.standardName}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">数量：</view>
								<view class="cell-content">
									<view class="nums"><text>x</text><input min="1" maxlength="4" type="number"
											v-model="val.amount" :placeholder="'数量'" step="1"
											@input="checkNum($event,index,key)" />
									</view>
								</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">结算数量：</view>
								<view class="cell-content">{{val.settleAmount}}</view>
							</view>
							<view class="cell">
								<view class="cell-label">金额：</view>
								<view class="cell-content">{{val.totalMoney}}</view>
							</view>
						</view>
						<view class="info-cell">
							<view class="cell">
								<view class="cell-label">备注：</view>
								<view class="cell-content">
									<textarea v-model="val.remarks" placeholder="请输入备注"></textarea>
								</view>
							</view>
						</view>
					</view>
					<view class="total">
						<view class="total-tle">
							<text>合计：</text>
						</view>
						<view class="total-main">
							<view class="item">
								<text>数量：</text>
								<text>{{item.amount}}</text>
							</view>
							<view class="item">
								<text>金额：</text>
								<text class="red">{{item.totalMoney}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-popup :show="showTemp" :round="10" mode="bottom" @close="closeTemp" closeOnClickOverlay>
			<view class="temp-box">
				<view class="check-content">
					<u-checkbox-group v-model="tempIds" size="22" class="check-box" shape="circle"
						iconPlacement="right">
						<u-checkbox v-for="(item,index) in templateList" :key="index" :label="item.templateName"
							:name="item.id"></u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="check-btn">
					<u-button class="btns" type="info" @click="closeTemp">取消</u-button>
					<u-button class="btns" type="primary" @click="saveTemp">确定</u-button>
				</view>
			</view>
		</u-popup>


		<view class="btn">
			<u-button :text="'结算'" type="success" hairline shape="circle" plain></u-button>
			<u-button :text="'结算'" type="warning" hairline shape="circle" plain>
			</u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import {
		salesOrderTemplateFindList
	} from '@/api/lpgSalesManageApi'
	import {
		userCustomerFindByIdList
	} from '@/api/lpgManageAppApi'
	import {
		createUniqueString,
		positiveInteger
	} from '@/utils'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				formDataSource: [{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.placeOrder.form.customerName.label'),
						fieldName: 'customerName',
						placeholder: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
						options: [],
						lIcon: '/static/image/plo1.png',
						func: 'chooseCustomer',
						required: true,
						borderBottom: false,
						rules: [{
							required: true,
							message: this.$t('salesMg.placeOrder.form.customerName.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('salesMg.placeOrder.form.linkMan.label'),
						fieldName: 'linkMan',
						placeholder: this.$t('salesMg.placeOrder.form.linkMan.placeholder'),
						lIcon: '/static/image/plo2.png',
						disabled: true,
						show:false,
					},
					{
						type: 'number',
						labelText: this.$t('salesMg.placeOrder.form.phone.label'),
						fieldName: 'phone',
						placeholder: this.$t('salesMg.placeOrder.form.phone.placeholder'),
						lIcon: '/static/image/plo3.png',
						disabled: true,
						show:false,
					},
					{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.placeOrder.form.address.label'),
						fieldName: 'address',
						lIcon: '/static/image/plo4.png',
						placeholder: this.$t('salesMg.placeOrder.form.address.placeholder'),
						func: 'chooseAddress',
						show:false,
					},
					{
						type: 'chooseBtn',
						labelText: this.$t('salesMg.placeOrder.form.orderTemp.label'),
						fieldName: 'orderTemp',
						placeholder: this.$t('salesMg.placeOrder.form.orderTemp.placeholder'),
						lIcon: '/static/image/plo5.png',
						func: 'chooseTemp',
						borderBottom: false,
						show:false,
					},
				],
				formDataValue: {},
				listOrder: [],
				tempIndex: null,
				showTemp: false,
				customerId: '',
				customerInfo: null,
				templateList: [],
				tempIds: [],
				realTempIds: [],
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
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.placeOrder.titleText')
			});
			// 选择商品
			uni.$on('chooseGoods', (res) => {
				res.forEach((item, index) => {
					item.id = ''
					item.unitPrice = this.$bigDecimal.round(item.unitPrice, 2)
					item.totalMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(item.amount, item.unitPrice), 2)
					this.listOrder[this.tempIndex].salesOrderDetailGoodsJson.push(item)
				})
			})
			// 选择地址
			uni.$on('chooseAddress', (data) => {
				if (data.id == this.addressId) {
					return
				}
				this.addressId = data.id
				this.formDataValue = {
					...this.formDataValue,
					address: this.$options.filters.addressSplicing(data),
					linkMan: data.linkman,
					phone: data.phone,
				}
			})
			// 选择客户
			uni.$on('chooseCustomer', async (data) => {
				if (data.id == this.customerId) {
					return
				}
				this.customerId = data.id
				this.formDataValue = {
					...this.formDataValue,
					orderTemp: '',
				}
				setTimeout(async () => {
					// 获取客户信息
					await this.getCustomerInfo(this.customerId)
					// 获取客户子单模板
					if (this.customerInfo) {
						let customerInfo = this.customerInfo
						this.formDataSource.forEach((item,index)=>{
							if(index==0){
								item.borderBottom = true
							}
							item.show = true
						})
						await this.getTemplate(
							customerInfo.userSettlement.orderType,
							customerInfo.userSettlement.propertyIds,
							customerInfo.userSettlement.salePropertyIds,
							customerInfo.userSettlement.typeId,
							customerInfo.userSettlement.regionId
						)
					}
				}, 10)
			})
		},
		onUnload() {
			uni.$off('chooseGoods')
			uni.$off('chooseCustomer')
		},
		onShow() {

		},
		methods: {
			// 计算数量金额
			checkNum(e, index, key) {
				this.listOrder[index].salesOrderDetailGoodsJson[key].amount = positiveInteger(e.detail.value)
				this.listOrder[index].salesOrderDetailGoodsJson[key].totalMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(this.listOrder[index].salesOrderDetailGoodsJson[key].amount, this.listOrder[index].salesOrderDetailGoodsJson[key].unitPrice), 2)
				this.listOrder[index].amount = this.listOrder[index].salesOrderDetailGoodsJson.reduce((sum,val)=>this.$bigDecimal.round(this.$bigDecimal.add(sum, val.amount), 2),0)
				this.listOrder[index].totalMoney = this.listOrder[index].salesOrderDetailGoodsJson.reduce((sum,val)=>this.$bigDecimal.round(this.$bigDecimal.add(sum, val.totalMoney), 2),0)
			},
			// 选择子单
			chooseTemp() {
				this.tempIds = JSON.parse(JSON.stringify(this.realTempIds))
				this.showTemp = true
			},
			closeTemp() {
				this.showTemp = false
			},
			saveTemp() {
				let listOrder = this.listOrder
				let tempName = []
				let realTempIds = this.realTempIds
				listOrder = listOrder.filter(item=>!(realTempIds.filter(item=>!this.tempIds.some(el=>el==item)).indexOf(item.tempId)>-1))
				this.templateList.forEach((item, index) => {
					if (this.tempIds.indexOf(item.id) > -1 && this.realTempIds.indexOf(item.id) < 0) {
						let obj = {
							id: '',
							tempId: item.id,
							billName: item.templateName,
							totalMoney: 0,
							amount:0,
							inOutReasonId: item.inOutReasonId,
							loseStockState: item.loseStockState,
							decimalNum: item.decimalNum,
							decimalMode: item.decimalMode,
							printMode: item.printMode,
							printTemplateId: item.printTemplateId,
							orderTemplateId: item.id,
							salesOrderDetailGoodsJson: []
						}
						if (item.goodsVoList && item.goodsVoList.length) {
							item.goodsVoList.forEach((val, key) => {
								val.id = ''
								obj.totalMoney = this.$bigDecimal.round(this.$bigDecimal.add(obj.totalMoney, val.totalMoney), 2)
								obj.amount = this.$bigDecimal.round(this.$bigDecimal.add(obj.amount, val.amount), 2)
								// retreatState
								// weight
								// templateGoodsAssistList
								obj.salesOrderDetailGoodsJson.push(val)
							})
						}
						listOrder.push(obj)
					}
				})
				listOrder.forEach(item=>tempName.push(item.billName))
				this.listOrder = listOrder
				this.realTempIds = JSON.parse(JSON.stringify(this.tempIds))
				this.formDataValue = {
					...this.formDataValue,
					orderTemp:tempName.join(',')
				}
				console.log(this.listOrder)
				this.closeTemp()
			},
			// 获取子单模板(客户的默认模板，客户价格)
			async getTemplate(orderTypeIdstr, propertyIds, salePropertyIds, typeId, regionId) {
				let propertyId = []
				propertyId.push(propertyIds)
				propertyId.push(salePropertyIds)
				propertyId.push(typeId)
				propertyId.push(regionId)
				// 过滤 null 空 undefined
				let propertyIdStr = propertyId.filter(item => item)
				propertyIdStr = [...new Set(propertyIdStr)].join(',')
				const {
					returnValue: res,
					returnObject
				} = await salesOrderTemplateFindList({
					orderTypeIdstr,
					propertyIdStr: propertyIdStr,
					customerId: this.customerId,
					state: 1,
					salesType: 1,
				}, '加载中...')
				this.templateList = res
				console.log(res)
			},
			// 查询客户详情
			async getCustomerInfo(id, addressId) {
				const {
					returnValue: res
				} = await userCustomerFindByIdList({
					id
				}, '加载中...')
				if (res) {
					this.customerInfo = res
					if (!addressId && res.userAddress) {
						this.addressId = res.userAddress.id
						this.formDataValue = {
							...this.formDataValue,
							address: this.$options.filters.addressSplicing(res.userAddress),
							customerName: res.customerName,
							linkMan: res.userAddress.linkman,
							phone: res.userAddress.phone,
							orderTemp:'',
						}
						this.tempIds = []
						this.realTempIds = []
						this.listOrder = []
					} else if (!addressId && !res.userAddress) {
						this.$refs.uToast.show({
							type: 'error',
							message: '该客户无地址，请添加！',
						})
					}
				}
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					
				})
			},
			// 移除子单
			removeOrderGoods(index, key = null) {
				if (key != null) {
					this.listOrder[index].salesOrderDetailGoodsJson.splice(key, 1)
				} else {
					this.listOrder.splice(index, 1)
				}
			},
			// 选择客户
			chooseCustomer() {
				// 客户
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.customerId,
					orgId: this.userInfo.orgId
				})
			},
			// 选择地址
			chooseAddress() {
				this.goto('/infoManage/chooseAddress/chooseAddress', {
					customerId: this.customerId,
					addressId: this.addressId
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
				this.formDataValue = params
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

		.temp-box {
			max-height: 620rpx;
			display: flex;
			flex-direction: column;

			.check-content {
				min-height: 70rpx;
				padding: 0 30rpx;
				flex: 1;
				height: 1;
				overflow-y: scroll;
			}

			.check-box {
				display: flex;
				flex-direction: column;

				>.u-checkbox {
					border-bottom: 1px solid #eee;
					padding: 30rpx 0;

					&:last-child {
						border-bottom: none;
					}
				}
			}

			.check-btn {
				display: flex;
				padding: 20rpx 30rpx;
				box-shadow: 0px -1px 1px 1px rgba(0, 0, 0, 0.04);

				.btns {
					margin-right: 30rpx;

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}

		.list-box {
			.list {
				margin-top: 40rpx;

				.list-head {
					height: 90rpx;
					display: flex;
					align-items: center;
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

					.head-icon {
						::v-deep .u-icon__icon {
							color: red !important;
							font-size: 44rpx !important;
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
							font-size: 28rpx;
							line-height: 28rpx;
							margin-top: 30rpx;

							.cell {
								margin-right: 20rpx;
								width: 1px;
								flex: 1;
								display: flex;
								align-items: center;

								&:last-child {
									margin-right: 0;
								}

								.cell-label {
									color: rgba(128, 128, 128, 1);
								}

								.cell-content {
									flex: 1;

									.nums {
										color: rgba(128, 128, 128, 1);
										display: flex;
										align-items: center;

										input {
											width: 80rpx;
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

						.total-tle {
							height: 80rpx;
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
							padding: 0 20rpx;

							.item {
								margin-right: 30rpx;

								>text:first-child {
									color: gray;
								}

								&:last-child {
									margin-right: 0;
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
