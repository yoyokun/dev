<template>
	<view class="sk-info">
		<view class="form">
			<edit-form ref="dialogForm" labelWidth="80" classForm="normalForm" :form-data-source="formDataSource"
				:form-data-value="formDataValue" @change="changeForm">
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
								{{$t('cylinderMg.addCirculation.btn.conf')}}</u-button>
						</view>
					</u-form-item>
				</template>
			</edit-form>
		</view>
		<view class="table">
			<us-table :table-column="tableColumn" :table-data="tableData"></us-table>
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
		cylinderFlowScanCodeByType,
		sysOrgFindById
	} from '@/api/lpgManageAppApi'
	export default {
		mixins: [settingMixin],
		props: {

		},
		data() {
			return {
				formDataSource: [{
					type: 'picker',
					labelText: this.$t('cylinderMg.addCirculation.form.holderId.label'),
					fieldName: 'holderId',
					placeholder: this.$t('cylinderMg.addCirculation.form.holderId.placeholder'),
					options: [],
					required: true,
					rules: [{
						required: true,
						message: this.$t('cylinderMg.addCirculation.form.holderId.placeholder'),
						trigger: ['change', 'blur']
					}]
				}],
				codeKey: '',
				nodeType: 'filling',
				cylinderId: null,
				holderType: 1,
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
				title: this.$t('cylinderMg.addCirculationFill.titleText')
			});
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			this.$set(this.formDataValue, 'holderId', this.userInfo.orgId)
			await this.getHolderInfo(this.formDataValue.holderId)
		},
		onUnload() {

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
					}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
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
				const code = await this.decodeQr()
				if(code){
					this.searchCode(code)
				}
			},
			// 保存数据
			async saveData() {
				let params = {
					nodeType: this.nodeType, // 流转环节
					holderType: this.holderType, // 持有人类型，1组织，2客户，3车辆，4供应商/检测厂 5，成员
					holderId: this.formDataValue.holderId, // 持有人ID
					holderName: this.holderName, // 持有人名称
					holderNo: this.holderNo, // 持有人编号
					cylinderId: this.cylinderId // 钢瓶ID
				}
				const {
					returnValue: res,
					message
				} = await cylinderFlowScanCodeByType(params, this.$t('cylinderMg.addCirculation.loadTxt.saving'))
				if (res) {
					this.tableData.push(res)
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
				}
			},
			async getHolderInfo(id) {
				const {
					returnValue: res
				} = await sysOrgFindById({
					id: id
				})
				if (res) {
					this.holderName = res.name // 持有人名称
					this.holderNo = res.orgNo // 持有人编号
				}
			},
			// 表单
			async changeForm(e) {
				let params = e.queryParams
				if (e.name == 'holderId' && params.holderId) {
					this.getHolderInfo(params.holderId)
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

		.table {
			margin-top: 30rpx;
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
