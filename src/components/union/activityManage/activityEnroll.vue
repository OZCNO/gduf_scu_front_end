<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>活动热度指数</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="theme" label="主题" sortable>
		</el-table-column><el-table-column prop="visits" label="浏览数 " sortable>
		</el-table-column><el-table-column prop="likes" label="点赞数" sortable>
		</el-table-column><el-table-column prop="enrolls" label="报名数" sortable>	
		</el-table-column>
	</el-table>
	<el-col :span="24" class="toolbar">
		<el-pagination background small layout="prev, pager, next" style="float:right;"
		 @current-change="handleCurrentChange"  :page-size="10"  :total="total"></el-pagination>
	</el-col>
	<div style="clear:both"></div>
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
	<div id="chartColumn" style="width:100%; height:400px;"></div>
	<div id="chartLine" style="width:100%; height:400px;"></div>
</el-card>
</template>
<script>
import {getActivityDetailList} from "../../../api.js"
import echarts from "@/echarts"
export default{
	name:"ActivityEnroll",
	data(){
		return{
            chartColumn: null,
            chartLine: null,
            list:[],
            listChanged:[],
            listLoading:false,
            page:1,
            total:20
		}
	},
	created(){
        let clubID=1
		getActivityDetailList(clubID).then(res=>{
			this.list=res.data;
			this.listChanged=this.list.map(function(item,index){	
			    let innerarr=[],key
				// for(key in item){
				// 	if(item.hasOwnProperty(key)){
				// 		innerarr.push(item[key])
			 //        }
			 //    }
				innerarr.push(item["theme"])
				innerarr.push(item["visits"])
				innerarr.push(item["likes"])
				innerarr.push(item["enrolls"])
				return innerarr
			})
		})
	},
    methods: {
		// 当前页面发生变化
		handleCurrentChange(val){
			this.page=val
		},
        drawColumnChart() {
        	// 基于准备好的dom，初始化echarts实例
            this.chartColumn = echarts.init(document.getElementById('chartColumn'),'light');
            // this.chartColumn.showLoading()
        	// this.chartColumn.hideLoading()
            // 指定图表的配置项和数据,并显示图表
            this.chartColumn.setOption({ 
            	title:{
                    text: '条形图'
                },
			    legend: {},
			    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
			    dataset: {
			        // 提供一份数据。横轴字数太长会出错
			        source: [
			            ['活动主题', '浏览数', '点赞数', '报名数'],
			            ...this.listChanged
			        ]
			    },
			    // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
			    xAxis: {type: 'category'},
			    // 声明一个 Y 轴，数值轴。
			    yAxis: {},
			    // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
			    // bar是条形，line是折线，pie是饼型
			    series: [
			        {type: 'bar'},
			        {type: 'bar'},
			        {type: 'bar'}
			    ]
            })
        },
        drawLineChart() {
            this.chartLine = echarts.init(document.getElementById('chartLine'),'light');
         //    this.chartColumn.showLoading()
        	// this.chartColumn.hideLoading()
            this.chartLine.setOption({
                title: {
                    text: '折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
			    dataset: {
			        source: [
			            ['活动主题', '浏览数', '点赞数', '报名数'],
			            ...this.listChanged
			        ]
			    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value'
                },
                series: [
			        {type: 'line'},
			        {type: 'line'},
			        {type: 'line'}
                ]
            });
        },
        drawCharts() {
            this.drawColumnChart()
            this.drawLineChart()
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
#chartColumn{
	margin: 20px 0;
}
</style>