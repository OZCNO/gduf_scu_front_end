<template>
	<div class="loginContainer">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="loginForm" size="medium">
			<!-- label-width是form直接子元素的宽度，不是el-form-item宽度 -->
			<el-form-item prop="user">
			    <el-input class="loginInput" v-model="loginForm.user" placeholder="请输入账号"></el-input>
				<i class="iconfont icon-yonghu"></i>
			</el-form-item>
			<el-form-item prop="password">
			    <el-input class="loginInput" type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
				<i class="iconfont icon-mima"></i>
			</el-form-item>
			<el-form-item>
				<el-radio-group v-model="loginForm.type">
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
				<el-button type="primary" @click="loginSubmit('loginForm')" id="login_submit">登录</el-button>
				<!-- 参数不是变量要加引号啊！！ -->
			</el-form-item>
			<el-form-item>
				<router-link v-bind:to="{name:'Reg'}"><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i>注册</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
		loginForm:{
			user:"",
			password:"",
			type:0,
		},
		loginRules: {
          user: [{ required: true, message: '请输入账号', trigger: 'blur'}],
          password:[{ required: true, message: '请输入密码', trigger: 'blur'}]
        },    
    };
  },
  methods: {
	loginSubmit(formName) {
		console.log(this.$refs[formName]);
		this.$refs[formName].validate((valid) => {
          if (valid) {
          	// axios.post("",loginForm)
          	// 	.then(function(response){
          	// 		//登陆成功
          	// 	})
          	// 	.error(function(error){
          	// 		alert(error.msg);
          	// 	})
          	if(this.loginForm.type==1){
          		this.$router.push({
          			path:"changePsd"
          		})
          	}else if(this.loginForm.type==2){
          		this.$router.push({
          			path:"clubMemberAudit"
          		})
          	}else if(this.loginForm.type==3){
          		this.$router.push({
          			path:"officerAudit"
          		})
          	}else{
          		this.$router.push({
          			path:"unionActivityAudit"
          		})
          	}
          } else {
            console.log('error submit!!');
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
		// height:268px;
		width:$lfw;
		margin:$lfmt auto 0;
		.iconfont{
			position:absolute;
			top:0px;
			left:5px;
			font-size:22px;
		}
		.loginType:first-child{
			margin-bottom:10px;
		}
		#login_submit{
			width:$lfw;
		}
	}
}
</style>