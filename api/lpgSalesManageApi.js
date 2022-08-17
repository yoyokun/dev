import { request } from '@/utils/request'
const baseURL = '/LPGManage'
/* 定义销售业务、库存管理、财务管理、采购管理等模块接口 */

// 业务单管理 根据id查询信息
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
// 资金账号支取记录 根据id查询信息
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
// 应收单/应付单管理 根据id查询信息
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
// 收款单/付款单 根据id查询信息
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
// 库存盘点管理 根据id查询信息
export function stockCheckLogFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/stockCheckLog/findById',
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
// 采购入库单 根据id查询信息
export function purInStorageFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/purInStorage/findById',
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
// 充装转换管理 根据id查询信息
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
// 销售订单管理 根据id查询信息
export function salesOrderFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/salesOrder/findById',
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
// 库存管理/出入库单记录 根据id查询信息
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
// 订单退款管理 根据id查询信息
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
// 销售订单管理 根据条件查询列表信息
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

// 商品采购申请 根据id查询信息
export function purApplyFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/purApply/findById',
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

// 采购单 根据id查询信息
export function purOrderFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/purOrder/findById',
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

// 采购计划详情列表 根据id查询信息
export function purPlanFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/purPlan/findById',
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

// 优惠券管理 根据id查询信息
export function couponFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/coupon/findById',
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

// 优惠券详情  根据条件查询列表信息
export function couponDetailFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/sales/couponDetail/findList',
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