<template>
<div>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>活动统计</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="time" label="时间" sortable>
		</el-table-column><el-table-column prop="times" label="举办次数" sortable>
		</el-table-column><el-table-column prop="memberTimes" label="会员活动" sortable>
		</el-table-column><el-table-column prop="unmemberTimes" label="非会员活动" sortable>
		</el-table-column><el-table-column prop="averageNumber" label="平均报名人数" sortable>
		</el-table-column>
	</el-table>
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
</el-card>
<el-row :gutter="20" class="chart">
    <el-col :span="14">
        <el-card class="box-card">
             <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-card>
    </el-col>
    <el-col :span="10">
        <el-card class="box-card">
            <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-card>
    </el-col>
</el-row>
</div>
</template>
<script>
import {getActivityStatisticalList} from "../../../api.js"
import echarts from "@/echarts"
export default{
	name:"UnionActivity",
	data(){
		return{
            chartColumn: null,
            chartPie:null,
            list:[],
            listChanged:[],
            listLoading:false,
		}
	},
	created(){
        let clubID=1
		getActivityStatisticalList(clubID).then(res=>{
			this.list=res.data;
			this.listChanged=this.list.map(function(item,index){	
			    let innerarr=[]
				innerarr.push(item["time"])
				innerarr.push(item["times"])
				innerarr.push(item["averageNumber"])
				innerarr.push(item["memberTimes"]/item["unmemberTimes"]*30)
				return innerarr
			})
		})
	},
	methods:{	
        drawColumnChart() {
        	// 基于准备好的dom，初始化echarts实例
            this.chartColumn = echarts.init(document.getElementById('chartColumn'),'light');
            // this.chartColumn.showLoading()
        	// this.chartColumn.hideLoading()
            // 指定图表的配置项和数据,并显示图表
            this.chartColumn.setOption({ 
            	title:{
                    text: '条形图',
                    subtext: "近三年活动统计",
                },
			    legend: {},
			    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
			    dataset: {
			        source: [
			            ['时间', '举办次数', '平均报名人数',"会员活动率（*30）"],
			            ...this.listChanged
			        ]
			    },
			    xAxis: {type: 'category'},
			    yAxis: {},
			    series: [
			        {type: 'bar'},
			        {type: 'line'},
			        {type: 'line'}
			    ]
            })
        },
        drawPieChart() {
            this.chartPie = echarts.init(document.getElementById('chartPie'));
            this.chartPie.setOption({
                title: {
                    text: '饼图',
                    subtext: '本学期数据',
                    // x: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    // orient: 'vertical',
                    // left: 'left',
                    // data: ['会员活动', '非会员活动']
                },
                dataset:{
                	source:[
                		["活动类型","本学期"],
                		["会员活动",2],
                		["非会员活动",3]
                	]
                },
                series: [
                    {
                        name: '活动类型',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
				        encode: {
				            itemName: '活动类型',
				            value: '本学期'
				        }
                    },
                ]
            });
        },
        drawCharts() {
            this.drawColumnChart(),
            this.drawPieChart()
        },
    },
    mounted: function () {
        this.drawCharts()
    },
    updated: function () {
        this.drawCharts()
    }
}
</script>
<style lang="scss" scoped>
.chart{
	margin-top:10px;
}
	
</style>