<template>
	<view class="basic-item">
		<view class="basic-tle" v-if="title">{{title}}</view>
		<view class="basic-box">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DescriptionList',
		props: {
			title: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {}
		},
		computed: {},
		mounted() {

		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.basic-item {
		font-size: 28rpx;
		
		.basic-tle {
			padding: 0 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-weight: bold;
			border-bottom: 1px solid #eee;
		}

		.basic-box {}
	}
</style>
