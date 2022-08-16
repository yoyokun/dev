<template>
	<view class="container">
		<view class="userWorkInfo">
			<description-list>
				<description :label="$t('addWork.form.formKey')">{{ info.formName }}</description>
				<description v-if="info.formKey === 'polling'" :label="$t('addWork.form.unitId')">{{ info.customerName }}</description>
				<description v-else :label="$t('addWork.form.customerId')">{{ info.customerName }}</description>
				<description :label="$t('addWork.form.actionTimeStr')">{{ info.actionTime | dayjs }}</description>
				<description :label="$t('addWork.form.cutoff')">{{ info.cutoff }}</description>
				<description :label="$t('addWork.form.makeTimeStr')">{{ info.makeTime | dayjs }}</description>
				<description :label="$t('addWork.form.levelId')">{{ info.levelName }}</description>
				<description :label="$t('addWork.form.toOrgId')">{{ info.toOrgName }}</description>
				<description :label="$t('addWork.form.toManagerId')">{{ info.toManagerName }}</description>
				<description :label="$t('addWork.form.remarks')"><view>{{ info.remarks }}</view></description>
			</description-list>
		</view>
		<view class="btn">
			<!-- 接受 -->
			<u-button 
				v-if="info.state===2 && info.toManagerId === userInfo.id" 
				:text="$t('userWorkInfo.accept')" 
				type="primary" 
				hairline 
				shape="circle" 
				plain 
				@click="handleAccept">
			</u-button>
			<!-- 拒绝 -->
			<u-button 
				v-if="info.state===2 && info.toManagerId === userInfo.id" 
				:text="$t('userWorkInfo.refuse')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleRefuse">
			</u-button>
			<!-- 处理 -->
			<u-button 
				v-if="info.state===3 && info.toManagerId === userInfo.id" 
				:text="$t('userWorkInfo.jump')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleJump">
			</u-button>
		</view>
	</view>
</template>

<script>
import { auditWorkFindById } from '@/api/lpgManageAppApi.js'
export default {
	data() {
		return {
			info: {}
		}
	},
	async onLoad(options) {
		this.editId = options.editId || ''
		if (this.editId) {
			this.getInfo()
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('userWorkInfo.titleText')
		});
	},
	methods: {
		// 详情
		async getInfo() {
			const { returnValue: res } = await auditWorkFindById({ id: this.editId })
			if (res) {
				this.info = res
			}
		},
		// 接受
		handleAccept(){
			uni.showModal({
				title: this.$t('userWorkList.acceptTitle'),
				content: this.$t('userWorkList.acceptContent'),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await auditWorkAcceptWork({ id: this.editId, formKey: this.info.formKey })
						if(res){
							this.$refs.uToast.show({
								type: 'success',
								message: message,
							})
							if (this.info.formKey === 'security' || this.info.formKey === 'rectify' || this.info.formKey === 'polling') {
								// 跳转到安检 整改 巡检
								
							} else {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 2000)
							}
						}
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	padding: 30rpx;
}
.btn{
	width: 632rpx;
	margin: 60rpx auto;
	@include flexMixin();
	.u-button{
		margin: 0rpx 10rpx;
	}
}
.userWorkInfo {
	width: 100%;
	background: white;
	border-radius: 16rpx;
	box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.15);
	::v-deep .basic-box .item{
		line-height: 80rpx;
	}
}
</style>
