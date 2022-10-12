<template>
	<view class="list-part">
		<view class="tab">
			<u-tabs 
				:scrollable="false" 
				:list="tabSwitch" 
				:current="current"
				@click="onTabSwitch"
				lineWidth="60"
				lineColor="#2A82E4"
				:activeStyle="{
					color: '#2A82E4',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#383838',
					transform: 'scale(1)'
				}"
				itemStyle="height: 45px;padding: 0 4px;"
			></u-tabs>
		</view>
		<!-- 安检信息 -->
		<view class="detail" v-if="current === 0">
			<view class="description">
				<description-list>
					<description :label="$t('security.securityCheckInfo.customerName')">{{ userCustomerVo.customerName }}</description>
					<description :label="$t('security.securityCheckInfo.classify')">{{ userCustomerVo.classify | classify }}</description>
					<description :label="$t('security.securityCheckInfo.phone')">{{ userCustomerVo.phone }}</description>
					<description :label="$t('security.securityCheckInfo.address')">{{ address }}</description>
					<description :label="$t('security.securityCheckInfo.orgName')">{{ info.orgName }}</description>
					<description :label="$t('security.securityCheckInfo.templateName')">{{ info.templateName }}</description>
					<description :label="$t('security.securityCheckInfo.managerName')">{{ info.managerName }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.levelName')">{{ info.levelName }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.location')">{{ info.location }}</description>
					<description :label="$t('security.securityCheckInfo.state')">{{ info.state | state }}</description>
					<description :label="$t('security.securityCheckInfo.endTime')">{{ info.endTime | dayjs }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.result')">{{ info.result | result }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.rectifyState')">{{ info.rectifyState | rectifyState }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.checkTime')">{{ info.checkTime | dayjs }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.customerSignRefuse')">{{ info.customerSignRefuse | customerSignRefuse }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.customerSign')">
						<image class="img" v-if="info.customerSign" :src="info.customerSign" mode="widthFix"></image>
					</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.managerSign')">
						<image class="img" v-if="info.managerSign" :src="info.managerSign" mode="widthFix"></image>
					</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.codeKeys')">{{ info.codeKeys }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.cylinderNum')">{{ info.cylinderNum }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.remarks')">{{ info.remarks }}</description>
					<description v-if="info.state === 2" :label="$t('security.securityCheckInfo.picture')">
						<image class="picture" v-for="item in info.picture" :key="item.id" :src="item.url" mode="widthFix"></image>
					</description>
				</description-list>
			</view>
			<!-- 安检项目 -->
			<security-check
				v-if="safeSecurityResultVo && info.state === 2"
				ref="securityCheck"
				:safe-template-item-vo="safeSecurityResultVo"
				:disabled="true"
				:isResult="true"
			/>
			<!-- 按钮 -->
			<view class="btn">
				<!-- 去安检 -->
				<u-button 
					v-if="info.state === 1" 
					v-permission="{ permission:'app_securityCheckList_check'}" 
					:text="$t('common.btn.check')" 
					type="primary" 
					hairline 
					shape="circle" 
					@click="handleEdit"></u-button>
				<!-- 删除 -->
				<u-button 
					v-permission="{ permission:'app_securityCheckList_delete'}" 
					:text="$t('common.btn.delete')" 
					type="error" 
					hairline 
					shape="circle" 
					plain 
					@click="handleDelete"></u-button>
				<!-- 工单 -->
				<u-button 
					v-if="info.result === 2 && info.rectifyState === 1"
					v-permission="{ permission:'app_securityCheckList_rectificationWorkOrder'}" 
					:text="$t('common.btn.work')" 
					type="primary" 
					hairline 
					shape="circle" 
					@click="handleWork"></u-button>
				<!-- 整改 -->
				<u-button 
					v-if="info.result === 2 || info.rectifyState === 1"
					v-permission="{ permission:'app_securityCheckList_rectification'}" 
					:text="$t('common.btn.rectify')" 
					type="primary" 
					hairline 
					shape="circle" 
					plain
					@click="handleRectify"></u-button>
			</view>
		</view>
		<!-- 整改信息 -->
		<view class="detail" v-else>
			
		</view>
	</view>
</template>

<script>
let that = null
import { safeSecurityFindById, safeSecurityDeleteByIds } from '@/api/lpgSecurityManageApi.js'
import SecurityCheck from '@/securityManage/addSecurityCheck/common/securityCheck.vue'
export default {
	components: {
		SecurityCheck
	},
	data() {
		return {
			editId: '',
			tabSwitch: this.$t('security.securityCheckInfo.tabSwitch'),
			current: 0,
			info: {},
			userCustomerVo: {},
			address: '',
			safeSecurityResultVo: {}
		}
	},
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.securityCheckInfo.stateObj')
			return stateObj[value] || ''
		},
		classify(value) {
			const stateObj = that.$t('security.securityCheckInfo.classifyObj')
			return stateObj[value] || ''
		},
		result(value) {
			const stateObj = that.$t('security.securityCheckInfo.resultObj')
			return stateObj[value] || ''
		},
		rectifyState(value) {
			const stateObj = that.$t('security.securityCheckInfo.rectifyStateObj')
			return stateObj[value] || ''
		},
		payState(value) {
			const stateObj = that.$t('security.securityCheckInfo.payStateObj')
			return stateObj[value] || ''
		},
		stateRec(value) {
			const stateObj = that.$t('security.securityCheckInfo.stateRecObj')
			return stateObj[value] || ''
		},
		customerSignRefuse(value) {
			const stateObj = that.$t('security.securityCheckInfo.customerSignRefuseObj')
			return stateObj[value] || ''
		}
	},
	created(){
		that = this
	},
	async onLoad(options) {
		this.editId = options.editId || ''
		if (this.editId) {
			uni.setNavigationBarTitle({
				title: this.$t('security.securityCheckInfo.titleTextInfo')
			});
			this.getInfo()
		}
	},
	onShow() {
		uni.$once('updateInfo',(data) => {
			if(data && this.editId) {
				this.getInfo()
			}
		})
	},
	onUnload() {
		uni.$off('updateInfo')
	},
	methods: { 
		// 详情
		async getInfo() {
			const { returnValue: res } = await safeSecurityFindById({ id: this.editId })
			if (res) {
				res.codeKeys = []
				res.safeSecurityCodes.forEach((v) => {
					res.codeKeys.push(v.codeKey)
				})
				res.codeKeys = res.codeKeys.join(',')
				res.picture = this.$options.filters.pictureConversion(res.picture)
				this.userCustomerVo = res.userCustomerVo
				this.address = this.$options.filters.addressSplicing(res.userCustomerVo.userAddress)
				this.info = res
				this.safeSecurityResultVo = res.safeSecurityResultVo
			}
		},
		// 切换
		onTabSwitch(item) {
			this.current = item.index
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.billNo),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await safeSecurityDeleteByIds({ ids: [this.editId] })
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
		// 安检
		handleEdit() {
			this.goto('/securityManage/addSecurityCheck/addSecurityCheck',{ editId: this.editId })
		},
		// 工单
		handleWork() {
			this.goto('/infoManage/addWork/addWork',{ customerId: this.info.customerId, isSafeSecurity: 1, editId: this.editId })
		},
		// 整改
		handleRectify() {
			this.goto('/securityManage/addRectification/addRectification',{ securityId: this.editId })
		}
	}
}
</script>

<style lang="scss" scoped>
.detail{
	padding-top: 86rpx;
	margin-bottom: 20rpx;
}
.description{
	background: rgba(255, 255, 255, 1);
	box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
	border-radius: 16rpx;
	margin: 30rpx 20rpx 10rpx 20rpx;
	width: 710rpx;
}
.img{
	width: 100%;
}
.picture{
	width: 100rpx;
	margin-right: 10rpx;
	margin-top: 10rpx;
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin(column);
	.u-button{
		margin: 20rpx 10rpx;
	}
}
</style>
