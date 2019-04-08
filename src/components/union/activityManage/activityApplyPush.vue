<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>活动列表</span>
	    <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">申请活动</el-button>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="timeBegin" label="举办时间" sortable show-overflow-tooltip>
		</el-table-column><el-table-column prop="theme" label="活动主题" show-overflow-tooltip>	
		</el-table-column><el-table-column prop="introduction" label="活动简介 " show-overflow-tooltip>
		</el-table-column><el-table-column prop="auditStates" label="状态" sortable :formatter="formatauditStates">
		</el-table-column>
		<el-table-column label="操作" fixed="right">	
		 	<template slot-scope="scope">
				<el-button size="mini" type="text" @click="openForm(scope.$index, scope.row)">
					<span v-if="scope.row.auditStates==2">发布活动</span>
					<!-- <span v-else-if="scope.row.auditStates==3">重新填写</span> -->
					<span v-else>表单详情</span>
				</el-button> 
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
    <!-- 新增活动表单 -->
    <el-dialog title="申请活动" :visible.sync="dialogFormVisible">
		<el-form ref="form" :model="form" :rules="formRules" label-width="110px" class="form" size="mini">
			<el-form-item label="活动主题" prop="theme">
				<el-input type="text" v-model="form.theme" placeholder="请输入活动主题"></el-input>
			</el-form-item>
			<el-form-item label="活动类型" prop="memberActivity">
				<el-radio-group v-model="form.memberActivity">
					<el-radio-button :label="0">普通活动</el-radio-button>
					<el-radio-button :label="1">会员活动</el-radio-button>
					<el-radio-button :label="2">招新活动</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="报名截止时间" prop="enrollDeadline">
				<el-date-picker v-model="form.enrollDeadline"  type="datetime"  placeholder="选择日期时间"  default-time="12:00:00"></el-date-picker>
			</el-form-item>
			<el-form-item label="活动时间" >
				<el-col :span="11">
					<el-form-item prop="timeBegin">
						<el-date-picker type="datetime" placeholder="选择开始时间" v-model="form.timeBegin"  default-time="12:00:00"  style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="2" style="text-align: center">—</el-col>
				<el-col :span="11">
					<el-form-item prop="timeEnd">
						<el-date-picker type="datetime" placeholder="选择结束时间" v-model="form.timeEnd"  default-time="12:00:00" style="width: 100%;"></el-date-picker>
					</el-form-item></el-col>
			</el-form-item>
			<el-form-item label="申请">
					<el-col :span="8">
						<el-switch v-model="form.isMoney" active-text="经费" active-value="1" inactive-value="0" @change="isMoneyChange"></el-switch>
					</el-col>
					<el-col :span="8">
						<el-switch v-model="form.isGoods" active-text="物品" active-value="1" inactive-value="0" @change="isGoodsChange"></el-switch>
					</el-col>
					<el-col :span="8">
						<el-button @click="addGoods" v-if="form.isGoods==1">新增物品</el-button>
					</el-col>
			</el-form-item>
			<el-form-item label="经费" prop="money" v-if="form.isMoney==1">
				<el-input-number v-model="form.money" :step="50"></el-input-number> 元</el-form-item>
			<el-form-item v-if="form.isGoods==1" v-for="(item, index) in form.goods" :label="'物品' + (index+1)" :key="item.key" :prop="'goods.' + index + '.name'" :rules="{ required: true, message: '不能为空', trigger: 'blur'}">
				<el-col :span="10">
					<el-input v-model="item.name" placeholder="请输入物品名称"></el-input>
				</el-col>	
				<el-col :span="1" style="text-align: center">：</el-col>
				<el-col :span="6">
					<el-input-number v-model="item.sum" :min="1" :step="1" controls-position="right"></el-input-number>
				</el-col>
				<el-col :span="6" :offset="1">
					<el-button @click.prevent="removeGoods(item)">删除</el-button>
					</el-col>
			</el-form-item>
			<el-form-item label="地点" prop="address">
				<el-input type="text" v-model="form.address" placeholder="请输入活动地点"></el-input>
			</el-form-item>
			<el-form-item label="简介" prop="introduction">
				<el-input type="text" v-model="form.introduction" placeholder="活动简介"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.content" placeholder="发动小伙伴来参加......"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
		    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
			<el-button @click="resetForm('form')">重置</el-button>
		    <el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
		</div>
	</el-dialog>
	<!-- 活动详情 -->
	<el-dialog title="活动详情" :visible.sync="dialogDetailFormVisible">
    	<span style="color:red;" v-if="detailForm.auditStates>1">意见：{{detailForm.reason}}</span>
	    <el-form ref="detailForm" :model="detailForm" label-width="110px" size="mini"  :disabled="bool">
			<el-form-item label="活动主题">
				<el-input type="text" v-model="detailForm.theme"></el-input>
			</el-form-item>
			<el-form-item label="活动类型">
				<el-radio-group v-model="detailForm.memberActivity">
					<el-radio-button :label="0">普通活动</el-radio-button>
					<el-radio-button :label="1">会员活动</el-radio-button>
					<el-radio-button :label="2">招新活动</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="报名截止时间">
			    <el-date-picker v-model="detailForm.enrollDeadline"  type="datetime"  placeholder="选择日期时间"  default-time="12:00:00">
			    </el-date-picker>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="datetime" v-model="detailForm.timeBegin"  default-time="12:00:00"  style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col :span="2" style="text-align: center">—</el-col>
				<el-col :span="11">
					<el-date-picker type="datetime" v-model="detailForm.timeEnd"  default-time="12:00:00" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="经费" v-if="detailForm.money!=0">
				<el-input-number v-model="detailForm.money"></el-input-number> 元
			</el-form-item>
			<el-form-item v-for="(item, index) in detailForm.goods" :label="'物品' + (index+1)" :key="item.key">
				<el-col :span="10"><el-input v-model="item.name"></el-input></el-col>	
				<el-col :span="1" style="text-align: center">：</el-col>
				<el-col :span="6"><el-input v-model="item.sum"></el-input></el-col>
			</el-form-item>
			<el-form-item label="地址">
				<el-input type="text" v-model="detailForm.address"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input type="text" v-model="detailForm.introduction"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<el-input type="textarea" v-model="detailForm.content"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" v-if="detailForm.auditStates==2">
		    <el-button @click="dialogDetailFormVisible = false" plain>取 消</el-button>
		    <el-button type="primary" @click="publish">发布</el-button>
		</div>
	</el-dialog>
</el-card>
</template>
<script>
import {requestActivity,getActivityList,editActivity} from "../../../api.js";
export default{
	name:"ActivityApplyPush",
	data(){
		return{
			list:[],
			listLoading:false,
			page:1,
			total:10,
			dialogFormVisible:false,
			dialogDetailFormVisible:false,
			form:{
				clubUnionId:"",
				theme:"",
				content:"",
				memberActivity:0,
				timeBegin:"",
				timeEnd:"",
				enrollDeadline:"",
				introduction:"",
				isMoney:0,
				isGoods:0,
				address:"",
				money:"",
				goods:[]
			},
			formRules:{
				theme: [{ required: true, message: '不能为空', trigger: 'blur'}],
				content:[{ required: true, message: '不能为空', trigger: 'blur'}],
				address:[{ required: true, message: '不能为空', trigger: 'blur'}],
				money:[{ required: true, message: '不能为空', trigger: 'blur'}],				
				timeBegin:[{type: 'date', required: true, message: '不能为空', trigger: 'change'}],
				timeEnd:[{type: 'date', required: true, message: '不能为空', trigger: 'change'}],
				enrollDeadline:[{type: 'date', required: true, message: '不能为空', trigger: 'change'}],
				introduction:[{ required: true, message: '不能为空', trigger: 'blur'}]
			},
			detailForm:{},
			bool:true,
			submitting:false,
		}
	},
	created(){
		this.getList()
	},
	methods:{
		getList(){
			let params={
				page:this.page,
			}
			this.listLoading=true
			getActivityList("union",params).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.list=data.list
					this.total=data.totalCount
				}else{
					this.$message.error(msg)
				}
				this.listLoading=false
			}).catch(res=>{
				this.listLoading=false
				this.$message.error(msg)
			})
		},
		// 表单详情
		openForm(index,row){
			this.detailForm=row
			this.dialogDetailFormVisible=true
			// this.bool=row.auditStates==3?false:true
		},
		// 发布
		publish(){
			let params={
				status:4
			}
			editActivity(this.detailForm.id,params).then((res)=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.dialogDetailFormVisible=false
					this.$message.success("发布成功")
					this.getList()
				}else{
					this.$message.error(msg);
				}
			})		
		},
		formatauditStates(row, column){
			return row.auditStates == 1 ?"待审核": row.auditStates ==2?"待发布":row.auditStates ==3?"未通过审核":"已发布"
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
			this.getList()
		},
		resetForm(form){
    		this.$refs[form].resetFields()			
		},
		// 提交
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("确定提交吗？","提示").then(()=>{
						this.form.clubUnionId=1
						requestActivity("union",this.form).then((res)=>{
		            		this.submitting = true
							let {msg,code,data}=res.data
							if(code==200){
								this.submitting=false
								this.$message.success("提交成功")
    							this.resetForm(form)
								this.dialogFormVisible = false
								this.getList()
								// 重新获取活动列表
							}else{
								this.submitting=false
								this.$message.error(msg)
							}
						})
					})
				}
			})
		},
		removeGoods(item) {
	        var index = this.form.goods.indexOf(item)
	        if (index !== -1) {
	          this.form.goods.splice(index, 1)
	        }
	        if (this.form.goods.length == 0) {
	        	this.form.isGoods=false
	        }
	    },
		addGoods() {
			this.form.goods.push({
				sum: '',
				name: "",
				key: Date.now()
			});
		},
		isMoneyChange(val){
			this.form.money=""
		},
		isGoodsChange(val){
			if(val==0){
				this.form.goods=[]
			}else{
				this.form.goods=[{
					sum:"",
					name:""				
				}]
			}
		}
	}
}
</script>
<style lang="scss" scoped>
// .clearfix:before,
// .clearfix:after {
// 	display: table;
// 	content: "";
// }
// .clearfix:after {
// 	clear: both
// }
</style>