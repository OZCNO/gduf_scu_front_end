<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>活动经费详情</span>
	    <!-- 在活动审核前就把经费表提交 -->
	</div>
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="timeBegin" label="举办时间" sortable show-overflow-tooltip>
		</el-table-column><el-table-column prop="theme" label="活动主题" show-overflow-tooltip>
		</el-table-column><el-table-column prop="money" label="使用金额总额" show-overflow-tooltip>	
		</el-table-column>
		<el-table-column label="操作" fixed="right">	
		 	<template slot-scope="scope">
				<el-button size="mini" type="text" @click="openForm(scope.$index, scope.row)">填写经费表
				</el-button> 
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
	    <span>余额：{{balance}}元</span>
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
	<!--  -->
	<el-dialog title="活动经费使用详情" :visible.sync="formVisible">
		<el-form :model="form" size="mini" label-width="80px" disabled>
			<el-form-item label="活动主题"><el-input v-model="form.theme"></el-input></el-form-item>
			<el-form-item label="总金额"><el-input v-model="form.money"></el-input></el-form-item>
		</el-form>
		<el-form ref="moneyForm" :model="moneyForm" size="mini" label-width="80px">
			<el-form-item v-for="(item, index) in moneyForm.moneyUse" :label="'用途' + (index+1)" :key="item.key" :prop="'moneyUse.' + index + '.use'" :rules="{ required: true, message: '不能为空', trigger: 'blur'}">
				<el-col :span="10"><el-input v-model="item.use" placeholder="请输入用途"></el-input></el-col>	
				<el-col :span="1" style="text-align: center">：</el-col>
				<el-col :span="7"><el-input-number v-model="item.sum" :step="50"></el-input-number> 元</el-col>
				<el-col :span="5" :offset="1"><el-button @click.prevent="removeUse(item)">删除</el-button></el-col>
			</el-form-item>
			<el-button @click="addUse" size="mini">新增经费用途</el-button>
		</el-form>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="formVisible = false" plain>取消</el-button>
		    <el-button type="primary" @click="submit('moneyForm')">提交</el-button>
		</div>
	</el-dialog>
</el-card>
</template>
<script>
import {getMoneyActivityList,pushMoneyDetail} from "../../../api.js"
export default{
	props:["user"],
	name:"clubActivityMoneyPush",
	data(){
		return{
			page:1,
			total:3,
			listLoading:false,
			list:[],
			moneyForm:{
				activityId:0,
				moneyUse:[{
					use:"",
					sum:""
				}]
			},
			form:{},
			formVisible:false,
			balance:"200"
		}
	},
	created(){
		this.upload()
	},
	methods:{		
		upload(){
			let params={
				// status:0
			}
			getMoneyActivityList("union",this.user.id,params).then(res=>{
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
			this.form=row
			this.moneyForm.activityId=row.id
			this.formVisible=true
		},
		addUse(){
			this.moneyForm.moneyUse.push({
				use: "",
				sum: '',
				key: Date.now()
			});
		},
		removeUse(item){
	        var index = this.moneyForm.moneyUse.indexOf(item)
	        if (index !== -1) {
	          this.moneyForm.moneyUse.splice(index, 1)
	        }
	        if (this.moneyForm.moneyUse.length == 0) {
				this.moneyForm.moneyUse.push({
					use: "",
					sum: '',
					key: Date.now()
				});
	        }			
		},
		submit(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
	          		// 验证总金额
	          		let total=this.form.money
	          		let actTotal=0
	          		this.moneyForm.moneyUse.forEach((item,index)=>{
	          			if(item.use!=""){
	          				actTotal+=item.sum
	          			}
	          		})
	          		if(actTotal==total){
	          			pushMoneyDetail(this.moneyForm.activityId,this.moneyForm.moneyUse).then(res=>{
	          				let {msg,code,data}=res.data
	          				if(code==200){
		          				this.$message.success("提交成功")
		          				this.form={};
		          				//清空moneyForm
		          				this.moneyForm.moneyUse.length=0;
		          				this.moneyForm.moneyUse.push({
									use: "",
									sum: '',
									key: Date.now()
								})
								this.formVisible=false
		          				this.upload()
	          				}
	          			}).catch(err=>{
	          				this.$message.error(err);
	          			})

	          		}else{
	          			this.$message.error("总金额不相等")
	          			return false;
	          		}
	          	}
	        })
		},
	},
}
</script>
<style lang="scss" scoped>

	
</style>