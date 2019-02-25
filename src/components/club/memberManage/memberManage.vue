<template>
<div class="officerManageContainer">
	<!-- 搜索框 -->
	<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		<el-form :inline="true" size="mini" :model="filters">
			<el-form-item>
				<el-input placeholder="姓名" v-model="filters.name"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getStudentList(1)">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="downloadExcel(false)">导出当前页面/打勾数据</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="text" @click="downloadExcel(true)">导出所有数据</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<el-table :data="studentList" :highlight-current-row="true" v-loading="listLoading"  @selection-change="selectionChange"  style="width: 100%" class="tableClass" size="mini">
		<!-- 多选按钮 -->
		<el-table-column type="selection" width="35">	
		</el-table-column>
		<el-table-column type="index" width="55">				
		</el-table-column><!-- <el-table-column prop="department" label="部门" show-overflow-tooltip sortable>			
		</el-table-column><el-table-column prop="grade" label="年级" sortable width="70">
		</el-table-column> --><el-table-column prop="name" label="姓名" sortable width="80">				
		</el-table-column><el-table-column prop="sex" label="性别" sortable width="70">				
		</el-table-column><!-- <el-table-column prop="status" label="职务" show-overflow-tooltip sortable width="70">		
		</el-table-column> --><el-table-column prop="code" label="学号" sortable width="120">	
		</el-table-column><el-table-column prop="mobile" label="手机号码" show-overflow-tooltip sortable width="120">	
		</el-table-column><el-table-column prop="email" label="邮箱" show-overflow-tooltip sortable width="150">		
		</el-table-column><!-- <el-table-column prop="institute" label="学院" show-overflow-tooltip sortable>			
		</el-table-column> --><el-table-column prop="major" label="专业" show-overflow-tooltip sortable>			
		</el-table-column>
		<el-table-column label="操作" width="150" fixed="right">
			<template slot-scope="scope">
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
							<el-option v-for="(item,index) in institute" :value="index" :key="index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="专业">
						<el-select v-model="editForm.major" @change="majorChange">
							<el-option v-for="(item,index) in major" :value="item" :key="index"></el-option>
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
</div>
</template>
<script>
  import { getClubMemberList } from '../../../api.js';
  // import { formatSex } from '../../../common.js';
export default{
	name:"clubMemberManage",
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
			// 批量选择
			multipleSelection: [],
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
			cname:['姓名','性别',"学号","专业","手机号码","邮箱"],
			ename:['name','sex',"code","major","mobile","email"],

		}
	},
	created:function(){
		// 请求表格数据
		this.getStudentList();
		this.getInstitute();
	},
	methods:{
		//列表下载
        downloadExcel(bool) {
          this.$confirm('确定下载列表文件?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          	//导出的数据list。
          	if(bool){
          		//请求所有数据并且赋给this.excelData
          		let para={pageSize:this.total}
          		let clubID=1
				getClubMemberList(clubID,para).then(res=>{
					let {msg,code,data}=res.data;
					if(code==200){
						this.excelData=this.formatList(data.list);
						//因为这里是异步，所以必须在这里调用，在外面调用excelData会为空
            			this.export2Excel(this.cname,this.ename,this.excelData)
					}
				}).catch(err=>{
					this.$message.error("失败");
				})	
          	}else{
            	this.excelData =this.multipleSelection.length > 0 ? this.multipleSelection : this.studentList 
				this.excelData=this.excelData;
            	this.export2Excel(this.cname,this.ename,this.excelData)
          	}
          }).catch(() => {
 
          });
        },
    	//数据写入excel
        export2Excel(cname,ename,studentList) {
          var that = this;
          require.ensure([], () => {
            //这里必须使用绝对路径，使用@/+存放export2Excel的路径
            const { export_json_to_excel } = require('@/vendor/export2Excel'); 
            //导出的表头名信息
            const tHeader = cname;
            //导出的表头字段名，需要导出表格字段名
            const filterVal = ename; 
            const list = studentList;
            const data = that.formatJson(filterVal, list);
            // 导出的表格名称，根据需要自己命名
            export_json_to_excel(tHeader, data, '下载数据excel');
          })
        },
      	//格式转换，直接复制即可
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
		formatList(list){
			list.forEach((item,index)=>{
				if(item["sex"]!==undefined){
					item["sex"]=item["sex"]==0?"男":"女"//注意只能转一次，不要重复转了
				}
				if(item["status"]!==undefined){
					item["status"]=item["status"]==1?"待审核":item["status"]==2?"审核通过":item["status"]==3?"审核未通过":"已发布"
				}
			})
			return list
		},
		//性别显示转换
		// formatSex(row, column){
		// 	return row.sex == 0 ?"男": row.sex ==1?"女":"-";
		// },
	    selectionChange(val) {
	      	this.multipleSelection = val;
	    },
		//获取学院列表
		getInstitute(){
			this.$axios.get("/getInstitute").then(res=>{
				this.institute=JSON.parse(res.data);
			}).catch(err=>{
				console.log(err);
				console.log("获取学院列表出错");
				// this.$confirm("获取学院列表出错啦，再试一次","错误",{}).then(()=>{
				// 	window.location.reload();
				// })
			})
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val;
			this.getStudentList();
		},
		//获取用户列表
		getStudentList(data){
			//在查询的时候，把page重置为1
			this.page=data
			let para={
				page:this.page,
				name:this.filters.name,
				type:1,
			}
			let clubID=1;
			this.listLoading=true;
			getClubMemberList(clubID,para)
			.then(res=>{
				let {msg,code,data}=res.data;
				if(code==200){
					console.log(res);
					this.total=data.totalCount;
					this.studentList=data.list;
					this.formatList(this.studentList);
					this.listLoading=false;
				}else{
					this.listLoading=false;
					this.$message.error(msg);
					console.log(res);
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