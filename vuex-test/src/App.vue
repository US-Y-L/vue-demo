<template>
  <div id="app">
    
      <!-- <parent></parent> -->
      <router-view></router-view>
    </div>
</template>

<script>
// import {mapState , mapGetters , mapMutations } from "vuex"

// 在App.vue中引入bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'
import parent from "./components/parent"
export default {
  name: 'App',
  components:{
    parent
  },
  
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body,#app {
  width:100%;
  height:100%;
}
</style>
