<template>
	<view>
		<uni-table border stripe emptyText="暂无更多数据">
			<uni-tr>
				<uni-th class="th-class" v-for="(col,key) in tableColumn" :key="key">{{col.label}}</uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td class="td-class" v-for="(col,key) in tableColumn" :key="key">
					<block v-if="col.slot">
						<!-- #ifdef H5 || APP-PLUS -->
						<slot :name="`${col.slot}`" :data="item"></slot>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN-->
						<slot name="{{col.slot}}" :data="item"></slot>
						<!-- #endif -->
					</block>
					<block v-else>{{item[col.prop]}}</block>
				</uni-td>
			</uni-tr>

		</uni-table>
	</view>
</template>

<script>
	export default {
		name: 'Utable',
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
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.th-class,
	.td-class,
	::v-deep .empty-border {
		font-size: 26rpx;
	}
</style>
