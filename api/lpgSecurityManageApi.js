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