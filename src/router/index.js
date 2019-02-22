import Vue from 'vue'
import Router from 'vue-router'
import {routers,studentRouter,clubAdminRouter,unionAdminRouter,teacherAdminRouter} from "./router";

Vue.use(Router);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    // Hash是指#后的值改变，这只是浏览器滚动到锚点位置，对服务器端完全无用。但会在历史记录中留下痕迹，可通过后退按钮回到上一个位置。默认是Hash模式
    // 
    routes: routers
};

export const router=new Router(RouterConfig);