<template>
	<view class="search">
		<view class="search-content">
			<view class="box">
				<u-search 
					:height="35" 
					:bgColor="bgColor" 
					:placeholder="$t('search.searchPlaceholder')"
					:showAction="false"  
					v-model="params.keyword" 
					@search="emitSearch" 
					@clear="emitSearch"></u-search>
			</view>
			<text class="button" @click="emitSearch">{{$t('search.searchTxt')}}</text>
			<text v-if="searchOptions.length" class="more" @click="showMore">{{$t('search.searchMore')}}</text>
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
									@click="selectItem(val.value,item.fieldName)">{{val.name}}</view>
							</view>
						</view>
						<!-- 日期时间选择 -->
						<view class="cell" v-if="item.type=='date'||item.type=='datetime'">
							<view class="tle">{{item.labelText}}</view>
							<view class="cell-box">
								<view class="datetime">
									<uni-datetime-picker :placeholder="item.placeholder" :type="item.type" :value="params[item.fieldName]"
										@change="changeItem($event,item.fieldName)"></uni-datetime-picker>
								</view>
							</view>
						</view>
						<!-- 日期时间范围选择 -->
						<view class="cell" v-if="item.type=='daterange'||item.type=='datetimerange'">
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
					<u-button class="button" shape="circle" type="primary" plain @click="reset">{{$t('search.resetBtn')}}</u-button>
					<u-button class="button" shape="circle" type="primary" @click="confirm">{{$t('search.confirmBtn')}}</u-button>
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
			},
			bgColor:{
				type: String,
				default:'#f2f2f2'
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
				this.confirm()
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
			background: rgba(42, 130, 228, 1);
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(42, 130, 228, 0.2);
			font-size: 28rpx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			padding: 14rpx 20rpx;
			border-radius: 200rpx;
			width: 140rpx;
			box-sizing: border-box;
			text-align: center;
			margin-left: 20rpx;
		}
		.more{
			font-size: 32rpx;
			color: rgba(42, 130, 228, 1);
			margin-left: 20rpx;
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
			background: rgba(247, 247, 247, 1);

			.cell {
				margin-bottom: 20rpx;
				background: white;
				padding: 20rpx;
				&:first-child {
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;
				}
				&:last-child {
					margin-bottom: 0;
				}

				.tle {
					color: rgba(56, 56, 56, 1);
					font-size: 34rpx;
					font-weight: 500;
				}

				.cell-box {
					display: flex;
					flex-wrap: wrap;

					.item {
						padding: 0 20rpx;
						height: 54rpx;
						line-height: 54rpx;
						border: 1rpx solid rgba(128, 128, 128, 1);    
						border-radius: 16rpx;
						margin-right: 20rpx;
						margin-top: 20rpx;
						font-size: 26rpx;
						color: rgba(128, 128, 128, 1);
						&.on {
							border-color: rgba(42, 130, 228, 1);
							background: rgba(42, 130, 228, 1);
							color: rgba(255, 255, 255, 1);
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
			padding: 20rpx 40rpx;
			display: flex;
			background: rgba(247, 247, 247, 1);
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
::v-deep .u-popup__content__close--top-right{
	top:15rpx;
	right:15rpx;
}
::v-deep .uicon-close{
	background: #8C8C8C !important;
	color: #fff !important;
	border-radius: 40rpx !important;
	font-weight: normal !important;
	padding: 5rpx;
}
</style>
