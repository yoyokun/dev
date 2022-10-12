<template>
  <view class="container">
		<!-- 安检详情 -->
		<view class="description">
			<description-list>
				<description :label="$t('security.securityCheckInfo.customerNo')">{{ userCustomerVo.customerNo }}</description>
				<description :label="$t('security.securityCheckInfo.customerName')">{{ userCustomerVo.customerName }}</description>
				<description :label="$t('security.securityCheckInfo.phone')">{{ userCustomerVo.phone }}</description>
				<description :label="$t('security.securityCheckInfo.address')">{{ address }}</description>
				<description v-if="editId" :label="$t('security.addRectification.securityNo')">{{ info.securityNo }}</description>
				<description v-else :label="$t('security.addRectification.securityNo')">{{ info.billNo }}</description>
				<description :label="$t('security.addRectification.checkTime')">{{ info.checkTime | dayjs }}</description>
			</description-list>
		</view>
		<edit-form
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue">
		</edit-form>
		<!-- 安检项目 -->
		<security-check
			v-if="safeSecurityResultNot.length && state === 2"
			ref="securityCheck"
			:safe-security-result-not="safeSecurityResultNot"
			:isSafeSecurity="false"
			:isResult="settle"
			:disabled="settle"
		/>
		<!-- 整改结果 -->
		<edit-form
			v-if="state === 2"
			ref="dialogForm1"
			labelWidth="80"
			classForm="normalForm"
			:form-data-source="formDataSource1"
			:form-data-value="formDataValue1">
			<template v-slot:other>
				<u-form-item v-if="endDecide.includes('2')" :label="$t('security.addRectification.form.customerSign.label')" :borderBottom="endDecide.includes('3')">
					<view class="singnImg">
						<view class='sigin' @click="signCanvas(1)">
							<image class="img" v-if="customerSign" :src="customerSign" mode="widthFix"></image>
							<text v-else class="text">{{$t('security.addPatrolCheck.sigin')}}</text>
						</view>
						<u-checkbox-group>
							<u-checkbox :disabled="settle" :checked="customerSignRefuse" @change="customerSignRefuse = !customerSignRefuse" :label="$t('security.addRectification.form.customerSignRefuse.label')"></u-checkbox>
						</u-checkbox-group>
					</view>
					<u-icon v-if="!settle" name="arrow-right" color="#666666" size="15" @click="signCanvas(1)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="endDecide.includes('3')" :label="$t('security.addRectification.form.managerSign.label')" :borderBottom="false">
					<view class="singnImg" @click="signCanvas(2)">
						<image class="img" v-if="managerSign" :src="managerSign" mode="widthFix"></image>
						<text v-else class="text">{{$t('security.addPatrolCheck.sigin')}}</text>
					</view>
					<u-icon v-if="!settle" name="arrow-right" color="#666666" size="15" @click="signCanvas(2)"></u-icon> 
				</u-form-item>
			</template>
		</edit-form>
		<!-- 整改商品数据 -->
		<add-shop v-if="state === 2" ref="addShop" :shop-data="shopData" @changeTable="changeTable"/>
		<!-- 结算 -->
		<view class="settlement" v-if="state === 2">
			<settlement
				ref="settlement"
				:total-money-all="totalMoneyAll"
				:onlineShow="false"
				:pay-data="payData"
				:requestParameters="requestParameters"
			/>
		</view>
		<view class="btn" v-if="isSave">
			<u-button v-if="!settle" :text="$t('common.btn.rectification')" type="primary" hairline shape="circle" @click="submitForm(1)"></u-button>
			<u-button :text="$t('common.btn.settle')" type="primary" hairline shape="circle" plain @click="submitForm(2)"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { safeSecurityFindById, safeRectifySaveOrEdit, safeRectifyFindById, safeRectifySettlement } from '@/api/lpgSecurityManageApi.js'
import { settingMixin } from '@/common/settingMixin.js'
import SecurityCheck from '@/securityManage/addSecurityCheck/common/securityCheck.vue'
import AddShop from '@/securityManage/addRectification/common/addShop.vue'
import Settlement from '@/salesManage/placeOrder/common/settlement.vue'
export default {
	components: {
		SecurityCheck,
		AddShop,
		Settlement
	},
	mixins: [settingMixin],
	data() {
		return {
			securityId: '',// 安检id
			editId: '', // 整改数据id
			settle: false, // 是否结算
			isSave: true,
			formDataSource: [
				{
					type: 'picker',
					labelText: this.$t('security.addRectification.form.orgId.label'),
					fieldName: 'orgId',
					placeholder: this.$t('security.addRectification.form.orgId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addRectification.form.orgId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addRectification.form.managerId.label'),
					fieldName: 'managerId',
					placeholder: this.$t('security.addRectification.form.managerId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addRectification.form.managerId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'actionSheet',
					labelText: this.$t('security.addRectification.form.state.label'),
					fieldName: 'state',
					placeholder: this.$t('security.addRectification.form.state.placeholder'),
					showOptions: false,
					required: true,
					options: this.$t('security.addRectification.form.state.options'),
					disabled: false,
					borderBottom: false,
					rules: [
						{
							required: true,
							type: 'number',
							message: this.$t('security.addRectification.form.state.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addRectification.form.refuseNote.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addRectification.form.refuseNote.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addRectification.form.refuseNote.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addRectification.form.refuseNote1.label'),
					fieldName: 'refuseNote',
					placeholder: this.$t('security.addRectification.form.refuseNote1.placeholder'),
					maxlength: 100,
					show: false,
					borderBottom: false,
					required: true,
					rules: [
						{
							required: true,
							message: this.$t('security.addRectification.form.refuseNote1.placeholder'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {},
			orgId: '', // 组织id
			state: 2, // 状态 2 正常整改 3 无法整改 5拒绝整改
			formDataSource1: [
				{
					type: 'textarea',
					labelText: this.$t('security.addRectification.form.remarks.label'),
					fieldName: 'remarks',
					borderBottom: true,
					placeholder: this.$t('security.addRectification.form.remarks.placeholder'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('security.addRectification.form.picture.label'),
					fieldName: 'picture',
					limit: 2,
					borderBottom: true,
					show: false,
					defaultValue: []
				}
			],
			formDataValue1: {},
			customerSign: '',
			managerSign: '',
			customerSignRefuse: false,
			endDecide: [],
			userCustomerVo: {},// 客户详情
			address: '', // 地址信息
			info: {}, // 安检详情
			safeSecurityResultNot: [], // 整改项目
			shopData: [], // 商品信息回填
			totalMoneyAll: '', // 总金额
			shopObj: {} ,// 填写的商品信息
			payData: [] ,// 支付信息回填
			requestParameters: {
				type: 1
			}
		}
	},
	async onLoad(options) {
		this.securityId = options.securityId || ''
		this.editId = options.editId || ''
		this.settle = options.settle || false
		await this.init()
		if (this.editId) {
			// 编辑
			this.getInfo(this.editId)
			this.handleEdit()
		} else if (this.securityId) {
			// 获取安检详情
			this.getSecurityInfo(this.securityId)
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addRectification.titleText')
			});
			this.formDataValue = {
				orgId: this.userInfo.orgId,
				managerId: this.userInfo.id,
				state: 2
			}
		}
	},
	onShow() {
		// 添加监听事件
		uni.$once('saveSignCanvas', (data) => {
			if(data.type === '1') {
				this.customerSign = data.url
			} else if(data.type === '2') {
				this.managerSign = data.url
			}
		})
	},
	onUnload() {
		uni.$off('saveSignCanvas')
	},
	methods: {
		// 初始化
		async init() {
			// 获取应用组织
			await this.getOrgList()
			this.formDataSource[0].options = this.orgList
			// 查归属成员
			await this.getManagerFindList({ orgId: this.userInfo.orgId })
			this.formDataSource[1].options = this.managerList
		},
		 // 查询安检详情
		async getSecurityInfo(id) {
			const { returnValue: res } = await safeSecurityFindById({ id })
			if (res) {
				this.userCustomerVo = res.userCustomerVo
				this.address = this.$options.filters.addressSplicing(res.userCustomerVo.userAddress)
				this.info = res
				this.endDecide = res.endDecideRectify ? res.endDecideRectify.Split(',') : []
				this.safeSecurityResultNot = res.safeSecurityResultNot
				if(this.endDecide.includes('1')) {
					this.formDataSource1[0].borderBottom = true
					this.formDataSource1[1].show = true
					if(this.endDecide.includes('2') || this.endDecide.includes('3')) {
						this.formDataSource1[1].borderBottom = true
					} else {
						this.formDataSource1[1].borderBottom = false
					}
				} else {
					this.formDataSource1[1].show = false
				}
				if(this.endDecide.length === 0) {
					this.formDataSource1[0].borderBottom = false
				}
			}
		},
		// 查询整改详情
		async getInfo(id) {
			const { returnValue: res } = await safeRectifyFindById({ id })
			if (res) {
				this.userCustomerVo = res.userCustomerVo
				this.address = this.$options.filters.addressSplicing(res.userCustomerVo.userAddress)
				res.picture = this.$options.filters.pictureJsonParse(res.picture)
				this.info = res
				this.securityId = res.securityId
				this.managerSign = res.managerSign
				this.customerSign = res.customerSign
				this.customerSignRefuse = res.customerSignRefuse === 1
				this.endDecide = res.endDecideRectify ? res.endDecideRectify.Split(',') : []
				if(this.endDecide.includes('1')) {
					this.formDataSource1[0].borderBottom = true
					this.formDataSource1[1].show = true
					if(this.endDecide.includes('2') || this.endDecide.includes('3')) {
						this.formDataSource1[1].borderBottom = true
					} else {
						this.formDataSource1[1].borderBottom = false
					}
				} else {
					this.formDataSource1[1].show = false
				}
				if(this.endDecide.length === 0) {
					this.formDataSource1[0].borderBottom = false
				}
				this.safeSecurityResultNot = res.safeSecurityResultNot
				this.payData = res.safeRectifyPays
				this.shopData = res.safeRectifyGoods
				this.totalMoneyAll = res.totalMoney
				// 未整改
				if(res.state === 1) {
					res.state = 2
				}
				this.state = res.state
				this.formDataValue = res
				this.formDataValue1 = res
			}
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			this.state = queryParams.state
			if (name === 'orgId' && queryParams.orgId) {
				// 组织变化，查归属成员
				await this.getManagerFindList({ orgId: queryParams.orgId })
				this.formDataSource[1].options = this.managerList
				if (queryParams.orgId === this.userInfo.orgId) {
					// 默认归属成员
					queryParams.managerId = this.userInfo.id
				} else {
					// 重置归属成员
					queryParams.managerId = ''
				}
				this.formDataValue = queryParams
			} else if(name === 'templateId' && queryParams.templateId) {
				this.templateChange(queryParams.templateId)
			} else if(name === 'state' && queryParams.state) {
				if(queryParams.state === 2) {
					// 正常安检
					this.formDataSource[2].borderBottom = false
					this.formDataSource[3].show = false
					this.formDataSource[4].show = false
				} else if(queryParams.state === 3) {
					// 无法安检
					this.formDataSource[2].borderBottom = true
					this.formDataSource[3].show = true
					this.formDataSource[4].show = false
				} else if(queryParams.state === 5) {
					// 客户拒检
					this.formDataSource[2].borderBottom = true
					this.formDataSource[3].show = false
					this.formDataSource[4].show = true
				}
			}
		},
		// 提交
		submitForm(payState) {
			if(this.state === 2) {
				// 正常整改
				this.$refs.dialogForm.handleSubmit(async(data) => {
					this.$refs.dialogForm1.handleSubmit(async(parma) => {
						const securityResultData = this.$refs.securityCheck.getSecurity()
						const shop = this.$refs.addShop.getShop()
						const obj = Object.assign(data,parma,{ securityResultData: JSON.stringify(securityResultData) })
						// 商品信息
						obj.rectifyGoodsData = []
						obj.rectifyPaysData = [] // 支付
						if(shop.data.length){
							// 有商品数据
							obj.rectifyGoodsData = shop.data
							const paymentObj = this.$refs.settlement.getSettlement()
							if (payState === 2) {
								// 结算必传 rectifyPaysData
								if (paymentObj.residue !== 0) {
									this.$refs.uToast.show({
										type: 'error',
										message: this.$t('security.addRectification.residue'),
									})
									return false
								}
							}
							paymentObj.payType.forEach(v => {
								obj.rectifyPaysData.push({
									collectionTypeName: v.name,
									payMoney: v.value,
									id: v.id,
									collectionTypeId: v.collectionTypeId,
									payType: v.payType
								})
							})
						}
						obj.rectifyGoodsData = JSON.stringify(obj.rectifyGoodsData)
						obj.rectifyPaysData = JSON.stringify(obj.rectifyPaysData)
						this.handleSave(obj,payState)
					})
				})
			} else {
				// 无法整改 拒绝整改
				this.$refs.dialogForm.handleSubmit(async(parma) => {
					this.handleSave(parma)
				})
			}
		},
		// 保存
		async handleSave(obj,payState) {
			obj.id = this.editId || ''
			obj.securityId = this.securityId
			obj.customerId = this.info.customerId
			obj.managerSign = this.managerSign
			obj.customerSign = this.customerSign
			obj.picture = this.$options.filters.isArrayToString(obj.picture)
			obj.customerSignRefuse = this.customerSignRefuse === true ? 1 : 2 // 客户拒签
			obj.payState = payState // 支付状态
			if (this.settle) {
				// 从列表结算
				const { returnValue: res, message } = await safeRectifySettlement({
					rectifyPaysData: obj.rectifyPaysData,
					rectifyGoodsData: obj.rectifyGoodsData,
					id: obj.id
				})
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					uni.$emit('updateInfo', true)
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				}
			} else {
				const { returnValue: res, message } = await safeRectifySaveOrEdit(obj,this.$t('security.addSecurityCheck.saveTit'))
				if (res) {
					this.$refs.uToast.show({
						type: 'success',
						message: message,
					})
					uni.$emit('updateInfo', true)
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				}
			}
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addRectification.titleTextEdit')
			});
			if(this.settle) {
				// 结算
				this.formDataSource.forEach((v,i) => {
					v.disabled = true
				})
				this.formDataSource1.forEach((v,i) => {
					v.disabled = true
				})
			}
		},
		// 签名
		signCanvas(type) {
			if(this.isSave && !this.settle) {
				this.goto('/securityManage/signCanvas/signCanvas',{ type: type })
			}
		},
		// table改变
		changeTable() {
			const obj = this.$refs.addShop.getShop()
			this.totalMoneyAll = obj.totalMoney
			this.shopObj = obj
		}
	}
}
</script>

<style lang="scss" scoped>
.description{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	margin: 30rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
}
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
}
::v-deep .normalForm{
	margin: 20rpx 20rpx;
	.u-form{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		width: 710rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
	}
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin(column);
	.u-button{
		margin: 20rpx 10rpx;
	}
}
.singnImg{
	flex: 1;
	@include flexMixin();
	.sigin{
		flex: 1;
	}
	.img{
		width: 200rpx;
	}
	.text{
		color: rgba(166, 166, 166, 1);
	}
}
.settlement{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	width: 710rpx;
	padding: 10rpx 10rpx;
	box-sizing: border-box;
	margin-top: 20rpx;
}
::v-deep .block-box .item:last-child{
	border: none;
}
</style>
