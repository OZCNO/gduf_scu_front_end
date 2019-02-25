<template>
<div>
<el-row :gutter="20">
  <el-col :span="8" v-for="(o, index) in 3" :key="o">
    <el-card :body-style="{ padding: '0px' }" class="box-card">
      <img src="http://p2.qhimgs4.com/t0177ad851bdf322421.jpg" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</div>
</template>
<script>
export default{
	name:"enrollActivity",
	data(){
		return{
  			currentDate: new Date(),

		}
	}
}
</script>
<style lang="scss" scoped>

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
	
</style>