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
				v-if="info.state===2" 
				:text="$t('common.btn.accept')" 
				type="primary" 
				hairline 
				shape="circle" 
				plain 
				@click="handleAccept">
			</u-button>
			<!-- 拒绝 -->
			<u-button 
				v-if="info.state===2" 
				:text="$t('common.btn.refuse')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleRefuse">
			</u-button>
			<!-- 处理 -->
			<u-button 
				v-if="info.state===3" 
				:text="$t('common.btn.jump')" 
				type="primary" 
				hairline 
				shape="circle" 
				plain 
				@click="handleJump">
			</u-button>
			<!-- 结果 -->
			<u-button 
				v-if="info.state===7" 
				:text="$t('common.btn.result')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleResult">
			</u-button>
		</view>
		<!-- 拒绝 -->
		<u-modal :show="show" :title="$t('userWorkInfo.refuseTitle')" :showCancelButton="true"  @confirm="confirm" @cancel="show = false" @close="show = false">
			<view class="viod-content">
				<u--textarea
					v-model="refuseNote" 
					maxlength="100"
					:placeholder="$t('userWorkInfo.refuseContent')"
					confirmType="done"
				></u--textarea>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
import { auditWorkFindById, auditWorkAcceptWork, auditWorkRefuseWork } from '@/api/lpgManageAppApi.js'
export default {
	data() {
		return {
			info: {},
			show: false,
			refuseNote: ''
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
				title: this.$t('userWorkInfo.acceptTitle'),
				content: this.$t('userWorkInfo.acceptContent'),
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
		},
		// 拒绝
		handleRefuse() {
			this.show = true
			this.refuseNote = ''
		},
		// 拒绝确认
		async confirm() {
			if (!this.refuseNote) {
				uni.$u.toast(this.$t('userWorkInfo.refuseContent'))
				return false
			}
			const { returnValue: res, message } = await auditWorkRefuseWork({ id: this.editId, refuseNote: this.refuseNote })
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
		},
		// 处理
		handleJump() {
			if (this.info.formKey === 'security') {
				// 跳转到安检
			} else if (this.info.formKey === 'rectify') {
				// 跳转到整改
			} else if (this.info.formKey === 'polling') {
				// 巡检
				this.goto('/securityManage/addPatrolCheck/addPatrolCheck',{ editId: this.info.linkId })
			}
		},
		// 结果
		handleResult() {
			// 查看安检 整改 巡检 详情
			if (this.info.formKey === 'security') {
				// 跳转到安检
			} else if (this.info.formKey === 'rectify') {
				// 跳转到整改
			} else if (this.info.formKey === 'polling') {
				// 巡检
				this.goto('/securityManage/addPatrolCheck/addPatrolCheck',{ editId: this.info.linkId })
			}
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
