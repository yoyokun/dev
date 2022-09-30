import moment from 'moment'
import toFixed from 'num-tofixed'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// 过滤 毫秒 转换成日期
export function dayjs(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
	if (dataStr) {
	    return moment(dataStr).format(pattern)
	  } else {
	    return ''
	  }
}
// 距离装换
export function distanceSwitch(distance) {
  if (distance < 1000) { return distance + '米' } else if (distance >= 1000) { return (Math.round(distance / 100) / 10).toFixed(2) + '公里' }
}
// 截取
export function cutOut(val, digits) {
  digits = digits || 2
  return toFixed(val, digits, false)
}
/**
 * 10000 => "10,000"
  千分号
 */
export function toThousandFilter(num) {
  // return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  if (num) {
    return num.toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  } else {
    return num
  }
}
// 千克转换吨,保留几位小数
export function KGTonne(val, digits) {
  digits = digits || 5
  return toFixed((val / 1000), digits, true)
}
// 四舍五入保留多少位,解决第三位不会四舍五入
export function rounded(val, digits) {
  val = Number(val) || 0
  digits = digits || 2
  return changeDecimalBuZero((toFixed(val, digits, true) - 0), digits)
}
// 小数位不够用0补齐
export function changeDecimalBuZero(val, digits) {
  digits = digits || 2
  var f_x = parseFloat(val)
  if (isNaN(f_x)) {
    return 0
  }
  let s_x = val.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + digits) {
    s_x += '0'
  }
  return s_x
}
// 截取字符串
export function stringSlice(val, digits = 2) {
	if (val) {
		  return val.slice(0,digits)
	} else {
		return ''
	}
}
// 图片转换
export function pictureJson(val,goodPath) {
	if(val && val.length){
		return JSON.parse(val)[0] ? JSON.parse(val)[0].url : goodPath
	}
	return goodPath
}
// 图片转换
export function pictureJsonParse(val, goodPath) {
	if(val && val.length){
		const data = JSON.parse(val)
		if(data.length) {
			return data
		} else {
			if(goodPath){
				return [{ url: goodPath }]
			}
			return []
		}
	} else {
		if(goodPath){
			return [{ url: goodPath }]
		}
		return []
	}
}
// 拼接地址
export function addressSplicing(obj) {
  if (obj) {
    let address = obj.province + obj.city + obj.area + obj.address
    if (obj.floor) {
      address += ',楼层：' + obj.floor
    }
    if (obj.doorplate) {
      address += ',门牌号：' + obj.doorplate
    }
    return address
  } else {
    return ''
  }
}
// 获取name值
export function getName(val,arr) {
  const findIndex = arr.findIndex(item => item.value === val)
	if (findIndex !== -1) {
		return arr[findIndex].name
	} else {
		return ''
	}
}
// 详情图片转换
export function pictureConversion(val) {
  const data = pictureJsonParse(val)
	data.forEach(v => {
	  v.extname = 'txt'
	})
	return data
}
// 提交时数组转换
export function isArrayToString(val) {
  return (Array.isArray(val) && val.length) ? JSON.stringify(val) : ''
}
