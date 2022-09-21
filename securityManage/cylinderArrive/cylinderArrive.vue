<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseCustomer="chooseCustomer">
				<template v-slot:other>
					<u-form-item v-if="cylinderCode" class="border-item"
						:label="$t('security.cylinderArrive.form.type.label')">
						<view>{{cylinderCode | type}}</view>
					</u-form-item>
					<u-form-item v-if="cylinderCode==2" required class="border-item"
						:label="$t('security.cylinderArrive.form.nums.label')">
						<input class="item-nums" type="number" step="1"
							:placeholder="$t('security.cylinderArrive.form.nums.placeholder')" v-model="cylinderNum" />
					</u-form-item>
					<u-form-item v-if="cylinderCode==1" class="border-item" required
						:label="$t('security.cylinderArrive.form.codeKey.label')">
						<view class="code-box">
							<u-input type="text" class="code-input" v-model="codeKey" @input="changeCodeKey"
								shape="circle" :placeholder="$t('security.cylinderArrive.form.codeKey.placeholder')">
								<view slot="suffix">
									<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
								</view>
							</u-input>
							<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
								{{$t('security.cylinderArrive.btn.conf')}}
							</u-button>
						</view>
					</u-form-item>
				</template>
			</edit-form>
		</view>
		<view class="code-list">
			<view class="code-item" v-for="(val,key) in codeKeysArr" :key="key">
				<text>{{val}}</text>
				<u-icon @click="removeCode(key)" class="code-icon red" name="trash"></u-icon>
			</view>
		</view>
		<view class="btn">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>
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
		safeSecurityCheckCustomerValidity,
		safeSecurityOrderDelivery
	} from '@/api/lpgSecurityManageApi'
	import {
		assetCodeFindByKey,
		assetCodeSaveOrEdit
	} from '@/api/lpgManageAppApi'
	import {
		checkMix
	} from '@/utils'
	export default {
		mixins: [settingMixin],
		props: {},
		data() {
			return {
				formDataSource: [{
					type: 'chooseBtn',
					labelText: this.$t('security.cylinderArrive.form.customerName.label'),
					fieldName: 'customerName',
					placeholder: this.$t('security.cylinderArrive.form.customerName.placeholder'),
					required: true,
					func: 'chooseCustomer',
					borderBottom: false,
					rules: [{
						required: true,
						message: this.$t('security.cylinderArrive.form.customerName.placeholder'),
						trigger: ['change', 'blur']
					}]
				}],
				formDataValue: {},
				customerId: null,
				nums: '',
				cylinderCode: null,
				codeKey: '',
				codeKeysArr: [],
				cylinderNum: '',
			}
		},
		// 过滤器
		filters: {
			type(value) {
				const typeObj = that.$t('security.cylinderArrive.typeTxt')
				return typeObj[value] || ''
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
				title: this.$t('security.cylinderArrive.titleText')
			});
			uni.$once('chooseCustomer', (data) => {
				if (data.id == this.customerId) {
					return
				}
				setTimeout(() => {
					this.$AppReady.then(async () => {
						if (this.$Route.path ==
							'/securityManage/cylinderArrive/cylinderArrive') {
							const {
								returnValue: res,
								returnObject
							} = await safeSecurityCheckCustomerValidity({
								customerId: data.id
							})
							if (res === null || res.state !== 2) {
								uni.showModal({
									title: this.$t(
										'security.cylinderArrive.modalTips.tle'
										)[0],
									content: this.$t(
											'security.cylinderArrive.modalTips')
										.tips(0),
									success: async (res) => {
										if (res.confirm) {
											this.$navigateTo(
												'/securityManage/addSecurityCheck/addSecurityCheck'
											)
										}
									}
								})
							} else if (res.result === 2) {
								uni.showModal({
									title: this.$t(
										'security.cylinderArrive.modalTips.tle'
										)[1],
									content: this.$t(
											'security.cylinderArrive.modalTips')
										.tips(1, res.levelName),
									confirmText: this.$t('security.cylinderArrive.btn.continue'),
									cancelText: this.$t('security.cylinderArrive.btn.cancel'),
									success: async (res) => {
										if (res.confirm) {
											this.restData()
											this.formDataValue = {
												customerName: data
													.customerName
											}
											this.customerId = data.id
											this.cylinderCode = returnObject
										}
										if (res.cancel) {
											this.$navigateTo(
												'/securityManage/addSecurityCheck/addSecurityCheck'
											)
										}
									}
								})
							} else {
								this.restData()
								this.formDataValue = {
									customerName: data.customerName
								}
								this.customerId = data.id
								this.cylinderCode = returnObject
							}
						}
					})
				}, 10)

			})
		},
		onHide() {},
		onUnload() {
			uni.$off('chooseCustomer')
		},
		onShow() {},
		methods: {
			// 移除二维码
			removeCode(key) {
				this.codeKeysArr.splice(key, 1)
			},
			// 过滤二维码字符
			changeCodeKey(e) {
				const val = checkMix(e)
				this.codeKey = e
				this.$nextTick(function() {
					this.codeKey = val
				})
			},
			// 重置数据
			restData() {
				this.formDataValue = {
					customerName: ''
				}
				this.codeKeysArr = []
				this.cylinderNum = ''
				this.codeKey = ''
				this.customerId = null
				this.cylinderCode = null
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					data.customerId = this.customerId
					data.codeKeys = this.codeKeysArr.join(',') // 钢瓶码
					data.cylinderNum = this.cylinderNum // 钢瓶数量
					const {
						returnValue: res,
						message
					} = await safeSecurityOrderDelivery(data)
					if (res) {
						this.$refs.uToast.show({
							type: 'success',
							message: message
						})
						this.restData()
					}
				})
			},
			// 查询二维码
			async searchCode(code = null) {
				this.codeKey = code || this.codeKey
				if (!this.codeKey) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('security.cylinderArrive.tips.errCode')
					})
					return
				}

				const {
					returnValue: res
				} = await assetCodeFindByKey({
					key: this.codeKey
				}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
				if (res) {
					this.codeKeysArr.push(this.codeKey)
				} else {
					uni.showModal({
						title: this.$t('security.cylinderArrive.modalTips.tle')[2],
						content: this.$t('security.cylinderArrive.modalTips').tips(2, this.codeKey),
						success: async (res) => {
							if (res.confirm) {
								const {
									returnValue: res,
									message
								} = await assetCodeSaveOrEdit({
									qrKey: this.codeKey
								})
								if (res) {
									this.$refs.uToast.show({
										type: 'success',
										message: message
									})
									this.codeKeysArr.push(this.codeKey)
								}
							}
						}
					})
				}
			},
			// 扫码
			async toScan() {
				const code = await this.decodeQr()
				if(code){
					this.searchCode(code)
				}
			},
			// 表单
			async changeForm(e) {
				let params = e.queryParams

			},
			// 选择客户
			chooseCustomer() {
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.customerId,
					orgId: this.userInfo.orgId,
				})
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 632rpx;
		margin: 60rpx auto;
		@include flexMixin();

		.u-button {
			margin: 0rpx 10rpx;
		}
	}

	.code-list {
		border-radius: 20rpx;
		box-shadow: 0px 4rpx 8rpx rgba(0, 0, 0, 0.04);
		background: white;
		margin-top: 30rpx;
		padding: 0 30rpx;

		.code-item {
			display: flex;
			align-items: center;
			font-size: 32rpx;
			min-height: 80rpx;
			border-bottom: 1px solid #eee;

			>text {
				width: 1px;
				flex: 1;
			}

			::v-deep .code-icon {
				.u-icon__icon {
					font-size: 40rpx !important;
					color: red !important;
				}

			}
		}
	}

	.sk-info {
		padding: 30rpx 20rpx;

		::v-deep .normalForm {
			.border-item {
				border-top: 1px solid #eee;
			}

			.item-nums {
				padding-top: 8rpx;
				font-size: 28rpx;
				width: 100%;
			}

			.code-box {
				width: 100%;
				display: flex;
				align-items: center;

				.code-input {
					flex: 1;
					width: 1rpx;
					margin-right: 30rpx;
				}

				.code-btn {
					width: 100rpx !important;
				}
			}

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
	}
</style>
