<template>
   <div>
       <h1>子组件</h1>
       <button @click="$store.dispatch('changeAge')">年龄+actions方式</button>
        <p>子组件中库里的name:{{this.uname}}</p>
        <p>子组件中库里的age:{{this.uage}}</p>
        <!-- <p>子组件中库里的gender:{{this.ugender}}</p> -->
        <p>新的name:{{this.newname}}</p>
        <p>库中的新age:{{this.newage}}</p>
    </div>
</template>

<script>
import {mapState , mapGetters , mapMutations } from "vuex"
export default {
     computed:{
    ...mapState({
      uname:"name",
      uage:"age",
      ugender:"gender"
    }),
    ...mapGetters(["newname","newage"])
  }
}
</script>

<style>

</style>