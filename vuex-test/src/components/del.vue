<template>
    <div class="delcon">
        <button class="btn btn-danger" @click="isshow=true">删除</button>
        <div class="mask" v-show="isshow">
            <div class="content">
                <h1>确定要删除该条数据吗？？？</h1>
                <button class="btn btn-danger" >确定</button>
                <button class="btn btn-default" @click="isshow=false">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isshow:false
        }
    }

}
</script>

<style scoped lang="stylus">
@import("../assets/css/index.styl")
    .delcon
        display inline-block
        .mask
            w-size(100vw,100vh)
            position fixed
            left 0
            top 0
            background-color rgba(0,0,0,.3)
            .content
                w-size(500px,300px)
                background-color #fff
                border-radius 20px
                position absolute 
                left 50%
                top 50%
                transform translate(-50%,-50%)
</style>    