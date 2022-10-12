<template>
	<view class="sk-info">
		<view class="list" v-if="backBottle">
			<view class="list-head">
				<view class="head-tle">{{$t('salesMg.confSend.backTle')}}</view>
				<view class="act-btn" @click="addList">
					<u-icon class="add-icon" name="plus-circle"></u-icon>
					<view class="add-txt">{{$t('salesMg.common.btn.add')}}</view>
				</view>
			</view>
			<view class="list-box" v-if="listGoods&&listGoods.length">
				<view class="back-item" v-for="(item,index) in listGoods" :key="index">
					<view class="goods-cell">
						<view class="label">{{$t('salesMg.confSend.outGoods')}}</view>
						<view class="content">
							<view class="goods-item" v-if="item.outGoodsDetailNames">
								<text>{{item.outGoodsDetailNames}}</text>
								<u-icon class="cross" name="close-circle-fill" @click="removeGoods(index,'out')">
								</u-icon>
							</view>
						</view>
						<u-icon class="plus" name="plus-circle" @click="chooseGoods(index,'out')"></u-icon>
					</view>
					<view class="goods-cell">
						<view class="label">{{$t('salesMg.confSend.inGoods')}}</view>
						<view class="content">
							<view class="goods-item" v-if="item.backGoodsDetailNames">
								<text>{{item.backGoodsDetailNames}}</text>
								<u-icon class="cross" name="close-circle-fill" @click="removeGoods(index,'in')">
								</u-icon>
							</view>
						</view>
						<u-icon class="plus" name="plus-circle" @click="chooseGoods(index,'in')"></u-icon>
					</view>
					<view class="goods-act">
						<view class="cell">
							<view class="name">{{$t('salesMg.confSend.outNum')}}</view>
							<view class="txt">{{item.outNum}}</view>
						</view>
						<view class="cell">
							<view class="name">{{$t('salesMg.confSend.backNum')}}</view>
							<input class="txt" step="1" type="number" v-model="item.backNum" />
						</view>
						<view class="cell">
							<view class="name">{{$t('salesMg.confSend.lendNum')}}</view>
							<view class="txt">{{item.lendNum}}</view>
						</view>
						<view class="cell">
							<view class="name">{{$t('salesMg.confSend.returnNum')}}</view>
							<view class="txt">{{item.returnNum}}</view>
						</view>
					</view>
					<view class="goods-del">
						<u-icon class="del" name="trash" @click="removeList(index)"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<block v-if="cylinderScanCode && cylinderScanSetting && cylinderPattern == '1'">
			<service-cylinder ref="serviceCylinder" :title="$t('salesMg.confSend.sendTle')" />
			<service-cylinder ref="recoveryCylinder" :title="$t('salesMg.confSend.collectTle')" />
		</block>
		<substitution-cylinder v-if="cylinderScanCode && cylinderScanSetting && cylinderPattern == '2'"
			ref="substitutionCylinder"></substitution-cylinder>

		<view class="btn">
			<u-button :text="$t('salesMg.common.btn.conf')" type="primary" hairline shape="circle" @click="saveData">
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
		cylinderArchivesFindByCodeKey,
		assetCodeFillingState
	} from '@/api/lpgManageAppApi'
	import {
		salesOrderFindBackBottleData,
		salesOrderFindOrderStockData,
		salesOrderToArrived,
	} from '@/api/lpgSalesManageApi'
	import {
		createUniqueString,
	} from '@/utils'
	import ServiceCylinder from './common/serviceCylinder'
	import SubstitutionCylinder from './common/substitutionCylinder'
	export default {
		mixins: [settingMixin],
		components: {
			ServiceCylinder,
			SubstitutionCylinder
		},
		props: {

		},
		data() {
			return {
				editId: '',
				backBottle: false, // 确认送达是否有回瓶单
				cylinderScanCode: false, // 确认送达是否需要扫码
				cylinderScanSetting: false, // 钢瓶溯源是否开启
				cylinderPattern: '', // 模式 1 扫码模式 2 一对一置换模式
				listGoods: [],
				backIndex: null,
				type: null,
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
			this.backBottle = options.backBottle == 'true' ? true : false
			this.cylinderScanCode = options.cylinderScanCode == 'true' ? true : false
			this.cylinderScanSetting = options.cylinderScanSetting == 'true' ? true : false
			this.cylinderPattern = options.cylinderPattern
			this.editId = options.editId || ''
			if (this.backBottle) {
				// 回瓶单数据
				const {
					returnValue: res
				} = await salesOrderFindBackBottleData({
					id: this.editId
				})
				this.listGoods = res
			}
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.confSend.titleText')
			});
		},
		onUnload() {

		},
		onShow() {
			uni.$once('chooseGoods', async (data) => {
				if (this.type == 'out') {
					// 出库商品
					this.listGoods[this.backIndex].outGoodsDetailNames = data.goodsName + '-' + data
						.propertyNames
					this.listGoods[this.backIndex].outGoodsDetailId = data.goodsDetailId
					const {
						returnValue: res
					} = await salesOrderFindOrderStockData({
						id: this.editId,
						goodsDetailId: data.goodsDetailId
					})
					if (res) {
						this.listGoods[this.backIndex].outNum = res.outNum
					}
				} else if (this.type == 'in') {
					this.listGoods[this.backIndex].backGoodsDetailNames = data.goodsName + '-' + data
						.propertyNames
					this.listGoods[this.backIndex].backGoodsDetailId = data.goodsDetailId
				}
			})
		},
		methods: {
			// 移除回单
			removeList(index) {
				this.listGoods.splice(index, 1)
			},
			// 移除商品
			removeGoods(index, type) {
				if (type == 'out') {
					this.listGoods[index].outGoodsDetailId = ''
					this.listGoods[index].outGoodsDetailNames = ''
				} else if (type == 'in') {
					this.listGoods[index].backGoodsDetailId = ''
					this.listGoods[index].backGoodsDetailNames = ''
				}
			},
			// 添加回单
			addList() {
				this.listGoods.push({
					ids: createUniqueString(),
					id: '',
					outGoodsDetailNames: '', // 出库商品
					outGoodsDetailId: '',
					backGoodsDetailNames: '', // 回瓶商品
					backGoodsDetailId: '',
					backNum: 0,
					outNum: 0,
					lendNum: 0,
					returnNum: 0
				})
			},
			// 保存数据
			async saveData() {
				const data = {}
				const moduleCommonSetData = []
				this.listGoods.forEach(v => {
					if (v.outGoodsDetailId || v.backGoodsDetailId) {
						moduleCommonSetData.push({
							id: v.id,
							outGoodsDetailId: v.outGoodsDetailId,
							backGoodsDetailId: v.backGoodsDetailId,
							backNum: v.backNum,
							outNum: v.outNum,
							lendNum: v.lendNum,
							returnNum: v.returnNum
						})
					}
				})
				if (moduleCommonSetData.length > 0) {
					data.backBottleData = JSON.stringify(moduleCommonSetData)
				}
				if (this.cylinderScanCode && this.cylinderScanSetting && this.cylinderPattern == '1') {
					// 有钢瓶溯源 扫码模式
					// 送达钢瓶
					data.outCodeData = []
					const serviceCylinderData = this.$refs.serviceCylinder.getCylinderData()
					serviceCylinderData.forEach(v => {
						data.outCodeData.push({
							cylinderId: v.id // 钢瓶ID
						})
					})
					data.outCodeData = JSON.stringify(data.outCodeData)
					// 回收钢瓶
					data.backCodeData = []
					const recoveryCylinderData = this.$refs.recoveryCylinder.getCylinderData()
					recoveryCylinderData.forEach(v => {
						data.backCodeData.push({
							cylinderId: v.id // 钢瓶ID
						})
					})
					data.backCodeData = JSON.stringify(data.backCodeData)
				} else if (this.cylinderScanCode && this.cylinderScanSetting && this.cylinderPattern == '2') {
					// 有钢瓶溯源 置换模式
					data.cylinderOwnerData = []
					const substitutionCylinderData = this.$refs.substitutionCylinder.getCylinderData()
					substitutionCylinderData.forEach(v => {
						if (v.give.id && v.collect.id) {
							data.cylinderOwnerData.push({
								cylinderId: v.give.id, // 钢瓶ID
								backCylinderId: v.collect.id // 钢瓶ID
							})
						}
					})
					data.cylinderOwnerData = JSON.stringify(data.cylinderOwnerData)
				}
				data.ids = this.editId || ''
				const {
					returnValue: res,
					message
				} = await salesOrderToArrived(data)
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					setTimeout(()=>{
						uni.navigateBack()
					},3000)
				}
			},
			// 选择商品
			chooseGoods(index, type) {
				this.backIndex = index
				this.type = type
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					businessTag: 'cylinder'
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

		.btn {
			width: 632rpx;
			margin: 60rpx auto;
			margin-top: 30rpx;
			@include flexMixin();

			.u-button {
				margin: 0rpx 10rpx;
			}
		}
	}

	.list {
		&:last-child {
			margin-bottom: 0rpx;
		}

		margin-bottom: 30rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;

		.list-box {
			padding: 0 30rpx;

			.back-item {
				border-bottom: 1px dashed rgb(42, 130, 228);

				&:last-child {
					border-bottom: none;
				}

				.goods-cell {
					display: flex;
					padding: 28rpx 0;
					border-bottom: 1px solid #eee;
					align-items: center;

					.label {
						font-size: 30rpx;
						margin-right: 30rpx;
					}

					.content {
						flex: 1;

						.goods-item {
							display: flex;
							align-items: center;
							padding: 12rpx 22rpx;
							min-height: 50rpx;
							border-radius: 50rpx;
							background: rgba(0, 0, 0, 0.08);
							font-size: 28rpx;
							word-break: break-all;
							width: fit-content;
							box-sizing: border-box;

							.cross {
								margin-left: 14rpx;
							}
						}
					}

					.plus {
						margin-left: 30rpx;

						::v-deep .u-icon__icon {
							color: rgb(42, 130, 228) !important;
							font-size: 40rpx !important;
						}
					}
				}

				.goods-act {
					display: flex;
					padding: 28rpx 0;
					border-bottom: 1px solid #eee;

					.cell {
						flex: 1;
						width: 1px;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						border-right: 1px solid #eee;

						&:last-child {
							border-right: none;
						}

						.name {
							font-size: 30rpx;
							color: rgb(128, 128, 128);
						}

						input {
							border: 1px solid #eee;

						}

						.txt {
							height: 50rpx;
							line-height: 50rpx;
							margin-top: 14rpx;
							font-size: 30rpx;
							width: 100rpx;
							text-align: center;
							padding: 0 10rpx;
							box-sizing: border-box;
						}
					}
				}

				.goods-del {
					padding: 28rpx 0;
					display: flex;
					justify-content: flex-end;

					.del {
						::v-deep .u-icon__icon {
							color: red !important;
							font-size: 44rpx !important;
						}
					}
				}
			}
		}

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

	}
</style>
