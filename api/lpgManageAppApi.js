import { request } from '@/utils/request'
const baseURL = '/LPGManage'
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
// 审批信息详情
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
// 审批抄送人
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
// 确定审批
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
// 获取商品信息
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
// 获取调价单信息
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
// 调价单商品
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
// 价格策略信息
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
// 获取价格策略商品信息
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
// 获取应收/付单详情
export function financeMoneyLogFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/financeMoneyLog/findById',
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
// 获取收款单详情
export function financeMoneyBillLogFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/financeMoneyBillLog/findById',
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
// 获取出入库单信息
export function stockBillLogFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/stockBillLog/findById',
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
// 获取资金期初信息
export function financeAccountRecordFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/financeAccountRecord/findById',
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
// 获取充装转换信息
export function fillingChangeLogFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/fillingChangeLog/findById',
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
// 获取退款单详情
export function salesOrderRefundFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/salesOrderRefund/findById',
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
// 获取退款单详情商品信息
export function salesOrderFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/salesOrder/findList',
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
// 获取退款单详情商品信息
export function salesBusinessFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/salesBusiness/findById',
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