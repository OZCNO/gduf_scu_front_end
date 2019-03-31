<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>社团保管金管理</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" size="mini">
		<el-table-column prop="name" label="社团">
		</el-table-column><el-table-column prop="moneySum" label="剩余经费">
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
		<el-form ref="form" :model="form" label-width="80px" class="form" size="mini">
			<el-form-item label="经费" prop="moneySum">
				<el-input-number  v-model="form.moneySum" :step="100"></el-input-number>
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
import {getClubMoney,editClubMoney} from "../../../api.js"
export default{
	props:["user"],
	name:"ClubMoneyManage",
	data(){
		return{
			list:[],
			listLoading:false,
			page:1,
			total:10,
			dialogFormVisible:false,
			form:{
				moneySum:0,
			},
			submitting:false,
		}
	},
	created(){
		this.upload()
	},
	methods:{		
		upload(){
			getClubMoney("club").then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.list=data.list
				}else{
					this.$message.error(msg)
				}
			}).catch(err=>{
				this.$message.error(err)
			})			
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
		},
		openForm(index,row){
			this.form.id=row.id
			this.form.moneySum=row.moneySum
			this.dialogFormVisible=true
		},
		resetForm(form){
    		this.$refs[form].resetFields()			
		},
		// 提交
		submitForm(form){
			if(this.form.money<=0){
				this.$message.warning("请正确输入修改金额")
				return;
			}
			this.$confirm("确定提交吗？","提示").then(()=>{
				console.log(form)
				editClubMoney("club",this.form.id,this.form).then((res)=>{
            		this.submitting = true
					let {msg,code,data}=res.data
					if(code==200){
						this.submitting=false
						this.$message.success("提交成功")
						this.resetForm(form)
						this.dialogFormVisible = false
						// 重新获取活动列表
						this.upload()						
					}else{
						this.submitting=false
						console.log(res)
						this.$message.error(msg)
					}
				})
			})
		},
	}
}
</script>
<style lang="scss" scoped>

	
</style>