<template>
	<view class="item">
		<view class="tle">{{label}}</view>
		<view class="desc">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {}
		},
		computed: {},
		created() {},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.item {
		border-bottom: 1rpx solid #eee;
		min-height: 70rpx;
		line-height: 70rpx;
		padding: 0 20rpx;
		display: flex;
		font-size: 28rpx;
		&:last-child{
			border-bottom: none;
		}
		.tle::after {
			display: inline-block;
			content: '：';
		}

		.desc {
			width: 1rpx;
			flex: 1;
		}
	}
</style>
