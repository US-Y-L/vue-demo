<template>
    <div class="menu">
        <el-container>
        <el-header>
            <h2>商城后台管理</h2>
            <p>你好:<span>{{userinfo ? userinfo.username : ""}}</span><a href="javascript:;" @click="logout">退出</a>
            </p> 
        </el-header>
        <el-container>
            <el-aside width="150px">
                <el-menu
                    background-color="#bfa"
                    active-text-color="#4169E1"
                    router
                    unique-opened
                    :default-active="defaultActive"
                    :default-openeds= "openArr"
                >
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title" >首页</span>
                    </el-menu-item>

                    <el-submenu :index="item.children[0].url" v-for="item of menus" :key="item.id">
                        <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
                        <el-menu-item v-for="subitem of item.children" :key="subitem.id" :index="subitem.url">{{subitem.title}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    computed:{
        ...mapState(["userinfo"])
    },
    data(){
        return{
            menus:[],
            defaultActive:"",
            openArr:[],
        }
    },
    mounted(){
        this.menus = this.userinfo.menus
        
        // console.log(this.$route.meta.selected,1111)
        this.defaultActive = this.$route.meta.selected
        // console.log(this.defaultActive)


        //没有登陆时，这样去请求左边的menus,有登陆时，通过登陆的信息去给menus赋值
        // this.$http({
        //     url:'/api/menulist',
        //     params:{
        //         istree:1
        //     }
        // }).then(res=>{
        //     console.log(res)
        //     this.menus = res.data.list
        // })
    },
    watch:{
        $route(newval){
            // console.log(newval)
            this.defaultActive = newval.meta.selected
            // this.openArr.splice(0,1,newval.meta.selected)
            if(newval.meta.selected == "/"){
                this.openArr = []
            }else{
                 this.openArr[0] = newval.meta.selected;
            }
           
            console.log(this.openArr)
        }
    },
    methods:{
        logout(){
            this.$store.commit('setUserInfo',{})
            this.$router.replace("/login")
        }
    }
}
</script>

<style scoped lang='stylus'>

@import "../assets/css/index.styl"

    .menu
        s-size()
        .el-container
            s-size()
            .el-header
                background-color $color2
                display flex
                box-sizing border-box
                padding 0 15px
                justify-content space-between
                align-items center
            .el-aside
                background-color $color4
            
            

</style>