<template>
    <div id="wrap">
        <div class="top">
            <h2>后台管理界面</h2>
            <p>你好<a href="javascript:;" @click="logout">退出</a></p>
        </div>
        <div class="main">
            <div class="left">
                <router-link to="/box/student" active-class="active">学生信息</router-link>
                <router-link to="/box/course" active-class="active">班级信息</router-link>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
export default {
    methods:{
        logout(){
            //localStorage.clear()  //清空localStorage中的所有信息
            localStorage.removeItem("userinfo") //只清除这一项
            this.$router.replace("blogin")
        }
    }
}
</script>

<style scoped lang="stylus">
    @import "../assets/css/index.styl"
    
    #wrap
        w-size()
        display flex
        flex-direction column
        .top
            w-size(100%,100px)
            background-color $color1
            box-sizing border-border-box
            padding 0 30px
            display flex
            justify-content space-between
            align-items center
        .main
            flex 1
            background-color #ccc
            display flex
            .left
                w-size(150px,100%)
                background-color $color2
                text-align center
                a
                    display block
                    color #666
                    font 18px/2 "微软雅黑"
                    text-decoration none
                a.active
                    background-color #3CB371
                    color #000
            .right
                flex 1
                background-color $color4
        .bottom
            w-size(100%,100px)
            background-color $color3
</style>