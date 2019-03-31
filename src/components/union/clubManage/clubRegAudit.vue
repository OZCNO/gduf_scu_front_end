<template>
<div>
	<el-card class="box-card">
        <el-tabs v-model="message">
            <el-tab-pane :label="`待审核(${unaudit.length})`" name="first">
                <el-table :data="unaudit" :show-header="false" style="width: 100%" size="mini" v-loading="listLoading1">
                    <el-table-column type="index" width="35"></el-table-column>
                    <el-table-column prop="clubName"></el-table-column>
                    <el-table-column prop="time"></el-table-column>
                    <el-table-column width="120">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleAudit(scope.$index,scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
				<el-col :span="24" class="toolbar">
					<el-pagination background small layout="prev, pager, next" style="float:right;"
					 @current-change="handleCurrentChange1"  :page-size="10"  :total="total1"></el-pagination>
				</el-col>
            </el-tab-pane>
            <el-tab-pane label="已审核" name="second">
                <template v-if="message === 'second'">
                    <el-table :data="audit" :show-header="false" style="width: 100%" size="mini" v-loading="listLoading2">
                        <el-table-column type="index" width="35"></el-table-column>
                        <el-table-column prop="clubName"></el-table-column>
                        <el-table-column prop="updateTime"></el-table-column>
                        <el-table-column prop="auditStatus" :formatter="formatStatus"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleOpen(scope.$index,scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination background small layout="prev, pager, next" style="float:right;"
						 @current-change="handleCurrentChange2"  :page-size="10"  :total="total2"></el-pagination>
					</el-col>
                </template>
            </el-tab-pane>
        </el-tabs>
	</el-card>
	<el-dialog title="年度注册表" :visible.sync="dialogFormVisible">
    	<span style="color:red;" v-if="form.reason">意见：{{form.reason}}</span>
	    <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true" disabled>
			<el-form-item label="社团全称"><el-input v-model="form.clubName" disabled></el-input>
			</el-form-item><el-form-item label="社团类别"><el-input v-model="form.clubType" disabled></el-input>
			</el-form-item><el-form-item label="会员人数"><el-input v-model="form.memberSum" disabled></el-input>
			</el-form-item><el-form-item label="干事人数"><el-input v-model="form.officerSum" disabled></el-input>
			</el-form-item><el-form-item label="指导老师姓名"><el-input v-model="form.teacherName" disabled></el-input>
			</el-form-item><el-form-item label="指导老师电话"><el-input v-model="form.teacherMobile" disabled></el-input>
			</el-form-item>
		</el-form>
	    <el-form ref="form" :model="form" label-width="110px" size="mini" disabled>
			<el-form-item label="上学期工作总结" prop="summary"><el-input type="textarea" v-model="form.summary"></el-input>
			</el-form-item><el-form-item label="新学期工作计划" prop="plan"><el-input type="textarea" v-model="form.plan"></el-input>
			</el-form-item><el-form-item label="备注" prop="comment"><el-input type="textarea" v-model="form.comment"></el-input>
			</el-form-item>
		</el-form> 
		<template v-if="bool">
			<el-form ref="auditForm" :model="auditForm" :rules="auditFormRules" label-width="110px" size="mini">
				<el-form-item prop="reason" label="意见">
					<el-input v-model="auditForm.reason" placeholder="请输入意见"></el-input>
				</el-form-item>
				<el-form-item prop="status" label="审核">
					<el-radio v-model="auditForm.status" :label="2">通过</el-radio>
					<el-radio v-model="auditForm.status" :label="3">未通过</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer">
			    <el-button @click="dialogFormVisible = false" plain>取消</el-button>
			    <el-button type="primary" @click="submitForm('auditForm')" :loading="submitting">提交</el-button>
			</div>			
		</template>
	</el-dialog>
</div>
</template>
<script>
import {editAnnualReg,getAnnualRegList} from "../../../api.js"
export default{
	name:"ClubRegAudit",
	data(){
		return{
            message: 'first',
            unaudit: [],
            audit: [],
            dialogFormVisible:false,
            form:[],
            auditForm:{
            	reason:"",
            	status:2,
            },
            auditFormRules:{
				reason: [{ required: true, message: '不能为空', trigger: 'blur'}],
			},
			submitting:false,
			bool:false,
			page1:1,
			total1:1,
			page2:1,
			total2:1,
            listLoading1:false,
            listLoading2:false,

		}
	},
	created(){
        this.update()
	},
    mounted: function () {
    },
    updated: function () {
    },
	methods:{
        update(){
            this.getAuditList()
            this.getUnauditList()            
        },
        getUnauditList(){
            let params={
                page:this.page1,
                status:1
            }
            getAnnualRegList(params).then(res=>{
                this.listLoading2=true
                let {msg,code,data}=res.data
                if(code==200){
                    this.unaudit=data.list
                    this.total1=data.totalCount||1
                }else{
                    this.$message.error(msg)
                }
                this.listLoading2=false
            })          
        },
        getAuditList(){
            let params={
                page:this.page2,
                // status:"2,3",
                status:2
            }
            getAnnualRegList(params).then(res=>{
                this.listLoading1=true
                let {msg,code,data}=res.data
                if(code==200){
                    this.audit=data.list
                    this.total2=data.totalCount||1
                }else{
                    this.$message.error(msg)
                }
                this.listLoading1=false
            })            
        },
		// 当前页面发生变化
		handleCurrentChange1(val){
			this.page1=val
            this.getUnauditList()
		},
		handleCurrentChange2(val){
			this.page2=val
            this.getAuditList()
		},
		handleAudit(index,row){
			this.dialogFormVisible=true
			this.form=row
			this.bool=true
		},
		handleOpen(index,row){			
			this.dialogFormVisible=true
			this.form=row
			this.bool=false
		},
		formatStatus(row, column){
			return row.auditStatus == 1 ?"待审核": row.auditStatus ==2?"通过审核":row.auditStatus ==3?"未通过审核":"已发布"
		},
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					let activityId=1
					editAnnualReg(this.form.id,this.auditForm).then(res=>{
	            		this.submitting = true
						let {msg,code,data}=res.data
						if(code==200){
							this.submitting=false
							this.$message.success("提交成功")
							this.dialogFormVisible = false
                            this.$refs[form].resetFields() 
                            this.update()
						}else{
							this.submitting=false
							this.$message.error(msg)
						}
					})
                }
			})
		}
	}
}
</script>
<style lang="scss" scoped>

	
</style>