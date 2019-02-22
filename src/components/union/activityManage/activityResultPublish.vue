<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>待发布成果活动列表</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="timeBegin" label="举办时间 " sortable>
		</el-table-column><el-table-column prop="theme" label="主题">
		</el-table-column><!-- <el-table-column prop="visits" label="浏览数" sortable>
		</el-table-column><el-table-column prop="likes" label="点赞数" sortable>
		</el-table-column> --><el-table-column prop="enrolls" label="报名数" sortable>	
		</el-table-column>
		<el-table-column label="操作" fixed="right">	
		 	<template slot-scope="scope">
				<el-button size="mini" type="text" @click="openForm(scope.$index, scope.row)">发布活动成果</el-button> 
			</template>
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
	<!-- 发布活动成果 -->
    <el-dialog title="发布活动成果" :visible.sync="dialogFormVisible">
		<el-form ref="form" :model="form" :rules="formRules" label-width="80px" class="form" size="mini">
			<el-form-item label="标题" prop="title">
				<el-input type="text" v-model="form.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content" required>
				<el-input type="textarea" v-model="form.content" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="图片" prop="image">
				<el-upload
				  class="avatar-uploader"
				  action="http://119.29.105.29:8083/postImg"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="this.imageUrl" :src="this.imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
			<el-button @click="resetForm('form')">重置</el-button>
		    <el-button type="primary" @click="submitForm('form')" :loading="submitting">提交</el-button>
		</div>
	</el-dialog>
</el-card>
</template>
<script>
import {getActivityDetailList,requestActivityResult} from "../../../api.js"
export default{
	name:"ActivityResultPublish",
	data(){
		return{
            list:[],
            listLoading:false,
            page:1,
            total:20,
            dialogFormVisible:false,
            form:{
            	title:"",
            	image:"",
            	content:""
            },
            formRules:{
				title: [{ required: true, message: '不能为空', trigger: 'blur'}],
				content:[{ required: true, message: '不能为空', trigger: 'blur'}],    
				image:[{ required: true, message: '不能为空', trigger: 'blur'}],            	
            },
        	imageUrl: '',
        	submitting:false

		}
	},
	created(){
		let clubID=1
		getActivityDetailList(clubID).then(res=>{
			this.list=res.data
		})
	},
	methods:{
		openForm(index,row){
			this.form=row
			this.dialogFormVisible=true
		},
		resetForm(form){
			form.resetFields()
		},
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("确定提交吗？","提示").then(()=>{
						this.form.acticityId=1
						console.log(this.form)
						requestActivityResult(this.form).then((res)=>{
		            		this.submitting = true
							let {msg,code,data}=res.data
							if(code==200){
								this.submitting=false
								this.dialogFormVisible=false
								this.$message.success("发布成功")
								//重新刷新列表
							}else{
								this.submitting=false
								this.$message.error(msg)								
							}
						})
					})
				}
			})
		},
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.image=this.imageUrl
        console.log(this.imageUrl);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 8;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 8MB!');
        }
        return isLt2M;
      },
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
		},
	}
}
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>