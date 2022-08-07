<template>
  <view class="rich-text">
		<u-parse :content="paraDesc" :lazyLoad="true"></u-parse>
		<!-- 请求 toast 提示 -->
		<u-toast ref='uToast'></u-toast>
  </view>
</template>

<script>
import { sysConfigGetByKey } from '@/api/loginApi.js'
export default {
  data() {
    return {
      key: '',
      paraDesc: ''
    }
  },
  onLoad(options) {
		this.key = options.key || 'about_key'
		if(this.key === 'about_key'){
			uni.setNavigationBarTitle({
			  title: this.$t('agreement.aboutTitleText')
			})
		}
    this.getDetail()
  },
  methods: {
    async getDetail() {
      const { returnValue: res } = await sysConfigGetByKey({ key: this.key })
      if (res) {
        this.paraDesc = res.paraDesc
      }
    }
  },
	options:{
		styleIsolation: 'shared'
	}
}
</script>
<style lang="scss">
page{
	background-color: #fff;
}
</style>
<style lang="scss" scoped>
.rich-text{
	padding: 20rpx;
}
</style>
