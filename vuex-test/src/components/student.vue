<template>
    <div class="wrap">
        <div class="container">
            <h1>学生管理页面</h1>
            <router-link to="student/info" class="btn btn-primary">添加</router-link>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th class="text-center">编号</th>
                        <th class="text-center">姓名</th>
                        <th class="text-center">手机号</th>
                        <th class="text-center">状态</th>
                        <th class="text-center">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) of infoArr" :key='index'>
                        <td class="text-center">{{index+1}}</td>
                        <td class="text-center">{{item.name}}</td>
                        <td class="text-center">{{item.phone}}</td>
                        <td class="text-center">{{item.status}}</td>
                        <td class="text-center">
                            <button class="btn btn-primary">编辑</button>
                            <!-- <button class="btn btn-danger">删除</button> -->
                            <delb></delb>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
</template>

<script>
import { mapState } from "vuex"
import delb from "./del"
export default {
    //data(){
        // return{
        //     stuarr:[
        //         {
        //           id:10001,
        //           name:"gary",
        //           phone:18912345678,
        //           status:1  
        //         },
        //         {
        //           id:10002,
        //           name:"tom",
        //           phone:18478345678,
        //           status:0  
        //         },
        //         {
        //           id:10003,
        //           name:"nigo",
        //           phone:18912341234,
        //           status:0  
        //         }
        //     ]
        // }
    //},
    components:{
        delb
    },
    computed:{
        ...mapState(["infoArr"])
    }
}
</script>

<style scoped lang="stylus">
    @import("../assets/css/index.styl")

    .wrap
        w-size()
        background-color #ffffff

</style>