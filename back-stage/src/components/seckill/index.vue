<template>
    <div>
        <!-- <h2>活动列表页</h2> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('seckill/add')" style="margin:10px 0">添加</el-button>
        <el-table :data="goodsArr" stripe border row-key="id" >
            <el-table-column label="活动名称" width="120" align="center" prop="title"></el-table-column>
            
            <el-table-column label="状态" prop="status" width="120" align="center">
                <template slot-scope='item'>
                    <el-tag v-if="item.row.status == 1">启用</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="$router.push('/seckill/'+scope.row.id)">编辑</el-button>
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
            goodsArr:[]
        }
    },
    computed:{
        ...mapState(["userinfo"])
    },
    mounted(){

        this.$http.get("/api/secklist").then(res=>{
            if(res.data.code != 200){
                this.$message(res.data.msg)
            }else{
                this.goodsArr = res.data.list
            }
            
        })

        // console.log(this.goodsArr,1111111111)
    },
    methods:{
        // handleEdit(idx,obj){
        //     console.log(idx,obj)
        // },
        handleDelete(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {

                    //封装方法时的写法
                    this.$http.post("/api/seckdelete",{id:id}).then(res=>{
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
                            this.goodsArr = res.data.list
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
    
</style>