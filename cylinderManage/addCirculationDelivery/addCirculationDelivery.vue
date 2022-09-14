<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @toScan="toScan">
			</edit-form>
		</view>
		
		<view class="car-info" v-if="licenseInfo">
			<view class="item">
				<view class="label">车牌号码：</view>
				<view class="desc">{{ licenseInfo.license }}</view>
			</view>
			<view class="item">
				<view class="label">行驶证编号：</view>
				<view class="desc">{{ licenseInfo.certificateNo }}</view>
			</view>
			<view class="item">
				<view class="label">车辆归属：</view>
				<view class="desc">{{ licenseInfo.orgName }}</view>
			</view>
			<view class="item">
				<view class="label">车辆负责人：</view>
				<view class="desc">{{ licenseInfo.principal }}</view>
			</view>
			<view class="item">
				<view class="label">联系电话：</view>
				<view class="desc">{{ licenseInfo.linkphone }}</view>
			</view>
			<view class="item">
				<view class="label">车辆类型：</view>
				<view class="desc">{{ licenseInfo.vehicleModelName }}</view>
			</view>
		</view>
		
		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
		</view>
		<view class="btn">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="searchCode">
			</u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import qrcode from "@/utils/reqrcode.js"
	import {
		cylinderArchivesFindByCodeKey,
		cylinderFlowScanCodeByType,
		carVehicleFindByLicenseNo
	} from '@/api/lpgManageAppApi'
	export default {
		props: {

		},
		data() {
			return {
				isSave: false,
				formDataSource: [{
						type: 'text',
						labelText: this.$t('cylinderMg.addCirculation.form.carNo.label'),
						fieldName: 'holderNo',
						placeholder: this.$t('cylinderMg.addCirculation.form.carNo.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('cylinderMg.addCirculation.form.carNo.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'text',
						labelText: this.$t('cylinderMg.addCirculation.form.codeKey.label'),
						fieldName: 'codeKey',
						placeholder: this.$t('cylinderMg.addCirculation.form.codeKey.placeholder'),
						required: true,
						rules: [{
							required: true,
							message: this.$t('cylinderMg.addCirculation.form.codeKey.placeholder'),
							trigger: ['change', 'blur']
						}],
						suffix: {
							icon: 'scan',
							color: '#3c9cff',
							func: 'toScan'
						},
						borderBottom: false,
					}
				],
				nodeType: 'carDistribution',
				cylinderId: null,
				holderType: 3,
				holderName: null,
				holderId: null,
				formDataValue: {},
				licenseInfo: null,
				tableColumn: [{
					prop: 'codeKey',
					label: this.$t('cylinderMg.addCirculation.tableColumn.codeKey'),
					width: '210rpx',
					align:'center'
				}, {
					prop: 'modelName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.modelName'),
					width: '160rpx',
					align:'center'
				}, {
					prop: 'fillingStateStr',
					label: this.$t('cylinderMg.addCirculation.tableColumn.fillingStateStr'),
					width: '160rpx',
					align:'center'
				}, {
					prop: 'holderName',
					label: this.$t('cylinderMg.addCirculation.tableColumn.holderName'),
					width: '170rpx',
					align:'center'
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
				title: this.$t('cylinderMg.addCirculationDelivery.titleText')
			});
			await this.getHolderInfo(this.formDataValue.holderNo)
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			// 查询二维码
			searchCode(code = null) {
				this.formDataValue.codeKey = code || this.formDataValue.codeKey
				this.$refs.dialogForm.handleSubmit(async (data) => {
					uni.showLoading()
					const {
						returnValue: res
					} = await cylinderArchivesFindByCodeKey({
						codeKey: this.formDataValue.codeKey
					})
					if (res) {
						this.cylinderId = res.id // 钢瓶ID
						await this.saveData()
					} else {
						uni.hideLoading()
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
					holderNo: this.formDataValue.holderNo, // 持有人编号
					cylinderId: this.cylinderId // 钢瓶ID
				}
				const {
					returnValue: res,
					message
				} = await cylinderFlowScanCodeByType(params)
				uni.hideLoading()
				if (res) {
					this.tableData.push(res)
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
				}
			},
			async getHolderInfo(license) {
				const {
					returnValue: res
				} = await carVehicleFindByLicenseNo({
					license: license || ''
				})
				if (res) {
					this.licenseInfo = res
					this.holderName = res.license // 持有人名称
					this.holderId = res.id // 持有人id
				} else {
					this.holderName = this.formDataValue.holderNo // 持有人名称
					this.holderId = '' // 持有人编号
					this.licenseInfo = null
				}
			},
			// 表单
			async changeForm(e) {
				let params = e.queryParams
				if (e.type == 'blur' && e.name == 'holderNo' && params.holderNo) {
					this.getHolderInfo(params.holderNo)
				}
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
		.car-info{
			border-radius: 20rpx;
			background: white;
			padding: 30rpx;
			margin-top: 30rpx;
			box-shadow: 0px 2px 4px rgba(0,0,0,0.04);
			display: flex;
			flex-wrap: wrap;
			.item{
				margin-right: 30rpx;
				width: calc((100% - 30rpx) / 2);
				display: flex;
				font-size: 28rpx;
				line-height: 34rpx;
				color: rgba(112, 112, 112, 1);
				margin-top: 20rpx;
				&:nth-child(-n+2){
					margin-top: 0;
				}
				&:nth-child(2n){
					margin-right: 0;
				}
				.label{
					min-width: 140rpx;
				}
				.desc{
					color: rgba(56, 56, 56, 1);
					word-break: break-all;
					width: 1px;
					flex: 1;
				}
			}
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
