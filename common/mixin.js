import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters(['token','userInfo','menu','roles','avatar','secretKey','printSettings','mapKey','webMapKey','onePageRow','locale'])
	},
	data() {
		return {

		}
	},
	created() {

	},
	methods: {
		// 跳转
		goto(url,data={},istoken=true) {
			if(!istoken){
				// 不需要token
				this.$navigateTo(url,data)
			} else {
				if (this.token) {
					this.$navigateTo(url,data)
				} else {
				  // 需要登录
					this.$navigateTo('/pages/login/login')
				}
			}
		},
		// 转换textarea内容
		sinceNote(val) {
			if(val){
				return val.replaceAll('\n','<br>')
			}
			return ''
		}
	}
}
