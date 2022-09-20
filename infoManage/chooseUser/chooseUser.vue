<template>
	<view class="list-part">
		<view v-if="dataList.length">
			<view v-for="(item,index) in dataList" :key="item.id" class="chooseCommonBox" @click="chooseBox(index)">
				<view class="center">
					<view class="name">{{ item.name }}</view>
					<text class="des">{{ item.shop.name }}</text>
					<text class="des">{{ item.org.name }}</text>
				</view>
				<image class="icon" v-if="item.active" mode="widthFix" src="/static/image/check.png" />
				<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
			</view>
		</view>
		<u-empty v-else mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		<view class="bottom-part">
			<view class="btnAdd" @click="chooseSave">{{$t('postRole.save')}}</view>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
	import {
		sysOrgWithEmp
	} from '@/api/lpgManageAppApi'
	export default {
		data() {
			return {
				userIds: '',
				dataList: []
			}
		},
		onLoad(options) {
			this.multiple = options.multiple || false
			this.userIds = options.userIds || ''
			this.sysOrgWithEmp()
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('chooseUser.titleText')
			});
		},
		methods: {
			// 属性标签最后一级数组合并
			arrayMergingCommon(res) {
				let arr = []
				res.forEach((item, index) => {
					item.children.forEach((val, key) => {
						val.children.forEach(o => {
							o.shop = val
							o.org = item
							arr.push(o)
						})
					})
				})
				return arr
			},
			// 获取
			async sysOrgWithEmp() {
				const {
					returnValue: res
				} = await sysOrgWithEmp()
				if (res) {
					let arr = this.arrayMergingCommon(res)
					let ids = []
					if (this.multiple) {
						ids = ids.concat(this.userIds.split(','))
					} else {
						ids.push(this.userIds)
					}
					arr.forEach(v => {
						if (ids.indexOf(v.id) > -1) {
							v.active = true
						} else {
							v.active = false
						}
					})
					this.dataList = arr
				}
			},
			// 选择
			chooseBox(index) {
				if (this.multiple) {
					this.dataList[index].active = this.dataList[index].active == true ? false : true
				} else {
					this.dataList.forEach(v => {
						v.active = false
					})
					this.dataList[index].active = true
				}
			},
			// 确定
			chooseSave() {
				// 过滤选中的数据返回
				let data = []
				data = this.dataList.filter(v => v.active === true)
				if (this.multiple) {
					uni.$emit('chooseUser', data)
				} else {
					uni.$emit('chooseUser', data[0])
				}
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-part {
		padding-bottom: 120rpx;
	}
</style>
