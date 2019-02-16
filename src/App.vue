<template>
  <div>
    <transition name="fade" mode="out-in">
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',        
  data () {
      return {
      };
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" src="./style/index.scss"></style>
<style lang="scss" rel="stylesheet/scss" src="./style/common.scss"></style>

