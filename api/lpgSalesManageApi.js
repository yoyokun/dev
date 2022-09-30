import {
	request
} from '@/utils/request'
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

// 供应商报价 获取已经报价列表
export function purSupplierOfferContrastList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/purSupplierOffer/contrastList',
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

// 客户钢瓶汇总列表 查询钢瓶商品详情-【某个客户钢瓶情况】
export function findCylinderListByCustomerId(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesOrderCylinder/findCylinderListByCustomerId',
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

// 客户钢瓶汇总列表 查询钢瓶商品详情-【某个客户钢瓶情况】
export function userCustomerStockLogFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/userCustomerStockLog/findList',
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

// 库存管理/出入库单记录 根据条件查询列表信息
export function stockBillLogFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/stockBillLog/findList',
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

// 根据单号查询订单信息
export function sysLinkBillFindLinkBillObject(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysLinkBill/findLinkBillObject',
		method: "post",
		data,
		message,
		custom: {
			auth: custom?.auth || true, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
	})
}

// 出入库根据条件查询列表信息
export function stockInoutReasonFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/stockInoutReason/findList',
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

// 库存管理/出入库单记录 保存或修改
export function stockBillLogSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockBillLog/saveOrEdit',
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

// 库存管理/出入库单记录 删除
export function stockBillLogDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockBillLog/deleteByIds',
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
// 库存管理/出入库单记录 修改状态
export function stockBillLogUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockBillLog/updateState',
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
// 库存管理/出入库单记录 作废
export function stockBillLogToVoid(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockBillLog/toVoid',
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

// 库存盘点管理 根据条件查询列表信息
export function stockCheckLogFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/stockCheckLog/findList',
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

// 库存盘点管理 保存或修改
export function stockCheckLogSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockCheckLog/saveOrEdit',
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
// 库存盘点管理 删除
export function stockCheckLogDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockCheckLog/deleteByIds',
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
// 库存盘点管理 作废
export function stockCheckLogToVoid(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockCheckLog/toVoid',
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
// 库存盘点管理 修改状态
export function stockCheckLogUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/stockCheckLog/updateState',
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
// 充装统计-按商品属性-(用户充装转换页面)
export function fillingLogFindGoodsDataList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/fillingLog/findGoodsDataList',
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

// 充装转换管理 保存或修改
export function fillingChangeLogSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/fillingChangeLog/saveOrEdit',
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

// 充装转换管理 根据条件查询列表信息
export function fillingChangeLogFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/fillingChangeLog/findList',
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
// 库存管理/商品库存管理 库存实时查询(库存查询)
export function stockGoodsInoutLogFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/stockGoodsInoutLog/findList',
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
// 充装转换管理 修改状态
export function fillingChangeLogUpdateState(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/fillingChangeLog/updateState',
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
// 充装转换管理 作废
export function fillingChangeLogToVoid(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/fillingChangeLog/toVoid',
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
// 充装转换管理 删除
export function fillingChangeLogDeleteByIds(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/fillingChangeLog/deleteByIds',
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
// 销售子单模板管理 根据条件查询列表信息
export function salesOrderTemplateFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesOrderTemplate/findList',
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
// 销售子单模板管理 获取子单模板详情
export function salesOrderTemplateFindDataByTemplate(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesOrderTemplate/findDataByTemplate',
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
// 业务单管理 根据条件查询列表信息
export function salesBusinessFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesBusiness/findList',
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
// 收费项管理 根据条件查询列表信息
export function salesPayItemsFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesPayItems/findList',
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
// 模块通用设置管理 根据单个组织id查询调拨单设置信息
export function moduleCommonSetFindByOrgId(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/moduleCommonSet/findByOrgId',
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
// 获取钢瓶规格
export function sysSpecificationClassifySelectPropertyBox(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/info/sysSpecificationClassify/selectPropertyBox',
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
// 调拨单管理 根据条件查询列表信息
export function salesTransferFindList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/salesTransfer/findList',
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
// 查询优惠券号是否可用
export function couponFindCouponToVerify(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/coupon/findCouponToVerify',
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
// 销售订单管理 销售开单
export function salesOrderSaveOrEdit(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/control/salesOrder/saveOrEdit',
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
// 根据客户查询可使用的优惠券
export function couponFindCustomerCouponList(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/admin/sales/coupon/findCustomerCouponList',
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