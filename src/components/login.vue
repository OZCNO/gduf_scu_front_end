<template>
	<div class="loginContainer">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="loginForm" size="medium">
			<!-- label-width是form直接子元素的宽度，不是el-form-item宽度 -->
			<h3 class="title">系统登录</h3>
			<el-form-item prop="username">
			    <el-input class="loginInput" v-model="loginForm.username" placeholder="请输入账号"></el-input>
				<i class="iconfont icon-yonghu"></i>
			</el-form-item>
			<el-form-item prop="password">
			    <el-input class="loginInput" type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
				<i class="iconfont icon-mima"></i>
			</el-form-item>
			<el-form-item>
				<el-radio-group v-model="loginForm.role">
					<ul>
						<li class="loginType">
						    <el-radio :label="1">学生</el-radio>
						    <el-radio :label="2">校社团管理员</el-radio>
				    	</li>
						<li class="loginType">
						    <el-radio :label="4">老师</el-radio>
						    <el-radio :label="3">校社联管理员</el-radio>
				    	</li>
					</ul>
				    <!-- 绑定值变化时触发的事件change事件 -->
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="loginSubmit('loginForm')" id="loginSubmit" :loading="logining">登录</el-button>
				<!-- 参数不是变量要加引号啊！！ -->
			</el-form-item>
			<el-form-item>
				<router-link v-bind:to="{name:'Reg'}"><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i>注册</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
  import { requestLogin } from '../api.js';
export default {
  name: 'Login',
  data () {
    return {
        logining: false,
		loginForm:{
			username:"",
			password:"",
			role:1,
		},
		loginRules: {
          username: [{ required: true, message: '请输入账号', trigger: 'blur'}],
          password:[{ required: true, message: '请输入密码', trigger: 'blur'}]
        },    
    };
  },
  methods: {
	loginSubmit(formName) {
		this.$refs[formName].validate((valid) => {
          if (valid) {
            this.logining = true;
            requestLogin(this.loginForm).then(res=>{
             	this.logining = false;
          		var path=["personCenter","clubMemberAudit","officerAudit","unionActivityAudit"];
          		let {code,msg,data}=res.data;
              	console.log(res);
              	if(code!=="200"){
	                this.$message.error(msg);
              	} else {
              		localStorage.setItem("token",data.credential.token);
              		localStorage.setItem("userId",data.credential.userId);
              		localStorage.setItem("role",this.loginForm.role);
              		localStorage.setItem("name",data.user.name);
              		localStorage.setItem("avatar",data.user.avatar||"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3502149281,2119482052&fm=27&gp=0.jpg");

	          		this.$router.push({
	          			path:path[this.loginForm.role-1],
	          			query:{
	          				role:this.loginForm.role,
	          				name:"郑婵娜",
	          				avatar:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3502149281,2119482052&fm=27&gp=0.jpg"
	          			}
	          		})
	          	}
      		})
          } else {
            this.$message.error('输入不符合要求');
            return false;
          }
        });
	},
  }
}
</script>
<!-- scoped的原理，给类名添加随机生成的属性，从而变成局部样式，所以在scoped中无法更改全局样式
解决方法：
	1.写到没有scoped中去，但是在这个form中添加特定的class名，增加命名空间，尽量不影响默认样式。
	2.使用deep
此处使用第一种方法,写在App.vue全局样式中-->
<style lang="scss" scoped>
$lfw:280px;//loginFormWidth
$lfmt:140px;//loginFormMarginTop
.loginContainer{
	.loginForm{
		width:$lfw;
		margin:$lfmt auto 0;
    	padding: 35px 35px 15px 35px;
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	    text-align: center;
		.title{
	      margin: 0px auto 40px auto;
	      text-align: center;
	      color: #505458;
		}
		.iconfont{
			position:absolute;
			top:0px;
			left:5px;
			font-size:22px;
		}
		.loginType:first-child{
			margin-bottom:10px;
		}
		#loginSubmit{
			width:$lfw;
			margin-top:10px;
		}
	}
}
</style>