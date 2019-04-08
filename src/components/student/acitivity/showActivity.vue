<template>
<div>
	<el-carousel :interval="4000" type="card" height="300px" style="marginTop:10px">
	    <el-carousel-item v-for="item in list" :key="item.title" :title="item.title">
	     	<img :src='"http://localhost:8083/"+item.image' class="carouselImg">
	    </el-carousel-item>
	 </el-carousel>

	 <el-card class="box-card">
	 	<div slot="header">最近活动成果详情</div>
		<el-collapse accordion>
			<template v-for="item in list2">
				<el-collapse-item :title="item.title">
					<el-row :gutter="20">
						<el-col :span="8">
							<img :src='"http://localhost:8083/"+item.image' class="collapseImage">
						</el-col>
						<el-col :span="16">
							<div>{{item.content}}</div>
						</el-col>
					</el-row>
				</el-collapse-item>			
			</template>
		</el-collapse>
	</el-card>
</div>
</template>
<script>
import {getActivityResult} from "../../../api.js"
export default{
	name:"showActivity",
	data(){
		return{
			list:[],
			list2:[]
		}
	},
	created(){
		getActivityResult().then(res=>{
			let {msg,code,data}=res.data;
			if(code==200){
				this.list2=data.list
				this.list=data.list.slice(0,5)
			}
		})
	},
	methods:{

	}
}
</script>
<style lang="scss" scoped>
.carouselImg{
	// width:535px;
	width:100%;
	height:300px;
	border-radius:25px;
}
.collapseImage{
    width: 100%;
	max-width: 500px;
}
	
</style>