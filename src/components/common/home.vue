<template>
	<el-container class="container">
		<v-head :logo-name="logoName" :sys-user-name="user.name||user.clubName" :sys-user-avatar="user.avatar" ref="layout"></v-head>
		<el-container class="main">
			<v-sidebar :role="user.role"></v-sidebar>
			<el-main :class="collapsed?'el-main-collapse-width':'el-main-width'">
				<v-tags></v-tags>
				<el-col :span="24" class="contentWrapper">
					<transition name="fade" mode="out-in">
						<router-view :user="user"></router-view>
					</transition>
				</el-col>
			</el-main>		
		</el-container>
    </el-container>
</template>
<script>
import {editPassword,getUserInformation} from "../../api.js"
import vHead from "./head"
import vSidebar from "./sidebar"
import bus from "./bus"
import vTags from "./tags"

export default {
	components:{
		vHead,
		vSidebar,
		vTags
	},
	data() {
		return {
			logoNameArr:["学生端","校社团端","校社联端","教师端"],
			// 传入组件的值
			user:{},
			collapsed:false,
		}
	},
	created:function(){
		bus.$on("collapsed",msg=>{
			this.collapsed=msg;
		})
		getUserInformation().then(res=>{
			let {msg,code,data}=res.data
			if(code==200){
				console.log(data)
				this.user=data
				this.user.avatar=this.user.avatar==""?"https://pic.qqtn.com/up/2018-12/2018122117024489020.jpg":this.user.avatar
			}
		})
	},
	computed:{
		logoName(){
			return this.logoNameArr[this.user.role-1]
		}
	}
}
</script>