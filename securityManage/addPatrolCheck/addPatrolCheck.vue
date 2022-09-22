<template>
  <view class="container">
		<view v-if="editId" class="description">
			<description-list>
				<description :label="$t('security.addPatrolCheck.billNo')">{{ info.billNo }}</description>
				<description :label="$t('security.addPatrolCheck.unitOrgName')">{{ info.unitOrgName }}</description>
				<description :label="$t('security.addPatrolCheck.unitName')">{{ info.unitName }}</description>
				<description :label="$t('security.addPatrolCheck.unitTypeName')">{{ info.unitTypeName }}</description>
				<description :label="$t('security.addPatrolCheck.unitAddress')">{{ info.unitAddress }}</description>
				<description :label="$t('security.addPatrolCheck.orgName')">{{ info.orgName }}</description>
				<description :label="$t('security.addPatrolCheck.managerName')">{{ info.managerName }}</description>
				<description :label="$t('security.addPatrolCheck.state')">{{ info.state | state }}</description>
				<description :label="$t('security.addPatrolCheck.form.assetFacilityVos.label')">
					<view v-for="(subItem,indexSub) in assetFacilityVos" :key="indexSub" class="box-case">
						<text>{{ subItem.name }}-{{subItem.typeName}}</text>
					</view>
				</description>
			</description-list>
		</view>
		<edit-form
		  v-else
			ref="dialogForm"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			:form-data-source="formDataSource"
			:form-data-value="formDataValue">
			<template v-slot:other>
				<u-form-item :label="$t('security.addPatrolCheck.form.assetFacilityVos.label')">
					<view v-for="(subItem,indexSub) in assetFacilityVos" :key="indexSub" class="box-case">
						<text>{{ subItem.name }}-{{subItem.typeName}}</text>
					</view>
				</u-form-item>
			</template>
		</edit-form>
		<!-- 风险项 -->
		<view class="customerBox" v-for="item in riskItemVos" :key="item.id">
			<view class="title" @click="item.isShow = !item.isShow">
				<text class="name">{{item.name}}</text>
				<u-icon v-if="item.isShow" name="arrow-down" color="#666666" size="18"></u-icon>
				<u-icon v-else name="arrow-right" color="#666666" size="18"></u-icon>
			</view>
			<view class="content" v-show="item.isShow" v-html="sinceNote(item.content)"></view>
		</view>
		<!-- 风险结果 -->
		<edit-form
			ref="dialogForm1"
			labelWidth="80"
			classForm="normalForm"
			@change="changeForm"
			:form-data-source="formDataSource1"
			:form-data-value="formDataValue1">
			<template v-slot:other>
				<u-form-item v-if="endDecide.includes('2')" :label="$t('security.addPatrolCheck.form.customerSign.label')" :borderBottom="endDecide.includes('3')">
					<view class="singnImg" @click="signCanvas(1)">
						<image class="img" v-if="customerSign" :src="customerSign" mode="widthFix"></image>
						<text v-else class="text">点击签名</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(1)"></u-icon> 
				</u-form-item>
				<u-form-item v-if="endDecide.includes('3')" :label="$t('security.addPatrolCheck.form.managerSign.label')">
					<view class="singnImg" @click="signCanvas(2)">
						<image class="img" v-if="managerSign" :src="managerSign" mode="widthFix"></image>
						<text v-else class="text">点击签名</text>
					</view>
					<u-icon name="arrow-right" color="#666666" size="15" @click="signCanvas(2)"></u-icon> 
				</u-form-item>
			</template>
		</edit-form>
		<view class="btn" v-if="isSave">
			<u-button :text="$t('common.btn.save')" type="primary" hairline shape="circle" @click="submitForm"></u-button>
		</view>
		<view class="btn" v-else>
			<u-button v-if="info.state === 1" v-permission="{ permission:'app_patrolCheckList_edit'}" :text="$t('common.btn.patrolCheck')" type="primary" hairline shape="circle" @click="handleEdit"></u-button>
			<u-button v-permission="{ permission:'app_patrolCheckList_delete'}" :text="$t('common.btn.delete')" type="error" hairline shape="circle" plain @click="handleDelete"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
let that = null
import { riskPollingSaveOrEdit, riskPollingFindById, riskPollingDeleteByIds, riskUnitFindById } from '@/api/lpgSecurityManageApi.js'
import { settingMixin } from '@/common/settingMixin.js'
export default {
	mixins: [settingMixin],
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.patrolCheckList.stateObj')
			return stateObj[value] || ''
		}
	},
  data() {
    return {
			isEdit: false,
			isSave: true,
			editId: '',
			info: {},
			formDataSource: [
				{
					type: 'picker',
					labelText: this.$t('security.addPatrolCheck.form.orgId.label'),
					fieldName: 'orgId',
					placeholder: this.$t('security.addPatrolCheck.form.orgId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addPatrolCheck.form.orgId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addPatrolCheck.form.managerId.label'),
					fieldName: 'managerId',
					placeholder: this.$t('security.addPatrolCheck.form.managerId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addPatrolCheck.form.managerId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'picker',
					labelText: this.$t('security.addPatrolCheck.form.unitId.label'),
					fieldName: 'unitId',
					placeholder: this.$t('security.addPatrolCheck.form.unitId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addPatrolCheck.form.unitId.placeholder'),
							trigger: ['change','blur']
						}
					]
				}
			],
			formDataValue: {},
			riskItemVos: [],
			assetFacilityVos: [],
			endDecide: [],
			formDataSource1: [
				{
					type: 'picker',
					labelText: this.$t('security.addPatrolCheck.form.levelId.label'),
					fieldName: 'levelId',
					placeholder: this.$t('security.addPatrolCheck.form.levelId.placeholder'),
					showOptions: false,
					required: true,
					options: [],
					disabled: false,
					rules: [
						{
							required: true,
							message: this.$t('security.addPatrolCheck.form.levelId.placeholder'),
							trigger: ['change','blur']
						}
					]
				},
				{
					type: 'textarea',
					labelText: this.$t('security.addPatrolCheck.form.remarks.label'),
					fieldName: 'remarks',
					borderBottom: true,
					placeholder: this.$t('security.addPatrolCheck.form.remarks.placeholder'),
					maxlength: 100
				},
				{
					type: 'upload',
					labelText: this.$t('security.addPatrolCheck.form.picture.label'),
					fieldName: 'picture',
					limit: 2,
					show: false,
					defaultValue: []
				}
			],
			formDataValue1: {},
			customerSign: '',
			managerSign: ''
		}
  },
  async onLoad(options) {
		this.editId = options.editId || ''
		await this.init()
		if (this.editId) {
			this.isSave = false
			uni.setNavigationBarTitle({
				title: this.$t('security.addPatrolCheck.titleTextInfo')
			});
			this.formDataSource1.forEach(v=>{
				v.disabled = true
			})
			this.getInfo()
		} else {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addPatrolCheck.titleText')
			});
			this.formDataValue = {
				orgId: this.userInfo.orgId
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
	async created(){
		that = this
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
			// 获取风险单元
			await this.getRiskUnitList()
			this.formDataSource[2].options = this.riskUnitList
			// 获取风险等级
			await this.getRiskLevelList()
			this.formDataSource1[0].options = this.riskLevelList
		},
		// 表单改变
		async changeForm(obj) {
			const queryParams = obj.queryParams
			const name = obj.name // 改变的字段
			if (name === 'unitId' && queryParams.unitId) {
				this.riskUnitChange(queryParams.unitId)
			} else if (name === 'orgId' && queryParams.orgId) {
				// 归属组织变化，查归属成员
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
			}
		},
		// 选择风险单元改变
		async riskUnitChange(unitId) {
			// 查詢风险单元详情
			const { returnValue: res } = await riskUnitFindById({ id: unitId })
			if (res) {
				res.riskItemVos.forEach(v=>{
					v.isShow = true
				})
				this.riskItemVos = res.riskItemVos
				this.assetFacilityVos = res.assetFacilityVos
				this.endDecide = res.endDecide ? res.endDecide.Split(',') : []
				if(this.endDecide.includes('1')) {
					this.formDataSource1[2].show = true
					if(this.endDecide.includes('2') || this.endDecide.includes('3')) {
						this.formDataSource1[2].borderBottom = true
					} else {
						this.formDataSource1[2].borderBottom = false
					}
				} else {
					this.formDataSource1[2].show = false
				}
			}
		},
		// 详情
    async getInfo() {
			const { returnValue: res } = await riskPollingFindById({ id: this.editId })
      if (res) {
				this.managerSign = res.managerSign
				this.customerSign = res.customerSign
				res.picture = this.$options.filters.pictureConversion(res.picture)
				this.formDataValue = res
				this.formDataValue1 = res
				this.info = res
				// 获取风险单元详情
				await this.riskUnitChange(res.unitId)
      }
    },
    // 提交
    submitForm() {
			if(this.editId) {
				// 编辑
				this.$refs.dialogForm1.handleSubmit(async(parma) => {
					const obj = parma
					obj.orgId = this.info.orgId
					obj.unitId = this.info.unitId
					obj.managerId = this.info.managerId
					this.handleSave(obj)
				})
			} else {
				// 添加
				this.$refs.dialogForm.handleSubmit(async(data) => {
					this.$refs.dialogForm1.handleSubmit(async(parma) => {
						const obj = Object.assign(data,parma)
						this.handleSave(obj)
					})
				})
			}
    },
		// 保存
		async handleSave(obj) {
			obj.id = this.editId || ''
			obj.managerSign = this.managerSign
			obj.customerSign = this.customerSign
			obj.picture = this.$options.filters.isArrayToString(obj.picture)
			if (obj.levelId) {
				const findIndex = this.riskLevelList.findIndex(item => item.value === obj.levelId)
				obj.levelName = this.riskLevelList[findIndex].name
			}
			const { returnValue: res, message } = await riskPollingSaveOrEdit(obj)
			if (res) {
				this.$refs.uToast.show({
					type: 'success',
					message: message,
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 2000)
			}
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.billNo),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await riskPollingDeleteByIds({ ids: [this.editId] })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							setTimeout(() => {
							  uni.navigateBack({
							    delta: 1
							  })
							}, 2000)
						}
					}
				}
			})
		},
		// 编辑
		handleEdit() {
			this.isSave = true
			uni.setNavigationBarTitle({
				title: this.$t('security.addPatrolCheck.titleTextEdit')
			});
			this.formDataSource1.forEach(v=>{
				v.disabled = false
			})
			this.$refs.dialogForm1.resetPicker('levelId', [0], [0])
		},
		// 签名
		signCanvas(type) {
			if(this.isSave) {
				this.goto('/securityManage/signCanvas/signCanvas',{ type: type })
			}
		}
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
::v-deep .u-form-item .u-line{
	border-bottom: 1rpx solid rgba(229, 229, 229, 1) !important;
}
.box-case{
	@include flexMixin(row,flex-start);
	background: #E8E8E8;
	font-size: 28rpx;
	font-weight: 400;
	color: rgba(56, 56, 56, 1);
	display: inline-flex;
	padding: 8rpx 20rpx;
	border-radius: 28rpx;
	margin: 10rpx 20rpx 10rpx 0rpx;
	line-height: 40rpx;
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
.customerBox .title .name{
	font-size: 34rpx;
	line-height: 40rpx;
	padding: 20rpx 0rpx;
}
.customerBox .content{
	font-size: 32rpx;
	font-weight: 400;
	color: rgba(128, 128, 128, 1);
	padding: 20rpx;
}
.singnImg{
	flex: 1;
	.img{
		width: 200rpx;
	}
	.text{
		color: rgba(166, 166, 166, 1);
	}
}
.description{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	margin: 30rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
}
</style>
