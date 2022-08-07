<script>
export default {
	onLaunch: function() {
		 //检查语言类型
		var lan = 'zh'
		try {
			const res = uni.getSystemInfoSync();
			lan = res.language
		} catch (e) {
			console.log('error='+e)
		}
		console.log('lan='+lan); 
		
		if(lan === "zh-Hans-CN" || lan === "zh" || lan === "zh-CN") {
			this.$i18n.locale = 'zh-CN'
			// 存储到缓存
			uni.setStorageSync('locale', 'zh-CN')
		}else{
			this.$i18n.locale = 'en-US'
			// 存储到缓存
			uni.setStorageSync('locale', 'en-US')
		}
	},
	onshow: function() {
		
	},
	onhide: function() {
		
	}
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "styles/uviewui.scss";
	@import "styles/common.scss";
	
</style>
