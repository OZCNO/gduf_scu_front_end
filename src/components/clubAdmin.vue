<template>
	<el-container class="container">
		<!-- 头部 -->
		<el-header>		
			<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span></span></a><div class="host" :class="collapsed?'host-collapse-left':'host-left'" >校社团端</div> 
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
						<template slot="title"><i class="el-icon-star-off"></i><span slot="title">成员管理模块</span></template>
						<el-menu-item index="/clubMemberAudit">会员审核</el-menu-item>
						<el-menu-item index="/clubOfficerAudit">干事审核</el-menu-item>
						<el-menu-item index="/clubMemberManage">会员管理</el-menu-item>
						<el-menu-item index="/clubOfficerManage">干事管理</el-menu-item>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i><span slot="title">活动管理模块</span></template>
						<el-menu-item-group title="举办活动">
							<el-menu-item index="/clubActivityApplyPush">活动申请表提交</el-menu-item>
							<el-menu-item index="/clubActivityPublish">活动发布</el-menu-item>
							<el-menu-item index="/clubActivityEnroll">活动报名情况</el-menu-item>
							<el-menu-item index="/clubActivityMoneyPush">经费使用情况提交</el-menu-item>
							<el-menu-item index="/clubActivityResultPublish">活动成果发布</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="数据统计">
							<el-menu-item index="/clubMoney">保管金查看</el-menu-item>
							<el-menu-item index="/clubActivity">活动统计情况</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/clubReg">
						<i class="el-icon-setting"></i>
						<span slot="title">年度注册表模块</span>
					</el-menu-item>
					<el-menu-item index="/clubInstroduce">
						<i class="el-icon-setting"></i>
						<span slot="title">校社团简介模块</span>
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
		name: 'clubAdmin',
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