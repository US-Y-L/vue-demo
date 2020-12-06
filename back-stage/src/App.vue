<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
@import "./assets/css/index.styl"
  #app
    s-size(100vw,100vh)
    background-color #666
  .el-breadcrumb
        margin 20px 0

</style>
