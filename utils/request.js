import {
	base,
	fileUpload
} from '@/utils/config'
import store from '@/store'

function service(options = {}) {
	// 显示头部动画
	uni.showNavigationBarLoading()
	// 加载时候提示文字
	if (options.message) {
		uni.showLoading({
			title: options.message
		})
	}
	// 配置请求头
	options.header = {
		'content-type': 'application/x-www-form-urlencoded',
	}
	if (options?.custom?.auth) {
		// 是否需要token
		options.header.token = store.getters.token
		if(!options.header.token){
			uni.showModal({
				title: '提示',
				content: '请登录',
				showCancel: false,
				success: (param) => {
					if (param.confirm) {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				}
			})
		}
	}
	// 微信小程序添加域名
	// #ifdef MP-WEIXIN
	options.url = base + options.url
	// #endif
	
	// app添加域名
	// #ifdef APP-PLUS
	const base64Url = uni.getStorageSync('secretKey')
	if (!base64Url) {
		uni.showModal({
			title: '提示',
			content: '请设置密钥',
			showCancel: false,
			success: (modalRes) => {
				if (modalRes.confirm) {
						store.dispatch('user/resetToken')
						uni.reLaunch({
							url: '/pages/secretKey/secretKey'
						})
				} else if (modalRes.cancel) {
					console.log('用户点击取消');
				}
			}
		})
	}
	options.url = `http://${atob(base64Url)}${options.url}`
	console.log(options.url)
	// #endif

	return new Promise((resolved, rejected) => {
		// 成功
		options.success = (response) => {
			if (response.statusCode === 200) {
				const {
					code,
					message,
					isSuccess
				} = response.data
				if (code !== '-1' && isSuccess) {
					// 请求成功
					resolved(response.data)
				} else {
					// 错误提示
					if (options?.custom?.toast) {
						uni.$u.toast(message || 'Error')
					}
					// 如果需要catch返回，则进行reject
					if (options?.custom?.catch) {
						rejected(response.data) // 错误
					} else {
						// 否则返回一个pending中的promise，请求不会进入catch中
						return new Promise(() => {})
					}
				}
			} else if (response.statusCode === 409) {
				uni.$u.toast('系统未获得授权')
				rejected('系统未获得授权') // 错误
			} else if (response.statusCode === 404) {
				uni.showModal({
					title: '提示',
					content: '秘钥无效',
					showCancel: false,
					success: (param) => {
						if (param.confirm) {
							store.dispatch('user/resetToken')
							uni.reLaunch({
								url: '/pages/secretKey/secretKey'
							})
						}
					}
				})
				rejected('秘钥无效') // 错误
			} else if (response.statusCode === 406) {
				uni.showModal({
					title: '提示',
					content: '登录失效，请重新登录',
					showCancel: false,
					success: (param) => {
						if (param.confirm) {
							store.dispatch('user/resetToken')
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
				rejected('登录失效，请重新登录') // 错误
			}
		}
		// 错误
		options.fail = (err) => {
			uni.showToast({
				title: '网络连接失败',
				icon: 'none',
				duration: 2000,
				image: '../../static/image/nonetwork.png'
			})
			rejected(err) // 错误
		}
		options.complete = () => {
			uni.hideNavigationBarLoading() // 隐藏头部请求动画
			if (options.message) {
				uni.hideLoading() // 隐藏请求提示语
			}
		}
		uni.request(options)
	})
}
// 上传图片
function uploadFileImg(filePath) {
	return new Promise((resolve, reject) => {
		let url = '/LPGFilesManageService/admin/fileUploadLog/saveOrEdit'
		// #ifdef APP-PLUS
		url = fileUpload + url
		// #endif
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			url: url,
			filePath: filePath,
			header: {
				'token': store.getters.token
			},
			formData: {
				creator: store.getters.userInfo.name
			},
			name: 'file',
			success: function(res) {
				const data = JSON.parse(res.data)
				if (data.isSuccess) {
					resolve(data)
				} else {
					reject(data)
				}
			},
			fail: function(res) {
				reject(res)
			},
			complete: function(res) {
				uni.hideLoading()
			}
		})
	})
}
export {
	service as request,
	uploadFileImg
}
