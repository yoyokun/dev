import {
	request
} from '@/utils/request'
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
// 属性参数管理 根据type查询平台默认属性数据
export function sysPropertyFindDefaultProperty(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysProperty/findDefaultProperty',
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
// 审核设置单据列表  根据条件查询列表信息
export function auditFormFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditForm/findList',
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
// 二维码管理 根据key查询信息
export function assetCodeFindByKey(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/assetCode/findByKey',
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
// 二维码管理 保存或修改
export function assetCodeSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/assetCode/saveCodeKey',
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
// 供应商列表 根据条件查询列表信息
export function purSupplierFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/purSupplier/findList',
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
// 钢瓶型号管理 根据条件查询列表信息
export function sysSpecificationFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysSpecification/findList',
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
// 钢瓶档案 根据条件查询列表信息
export function cylinderArchivesFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/cylinderArchives/findList',
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
// 钢瓶档案 根据id查询信息
export function cylinderArchivesFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/cylinderArchives/findById',
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
// 钢瓶档案 保存或修改
export function cylinderArchivesSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/cylinderArchives/saveOrEdit',
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
// 钢瓶档案 删除
export function cylinderArchivesDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/cylinderArchives/deleteByIds',
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
// 数据字典 根据条件查询列表信息
export function sysFieldFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysField/findList',
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
// 组织  根据条件查询列表信息
export function sysOrgFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysOrg/findList',
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
// 组织 根据id查询信息
export function sysOrgFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysOrg/findById',
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
// 组织 保存或修改
export function sysOrgSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysOrg/saveOrEdit',
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
// 组织 修改状态
export function sysOrgUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/sysOrg/updateState',
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
// 工单管理 根据条件查询列表信息
export function auditWorkFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditWork/findList',
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
// 工单管理 根据id查询信息
export function auditWorkFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditWork/findById',
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
// 工单管理 保存或修改
export function auditWorkSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/auditWork/saveOrEdit',
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
// 工单管理 删除
export function auditWorkDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/auditWork/deleteByIds',
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
// 工单管理 作废
export function auditWorkInvalidWork(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/auditWork/invalidWork',
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
// 工单管理 分派
export function auditWorkAssignWork(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/auditWork/assignWork',
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
// 工单管理 我的工单
export function auditWorkMyWorks(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditWork/myWorks',
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
// 工单管理 拒绝工单
export function auditWorkRefuseWork(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditWork/refuseWork',
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
// 工单管理 接受工单
export function auditWorkAcceptWork(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditWork/acceptWork',
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
// 客户管理 删除
export function userCustomerDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCustomer/deleteByIds',
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
// 客户管理 保存或修改
export function userCustomerSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCustomer/saveOrEdit',
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
// 客户结算信息 保存修改
export function userSettlementSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userSettlement/saveOrEdit',
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
// 客户管理 客户编号查重
export function userCustomerCheckCustomerNo(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/checkCustomerNo',
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
// 客户管理 登录手机号查重
export function userCustomerCheckAccount(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/checkAccount',
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
// 客户管理 授权组织使用客户数据
export function userCustomerGrantOrgUse(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/grantOrgUse',
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
// 客户管理 客户详情(含默认信息)
export function userCustomerfindByIdDefault(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/findById_default',
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
// 客户管理 修改客户状态
export function userCustomerUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCustomer/updateState',
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
// 客户联系人 根据条件查询列表信息
export function userContactFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userContact/findList',
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
// 客户联系人 保存或修改
export function userContactSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userContact/saveOrEdit',
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
// 客户联系人 删除
export function userContactDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userContact/deleteByIds',
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
// 客户联系人 根据id查询信息
export function userContactFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userContact/findById',
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
// 客户联系人 设置为默认联系人
export function userContactSetIsDefault(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userContact/setIsDefault',
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
// 客户地址 根据条件查询列表信息
export function userAddressFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userAddress/findList',
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
// 客户地址 根据条件查询列表信息 距离
export function userAddressFindListForDistance(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userAddress/findListForDistance',
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
// 客户地址 根据id查询信息
export function userAddressFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userAddress/findById',
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
// 客户地址 设置为默认地址
export function userAddressSetIsDefault(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userAddress/setIsDefault',
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
// 客户地址 保存或修改
export function userAddressSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userAddress/saveOrEdit',
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
// 客户地址 删除
export function userAddressDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userAddress/deleteByIds',
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
// 价格策略管理 获取客户某个商品的价格策略配置
export function priceStrategyFindCustomerSalesPriceList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/priceStrategy/findCustomerSalesPriceList',
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
// 价格策略管理 更新客户某个商品的价格策略配置
export function priceStrategyUpdateCustomerPriceStrategyState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/priceStrategy/updateCustomerPriceStrategyState',
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
// 客户管理 客户列表
export function userCustomerFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/findList',
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
// 钢瓶盘点记录 根据id查询信息
export function userCylinderCheckFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCylinderCheck/findById',
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
// 钢瓶盘点记录 左侧客户数据
export function userCylinderCheckFindCustomerIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCylinderCheck/findCustomerIds',
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
// 品牌列表查询
export function sysBrandFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysBrand/findList',
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
// 商品分类管理 列表
export function goodsClassifyFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/goodsClassify/findList',
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
// 客户钢瓶汇总列表
export function findCustomerCylinderList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/findCustomerCylinderList',
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
// 钢瓶盘点记录 根据条件查询列表信息
export function userCylinderCheckFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCylinderCheck/findList',
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
// 审核任务 撤回任务(具体功能列表)
export function auditTaskRecallTaskByLinkId(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/auditTask/recallTaskByLinkId',
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
// 钢瓶盘点记录 修改状态
export function userCylinderCheckUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCylinderCheck/updateState',
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
// 钢瓶盘点记录 删除
export function userCylinderCheckDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCylinderCheck/deleteByIds',
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
// 钢瓶盘点记录 作废
export function userCylinderCheckToVoid(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCylinderCheck/toVoid',
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
// 钢瓶盘点记录 保存或修改
export function userCylinderCheckSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/userCylinderCheck/saveOrEdit',
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

// 关联单据管理 查询关联单据信息
export function sysLinkBillFindLinkBillList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysLinkBill/findLinkBillList',
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
// 关联单据管理 根据条件查询列表信息
export function sysLinkBillFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysLinkBill/findList',
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
// 钢瓶流转记录 钢瓶流转信息
export function cylinderFlowFindArchivesInfoByFlow(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/cylinderFlow/findArchivesInfoByFlow',
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
// 钢瓶档案 根据codeKey查询钢瓶档案
export function cylinderArchivesFindByCodeKey(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/cygm/cylinderArchives/findByCodeKey',
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
// 客户管理 客户详情(含列表信息)
export function userCustomerFindByIdList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomer/findById_list',
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
// 钢瓶流转记录 钢瓶扫码
export function cylinderFlowScanCodeByType(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/control/cylinderFlow/scanCodeByType',
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
// 车辆信息 根据车牌号查询信息
export function carVehicleFindByLicenseNo(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/carVehicle/findByLicenseNo',
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
// 人员选择器
export function sysOrgWithEmp(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysOrg/withEmp',
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
// 管理员  根据id查询信息
export function sysManagerFindById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysManager/findById',
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
// 二维码  充装更改状态
export function assetCodeFillingState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/assetCode/fillingState',
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

// 消息管理 系统消息查阅
export function sysMessageHistoryDataById(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysMessage/historyDataById',
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
