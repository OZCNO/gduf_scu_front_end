<template id="sidebar">
	<el-aside heigh="100%" :class="collapsed?'el-aside-collapse-width':'el-aside-width'">
		<el-scrollbar style="height:100%" :native="false"  wrap-class="list">
			<el-menu router  menu-trigger="click" :default-active="$route.path" unique-opened :collapse="collapsed">
				<template v-for="(item,index) in routes">
					<!-- 如果是二级菜单 -->
					<template v-if="item.children.push()>1">
					<!-- index是一个string值 -->
						<el-submenu :index="index+''" :key="item.index">
							<!-- 一级菜单名称 -->
							<template slot="title">
								<i :class="item.icon"></i>
								<span slot="title">{{item.title}}</span>
							</template>
							<!-- 二级菜单名称 -->
							<template v-for="item in item.children">
								<!-- 如果有分组，要先加分组标签 -->
								<!-- <template v-if="item.type!==null&&item.typeName!==null">
									<el-menu-item-group :title="item.typeName">
								</template> -->
								<!-- 中间内容 -->
								<el-menu-item :index="item.path">{{item.title}}</el-menu-item>
								<!-- 如果有分组，要在最后加结束标签 -->
								<!-- <template v-if="item.type==1000">
									</el-menu-item-group>
								</template> -->
							</template>
						</el-submenu>
					</template>
					<!-- 如果是一级菜单 -->
					<template v-else>
						<el-menu-item :index="item.children[0].path">
							<i :class="item.icon"></i>
							<span slot="title">{{item.title}}</span>
						</el-menu-item>
					</template>
				</template>
		    </el-menu>
		</el-scrollbar>
	</el-aside>	
</template>
<script>
import bus from "./bus"
export default{
	props:["role"],
	data(){
		return{
			collapsed:false,
			arr:["student","clubAdmin","unionAdmin","teacherAdmin"],
		}
	},
    created(){
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapsed', msg => {
            this.collapsed = msg
        })
    },
    computed:{
    	routes(){
    		let routes=this.$router.options.routes
    		let str=this.arr[this.role-1]
    		let arr=[]
			routes.forEach(function(item,index){
				if(item.path.indexOf(str)>-1){
					arr.push(item)
				}
			})
			return arr;
		},
    }
}	
</script>