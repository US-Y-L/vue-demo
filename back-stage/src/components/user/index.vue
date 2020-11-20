<template>
    <div>
        <!-- <h2>管理员列表页</h2> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('user/add')" style="margin:10px 0">添加</el-button>
        <el-table :data="userArr" stripe border >
            <!-- <el-table-column label="编号" prop="id" width="180" align="center"></el-table-column> -->
            <el-table-column label="所属角色" prop="rolename" width="180" align="center"></el-table-column>
            <el-table-column label="用户名" prop="username" width="180" align="center"></el-table-column>
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
                    @click="$router.push('/user/'+scope.row.uid)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.uid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            @current-change="currentPage"
        >
        </el-pagination>
    </div> 
</template>

<script>
import { mapState } from "vuex"
export default {
    data(){
        return{
            userArr:[],
            uid:"",
            total:0,
            size:3,
            page:1
        }
    },
    computed:{
        ...mapState(["userinfo"])
    },
    mounted(){
       this.getPage()

        //获取管理员列表
        // this.$http.get('/api/usercount').then(res=>{
        //     this.total = res.data.list[0].total
        // })
       
        console.log(this.total)
        
    },
    methods:{
        getPage(n=this.page){
            //  this.$http({
            //     url:"/api/usercount",
            //     headers:{
            //         Authorization : this.userinfo.token
            //     }
            // }).then(res=>{
            //     this.total = res.data.list[0].total
            //     console.log(res.data.list[0])
            // }),
            this.$http.get('/api/usercount').then(res=>{
                this.total = res.data.list[0].total
            })
            //  this.$http({
            //     url:"/api/userlist",
            //     params:{
            //         size:this.size,
            //         page:n
            //     },
            //     headers:{
            //         Authorization : this.userinfo.token
            //     }
            // }).then(res=>{
            //         this.userArr = res.data.list
            //     })
            this.$http.get('/api/userlist',{size:this.size,page:n}).then(res=>{
                this.userArr = res.data.list
            })
        },
        currentPage(e){
            //点击事件默认传递的是页码值
            this.getPage(e)
            this.page = e;
        },
        handleDelete(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    //点击确定后调用接口，完成数据的删除操作
                    // this.$http({
                    //     url:"/api/userdelete",
                    //     method:"post",
                    //     data:{uid:id}
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
                    //         this.userArr = res.data.list
                    //     }
                    // })
                    this.$http.post('/api/userdelete',{uid:id}).then(res=>{
                            if(res.data.code != 200){
                                this.$message({
                                    type:"error",
                                    message:res.data.msg
                                })
                            }else{
                                
                                if(this.userArr.length == 1 && this.page > 1){
                                    this.page--;
                                    this.getPage();
                                }else{
                                    this.getPage();
                                }
                                // this.userArr = res.data.list
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
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

<style scoped lang="stylus">
    .el-pagination
        text-align center
        margin 10px 0
        
</style>