<template>
	<el-container class="container">
		<!-- 头部 -->
		<el-header>		
			<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span></span></a><div class="host" :class="collapsed?'host-collapse-left':'host-left'" >学生端</div>
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
						<template slot="title"><i class="el-icon-star-off"></i><span slot="title">个人中心</span></template>
						<el-menu-item index="/changePsd">修改密码</el-menu-item>
						<el-menu-item index="/personCenter">个人中心</el-menu-item>
						<el-menu-item index="/personActivity">个人活动情况</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i><span slot="title">招新模块</span></template>
						<el-menu-item index="/instroduce">社联社团简介</el-menu-item>
						<el-menu-item index="/recruitActivity">招新活动</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i><span slot="title">活动模块</span></template>
							<el-menu-item index="/enrollActivity">报名活动</el-menu-item>
							<el-menu-item index="/onlineActivity">线上活动</el-menu-item>
							<el-menu-item index="/showActivity">活动成果展</el-menu-item>
					</el-submenu>
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
		name: 'student',
		data() {
			return {
		        collapsed:false,
			}
		},
		methods:{
	      // 折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;  
			}
		},
	}
</script>
<style lang="scss" scoped>


</style>