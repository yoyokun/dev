<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @toScan="toScan">
			</edit-form>
		</view>
		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
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
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import qrcode from "@/utils/reqrcode.js"
	import {
		cylinderArchivesFindByCodeKey,
	} from '@/api/lpgManageAppApi'
	export default {
		mixins: [settingMixin],
		props: {
			
		},
		data() {
			return {
				isSave: false,
				formDataSource: [{
						type: 'picker',
						labelText: '充装组织',
						fieldName: 'holderId',
						placeholder: '请选择充装组织',
						options: [],
						required: true,
						rules: [{
							required: true,
							message: '请选择充装组织',
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: '钢瓶码',
						fieldName: 'linkBillNo',
						placeholder: '钢瓶码',
						suffix: {
							icon: 'scan',
							color: '#3c9cff',
							func: 'toScan'
						},
						borderBottom: false,
					}
				],
				formDataValue: {},
				infos: {},
				tableColumn: [{
					prop: 'codeKey',
					label: '钢瓶二维码',
					width: '210rpx'
				}, {
					prop: 'modelName',
					label: '钢瓶型号',
					width: '160rpx'
				}, {
					prop: 'fillingStateStr',
					label: '充装状态',
					width: '160rpx'
				}, {
					prop: 'holderName',
					label: '持有者',
					width: '170rpx'
				}],
				tableData: []
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
			this.editId = options.editId || ''
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleTextEdit')
				});
				await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('stockMg.addStockOrder.titleText')
				});
			}
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			this.$set(this.formDataValue, 'holderId', this.userInfo.orgId)
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			searchCode(code) {
				if (this.nodeType === 'filling' && !this.holderId) {
					this.$refs.uToast.show({
						type: 'error',
						message: '请选择充装组织'
					})
					return
				}
			},
			// 扫码
			async toScan() {
				// #ifdef APP-PLUS
				var result = await permision.requestAndroidPermission("android.permission.CAMERA")
				if (result === 1) {
					uni.scanCode({
						success: (res) => {
							if (res.result) {
								this.searchCode(imgRes)
							}
						}
					});
				}
				// #endif
				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sourceType: ["camera"],
					sizeType: ["original"],
					success: (res) => {
						const resFile = res.tempFilePaths[0]
						qrcode.decode(resFile)
						qrcode.callback = (imgRes) => {
							if (imgRes === "error decoding QR Code") {
								this.$refs.uToast.show({
									type: 'error',
									message: '二维码图片错误，请重新上传'
								})
							} else {
								this.searchCode(imgRes)
							}
						}
					}
				});
				// #endif
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
				this.formDataSource = [...this.formDataSource]
			},
			// 获取详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await stockBillLogFindById({
					id
				})
				if (res) {
					this.infos = res

				}
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					let params = {}
					params.customerId = data.customerId
					params.id = this.editId || ''
					params.stockSourceType = 'stock'
					params.checkState = this.infos.checkState || 1
					params.holderId = data.holderId
					params.stockFormType = data.stockFormType
					params.remarks = data.remarks
					params.linkBillNo = data.linkBillNo
					params.licenseNo = data.licenseNo
					params.deliverManId = data.deliverManId
					params.linkId = this.linkId
					params.linkType = this.linkTypes
					params.filePath = JSON.stringify(data.filePath)
					params.stockInoutData = []
					const {
						returnValue: res,
						message
					} = await stockBillLogSaveOrEdit(params)
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

		.table {
			margin-top: 30rpx;
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
