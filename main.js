import Vue from 'vue'
import App from './App'
import router from './router'
import { RouterMount } from 'uni-simple-router'
import VueI18n from 'vue-i18n'  
// 引入vuex
import store from './store'
import * as filters from './common/filters' // 全局过滤器
import mixin from './common/mixin' // 全局mixin
import * as utils from "./utils"
import { VueJsonp } from 'vue-jsonp'
import directive from '@/common/permission/index.js'
// 拖动排序
import VueDraggable from '@/common/vuedraggable/src/vuedraggable'
// 计算
var BigDecimal = require('js-big-decimal')
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$bigDecimal = BigDecimal
Vue.prototype.$navigateTo = utils.navigateTo; // 跳转页面
// 给原型链上增加一个分割字符串的方法
// eslint-disable-next-line no-extend-native
String.prototype.Split = function(s) {
  return this.split(s).filter(item => item !== '')
}

Vue.component('draggable', VueDraggable)

App.mpType = 'app'
Vue.use(directive) // 按钮权限指令
Vue.use(uView)
Vue.use(VueJsonp)
// 国际化
Vue.use(VueI18n)
const i18n = new VueI18n({  
  locale: 'zh-CN',  // 默认选择的语言
	messages: {
		'zh-CN': require('./common/lang/zh'),   // 中文语言包
		'en-US': require('./common/lang/en')    // 英文语言包
	}
}) 
// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 挂载过滤器转换方法
Vue.prototype.filterMethod = function(val, key) {
  return this.$options.filters[key](val)
}
// 全局mixin
Vue.mixin(mixin)

const app = new Vue({
	i18n,
	store,
	...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
