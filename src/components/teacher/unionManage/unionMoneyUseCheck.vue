<template>
<div>
	<el-card class="box-card">
        <el-tabs v-model="message">
            <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                <el-table :data="unread" style="width: 100%" size="mini">
	                    <el-table-column prop="clubOrUnionName" label="社团" width="100" sortable></el-table-column>
	                    <el-table-column prop="theme" label="活动" width="100" sortable></el-table-column>
	                    <el-table-column prop="money" label="总额（元）" width="100"></el-table-column>
	                    <el-table-column prop="moneyUse" label="具体用途" show-overflow-tooltip>
	                        <template slot-scope="scope">
		                        <template v-for="item in scope.row.moneyUse">
		                            <span class="message-moneyUse">{{item.use}}:{{item.sum}}元;</span>	
		                        </template>
	                        </template>
	                    </el-table-column>                
	                    <el-table-column prop="timeBegin" label="举办时间"></el-table-column>
	                    <el-table-column prop="status" label="活动状态" width="100" :formatter="formatStatus"></el-table-column>
	                    <el-table-column width="120" label="操作">
	                        <template slot-scope="scope">
	                            <el-button size="small" type="text" @click="handleRead(scope.$index,scope.row)" :loading="submitting" v-if="scope.row.moneyUse[0]">标为已读</el-button>
	                            <span v-else>待提交</span>
	                        </template>
	                    </el-table-column>   
                </el-table>
				<el-col :span="24" class="toolbar">
					<el-pagination background small layout="prev, pager, next" style="float:right;"
					 @current-change="handleCurrentChange1()"  :page-size="10"  :total="total1"></el-pagination>
				</el-col>
            </el-tab-pane>
            <el-tab-pane label="已读消息" name="second">
                <template v-if="message === 'second'">
                    <el-table :data="read" style="width: 100%" size="mini">
	                    <el-table-column prop="clubOrUnionName" label="社团" width="100" sortable></el-table-column>
	                    <el-table-column prop="theme" label="活动" width="100" sortable></el-table-column>
	                    <el-table-column prop="money" label="总额（元）" width="100"></el-table-column>
	                    <el-table-column prop="moneyUse" label="具体用途" show-overflow-tooltip>
	                        <template slot-scope="scope">
		                        <template v-for="item in scope.row.moneyUse">
		                            <span class="message-moneyUse">{{item.use}}:{{item.sum}}元;</span>	
		                        </template>
	                        </template>
	                    </el-table-column>                
	                    <el-table-column prop="timeBegin" label="举办时间" width="180"></el-table-column>
	                    <el-table-column prop="status" label="活动状态" width="100" :formatter="formatStatus"></el-table-column>
                    </el-table>
					<el-col :span="24" class="toolbar">
						<el-pagination background small layout="prev, pager, next" style="float:right;"
						 @current-change="handleCurrentChange2()"  :page-size="10"  :total="total2"></el-pagination>
					</el-col>
                </template>
            </el-tab-pane>
        </el-tabs>
	</el-card>
</div>
</template>
<script>
import {editMoneyList,getMoneyActivityList2} from "../../../api.js"
export default{
	props:["user"],
	name:"ClubMoneyUseCheck",
	data(){
		return{
            message: 'first',
            unread: [],
            read: [],
			page1:1,
			total1:10,
			page2:1,
			total2:10,
			submitting:false,
		}
	},
	created(){
		this.upload();
	},
	methods:{
		upload(){
			let p2={
				status:1
			}
			getMoneyActivityList2("union",p2).then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.read=data.list			
				}else{
					this.$message.error(msg)
				}
			}).catch(err=>{
				this.$message.error(err)
			})
			getMoneyActivityList2("union").then(res=>{
				let {msg,code,data}=res.data
				if(code==200){
					this.unread=data.list	
					this.unread=this.unread.filter((item)=>{
						if((!item.moneyUse[0])||item.moneyUse[0].read==0){
							return true;
						}
					})		
				}else{
					this.$message.error(msg)
				}
			}).catch(err=>{
				this.$message.error(err)
			})
		},
		// 当前页面发生变化
		handleCurrentChange1(val){
			this.page1=val
		},
		handleCurrentChange2(val){
			this.page2=val
		},
		handleRead(index,row){
			//改为已读状态
			editMoneyList(row.id).then(res=>{
        		this.submitting = true
				let {msg,code,data}=res.data
				if(code==200){
					this.submitting=false
					this.$message.success("操作成功")
					this.dialogFormVisible = false
					// 重新获取列表
					this.upload();
				}else{
					this.submitting=false
					this.$message.error(msg)
				}
			})
		},
		formatStatus(row, column){
			return row.status == 1 ?"待审核": row.status ==2?"通过审核":row.status ==3?"未通过审核":"已发布"
		},
	}
}
</script>
<style lang="scss" scoped>

	
</style>
