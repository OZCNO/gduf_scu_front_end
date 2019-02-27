<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>年度注册表</span>
	    <el-button style="float: right; padding: 3px 0;" type="text" @click="dialogFormVisible = true">填写</el-button>
	</div>
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="time" label="申请时间" sortable>
		</el-table-column><el-table-column prop="audit_status" label="状态" sortable :formatter="formatStatus">
		</el-table-column>
		<el-table-column label="操作">	
		 	<template slot-scope="scope">
				<el-button size="mini" type="text" @click="openForm(scope.$index, scope.row)">查看</el-button> 
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
    <!-- 新增注册表 -->
    <el-dialog title="年度注册表" :visible.sync="dialogFormVisible">
		<!-- 自动获取系列 -->
		<el-form ref="info" :model="info" :inline="true" size="mini" disabled>
		  <el-form-item label="社团全称"><el-input v-model="info.name"></el-input>
		  </el-form-item><el-form-item label="社团类别"><el-input v-model="info.type"></el-input>
		  </el-form-item><el-form-item label="会员人数"><el-input v-model="info.memberSum"></el-input>
		  </el-form-item><el-form-item label="干事人数"><el-input v-model="info.officerSum"></el-input>
		  </el-form-item><el-form-item label="指导老师姓名"><el-input v-model="info.teacherName"></el-input>
		  </el-form-item><el-form-item label="指导老师电话"><el-input v-model="info.teacherMobile"></el-input>
		  </el-form-item>	  
		</el-form>
		<el-form ref="form" :model="form" :rules="formRules" size="mini">
		  <!-- 填写系列 -->
			<el-form-item label="上学期工作总结" prop="summary"><el-input type="textarea" v-model="form.summary"></el-input>
			</el-form-item><el-form-item label="新学期工作计划" prop="plan"><el-input type="textarea" v-model="form.plan"></el-input>
			</el-form-item><el-form-item label="备注" prop="comment"><el-input type="textarea" v-model="form.comment"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
		    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
			<el-button @click="resetForm('form')">重置</el-button>
		    <el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
		</div>
	</el-dialog>
	<!-- 过去注册表 -->
    <el-dialog title="年度注册表" :visible.sync="dialogFormVisible2">
    	<span style="color:red">意见：{{form.reason}}</span>    
		<el-form ref="form2" :model="form2" :inline="true" size="mini" disabled>
		  <el-form-item label="社团全称"><el-input v-model="form2.clubName" ></el-input>
		  </el-form-item><el-form-item label="社团类别"><el-input v-model="form2.type"></el-input>
		  </el-form-item><el-form-item label="会员人数"><el-input v-model="form2.memberSum"></el-input>
		  </el-form-item><el-form-item label="干事人数"><el-input v-model="form2.officerSum"></el-input>
		  </el-form-item><el-form-item label="指导老师姓名"><el-input v-model="form2.teacherName"></el-input>
		  </el-form-item><el-form-item label="指导老师电话"><el-input v-model="form2.teacherMobile"></el-input>
		  </el-form-item>	  
		</el-form>
		<el-form ref="form2" :model="form2" size="mini" disabled>
			<el-form-item label="上学期工作总结" prop="summary"><el-input type="textarea" v-model="form2.summary"></el-input>
			</el-form-item><el-form-item label="新学期工作计划" prop="plan"><el-input type="textarea" v-model="form2.plan"></el-input>
			</el-form-item><el-form-item label="备注" prop="comment"><el-input type="textarea" v-model="form2.comment"></el-input>
			</el-form-item>
		</el-form>
	</el-dialog>
</el-card>
</template>
<script>
import { requestClubAnnualReg,getAnnualRegList } from "../../../api.js"
export default{
	name:"ClubReg",
	data(){
		return{
			//已知信息
			list:[],
			page:1,
			total:1,
			submitting:false,
			listLoading:false,
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
			form:{
				clubId:"",
				summary:"",
				plan:"",
				comment:"",
			},
			formRules:{
	          summary: [{ required: true, message: '不能为空', trigger: 'blur'}],
	          plan:[{ required: true, message: '不能为空', trigger: 'blur'}]
			},
			form2:{},
			dialogFormVisible:false,
			dialogFormVisible2:false,
		}
	},
	created(){
		this.getList()
	},
	methods:{
		getList(){
            let params={
                page:this.page,
                // status:2
            }
			getAnnualRegList(params).then(res=>{
				// this.listLoading=true
				let {msg,code,data}=res.data
				if(code==200){
					console.log(res)
					this.list=data.list
					this.total=data.totalCount
					this.form.clubId=this.list[0].clubId
				}else{
					this.$message.error(msg)
				}
				// this.listLoading=false
			})			
		},
		openForm(index,row){
			this.form2=row
			this.dialogFormVisible2=true
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
			this.getList()
		},
		//如果在提交过程中取消了，应该？
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("提交后不可修改，确定要提交了吗？","提示").then(()=>{
						requestClubAnnualReg(this.form.clubId,this.form).then((res)=>{
							console.log(res)
		            		this.submitting = true
							let {msg,code,data}=res.data
							if(code==200){
								this.submitting=false
								this.$message.success("提交成功")
								this.dialogFormVisible=false
								this.resetForm(form)
								this.getList()
							}else{
								this.submitting=false
								this.$message.error(msg)
							}
						}).catch(err=>{})
					})
				}
			})
		},
		resetForm(form){
        	this.$refs[form].resetFields()
		},
		formatStatus(row, column){
			return row.auditStatus == 1 ?"待审核": row.auditStatus ==2?"通过审核":row.auditStatus ==3?"未通过审核":"已发布"
		},
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