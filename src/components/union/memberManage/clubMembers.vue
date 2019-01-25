<template>
<section class="clubMembersContainer">
		<!-- 搜索框 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" size="mini">
				<el-form-item>
					<el-input placeholder="校社团"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table :data="memberList" highlight-current-row="true" v-loading="listLoading" height="450" style="width: 100%" class="tableClass" size="mini">
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
	</section>
</template>
<script>
	export default{
		name:"clubMembers",
	data(){
		return{
			memberList:[],
			listLoading:false,
		}
	},
	created:function(){
		// 请求表格数据
		this.getMemberList();
	},
	methods:{
		getMemberList:function(){
			var _this=this;
			this.listLoading=true;
			// 若使用ES6写法，this指向父级上下文
			this.$axios({
				url:'/getMemberList',
				type:"post",
				data:{},
			}).then(function(res){
				_this.memberList=res.data.memberList;
				_this.listLoading=false;
			}).catch(function(err){
				console.log(err);
				_this.listLoading=false;
			})				
		},
	}
}
</script>
<style lang="scss" scoped>
.clubMembersContainer{
	.tableClass{
		border:1px solid #ebeef5;
	}
}	
</style>