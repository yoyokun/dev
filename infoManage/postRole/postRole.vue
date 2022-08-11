<template>
  <view class="list-part">
    <block v-if="dataList.length">
      <block v-for="(item,index) in dataList" :key="item.id" >
				<block v-for="(subItem,subItemIndex) in item.children" :key="subItem.id">
					<view v-for="(subItems,subItemsIndex) in subItem.children" :key="subItems.id" class="chooseBox" @click="chooseBox(index,subItemIndex,subItemsIndex)">
						<view class="center">
							<view class="role">{{ subItems.name }}</view>
							<text class="depart">{{ subItem.name }}</text>
							<text class="org">{{ item.name }}</text>
						</view>
						<image class="icon" v-if="subItems.active" mode="widthFix" src="/static/image/check.png" />
						<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
					</view>
				</block>
			</block>
    </block>
		<u-empty v-else mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		<view class="bottom-part">
			<view class="btnAdd" @click="chooseSave">{{$t('postRole.save')}}</view>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { sysOrgWithRole } from '@/api/loginApi.js'
export default {
	data() {
		return {
			roleId: '',
			dataList: []
		}
	},
	onLoad(options) {
		this.roleId = options.roleId || ''
		this.getSysOrgWithRole()
	},
	onShow() {
		uni.setNavigationBarTitle({
			title: this.$t('postRole.titleText')
		});
	},
	methods: {
		// 获取岗位角色
		async getSysOrgWithRole() {
			const { returnValue: res } = await sysOrgWithRole()
		  if (res) {
				res.forEach(v => {
					v.children.forEach(m => {
						m.children.forEach(n => {
							if (this.roleId.indexOf(n.id) > -1) {
								n.active = true
							} else {
								n.active = false
							}
						})
					})
				})
		    this.dataList = res
		  }
		},
		// 选择岗位角色
		chooseBox(index,subItemIndex,subItemsIndex) {
			this.dataList[index].children[subItemIndex].children[subItemsIndex].active = !this.dataList[index].children[subItemIndex].children[subItemsIndex].active
		},
		// 过滤选中的
		fnFilter(arr){
			return arr.filter(item=>{
				const child = item.children.map(m=>{
					const newArr = m.children.filter(n => n.active === true)
					if(newArr.length){
						m.children = newArr
						return m
					}
				})
				// 过滤掉空值
				item.children = child.filter(k=>k)
				if(item.children.length){
					return item
				}
			})
		},
		// 确定
		chooseSave() {
			// 过滤选中的数据返回
			const data = this.fnFilter(JSON.parse(JSON.stringify(this.dataList)))
			console.log(data)
			uni.$emit('chooseData', data)
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.list-part{
	padding-bottom: 120rpx;
	.chooseBox{
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
		padding: 20rpx;
		border-radius: 16rpx;
		margin: 30rpx 20rpx;
		@include flexMixin();
		.center{
			.role{
				color: rgba(56, 56, 56, 1);
				font-size: 36rpx;
				font-weight: 500;
			}
			.depart{
				font-size: 32rpx;
				color: #707070;
				margin-right: 20rpx;
			}
			.org{
				font-size: 32rpx;
				color: #707070;
			}
		}
		.icon{
			width: 48rpx;
			height: 48rpx;
		}
	}
}
</style>
