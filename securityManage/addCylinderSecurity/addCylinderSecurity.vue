<template>
	<view class="sk-info">
		<view class="form" v-show="!isSave">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm" @chooseBill="chooseBill"
				@chooseCustomer="chooseCustomer">
				<template v-slot:other>
					<u-form-item :label="$t('security.addCylinderSecurity.sysSpecification')">
						<view class="bottle-box">
							<view class="item" v-for="(item, index) in sysSpecification" :key="index">
								<view class="tle">{{ item.name }}：</view>
								<input :disabled="isSave" class="input" step="1" :placeholder="$t('security.addCylinderSecurity.numPlaceholder')" type="number"
									v-model="item.num" />
							</view>
						</view>
					</u-form-item>
				</template>

			</edit-form>
		</view>

		<view class="infos" v-show="isSave">
			<description-list :title="$t('security.addCylinderSecurity.baseTle')">
				<description :label="$t('security.addCylinderSecurity.receiveDate')">{{ infos.receiveDate | dayjs }}</description>
				<description :label="$t('security.addCylinderSecurity.vehicleNum')">{{ infos.vehicleNum }}</description>
				<description :label="$t('security.addCylinderSecurity.cylinderNum')">{{ infos.cylinderNum }}</description>
				<description :label="$t('security.addCylinderSecurity.state')">{{ infos.state | state }}</description>
				<description :label="$t('security.addCylinderSecurity.creator')">{{ infos.creator }}</description>
				<description :label="$t('security.addCylinderSecurity.createTime')">{{ infos.createTime | dayjs }}</description>
				<description v-if="infos.safeCylinderNums&&infos.safeCylinderNums.length" :label="$t('security.addCylinderSecurity.sysSpecification')">
					<view class="sku" v-for="item in infos.safeCylinderNums" :key="item.id">
						<text>{{item.modelNumber}}：</text>
						<text class="green">{{item.num}}</text>
					</view>
				</description>
				<description :label="$t('security.addCylinderSecurity.invalidNote')" v-if="infos.state ==2">{{ infos.invalidNote }}</description>
			</description-list>
		</view>

		<view class="btn" v-if="!isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="saveData">
			</u-button>
		</view>

		<view class="btn" v-else>
			<u-button v-permission="{ permission:'app_cylinderSecurityList_delete'}" :text="$t('common.btn.delete')" type="error" hairline shape="circle" v-if="infos.state==2" plain
				@click="handleDelete(infos)">
			</u-button>
			<u-button v-permission="{ permission:'app_cylinderSecurityList_invalid'}" :text="$t('common.btn.toVoid')" @click="handleVoid(infos)" v-if="infos.state==1" type="error"
				hairline shape="circle" plain></u-button>
		</view>

		<!-- 作废 -->
		<u-modal :show="showModal" :title="$t('common.descTle')" :closeOnClickOverlay="true" :showCancelButton="true"
			@cancel="closeModal" @close="closeModal" @confirm="confVoid">
			<view class="modal-main">
				<view>{{$t('common.descTips')}}</view>
				<u-textarea v-model="modalParams.value" maxlength="100" class="modal-text" confirmType="done" :placeholder="$t('common.descPlaceholder')"></u-textarea>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	let that = null
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	import qrcode from "@/utils/reqrcode.js"
	import {
		safeCylinderSaveOrEdit,
		safeCylinderFindById,
		safeCylinderDeleteByIds,
		safeCylinderInvalid
	} from '@/api/lpgSecurityManageApi'
	import {
		UnixToDate
	} from '@/utils/util.js'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				showModal: false,
				modalParams: {},
				isSave: false,
				formDataSource: [{
						type: 'date',
						labelText: this.$t('security.addCylinderSecurity.form.receiveDateStr.label'),
						fieldName: 'receiveDateStr',
						placeholder: this.$t('security.addCylinderSecurity.form.receiveDateStr.placeholder'),
						options: [],
						required: true,
						rules: [{
							required: true,
							message: this.$t('security.addCylinderSecurity.form.receiveDateStr.placeholder'),
							trigger: ['change', 'blur']
						}]
					},
					{
						type: 'number',
						labelText: this.$t('security.addCylinderSecurity.form.cylinderNum.label'),
						fieldName: 'cylinderNum',
						placeholder: this.$t('security.addCylinderSecurity.form.cylinderNum.placeholder'),
						required: true,
						options: this.$t('stockMg.addStockOrder.form.stockFormType.options'),
						rules: [{
							required: true,
							message: this.$t('security.addCylinderSecurity.form.cylinderNum.placeholder'),
							trigger: ['change', 'blur']
						}]
					}
				],
				formDataValue: {},
				infos: {},
			}
		},
		// 过滤器
		filters: {
			state(value) {
				const stateObj = that.$t('security.addCylinderSecurity.stateTxt')
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
			this.editId = options.editId || ''
			await this.getSysSpecificationFindList()
			if (this.editId) {
				this.changeEdit(true)
				uni.setNavigationBarTitle({
					title: this.$t('security.addCylinderSecurity.titleTextEdit')
				});
				await this.getInfo(this.editId)
			} else {
				uni.setNavigationBarTitle({
					title: this.$t('security.addCylinderSecurity.titleText')
				});
			}
		},
		onUnload() {

		},
		onShow() {

		},
		methods: {
			// 作废
			async confVoid() {
				const remarks = this.modalParams.value && this.modalParams.value.replace(/\s*/g, "")
				if (!remarks) {
					this.$refs.uToast.show({
						type: 'error',
						message: this.$t('common.descPlaceholder'),
					})
					return
				}
				const {
					returnValue: res,
					message
				} = await safeCylinderInvalid({
					ids: [this.modalParams.voidData.id],
					invalidNote: remarks || ''
				}).catch(err => {
					this.closeModal()
				})
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					this.getInfo(this.editId)
				}
				this.closeModal()
			},
			closeModal() {
				this.showModal = false
				this.modalParams = {}
			},
			handleVoid(data) {
				this.showModal = true
				this.modalParams.voidData = data
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
			// 删除
			handleDelete(data) {
				uni.showModal({
					title: this.$t('common.tipsTle')[2],
					content: this.$t('common').delTxt(data.id),
					success: async (res) => {
						if (res.confirm) {
							const {
								returnValue: res,
								message
							} = await safeCylinderDeleteByIds({
								ids: [data.id]
							})
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
						}
					}
				});
			},
			// 获取详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await safeCylinderFindById({
					id
				})
				if (res) {
					this.infos = res
					this.formDataValue = {
						receiveDateStr: UnixToDate(res.receiveDate, 'YYYY-MM-DD'),
						cylinderNum: res.cylinderNum.toString(),
					}
					if (res.safeCylinderNums && res.safeCylinderNums.length) {
						res.safeCylinderNums.forEach((item, index) => {
							this.sysSpecification.forEach((val, key) => {
								if (val.value == item.specificationId) {
									val.num = item.num
								}

							})
						})
					}

				}
			},
			// 保存数据
			saveData() {
				this.$refs.dialogForm.handleSubmit(async (data) => {
					const numData = []
					this.sysSpecification.forEach(v => {
						if (v.num) {
							numData.push({
								specificationId: v.value,
								num: v.num
							})
						}
					})
					data.numData = JSON.stringify(numData)
					const {
						returnValue: res,
						message
					} = await safeCylinderSaveOrEdit(data)
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

		.bottle-box {
			width: 100%;

			.item {
				display: flex;
				align-items: center;
				// margin-bottom: 20rpx;
				padding: 15rpx;
				font-size: 28rpx;
				flex-wrap: wrap;
				border-bottom: 1px solid #eee;
				border-left: 1px solid #eee;

				&:last-child {
					margin-bottom: 0;
					border-bottom: none;
				}

				.tle {
					min-width: 120rpx;
					text-align: right;
					padding-right: 0rpx;
					box-sizing: border-box;
					color: rgba(128, 128, 128, 1);

				}

				.input {
					background: rgba(247, 247, 247, 1);
					width: 1px;
					flex: 1;
					height: 52rpx;
					border-radius: 4rpx;
					padding: 0 20rpx;
				}
			}
		}

		.infos {
			background: white;
			border-radius: 20rpx;
			box-shadow: 0px 2rpx 4rpx 0px rgba(0, 0, 0, 0.04);
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
