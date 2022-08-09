import { request } from '@/utils/request'
const baseURL = '/LPGManage'
// 确定审批
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