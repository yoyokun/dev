<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseCustomer="chooseCustomer">
				<template v-slot:other>
					<u-form-item required :label="$t('cylinderMg.addCirculation.form.codeKey.label')">
						<view class="code-box">
							<u-input type="text" class="code-input" v-model="codeKey" shape="circle"
								:placeholder="$t('cylinderMg.addCirculation.form.codeKey.placeholder')">
								<view slot="suffix">
									<u-icon @click="toScan" size="40rpx" color="#3c9cff" name="scan"></u-icon>
								</view>
							</u-input>
							<u-button class="code-btn" type="primary" shape="circle" size="small" @click="searchCode">
								{{$t('cylinderMg.addCirculation.btn.conf')}}
							</u-button>
						</view>
					</u-form-item>
				</template>
			</edit-form>
		</view>

		<view class="car-info" v-if="customerInfo">
			<view class="item">
				<view class="label">{{$t('cylinderMg.addCirculationService.customerNo')}}：</view>
				<view class="desc">{{ customerInfo.customerNo }}</view>
			</view>
			<view class="item">
				<view class="label">{{$t('cylinderMg.addCirculationService.customerName')}}：</view>
				<view class="desc">{{ customerInfo.customerName }}</view>
			</view>
			<view class="item">
				<view class="label">{{$t('cylinderMg.addCirculationService.phone')}}：</view>
				<view class="desc">{{ customerInfo.phone }}</view>
			</view>
			<view class="item">
				<view class="label">{{$t('cylinderMg.addCirculationService.orgName')}}：</view>
				<view class="desc">{{ customerInfo.orgName }}</view>
			</view>
		</view>

		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import qrcode from "@/utils/reqrcode.js"
	import {
		cylinderArchivesFindByCodeKey,
		cylinderFlowScanCodeByType
	} from '@/api/lpgManageAppApi'
	export default {
		props: {

		},
		data() {
			return {
				formDataSource: [{
					type: 'chooseBtn',
					labelText: this.$t('cylinderMg.addCirculation.form.customerName.label'),
					fieldName: 'customerName',
					placeholder: this.$t('cylinderMg.addCirculation.form.customerName.placeholder'),
					required: true,
					func: 'chooseCustomer',
					rules: [{
						required: true,
						message: this.$t('cylinderMg.addCirculation.form.customerName.placeholder'),
						trigger: ['change', 'blur']
					}]
				}],
				customerInfo: null,
				codeKey: '',
				nodeType: 'confirmDelivery',
				cylinderId: null,
				holderType: 2,
				holderId: null,
				holderNo: null,
				holderName: null,
				formDataValue: {},
				tableColumn: [{
					prop: 'cylinderNo',
					label: this.$t('cylinderMg.addCirculation.tableColumn.cylinderNo'),
					width: '160rpx',
					align: 'center'
				}, {
					prop: 'codeKey',
					label: this.$t('cylinderMg.addCirculation.tableColumn.codeKey'),
					width: '210rpx',
					align: 'center'
				}, {
					prop: 'modelName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.modelName'),
					width: '160rpx',
					align: 'center'
				}, {
					prop: 'holderName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.holderName'),
					width: '170rpx',
					align: 'center'
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
			uni.setNavigationBarTitle({
				title: this.$t('cylinderMg.addCirculationService.titleText')
			});
			uni.$on('chooseCustomer', (data) => {
				this.formDataValue = {
					customerName: data.customerName
				}
				this.customerInfo = data
				this.holderName = data.customerName // 持有人名称
				this.holderNo = data.customerNo // 持有人编号
				this.holderId = data.id
			})
		},
		onUnload() {
			uni.$off('chooseCustomer')
		},
		onShow() {

		},
		methods: {
			// 查询二维码
			searchCode(code = null) {
				this.codeKey = code || this.codeKey
				if (!this.codeKey) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('cylinderMg.addCirculation.tips.errCode')
					})
					return
				}
				this.$refs.dialogForm.handleSubmit(async (data) => {
					const {
						returnValue: res
					} = await cylinderArchivesFindByCodeKey({
						codeKey: this.codeKey
					},this.$t('cylinderMg.addCirculation.loadTxt.finding'))
					if (res) {
						this.cylinderId = res.id // 钢瓶ID
						await this.saveData()
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: this.$t('cylinderMg.addCirculation.tips.errCode')
						})

					}
				})
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
									message: this.$t('cylinderMg.addCirculation.tips.errImg')
								})
							} else {
								this.searchCode(imgRes)
							}
						}
					}
				});
				// #endif
			},
			// 保存数据
			async saveData() {
				let params = {
					nodeType: this.nodeType, // 流转环节
					holderType: this.holderType, // 持有人类型，1组织，2客户，3车辆，4供应商/检测厂 5，成员
					holderId: this.holderId, // 持有人ID
					holderName: this.holderName, // 持有人名称
					holderNo: this.holderNo, // 持有人编号
					cylinderId: this.cylinderId // 钢瓶ID
				}
				const {
					returnValue: res,
					message
				} = await cylinderFlowScanCodeByType(params,this.$t('cylinderMg.addCirculation.loadTxt.saving'))
				if (res) {
					this.tableData.push(res)
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
				}
			},
			// 表单
			async changeForm(e) {
				
			},
			// 选择客户
			chooseCustomer() {
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.holderId,
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

		.table {
			margin-top: 30rpx;
		}

		.car-info{
			border-radius: 20rpx;
			background: white;
			padding: 30rpx 15rpx;
			margin-top: 30rpx;
			box-shadow: 0px 2px 4px rgba(0,0,0,0.04);
			display: flex;
			flex-wrap: wrap;
			.item{
				min-width: calc((100% - 30rpx) / 2);
				padding: 0 15rpx;
				box-sizing: border-box;
				display: flex;
				font-size: 28rpx;
				line-height: 34rpx;
				color: rgba(112, 112, 112, 1);
				line-height: 50rpx;
				.label{
					min-width: 140rpx;
				}
				.desc{
					color: rgba(56, 56, 56, 1);
				}
			}
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
	}
</style>
