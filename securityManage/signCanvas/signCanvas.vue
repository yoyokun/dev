<template>
	<view>
		<l-signature
		  disableScroll
		  ref="signatureRef"
			:penColor="penColor"
			:penSize="penSize"
			:openSmooth="openSmooth">
		</l-signature>
		<view class="signbtn">
			<u-button class="m-r20" :text="$t('common.btn.clear')" type="primary" plain shape="circle" @click="onClick('clear')"></u-button>
			<u-button :text="$t('common.btn.save')" type="primary" shape="circle" @click="onClick('save')"></u-button>
		</view>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
	</view>
</template>

<script>
export default {
	name: "signCanvas",
	data() {
		return {
			type: '',
			penColor: 'rgb(42, 130, 228)',
			penSize: 5,
			openSmooth: false
		}
	},
	onLoad(options) {
		this.type = options.type || ''
	},
	methods: {
		onClick(type) {
			if (type == 'save') {
				this.$refs.signatureRef.canvasToTempFilePath({
					success: (res) => {
						// 是否为空画板 无签名
						if(res.isEmpty) {
							this.$refs.uToast.show({
								type: 'error',
								message: this.$t('security.signCanvas.isEmptyMsg'),
							})
						} else {
							// 生成图片的临时路径
							// app | H5 | 微信小程序 生成的是base64
							uni.$emit('saveSignCanvas', {
								type: this.type,
								url: res.tempFilePath
							})
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
				return
			}
			if (this.$refs.signatureRef) {
				this.$refs.signatureRef[type]()
			}
		}
	},
	options:{
		styleIsolation: 'shared'
	}
}
</script>

<style lang="scss" scoped>
.lime-signature{
	height: calc(100% - 130rpx);
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	background: #fff;
}
.signbtn{
	padding: 20rpx 40rpx;
	position: absolute;
	bottom: 0rpx;
	left: 0rpx;
	width: 670rpx;
	@include flexMixin()
}
</style>