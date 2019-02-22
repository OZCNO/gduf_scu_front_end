<template>
<el-card class="box-card">
	<div slot="header" class="clearfix"><span>{{title}}</span></div>
	<!-- 自动获取系列 -->
	<el-form ref="info" :model="info" :inline="true" size="mini">
	  <el-form-item label="社团全称"><el-input v-model="info.name" disabled></el-input>
	  </el-form-item><el-form-item label="社团类别"><el-input v-model="info.type" disabled></el-input>
	  </el-form-item><el-form-item label="会员人数"><el-input v-model="info.memberSum" disabled></el-input>
	  </el-form-item><el-form-item label="干事人数"><el-input v-model="info.officerSum" disabled></el-input>
	  </el-form-item><el-form-item label="指导老师姓名"><el-input v-model="info.teacherName" disabled></el-input>
	  </el-form-item><el-form-item label="指导老师电话"><el-input v-model="info.teacherMobile" disabled></el-input>
	  </el-form-item>	  
	</el-form>
	<el-form ref="form" :model="form" :rules="formRules" size="mini">
	  <!-- 填写系列 -->
	  <template v-if="info.status==0">	
		  <el-form-item label="上学期工作总结" prop="summary">
		    <el-input type="textarea" v-model="form.summary"></el-input>
		  </el-form-item><el-form-item label="新学期工作计划" prop="plan">
		    <el-input type="textarea" v-model="form.plan"></el-input>
		  </el-form-item><el-form-item label="备注" prop="comment">
		    <el-input type="textarea" v-model="form.comment"></el-input>
		  </el-form-item><el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
	      <el-button @click="resetForm('form')">重置</el-button>
	  </template>
	  <!-- 已经提交 -->
	  <template v-else>
		  <el-form-item label="上学期工作总结">
		  	<el-input type="textarea" v-model="form.summary" disabled></el-input>
		  </el-form-item><el-form-item label="新学期工作计划">
		  	<el-input type="textarea" v-model="form.plan" disabled></el-input>
		  </el-form-item><el-form-item label="备注">
		  	<el-input type="textarea" v-model="form.comment" disabled></el-input>
		  </el-form-item>  		  	
		  <template v-if="info.status==1"><el-button type="info" >待审核</el-button></template>
		  <template v-if="info.status==2"><el-button type="success" >审核通过</el-button></template>
	  </template>
	</el-form>
</el-card>
</template>
<script>
import { requestClubAnnualReg } from "../../../api.js"
export default{
	name:"ClubReg",
	data(){
		return{
			//已知信息
			info:{
				clubID:1,
				name:"公关协会",
				type:"学术科研类",
				memberSum:"729",
				officerSum:"20",
				teacherName:"郑柯",
				teacherMobile:"13555535646",
				status:0//状态
			},
			submitting:false,
			form:{
				clubID:"",
				summary:"工作总结",
				plan:"工作计划",
				comment:"",
			},
			formRules:{
	          summary: [{ required: true, message: '不能为空', trigger: 'blur'}],
	          plan:[{ required: true, message: '不能为空', trigger: 'blur'}]
			}
		}
	},
	created(){
	},
	methods:{
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					var clubID=this.info.clubID;
					this.form.clubID=1;
					this.$confirm("提交后不可修改，确定要提交了吗？","提示").then(()=>{
						requestClubAnnualReg(clubID,this.form).then((res)=>{
		            	this.submitting = true;
							let {msg,code,data}=res.data;
							if(code==200){
								this.submitting=false;
								console.log(res);
								this.info.status=1;
								this.$message.success("提交成功");
							}else{
								this.submitting=false;
								console.log(res);
								this.$message.error(msg);
							}
						})
					})
				}
			})
		},
		resetForm(form){
        	this.$refs[form].resetFields();
		}
	},
	computed:{
		title(){
			let d=new Date()
			let month=d.getMonth()+1
			let year=d.getFullYear()
			if( month > 3 && month < 9 ){
				return year+"上半年注册表"
			}
			return year+"下半年注册表"
		}
	}
}
</script>
<style lang="scss" scoped>
</style>