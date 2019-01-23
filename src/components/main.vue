<template>
	<el-container class="mainContainer">
    <el-header>
      <div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?"":"广金校社联管理系统"}}</div><a class="t-btn" :class="collapsed?'btn-collapse-left':'btn-left'" @click.prevent="collapse"><span></span></a> 
    </el-header>
    <router-view/>
  </el-container>
 </template>
<script>
export default{
  name:"Main",
	data(){
		return{
      collapsed:false,
    }
	},
  methods:{
    // 折叠导航栏
    collapse:function(){
      this.collapsed=!this.collapsed;  
    }
  }
}
</script>
<style lang="scss" scoped>
 
</style>