<template>
<section class="clubMembersContainer">
		<!-- 搜索框 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" size="mini" :model="filters">
				<el-form-item>
					<el-input placeholder="校社团" v-model="filters.club"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getMemberList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="memberList" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
			<el-table-column type="index" width="55">
			</el-table-column><el-table-column prop="club" label="校社团" sortable show-overflow-tooltip>
			</el-table-column><el-table-column label="会员人数" align="center"><el-table-column prop="member1" label="大一" sortable>	
			</el-table-column><el-table-column prop="member2" label="大二" sortable>	
			</el-table-column><el-table-column prop="member3" label="大三" sortable>	
			</el-table-column><el-table-column prop="member4" label="大四" sortable>	
			</el-table-column>	
			</el-table-column><el-table-column label="干事人数" align="center"><el-table-column prop="officer1" label="大一" sortable>	
			</el-table-column><el-table-column prop="officer2" label="大二" sortable>	
			</el-table-column><el-table-column prop="officer3" label="大三" sortable>	
			</el-table-column><el-table-column prop="officer4" label="大四" sortable>	
			</el-table-column>	
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
import {getClubMemeberStatistics} from "../../../api.js"
	export default{
		name:"clubMembers",
	data(){
		return{
			filters: {
				club: ''
			},
			page:1,
			total:0,
			memberList:[],
			listLoading:false,
		}
	},
	created:function(){
		// 请求表格数据
		this.getMemberList();
	},
	methods:{
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val;
			this.getMemberList();
		},
		getMemberList(){
			let para={
				page:this.page,
				club:this.filters.club,
				token:JSON.parse(sessionStorage.getItem("token"))
			}
			this.listLoading=true;
			getClubMemeberStatistics(para).then((res)=>{
				if(res.status==200){
					this.total=res.data.totalCount;
					this.memberList=res.data.memberList;
					this.listLoading=false;
				}
			}).catch((err)=>{
				console.log(err);
				this.listLoading=false;
			})				
		},
	}
}
</script>