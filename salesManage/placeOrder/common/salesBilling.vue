<template>
	<view class="list">
		<view class="list-head">
			<view class="head-tle">{{templateDataObj.templateName}}</view>
			<view class="act-btn" v-if="!isSettle" @click="chooseGoods()">
				<u-icon class="add-icon" name="plus-circle"></u-icon>
				<view class="add-txt">{{$t('chooseGoods.addShop')}}</view>
			</view>
		</view>
		<view class="goods">
			<view class="goods-list" v-for="(item,index) in tableData" :key="item.ids">
				<view class="goods-head">
					<view class="goods-tle">{{item.goodsNo}} - {{item.goodsName}}</view>
					<view class="goods-price">￥{{item.unitPrice}}</view>
				</view>
				<view class="attr-del">
					<view class="attr">
						<view class="attr-txt">
							{{ item.goodsClassifyName ? item.goodsClassifyName + "," : "" }}
							{{ item.propertyNames ? item.propertyNames + "," : "" }}
							{{ item.businessTagName ? item.businessTagName + "," : "" }}
							{{ item.brandName }}
						</view>
						<u-icon class="arrow-right" name="arrow-right"></u-icon>
						<view class="attr-box">
							<view class="attr-item">
								<view class="item-tle">{{$t('chooseGoods.goodsClassifyName')}}：</view>
								<view class="item-txt">{{item.goodsClassifyName}}</view>
							</view>
							<view class="attr-item" v-if="item.propertyNames">
								<view class="item-tle">{{$t('chooseGoods.propertyNames')}}：</view>
								<view class="item-txt">{{item.propertyNames}}</view>
							</view>
							<view class="attr-item" v-if="item.businessTagName">
								<view class="item-tle">{{$t('chooseGoods.businessTagName')}}：</view>
								<view class="item-txt">{{item.businessTagName}}</view>
							</view>
							<view class="attr-item" v-if="item.brandName">
								<view class="item-tle">{{$t('chooseGoods.brandName')}}：</view>
								<view class="item-txt">{{item.brandName}}</view>
							</view>
						</view>
					</view>
					<u-checkbox-group v-if="templateDataObj.changePriceTag === 1" >
						<u-checkbox
							:disabled="isSettle" 
							:checked="item.checked" 
							@change="onChangePriceTag(index, item)"></u-checkbox>
					</u-checkbox-group>
					<u-icon v-if="!isSettle" class="remove-goods" name="minus-circle-fill" @click="removeOrderGoods(index)">
					</u-icon>
				</view>
				<view class="info-cell">
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.standardName')}}：</view>
						<view class="cell-content" v-if="item.unitsType === 1">{{item.standardName}}</view>
						<view class="cell-content" v-if="item.unitsType === 2" @click="!isSettle&&chooseSku(item, index)">
							<text>{{item.standardName}}</text>
							<u-icon class="arrow-right" name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.unitsName')}}：</view>
						<view class="cell-content">{{item.unitsName}}</view>
					</view>
				</view>
				<view class="info-cell">
					<block v-for="val in tableColumn" :key="val.id">
						<view class="cell" v-if="val.supType === 'assistUnits' && val.propValue.includes('netContent')">
							<view class="cell-label">{{val.labelName}}：</view>
							<!-- 显示 -->
							<view class="cell-content" v-if="item.unitsType === 1">{{item[val.propValue]}}</view>
							<!-- 编辑 -->
							<view class="cell-content" v-if="item.unitsType === 2">
								<view class="nums">
									<input :disabled="isSettle" v-model="item[val.propValue]" :placeholder="val.labelName"
										@input="validateInput(index,item,val.propValue)" />
								</view>
							</view>
						</view>
					</block>
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.amount')}}：</view>
						<view class="cell-content">
							<view class="nums">
								<input min="1" :disabled="isSettle" maxlength="4" type="number" v-model="item.amount"
									:placeholder="$t('chooseGoods.amount')" step="1"
									@input="validateInput(index,item,'amount')" />
							</view>
						</view>
					</view>
				</view>
				<view class="info-cell">
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.settleAmount')}}：</view>
						<view class="cell-content">{{item.settleAmount}}</view>
					</view>
					<view class="cell">
						<view class="cell-label">{{$t('chooseGoods.totalMoney')}}：</view>
						<view class="cell-content">{{item.totalMoney}}</view>
					</view>
				</view>
				<view class="info-cell">
					<view class="cell remarks">
						<view class="cell-label">{{$t('chooseGoods.remarks')}}：</view>
						<view class="cell-content">
							<textarea :disabled="isSettle" v-model="item.remarks" :placeholder="$t('chooseGoods.remarksPlace')"></textarea>
						</view>
					</view>
				</view>
			</view>
			<view class="total">
				<view class="total-tle">
					<text>{{$t('chooseGoods.total')}}：</text>
				</view>
				<view class="total-main">
					<view class="item">
						<text>{{$t('chooseGoods.amount')}}：</text>
						<text>{{totalNum}}</text>
					</view>
					<view class="item">
						<text>{{$t('chooseGoods.totalMoney')}}：</text>
						<text class="red">{{totalMoney}}</text>
					</view>
				</view>
			</view>
		</view>
		<u-popup class="multiplePopup" mode="bottom" :show="showSku" :closeOnClickOverlay="false">
			<view class="btn">
				<text class="cancel" @click="closeSku">{{$t('common.editForm.cancelText')}}</text>
				<text class="confirm" @click="confirmSku">{{$t('common.editForm.confirmText')}}</text>
			</view>
			<scroll-view class="multipleBox" scroll-y="true">
				<view class="box" v-for="(subItems,subIndex) in sysSpecificationClassifyData" :key="subItems.value"
					@click="checkSku(subIndex)">
					<view class="center">
						<view class="name">{{ subItems.name }}</view>
					</view>
					<image class="icon" v-if="subItems.active" mode="widthFix" src="/static/image/check.png" />
					<image class="icon" v-else mode="widthFix" src="/static/image/uncheck.png" />
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import {
		createUniqueString,
		checkPrice,
		integer
	} from '@/utils'
	import { salesOrderTemplateFindChangePriceGoods } from '@/api/lpgSalesManageApi'
	export default {
		name: 'SalesBilling',
		props: {
			// 模板ids
			id: {
				type: String,
				default: ''
			},
			// 模板详情
			templateData: {
				type: Object,
				default() {
					return {}
				}
			},
			// 钢瓶分类
			sysSpecificationClassifyData: {
				type: Array,
				default() {
					return []
				}
			},
			// 客户标签选择商品时用
			propertyIdStr: {
				type: String,
				default: ''
			},
			// 开单类型 1正常开单，2补录单 3电话订单 4客服中心电话订单
			billType: {
				type: [Number, String],
				default: 1
			},
			// 报价日期选择商品时用
			goodsCustomerDate: {
				type: [Number, String],
				default: ''
			},
			// 客户id选择商品时用
			customerId: {
				type: [Number, String],
				default: ''
			},
			// 是否结算 true 结算，不可更改单
			isSettle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				templateDataObj: {}, // 模板信息
				settleData: [], // 结算公式
				tableColumn: [], // 表头
				tableData: [], // 商品数据
				totalMoney: '', // 模板总金额
				totalNum: '', // 模板总数量
				showSku: false,
				tempIndex: null,
			}
		},
		watch: {
			// 监听 templateData 改变
			templateData: {
				async handler() {
					this.templateDataObj = JSON.parse(JSON.stringify(this.templateData))
					this.settleData = this.templateDataObj.templateAssistUnitsList
					this.tableColumn = this.templateDataObj.tableColumn
					this.tableData = this.templateDataObj.tableData
					if (this.tableData) {
						this.tableData.forEach((v, i) => {
							this.setData(v, i)
						})
						// 合计
						this.getSummaries()
					}
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {},
		beforeDestroy() {

		},
		methods: {
			writeData(data) {
				this.templateDataObj = JSON.parse(JSON.stringify(this.templateData))
				this.settleData = this.templateDataObj.templateAssistUnitsList
				this.tableColumn = this.templateDataObj.tableColumn
				this.tableData = this.templateDataObj.tableData
				if (this.tableData) {
					this.tableData.forEach((v, i) => {
						this.setData(v, i)
					})
					// 合计
					this.getSummaries()
				}
			},
			// 选择sku
			chooseSku(item, index) {
				this.showSku = true
				this.sysSpecificationClassifyData.forEach((o, i) => {
					o.active = false
					if (o.value === item.standardId) {
						o.active = true
					}
				})
				this.tempIndex = index
			},
			checkSku(index) {
				this.sysSpecificationClassifyData.forEach(item => {
					item.active = false
				})
				const obj = this.sysSpecificationClassifyData[index]
				obj.active = true
				this.$set(this.sysSpecificationClassifyData, index, obj)
			},
			confirmSku() {
				const obj = this.sysSpecificationClassifyData.filter(item => item.active === true)[0]
				this.tableData[this.tempIndex].standardId = obj.value
				this.tableData[this.tempIndex].standardName = obj.name
				this.tableChange()
				this.closeSku()
			},
			// 关闭sku
			closeSku() {
				this.showSku = false
			},
			// 添加商品处理商品数据
			initGoodData(data) {
				data.forEach(v => {
					v.id = ''
					v.ids = createUniqueString() // 作为数据的唯一标识
					// 商品辅助单位数据
					v.templateGoodsAssistList = []
					v.weight = 1 // 初始化重量值
					v.changePriceTag = 2 // 价格不转换
					v.checked = false
					v.retreatState = 1 // 正常
					v.amount = ''
					// 遍历结算公式
					this.settleData.forEach((l) => {
						// 商品辅助单位值（通过所有结算公式，组装提交时辅助单位的值）
						v.templateGoodsAssistList.push({
							assistUnitsId: l.assistUnitsId,
							salesUnitsId: l.salesUnitsId, // 销售单位id
							settleUnitsId: l.settleUnitsId, // 结算单位id
							numValue: '', // 辅助单位值
							changeValue: l.changeValue
						})
						// 用表头造model数据 初始值为空
						this.tableColumn.forEach(m => {
							if (m.propValue === 'assistName-' + l.assistUnitsId) {
								v[m.propValue] = ''
							}
							if (m.propValue === 'netContent-' + l.assistUnitsId) {
								v[m.propValue] = ''
							}
						})
					})
					// 所有辅助单位遍历 根据 商品详情 显示表头 来填充默认值
					v.defaultAssistUnitsList = v.assistUnitsList // 商品辅助单位默认值
					// 删除，跟详情返回的字段重复了
					delete v.assistUnitsList
					v.templateGoodsAssistList.forEach((l) => {
						// 遍历商品辅助单位默认值
						v.defaultAssistUnitsList.forEach((n) => {
							if (l.assistUnitsId === n.assistUnitsId) {
								// 遍历表头显示字段
								this.tableColumn.forEach(m => {
									if (m.propValue === 'assistName-' + n.assistUnitsId) {
										v[m.propValue] = n.unitsName // 回填商品辅助单位的 单位
									}
									if (m.propValue === 'netContent-' + n.assistUnitsId) {
										v[m.propValue] = n.netContent // 回填商品辅助单位的 计量值
										l.numValue = n.netContent // 表头辅助单位值（提交的时候用）
									}
								})
							}
						})
					})
				})
				this.tableChange(data, '', 'add')
			},
			// 选择商品
			chooseGoods() {
				this.$navigateTo('/infoManage/chooseGoods/chooseGoods', {
					multiple: true,
					goodsIdStr: this.templateDataObj.goodsDetailIdStr,
					propertyIdStr: this.propertyIdStr,
					goodsCustomerDate: this.goodsCustomerDate,
					customerId: this.customerId
				})
			},
			// 保存商品的回调数据
			tableChange(data, index, value) {
				if (value === 'add') {
					// 多个商品 合并
					this.tableData = this.tableData.concat(data)
					// 计算
					this.setData(data, this.tableData.length - 1)
				}
				// 合计
				this.getSummaries()
				// 触发给外部
				this.$emit('changeTable', this.tableData)
			},
			// 合计
			getSummaries() {
				let totalMoney = 0 // 模板总金额
				let totalNum = 0 // 模板总数量
				// 合计
				this.tableData.forEach((item, index) => {
					// 合计数量
					const value = Number(item.amount)
					totalNum = this.$bigDecimal.add(totalNum, value)
					// 合计金额
					const value1 = Number(item.totalMoney)
					totalMoney = this.$bigDecimal.add(totalMoney, value1)
				})

				const num = new this.$bigDecimal(totalMoney)
				if (this.templateDataObj.decimalMode === 'ROUND_DOWN') {
					// 向下取整
					totalMoney = num.round(this.templateDataObj.decimalNum, this.$bigDecimal.RoundingModes.DOWN).value
				} else if (this.templateDataObj.decimalMode === 'ROUND_UP') {
					// 向上取整
					totalMoney = num.round(this.templateDataObj.decimalNum, this.$bigDecimal.RoundingModes.UP).value
				} else if (this.templateDataObj.decimalMode === 'ROUND_HALF_UP') {
					// 四舍五入
					totalMoney = num.round(this.templateDataObj.decimalNum, this.$bigDecimal.RoundingModes.HALF_UP).value
				}
				this.totalMoney = totalMoney
				this.totalNum = totalNum
			},
			// 删除商品
			removeOrderGoods(index) {
				this.tableData.splice(index, 1)
				this.tableChange()
			},
			// 验证 只能输入正整数,价格
			validateInput(index, row, key) {
				if (key === 'amount') {
					// 数量
					this.tableData[index].amount = integer(row.amount)
				} else {
					// 动态值处理
					this.settleData.forEach((v, i) => {
						if (key === 'netContent-' + v.assistUnitsId) {
							const val = checkPrice(row['netContent-' + v.assistUnitsId])
							this.tableData[index][key] = val
							this.tableData[index].templateGoodsAssistList[i].numValue = this.tableData[index][
								key
							] // 表头辅助单位值（提交的时候用）
							// 新添加的字段，强制table重新渲染
							this.$set(this.tableData, index, this.tableData[index])
						}
					})
				}
				// 编辑的时候计算
				this.setData(row, index)
				this.tableChange()
			},
			// 计算单个商品的金额
			setData(row, index) {
				// 计算 遍历辅助单位
				// 辅助单位相等，第一个有值，用第一个计算，否则用第二个 第三个
				// 辅助单位都不相等 用数量
				if (this.settleData.length) {
					for (const i in this.settleData) {
						const v = this.settleData[i]
						// 取值
						const numValue = this.tableData[index].templateGoodsAssistList[i] ? this.tableData[index]
							.templateGoodsAssistList[i].numValue : null
						if (v.settleUnitsId === row.unitsId && numValue) {
							// 单位相等 并有值
							let amount = this.tableData[index].amount
							const netContent = this.tableData[index]['netContent-' + v.assistUnitsId]
							this.onBottleBumTag(netContent, amount, index)
							if (this.templateDataObj.bottleBumTag === 1 && (amount === '' || amount === null)) {
								amount = 1
							}
							if (this.tableData[index].changePriceTag === 1) {
								// 单个的重量
								this.tableData[index].weight = this.tableData[index].oneSettleAmount || 1
								// 价格转换 结算数量=重量值* 数量
								this.tableData[index].settleAmount = this.$bigDecimal.multiply(amount, this.tableData[index].weight)
							} else {
								// 单个的重量
								this.tableData[index].weight = this.$bigDecimal.multiply(netContent, v.changeValue)
								// 结算数量=重量值* 数量 * 单位转换值
								this.tableData[index].settleAmount = this.$bigDecimal.multiply(amount, this.tableData[index].weight)
							}
							// 按照商品精度计算金额
							this.tableData[index].totalMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(this
								.tableData[index].unitPrice,
								this.tableData[index].settleAmount), row.staffPre)
							// 保留2位
							this.tableData[index].totalMoney = this.$bigDecimal.round(this.tableData[index].totalMoney, 2)
							// 跳出循环
							break
						} else if (v.settleUnitsId === row.unitsId && !numValue) {
							// 单位相等 没值 跳出此次循环，继续执行下一次循环
							continue
						} else if (v.settleUnitsId !== row.unitsId) {
							// 单位不相等
							const amount = this.tableData[index].amount
							if (this.tableData[index].changePriceTag === 1) {
								// 单个重量
								this.tableData[index].weight = this.tableData[index].oneSettleAmount || 1
								// 价格转换 结算数量=数量* 转换结算数量
								this.tableData[index].settleAmount = this.$bigDecimal.multiply(amount, this.tableData[index].weight)
							} else {
								// 单个重量
								this.tableData[index].weight = 1
								this.tableData[index].settleAmount = amount
							}
							// 按照商品精度计算金额
							this.tableData[index].totalMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(this.tableData[
								index].unitPrice, this.tableData[index].settleAmount), row.staffPre)
							this.tableData[index].totalMoney = this.$bigDecimal.round(this.tableData[index].totalMoney, 2)
						}
					}
				} else {
					// 没有辅助单位
					const amount = this.tableData[index].amount
					if (this.tableData[index].changePriceTag === 1) {
						// 单个重量
						this.tableData[index].weight = this.tableData[index].oneSettleAmount || 1
						// 价格转换 结算数量=数量* 转换结算数量
						this.tableData[index].settleAmount = this.$bigDecimal.multiply(amount, this.tableData[index].weight)
					} else {
						// 单个重量
						this.tableData[index].weight = 1
						this.tableData[index].settleAmount = amount
					}
					// 按照商品精度计算金额
					this.tableData[index].totalMoney = this.$bigDecimal.round(this.$bigDecimal.multiply(this.tableData[
						index].unitPrice, this.tableData[index].settleAmount), row.staffPre)
					this.tableData[index].totalMoney = this.$bigDecimal.round(this.tableData[index].totalMoney, 2)
				}
			},
			// 价格转换
			async onChangePriceTag(index, row) {
				this.tableData[index].checked = !row.checked
				this.tableData[index].changePriceTag = this.tableData[index].checked ? 1 : 2
				// 查询转化价格
				const { returnValue: res } = await salesOrderTemplateFindChangePriceGoods({
					changePriceTag: this.tableData[index].changePriceTag,
					goodsDetailId: row.goodsDetailId,
					customerId: this.customerId,
					goodsCustomerDate: this.goodsCustomerDate
				})
				if (res) {
					this.tableData[index].unitPrice = res.unitPrice
					this.tableData[index].oneSettleAmount = res.settleAmount
					this.setData(row, index)
					this.tableChange()
				} else {
					this.tableData[index].oneSettleAmount = ''
				}
			},
			// 退瓶底
			onBottleBumTag(netContent, amount, index) {
				if (this.templateDataObj.bottleBumTag === 1) {
					// 退瓶底
					if (netContent < 0 && (amount === '' || amount === null)) {
						// 净含量小于0，数量为空，瓶底
						this.tableData[index].retreatState = 4
						if (!this.tableData[index].remarks) {
							this.tableData[index].remarks = '瓶底'
						}
					} else if (netContent < 0 && amount > 0) {
						// 净含量小于0，数量大于0，退气
						this.tableData[index].retreatState = 2
						if (!this.tableData[index].remarks) {
							this.tableData[index].remarks = '退气'
						}
					} else if (netContent > 0 && (amount === '' || amount === null)) {
						// 净含量大于0，数量为空或0，补气
						this.tableData[index].retreatState = 3
						if (!this.tableData[index].remarks) {
							this.tableData[index].remarks = '补气'
						}
					} else {
						// 净含量大于0，数量大于0，正常
						this.tableData[index].retreatState = 1
						this.tableData[index].remarks = ''
					}
				} else {
					const remarks = this.tableData[index].remarks
					if (remarks.includes('瓶底') || remarks.includes('退气') || remarks.includes('补气')) {
						this.tableData[index].remarks = ''
					}
				}
			},
			// 获取商品数据（给外部调用）
			getShop(fun) {
				const obj = {
					billName: this.templateDataObj.templateName, // 子单模板名称，
					id: this.templateDataObj.id, // id，
					orderTemplateId: this.templateDataObj.templateId, // 销售模板id，
					changeUnitsId: this.templateDataObj.changeUnitsId, // 销售单位转换id，
					inOutReasonId: this.templateDataObj.inOutReasonId, // 出入库原因id，
					loseStockState: this.templateDataObj.loseStockState, // 负库存销售，
					decimalNum: this.templateDataObj.decimalNum, // 保留位数，
					decimalMode: this.templateDataObj.decimalMode, // 保留小数方式，
					printMode: this.templateDataObj.printMode, // 打印方式，
					printTemplateId: this.templateDataObj.printTemplateId, // 打印模板id，
					data: this.tableData, // 商品信息
					totalMoney: this.totalMoney // 总金额
				}
				fun && fun(obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.multiplePopup {
		.btn {
			@include flexMixin();
			height: 80rpx;

			.confirm {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(60, 156, 255);
			}

			.cancel {
				font-size: 30rpx;
				padding: 0 30rpx;
				color: rgb(144, 145, 147);
			}
		}

		.multipleBox {
			height: 600rpx;
			padding: 0rpx 20rpx;
			box-sizing: border-box;

			.box {
				padding: 20rpx;
				border-bottom: 1rpx solid #eee;
				@include flexMixin();

				&:last-child {
					border-bottom: 0rpx;
				}

				.center {
					flex: 1;

					.name {
						flex: 1;
						color: rgba(56, 56, 56, 1);
						font-size: 36rpx;
						font-weight: 500;
					}

					.desc {
						flex: 1;
						font-size: 32rpx;
						color: #707070;
						margin-right: 20rpx;
					}
				}

				.icon {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
	.refresh{
		width: 50rpx;
		height: 50rpx;
	}
	.list {
		margin-top: 40rpx;

		.list-head {
			height: 90rpx;
			display: flex;
			align-items: center;
			// padding: 0 30rpx;
			position: relative;

			&:before {
				display: block;
				content: '';
				height: 40rpx;
				width: 8rpx;
				border-radius: 8rpx;
				background: rgba(42, 130, 228, 1);
			}

			.head-tle {
				margin-left: 16rpx;
				font-size: 36rpx;
				width: 1px;
				flex: 1;
				color: #000;
			}

			.head-icon {
				::v-deep .u-icon__icon {
					color: red !important;
					font-size: 44rpx !important;
				}
			}

			.act-btn {
				display: flex;
				height: 60rpx;
				border-radius: 60rpx;
				background: white;
				box-shadow: 0px 2px 4px 0px rgba(229, 229, 229, 0.5);
				align-items: center;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: rgba(42, 130, 228, 1);

				.add-icon {
					::v-deep .u-icon__icon {
						color: rgba(42, 130, 228, 1) !important;
						line-height: auto !important;
						font-size: 34rpx !important;
					}
				}

				.add-txt {
					margin-left: 10rpx;
				}
			}
		}

		.goods {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0rpx 4rpx 8rpx rgba(0, 0, 0, 0.04);
			border-radius: 16rpx;
			overflow: hidden;

			.goods-list {
				padding: 30rpx 30rpx;
				border-bottom: 1px solid #eee;

				&:last-child {
					border-bottom: none;
				}

				.goods-head {
					display: flex;

					.goods-tle {
						flex: 1;
						width: 1px;
						word-break: break-all;
						font-size: 28rpx;
						color: #000;
						line-height: 38rpx;
						font-weight: bold;
					}

					.goods-price {
						font-size: 28rpx;
						line-height: 38rpx;
						font-weight: bold;
						color: red;
						margin-left: 10rpx;
					}
				}

				.attr-del {
					display: flex;
					justify-content: space-between;
					margin-top: 30rpx;
					align-items: center;

					.remove-goods {
						::v-deep .u-icon__icon {
							color: rgba(255, 79, 35, 1.0) !important;
							font-size: 46rpx !important;
						}
					}
				}

				.attr {
					padding: 0 10rpx;
					height: 50rpx;
					display: flex;
					align-items: center;
					width: 360rpx;
					background: rgba(247, 247, 247, 1);
					border-radius: 4rpx;
					position: relative;

					&:hover {
						.arrow-right {
							transform: rotate(90deg);
						}

						.attr-box {
							display: block;
						}
					}

					.attr-txt {
						color: rgba(56, 56, 56, 1);
						font-size: 28rpx;
						width: 1px;
						flex: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.attr-box {
						display: none;
						z-index: 20;
						position: absolute;
						left: 0;
						background: rgba(247, 247, 247, 1);
						border-radius: 16rpx;
						top: 74rpx;
						width: 100%;
						padding: 20rpx;
						box-sizing: border-box;

						.attr-item {
							display: flex;
							font-size: 24rpx;
							margin-bottom: 10rpx;
							color: #000;
							font-weight: bold;

							&:last-child {
								margin-bottom: 0;
							}

							.item-tle {
								color: rgba(56, 56, 56, 1);
								font-weight: normal;
							}
						}

						&::before {
							content: '';
							position: absolute;
							top: -15rpx;
							left: calc(50% - 15rpx);
							transform: translate(-50%, 0%);
							transform: rotate(45deg);
							display: block;
							width: 30rpx;
							height: 30rpx;
							background: rgba(247, 247, 247, 1);
						}
					}

				}

				.info-cell {
					display: flex;
					align-items: center;
					font-size: 28rpx;
					line-height: 28rpx;
					flex-wrap: wrap;

					.cell {
						width: 50%;
						display: flex;
						align-items: center;
						margin-top: 30rpx;

						&.remarks {
							width: 100%;
						}

						.cell-label {
							color: rgba(128, 128, 128, 1);
							white-space: nowrap;
						}

						.cell-content {
							flex: 1;
							display: flex;

							.nums {
								color: rgba(128, 128, 128, 1);
								display: flex;
								align-items: center;
								flex: 1;

								input {
									width: 150rpx;
									text-align: right;
									font-size: 28rpx;
									border-bottom: 1px solid #ccc;
									text-align: center;
								}
							}

							textarea {
								width: 100%;
								background: rgba(247, 247, 247, 1);
								height: 110rpx;
								border-radius: 14rpx;
								padding: 20rpx;
								box-sizing: border-box;
								font-size: 28rpx;
							}
						}
					}


				}
			}

			.total {
				display: flex;
				font-size: 28rpx;

				.total-tle {
					height: 80rpx;
					padding: 0 20rpx;
					background: rgba(42, 130, 228, 1);
					color: white;
					display: flex;
					// justify-content: center;
					align-items: center;
				}

				.total-main {
					display: flex;
					flex: 1;
					width: 1px;
					background: rgba(240, 247, 255, 0.35);
					align-items: center;
					padding: 0 20rpx;

					.item {
						margin-right: 30rpx;

						>text:first-child {
							color: gray;
						}

						&:last-child {
							margin-right: 0;
						}
					}
				}
			}
		}
	}
</style>
