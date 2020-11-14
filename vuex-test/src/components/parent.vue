<template>
    <div>
        <h1>父组件</h1>
        <button @click="$store.commit('addnum',5)">年龄+</button>
        <button @click="changeAge">年龄+actions方式</button>
        <p>父组件中库里的name:{{this.uname}}</p>
        <p>父组件中库里的age:{{this.uage}}</p>
        <!-- <p>父组件中库里的gender:{{this.ugender}}</p> -->
        <p>新的name:{{this.newname}}</p>
        <p>库中的新age:{{this.newage}}</p>
        <hr/>
        <!-- 模块 -->
        <p>外层的num:{{$store.state.num}}</p>
        <p>shop组件中的num:{{$store.state.shop.num}}</p>
        <p>商品新的数量:{{$store.getters['shop/newshop']}}</p>
        <button @click="$store.commit('addshop')">外层的num+</button>
        <button @click="$store.commit('shop/addshop')">shop中的num+</button>
        <hr/>
        <son></son>
    </div>
</template>

<script>
import {mapState , mapGetters , mapMutations , mapActions } from "vuex"
import son from "./son"
export default {
    data(){
        return {
            info:{}
        }
    },
    components:{
        son
    },
   computed:{
    ...mapState({
      uname:"name",
      uage:"age",
      ugender:"gender"
    }),
    ...mapGetters(["newname","newage"])
  },
  methods:{
    //写了这个直接在事件里写函数名即可
    // ...mapMutations(["addnum"])

    // 写了这个在事件中直接写函数名  没写的话在事件中： $store.dispatch("函数名")
    ...mapActions(["changeAge"])
  },
  mounted(){
    console.log(this.$store)
  }
}
</script>

<style>

</style>