<template>
<section class="clubManagersContainer">
		<!-- 搜索框 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" size="mini" :model="filters">
				<el-form-item>
					<el-input placeholder="校社团" v-model="filters.club"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getManagerList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="managerList" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
			<el-table-column type="index" width="55">
			</el-table-column><el-table-column prop="name" label="管理人" width="80px"  sortable show-overflow-tooltip>	
			<!-- </el-table-column><el-table-column prop="grade" label="年级" sortable show-overflow-tooltip>	 -->
			</el-table-column><el-table-column prop="sex" label="性别" width="70x" sortable :formatter="formatSex">	
			</el-table-column><el-table-column prop="club" label="校社团" sortable show-overflow-tooltip>
			</el-table-column><el-table-column prop="mobile" label="手机" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="email" label="邮箱" sortable show-overflow-tooltip>	
			</el-table-column><!-- <el-table-column prop="institute" label="学院" sortable show-overflow-tooltip> -->	
			</el-table-column><el-table-column prop="major" label="专业" sortable show-overflow-tooltip>	
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
	</section>
</template>
<script>
import {getClubManagerList} from "../../../api.js"
export default{
	name:"ClubManagers",
	data(){
		return{
			filters: {
				club: ''
			},
			page:1,
			total:0,
			managerList:[],
			listLoading:false,
		}
	},
	created:function(){
		// 请求表格数据
		this.getManagerList();
	},
	methods:{
		//性别显示转换
		formatSex(row, column){
			return row.sex == 0 ?"男": row.sex ==1?"女":"-";
		},
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val;
			this.getManagerList();
		},
		getManagerList(){
			let para={
				page:this.page,
				club:this.filters.club,
				token:JSON.parse(sessionStorage.getItem("token"))
			}
			this.listLoading=true;
			getClubManagerList(para).then((res)=>{
				// let {code,msg,data}=res.data
				if(res.status==200){
					this.total=res.data.totalCount;
					this.managerList=res.data.managerList;
					this.listLoading=false;
				}
			}).catch((err)=>{
				this.listLoading=false;
			})				
		},
	}
}
</script>