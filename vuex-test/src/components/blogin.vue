<template>
    <div class="page">
        <div class="content">
            <form action="" class="form-horizontal">
                <h2 class="text-center">登录页面</h2>
                <div class="form-group">
                    <label class="col-md-3"></label>
                    <div class="col-md-8">
                        <input class="form-control" type="text" placeholder="请输入用户名">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3"></label>
                    <div class="col-md-8">
                        <input class="form-control" type="password" placeholder="请输入密码">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3"></label>
                    <div class="col-md-8">
                        <button class="btn btn-primary btn-lg" type="button" @click="dol">登录</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        dol(){
            localStorage.setItem('userinfo','admin');
            this.$router.push("box")
        }
    }
}
</script>

<style scoped lang="stylus">

    @import("../assets/css/index.styl")
    *
        margin 0
        padding 0
    .page
        w-size()
        background-color rgba(0,0,0,.2)
        .content
            w-size(500px,300px)
            background-color #fff
            border-radius 20px
            position absolute 
            left 50%
            top 50%
            transform translate(-50%,-50%)
            form
                width 400px
                transform translateX(30px)
                h2
                    padding 20px 0
                .form-group
                    margin 10px 0
                    .btn-lg
                        w-size()
</style>