export function compareVersion(v1, v2) {
	v1 = v1.split('.')
	v2 = v2.split('.')
	const len = Math.max(v1.length, v2.length)
	while (v1.length < len) {
		v1.push('0')
	}
	while (v2.length < len) {
		v2.push('0')
	}
	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i], 10)
		const num2 = parseInt(v2[i], 10)

		if (num1 > num2) {
			return 1
		} else if (num1 < num2) {
			return -1
		}
	}
	return 0
}


export const getCanvas2d = () => {
	let {SDKVersion, uniPlatform} = uni.getSystemInfoSync()
	
	if(!uniPlatform) {
		// #ifdef MP-WEIXIN
		uniPlatform = 'mp-weixin'
		// #endif
		// #ifdef MP-MP-ALIPAY
		SDKVersion = my.SDKVersion
		uniPlatform = 'mp-alipay'
		// #endif
		// #ifdef MP-MP-ALIPAY
		uniPlatform = 'mp-toutiao'
		// #endif
	}
	
	const MAP = {
		'mp-weixin': '2.9.7',
		'mp-toutiao': '1.78.0',
		'mp-alipay': '2.7.0'
	}[uniPlatform]
	return MAP && SDKVersion && compareVersion(SDKVersion, MAP) >= 1
}

export const wrapEvent = (e) => {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

export const requestAnimationFrame = (cb) => {
	setTimeout(cb, 30)
}


/**
 * base64转路径
 * @param {Object} base64
 */
export function base64ToPath(base64) {
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
	return new Promise((resolve, reject) => {
		const bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
		bitmap.loadBase64Data(base64, () => {
			if (!format) {
				reject(new Error('ERROR_BASE64SRC_PARSE'))
			}
			const time = new Date().getTime();
			const filePath = `_doc/uniapp_temp/${time}.${format}`
			bitmap.save(filePath, {},
				() => {
					bitmap.clear()
					resolve(filePath)
				},
				(error) => {
					bitmap.clear()
					reject(error)
				})
		}, (error) => {
			bitmap.clear()
			reject(error)
		})
	})
}


export function sleep(delay) {
	return new Promise(resolve => setTimeout(resolve, delay))
}