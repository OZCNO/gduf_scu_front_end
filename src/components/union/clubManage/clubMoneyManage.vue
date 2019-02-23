<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>社团保管金管理</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" size="mini">
		<el-table-column prop="clubName" label="社团">
		</el-table-column><el-table-column prop="money" label="剩余经费">
		</el-table-column>
		<el-table-column label="操作">	
		 	<template slot-scope="scope">
				<el-button size="mini" type="text" @click="openForm(scope.$index, scope.row)">
					<span>管理</span>
				</el-button> 
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
    <!-- 管理社团经费 -->
    <el-dialog title="管理社团经费" :visible.sync="dialogFormVisible">
		<el-form ref="form" :model="form" :rules="formRules" label-width="80px" class="form" size="mini">
			<el-form-item label="增加经费" prop="money">
				<el-input-number  v-model="form.money" :step="100"></el-input-number>
			</el-form-item>
			<el-form-item label="备注" prop="comment">
				<el-input type="text" v-model="form.comment"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
		    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
			<el-button @click="resetForm('form')">重置</el-button>
		    <el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
		</div>
	</el-dialog>
</el-card>
</template>
<script>
import {editClubMoney} from "../../../api.js"
export default{
	name:"ClubMoneyManage",
	data(){
		return{
			list:[
				{	
					clubId:"1",
					clubName:"数学协会",
					money:1000,					
				},
				{
					clubId:"2",
					clubName:"乒乓球协会",
					money:1100,					
				},
				{
					clubId:"3",
					clubName:"魔方协会",
					money:800,					
				},
			],
			listLoading:false,
			page:1,
			total:10,
			dialogFormVisible:false,
			form:{
				clubId:0,
				money:0,
				comment:""
			},
			formRules:{
				comment:[{required:true,message:"不能为空",trigger:"blur"}]
			},
		}
	},
	methods:{		
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
		},
		openForm(index,row){
			this.form.clubId=row.clubId
			this.dialogFormVisible=true
		},
		resetForm(form){
    		this.$refs[form].resetFields()			
		},
		// 提交
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("确定提交吗？","提示").then(()=>{
						this.form.clubId=1
						console.log(this.form)
						editClubMoney(this.form).then((res)=>{
		            		this.submitting = true
							let {msg,code,data}=res.data
							if(code==200){
								this.submitting=false
								console.log(res)
								this.$message.success("提交成功")
    							this.resetForm(form)
								this.dialogFormVisible = false
								// 重新获取活动列表
							}else{
								this.submitting=false
								console.log(res)
								this.$message.error(msg)
							}
						})
					})
				}
			})
		},
	}
}
</script>
<style lang="scss" scoped>

	
</style>