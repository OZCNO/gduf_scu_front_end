import Main from "@/components/main.vue";

// 不作为Main组件的子页面展示的页面单独写，如下
// export const loginRouter = {
//     path: '/',
//     name: 'login',
//     meta: {
//         title: 'Login - 登录'
//     },
//     component: resolve => { require(['@/components/login.vue'], resolve); }
// };
//作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter={
	path:"/",
	name:"otherRouter",
	redirect:"/login",//默认到这里
	component:Main,
	children:[
		{ path: 'login', name: 'Login',component: resolve => { require(['@/components/login.vue'], resolve); }},
		{ path: 'register', name: 'Reg',component: resolve => { require(['@/components/register.vue'], resolve); }},
		{ path: 'club', name: 'Index1',component: resolve => { require(['@/components/index1.vue'], resolve); }},
		{ path: 'test', name: 'Index2',component: resolve => { require(['@/components/index2.vue'], resolve); }},
	]
}
export const routers = [
    // loginRouter,
    otherRouter
];
