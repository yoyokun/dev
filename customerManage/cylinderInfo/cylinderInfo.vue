<template>
	<view class="gp-info">
		<view class="info-main">
			<description-list>
				<description label="会员编号">{{ userAccount.userNo }}</description>
				<description label="客户编号">{{ info.customerNo }}</description>
				<description label="客户名称">{{ info.customerName }}</description>
				<description label="账号状态">{{ info.state | state }}</description>
				<description label="客户区域">{{ userSettlement.regionName }}</description>
				<description label="客户类型">{{ userSettlement.typeName }}</description>
				<description label="钢瓶总数">{{ cylinderNum }}</description>
			</description-list>
		</view>
		<view class="gp-list" v-for="(item, index) in dataList" :key="index">
			<view class="head">
				<text>{{item.orderBillNo}}</text>
				<text class="time">{{item.createTime | dayjs}}</text>
			</view>
			<view class="ihead">
				<text>{{item.orgName}}</text>
				<text class="red">{{$t('cylinderInfo.borrow')}}</text>
			</view>
			<view class="list-item">
				<!-- <view class="list-item" v-for="i in 2"> -->
				<text>{{item.goodsNo}}</text>
				<text>{{item.goodsName}}</text>
				<text>{{item.standardName}}</text>
				<text>{{item.residueNum}}{{$t('cylinderInfo.unit')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userCustomerfindByIdDefault
	} from '@/api/lpgManageAppApi'
	import {
		findCylinderListByCustomerId
	} from '@/api/lpgSalesManageApi'
	import {
		UnixToDate
	} from '@/utils/util.js'
	export default {
		filters: {
			state(value) {
				const stateObj = {
					1: '启用',
					2: '禁用'
				}
				return stateObj[value] || ''
			}
		},
		data() {
			return {
				info: {},
				cylinderNum: 0,
				userAccount: {},
				userSettlement: {},
				dataList:[],
			}
		},
		async created() {
			await this.getList()
		},
		async mounted() {

		},
		onLoad(options) {
			this.editId = options.editId || ''
			this.cylinderNum = options.cylinderNum || 0
			if (this.editId) {
				this.getInfo(this.editId)
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('cylinderInfo.titleText')
			})
		},
		methods: {
			// 获取列表
			async getList(obj = {}) {
				const data = {
					...obj,
					...{
						customerId: this.editId
					}
				}
				const {
					returnValue: res,
				} = await findCylinderListByCustomerId(data)
				// let resArr = {}
				// res.forEach(v => {
				// 	if (resArr.hasOwnProperty(v.id)) {
				// 		resArr[v.id].child.push(v)
				// 	} else {
				// 		resArr[v.id] = v
				// 		resArr[v.id].child = [v]
				// 	}
				// })
				// console.log(resArr)
				// resArr = Object.values(resArr)
				// console.log(resArr)
				this.dataList = res
			},
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await userCustomerfindByIdDefault({
					id
				})
				if (res) {
					this.info = res
					this.userAccount = res.userAccount
					this.userSettlement = res.userSettlement
				}
			},
		},
		options: {
			styleIsolation: 'shared'
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F7F7F7;
	}

	.gp-info {
		padding: 30rpx 20rpx;

		.info-main {
			border-radius: 20rpx;
			background: white;
			box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
		}
	}

	.gp-list {
		border-radius: 20rpx;
		background: white;
		margin-top: 30rpx;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
		font-size: 28rpx;

		.head {
			display: flex;
			height: 96rpx;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			border-bottom: 1px solid #eee;

			.time {
				color: #999;
				font-size: 26rpx;
			}
		}

		.ihead {
			display: flex;
			padding: 0 30rpx;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;

			.red {
				color: red;
			}
		}

		.list-item {
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			justify-content: space-between;
			height: 100rpx;
			border-bottom: 1px solid #eee;

			&:last-child {
				border-bottom: none;
			}

			text {
				// flex: 1;
				max-width: 25%;
				word-break: break-all;
			}
		}
	}
</style>
