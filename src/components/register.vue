<template>
	<div class="regContainer">
		<el-form class="regForm" ref="regForm" :model='regForm' :rules='regRules' label-width="90px" size="medium">
			<h3 class="title">学生注册</h3>
			<el-row>
				<el-col :span="12">
					<el-form-item class="avatarItem">
		                <img :src="url" class="avatar">				
						<el-upload
		                    class="avatar-uploader"
		                    action="https://jsonplaceholder.typicode.com/posts/"
		                    header=""
							:show-file-list="false"
							:auto-upload="false"
		                    :limit="1"
		                    name="avatar"
		                    :on-change="imgPreview"
		                    :on-success="uploadSuccess"
		                    :on-preview="picturePreview">
  						<i class="el-icon-upload2 avatar-uploader-icon"></i>
		            </el-upload>
					</el-form-item>
					<el-form-item label="账号" prop="sid">
						<el-input  v-model="regForm.sid" placeholder="请输入学号"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="psd">
						<el-input  v-model="regForm.psd" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="repsd">
						<el-input  v-model="regForm.repsd" type="password"placeholder="请再次输入密码"></el-input>
					</el-form-item>		
				</el-col>
				<el-col :span="12">
					<el-form-item label="姓名" prop="name">
						<el-input  v-model="regForm.name" placeholder="请输入姓名"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex">
						<el-select v-model="regForm.sex" placeholder="请选择性别">
							<el-option value="女"></el-option>
							<el-option value="男"></el-option>
						</el-select>
					</el-form-item>		
					<el-form-item label="学院" prop="institute">
						<el-select v-model="regForm.institute" placeholder="请选择所属学院" @change="instituteChange">
							<el-option v-for="(item,index) in institute" :value="index"></el-option>	
						</el-select>
					</el-form-item>
					<el-form-item label="专业" prop="major">
						<el-select v-model="regForm.major" placeholder="请选择所属专业" @change="majorChange">
							<el-option v-for="(item,index) in major" :value="item"></el-option>
						</el-select>
					</el-form-item>			
					<el-form-item label="手机" prop="phone">
						<el-input v-model="regForm.phone" placeholder="请输入手机号码"></el-input>
					</el-form-item>		
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="regForm.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>		
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" @click="regSubmit('regForm')"  id="regSubmit">注册</el-button>
			</el-form-item>
			<el-form-item>
				<router-link v-bind:to="{name:'Login'}" class="logLink"><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i><i class="el-icon-d-arrow-right"></i>登录</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default{
	name:'Reg',
	data(){
		var validatePsd = (rule, value, callback) => {
			if (value !== this.regForm.psd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		var validateSid= ( rule,value,callback ) =>{
			if(!(/^[1-9][0-9]+[A-Z]?[0-9]+$/).test(value)){
				callback(new Error("学号输入不正确"));
			}else {
		 		callback();
			}
		};
		var validateName= ( rule,value,callback ) =>{
			// 只能是中文
			if(!(/([\u4e00-\u9fa5]{2,5})/).test(value)){
				callback(new Error("请正确输入你的中文姓名"));
			}else {
		  		callback();
			}
		};
		var validatePhone= ( rule,value,callback ) =>{
			if(!(/^1[385][1-9]\d{8}/).test(value)){
				callback(new Error("手机输入不正确"));
			}else {
		 		callback();
			}
		};
		return{
			institute:[],
			regForm:{
				sid:"",
				psd:"",
				repsd:"",
				name:"",
				sex:"",
				phone:"",
				email:"",
				institute:"",
				major:"",
				img:""
			},
			regRules:{
				sid:[
					{required:true,message:"请输入学号",trigger:"blur"},
					{min:9,max:12,message:"学号输入不正确",trigger:"blur"},
					{validator:validateSid,trigger:"blur"}
				],
				psd:[
					{required:true,message:"请输入密码",trigger:"blur"},
					{min:8,max:16,message:"长度为8~16",trigger:"blur"},
				],
				repsd:[
					{required:true,message:"请再次输入密码",trigger:"blur"},
					{validator:validatePsd,trigger:"blur"}
				],
				name:[
					{required:true,message:"请输入姓名",trigger:"blur"},
					{validator:validateName,trigger:"blur"}
				],
				sex:[
					{required:true,message:"请选择所属性别",trigger:"blur"}
				],
				phone:[
					{required:true,message:"请输入手机",trigger:"blur"},
					{validator:validatePhone,trigger:"blur"}
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
				]
			},
			imgBool:false,
			default:{"boy":"https://pic.qqtn.com/up/2018-12/2018122117024589134.jpg",
			"girl":"https://pic.qqtn.com/up/2018-12/2018122117024489020.jpg"},
		}
	},	
	created:function(){
		var _this=this;
		this.$axios.get("https://getInstitute").then(function(response){
			_this.institute=JSON.parse(response.data);
		}).catch(function(error){
			console.log(error);
			alert("出错啦，再试一次");
			window.location.reload();
		})
	},
    methods: {
    	// 学院值改变的时候
    	instituteChange(value){
    		this.regForm.major="";
    	},
    	// 专业值改变的时候
    	majorChange(value){
    		var obj=this.institute;
			var key;
			for(key in obj){
    			if(obj.hasOwnProperty(key)){
					if(obj[key].indexOf(value)>=0){
						this.regForm.institute=key;
    				}
				}
			}
    	},
    	
    	// 头像上传之前的钩子
		// beforeAvatarUpload(file) {
		// 	const isJPG = file.type === 'image/jpeg';
		// 	const isLt2M = file.size / 1024 / 1024 < 2;
		// 	if (!isJPG) {
		// 		this.$message.error('上传头像图片只能是 JPG 格式!');
		// 	}
		// 	if (!isLt2M) {
		// 		this.$message.error('上传头像图片大小不能超过 2MB!');
		// 	}
		// 	return isJPG && isLt2M;
		// },
	    //文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
	    //阻止图片自动上传，把图片地址先保存到本地，然后再把表单一起提交
		imgPreview (file, fileList) {
            let fileName = file.name;
            let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
            if (regex.test(fileName.toLowerCase())) {
                this.regForm.img = file.url;
            } else {
                this.$message.error('请选择图片文件');
            }
        },

	    //点击文件列表中已上传的文件时的钩子
	    picturePreview(file) {
			this.regForm.img = file.url;
			this.imgBool=true;
        	console.log(file);
		},
		//文件上传成功时的钩子
		uploadSuccess(response, file, fileList){
	        console.log(response);
		},
		regSubmit(formName) {
			this.$refs[formName].validate((valid) => {
		      if (valid) {
		      	// 注册成功，要把数据发给后端，如果成功，再把自动利用用户和密码登录系统
		      	// axios.post("",this.regForm)
		      	// .then(funtion(response){
		      	// 	//成功
		      	// }).catch(function(error){
		      	// 	//失败
		      	// })
				this.$router.push({
		            name: 'Index1'
		        });
		      }else {
		        console.log("输入错误");
		        return false;
		      }
		    });
		},
  	},
  	computed: {
  		url:function(){
  			if(this.imgBool){
  				return this.regForm.img;
  			}else{
	  			if(this.regForm.sex=="女生"){
	  				return this.default["girl"];
	  			}else{
	  				return this.default["boy"];
	  			}  				
  			}
  		},
  		major:function(){
  			var arr=[];
  			var obj=this.institute;
  			var key;
  			if(this.regForm.institute!=""){
  				arr=obj[this.regForm.institute];
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
}
</script>
<style lang="scss" scoped>
$rfw:580px;//registerFormWidth
$avatarSize:113px;
.add{
	display: block;
	width: $avatarSize;
	height: $avatarSize;
	margin:20px 43.5px;
	border-radius:50%;
	// transform:translateX(50%);
}
.regContainer{
	.regForm{
		width:$rfw;
		margin:40px auto 0;
    	padding: 35px 95px 0px 35px;
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	    text-align:center;
		.title{
	      margin: 0px auto 40px auto;
	      padding-left:60px;
	      text-align: center;
	      color: #505458;
		}
		.avatarItem{
			position:relative;
			overflow: hidden;
		}
		// 上传框
		.avatar-uploader{
			@extend .add;
			position:absolute;
			top:0px;
		}
		// 图标
		.avatar-uploader-icon {
			display:block;
			width:$avatarSize;
			height:$avatarSize;
			line-height: $avatarSize;
			text-align: center;
			font-size: 28px;
			opacity:0;
		}
		.avatar-uploader:hover{
			background:rgba(155,155,155,0.5);
			.avatar-uploader-icon{
				color:#fff;
				opacity: 1;
			}
		}
		// 头像
		.avatar {
			@extend .add;
		}
		#regSubmit{
			width:$rfw/2;
			margin-top:10px;
		}
	}
}
</style>