<template>
	<view class="gp-info">
		<view class="form">
			<view class="form-item">
				<view class="label">盘点时间：</view>
				<view class="desc">
					<uni-datetime-picker v-model="formData.time" return-type="timestamp">
						<input disabled :value="formData.time&&UnixToDate(formData.time)" placeholder="请选择盘点时间" />
					</uni-datetime-picker>
				</view>
				<view class="arrow">
					<u-icon name="arrow-right" />
				</view>
			</view>
			<view class="form-item">
				<view class="label">客户：</view>
				<view class="desc" @click="chooseCustomer">
					<input disabled :value="formData.customerName" placeholder="请选择客户" />
				</view>
				<view class="arrow">
					<u-icon name="arrow-right" />
				</view>
			</view>
			<view class="form-item">
				<view class="label">备注：</view>
				<view class="desc">
					<input :value="formData.remarks" placeholder="请填写备注" />
				</view>
			</view>
		</view>
		<view class="info-main">
			<view class="head">
				<view class="gp-no">CS456545</view>
				<view class="go-shop">徐记上海扒拉</view>
				<view class="state">启用</view>
			</view>
			<view class="main-box">
				<view class="item">
					<view>徐老板</view>
					<view>12345678912</view>
				</view>
				<view class="item">广州市白云区阁屏商务大厦</view>
				<view class="item">
					<view>楼层：2</view>
					<view>门牌号：201</view>
				</view>
			</view>
		</view>
		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
		</view>

		<view class="actions">
			<view class="actions-box">
				<u-button class="button" shape="circle" type="primary">保存</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		data() {
			return {
				UnixToDate: UnixToDate,
				formData: {
					time: null,
					customerName:null,
					remarks: null
				},
				tableColumn: [{
						prop: 'goodsNo',
						label: '规格',
						width: '200rpx',
						align: 'center'
					},
					{
						prop: 'goodsName',
						label: '系统数据',
						width: '150rpx',
						align: 'center'
					},
					{
						prop: 'brandName',
						label: '盘点数',
						width: '150rpx',
						align: 'center'
					},
					{
						prop: 'goodsClassifyName',
						label: '差异数',
						width: '150rpx',
						align: 'center'
					}
				],
				tableData: []
			}
		},
		onLoad(options) {
			uni.$on('chooseCustomer', (data) => {
				this.customerId = data.id
				this.formData.customerName = data.customerName
				console.log(this.formData)
			})
			this.editId = options.editId || ''
			if (this.editId) {
				this.isSave = false
				uni.setNavigationBarTitle({
					title: this.$t('addCustomer.titleTextInfo')
				});
			} else {
				this.isSave = true
				uni.setNavigationBarTitle({
					title: this.$t('addCustomer.titleText')
				});
			}
		},
		onShow() {
			
		},
		onUnload(){
			uni.$off('chooseCustomer')
		},
		methods: {
			chooseCustomer() {
				this.goto('/infoManage/chooseCustomer/chooseCustomer', {
					customerId: this.customerId,
					orgId: this.userInfo.orgId
				})
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	.gp-info {
		padding: 30rpx 20rpx;

		.form {
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);

			.form-item {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				line-height: 28rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				padding: 0 30rpx;

				.label {
					min-width: 150rpx;
				}

				.desc {
					width: 1px;
					flex: 1;
				}

				.arrow {}

				input {
					font-size: 28rpx;
				}
			}
		}

		.info-main {
			margin-top: 30rpx;
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
			font-size: 28rpx;
			line-height: 28rpx;

			.head {
				display: flex;
				align-items: center;
				font-weight: bold;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;

				.state {
					font-weight: normal;
					color: rgba(42, 130, 228, 1);
				}
			}

			.main-box {
				padding: 20rpx 30rpx;

				.item {
					display: flex;
					align-items: center;
					// margin-top: 30rpx;
					padding: 20rpx 0rpx;
					word-break: break-all;

					>view {
						min-width: 200rpx;
					}
				}
			}
		}

		.table {
			margin-top: 30rpx;
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
			overflow: hidden;
		}

		.actions {
			height: calc(100rpx + constant(safe-area-inset-bottom));
			height: calc(100rpx + env(safe-area-inset-bottom));

			.actions-box {
				position: fixed;
				height: calc(100rpx + constant(safe-area-inset-bottom));
				height: calc(100rpx + env(safe-area-inset-bottom));
				width: 100%;
				bottom: 0;
				left: 0;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: white;
				box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.1);
				display: flex;
				align-items: center;

				.button {
					height: 70rpx !important;
					width: 600rpx;
				}
			}
		}
	}
</style>
