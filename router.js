import Vue from 'vue'
import store from './store'
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
	routes:ROUTES //路由表
});
const whiteList = ['/pages/login/login', '/pages/secretKey/secretKey', '/pages/forgetPassword/forgetPassword'] // 路由白名单
//全局路由前置守卫
router.beforeEach(async(to, from, next) => {
	console.log('路由守卫')
	console.log(to)
	console.log(from)
	// 获取token
	const hasToken = store.getters.token
	console.log(hasToken)
	if (hasToken) {
		// token存在
		if (to.path === '/pages/login/login' || to.path === '/pages/secretKey/secretKey' || to.path === '/pages/forgetPassword/forgetPassword') {
			// 登录路由，重定向到首页
			next({ path: '/pages/index/index' })
		} else {
			// 获取权限(路由菜单)
			const hasRoles = store.getters.menu && store.getters.menu.length > 0
			if (hasRoles) {
				// 有权限
				console.log('有权限')
				next()
			} else {
				// 无权限
				try {
					// 请求权限
					const menu = await store.dispatch('user/getLoginList')
					console.log('无权限,去查权限')
					// replace: true 不会回退到登录页面，导航将不会留下历史记录
					next()
				} catch (error) {
					console.log(error)
					// 清空token
					await store.dispatch('user/resetToken')
					// 重定向到登录
					next(`/pages/login/login`)
				}
			}
		}
	} else {
		// token不存在
		if (whiteList.indexOf(to.path) !== -1) {
			// 检验路由是否在白名单
			next()
		} else {
			// 重定向到登录
			next(`/pages/login/login`)
		}
	}
	
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;