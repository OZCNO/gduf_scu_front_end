<template>
	<el-container class="container">
		<!-- 头部 -->
		<el-header>		
			<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span class="menu"></span></a><div class="host" :class="collapsed?'host-collapse-left':'host-left'" >学生端</div><div class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-header>
		<!-- 下面 -->
		<el-container class="main">
			<!-- 修改密码界面 -->
			<el-dialog title="修改密码" :visible.sync="changePasswordFormVisible" :close-on-click-modal="false">
				<el-form :model="changePasswordForm" label-width="80px" :rules="changePasswordFormRules" ref="changePasswordForm">
				    <!-- <el-form-item label="账号" prop="username">
				    	<el-input v-model="changePasswordForm.username" disabled></el-input>
				    </el-form-item> -->
				    <el-form-item label="旧密码" prop="oldPass">
				    	<el-input v-model="changePasswordForm.oldPass" type="password"  autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="新密码" prop="newPass">
				    	<el-input v-model="changePasswordForm.newPass" type="password"  autocomplete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="确认密码" prop="repassword">
				    	<el-input v-model="changePasswordForm.repassword"  type="password"  autocomplete="off"></el-input>
				    </el-form-item>
				</el-form>
				<div slot="footer">
					<el-button @click.native="changePasswordFormVisible = false">取消</el-button>
					<el-button type="primary" @click="changeSubmit" :loading="changeLoading">提交</el-button>
				</div>
			</el-dialog>
			<!-- 左边、导航栏 -->
			<el-aside heigh="100%" :class="collapsed?'el-aside-collapse-width':'el-aside-width'">
				<el-scrollbar style="height:100%" :native="false"  wrap-class="list">
				<!-- 默认打开的导航栏default-openeds -->
				<!-- unique-opened只保持一个子菜单的展开 -->
				<el-menu router  menu-trigger="click" :default-active="$route.path" unique-opened :collapse="collapsed">
					<el-submenu index="1">
						<!-- 表明slot="title"，导航栏会在折叠的时候隐藏title -->
						<template slot="title"><i class="el-icon-star-off"></i><span slot="title">个人中心</span></template>
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
import {editPassword} from "../../api.js"
export default {
	name: 'student',
	data() {
		var validatePassword = (rule, value, callback) => {
			if (value !== this.changePasswordForm.newPass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
	        collapsed:false,
	        sysUserName:"郑婵娜",
	        sysUserAvatar:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3502149281,2119482052&fm=27&gp=0.jpg",
	        changeLoading:false,
	        changePasswordFormVisible:false,
	        changePasswordForm:{
	        	// username:user.username,
	        	newPass:"",
	        	oldPass:"",
	        	repassword:""
	        },
	        changePasswordFormRules:{        	
				oldPass:[
					{required:true,message:"请输入密码",trigger:"blur"},
				],
				newPass:[
					{required:true,message:"请输入密码",trigger:"blur"},
					{min:8,max:16,message:"长度为8~16",trigger:"blur"},
				],
				repassword:[
					{required:true,message:"请再次输入密码",trigger:"blur"},
					{validator:validatePassword,trigger:"blur"}
				],
	        },
		}
	},
	methods:{
      // 折叠导航栏
		collapse(){
			this.collapsed=!this.collapsed;  
		},
		// 修改密码
		changePassword(){
			this.changePasswordFormVisible=!this.changePasswordFormVisible;
		},
		changeSubmit(){
			let params={
				oldPass:this.changePasswordForm.oldPass,
				newPass:this.changePasswordForm.newPass,
			};
			this.$refs.changePasswordForm.validate((valid)=>{
				if(valid){
					console.log(params);
					this.changeLoading=true;
					editPassword(params).then(res=>{
						console.log(res);
						let {code,msg,data}=res.data;
						if(code==200){
							this.changeLoading=false;
							this.$message.success("修改成功");
							this.changePasswordFormVisible=false;
						}else{							
							this.changeLoading=false;
							this.$message.error(msg);
						}
					})
				}else{
					this.$message.error("输入不符合要求");
				}
			})
		},
	},
}
</script>