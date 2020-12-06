<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">菜单添加页面</h1>
        <h1 v-else>菜单修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页uiiiuui</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/menu'}">菜单管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">菜单添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>菜单修改阿瑟东大时代</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="menuform" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="上级菜单" prop="pid">
                <el-select v-model="form.pid">
                    <el-option :value="0" label="顶级菜单"></el-option>
                    <el-option :value="item.id" :label="item.title" v-for="item of menuArr" :key="item.id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="title">
                <el-input placeholder="请输入菜单名称" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1 ">目录</el-radio>
                    <el-radio :label="2" >菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图标" v-if="form.type == 1">
                <el-input placeholder="请输入菜单图标" v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="地址" v-else>
                <el-input placeholder="请输入菜单地址" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" >启用</el-radio>
                    <el-radio :label="2" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('menuform')">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            menuArr:[],
            form:{
                pid:"",
                title:"",
                icon:"",
                type:1,
                url:"",
                status:1
            },
            rules:{
                pid:[
                    { required:true,message:'请选择上级菜单',trigger:'change'}
                ],
                title:[
                    {  required:true,message:"请填写菜单标题",trigger:'blur'},
                    { min :2 , max : 20 , message : "标题长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                    //判断当前操作是添加还是修改
                    var url = '/api/menuadd'
                    if(this.$route.params.id){
                        url = "/api/menuedit"
                        this.form.id = this.$route.params.id
                    }

                    //调用接口完成数据的添加工作
                    // console.log(this.form)
                    // this.$http.post(url,this.form).then(result=>{
                    //     // console.log(result);
                    //     if(result.data.code!=200){
                    //         alert(result.data.msg)
                    //     }else{
                    //         this.$router.push("/menu")
                    //     }
                    // })
                    this.$http.post(url,this.form).then(result=>{
                            if(result.data.code!=200){
                                alert(result.data.msg)
                            }else{
                                this.$router.push("/menu")
                            }
                    })
                }
            })
        }
    },
    mounted(){
        // console.log(this.$route.params.id)
        console.log(this.$route);
        if(this.$route.params.id){
            // this.$http({
            //     url:"/api/menuinfo",
            //     // method:"post",
            //     params:{
            //         id:this.$route.params.id
            //     }
            // }).then(res=>{
            //     console.log(res.data.list);
            //     this.form = res.data.list
            // })
            this.$http.get("/api/menuinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list
            })
        }
        // this.$http({
        //     url:"/api/menulist?pid=0",

        // }).then(res=>{
        //     // console.log(res)
        //     this.menuArr = res.data.list;
        // })
        this.$http.get("/api/menulist?pid=0").then(res=>{
            this.menuArr = res.data.list
        })
    }
}
</script>

<style scoped style="stylus">
    
</style>