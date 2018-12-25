<template>
	<el-container>
      <el-header>
        <!-- <img src="./assets/logo.png"> -->
        <h1>广金校社联管理系统</h1> <!-- <a class="t-btn"><span></span></a>  -->
      </el-header>
      <el-main>
      <!-- 路由出口 -->
        <router-view/>
      </el-main>
      <el-footer>@ 2018 <a href="#">ZhengCN</a> 强力驱动</el-footer>
    </el-container>
</template>
<script>
	export default{
		name:"Main",
		data(){
			return{

			}
		}
	}
</script>
<style lang="scss">
  .el-header{
    background-color: #409EFF;
    text-align: center;
    h1{
      color: #fff;
      line-height: 60px;
      margin:0 auto;
    }
    // 三横杠
    a.t-btn{
      position:absolute;
      right:30px;
      top:17px;
      width:30px;
      height:26px;
      cursor: pointer;
    }
    span,span:before,span:after{
      position:absolute;
      left:0;
      width:30px;
      height:4px;
      content:"";
      background-color: #fff;
    }
    span{
      top:11px;
      &:before{
        top:0;
        transform:translateY(-7px);
        transition:all .3s;
      }
      &:after{
          transform: translateY(7px);
          transition: all .3s;
      }
    }
  }
  .el-footer{
    position:fixed;
    bottom:0;
    width:100%;
    background-color:#f8f8f8;
    color:#666;
    text-align: center;
    line-height: 60px;
    a{
      color:#666;
    }
  }
  
  
  .el-main {
    // background-color: #E9EEF3;
    color: #333;
    text-align: center;
    // background-image: url(./assets/login/login_bg.jpg);
    // background-repeat: no-repeat;
    // background-size: cover;
    // width:100vw;
    // height:100vh;
    padding:0 0 60px 0;
    // line-height: 160px;
  }
  
  
  // .el-aside {
  //   background-color: #D3DCE6;
  //   color: #333;
  //   text-align: center;
  //   line-height: 200px;
  // }
  // .el-container:nth-child(5) .el-aside,
  // .el-container:nth-child(6) .el-aside {
  //   line-height: 260px;
  // }
  
  // .el-container:nth-child(7) .el-aside {
  //   line-height: 320px;
  // }
</style>