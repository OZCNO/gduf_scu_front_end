<template>
<div>
	<el-card class="box-card">
        <el-tabs v-model="message">
            <el-tab-pane :label="`待审核(${unaudit.length})`" name="first">
                <el-table :data="unaudit" :show-header="false" style="width: 100%" size="mini">
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
					 @current-change="handleCurrentChange1()"  :page-size="10"  :total="total1"></el-pagination>
				</el-col>
            </el-tab-pane>
            <el-tab-pane label="已审核" name="second">
                <template v-if="message === 'second'">
                    <el-table :data="audit" :show-header="false" style="width: 100%" size="mini">
                        <el-table-column prop="clubName"></el-table-column>
                        <el-table-column prop="updateTime"></el-table-column>
                        <el-table-column prop="audit_status" :formatter="formatStatus"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" @click="handleOpen(scope.$index,scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination background small layout="prev, pager, next" style="float:right;"
						 @current-change="handleCurrentChange2()"  :page-size="10"  :total="total2"></el-pagination>
					</el-col>
                </template>
            </el-tab-pane>
        </el-tabs>
	</el-card>
	<el-dialog title="年度注册表" :visible.sync="dialogFormVisible">
    	<span style="color:red;" v-if="!bool">意见：{{form.reason}}</span>
	    <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true" disabled>
			<el-form-item label="社团全称"><el-input v-model="form.clubName" disabled></el-input>
			</el-form-item><el-form-item label="社团类别"><el-input v-model="form.type" disabled></el-input>
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
import {getAuditAnnualReg,getUnauditAnnualReg,editAnnualReg} from "../../../api.js"
export default{
	name:"ClubRegAudit",
	data(){
		return{
            message: 'first',
            showHeader: false,
            unaudit: [
            	{
            		clubName:"数学协会",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"3",
            		time:"2019-02-23"
            	},
            	{
            		clubName:"出雲",
            		type:"娱乐类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019-02-23"
            	},
            	{
            		clubName:"爪哇部落",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		time:"2019-02-23"
            	}
            ],
            audit: [
            	{
            		clubName:"数学协会",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"3",
            		updateTime:"2019-02-23",
            		reason:"计划存在...问题"
            	},
            	{
            		clubName:"出雲",
            		type:"娱乐类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		updateTime:"2019-02-23",
            		reason:"通过，计划可以稍作修改"
            	},
            	{
            		clubName:"爪哇部落",
            		type:"学习类",
            		memberSum:30,
            		officerSum:15,
            		teacherName:"郑兵",
            		teacherMobile:13751831767,
            		summary:"工作总结",
            		plan:"工作计划就是..",
            		comment:"这是备注",
            		audit_status:"2",
            		updateTime:"2019-02-23",
            		reason:"通过"
            	}
            ],
            dialogFormVisible:false,
            form:[],
            auditForm:{
            	reason:"",
            	status:2
            },
            auditFormRules:{
				reason: [{ required: true, message: '不能为空', trigger: 'blur'}],
			},
			submitting:false,
			bool:false,
			page1:1,
			total1:10,
			page2:1,
			total2:10,
		}
	},
	created(){
		getUnauditAnnualReg().then(res=>{
			// this.unaudit=res.data
		})
		getAuditAnnualReg().then(res=>{
			this.audit=res.data
		})
	},
	methods:{
		// 当前页面发生变化
		handleCurrentChange1(val){
			this.page1=val
		},
		handleCurrentChange2(val){
			this.page2=val
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
			return row.audit_status == 1 ?"待审核": row.audit_status ==2?"通过审核":row.audit_status ==3?"未通过审核":"已发布"
		},
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("确定提交吗？","提示").then(()=>{
						let activityId=1
						editAnnualReg(this.auditForm).then(res=>{
		            		this.submitting = true
							let {msg,code,data}=res.data
							if(code==200){
								this.submitting=false
								this.$message.success("提交成功")
								this.dialogFormVisible = false
								// 重新获取列表
							}else{
								this.submitting=false
								this.$message.error(msg)
							}
						})
					})
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>

	
</style>