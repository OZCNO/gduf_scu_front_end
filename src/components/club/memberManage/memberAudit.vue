<template>
	<section class="clubMemberAuditContainer">
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
		<!-- 通过或拒绝应该显示为已通过或已拒绝。
			可以添加一个过滤列，显示审核状态，可只显示已通过，已拒绝，未审核三种状态 -->
		<!--  highlight-current-row是指单击会高亮 -->
		<!-- 表格 -->
		<el-table :data="studentList" :highlight-current-row="true" v-loading="listLoading" @selection-change="selectionChange" style="width: 100%" class="tableClass" size="mini">
			<!-- 多选按钮 -->
			<el-table-column type="selection" width="35">	
			</el-table-column>
			<el-table-column type="expand" width="15">
			<!-- 展开的模版 -->
				<template slot-scope="props">
					<el-form label-position="left" inline class="tableExpand">
					  <el-form-item label="头像">
			            <img :src="props.row.avatar"></img>
			          </el-form-item>
			          <el-form-item label="手机号码">
			            <span>{{ props.row.mobile}}</span>
			          </el-form-item>
			          <el-form-item label="邮箱">
			            <span>{{ props.row.email}}</span>
			          </el-form-item>
			          <el-form-item label="自我介绍">
			            <span>{{ props.row.introduce }}</span>
			          </el-form-item>
			          <el-form-item label="参加原因">
			            <span>{{ props.row.reason }}</span>
			          </el-form-item>
			        </el-form>
				</template>
			</el-table-column>
			<el-table-column type="index" width="35">
			</el-table-column><el-table-column prop="grade" label="年级" sortable width="70">
			</el-table-column><el-table-column prop="name" label="姓名" sortable width="80">	
			</el-table-column><el-table-column prop="sex" label="性别" sortable width="70" :formatter="formatSex">
			</el-table-column><el-table-column prop="institute" label="学院" show-overflow-tooltip sortable>	
			</el-table-column><el-table-column prop="major" label="专业" show-overflow-tooltip sortable>	
			</el-table-column><el-table-column prop="department" label="招新部门" show-overflow-tooltip sortable min-width="90">		
			</el-table-column><el-table-column prop="status" label="职务" show-overflow-tooltip sortable width="80">		
			</el-table-column><el-table-column prop="reason"  label="参加原因" show-overflow-tooltip>	
			</el-table-column><el-table-column prop="introduce"  label="自我介绍" show-overflow-tooltip>	
			</el-table-column><el-table-column prop="time" label="报名时间" show-overflow-tooltip sortable width="100">
			</el-table-column>
			<el-table-column label="操作"  width="142" fixed="right">
			 	<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="accept(scope.$index, scope.row)">通过</el-button><el-button size="mini" type="danger" @click="reject(scope.$index, scope.row)">拒绝</el-button>
				</template>
			</el-table-column> 
		</el-table>
		<el-col :span="24" class="toolbar">
			<el-button type="primary" @click="acceptSome" size="mini">批量通过</el-button><el-button type="danger" @click="rejectSome"  size="mini">批量删除</el-button>
			<el-pagination
			  background
			  small
			  layout="prev, pager, next"
			  @current-change="handleCurrentChange"
			  :page-size="10"
			  :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>
<script>
  import { getUnauditClubMemberList } from '../../../api.js';
export default{
	name:"clubMemberAudit",
	data(){
		return{
			listLoading:false,
			studentList:[],
			// 批量选择
			multipleSelection: [],
			filters: {
				name: ''
			},
			page:1,
			total:0,
		}
	},
	created:function(){
		// 请求表格数据
		this.getStudentList();
	},
	methods:{
		//如何把这些函数提到common.js里面去
		//性别显示转换
		formatSex(row, column){
			return row.sex == 0 ?"男": row.sex ==1?"女":"-";
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
				role:2,
			}
			this.listLoading=true;
			getUnauditClubMemberList(para).then(res=>{
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
	    selectionChange:function(val) {
	      	this.multipleSelection = val;
	    },
		accept:function(index,row){
			this.$confirm("确定该学生成为干事吗？","提示",{
				type:"success"
			}).then(()=>{
				let para={
					recruit_id:row.recruit_id,
					student_id:row.student_id,
					club_union_id:row.club_union_id,
					type:2						
				}
				this.listLoading=true;
				this.$axios({
					url:"/acceptThis",
					type:"post",
					data:para
				}).then(res=>{
					this.listLoading=false;
					this.$message({
						message:"已通过",
						type:"success"
					});
					//成功要更新数据
					// this.getStudentList();
					// 成功后应改为已通过状态
				}).catch((err)=>{
					console.log(err);
					this.$message({
						message:"出错啦~",
						type:"error"
					})
				})
			}).catch((err)=>{
				//取消
				console.log(err);
			})
		},
		reject:function(index,row){
			this.$confirm("确定拒绝该申请吗？","提示",{
				type:"warning"
			}).then(()=>{
				// 把招新编号，学生编号，社联编号往回传，拒绝该申请
				let para={
					recruit_id:row.recruit_id,
					student_id:row.student_id,
					club_union_id:row.club_union_id,
					type:2
				}
				this.listLoading=true;
				this.$axios({
					url:"/rejectThis",
					type:"post",
					data:para
				}).then(res=>{
					this.listLoading=false;
					console.log(res.data);
					this.$message({
						message:"已拒绝",
						type:"success"
					});
					//成功要更新数据
					// this.getStudentList();
					//成功后该信息应该变成已拒绝状态
				}).catch((err)=>{
					console.log(err);
					this.listLoading=false;
					this.$message({
						message:"出错啦~",
						type:"error"
					})
				})
			}).catch((err)=>{
				console.log(err);
				// 取消删除
			})				
		},
		acceptSome:function(){
			var ids=this.multipleSelection.map(item=>{
				return {
					"recruit_id":item.recruit_id,
					"student_id:":item.student_id,
					// "club_union_id":item.club_union_id,
					"type":2
				}
			})
			this.$confirm("确定这些同学成为干事吗？","提示",{
				type:"success"
			}).then(()=>{
				this.listLoading=true;
				this.$axios({
					url:"/acceptThese",
					type:"post",
					data:ids
				}).then((res)=>{
					this.listLoading=false;
					this.$message({
						message:"添加成功",
						type:"success"
					});
					//成功要更新数据
					// this.getStudentList();
				}).catch((err)=>{
					this.listLoading=false;
					console.log(err);
				})
			}).catch(()=>{
				//取消
			})
		},
		rejectSome:function(){
			var ids=this.multipleSelection.map(item=>{
				return {
					"recruit_id":item.recruit_id,
					"student_id:":item.student_id,
					"club_union_id":item.club_union_id,
					"type":2
				}
			})
			this.$confirm("确定拒绝这些同学吗？","提示",{
				type:"warning"
			}).then(()=>{
				this.listLoading=true;
				this.$axios({
					url:"/removeThese",
					type:"post",
					data:ids
				}).then((res)=>{
					console.log(res);
					this.listLoading=false;
					this.$message({
						message:"已拒绝",
						type:"success"
					});
					//成功要更新数据
					// this.getStudentList();
				}).catch((err)=>{
					this.listLoading=false;
					console.log(err);
				})
			}).catch(()=>{
				//取消
			})
		},
	}
}
</script>