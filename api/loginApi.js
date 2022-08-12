import { request } from '@/utils/request'
const baseURL = '/LPGManage'
// 定义登录账号的
// 登录
export function login(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/sysManager/checkLogin',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || false, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 退出登录
export function checkLogin(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/checkLogin',
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
// 根据token获取用户信息
export function sysManagerFindBytoken(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/findBytoken',
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
// 获取权限列表
export function sysAuthorityFindLoginList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysAuthority/findLoginList',
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
// 获取按钮权限列表
export function sysAuthorityFindLoginKeys(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysAuthority/findLoginKeys',
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
// 切换身份
export function sysManagerChangerIdentity(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/changerIdentity',
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
// 编辑个人信息
export function sysManagerEditManager(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/editManager',
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
// 修改手机号发送验证码
export function sysManagerEditPhoneSendCode(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/editPhoneSendCode',
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
// 确认修改手机号
export function sysManagerEditPhone(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/editPhone',
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
// 旧密码修改密码
export function sysManagerEditPwd(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/editPwd',
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
// 忘记密码发送验证码
export function sysManagerEditPwdSendCode(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/info/sysManager/editPwdSendCode',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || false, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 忘记密码
export function sysManagerEditPwdCode(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/info/sysManager/editPwdCode',
    method: 'post',
    data,
		message,
		custom: {
			auth: custom?.auth || false, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || true // catch返回
		}
  })
}
// 服务协议
export function sysConfigGetByKey(data = {}, message = '', custom = {}) {
	return request({
		url: baseURL + '/info/sysConfig/getByKey',
		method: 'POST',
		data,
		message,
		custom: {
			auth: custom?.auth || false, // 是否需要token
			toast: custom?.toast || true, // 弹框
			catch: custom?.catch || false // catch返回
		}
	})
}
// 管理员 保存或修改
export function sysManagerSaveOrEdit(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/control/sysManager/saveOrEdit',
    method: 'POST',
    data,
    message,
    custom: {
    	auth: custom?.auth || true, // 是否需要token
    	toast: custom?.toast || true, // 弹框
    	catch: custom?.catch || false // catch返回
    }
  })
}
// 管理员 删除
export function sysManagerDeleteByIds(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/control/sysManager/deleteByIds',
    method: 'POST',
    data,
    message,
    custom: {
    	auth: custom?.auth || true, // 是否需要token
    	toast: custom?.toast || true, // 弹框
    	catch: custom?.catch || false // catch返回
    }
  })
}
// 管理员  根据id查询信息
export function sysManagerFindById(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/findById',
    method: 'POST',
    data,
    message,
    custom: {
    	auth: custom?.auth || true, // 是否需要token
    	toast: custom?.toast || true, // 弹框
    	catch: custom?.catch || false // catch返回
    }
  })
}
// 管理员  根据条件查询列表信息 adminType=3 查询超级管理员
export function sysManagerFindList(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysManager/findList',
    method: 'POST',
    data,
    message,
    custom: {
    	auth: custom?.auth || true, // 是否需要token
    	toast: custom?.toast || true, // 弹框
    	catch: custom?.catch || false // catch返回
    }
  })
}
// 管理员  选择岗位角色
export function sysOrgWithRole(data = {}, message = '', custom = {}) {
  return request({
    url: baseURL + '/admin/info/sysOrg/withRole',
    method: 'POST',
    data,
    message,
    custom: {
    	auth: custom?.auth || true, // 是否需要token
    	toast: custom?.toast || true, // 弹框
    	catch: custom?.catch || false // catch返回
    }
  })
}