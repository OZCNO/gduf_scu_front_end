<template>
<section class="clubManagersContainer">
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
		<el-table :data="managerList" highlight-current-row="true" v-loading="listLoading" @selection-change="selectionChange" height="450" style="width: 100%" class="tableClass" size="mini">
			<el-table-column type="index" width="55">
			</el-table-column><el-table-column prop="club" label="校社团" sortable show-overflow-tooltip>
			</el-table-column><el-table-column prop="name" label="管理人" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="grade" label="年级" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="sex" label="性别" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="phone" label="手机" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="email" label="邮箱" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="institute" label="学院" sortable show-overflow-tooltip>	
			</el-table-column><el-table-column prop="major" label="专业" sortable show-overflow-tooltip>	
			</el-table-column>
		</el-table>
	</section>
</template>
<script>
export default{
	name:"ClubManagers",
	data(){
		return{
			managerList:[],
			listLoading:false,
		}
	},
	created:function(){
		// 请求表格数据
		this.getManagerList();
	},
	methods:{
		getManagerList:function(){
			var _this=this;
			this.listLoading=true;
			// 若使用ES6写法，this指向父级上下文
			this.$axios({
				url:'/getManagerList',
				type:"post",
				data:{},
			}).then(function(res){
				_this.managerList=res.data.managerList;
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
.clubManagersContainer{
	.tableClass{
		border:1px solid #ebeef5;
	}
}
</style>