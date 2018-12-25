<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',        
  data () {
      return {
          theme: this.$store.state.app.themeColor
      };
  },
  // mounted () {
  // },
  // beforeDestroy () {
  // },
  // methods: {
  // }
}
</script>
<style lang="scss" rel="stylesheet/scss" src="./style/index.scss"></style>
<style lang="scss">
html,body{
    width: 100%;
    height: 100%;
    // background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}  
//login.vue
.login_form{
  .el-input__inner{
      padding:0 30px;
  }
}
</style>

