<template>
<el-card class="box-card">
	<div slot="header" class="clearfix">
		<span>线上投票</span>
	</div>
	<el-collapse>
		<template v-for="(item, index) in list">	  		
			<el-collapse-item :title="item.theme" :name="index">
				<div slot="title">
					<span>{{item.theme}}</span>
				</div>	
				<el-radio-group v-model="list[index].choose" v-for="(i,j) in item.option" :key="j">	
					<el-radio class="radio" :label="j">{{i.name}}<span style="float: right;">{{i.votes}}票</span></el-radio>
				</el-radio-group>
				<el-button style="float: right; padding: 3px 0" type="text" @click="handleVote(item.id,list[index].choose)">投票</el-button>
			</el-collapse-item>
		</template>
	</el-collapse>
</el-card>
</template>
<script>
	export default{
		name:"onlineActivity",
		data(){
			return{
				//投票活动
				list:[
					{
						id:0,
						theme:"年度社团评比大赛",
						option:[
							{name:"公关协会",votes:20},
							{name:"数学协会",votes:20},
							{name:"出雲",votes:20},
						],
						choose:-1,
					},
					{
						id:1,
						theme:"最火活动",
						option:[
							{name:"挑战杯",votes:20},
							{name:"数学建模",votes:20},
							{name:"蓝桥杯",votes:20},
						],
						choose:-1,
					}
				],
			}
		},
		methods:{
			handleVote(){
				//投票，
				//如果已经投过了则显示红色或者提示
			}
		}
	}
</script>
<style lang="scss" scoped>
.el-radio-group{
	display: inline-block;
	width:100%;
	.radio{
		display:inline-block;
		width:100%;
		line-height:25px;
		&:hover{
			background-color: #ecf5ff;
		}
	}
}
	
</style>