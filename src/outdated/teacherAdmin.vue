<template>
	<el-container class="container">
		<!-- 头部 -->
		<el-header>		
			<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span class="menu"></span></a><div class="host" :class="collapsed?'host-collapse-left':'host-left'" >教师端</div><div class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div> 
		</el-header>
		<!-- 下面 -->
		<el-container class="main">
			<!-- 左边、导航栏 -->
			<el-aside heigh="100%" :class="collapsed?'el-aside-collapse-width':'el-aside-width'">
				<el-scrollbar style="height:100%" :native="false"  wrap-class="list">
				<!-- 默认打开的导航栏default-openeds -->
				<!-- unique-opened只保持一个子菜单的展开 -->
				<el-menu router  menu-trigger="click" :default-active="$route.path" unique-opened :collapse="collapsed">
					<el-submenu index="1">
						<!-- 表明slot="title"，导航栏会在折叠的时候隐藏title -->
						<template slot="title"><i class="el-icon-star-off"></i><span slot="title">校社联管理模块</span></template>
						<el-menu-item index="/unionActivityAudit">活动申请表审核</el-menu-item>
						<el-menu-item index="/unionMoneyUseCheck">活动经费使用表</el-menu-item>
						<el-menu-item index="/unionRegAudit">年度注册表审核</el-menu-item>
						<el-menu-item index="/unionMoneyManage">保管金管理</el-menu-item>
					</el-submenu>
					<el-menu-item index="/statistics">
						<i class="el-icon-menu"></i>
        				<span slot="title">统计模块</span>
					</el-menu-item>
			    </el-menu>
				</el-scrollbar>
			</el-aside>
			<!-- 右边、主要 -->
			<el-main :class="collapsed?'el-main-collapse-width':'el-main-width'">
				<!-- 面包屑，显示位置 -->
				<el-col :span="24" class="breadcrumbContainer">
					<strong class="title">{{$route.name}}</strong>
					<!--  -->
					<el-breadcrumb separator="/" class="breadcrumbInner">
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name}}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col>
				<el-col :span="24" class="contentWrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</el-main>		
		</el-container>
    </el-container>
</template>
<script>
	export default {
		name: 'teacherAdmin',
		data() {
			return {
		        collapsed:false,
		        sysUserName:"郑婵娜",
		        sysUserAvatar:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3502149281,2119482052&fm=27&gp=0.jpg",
			}
		},
		methods:{
	      // 折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;  
			}
		}
	}
</script>