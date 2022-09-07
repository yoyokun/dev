import {
	login,
	checkLogin,
	sysAuthorityFindLoginList,
	sysAuthorityFindLoginKeys,
	sysManagerFindBytoken
} from '@/api/loginApi'
import router from '@/router'

const state = {
	token: uni.getStorageSync('token') || '',
	userInfo: uni.getStorageSync('userInfo') || '',
	menu: [], // 所有菜单
	roles: [], // 按钮权限
	avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
		uni.setStorageSync('token', token)
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
		uni.setStorageSync('userInfo', userInfo)
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_MENU: (state, menu) => {
		state.menu = menu
	}
}

const actions = {
	// 登录
	login({ commit }, userInfo) {
		return new Promise((resolve, reject) => {
			login(userInfo).then(response => {
				const { returnValue } = response
				// 设置token
				commit('SET_TOKEN', returnValue.token)
				// 设置用户信息
				commit('SET_USERINFO', returnValue)
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 获取权限信息
	getLoginList({ commit, state }) {
		return new Promise(async(resolve, reject) => {
			try {
				const data = await sysManagerFindBytoken()
				// 设置用户信息
				commit('SET_USERINFO', data.returnValue)
				const response = await sysAuthorityFindLoginList({ type: 1, medium: '2' })
				// 获取到菜单为空
				if (!response.returnValue || response.returnValue.length === 0) {
					reject('无菜单')
				} else {
					// 获取按钮
					const res = await sysAuthorityFindLoginKeys({ medium: '2' })
					commit('SET_ROLES', res.returnValue)
					commit('SET_MENU', response.returnValue)
					// 返回菜单
					resolve(response.returnValue)
				}
			} catch (error) {
				reject(error)
			}
		})
	},
	// 退出登录
	logout({ commit, state, dispatch }) {
		return new Promise((resolve, reject) => {
			checkLogin(state.token).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_USERINFO', {})
				commit('SET_ROLES', [])
				commit('SET_MENU', [])
				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},
	// 清除token
	resetToken({ commit }) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_USERINFO', {})
			commit('SET_ROLES', [])
			commit('SET_MENU', [])
			resolve()
		})
	}
}

export default {
	namespaced: true, // 调用时要加文件名
	state,
	mutations,
	actions
}
