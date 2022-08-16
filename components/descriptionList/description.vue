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
		border-bottom: 1px solid #eee;
		min-height: 60rpx;
		line-height: 60rpx;
		padding: 0 20rpx;
		display: flex;

		.tle::after {
			display: inline-block;
			content: '：';
		}

		.desc {
			width: 1px;
			flex: 1;
		}
	}
</style>
