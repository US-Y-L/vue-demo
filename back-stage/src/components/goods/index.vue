<template>
    <div>
        <!-- <h2>商品列表页</h2> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('goods/add')" style="margin:10px 0">添加</el-button>
        <el-table :data="goodsArr" stripe border row-key="id" :tree-props="{children: 'children'}">
            <!-- <el-table-column label="编号" prop="id" width="180" align="center"></el-table-column> -->
            <el-table-column label="商品编号" prop="id" width="120" align="center"></el-table-column>
            <el-table-column label="商品名称" width="120" align="center" prop="goodsname"></el-table-column>
            
            <el-table-column label="商品价格" prop="price" width="120" align="center"></el-table-column>
            <el-table-column label="市场价格" prop="market_price" width="120" align="center"></el-table-column>
            <el-table-column label="图片" prop="img" width="120" align="center">
                <template slot-scope="scope">
                    <img v-if="scope.row.img" :src="scope.row.img"  width="140"/>
                </template>
            </el-table-column>
            <el-table-column label="是否新品" prop="isnew" width="120" align="center">
                <template slot-scope='item'>
                    <el-tag v-if="item.row.isnew == 1">是</el-tag>
                    <el-tag v-else type="danger">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否热卖" prop="ishot" width="120" align="center">
                <template slot-scope='item'>
                    <el-tag v-if="item.row.ishot == 1">是</el-tag>
                    <el-tag v-else type="danger">否</el-tag>
                </template>
            </el-table-column>
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
                    @click="$router.push('/goods/'+scope.row.id)">编辑</el-button>
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
            goodsArr:[],
            total:0,
            size:3,
            page:1
        }
    },
    computed:{
        ...mapState(["userinfo"])
    },
    mounted(){

        this.$http.get("/api/goodslist").then(res=>{
            if(res.data.code != 200){
                this.$message(res.data.msg)
            }else{
                this.goodsArr = res.data.list
            }
            
        })
        // console.log(this.goodsArr,1111111111)
        this.getPage();
        
    },
    methods:{
        // handleEdit(idx,obj){
        //     console.log(idx,obj)
        // },
        getPage(n=this.page){
           this.$http.get('/api/goodscount').then(res=>{
                this.total = res.data.list[0].total
            })
            
            this.$http.get('/api/goodslist',{size:this.size,page:n}).then(res=>{
                this.goodsArr = res.data.list
            })
        },
        currentPage(e){
            //点击事件默认传递的是页码值
            this.getPage(e)
            this.page = e;
        },
        handleDelete(id){
            // console.log(id)
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {

                    //封装方法时的写法
                    this.$http.post("/api/goodsdelete",{id:id}).then(res=>{
                        if(res.data.code != 200){
                            this.$message({
                                type:"error",
                                message:res.data.msg
                            })
                        }else{
                            if(this.goodsArr.length == 1 && this.page > 1){
                                    this.page--;
                                    this.getPage();
                                }else{
                                    this.getPage();
                                }
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // this.goodsArr = res.data.list
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