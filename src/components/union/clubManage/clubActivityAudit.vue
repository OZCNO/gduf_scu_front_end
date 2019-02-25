<template>
<div>
	<el-card class="box-card">
        <el-tabs v-model="message">
            <el-tab-pane :label="`待审核(${unaudit.length})`" name="first">
                <el-table :data="unaudit" :show-header="false" style="width: 100%" size="mini">
                    <el-table-column>
                        <template slot-scope="scope">
                            <span class="message-clubName">【{{scope.row.clubName}}】</span>
                            <span class="message-theme">{{scope.row.theme}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" width="180"></el-table-column>
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
                        <el-table-column>
                            <template slot-scope="scope">
                            	<span class="message-theme">【{{scope.row.clubName}}】</span>
                                <span class="message-theme">{{scope.row.theme}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" width="150"></el-table-column>
                        <el-table-column prop="status" width="120" :formatter="formatStatus"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" type="text" @click="handleOpen(scope.$index,scope.row)">查看详情</el-button>
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
	<el-dialog title="活动详情" :visible.sync="dialogFormVisible">
    	<span style="color:red;" v-if="!bool">意见：{{form.reason}}</span>
	    <el-form ref="form" :model="form" label-width="110px" size="mini"  disabled>
			<el-form-item label="活动主题">
				<el-input type="text" v-model="form.theme"></el-input>
			</el-form-item>
			<el-form-item label="会员活动">
				<el-switch v-model="form.memberActivity" :active-value="1" :inactive-value="0"></el-switch>
			</el-form-item>
			<el-form-item label="报名截止时间">
			    <el-date-picker v-model="form.enrollDeadline"  type="datetime"  placeholder="选择日期时间"  default-time="12:00:00">
			    </el-date-picker>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="datetime" v-model="form.timeBegin"  default-time="12:00:00"  style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col :span="2" style="text-align: center">—</el-col>
				<el-col :span="11">
					<el-date-picker type="datetime" v-model="form.timeEnd"  default-time="12:00:00" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="经费" v-if="form.money!=0">
				<el-input-number v-model="form.money"></el-input-number> 元
			</el-form-item>
			<el-form-item v-for="(item, index) in form.goods" :label="'物品' + (index+1)" :key="item.key">
				<el-col :span="10"><el-input v-model="item.name"></el-input></el-col>	
				<el-col :span="1" style="text-align: center">：</el-col>
				<el-col :span="6"><el-input v-model="item.sum"></el-input></el-col>
			</el-form-item>
			<el-form-item label="地址">
				<el-input type="text" v-model="form.address"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input type="text" v-model="form.introduction"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<el-input type="textarea" v-model="form.content"></el-input>
			</el-form-item>
		</el-form>
		<template v-if="bool">
			<el-form ref="auditForm" :model="auditForm" :rules="auditFormRules" label-width="110px" size="mini">
				<el-form-item prop="reason" label="意见">
					<el-input v-model="auditForm.reason" placeholder="请输入意见"></el-input>
				</el-form-item>
				<el-form-item prop="status" label="是否同意">
					<el-radio v-model="auditForm.status" :label="2">同意</el-radio>
					<el-radio v-model="auditForm.status" :label="3">不同意</el-radio>
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
import {getAuditedActivityList,getUnauditActivityList,editActivity} from "../../../api.js"
export default{
	name:"ClubActivityAudit",
	data(){
		return{
            message: 'first',
            unaudit: [],
            audit: [],
            dialogFormVisible:false,
            form:{},
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
		getUnauditActivityList().then(res=>{
			this.unaudit=res.data
		})
		getAuditedActivityList().then(res=>{
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
			return row.status == 1 ?"待审核": row.status ==2?"通过审核":row.status ==3?"未通过审核":"已发布"
		},
		submitForm(form){
			this.$refs[form].validate((valid) => {
	          	if (valid) {
					this.$confirm("确定提交吗？","提示").then(()=>{
						let activityId=1
						editActivity(activityId,this.auditForm).then(res=>{
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