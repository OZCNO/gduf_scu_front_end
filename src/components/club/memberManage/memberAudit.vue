<template>
<div class="clubMemberAuditContainer">
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
	<el-table :data="studentList" :highlight-current-row="true" v-loading="listLoading" 
	@selection-change="selectionChange" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="selection" width="35">	
		</el-table-column>
		<el-table-column type="expand" width="15">
		<!-- 展开的模版 -->
			<template slot-scope="props">
				<el-form label-position="left" :inline="true" class="tableExpand">
				  <el-form-item label="头像">
		            <img :src="props.row.avatar" style="width:50px;"></img>
		          </el-form-item>
		          <el-form-item label="手机号码">
		            <span>{{ props.row.mobile}}</span>
		          </el-form-item>
		          <el-form-item label="邮箱">
		            <span>{{ props.row.email}}</span>
		          </el-form-item>
		          <el-form-item label="自我介绍">
		            <span>{{ props.row.introduction }}</span>
		          </el-form-item>
		          <el-form-item label="参加原因">
		            <span>{{ props.row.reason }}</span>
		          </el-form-item>
		        </el-form>
			</template>
		</el-table-column>
		<el-table-column type="index" width="35">
		</el-table-column><!-- <el-table-column prop="grade" label="年级" sortable width="70">
		</el-table-column> --><el-table-column prop="name" label="姓名" sortable width="80">	
		</el-table-column><el-table-column prop="sex" label="性别" sortable width="70">
		</el-table-column><el-table-column prop="institudeName" label="学院" show-overflow-tooltip sortable>	
		</el-table-column><el-table-column prop="major" label="专业" show-overflow-tooltip sortable>	
		</el-table-column><!-- <el-table-column prop="theme" label="招新活动" show-overflow-tooltip sortable min-width="90">		
		</el-table-column> --><el-table-column prop="reason"  label="参加原因" show-overflow-tooltip>	
		</el-table-column><el-table-column prop="introduction"  label="自我介绍" show-overflow-tooltip>	
		</el-table-column><!-- <el-table-column prop="time" label="报名时间" show-overflow-tooltip sortable width="100">
		</el-table-column> -->
		<el-table-column label="操作"  width="75" fixed="right">
		 	<template slot-scope="scope">
				<el-button size="mini" type="primary" @click="accept(scope.$index, scope.row)">通过</el-button>
			</template>
		</el-table-column> 
	</el-table>
	<el-col :span="24" class="toolbar">
		<!-- <el-button type="primary" @click="acceptSome" size="mini">批量通过</el-button> -->
		<el-pagination background small layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
		</el-pagination>
	</el-col>
</div>
</template>
<script>
  import { getClubMemberList,editMemberStatus } from '../../../api.js';
export default{
	props:["user"],
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
			excelData:[],
			cname:['年级','姓名','性别','学院',"专业","招新部门","职务","参加原因","自我介绍","报名时间","手机号码","邮箱"],
			ename:['grade','name','sex','institute',"major","department","status","reason","introduce","time","mobile","email"],

		}
	},
	created:function(){
		// 请求表格数据
		this.getStudentList()
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
          		let para={pageSize:this.totalCount}
				getUnauditClubMemberList(para).then(res=>{
					if(res.status==200){
						this.excelData=this.formatList(res.data.studentList)
            			this.export2Excel(this.cname,this.ename,this.excelData)
					}
				})
          	}else{
            	this.excelData =this.multipleSelection.length > 0 ? this.multipleSelection : this.studentList
            	this.export2Excel(this.cname,this.ename,this.excelData)
          	}
          }).catch(() => {
          })
        },
    	//数据写入excel
        export2Excel(cname,ename,studentList) {
          var that = this
          require.ensure([], () => {
            //这里必须使用绝对路径，使用@/+存放export2Excel的路径
            const { export_json_to_excel } = require('@/vendor/export2Excel') 
            //导出的表头名信息
            const tHeader = cname
            //导出的表头字段名，需要导出表格字段名
            const filterVal = ename 
            const list = studentList
            const data = that.formatJson(filterVal, list)
            // 导出的表格名称，根据需要自己命名
            export_json_to_excel(tHeader, data, '下载数据excel')
          })
        },
		formatList(list){
			list.forEach((item,index)=>{
				if(item["sex"]!==undefined){
					item["sex"]=item["sex"] == 0 ? "男":"女"
				}
				if(item["status"]!==undefined){
					item["status"]=item["status"]==1?"待审核":item["status"]==2?"审核通过":item["status"]==3?"审核未通过":"已发布"
				}
			})
			return list
		},
      	//格式转换，直接复制即可
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
		//如何把这些函数提到common.js里面去
		//性别显示转换
		// formatSex(row, column){
		// 	return row.sex == 0 ?"男": row.sex ==1?"女":"-"
		// },
		//当前页面发生变化
		handleCurrentChange(val){
			this.page=val
			this.getStudentList()
		},
		//获取用户列表
		getStudentList(){
			let para={
				page:this.page,
				name:this.filters.name,
				status:0
			}
			this.listLoading=true
			getClubMemberList(this.user.clubId,para).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.total=data.totalCount
					this.studentList=data.list
					this.formatList(this.studentList)
					this.listLoading=false
				}
			}).catch(err=>{
				this.$message.error("数据获取失败")
				this.listLoading=false
			})		
		},
	    selectionChange:function(val) {
	      	this.multipleSelection = val
	    },
		accept:function(index,row){
			this.$confirm("确定该学生成为干事吗？","提示",{
				type:"success"
			}).then(()=>{
				this.listLoading=true
				editMemberStatus(row.id).then(res=>{
					let {msg,code,data}=res.data
					if(code==200){
						this.getStudentList()			
						this.$message.success("已通过")			
					}
					this.listLoading=false
				}).catch((err)=>{
					this.listLoading=false
					console.log()
					this.$message.error(err)
				})
			}).catch((err)=>{
				console.log(err)
			})
		},
		// acceptSome:function(){
		// 	var ids=this.multipleSelection.map(item=>{
		// 		return {
		// 			"recruit_id":item.recruit_id,
		// 			"student_id:":item.student_id,
		// 			// "club_union_id":item.club_union_id,
		// 			"type":2
		// 		}
		// 	})
		// 	this.$confirm("确定这些同学成为干事吗？","提示",{
		// 		type:"success"
		// 	}).then(()=>{
		// 		this.listLoading=true
		// 		this.$axios({
		// 			url:"/acceptThese",
		// 			type:"post",
		// 			data:ids
		// 		}).then((res)=>{
		// 			this.listLoading=false
		// 			this.$message({
		// 				message:"添加成功",
		// 				type:"success"
		// 			})
		// 			//成功要更新数据
		// 			// this.getStudentList()
		// 		}).catch((err)=>{
		// 			this.listLoading=false
		// 			console.log(err)
		// 		})
		// 	}).catch(()=>{
		// 		//取消
		// 	})
		// },
	}
}
</script>