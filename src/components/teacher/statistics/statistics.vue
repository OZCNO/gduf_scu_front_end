<template>
<div>
<el-card class="box-card">
	<div slot="header" class="clearfix">
	    <span>社团社联活动统计</span>
	</div>
  <!-- 已申请活动表单 -->
	<el-table :data="list" :highlight-current-row="true" v-loading="listLoading" style="width: 100%" class="tableClass" size="mini">
		<el-table-column type="index" width="35">
		</el-table-column><el-table-column prop="name" label="举办方" sortable>
		</el-table-column><el-table-column prop="times" label="举办次数" sortable>
		</el-table-column><el-table-column prop="memberTimes" label="会员活动" sortable>
		</el-table-column><el-table-column prop="unmemberTimes" label="非会员活动" sortable>
		</el-table-column><el-table-column prop="averageNumber" label="平均报名人数" sortable>
		</el-table-column><el-table-column prop="hotActivity" label="最火活动" sortable>
		</el-table-column><el-table-column prop="hotNumber" label="报名人数" sortable>
		</el-table-column>
	</el-table>
<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
</el-card>
<!-- <el-row :gutter="20" class="chart"> -->
    <!-- <el-col :span="14"> -->
        <el-card class="box-card">
             <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-card>
    <!-- </el-col> -->
    <!-- <el-col :span="10">
        <el-card class="box-card">
            <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-card>
    </el-col> -->
</el-row>
</div>
</template>
<script>
import {termActivityStatistics,allStatistics} from "../../../api.js"
import echarts from "@/echarts"
export default{
	name:"allActivity",
	data(){
		return{
            chartColumn: null,
            // chartPie:null,
            list:[],
            listChanged:[],
            listLoading:false,
		}
	},
	created(){
        // termActivityStatistics("club").then(res=>{
        //     this.list=res.data.data;
        //     this.listChanged=this.list.map(function(item,index){    
        //         let innerarr=[]
        //         innerarr.push(item["name"])
        //         innerarr.push(item["times"])
        //         // innerarr.push(item["averageNumber"])
        //         innerarr.push(item["memberTimes"]/item["times"])
        //         return innerarr
        //     })            
        // })
		allStatistics().then(res=>{
			this.list=res.data.statistics;
			this.listChanged=this.list.map(function(item,index){	
			    let innerarr=[]
				innerarr.push(item["name"])
				innerarr.push(item["times"])
				innerarr.push(item["averageNumber"])
				innerarr.push(item["memberTimes"]/item["times"]*100)
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
                    subtext: "本学期活动统计",
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
                        ['举办方', '举办次数', '平均报名人数',"会员活动率(*100)"],
                        // ['举办方', '举办次数', "会员活动率"],
			            ...this.listChanged
			        ]
			    },  
                grid: { // 控制图的大小，调整下面这些值就可以，
                        x: 40,
                        x2: 40,
                        y2: 90// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                },              
			    xAxis: {
                    type: 'category',
                    axisLabel:{
                        interval: 0,//显示间隔
                        rotate:-30,//-30度角倾斜显示
                        // formatter:function(value){
                        //     return value.split("").join("\n");
                        // }
                        // formatter:function(value){
                        //     var ret = "";//拼接加\n返回的类目项
                        //     var maxLength = 2;//每项显示文字个数
                        //     var valLength = value.length;//X轴类目项的文字个数
                        //     var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                        //     if (rowN > 1)//如果类目项的文字大于3,
                        //     {
                        //         for (var i = 0; i < rowN; i++) {
                        //             var temp = "";//每次截取的字符串
                        //             var start = i * maxLength;//开始截取的位置
                        //             var end = start + maxLength;//结束截取的位置
                        //             //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                        //             temp = value.substring(start, end) + "\n";
                        //             ret += temp; //凭借最终的字符串
                        //         }
                        //         return ret;
                        //     }
                        //     else {
                        //         return value;
                        //     }
                        // }
                    }
                },
			    yAxis: {},
			    series: [
			        {type: 'bar'},
			        {type: 'line'},
			        {type: 'line'}
			    ]
            })
        },
        // drawPieChart() {
        //     this.chartPie = echarts.init(document.getElementById('chartPie'));
        //     this.chartPie.setOption({
        //         title: {
        //             text: '饼图',
        //             subtext: '本学期数据',
        //             // x: 'center'
        //         },
        //         tooltip: {
        //             trigger: 'item'
        //         },
        //         legend: {
        //             // orient: 'vertical',
        //             // left: 'left',
        //             // data: ['会员活动', '非会员活动']
        //         },
        //         dataset:{
        //         	source:[
        //         		["活动类型","本学期"],
        //         		["会员活动",2],
        //         		["非会员活动",3]
        //         	]
        //         },
        //         series: [
        //             {
        //                 name: '活动类型',
        //                 type: 'pie',
        //                 radius: '50%',
        //                 center: ['50%', '50%'],
				    //     encode: {
				    //         itemName: '活动类型',
				    //         value: '本学期'
				    //     }
        //             },
        //         ]
        //     });
        // },
        drawCharts() {
            this.drawColumnChart()
            // this.drawPieChart()
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