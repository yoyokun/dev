<template>
	<view class="sk-info">
		<block v-if="cylinderScanSetting && cylinderPattern == '1'">
			<service-cylinder ref="serviceCylinder" :title="$t('salesMg.confSend.sendTle')" />
			<service-cylinder ref="recoveryCylinder" :title="$t('salesMg.confSend.collectTle')" />
		</block>
		<substitution-cylinder v-if="cylinderScanSetting && cylinderPattern == '2'" ref="substitutionCylinder">
		</substitution-cylinder>
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
		salesBusinessToScanCylinderCode,
	} from '@/api/lpgSalesManageApi'
	import ServiceCylinder from '../confSend/common/serviceCylinder'
	import SubstitutionCylinder from '../confSend/common/substitutionCylinder'
	export default {
		components: {
			ServiceCylinder,
			SubstitutionCylinder
		},
		props: {

		},
		data() {
			return {
				editId: '',
				cylinderScanSetting: false, // 钢瓶溯源是否开启
				cylinderPattern: '', // 模式 1 扫码模式 2 一对一置换模式
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
			this.cylinderScanSetting = options.cylinderScanSetting == 'true' ? true : false
			this.cylinderPattern = options.cylinderPattern
			this.editId = options.editId || ''
			uni.setNavigationBarTitle({
				title: this.$t('salesMg.scanSend.titleText')
			});
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {

			// 保存数据
			async saveData() {
				const data = {}
				if (this.cylinderScanSetting && this.cylinderPattern === '1') {
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
				} else if (this.cylinderScanSetting && this.cylinderPattern === '2') {
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
				data.ids = this.editId ? this.editId : ''
				const {
					returnValue: res,
					message
				} = await salesBusinessToScanCylinderCode(data)
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 3000)
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
