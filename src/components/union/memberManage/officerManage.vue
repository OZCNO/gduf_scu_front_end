<template>
	<section class="officerManageContainer">
		<!-- 搜索框 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" size="mini" :model="filters">
				<el-form-item>
					<el-input placeholder="姓名" v-model="filters.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :click="getStudentList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="studentList" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
			<el-table-column type="index" width="55">				
			</el-table-column><el-table-column prop="department" label="部门" show-overflow-tooltip sortable>			
			</el-table-column><el-table-column prop="grade" label="年级" sortable width="70">
			</el-table-column><el-table-column prop="name" label="姓名" sortable width="80">				
			</el-table-column><el-table-column prop="sex" label="性别" sortable width="70" :formatter="formatSex">				
			</el-table-column><el-table-column prop="status" label="职务" show-overflow-tooltip sortable width="70">		
			</el-table-column><el-table-column prop="mobile" label="手机号码" show-overflow-tooltip sortable width="120">	
			</el-table-column><el-table-column prop="email" label="邮箱" show-overflow-tooltip sortable width="150">		
			</el-table-column><el-table-column prop="institute" label="学院" show-overflow-tooltip sortable>			
			</el-table-column><el-table-column prop="major" label="专业" show-overflow-tooltip sortable>			
			</el-table-column>
			<el-table-column label="操作" width="150" fixed="right">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar">
			<el-pagination
			  background
			  small
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
			  :page-size="10"
			  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!-- 编辑界面 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
			    <el-form-item label="姓名" prop="name">
			    	<el-input v-model="editForm.name" autocomplete="off"></el-input>
			    </el-form-item>
				<el-row>
					<el-col :span="12">
					    <el-form-item label="性别">
					      	<el-radio-group v-model="editForm.sex">
								<el-radio class="radio" label="0">男</el-radio>
								<el-radio class="radio" label="1">女</el-radio>
							</el-radio-group>
					    </el-form-item>
					    <el-form-item label="年级">
							<el-input-number v-model="editForm.grade" :min="0" :max="99"></el-input-number>
					    </el-form-item>
						<el-form-item label="学院">
							<el-select v-model="editForm.institute" @change="instituteChange">
								<el-option v-for="(item,index) in institute" :value="index"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="专业">
							<el-select v-model="editForm.major" @change="majorChange">
								<el-option v-for="(item,index) in major" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
					    <el-form-item label="部门" prop="department">
					    	<el-input v-model="editForm.department" autocomplete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="职务">
					    	<el-select v-model="editForm.status">
						        <el-option label="会员" value="会员"></el-option>
						        <el-option label="干事" value="干事"></el-option>
						        <el-option label="副部" value="副部"></el-option>
						        <el-option label="正副" value="正部"></el-option>
						    </el-select>
					    </el-form-item>
					    <el-form-item label="手机" prop="mobile">
					    	<el-input v-model="editForm.mobile" autocomplete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="邮箱" prop="email">
					    	<el-input v-model="editForm.email" autocomplete="off"></el-input>
					    </el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
  import { getUnionMemberList } from '../../../api.js';
  // import { formatSex } from '../../../common.js';
export default{
	name:"OfficerManage",
	data(){
		return{
			filters: {
				name: ''
			},
			page:1,
			total:0,
			listLoading:false,
			studentList:[],
			institute:[],
			editFormVisible: false,
			editForm:{
				id:0,
				name:"",
				sex:-1,
				grade:15,
				status:"会员",
				institute:"金融学",
				major:"金融学",
				department:"",
				mobile:"",
				email:""
			},
			editFormRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
			editLoading:false,
		}
	},
	created:function(){
		// 请求表格数据
		this.getStudentList();
		this.getInstitute();
	},
	methods:{
		//如何把这个函数提到common.js里面去
		//性别显示转换
		formatSex(row, column){
			return row.sex == 0 ?"男": row.sex ==1?"女":"-";
		},
		//获取学院列表
		getInstitute(){
			this.$axios.get("https://getInstitute").then(res=>{
				this.institute=JSON.parse(res.data);
			}).catch(err=>{
				console.log(err);
				alert("出错啦，再试一次");
				window.location.reload();
			})
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val;
			this.getStudentList();
		},
		//获取用户列表
		getStudentList(){
			let para={
				page:this.page,
				name:this.filters.name,
				type:2,
				token:JSON.parse(sessionStorage.getItem("token"))
			}
			this.listLoading=true;
			getUnionMemberList(1,para).then(res=>{
				if(res.status==200){
					this.total=res.data.totalCount;
					this.studentList=res.data.studentList;
					this.listLoading=false;
				}
			}).catch(err=>{
				this.$message.error("数据获取失败");
				this.listLoading=false;
			})		
		},
		//显示编辑界面
		handleEdit(index, row) {
			this.editFormVisible = true;
			this.editForm = row;
		},
		// 学院值改变的时候
    	instituteChange(value){
    		this.editForm.major="";
    	},
    	// 专业值改变的时候
    	majorChange(value){
    		var obj=this.institute;
			var key;
			for(key in obj){
    			if(obj.hasOwnProperty(key)){
					if(obj[key].indexOf(value)>=0){
						this.editForm.institute=key;
    				}
				}
			}
    	},
    	//提交编辑
    	editSubmit(){
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						this.$axios({
							url:"/editThis",
							type:"put",
							data:this.editForm
						}).then((res)=>{
							//把编辑的信息editForm提交到后端，成功后刷新页面
							this.$message({
								message: '修改成功',
								type: 'success'
							});
							this.editLoading = false;
							this.editFormVisible = false;
							//重新获取用户列表
						})
					});
				}
			})
    	},
    	//删除
    	handleDel(index, row){
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { id: row.id };
				this.$axios({
					url:"/removeThis",
					type:"post",
					data:para
				}).then((res)=>{
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					// this.getUsers();
					// 成功后重新获取用户列表，刷新
				});
			}).catch(() => {
				});
    	}
	},
	computed:{
  		major:function(){
  			var arr=[];
  			var obj=this.institute;
  			var key;
  			if(this.editForm.institute!=""){
  				arr=obj[this.editForm.institute];
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
	}	
}
</script>