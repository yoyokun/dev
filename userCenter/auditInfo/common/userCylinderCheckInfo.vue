<template>
	<view class="basic">
		<description-list :title="$t('auditInfo.userCylinderCheckInfo.basicTle')">
			<description :label="$t('auditInfo.userCylinderCheckInfo.billNo')">{{ info.billNo }}</description>
			<description :label="$t('auditInfo.userCylinderCheckInfo.billTime')">{{ info.billTime | dayjs }}
			</description>
			<description :label="$t('auditInfo.userCylinderCheckInfo.creator')">{{ info.creator }}</description>
			<description :label="$t('auditInfo.userCylinderCheckInfo.remarks')">{{ info.remarks }}</description>
		</description-list>
		<description-list :title="$t('auditInfo.userCylinderCheckInfo.checkTle')">
			<uni-table class="us-table" stripe :emptyText="$t('common.tableEmptyText')">
				<uni-tr class="uni-tr">
					<uni-th align="center" class="uni-th" v-for="(item, index) in tableColumn" :key="item.prop">
						<block v-if="!item.childrenList.length">
							<view class="custom-th">{{ item.label }}</view>
						</block>
						<block v-else>
							<view>
								<view class="custom-th">{{ item.label }}</view>
								<view class="custom-trh">
									<view class="custom-th" v-for="(child, childIndex) in item.childrenList" :key="child.prop">
										{{ child.label }}
									</view>
								</view>
							</view>
						</block>
					</uni-th>
				</uni-tr>
				<uni-tr class="uni-tr" v-for="(row,rowIndex) in tableData" :key="rowIndex">
					<block v-for="(item, index) in tableColumn" :key="item.prop">
						<uni-td class="uni-td" v-if="!item.childrenList.length">
							<view class="custom-td">
								{{ item.scopedSlots ? filterMethod(row[item.propValue], item.scopedSlots.tableRender) : row[item.propValue] }}
							</view>
						</uni-td>
						<block v-else>
							<td class="uni-td trd" v-if="item.prop==='standardSystemNum'">
								<view class="custom-trd">
									<view class="custom-td" v-for="(sysItem, sysIndex) in row.system">
										{{ sysItem[sysItem.name] }}</view>
								</view>
							</td>
							<td class="uni-td trd" v-if="item.prop==='standardCheckNum'">
								<view class="custom-trd">
									<view class="custom-td" v-for="(cheItem, cheIndex) in row.check">
										{{ cheItem[cheItem.name] }}</view>
								</view>
							</td>
							<td class="uni-td trd" v-if="item.prop==='standardDiffNum'">
								<view class="custom-trd">
									<view class="custom-td" v-for="(difItem, difIndex) in row.diff">
										{{ difItem[difItem.name] }}</view>
								</view>
							</td>
						</block>
					</block>
				</uni-tr>
			</uni-table>
		</description-list>
	</view>
</template>
<script>
	let that = null
	import {
		userCylinderCheckFindById,
		userCylinderCheckFindCustomerIds
	} from '@/api/lpgManageAppApi'
	import {
		UnixToDate
	} from '@/utils/util'
	export default {
		components: {},
		// 过滤器
		filters: {
			customerState(value) {
				const stateObj = that.$t('auditInfo.userCylinderCheckInfo.customerStateTxt')
				return stateObj[value] || ''
			}
		},
		props: {
			editId: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				UnixToDate: UnixToDate,
				info: {},
				startDate: 0,
				endDate: 0,
				tableColumn: [],
				titleColumn: [],
				dateTime: 0,
				tableData: []
			}
		},
		computed: {},
		created() {
			that = this
		},
		mounted() {
			this.$nextTick(() => {
				if (this.editId) {
					// 编辑
					this.getInfo(this.editId)
				}
			})
		},
		methods: {
			// 详情
			async getInfo(id) {
				const {
					returnValue: res
				} = await userCylinderCheckFindCustomerIds({
					id
				})
				if (res) {
					this.getList(res)
				}
			},
			// 获取列表
			async getList(val) {
				this.tableColumn = []
				const {
					returnValue: res,
					titleObject: titleObject
				} = await userCylinderCheckFindById({
					customerIds: val,
					id: this.editId
				}) // 统计信息
				this.startDate = res.startDate ? res.startDate : new Date().getTime()
				this.endDate = res.endDate ? res.endDate : new Date().getTime()
				this.dateTime = res.billTime ? res.billTime : new Date().getTime()
				this.titleColumn = titleObject.titleColumn
				this.tableColumn = titleObject.tableColumn
				res.userCylinderCheckCustomerVoList.forEach((v) => {
					var result = this.tableColumn.filter(item => {
						return item['supType'] === 'standard' && item['checked'] === true
					})
					const tableColumn = [...result]
					tableColumn.forEach(m => {
						v[m.prop] = {}
						m.childrenList.forEach((n) => {
							v[m.prop][n.standardName] = m.prop === 'standardSystemkNum' ? n
								.systemStockNum : (m.prop === 'standardCheckNum' ? n
									.checkStockNum : n.diffNum)
						})
					})
				})
				// 设置数据
				this.setTableData(res.userCylinderCheckCustomerVoList)
				this.info = res
			},
			// 设置数据
			setTableData(res) {
				const tableData = []
				res.forEach((v) => {
					const obj = {
						id: v.id,
						customerNo: v.customerNo,
						customerName: v.customerName,
						customerId: v.customerId,
						regionName: v.regionName,
						typeName: v.typeName,
						propertyName: v.propertyName,
						linkman: v.linkman,
						linkTel: v.linkTel,
						adress: v.adress,
						state: v.state,
						customerState: v.customerState,
						cylinderNum: v.cylinderNum,
						remarks: v.remarks,
						system: [],
						check: [],
						diff: []
					}
					var result = this.tableColumn.filter(item => {
						return item['supType'] === 'standard' && item['checked'] === true
					})
					const tableColumn = [...result]
					tableColumn.forEach(n => {
						if (n.childrenList) {
							n.childrenList.forEach((m, i) => {
								v.userCylinderCheckDetailList.forEach((o, j) => {
									if (m.defaultId === o.standardId && m.prop ===
										'standardSystemNum-' + o.standardId) {
										obj.system.push({
											[m.prop]: o.systemStockNum || 0,
											value: o.standardId,
											valueName: o.standardName,
											name: m.prop,
											align: m.align,
											id: o.id || ''
										})
									} else if (m.defaultId === o.standardId && m.prop ===
										'standardCheckNum-' + o.standardId) {
										obj.check.push({
											[m.prop]: o.checkStockNum || 0,
											value: o.standardId,
											valueName: o.standardName,
											name: m.prop,
											align: m.align,
											id: o.id || '',
											show: false
										})
									} else if (m.defaultId === o.standardId && m.prop ===
										'standardDiffNum-' + o.standardId) {
										obj.diff.push({
											[m.prop]: o.diffNum || 0,
											value: o.standardId,
											valueName: o.standardName,
											name: m.prop,
											align: m.align,
											id: o.id || ''
										})
									}
								})
							})
						}
					})
					tableData.push(obj)
				})
				this.tableData = tableData
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .us-table {
		.uni-th {
			padding: 0;
			white-space: nowrap;
			color: #000;
			background: linear-gradient(180deg, rgba(240, 247, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
		}
		.uni-tr {
			.custom-trh {
				display: flex;

				.custom-th {
					position: relative;
					// border-top: 1px solid #eee;
					min-width: 80rpx;

					&::after {
						position: absolute;
						width: 1px;
						height: 100%;
						background: #eee;
						display: none;
						content: '';
						top: 0;
						right: 0;
					}

					&:last-child {
						&::after {
							display: none;
						}
					}
				}
			}

			.custom-th {
				white-space: nowrap;
				padding: 20rpx;
			}

			.uni-td,
			.uni-th {
				font-size: 26rpx;
			}

			.uni-td {
				height: 1px;
				padding: 0;

				&.trd {
					// border-right: 1px solid #eee;
					// border-bottom: 1px solid #eee;
				}
			}

			.custom-td {
				padding: 30rpx;
				box-sizing: border-box;
				text-align: center;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.custom-trd {
				display: flex;
				height: 100%;

				.custom-td {
					position: relative;
					width: 50%;
					color: #606266;

					&::after {
						display: none;
						content: '';
						width: 1px;
						height: 100%;
						background: #eee;
						position: absolute;
						right: 0;
						top: 0;
					}

					&:last-child {
						&::after {
							display: none;
						}
					}
				}
			}

		}
	}
</style>
