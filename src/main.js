// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
// 使用iconfont实现小图标
import "./style/iconfont.css"
//css文件要放前面，build后布局才不会乱
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
import ElementUI from 'element-ui'
import "./mock.js"
import axios from 'axios'
// 全局变量this.$axios访问axios,axios不能使用use方法
Vue.prototype.$axios=axios;
Vue.use(ElementUI)
// 全局引入
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts 

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {   // 使用钩子函数对路由进行权限跳转，next不能丢
	const token = localStorage.getItem('token');
　　if ( !token && to.path !== '/login' && to.path !== '/reg' ) {  // 如果用户不存在，并且访问的页面不是登录和注册，就前往登录页面
　　　　console.log("用户不存在，并且访问的页面不是登录和注册");
		next('/login');
　　} 
	else if (to.path=="/login" || to.path=="/reg"){
		console.log("访问登录或注册页面，清除ls");
		localStorage.clear();
		next();
	}
	else {
 		next();
　　}
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)//相当于上面两句
})
