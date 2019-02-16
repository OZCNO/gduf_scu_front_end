<template>
	<div class="regContainer">
		<el-form class="regForm" ref="regForm" :model='regForm' :rules='regRules' size="medium">
			<h3 class="title">学生注册</h3>
				<el-form-item prop="name">
					<el-input v-model="regForm.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item prop="username">
					<el-input v-model="regForm.username" placeholder="请输入账号，即学号"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input  v-model="regForm.password" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="repassword">
					<el-input  v-model="regForm.repassword" type="password"placeholder="请再次输入密码"></el-input>
				</el-form-item>		
			<el-form-item>
				<el-button type="primary" @click="regSubmit('regForm')"  id="regSubmit" :loading="reging">注册</el-button>
			</el-form-item>
			<el-form-item>
				<router-link v-bind:to="{name:'Login'}" class="logLink"><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i>登录</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
  import { requestRegister } from '../api.js';
export default{
	name:'Reg',
	data(){
		var validatePassword = (rule, value, callback) => {
			if (value !== this.regForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var validateUsername= ( rule,value,callback ) =>{
			if(!(/^[1-9][0-9]+[A-Z]?[0-9]+$/).test(value)){
				callback(new Error("学号输入不正确"));
			}else {
		 		callback();
			}
		};
		var validateName= ( rule,value,callback ) =>{
			// 只能是中文
			if(!(/([\u4e00-\u9fa5]{2,5})/).test(value)){
				callback(new Error("请输入你的中文姓名"));
			}else {
		  		callback();
			}
		};
		return{
			reging:false,
			institute:[],
			regForm:{
				username:"",
				password:"",
				repassword:"",
				name:"",
			},
			regRules:{
				username:[
					{required:true,message:"请输入学号",trigger:"blur"},
					{min:9,max:10,message:"学号输入不正确",trigger:"blur"},
					{validator:validateUsername,trigger:"blur"}
				],
				password:[
					{required:true,message:"请输入密码",trigger:"blur"},
					{min:8,max:16,message:"长度为8~16",trigger:"blur"},
				],
				repassword:[
					{required:true,message:"请再次输入密码",trigger:"blur"},
					{validator:validatePassword,trigger:"blur"}
				],
				name:[
					{required:true,message:"请输入姓名",trigger:"blur"},
					{validator:validateName,trigger:"blur"}
				]
			},
		}
	},	
    methods: {
		regSubmit(formName) {
			this.$refs[formName].validate((valid) => {
		      if (valid) {
            	this.reging = true;
            	let para={
            		username:this.regForm.username,
            		password:this.regForm.password,
            		name:this.regForm.name
            	}
		      	requestRegister(para).then((res)=>{
            		this.reging = false;
          			let {code,msg,data}=res.data;
          			console.log(res);
            		if(code!==200){
            			this.$message.error(msg)
            		}
		      		else{
	              		localStorage.setItem("token",data.credential.token);
	              		localStorage.setItem("userId",data.credential.userId);
						this.$router.push({
				            path:'changePsd'
				        });
					}
		      	}).catch((err)=>{ 
			        this.$message.error("注册失败，再试一次");
		      	})
		      }else {
		        this.$message.error('输入有误');
		      }
		    });
		},
  	},
}
</script>
<style lang="scss" scoped>
$rfw:280px;//registerFormWidth
$rfmt:90px;//registerFormMarginTop
.regContainer{
	.regForm{
		width:$rfw;
		margin:$rfmt auto 0;
    	padding: 35px 35px 15px 35px;
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	    text-align:center;
		.title{
	      margin: 0px auto 40px auto;
	      text-align: center;
	      color: #505458;
		}
		#regSubmit{
			width:$rfw;
			margin-top:10px;
		}
	}
}
</style>