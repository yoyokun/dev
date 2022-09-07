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
 * 生成一个唯一的字符串
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
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
// 判断是否只有数字
export function isNumber(val) {
  const regPos = /^[0-9]*$/
	if(regPos.test(val)) {
		return true
	} else {
		return false
	}
}
// 只能输入金额，两位小数(过滤其他字符返回)(正数负数)
export function checkPrice(val) {
  if (val !== '' && val !== undefined && val !== null) {
    val = val.replace(/[^-\d.]/g, '') // 清除“数字”和“.”以外的字符
    val = val.replace(/^\./g, '') // 验证第一个字符是数字而不是.
    val = val.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的.
    val = val.replace(/\-{2,}/g, '-') // 只保留第一个- 清除多余的.
    val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    val = val.replace('-', '$#$').replace(/\-/g, '').replace('$#$', '-')
    val = val.replace('-.', '$#$').replace('$#$', '-')
    if (val.indexOf('-') > 0) {
      val = val.replace('-', '')
    }
    const re = /([0-9]+.[0-9]{2})[0-9]*/
    val = val.replace(re, '$1')
    if (val.indexOf('.') !== -1) {
      return val
    } else if (val.indexOf('-') !== -1) {
      return val
    } else {
      return val ? parseFloat(val) : ''
    }
  }
  return ''
}