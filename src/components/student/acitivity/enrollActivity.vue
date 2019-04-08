<template>
<div>
<el-tabs type="border-card" style="margin-top:15px;">
	<el-tab-pane label="普通活动">
		<el-collapse @change="handleBrowser" accordion>
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
						<span class="theme">主办方</span>
						<span class="content">{{item.clubOrUnionName}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动简介：</span>
						<span class="content">{{item.introduction}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动内容：</span>
						<span class="content">{{item.content}}</span>
					</div>			
					<div style="float: right; padding: 3px 0">	
						<span class="number">{{item.browser}}</span>
						<el-button type="text" disabled style="color:#333">浏览</el-button>	
						<span class="number">{{item.like}}</span>
						<el-button type="text" @click="handleLike(index,item)" :class="{'done':item.isLike}">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleEnroll(index,item)" :class="{'done':item.isEnroll}">报名</el-button>			
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
	<el-tab-pane label="会员活动">
		<el-collapse accordion>
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
						<span class="content">{{item.clubOrUnionName}}</span>
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
						<el-button type="text" @click="handleLike(index, item)">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleEnroll(index, item)">报名</el-button>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
	<el-tab-pane label="招新活动">
		<el-collapse accordion>
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
						<span class="content">{{item.clubOrUnionName}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动简介：</span>
						<span class="content">{{item.introduction}}</span>
					</div>	
					<div class="text">
						<span class="theme">活动内容：</span>
						<span class="content">{{item.content}}</span>
					</div>	
					<div style="float: right; padding: 3px 0">	
						<span class="number">{{item.browser}}</span>
						<el-button type="text" disabled style="color:#333">浏览</el-button>	
						<span class="number">{{item.like}}</span>
						<el-button type="text" @click="handleLike(index, item)">点赞</el-button>
						<span class="number">{{item.enroll}}</span>  
						<el-button type="text" @click="handleRequest(index, item)">申请</el-button>
					</div>
				</el-collapse-item>
			</template>
		</el-collapse>
	</el-tab-pane>
</el-tabs>

<el-dialog title="申请加入" :visible.sync="dialogFormVisible">
	<el-form ref="form" :model="form" :rules="formRules" label-width="80px" class="form" size="mini">
		<el-form-item label="参加原因" prop="reason">
			<el-input type="textarea" v-model="form.reason" placeholder="请输入参加原因"></el-input>
		</el-form-item>		
		<el-form-item label="自我介绍" prop="introduce">
			<el-input type="textarea" v-model="form.introduce" placeholder="请自我介绍"></el-input>
		</el-form-item>	
	</el-form>	
	<div slot="footer">
	    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
		<el-button @click="resetForm('form')">重置</el-button>
	    <el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
	</div>
</el-dialog>
</div>
</template>
<script>
import {getActivity,enroll} from "../../../api.js"
export default{
	props:["user"],
	name:"enrollActivity",
	data(){
		return{
			institute:[],
			list:[],
			memberList:[],
			enrollList:[],
			dialogFormVisible:false,
			form:{
				reason:"",
				introduce:"",
				image:"..."
			},
			formRules:{
				reason:[
					{required:true,message:"请选择输入参加原因",trigger:"blur"}
				],
				introduction:[
					{required:true,message:"请自我介绍",trigger:"blur"}
				]
			},
			submitting:false,
			activityId:""
		}
	},
	created(){
		this.upload();
	},
	methods:{
		upload(){
			//普通活动
			let p1={
				type:0,
				self:"false",
			}
			//会员活动
			let p2={
				type:1,
				self:"false",
			}
			//招新活动
			let p3={
				type:2,
				self:"false",
			}
			getActivity(p1).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.list=data
				}else{
					this.$message.error(msg)
				}
			})
			getActivity(p2).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.memberList=data
				}else{
					this.$message.error(msg)
				}
			})
			getActivity(p3).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.enrollList=data
				}else{
					this.$message.error(msg)
				}
			})			
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
		handleEnroll(index,row){
			//学生报名
			enroll(this.user.id,row.id).then(res=>{
				let {msg,code,data}=res.data
				console.log(res);
				if(code==200){
					this.$message.success("报名成功");
				}
				//更新数据
			})
			
		},
		handleRequest(index,row){
			let {sex,institude,major,email,mobile,avatar}=this.user
			if(!(sex==""&&institude&&major&&email&&mobile&&avatar)){
				this.$notify.info({
		          title: '提示',
		          message:'您的信息不完整，请先到个人中心完善信息'
      			})
			}else{
				//申请入团
				this.dialogFormVisible=true
				this.activityId=row.id
			}
		},
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
	          		this.submitting=true;
					enroll(this.user.id,this.activityId,this.form).then(res=>{
						let {msg,code,data}=res.data
						console.log(res)
						if(code==200){
							this.$message.success("报名成功")
							this.dialogFormVisible=false
							//更新数据
						}else{
							this.$message.error(msg)
						}
						this.submitting=false

					})
				}
			})
		},
	},
  	computed: {
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