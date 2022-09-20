import {
	mapGetters
} from 'vuex'
import {
	sysConfigParsingCodeKey
} from '@/api/lpgSecurityManageApi'
import permision from "@/common/wa-permission/permission.js"
import qrcode from "@/utils/reqrcode.js"
export default {
	computed: {
		...mapGetters(['token', 'userInfo', 'menu', 'roles', 'avatar', 'secretKey', 'printSettings', 'mapKey',
			'webMapKey', 'onePageRow', 'locale'
		])
	},
	data() {
		return {

		}
	},
	created() {

	},
	methods: {
		// 跳转
		goto(url, data = {}, istoken = true) {
			if (!istoken) {
				// 不需要token
				this.$navigateTo(url, data)
			} else {
				if (this.token) {
					this.$navigateTo(url, data)
				} else {
					// 需要登录
					this.$navigateTo('/pages/login/login')
				}
			}
		},
		// 转换textarea内容
		sinceNote(val) {
			if (val) {
				return val.replaceAll('\n', '<br>')
			}
			return ''
		},
		// 扫码登录
		async decodeQrLogin() {
			return new Promise((resolved, rejected) => {
				// #ifdef APP-PLUS
				var result = await permision.requestAndroidPermission("android.permission.CAMERA")
				if (result === 1) {
					uni.scanCode({
						success: async (res) => {
							if (res.result) {
								resolved(res.result)
							}
						},
						fail(err) {
							rejected(err)
						}
					});
				}else{
					rejected('err')
				}
				// #endif
				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sourceType: ["camera"],
					sizeType: ["original"],
					success: async (res) => {
						const resFile = res.tempFilePaths[0]
						// 解析二维码
						qrcode.decode(resFile)
						qrcode.callback = async (imgRes) => {
							if (imgRes === "error decoding QR Code") {
								this.$refs.uToast.show({
									type: 'error',
									message: this.$t(
										'cylinderMg.addCirculation.tips.errImg'
										)
								})
							} else {
								// 解析出来是对象
								resolved(imgRes)
							}
						}
					},
					fail(err) {
						rejected(err)
					}
				});
				// #endif
			})
		},
		// 扫码解析二维码
		async decodeQr() {
			return new Promise((resolved, rejected) => {
				// #ifdef APP-PLUS
				var result = await permision.requestAndroidPermission("android.permission.CAMERA")
				if (result === 1) {
					uni.scanCode({
						success: async (res) => {
							if (res.result) {
								const {
									returnValue: code
								} = await sysConfigParsingCodeKey({
									url: res.result,
								}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
								resolved(code)
							}
						},
						fail(err) {
							rejected(err)
						}
					});
				}else{
					rejected('err')
				}
				// #endif
				// #ifdef H5
				uni.chooseImage({
					count: 1,
					sourceType: ["camera"],
					sizeType: ["original"],
					success: async (res) => {
						const resFile = res.tempFilePaths[0]
						// 解析二维码
						qrcode.decode(resFile)
						qrcode.callback = async (imgRes) => {
							if (imgRes === "error decoding QR Code") {
								this.$refs.uToast.show({
									type: 'error',
									message: this.$t(
										'cylinderMg.addCirculation.tips.errImg'
										)
								})
							} else {
								// 解析出来是链接，通过链接查询二维码code
								const {
									returnValue: code
								} = await sysConfigParsingCodeKey({
										url: imgRes,
									}, this.$t('cylinderMg.addCirculation.loadTxt.finding'))
								resolved(code)
							}
						}
					},
					fail(err) {
						rejected(err)
					}
				});
				// #endif
			})
		},
	}
}
