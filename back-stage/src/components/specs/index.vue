<template>
    <div>
        <!-- <h2>商品规格列表页</h2> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品规格管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('specs/add')" style="margin:10px 0">添加</el-button>
        <el-table :data="menuArr" stripe border row-key="id" :tree-props="{children: 'children'}">
            <!-- <el-table-column label="编号" prop="id" width="180" align="center"></el-table-column> -->
            <el-table-column label="id" prop="id" width="180" align="center"></el-table-column>
            <el-table-column label="规格名称" prop="specsname" width="180" align="center"></el-table-column>
            <el-table-column label="规格属性" prop="attrs" width="180" align="center">
                <template slot-scope="scope">
                    <el-tag v-for="(item,index) in scope.row.attrs" :key="index" type="warning">{{item}}</el-tag>
                    
                </template>
            </el-table-column>
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
                    @click="$router.push('/specs/'+scope.row.id)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
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
            menuArr:[],
            total:0,
            size:3,
            page:1
        }
    },
    computed:{
        ...mapState(["userinfo"])
    },
    mounted(){

        this.$http.get("/api/specslist" , {istree:1}).then(res=>{
            if(res.data.code != 200){
                this.$message(res.data.msg)
            }else{
                this.menuArr = res.data.list
                console.log(this.menuArr,11111)
            }
            
        })

        this.getPage()
        
    },
    methods:{
         getPage(n=this.page){
            
            this.$http.get('/api/specscount').then(res=>{
                this.total = res.data.list[0].total
            })
            
            this.$http.get('/api/specslist',{size:this.size,page:n}).then(res=>{
                this.menuArr = res.data.list
            })
        },
        currentPage(e){
            //点击事件默认传递的是页码值
            this.getPage(e)
            this.page = e;
        },
        handleDelete(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该商品规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    //封装方法时的写法
                    this.$http.post("/api/specsdelete",{id:id}).then(res=>{
                        if(res.data.code != 200){
                            this.$message({
                                type:"error",
                                message:res.data.msg
                            })
                        }else{
                            if(this.menuArr.length == 1 && this.page > 1){
                                    this.page--;
                                    this.getPage();
                                }else{
                                    this.getPage();
                            }

                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // this.menuArr = res.data.list
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
    .el-table
        margin-bottom 20px
    .el-pagination
        text-align center
</style>