<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">角色添加页面</h1>
        <h1 v-else>角色修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/role'}">角色管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">角色添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>角色修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="form" :model="form" label-width="100px"
            :rules="rules"
        >
            
            <el-form-item label="角色名称" prop="rolename">
                <el-input placeholder="请输入角色名称" v-model="form.rolename"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限">
                <el-tree show-checkbox 
                    :data="menuData" 
                    :props="defaultProps" 
                    @node-click="handleNodeClick"
                    ref="mytree"
                    node-key="id"
                    check-strictly
                    :default-checked-keys="expandKeys"
                    :default-expanded-keys="expandKeys"
                >

                </el-tree>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" >启用</el-radio>
                    <el-radio :label="2" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            expandKeys:[],
            menuArr:[],
            form:{
                rolename:"",
                menus:[],
                status:1
            },
            menuData:[],
             defaultProps: {
                children: 'children',
                label: 'title'
            },
            rules:{
                rolename:[
                    {  required:true,message:"请填写角色标题",trigger:'blur'},
                    { min :2 , max : 20 , message : "名称长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(name){
            // console.log(this.$refs.mytree.getCheckedKeys());
            var nodeKeys = this.$refs.mytree.getCheckedKeys().join(",")
            // console.log(typeof nodeKeys)   成功转为字符串类型
            this.form.menus = nodeKeys
            
            this.$refs[name].validate(valid => {
                if(valid){
                    //判断当前操作是添加还是修改
                    var url = '/api/roleadd'
                    if(this.$route.params.id){
                        url = "/api/roleedit"
                        this.form.id = this.$route.params.id
                    }

                    //调用接口完成数据的添加工作
                    // console.log(this.form)
                    // this.$http.post(url,this.form).then(result=>{
                    //     // console.log(result);
                    //     if(result.data.code!=200){
                    //         alert(result.data.msg)
                    //     }else{
                    //         this.$router.push("/role")
                    //     }
                    // })
                    this.$http.post(url,this.form).then(result=>{
                            if(result.data.code!=200){
                            alert(result.data.msg)
                        }else{
                            this.$router.push("/role")
                        }
                    })
                }
            })
        },
        handleNodeClick(ev){
            console.log(ev);
        }
    },
    mounted(){
        // console.log(this.$route.params.id)
        console.log(this.$route.params);
        if(this.$route.params.id){
            // this.$http({
            //     url:"/api/roleinfo",
            //     // method:"post",
            //     params:{
            //         id:this.$route.params.id
            //     }
            // }).then(res=>{
            //     // console.log(res.data.list);
            //     this.form = res.data.list
            //     this.expandKeys = this.form.menus.split(",");
            // })
            this.$http.get("/api/roleinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list;
                this.expandKeys = this.form.menus.split(",");
            })
        }
        // this.$http({
        //     url:"/api/rolelist?pid=0",

        // }).then(res=>{
        //     // console.log(res)
        //     this.menuArr = res.data.list;
        // })
        this.$http.get("/api/rolelist",{pid:0}).then(res=>{
            this.menuArr = res.data.list;
        })

        //发请求，显示树状结构的数据
        // this.$http.get("/api/menulist?istree=1").then(res=>{
        //     this.menuData = res.data.list
        // })
        this.$http.get("/api/menulist",{istree:1}).then(res=>{
            this.menuData = res.data.list;
        })
    }
}
</script>

<style scoped style="stylus">
    
</style>