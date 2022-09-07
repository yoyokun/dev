import { request } from '@/utils/request'
const baseURL = '/LPGManage'
/* 定义风险管控、入户安检、燃气泄漏报警等模块接口 */

// 风险单元 根据条件查询列表信息
export function riskUnitFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/riskUnit/findList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 根据条件查询列表信息
export function safeSecurityFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeSecurity/findList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 根据id查询信息
export function safeSecurityFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeSecurity/findById',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 保存或修改
export function safeSecuritySaveOrEdit(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/safeSecurity/saveOrEdit',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 删除
export function safeSecurityDeleteByIds(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/safeSecurity/deleteByIds',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 发起整改工单
export function safeSecurityCreateWork(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeSecurity/createWork',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 安检记录 我的安检记录
export function safeSecurityMyList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeSecurity/myList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 根据条件查询列表信息
export function safeRectifyFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeRectify/findList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 根据安检记录id查询整改详情
export function safeRectifyFindBySecurityId(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeRectify/findBySecurityId',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 根据id查询信息
export function safeRectifyFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeRectify/findById',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 保存或修改
export function safeRectifySaveOrEdit(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/safeRectify/saveOrEdit',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 作废整改记录
export function safeRectifyInvalidByIds(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/safeRectify/invalidByIds',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 删除
export function safeRectifyDeleteByIds(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/safeRectify/deleteByIds',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 整改记录 我的整改
export function safeRectifyMyList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/safeRectify/myList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 风险-巡检单 根据条件查询列表信息
export function riskPollingFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/riskPolling/findList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 风险-巡检单 根据id查询信息
export function riskPollingFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/riskPolling/findById',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 风险-巡检单 保存或修改
export function riskPollingSaveOrEdit(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/riskPolling/saveOrEdit',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 风险-巡检单 删除
export function riskPollingDeleteByIds(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/control/riskPolling/deleteByIds',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 风险-巡检单 我的巡检单
export function riskPollingMyList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sis/riskPolling/myList',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}