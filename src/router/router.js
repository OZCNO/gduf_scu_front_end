import Home from "@/components/common/home.vue"
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/',
    name:"Login",
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
    component: resolve => { require(['@/components/login.vue'], resolve); }
};
export const regRouter = {
    path: '/reg',
    name:"Reg",
    component: resolve => { require(['@/components/Register.vue'], resolve); }
};
//student
export const studentRouter=[
    //个人中心
    {
        path:"student",
        name:"个人中心",
        title:"个人中心",
        icon: 'el-icon-star-off',
        component:Home,
        redirect:"/personCenter",
        children:[
            {
                path:"/personCenter",
                name:"个人信息",
                title:"个人信息",
                component:resolve=>{require(['@/components/student/center/personCenter.vue'],resolve);}
            },
            {
                path:"/personActivity",
                name:"个人活动情况",
                title:"个人活动情况",
                component:resolve=>{require(['@/components/student/center/personActivity.vue'],resolve);}
            }
        ]
    },
    //招新模块
    {
        path:"student",
        name:"招新模块",
        title:"招新模块",
        icon:"el-icon-menu",
        component:Home,
        redirect:"/instoduce",
        children:[
            {
                path:"/instroduce",
                name:"社联社团简介",
                title:"社联社团简介",
                component:resolve=>{require(['@/components/student/recruit/instroduce.vue'],resolve);}
            },
            {
                path:"/recruitActivity",
                name:"招新活动",
                title:"招新活动",
                component:resolve=>{require(['@/components/student/recruit/recruitActivity.vue'],resolve);}
            }
        ]
    },
    //活动模块
    {
        path:"student",
        name:"活动模块",
        title:"活动模块",
        icon:"el-icon-setting",
        component:Home,
        redirect:"",
        children:[
            {
                path:"/enrollActivity",
                name:"报名活动",
                title:"报名活动",
                component:resolve=>{require(['@/components/student/acitivity/enrollActivity.vue'],resolve);}
            },
            {
                path:"/onlineActivity",
                name:"线上活动",
                title:"线上活动",
                component:resolve=>{require(['@/components/student/acitivity/onlineActivity.vue'],resolve);}
            },
            {
                path:"/showActivity",
                name:"活动成果展",
                title:"活动成果展",
                component:resolve=>{require(['@/components/student/acitivity/showActivity.vue'],resolve);}
            }
        ]
    }
]
//clubAdminRouter
export const clubAdminRouter=[
    //成员管理模块
    {
        path: 'clubAdmin',
        name: '社团成员管理模块',
        title: '社团成员管理模块',
        icon: 'el-icon-star-off',
        component: Home,
        redirect:"/clubMemberAudit",
        children:[
            {
                path:"/clubMemberAudit",
                name:"社团会员审核",
                title:"社团会员审核",
                component:resolve=>{require(['@/components/club/memberManage/memberAudit.vue'],resolve);}
            },
            {
                path:"/clubMemberManage",
                name:"社团成员管理",
                title:"社团成员管理",
                component:resolve=>{require(['@/components/club/memberManage/memberManage.vue'],resolve);}
            }
        ]
    },
    //活动管理模块
    {
        path: 'clubAdmin',
        title: '社团活动管理模块',
        name: '社团活动管理模块',
        icon:"el-icon-menu",
        component: Home,
        redirect:"/clubActivityApplyPush",
        children:[
            {
                path:"/clubActivityApplyPush",
                name:"社团活动申请",
                title:"社团活动申请",
                component:resolve=>{require(['@/components/club/activityManage/activityApplyPush.vue'],resolve);}
            },
            {
                path:"/clubActivityPublish",
                name:"社团活动发布",
                title:"社团活动发布",
                component:resolve=>{require(['@/components/club/activityManage/activityPublish.vue'],resolve);}
            },
            {
                path:"/clubActivityEnroll",
                name:"社团活动报名",
                title:"社团活动报名",
                component:resolve=>{require(['@/components/club/activityManage/activityEnroll.vue'],resolve);}
            },
            {
                path:"/clubActivityMoneyPush",
                name:"经费情况提交",
                title:"经费情况提交",
                component:resolve=>{require(['@/components/club/activityManage/activityMoneyPush.vue'],resolve);}
            },
            {
                path:"/clubActivityResultPublish",
                name:"发布活动成果",
                title:"发布活动成果",
                component:resolve=>{require(['@/components/club/activityManage/activityResultPublish.vue'],resolve);}
            },
            {
                path:"/clubMoney",
                name:"经费",
                title:"经费",
                component:resolve=>{require(['@/components/club/activityManage/money.vue'],resolve);}
            },
            {
                path:"/clubActivity",
                name:"社团活动统计",
                title:"社团活动统计",
                component:resolve=>{require(['@/components/club/activityManage/clubActivity.vue'],resolve);}
            }
        ]
    },
    //年度注册表模块
    {
        path: 'clubAdmin',
        name: '年度注册表模块',
        title: '年度注册表模块',
        icon:"el-icon-setting",
        component: Home,
        redirect:"/clubReg",
        children:[
            {
                path:"/clubReg",
                name:"年度注册表提交",
                title:"年度注册表提交",
                component:resolve=>{require(['@/components/club/reg/clubReg.vue'],resolve);}
            }, 
        ]
    },
    //校社团简介模块
    {
        path: 'clubAdmin',
        name: '校社团简介模块',
        title: '校社团简介模块',
        component: Home,
        redirect:"/clubInstroduce",
        icon:"el-icon-setting",
        children:[
            {
                path:"/clubInstroduce",
                name:"校社团简介",
                title:"校社团简介",
                component:resolve=>{require(['@/components/club/instroduce/clubInstroduce.vue'],resolve);}
            }
        ]
    }
]
//unionAdminRouter
export const unionAdminRouter=[
    // 社联管理成员模块
    {
        path: 'unionAdmin',
        name: '成员管理模块',
        title: '成员管理模块',
        icon: 'el-icon-star-off',
        component: Home,
        redirect:"/officerAudit",
        children:[
            // 校社联成员管理
            {
                path:"/officerAudit",
                name:"干事审核",
                title:"干事审核",
                type:0,
                typeName:"校社联成员管理",
                component:resolve=>{require(['@/components/union/memberManage/officerAudit.vue'],resolve);}
            },
            {
                path:"/officerManage",
                name:"干事管理",
                title:"干事管理",
                type:1000,
                component:resolve=>{require(['@/components/union/memberManage/officerManage.vue'],resolve);}
            },
            // 校社团成员管理
            {
                path:"/clubManagers",
                name:"校社团管理员",
                title:"校社团管理员",
                type:1,
                typeName:"校社团成员管理",
                component:resolve=>{require(['@/components/union/memberManage/clubManagers.vue'],resolve);}
            },
            {
                path:"/clubMembers",
                name:"校社团人员统计",
                title:"校社团人员统计",
                type:1000,
                component:resolve=>{require(['@/components/union/memberManage/clubMembers.vue'],resolve);}
            }
        ]
    },
    //社联管理活动模块 
    {
        path: 'unionAdmin',
        name: '活动管理模块',
        title: '活动管理模块',
        icon:"el-icon-menu",
        component: Home,
        redirect:"/activityApplyPush",//默认重定向到这里
        children:[
        // 举办活动
            {
                // 斜杆要注意加，不然就找不到了
                path:"/activityApplyPush",
                name:"活动申请",
                title:"活动申请",
                type:0,
                typeName:"举办活动",
                component:resolve=>{require(['@/components/union/activityManage/activityApplyPush.vue'],resolve);}
            },
            {
                path:"/activityPublish",
                name:"活动发布",
                title:"活动发布",
                type:0,
                component:resolve=>{require(['@/components/union/activityManage/activityPublish.vue'],resolve);}
            },
            {
                path:"/activityEnroll",
                name:"活动报名情况",
                title:"活动报名情况",
                type:0,
                component:resolve=>{require(['@/components/union/activityManage/activityEnroll.vue'],resolve);}
            },
            {
                path:"/activityMoneyPush",
                name:"经费详情提交",
                title:"经费详情提交",
                type:0,
                component:resolve=>{require(['@/components/union/activityManage/activityMoneyPush.vue'],resolve);}
            },
            {
                path:"/activityResultPublish",
                name:"活动成果发布",
                title:"活动成果发布",
                type:1000,
                component:resolve=>{require(['@/components/union/activityManage/activityResultPublish.vue'],resolve);}
            },
        // 数据统计
            {
                path:"/unionMoney",
                name:"保管金查看",
                title:"保管金查看",
                type:1,
                typeName:"数据统计",                
                component:resolve=>{require(['@/components/union/activityManage/unionMoney.vue'],resolve);}
            },
            {
                path:"/unionActivity",
                name:"活动统计情况",
                title:"活动统计情况",
                type:1000,
                component:resolve=>{require(['@/components/union/activityManage/unionActivity.vue'],resolve);}
            }
        ]
    },
    // 社联管理社团模块
    {
        path: 'unionAdmin',
        name: '校社团管理模块',
        title: '校社团管理模块',
        icon:"el-icon-setting",
        component: Home,
        redirect:"/clubActivityAudit",//默认重定向到这里
        children:[
            {
                path:"/clubActivityAudit",
                name:"活动审核",
                title:"活动审核",
                component:resolve=>{require(['@/components/union/clubManage/clubActivityAudit.vue'],resolve);}
            },
            {
                path:"/clubMoneyManage",
                name:"保管金管理",
                title:"保管金管理",
                component:resolve=>{require(['@/components/union/clubManage/clubMoneyManage.vue'],resolve);}
            },
            {
                path:"/clubMoneyUseCheck",
                name:"活动经费使用表",
                title:"活动经费使用表",
                component:resolve=>{require(['@/components/union/clubManage/clubMoneyUseCheck.vue'],resolve);}
            },
            {
                path:"/clubRegAudit",
                name:"年度注册表审核",
                title:"年度注册表审核",
                component:resolve=>{require(['@/components/union/clubManage/clubRegAudit.vue'],resolve);}
            }
        ]
    },
    //社联简介
    {
        path: 'unionAdmin',
        name: '校社联简介模块',
        title: '校社联简介模块',
        icon:"el-icon-setting",
        component: Home,
        redirect:"/unionInstroduce",//默认重定向到这里
        children:[
            {
                path:"/unionInstroduce",
                name: '校社联简介',
                title: '校社联简介',
                component:resolve=>{require(['@/components/union/instroduce/unionInstroduce.vue'],resolve);}
            }
        ]
    }
]
//teacherAdminRouter
export const teacherAdminRouter=[
    // 社联管理成员模块
    {
        path: 'teacherAdmin',
        name: '校社联管理模块',
        title: '校社联管理模块',
        icon: 'el-icon-star-off',
        component: Home,
        redirect:"/unionActivityAudit",
        children:[
            {
                path:"/unionActivityAudit",
                name:"校社联活动审核",
                title:"校社联活动审核",
                component:resolve=>{require(['@/components/teacher/unionManage/unionActivityAudit.vue'],resolve);}
            },
            {
                path:"/unionMoneyUseCheck",
                name:"校社联活动经费表",
                title:"校社联活动经费表",
                component:resolve=>{require(['@/components/teacher/unionManage/unionMoneyUseCheck.vue'],resolve);}
            },
            {
                path:"/unionRegAudit",
                name:"校社联年度注册表审核",
                title:"校社联年度注册表审核",
                component:resolve=>{require(['@/components/teacher/unionManage/unionRegAudit.vue'],resolve);}
            },
            {
                path:"/unionMoneyManage",
                name:"校社联保管金",
                title:"校社联保管金",
                component:resolve=>{require(['@/components/teacher/unionManage/unionMoneyManage.vue'],resolve);}
            }
        ]
    },
    {
        path: 'teacherAdmin',
        name: '统计模块',
        title: '统计模块',
        icon:"el-icon-menu",
        component: Home,
        redirect:"/statistics",
        children:[
            {
                path:"/statistics",
                name:"活动统计总情况",
                title:"活动统计总情况",
                component:resolve=>{require(['@/components/teacher/statistics/statistics.vue'],resolve);}
            },
        ]
    }
]
export const routers = [
    loginRouter,
    regRouter,
    ...studentRouter,
    ...clubAdminRouter,
    ...unionAdminRouter,
    ...teacherAdminRouter
];
