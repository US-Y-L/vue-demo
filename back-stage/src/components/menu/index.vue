<template>
    <div>
        <!-- <h2>菜单列表页</h2> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('menu/add')" style="margin:10px 0">添加</el-button>
        <el-table :data="menuArr" stripe border row-key="id" :tree-props="{children: 'children'}">
            <!-- <el-table-column label="编号" prop="id" width="180" align="center"></el-table-column> -->
            <el-table-column label="菜单名称" prop="title" width="180" align="center"></el-table-column>
            <el-table-column label="图标" width="180" align="center">
                <!-- 使用插槽将图标显示出来 -->
                <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="url" width="180" align="center"></el-table-column>
            <el-table-column label="状态" prop="status" width="180" align="center">
                <template slot-scope='item'>
                    <el-tag v-if="item.row.status == 1">启用</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="$router.push('/menu/'+scope.row.id)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data(){
        return{
            menuArr:[]
        }
    },
    computed:{
        ...mapState(["userinfo"])
    },
    mounted(){

        // this.$http({
        //     // url:"/api/menulist",
        //     // params:{
        //     //     istree:1
        //     // },

        //     //或者用上面的方式
        //     url:"/api/menulist?istree=1",
        //     //想要获取到指定信息，就要按要求设置请求头  请求头的token已经保存在vuex的仓库中了
        //     headers:{
        //         Authorization : this.userinfo.token
        //     }


        // }).then(res=>{
        //     // console.log(res);
        //     this.menuArr = res.data.list
        // })

        this.$http.get("/api/menulist" , {istree:1}).then(res=>{
            if(res.data.code != 200){
                this.$message(res.data.msg)
            }else{
                this.menuArr = res.data.list
            }
            
        })
        
    },
    methods:{
        // handleEdit(idx,obj){
        //     console.log(idx,obj)
        // },
        handleDelete(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    //点击确定后调用接口，完成数据的删除操作
                    //不封装方法时的写法
                    // this.$http({
                    //     url:"/api/menudelete",
                    //     method:"post",
                    //     data:{id:id}
                    // }).then(res=>{
                    //     console.log(res);
                    //     if(res.data.code != 200){
                    //         this.$message({
                    //             type:"error",
                    //             message:res.data.msg
                    //         })
                    //     }else{
                    //         this.$message({
                    //             type: 'success',
                    //             message: '删除成功!'
                    //         });
                    //         this.menuArr = res.data.list
                    //     }
                    // })

                    //封装方法时的写法
                    this.$http.post("/api/menudelete",{id:id}).then(res=>{
                        if(res.data.code != 200){
                            this.$message({
                                type:"error",
                                message:res.data.msg
                            })
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.menuArr = res.data.list
                        }
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
    }
}
</script>

<style>

</style>