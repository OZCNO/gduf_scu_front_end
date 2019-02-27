<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>报名活动记录</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass">
		<el-table-column prop="clubName" label="举办方">
		</el-table-column><el-table-column prop="theme" label="主题">
		</el-table-column><el-table-column prop="time" label="时间">
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange()"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
</el-card>
</template>
<script>
export default{
	name:"personActivity",
	data(){
		return{
			listLoading:false,
			list:[
				{
					clubName:"数学协会",
					theme:"数学竞赛",
					time:"2015-05-04"
				},
				{
					clubName:"爪哇部落",
					theme:"软件设计大赛",
					time:"2016-12-12"
				},
			],
			page:1,
			total:1,

		}
	},
	methods:{		
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
		},
	},
	created(){
		//获取个人参与活动情况
	}
}
</script>
<style lang="scss" scoped>

	
</style>