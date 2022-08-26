<template>
	<view class="table-box">
		<uni-table stripe :emptyText="$t('common.tableEmptyText')">
			<uni-tr>
				<uni-th class="th-class" v-for="(col,key) in tableColumn" :key="key" :width="col.width" :align="col.align">{{col.label}}</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td class="td-class" v-for="(col,key) in tableColumn" :key="key" :align="col.align">
					<block v-if="col.slot">
						<!-- #ifdef H5 || APP-PLUS -->
						<slot :name="`${col.slot}`" :data="item"></slot>
						<!-- #endif -->
						<!-- #ifdef MP-->
						<slot name="{{col.slot}}" :data="item"></slot>
						<!-- #endif -->
					</block>
					<block v-else>{{item[col.prop]}}</block>
				</uni-td>
			</uni-tr>

		</uni-table>
		<view class="p-20" v-if="pagination">
			<uni-pagination show-icon="true" :pageSize="pagination.size" :total="pagination.total" :current="pagination.page" @change="changePage">
			</uni-pagination>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UTable',
		props: {
			// 表头名称
			tableColumn: {
				type: Array,
				default: () => []
			},
			// 表格数据
			tableData: {
				type: Array,
				default: () => []
			},
			// 分页
			pagination: {
				type: [Object, Boolean],
				default: false
			},
		},
		data() {
			return {}
		},
		methods:{
			changePage(e){
				this.$emit('currentChange',{page:e.current,size:this.pagination.size})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.th-class{
		white-space: nowrap;
		color: #000;
		background: linear-gradient(180deg, rgba(240, 247, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
	}
	.th-class,
	.td-class,
	::v-deep .empty-border {
		font-size: 26rpx;
	}
	.p-20{
		padding:20rpx
	}
	.table-box{
		// border-radius: 20rpx;
		// overflow: hidden;
	}
</style>
