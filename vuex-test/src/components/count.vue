<template>
    <div class="box">
        <p>{{this.cnum}}</p>
        <p>{{this.newnum1}}</p>
        <button @click="$store.commit('addcnum',3)">同步的加</button>
        <button @click="$store.dispatch('yibujia')">异步的加1</button>
        <!-- 进行判断，如果cnum是奇数，才执行异步的+1 -->
    </div>
</template>

<script>
import {mapState , mapGetters , mapMutations , mapActions} from "vuex"
export default {
    data(){
        return {
            info:{

            }
        }
    },
    mounted(){
        console.log(this.$store);
    },
    computed:{
        ...mapState(["cnum"]),
        ...mapGetters(["newnum1"])
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .box{
        margin: 50px 50px;
    }
</style>