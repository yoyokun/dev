import { request } from '@/utils/request'
const baseURL = '/LPGManage'
/* 定义个人中心、信息管理、客户管理、商品管理、价格策略、钢瓶流转等公共模块接口 */

// 待办信息列表
export function sysTaskMyTaskApp(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysTask/myTaskApp',
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
// 审核任务 根据id查询信息
export function auditTaskFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/findById',
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
// 审核任务 获取审核设置抄送人员
export function auditLevelGetPushMans(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditLevel/getPushMans',
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
// 审核任务 审批任务
export function auditTaskAuditTask(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/auditTask',
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
// 商品管理 根据id查询信息
export function goodsFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/goods/findById',
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
// 调价单管理 根据id查询信息
export function pricePlanFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/pricePlan/findById',
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
// 调价单管理 查询商品
export function pricePlanDetailFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/pricePlanDetail/findList',
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
// 价格策略管理 根据id查询信息
export function priceStrategyFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/priceStrategy/findById',
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
// 商品管理 根据条件查询列表信息
export function goodsFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/goods/findList',
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
// 获取消息公告
export function sysMessageMyMessages(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysMessage/myMessages',
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
// 查阅消息
export function sysMessageReadMessage(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysMessage/readMessage',
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
// 要我审批
export function auditTaskWaitAuditTask(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/waitAuditTask',
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
// 审批历史
export function auditTaskHistoryTask(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/historyTask',
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
// 抄送给我
export function auditTaskCopyTask(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/copyTask',
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
// 我发起的
export function auditTaskInitiateTask(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/auditTask/initiateTask',
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
// 钢瓶流转记录 钢瓶流转记录
export function cylinderFlowFindFlowList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/cylinderFlow/findFlowList',
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
// 属性参数分类 分类属性选择器
export function sysPropertyClassifySelectPropertyBox(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysPropertyClassify/selectPropertyBox',
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
