import store from './store'
import {
	RouterMount,
	createRouter
} from 'uni-simple-router'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerErrorEach: ({
		type,
		level,
		...args
	}) => {
		// #ifdef APP-PLUS
		if (type === 3) {
			router.$lockStatus = false;
			const pages = getCurrentPages();
			const currentPage = pages[pages.length - 1];
			if (level == 1 && args.uniActualData.from === 'backbutton') {
				if (currentPage.$page.meta.isQuit) {
					uni.showModal({
						title: '提示',
						content: '您确定要退出应用吗？',
						success: function(res) {
							if (res.confirm) {
								plus.runtime.quit();
							}
						}
					});
				}
			}
		}
		// #endif
	},
	routes: [...ROUTES, {
		path: '/',
		redirect: '/pages/login/login'
	}]
});


const whiteList = ['/pages/login/login', '/pages/secretKey/secretKey', '/pages/forgetPassword/forgetPassword'] // 路由白名单
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	console.log('路由守卫')
	console.log(to)
	console.log(from)
	// 获取token
	const hasToken = store.getters.token
	console.log(hasToken)
	if (hasToken) {
		// token存在
		if (to.path === '/pages/login/login' || to.path === '/pages/secretKey/secretKey' || to.path ===
			'/pages/forgetPassword/forgetPassword') {
			// 登录路由，重定向到首页
			next({
				path: '/pages/index/index'
			})
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
					console.log('无权限,去查权限')
					const menu = await store.dispatch('user/getLoginList')
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

	// next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export {
	router,
	RouterMount
}
