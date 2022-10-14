<template>
	<view class="list-part">
		<!-- 整改信息 -->
		<view class="description">
			<description-list>
				<description :label="$t('security.rectificationInfo.billNo')">{{ info.billNo }}</description>
				<description :label="$t('security.rectificationInfo.state')">{{ info.state | state }}</description>
				<description :label="$t('security.rectificationInfo.orgName')">{{ info.orgName }}</description>
				<description :label="$t('security.rectificationInfo.managerName')">{{ info.managerName }}</description>
				<description :label="$t('security.rectificationInfo.customerNo')">{{ userCustomerVo.customerNo }}</description>
				<description :label="$t('security.rectificationInfo.customerName')">{{ userCustomerVo.customerName }}</description>
				<description :label="$t('security.rectificationInfo.phone')">{{ userCustomerVo.phone }}</description>
				<description :label="$t('security.rectificationInfo.address')">{{ address }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.payState')">{{ info.payState | payState }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.totalMoney')">{{ info.totalMoney }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.rectifyTime')">{{ info.rectifyTime | dayjs }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.safeRectifyPaysName')">{{ info.safeRectifyPaysName }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.remarks')">{{ info.remarks }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.customerSignRefuse')">{{ info.customerSignRefuse | customerSignRefuse }}</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.customerSign')">
					<image class="img" v-if="info.customerSign" :src="info.customerSign" mode="widthFix"></image>
				</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.managerSign')">
					<image class="img" v-if="info.managerSign" :src="info.managerSign" mode="widthFix"></image>
				</description>
				<description v-if="info.state === 2" :label="$t('security.rectificationInfo.picture')">
					<image class="picture" v-for="item in info.picture" :key="item.id" :src="item.url" mode="widthFix"></image>
				</description>
			</description-list>
		</view>
		<!-- 整改前整改后项目 -->
		<security-info
			v-if="safeSecurityResultVo.length"
			:state="info.state" 
			:safe-security-result-not="safeSecurityResultVo"
		></security-info>
		<view class="customerBox">
			<view class="title">
				<text class="name">{{$t('security.rectificationInfo.shopInfo')}}</text>
			</view>
			<view class="content">
				<us-table 
					:table-column="tableColumn"
					:table-data="tableData"></us-table>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn">
			<!-- 去整改 -->
			<u-button 
				v-if="info.state === 1" 
				v-permission="{ permission:'app_rectification_rectify'}" 
				:text="$t('common.btn.rectification')" 
				type="primary" 
				hairline 
				shape="circle" 
				@click="handleEdit"></u-button>
			<!-- 删除 -->
			<u-button 
				v-if="info.state === 4" 
				v-permission="{ permission:'app_rectification_delete'}" 
				:text="$t('common.btn.delete')" 
				type="error" 
				hairline 
				shape="circle" 
				plain 
				@click="handleDelete"></u-button>
			<!-- 作废 -->
			<u-button 
				v-if="info.state === 1 || info.state === 2 || info.state === 3 || info.state === 6"
				v-permission="{ permission:'app_rectification_void'}" 
				:text="$t('common.btn.toVoid')" 
				type="error" 
				hairline 
				shape="circle" 
				@click="handleVoid"></u-button>
			<!-- 结算 -->
			<u-button 
				v-if="info.state === 2 && info.payState === 1"
				v-permission="{ permission:'app_rectification_settle'}" 
				:text="$t('common.btn.settle')" 
				type="primary" 
				hairline 
				shape="circle" 
				@click="handleSettle"></u-button>
		</view>
		<!-- 作废 -->
		<u-modal :show="show" :title="$t('common.descTle')" :closeOnClickOverlay="true"
			:asyncClose="true" :showCancelButton="true" @confirm="confirm" @cancel="closeModal" @close="closeModal">
			<view class="modal-main">
				<view>{{$t('common.descTips')}}</view>
				<u-textarea v-model="invalidNote" maxlength="100" class="modal-text" confirmType="done"
					:placeholder="$t('common.descPlaceholder')"></u-textarea>
			</view>
		</u-modal>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
let that = null
import { safeRectifyFindById, safeRectifyDeleteByIds, safeRectifyInvalidByIds } from '@/api/lpgSecurityManageApi.js'
import SecurityInfo from '@/securityManage/rectificationInfo/common/securityInfo.vue'
export default {
	components: {
		SecurityInfo
	},
	data() {
		return {
			editId: '',
			info: {},
			userCustomerVo: {},
			address: '',
			safeSecurityResultVo: [],
			show: false,
			invalidNote: '',
			tableColumn: [
				{
					prop: 'goodsNo',
					label: this.$t('security.rectificationInfo.tableColumn.goodsNo')
				},
				{
					prop: 'goodsName',
					label: this.$t('security.rectificationInfo.tableColumn.goodsName')
				},
				{
					prop: 'standardName',
					label: this.$t('security.rectificationInfo.tableColumn.standardName')
				},
				{
					prop: 'propertyNames',
					label: this.$t('security.rectificationInfo.tableColumn.propertyNames')
				},
				{
					prop: 'unitsName',
					label: this.$t('security.rectificationInfo.tableColumn.unitsName')
				},
				{
					prop: 'amount',
					label: this.$t('security.rectificationInfo.tableColumn.amount')
				},
				{
					prop: 'weight',
					label: this.$t('security.rectificationInfo.tableColumn.weight')
				},
				{
					prop: 'unitPrice',
					label: this.$t('security.rectificationInfo.tableColumn.unitPrice')
				},
				{
					prop: 'totalMoney',
					label: this.$t('security.rectificationInfo.tableColumn.totalMoney')
				},
				{
					prop: 'remarks',
					label: this.$t('security.rectificationInfo.tableColumn.remarks')
				}
			],
			tableData: [],
		}
	},
	// 过滤器
	filters: {
		state(value) {
			const stateObj = that.$t('security.securityCheckInfo.stateRecObj')
			return stateObj[value] || ''
		},
		payState(value) {
			const stateObj = that.$t('security.securityCheckInfo.payStateObj')
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
				title: this.$t('security.rectificationInfo.titleTextInfo')
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
			const { returnValue: res } = await safeRectifyFindById({ id: this.editId })
			if (res) {
				res.picture = this.$options.filters.pictureConversion(res.picture)
				const safeRectifyPaysName = []
				res.safeRectifyPays.forEach((v) => {
					safeRectifyPaysName.push(v.collectionTypeName + '-' + v.payMoney)
				})
				res.safeRectifyPaysName = safeRectifyPaysName.join(',')
				this.userCustomerVo = res.userCustomerVo
				this.address = this.$options.filters.addressSplicing(res.userCustomerVo.userAddress)
				this.info = res
				this.safeSecurityResultVo = res.safeSecurityResultNot
				this.tableData = res.safeRectifyGoods
			}
		},
		// 删除
		handleDelete() {
			uni.showModal({
				title: this.$t('common.tipsTle')[2],
				content: this.$t('common').delTxt(this.formDataValue.billNo),
				success: async(param) => {
					if (param.confirm) {
						const { returnValue: res, message } = await safeRectifyDeleteByIds({ ids: [this.editId] })
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
		// 作废
		handleVoid() {
			this.show = true
			this.invalidNote = ''
		},
		// 作废确认
		async confirm() {
			const remarks = this.invalidNote.replace(/\s*/g, '')
			if (!remarks) {
				uni.$u.toast(this.$t('common.descPlaceholder'))
				return false
			}
			const { returnValue: res, message } = await safeRectifyInvalidByIds({ 
				ids: [this.editId],
				invalidNote: remarks || '' ,
			}).catch(err => {
				this.closeModal()
			})
			if(res){
				this.$refs.uToast.show({
					type: 'success',
					message: message,
				})
				this.getInfo()
			}
			this.closeModal()
		},
		closeModal() {
			this.show = false
			this.invalidNote = ''
		},
		// 整改
		handleRectify() {
			this.goto('/securityManage/addRectification/addRectification',{ editId: this.editId })
		},
		// 结算
		handleSettle() {
			this.goto('/securityManage/addRectification/addRectification',{ editId: this.editId, settle: true })
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
