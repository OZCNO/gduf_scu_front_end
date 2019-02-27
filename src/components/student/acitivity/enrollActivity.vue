<template>
<div>
<el-tabs type="border-card" style="margin-top:15px;">
	<el-tab-pane label="普通活动">
		<el-collapse @change="handleBrowser">
			<template v-for="(item, index) in list">	  		
				<el-collapse-item :title="item.theme" :name="index">
					<div slot="title">
						<span>{{item.theme}}</span>
					</div>
					<div class="text">
						<span class="theme">活动地点：</span>
						<span class="content">{{item.address}}</span>
					</div>
					<div class="text">
						<span class="theme">报名截止时间：</span>
						<span class="content">{{item.enrollDeadline}}</span>
					</div>
					<div class="text">
						<span class="theme">活动时间：</span>
						<span class="content">{{item.timeBegin}}~{{item.timeEnd}}</span>
					</div>
					<div class="text">
						<span class="theme">活动简介：</span>
						<span class="content">{{item.introduction}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动内容：</span>
						<span class="content">{{item.content}}</span>
					</div>		
					<div style="float: right; padding: 3px 0" >	
						<span class="number">{{item.browser}}</span>
						<el-button type="text" disabled style="color:#333">浏览</el-button>	
						<span class="number">{{item.like}}</span>
						<el-button type="text" @click="handleLike(item.isLike)" :class="{'done':item.isLike}">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleEnroll(item.isBrowser)" :class="{'done':item.isEnroll}">报名</el-button>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
	<el-tab-pane label="会员活动">
		<el-collapse>
			<template v-for="(item, index) in memberList">	  		
				<el-collapse-item :title="item.theme" :name="index">
					<div class="text">
						<span class="theme">活动地点：</span>
						<span class="content">{{item.address}}</span>
					</div>
					<div class="text">
						<span class="theme">报名截止时间：</span>
						<span class="content">{{item.enrollDeadline}}</span>
					</div>
					<div class="text">
						<span class="theme">活动时间：</span>
						<span class="content">{{item.timeBegin}}~{{item.timeEnd}}</span>
					</div>
					<div class="text">
						<span class="theme">主办方</span>
						<span class="content">{{item.clubName}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动简介：</span>
						<span class="content">{{item.introduction}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动内容：</span>
						<span class="content">{{item.content}}</span>
					</div>	
					<div style="float: right; padding: 3px 0" >	
						<span class="number">{{item.browser}}</span>
						<el-button type="text" disabled style="color:#333">浏览</el-button>	
						<span class="number">{{item.like}}</span>
						<el-button type="text" @click="handleLike">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleEnroll">报名</el-button>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
	<el-tab-pane label="招新活动">
		<el-collapse>
			<template v-for="(item, index) in enrollList">	  		
				<el-collapse-item :title="item.theme" :name="index">
					<div class="text">
						<span class="theme">活动地点：</span>
						<span class="content">{{item.address}}</span>
					</div>
					<div class="text">
						<span class="theme">报名截止时间：</span>
						<span class="content">{{item.enrollDeadline}}</span>
					</div>
					<div class="text">
						<span class="theme">活动时间：</span>
						<span class="content">{{item.timeBegin}}~{{item.timeEnd}}</span>
					</div>
					<div class="text">
						<span class="theme">主办方</span>
						<span class="content">{{item.clubName}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动简介：</span>
						<span class="content">{{item.introduction}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动内容：</span>
						<span class="content">{{item.content}}</span>
					</div>	
					<div style="float: right; padding: 3px 0" >	
						<span class="number">{{item.browser}}</span>
						<el-button type="text" disabled style="color:#333">浏览</el-button>	
						<span class="number">{{item.like}}</span>
						<el-button type="text" @click="handleLike">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleRequest">申请</el-button>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
</el-tabs>

<el-dialog title="申请加入" :visible.sync="dialogFormVisible">
	<el-form ref="form" :model="form" :rules="formRules" label-width="80px" class="form" size="mini">
		<el-form-item class="avatarItem" label="头像" prop="avatar">
			<el-upload class="avatar-uploader" action="http://119.29.105.29:8083/postImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
			  <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label="学号" prop="code">
			<el-input  v-model="form.code" placeholder="请输入学号"></el-input>
		</el-form-item>
		<el-form-item label="姓名" prop="name">
			<el-input  v-model="form.name" placeholder="请输入姓名"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="sex">
			<el-select v-model="form.sex" placeholder="请选择性别">
				<el-option :value="0" label="男"></el-option>
				<el-option :value="1" label="女"></el-option>
			</el-select>
		</el-form-item>		
		<el-form-item label="学院" prop="institute">
			<el-select v-model="form.institute" placeholder="请选择所属学院" @change="instituteChange">
				<el-option v-for="(item,index) in institute" :value="index" :key="index"></el-option>	
			</el-select>
		</el-form-item>
		<el-form-item label="专业" prop="major">
			<el-select v-model="form.major" placeholder="请选择所属专业" @change="majorChange">
				<el-option v-for="(item,index) in major" :value="item" :key="index"></el-option>
			</el-select>
		</el-form-item>			
		<el-form-item label="手机" prop="mobile">
			<el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
		</el-form-item>		
		<el-form-item label="邮箱" prop="email">
			<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
		</el-form-item>		
		<el-form-item label="参加原因" prop="reason">
			<el-input type="textarea" v-model="form.reason" placeholder="请输入参加原因"></el-input>
		</el-form-item>		
		<el-form-item label="自我介绍" prop="introduction">
			<el-input type="textarea" v-model="form.introduction" placeholder="请自我介绍"></el-input>
		</el-form-item>		
	</el-form>
</el-dialog>
</div>
</template>
<script>
import {getActivityList2} from "../../../api.js"
export default{
	name:"enrollActivity",
	data(){
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
		var validateMobile= ( rule,value,callback ) =>{
			if(!(/^1[385][1-9]\d{8}/).test(value)){
				callback(new Error("手机输入不正确"));
			}else {
		 		callback();
			}
		};
		return{
			institute:[],
			list:[],
			memberList:[],
			enrollList:[],
			dialogFormVisible:false,
			form:{
				name:"",
				sex:"",
				institude:"",
				major:"",
				email:"",
				mobile:"",
				code:"",
				avatar:"",
				reason:"",
				introduction:"",
			},
			formRules:{
				code:[
					{required:true,message:"请输入学号",trigger:"blur"},
					{min:9,max:10,message:"学号输入不正确",trigger:"blur"},
					{validator:validateUsername,trigger:"blur"}
				],
				name:[
					{required:true,message:"请输入姓名",trigger:"blur"},
					{validator:validateName,trigger:"blur"}
				],
				sex:[
					{required:true,message:"请选择性别",trigger:"blur"}
				],
				mobile:[
					{required:true,message:"请输入手机",trigger:"blur"},
					{validator:validateMobile,trigger:"blur"}
				],
				email:[
					{required:true,message:"请输入邮箱",trigger:"blur"},
					{type:"email",message:"邮箱输入不正确",trigger:"blur"}
				],
				institute:[
					{required:true,message:"请选择所属学院",trigger:"blur"}
				],
				major:[
					{required:true,message:"请选择所属专业",trigger:"blur"}
				],
				avatar:[
					{required:true,message:"请上传照片",trigger:"blur"}
				],
				reason:[
					{required:true,message:"请选择输入参加原因",trigger:"blur"}
				],
				introduction:[
					{required:true,message:"请自我介绍",trigger:"blur"}
				]
			},
			imageUrl:"",

		}
	},
	created(){
		this.getInstitute();
		getActivityList2().then(res=>{
			this.list=res.data
			this.memberList=res.data
			this.enrollList=res.data
		})
	},
  	computed: {
  		major:function(){
  			var arr=[];
  			var obj=this.institute;
  			var key;
  			if(this.form.institute!=""){
  				arr=obj[this.form.institute];
  			}else{
  				for(key in obj){
  					if(obj.hasOwnProperty(key)){
  						// concat不会改变原数组，所以要arr=，这很重要
  						arr=arr.concat(obj[key]);
  					}
  				}
  			}
  			return arr;
  		}
 
	},
	methods:{
		getInstitute(){				
			this.$axios.get("http://119.29.105.29:8083/getInstitute").then((response)=>{
				this.institute=JSON.parse(response.data);
			}).catch(function(error){
				console.log(error);
			})
		},
    	// 学院值改变的时候
    	instituteChange(value){
    		this.form.major="";
    	},
    	// 专业值改变的时候
    	majorChange(value){
    		var obj=this.institute;
			var key;
			for(key in obj){
    			if(obj.hasOwnProperty(key)){
					if(obj[key].indexOf(value)>=0){
						this.form.institute=key;
    				}
				}
			}
    	},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
			this.form.image=this.imageUrl
			console.log(this.imageUrl);
		},
		beforeAvatarUpload(file) {
			// const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			// if (!isJPG) {
			//   this.$message.error('上传头像图片只能是 JPG 格式!');
			// }
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},
		//activityId,studentId
		handleBrowser(){
			//增加该活动浏览次数,且每一个活动每一个学生浏览一次
			//更新数据
		},
		handleLike(){
			//增加该活动点赞次数,且每一个活动每一个学生点赞一次
			//更新数据
		},
		handleEnroll(){
			//学生报名
			//更新数据
		},
		handleRequest(){
			//申请入团
			this.dialogFormVisible=true;
		}

	}
}
</script>
<style lang="scss" scoped>
.text {
	font-size: 14px;
	line-height: 25px;
}
.theme{
	font-weight: bold;
}
.number{
	color:#999;
}
.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}
.done{
	color:red;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
</style>