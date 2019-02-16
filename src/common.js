export default{
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

}