<template>
	<view class="auditInfo">
		<u-steps :current="active">
			<u-steps-item v-for="item in auditRecordVos" :title="item.levelName" :key="item.auditTime" :desc="item.auditTime | dayjs"></u-steps-item>
		</u-steps>
	</view>
</template>

<script>
import { auditTaskFindById, auditLevelGetPushMans } from '@/api/lpgManageAppApi.js'
export default {
	data() {
		return {
			editId: '',
			info: {},
			active: 0,
			auditRecordVos: [],
			auditRecordVosReverse: []
		}
	},
	onLoad(options){
		this.editId = options.editId || ''
		if (this.editId) {
			this.getInfo(this.editId)
		}
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('auditInfo.titleText')
		});
	},
	methods: {
		// 详情
		async getInfo(id) {
			const { returnValue: res } = await auditTaskFindById({ id })
			if (res) {
				this.info = res
				this.active = res.auditRecordVos.length
				res.auditRecordVos.forEach((v) => {
					v.headPhoto = v.headPhoto.length ? JSON.parse(v.headPhoto) : []
				})
				// 查找审批
				for (let i = 0; i < res.auditRecordVos.length; i++) {
					if (res.auditRecordVos[i].status === 4) {
						this.active = i
						break
					}
				}
				const [...auditRecordVosReverse] = res.auditRecordVos
				this.auditRecordVos = res.auditRecordVos
				// 过滤数组并倒序
				this.auditRecordVosReverse = auditRecordVosReverse.filter(item => item.status !== 4).reverse()
				this.getAuditLevelGetPushMans(res.levelId)
			}
		},
		// 获取抄送人
		async getAuditLevelGetPushMans(levelId) {
			const { returnValue: res } = await auditLevelGetPushMans({ levelId })
			const arr = []
			res.forEach((v) => {
				arr.push({
					label: v.name,
					value: v.id
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.auditInfo{
	padding: 0 30rpx;
}
</style>
