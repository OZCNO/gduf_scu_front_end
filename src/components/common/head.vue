<template id="head">
	<!-- 头部 -->
	<el-header>		
		<div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span class="menu"></span></a><div class="host" :class="collapsed?'host-collapse-left':'host-left'" >{{logoName}}</div><div class="userinfo">
			<el-dropdown trigger="hover">
				<span class="el-dropdown-link userinfo-inner"><img :src="sysUserAvatar" /> {{sysUserName}}</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item>
					<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<!-- 编辑密码 -->
		<el-dialog title="修改密码" :visible.sync="changePasswordFormVisible" :close-on-click-modal="false">
			<el-form :model="changePasswordForm" label-width="80px" :rules="changePasswordFormRules" ref="changePasswordForm">
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
				<el-button @click.native="handleCancel">取消</el-button>
				<el-button type="primary" @click="handleSubmit" :loading="changeLoading">提交</el-button>
			</div>
		</el-dialog>
	</el-header>
</template>
<script>
import {editPassword} from "../../api.js"
import bus from "./bus"
export default {
	props:[
		"logoName",
		"sysUserName",
		"sysUserAvatar"
	],
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
	        changeLoading:false,
	        changePasswordFormVisible:false,
	        changePasswordForm:{
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
		// 取消
		handleCancel(){
			this.$refs.changePasswordForm.resetFields();
			this.changePasswordFormVisible = false;			
		},
		// 修改密码
		handleSubmit(){
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
					}).catch(error=>{
						this.$message.error(error);
					})
				}else{
					this.$message.error("输入不符合要求");
				}
			})
		},
        // 折叠导航栏
		collapse:function(){
			this.collapsed=!this.collapsed;
			// 用一个空的实例来联系多个vue实例，包括父子，同级实例
            bus.$emit('collapsed', this.collapsed);
		},
		// 修改密码
		changePassword(){
			this.changePasswordFormVisible=!this.changePasswordFormVisible;
		},
		// 退出登录
		logout: function () {
			this.$confirm('确认退出吗?', '提示')
			.then(() => {
				this.$router.push('/login');
			}).catch(() => {

			});
		},
	}
}
</script>