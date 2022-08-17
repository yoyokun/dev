// 页面跳转
export const navigateTo = (url, params = {}) => {
	let paramsStr = '';
	Object.keys(params).forEach(key => {
		paramsStr += key + '=' + params[key] + '&'
	})
	if (paramsStr != '') {
		paramsStr = paramsStr.substring(0, paramsStr.lastIndexOf('&'))
	}
	url += '?' + paramsStr
	if (url.includes('index/index') || url.includes('information/information') || url.includes('schedule/schedule') || url.includes('personal/personal')) {
		uni.switchTab({
		  url: url
		})
	} else {
		uni.navigateTo({
			url: url
		})
	}
}
/**
 * 数组去重
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
/**
 * 对象判空
 */
export function objectValueEmpty(obj, key) {
  return obj ? (obj[key] || '') : ''
}
// 字母和数字(过滤其他字符返回)
export function checkMix(val) {
  return val.replace(/[^\w]/g, '')
}