<template>
<div class="regContainer">
<el-row :gutter="15">
	<el-col :span="12">
		<el-card class="box-card">
			<div slot="header">
				<span>我的信息</span>
			    <el-button v-if="editable" style="float: right; padding: 3px 0" type="text" @click="editable = false" >编辑</el-button>
			    <el-button v-else style="float: right; padding: 3px 0" type="text" @click="submit" >完成</el-button>
			</div>
				<el-form ref="form" :model='user' :rules='formRules' label-width="90px" size="medium":disabled="editable">			
					<el-form-item label="学号" prop="code">
						<el-input  v-model="user.code" placeholder="请输入学号"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input  v-model="user.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-select v-model="user.sex" placeholder="请选择性别">
							<el-option label="男" :value="1"></el-option>
							<el-option label="女" :value="0"></el-option>
						</el-select>
					</el-form-item>		
					<el-form-item label="学院" prop="institude">
						<el-select v-model="user.institude" placeholder="请选择所属学院" @change="instituteChange">
							<el-option v-for="(item,index) in institute" :value="index" :key="index"></el-option>	
						</el-select>
					</el-form-item>
					<el-form-item label="专业" prop="major">
						<el-select v-model="user.major" placeholder="请选择所属专业" @change="majorChange">
							<el-option v-for="(item,index) in major" :value="item" :key="index"></el-option>
						</el-select>
					</el-form-item>			
					<el-form-item label="手机" prop="mobile">
						<el-input v-model="user.mobile" placeholder="请输入手机号码"></el-input>
					</el-form-item>		
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>		
				</el-form>
		</el-card>
	</el-col>
	<el-col :span="5">
		<el-card class="box-card">
			<div slot="header">我的头像</div>				
			<el-upload  class="avatar-uploader" action="http://127.0.0.1:8083/postImg" :show-file-list="false"  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			  <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar" title="点我换头像">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-card>
	</el-col>
	<el-col :span="7">
		<el-card class="box-card news">
			<div slot="header">我的消息</div>			
			<el-table :data="news" :show-header="false" style="width: 100%">	
				<el-table-column prop="content"></el-table-column>
			</el-table>
		</el-card>
	</el-col>
	<el-col :span="12">
		<el-card class="box-card">
			<div slot="header">我的社团</div>
			<el-table :data="clubs" :show-header="false" style="width: 100%">
				<el-table-column prop="clubName"></el-table-column>
				<el-table-column prop="status"></el-table-column>
			</el-table>		
		</el-card>
	</el-col>
</el-row>
</div>
</template>
<script>
import {editPersonalInformation} from "../../../api.js"
export default{
	props:["user"],
	name:'personCenter',
	data(){
		var validateCode= ( rule,value,callback ) =>{
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
		var validateMobile= ( rule,value,callback ) =>{
			if(!(/^1[385][1-9]\d{8}/).test(value)){
				callback(new Error("手机输入不正确"));
			}else {
		 		callback();
			}
		};
		return{
			institute:[],
			form:{
				code:"",
				name:"",
				sex:"",
				mobile:"",
				email:"",
				institude:"",
				major:"",
				avatar:""
			},
			formRules:{
				code:[
					{required:true,message:"请输入学号",trigger:"blur"},
					{min:9,max:10,message:"学号输入不正确",trigger:"blur"},
					{validator:validateCode,trigger:"blur"}
				],
				name:[
					{required:true,message:"请输入姓名",trigger:"blur"},
					{validator:validateName,trigger:"blur"}
				],
				sex:[
					{required:true,message:"请选择所属性别",trigger:"blur"}
				],
				mobile:[
					{required:true,message:"请输入手机",trigger:"blur"},
					{validator:validateMobile,trigger:"blur"}
				],
				email:[
					{required:true,message:"请输入邮箱",trigger:"blur"},
					{type:"email",message:"邮箱输入不正确",trigger:"blur"}
				],
				institude:[
					{required:true,message:"请选择所属学院",trigger:"blur"}
				],
				major:[
					{required:true,message:"请选择所属专业",trigger:"blur"}
				]
			},
			editable:true,
			clubs:[
				{
					clubName:"数学协会",
					status:"会员",					
				},
				{
					clubName:"公关协会",
					status:"干事",					
				},
				{
					clubName:"桌球协会",
					status:"会长"
				}
			],
			news:[],

		}
	},	
	created(){
		this.getInstitute()
		//获取个人信息赋值给form,clubs,news
	},
    methods: {
		//获取学院列表
		getInstitute(){
			this.$axios.get("/getInstitute").then(res=>{
				this.institute=JSON.parse(res.data);
			}).catch(err=>{
				console.log(err);
				console.log("获取学院列表出错");
			})
		},
    	// 学院值改变的时候
    	instituteChange(value){
    		this.user.major=""
    	},
    	// 专业值改变的时候
    	majorChange(value){
    		var obj=this.institute
			var key
			for(key in obj){
    			if(obj.hasOwnProperty(key)){
					if(obj[key].indexOf(value)>=0){
						this.form.institute=key
    				}
				}
			}
    	},
		handleAvatarSuccess(res, file) {
			// this.imageUrl = URL.createObjectURL(file.raw)
			this.form.avatar= URL.createObjectURL(file.raw)
			console.log(this.form.avatar)
			this.avatarBool=true
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 8
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 8MB!')
			}
			return isLt2M
		},
		submit(){
			editPersonalInformation(this.form).then(res=>{
				let {msg,data,code}=res.data
				if(code==200){
					this.editable=true
					this.$message.success("修改成功")
				}else{
					this.$message.error("出了点问题，请稍后再试")
				}
			})
		}
    	
  	},
  	computed: {
  		major(){
  			var arr=[]
  			var obj=this.institute
  			var key
  			if(this.form.institute!=""){
  				arr=obj[this.form.institute]
  			}else if(this.user.institute!=""){
  				arr=obj[this.user.institute]
  			}else{
  				arr=[]
  				// for(key in obj){
  					// if(obj.hasOwnProperty(key)){
  						// concat不会改变原数组，所以要arr=，这很重要
  						// arr=arr.concat(obj[key])
  					// }
  				// }
  			}
  			return arr
  		},
  		imageUrl(){
  			return this.user.avatar
  		}
 
	},
}
</script>
<style lang="scss" scoped>
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 150px;
	height: 150px;
	line-height: 150px;
	text-align: center;
}
.avatar {
	width: 150px;
	height: 150px;
	display: block;
}
.news{
	min-height:254px;
}
</style>
