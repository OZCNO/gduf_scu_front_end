// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router/index'
// 引入Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用iconfont实现小图标
import "./style/iconfont.css"
// 引入mock.js
require('mockJs')
import "./mock.js"

//引入axios
import axios from 'axios'
// 全局变量this.$axios访问axios,axios不能使用use方法
Vue.prototype.$axios=axios;

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)//相当于上面两句
})
