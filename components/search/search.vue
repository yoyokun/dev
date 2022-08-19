<template>
	<view class="search">
		<view class="search-content">
			<view class="box">
				<u-search :showAction="false" v-model="params.keyword" @search="emitSearch" @clear="emitSearch"></u-search>
			</view>
			<u-button class="button" size="mini" type="primary" @click="emitSearch">搜索</u-button>
			<u-button v-if="searchOptions.length" class="button" size="mini" type="info" plain @click="showMore">更多
			</u-button>
		</view>
		<u-popup mode="bottom" round="14" customStyle="overflow:hidden" closeable :show="show" @close="close">
			<view class="filter">
				<view class="filter-box">
					<block v-for="(item,index) in searchOptions" :key="index">
						<!-- 文本框 -->
						<view class="cell" v-if="item.type=='text'">
							<view class="tle">{{item.labelText}}</view>
							<view class="cell-box" :style="item.labelText?'margin-top:20rpx':''">
								<u-input :value="params[item.fieldName]" :placeholder="item.placeholder" border="surround" clearable @change="changeItem($event,item.fieldName)"></u-input>
							</view>
						</view>
						<!-- 一般选择 单选 -->
						<view class="cell" v-if="item.type=='select'">
							<view class="tle">{{item.labelText}}</view>
							<view class="cell-box">
								<view class="item" :class="params[item.fieldName]==val.value?'on':''"
									v-for="(val,key) in item.options" :key="key"
									@click="selectItem(val.value,item.fieldName)">{{val.label}}</view>
							</view>
						</view>
						<!-- 日期时间选择 -->
						<view class="cell" v-if="['date','datetime'].indexOf(item.type)>-1">
							<view class="tle">{{item.labelText}}</view>
							<view class="cell-box">
								<view class="datetime">
									<uni-datetime-picker :placeholder="item.placeholder" :type="item.type" :value="params[item.fieldName]"
										@change="changeItem($event,item.fieldName)"></uni-datetime-picker>
								</view>
							</view>
						</view>
						<!-- 日期时间范围选择 -->
						<view class="cell" v-if="['daterange','datetimerange'].indexOf(item.type)>-1">
							<view class="tle">{{item.labelText}}</view>
							<view class="cell-box">
								<view class="datetime">
									<uni-datetime-picker :value="params[item.fieldName]" :start-placeholder="item.placeholder[0]"
										:end-placeholder="item.placeholder[1]" :type="item.type"
										@change="changeItem($event,item)">
									</uni-datetime-picker>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view class="actions">
					<u-button class="button" type="primary" @click="confirm">确定</u-button>
					<u-button class="button" type="info" plain @click="reset">重置</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			searchOptions: {
				type: Array,
				default: () => []
			}
		},
		watch: {
			searchOptions: {
				handler(e, a) {
					// console.log(e)
				},
				deep: true,
				immediate: true,
			}
		},
		data() {
			return {
				params: {
					keyword: ''
				},
				show: false,
			}
		},
		created() {

		},
		methods: {
			// 通信搜素
			emitSearch(){
				this.$emit('search',this.params)
			},
			// 确认
			confirm(){
				this.close()
				this.emitSearch()
			},
			// 重置
			reset(){
				this.params = {
					keyword: ''
				}
				this.emitSearch()
			},
			// 选择选项
			selectItem(val, field) {
				if (this.params[field] == val) {
					this.$set(this.params, field, null)
					delete this.params[field]
					this.emitSearch()
				} else {
					this.changeItem(val, field)
				}
			},
			// 选择选项
			changeItem(val, field) {
				console.log(val)
				if (typeof field === 'object') {
					let obj = {}
					obj[field.fieldName] = val.length?val:''
					obj[field.startName] = val.length?val[0]:''
					obj[field.endName] = val.length?val[1]:''
					this.params = {
						...this.params,
						...obj
					}
				} else {
					this.$set(this.params, field, val)
				}
				this.emitSearch()
			},
			// 关闭弹窗
			close() {
				this.show = false
			},
			// 打开弹窗
			showMore() {
				this.show = true
			},
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		padding: 20rpx;
		width: 100%;
		box-sizing: border-box;

		.search-content {
			display: flex;
			align-items: center;

			.box {
				flex: 1;
			}

			.button {
				width: 50rpx !important;
				height: 50rpx !important;
				margin-left: 20rpx;
				padding: 0 !important;
			}
		}

		.filter {
			height: 74vh;
			display: flex;
			flex-direction: column;

			.filter-box {
				height: 1px;
				flex: 1;
				overflow-y: scroll;
				padding: 20rpx;
				box-sizing: border-box;
				background: #fafafa;

				.cell {
					border-radius: 20rpx;
					margin-bottom: 20rpx;
					background: white;
					padding: 20rpx;
					border: 1px solid #eee;

					&:last-child {
						margin-bottom: 0;
					}

					.tle {
						color: rgb(42, 130, 228);
						font-size: 30rpx;
						font-weight: bold;
					}

					.cell-box {
						display: flex;
						flex-wrap: wrap;

						.item {
							padding: 0 20rpx;
							height: 54rpx;
							line-height: 54rpx;
							border: 1px solid #eee;
							border-radius: 54rpx;
							margin-right: 20rpx;
							margin-top: 20rpx;
							font-size: 26rpx;
							color: #666;

							&.on {
								border-color: rgb(42, 130, 228);
								// color: rgb(42, 130, 228);
								background: rgb(42, 130, 228);
								color: white;
							}

						}

						.datetime {
							width: 100%;
							margin-top: 20rpx;
						}
					}
				}
			}

			.actions {
				padding: 20rpx;
				display: flex;
				box-shadow: 0px -1px 10px 0px rgba(0, 0, 0, 0.1);

				.button {
					margin-right: 20rpx;
					height: 80rpx !important;

					&:last-child {
						margin-right: 0;

					}
				}
			}
		}
	}
</style>
