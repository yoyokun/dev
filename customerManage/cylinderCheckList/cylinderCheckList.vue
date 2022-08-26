<template>
	<view class="list-part">
		<view class="search-box">
			<search :searchOptions="searchOptions" @search="search"></search>
			<view class="total">
				<view class="num">{{$t('cylinderCheckList.totalTxt')}}：<text>{{totals}}</text></view>
				<view class="add" v-permission="{ permission:'app_cylinderCheckList_add'}" @click="addData"><u-icon name="plus" color="#2A82E4" size="16" bold></u-icon>{{$t('common.btn.add')}}</view>
			</view>
		</view>
		<view class="search-box">
			<search bg-color="white" :search-options="searchOptions" @search="search" />
			</search>
		</view>
		<block v-if="empty">
			<view class="gp-box" v-if="dataList.length">
				<view class="gp-main" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
					<view class="head">
						<text>{{item.billNo}}</text>
						<text class="status" v-if="item.checkState==3">{{$t('cylinderCheckList.checkStateTxt')[0]}}</text>
						<text class="status green" v-if="item.checkState==1">{{$t('cylinderCheckList.checkStateTxt')[1]}}</text>
						<text class="status warning" v-if="item.checkState==2">{{$t('cylinderCheckList.checkStateTxt')[2]}}</text>
						<text class="status gray" v-if="item.checkState==5">{{$t('cylinderCheckList.checkStateTxt')[3]}}</text>
						<text class="status red" v-if="item.checkState==4">{{$t('cylinderCheckList.checkStateTxt')[4]}}</text>
						<text class="status gray" v-if="item.checkState==6">{{$t('cylinderCheckList.checkStateTxt')[5]}}</text>
					</view>
					<view class="main-box">
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.checkNum')}}：</view>
							<view class="desc">{{item.checkNum}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.systemNum')}}：</view>
							<view class="desc">{{item.systemNum}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.creator')}}：</view>
							<view class="desc">{{item.creator}}</view>
						</view>
						<view class="item">
							<view class="label">{{$t('cylinderCheckList.billTime')}}：</view>
							<view class="desc">{{item.billTime | dayjs}}</view>
						</view>
					</view>
					<view class="actions">
						<view class="btn" v-if="item.checkState==1||item.checkState==4"
							v-permission="{ permission:'app_addCylinderCheck_save'}" @click="editData(item.id)">{{$t('cylinderCheckList.btns')[1]}}</view>
						<view class="btn green" v-if="item.checkState==1" @click="handleUpdate(item,2)"
							v-permission="{ permission:'app_addCylinderCheck_submit'}">{{$t('cylinderCheckList.btns')[2]}}</view>
						<view class="btn warning" v-if="item.checkState==2" @click="handleUpdate(item,7)">{{$t('cylinderCheckList.btns')[3]}}</view>
						<view class="btn gray" v-if="item.checkState==3||item.checkState==6" @click="handleVoid(item)"
							v-permission="{ permission:'app_cylinderCheckList_invalid'}">
							{{$t('cylinderCheckList.btns')[4]}}</view>
						<view class="btn red" v-if="item.checkState==1||item.checkState==5||item.checkState==4"
							@click="handleDelete(item)" v-permission="{ permission:'app_cylinderCheckList_delete'}">{{$t('cylinderCheckList.btns')[5]}}
						</view>
					</view>
				</view>
			</view>
			<loading v-if="loading" class="loading" />
			<view v-if="searchEnding" class="noData">{{$t('common.noData')}}</view>
		</block>
		<view v-else class="goodsList">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png"></u-empty>
		</view>
		<loading v-if="loadingCenter" class="loading-center" />
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>

		<!-- 作废 -->
		<u-modal :show="showModal" :title="$t('cylinderCheckList.descTle')" :closeOnClickOverlay="true" :asyncClose="true" :showCancelButton="true"
			@cancel="closeModal" @close="closeModal" @confirm="confVoid">
			<view class="modal-main">
				<view>{{$t('cylinderCheckList.descTips')}}</view>
				<u-textarea v-model="modalParams.value" class="modal-text" placeholder="请输入原因"></u-textarea>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		userCylinderCheckFindList,
		auditTaskRecallTaskByLinkId,
		userCylinderCheckUpdateState,
		userCylinderCheckDeleteByIds,
		userCylinderCheckToVoid
	} from '@/api/lpgManageAppApi'
	import paginationMixin from '@/common/paginationMixin.js'
	import {
		settingMixin
	} from '@/common/settingMixin.js'
	export default {
		mixins: [paginationMixin, settingMixin],
		props: {
			
		},
		data() {
			return {
				totals:0,
				showModal: false,
				modalParams:{},
				searchOptions: [{
						labelText: this.$t('cylinderCheckList.searchOptions.typeId.label'),
						type: 'select',
						fieldName: 'typeId',
						options: []
					},
					{
						labelText: this.$t('cylinderCheckList.searchOptions.regionId.label'),
						type: 'select',
						fieldName: 'regionId',
						options: []
					},
					{
						type: 'select',
						labelText: this.$t('cylinderCheckList.searchOptions.propertyIds.label'),
						fieldName: 'propertyIds',
						options: [],
					},
					{
						labelText: this.$t('cylinderCheckList.searchOptions.state.label'),
						type: 'select',
						fieldName: 'state',
						options: this.$t('cylinderCheckList.searchOptions.state.options')
					}
				]
			}
		},
		// 过滤器
		filters: {},
		computed: {
			onePageRow() {
				return 5
			}
		},
		async created() {
			// 获取客户类型
			await this.getCustomerType()
			this.searchOptions[0].options = this.customerTypeList
			// 获取客户区域
			await this.getCustomerArea()
			this.searchOptions[1].options = this.customerAreaList
			// 获取客户标签
			await this.geCustomerProperty()
			this.searchOptions[2].options = this.arrayMergingCommon(this.customertProperty)
		},
		async mounted() {

		},
		onLoad(options) {

		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('cylinderCheckList.titleText')
			})
		},
		methods: {
			addData(){
				uni.navigateTo({
					url:'/customerManage/addCylinderCheck/addCylinderCheck'
				})
			},
			editData(id){
				this.$navigateTo('/customerManage/addCylinderCheck/addCylinderCheck',{
					editId:id
				})
			},
			async confVoid() {
				const obj = {
					ids: [],
					invalidRemarks: this.modalParams.value||''
				}
				obj.ids.push(this.modalParams.voidData.id)
				const {
					returnValue: res,
					message
				} = await userCylinderCheckToVoid(obj)
				if (res) {
					uni.showToast({
						title: message,
						icon: 'none'
					})
					this.closeModal()
					this.search({})
				}
			},
			closeModal() {
				this.showModal = false
				this.modalParams = {}
			},
			handleVoid(data) {
				this.showModal = true
				this.modalParams.voidData = data
			},
			// 提交 撤回
			handleUpdate(data, type) {
				const that = this
				if (type === 7) {
					console.log()
					uni.showModal({
						title: that.$t('cylinderCheckList.tipsTle')[0],
						content: that.$t('cylinderCheckList').backTxt(data.billNo),
						// content: `真的要撤回${data.billNo}该条数据吗?`,
						success: async function(res) {
							if (res.confirm) {
								const obj = {
									linkId: data.id
								}
								const {
									returnValue: res,
									message
								} = await auditTaskRecallTaskByLinkId(obj)
								if (res) {
									uni.showToast({
										title: message,
										icon: 'none'
									})
									that.search({})
								}
							}
						}
					})
				} else {
					uni.showModal({
						title: that.$t('cylinderCheckList.tipsTle')[1],
						content: that.$t('cylinderCheckList').subTxt(data.billNo),
						// content: `真的要提交${data.billNo}该条数据吗?`,
						success: async function(res) {
							if (res.confirm) {
								const obj = {
									ids: [data.id],
									state: type
								}
								const {
									returnValue: res,
									message
								} = await userCylinderCheckUpdateState(obj)
								if (res) {
									uni.showToast({
										title: message,
										icon: 'none'
									})
									that.search({})
								}
							}
						}
					})
				}
			},
			// 删除
			handleDelete(data) {
				const that = this
				uni.showModal({
					title: that.$t('cylinderCheckList.tipsTle')[2],
					content: that.$t('cylinderCheckList').delTxt(data.billNo),
					success: async function(res) {
						if (res.confirm) {
							const obj = {
								ids: [data.id]
							}
							const {
								returnValue: res,
								message
							} = await userCylinderCheckDeleteByIds(obj)
							if (res) {
								uni.showToast({
									title: message,
									icon: 'none'
								})
								that.search({})
							}
						}
					}
				});
			},
			// 搜索
			search(e) {
				this.params = {
					...e
				}
				this.getInit()
			},
			// 详情
			toDetail(item) {
				return
				this.$navigateTo('/customerManage/cylinderInfo/cylinderInfo', {
					editId: item.id,
					cylinderNum: item.cylinderNum
				})
			},
			// 获取列表
			async findDataList() {
				const data = {
					...(this.params || {}),
					...{
						page: this.pagination.getCurrentPage(),
						size: this.pagination.getCurrentSize()
					}
				}
				const {
					returnValue: res,
					totals
				} = await userCylinderCheckFindList(data)
				this.setMoreData(res)
				this.totals = totals
				this.loadClose()
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

	.list-part {
		padding-bottom: 120rpx;

		// .search-box {
		// 	display: flex;
		// 	align-items: center;
		// 	padding: 0;
		// 	background: #F7F7F7;

		// 	::v-deep .u-search__content {
		// 		background-color: white !important;
		// 	}

		// 	::v-deep .u-search__action {
		// 		display: none;
		// 	}
		// }

		.gp-box {
			// padding: 0 30rpx;
			padding: 240rpx 20rpx 0rpx 20rpx;

			.gp-top {
				height: 110rpx;
				// line-height: 98rpx;
				display: flex;
				align-items: center;
				color: white;
				font-size: 30rpx;
				border-radius: 20rpx 20rpx 0 0;
				padding: 0 28rpx;
				margin-bottom: -20rpx;
				background: linear-gradient(218.16deg, rgba(104, 169, 242, 1) 0%, rgba(41, 128, 227, 1) 100%);
				justify-content: space-between;

				text {
					margin-top: -20rpx;

					&.button {
						width: 160rpx;
						height: 60rpx;
						line-height: 60rpx;
						background: white;
						border-radius: 60rpx;
						color: #2A82E4;
						text-align: center;
						font-weight: bold;
					}
				}
			}

			.gp-main {
				background: white;
				border-radius: 20rpx;
				box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
				margin-bottom: 30rpx;
				font-size: 30rpx;

				.head {
					padding: 0 20rpx;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #eee;

					.status {
						color: #2A82E4;

						&.green {
							color: #43CF7C;
						}

						&.warning {
							color: #FF8D1A;
						}

						&.gray {
							color: #808080;
						}

						&.red {
							color: rgba(212, 48, 48, 1);
						}
					}
				}

				.main-box {
					padding: 34rpx 24rpx;

					.item {
						display: flex;
						font-size: 28rpx;
						line-height: 28rpx;
						align-items: center;
						color: rgba(112, 112, 112, 1);
						margin-top: 20rpx;

						&:first-child {
							margin-top: 0;
						}

						.label {
							min-width: 140rpx;
						}

						.desc {
							color: rgba(56, 56, 56, 1);
						}
					}
				}

				.actions {
					display: flex;
					font-size: 28rpx;
					padding: 20rpx;
					justify-content: flex-end;
					border-top: 1px solid #eee;

					.btn {
						margin-left: 20rpx;
						width: 150rpx;
						height: 56rpx;
						text-align: center;
						line-height: 56rpx;
						background: #F0F7FF;
						border: 1px solid #2A82E4;
						color: #2A82E4;
						border-radius: 60rpx;

						&.green {
							border-color: #43CF7C;
							color: #43CF7C;
							background: rgba(67, 207, 124, 0.05);
						}

						&.warning {
							color: #FF8D1A;
							border-color: #FF8D1A;
							background: rgba(255, 141, 26, 0.05);
						}

						&.gray {
							color: #808080;
							border-color: #808080;
							background: rgba(229, 229, 229, 0.05);
						}

						&.red {
							color: rgba(212, 48, 48, 1);
							border-color: rgba(212, 48, 48, 1);
							background: rgba(255, 107, 74, 0.07);
						}
					}
				}
			}
		}

	}

	.modal-main {
		width: 100%;
		font-size: 28rpx;

		&>view {
			margin-bottom: 20rpx;
		}

		::v-deep .modal-text {
			font-size: 28rpx;

			.u-textarea__field {
				font-size: 28rpx;
			}
		}
	}
</style>
