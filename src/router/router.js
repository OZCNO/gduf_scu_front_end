import Student from "@/components/student.vue"
import ClubAdmin from "@/components/clubAdmin.vue"
import UnionAdmin from "@/components/unionAdmin.vue"
import TeacherAdmin from "@/components/TeacherAdmin.vue"
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/',
    name: 'Login',
    meta: {
        title: 'Login - 登录'
    },
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
    component: resolve => { require(['@/components/login.vue'], resolve); }
};
export const regRouter = {
    path: '/Register',
    name: 'Reg',
    meta: {
        title: 'Register - 注册'
    },
    component: resolve => { require(['@/components/Register.vue'], resolve); }
};
//student
export const studentRouter=[
    //个人中心
    {
        path:"student",
        name:"个人中心",
        component:Student,
        redirect:"/changePsd",
        children:[
            {
                path:"/changePsd",
                name:"修改密码",
                component:resolve=>{require(['@/components/student/center/changePsd.vue'],resolve);}
            },
            {
                path:"/personCenter",
                name:"个人信息",
                component:resolve=>{require(['@/components/student/center/personCenter.vue'],resolve);}
            },
            {
                path:"/personActivity",
                name:"个人活动情况",
                component:resolve=>{require(['@/components/student/center/personActivity.vue'],resolve);}
            }
        ]
    },
    //招新模块
    {
        path:"student",
        name:"招新模块",
        component:Student,
        redirect:"/instoduce",
        children:[
            {
                path:"/instroduce",
                name:"社联社团简介",
                component:resolve=>{require(['@/components/student/recruit/instroduce.vue'],resolve);}
            },
            {
                path:"/recruitActivity",
                name:"招新活动",
                component:resolve=>{require(['@/components/student/recruit/recruitActivity.vue'],resolve);}
            }
        ]
    },
    //活动模块
    {
        path:"student",
        name:"活动模块",
        component:Student,
        redirect:"",
        children:[
            {
                path:"/enrollActivity",
                name:"报名活动",
                component:resolve=>{require(['@/components/student/acitivity/enrollActivity.vue'],resolve);}
            },
            {
                path:"/onlineActivity",
                name:"线上活动",
                component:resolve=>{require(['@/components/student/acitivity/onlineActivity.vue'],resolve);}
            },
            {
                path:"/showActivity",
                name:"活动成果展",
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
        component: ClubAdmin,
        redirect:"/clubMemberAudit",
        children:[
            {
                path:"/clubOfficerAudit",
                name:"校社团干事审核",
                component:resolve=>{require(['@/components/club/memberManage/officerAudit.vue'],resolve);}
            },
            {
                path:"/clubOfficerManage",
                name:"校社团干事管理",
                component:resolve=>{require(['@/components/club/memberManage/officerManage.vue'],resolve);}
            },
            {
                path:"/clubMemberAudit",
                name:"校社团会员审核",
                component:resolve=>{require(['@/components/club/memberManage/memberAudit.vue'],resolve);}
            },
            {
                path:"/clubMemberManage",
                name:"校社团会员管理",
                component:resolve=>{require(['@/components/club/memberManage/memberManage.vue'],resolve);}
            }
        ]
    },
    //活动管理模块
    {
        path: 'clubAdmin',
        name: '社团活动管理模块',
        component: ClubAdmin,
        redirect:"/clubActivityApplyPush",
        children:[
            {
                path:"/clubActivityApplyPush",
                name:"活动申请",
                component:resolve=>{require(['@/components/club/activityManage/activityApplyPush.vue'],resolve);}
            },
            {
                path:"/clubActivityPublish",
                name:"活动发布",
                component:resolve=>{require(['@/components/club/activityManage/activityPublish.vue'],resolve);}
            },
            {
                path:"/clubActivityEnroll",
                name:"活动报名",
                component:resolve=>{require(['@/components/club/activityManage/activityEnroll.vue'],resolve);}
            },
            {
                path:"/clubActivityMoneyPush",
                name:"经费情况提交",
                component:resolve=>{require(['@/components/club/activityManage/activityMoneyPush.vue'],resolve);}
            },
            {
                path:"/clubActivityResultPublish",
                name:"发布活动成果",
                component:resolve=>{require(['@/components/club/activityManage/activityResultPublish.vue'],resolve);}
            },
            {
                path:"/clubMoney",
                name:"经费",
                component:resolve=>{require(['@/components/club/activityManage/money.vue'],resolve);}
            },
            {
                path:"/clubActivity",
                name:"社团活动统计",
                component:resolve=>{require(['@/components/club/activityManage/clubActivity.vue'],resolve);}
            }
        ]
    },
    //年度注册表模块
    {
        path: 'clubAdmin',
        name: '年度注册表模块',
        component: ClubAdmin,
        redirect:"/clubReg",
        children:[
            {
                path:"/clubReg",
                name:"年度注册表提交",
                component:resolve=>{require(['@/components/club/reg/clubReg.vue'],resolve);}
            }, 
        ]
    },
    //校社团简介模块
    {
        path: 'clubAdmin',
        name: '校社团简介模块',
        component: ClubAdmin,
        redirect:"/clubInstroduce",
        children:[
            {
                path:"/clubInstroduce",
                name:"校社团简介",
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
        component: UnionAdmin,
        redirect:"/officerAudit",
        children:[
            {
                path:"/officerAudit",
                name:"校社联干事审核",
                component:resolve=>{require(['@/components/union/memberManage/officerAudit.vue'],resolve);}
            },
            {
                path:"/officerManage",
                name:"校社联干事管理",
                component:resolve=>{require(['@/components/union/memberManage/officerManage.vue'],resolve);}
            },
            {
                path:"/clubManagers",
                name:"校社团管理员",
                component:resolve=>{require(['@/components/union/memberManage/clubManagers.vue'],resolve);}
            },
            {
                path:"/clubMembers",
                name:"校社团人员统计",
                component:resolve=>{require(['@/components/union/memberManage/clubMembers.vue'],resolve);}
            }
        ]
    },
    //社联管理活动模块 
    {
        path: 'unionAdmin',
        name: '活动管理模块',
        component: UnionAdmin,
        redirect:"/activityApplyPush",//默认重定向到这里
        children:[
            {
                // 斜杆要注意加，不然就找不到了
                path:"/activityApplyPush",
                name:"申请举办活动",
                component:resolve=>{require(['@/components/union/activityManage/activityApplyPush.vue'],resolve);}
            },
            {
                path:"/activityPublish",
                name:"发起活动",
                component:resolve=>{require(['@/components/union/activityManage/activityPublish.vue'],resolve);}
            },
            {
                path:"/activityEnroll",
                name:"活动报名情况",
                component:resolve=>{require(['@/components/union/activityManage/activityEnroll.vue'],resolve);}
            },
            {
                path:"/activityMoneyPush",
                name:"经费使用情况提交",
                component:resolve=>{require(['@/components/union/activityManage/activityMoneyPush.vue'],resolve);}
            },
            {
                path:"/activityResultPublish",
                name:"发布活动举办结果",
                component:resolve=>{require(['@/components/union/activityManage/activityResultPublish.vue'],resolve);}
            },
            {
                path:"/unionMoney",
                name:"校社联经费",
                component:resolve=>{require(['@/components/union/activityManage/unionMoney.vue'],resolve);}
            },
            {
                path:"/unionActivity",
                name:"校社联活动统计",
                component:resolve=>{require(['@/components/union/activityManage/unionActivity.vue'],resolve);}
            }
        ]
    },
    // 社联管理社团模块
    {
        path: 'unionAdmin',
        name: '校社团管理模块',
        component: UnionAdmin,
        redirect:"/clubActivityAudit",//默认重定向到这里
        meta:{
            otherName:"校社团管理模块"
        },
        children:[
            {
                path:"/clubActivityAudit",
                name:"校社团活动审核",
                component:resolve=>{require(['@/components/union/clubManage/clubActivityAudit.vue'],resolve);}
            },
            {
                path:"/clubMoneyManage",
                name:"校社团保管金",
                component:resolve=>{require(['@/components/union/clubManage/clubMoneyManage.vue'],resolve);}
            },
            {
                path:"/clubMoneyUseCheck",
                name:"校社团活动经费表",
                component:resolve=>{require(['@/components/union/clubManage/clubMoneyUseCheck.vue'],resolve);}
            },
            {
                path:"/clubRegAudit",
                name:"校社团年度注册表审核",
                component:resolve=>{require(['@/components/union/clubManage/clubRegAudit.vue'],resolve);}
            }
        ]
    },
    //社联简介
    {
        path: 'unionAdmin',
        name: '校社联简介模块',
        component: UnionAdmin,
        redirect:"/unionInstroduce",//默认重定向到这里
        children:[
            {
                path:"/unionInstroduce",
                name:"校社联简介",
                component:resolve=>{require(['@/components/union/instroduce/unionInstroduce.vue'],resolve);}
            }
        ]
    }
]
//teacherAdminRouter
export const teacherAdminRouter=[
    // 社联管理成员模块
    {
        path: 'TeacherAdmin',
        name: '校社联管理模块',
        component: TeacherAdmin,
        redirect:"/unionActivityAudit",
        children:[
            {
                path:"/unionActivityAudit",
                name:"校社联活动审核",
                component:resolve=>{require(['@/components/teacher/unionManage/unionActivityAudit.vue'],resolve);}
            },
            {
                path:"/unionMoneyUseCheck",
                name:"校社联活动经费表",
                component:resolve=>{require(['@/components/teacher/unionManage/unionMoneyUseCheck.vue'],resolve);}
            },
            {
                path:"/unionRegAudit",
                name:"校社联年度注册表审核",
                component:resolve=>{require(['@/components/teacher/unionManage/unionRegAudit.vue'],resolve);}
            },
            {
                path:"/unionMoneyManage",
                name:"校社联保管金",
                component:resolve=>{require(['@/components/teacher/unionManage/unionMoneyManage.vue'],resolve);}
            }
        ]
    },
    {
        path: 'TeacherAdmin',
        name: '统计模块',
        component: TeacherAdmin,
        redirect:"/statistics",
        children:[
            {
                path:"/statistics",
                name:"活动统计情况",
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
