<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">管理员添加页面</h1>
        <h1 v-else>管理员修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/user'}">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">管理员添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>管理员修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="form" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="所属角色" prop="pid">
                <el-select v-model="form.roleid">
                    <el-option :value="item.id"  v-for="item of userArr" :key="item.id" :label="item.rolename">
                        {{item.rolename}}
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="title">
                <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="form.password" type="password"></el-input>
                <span v-if="$route.params.id">留空则不修改</span>
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
            userArr:[],
            form:{
                roleid:"",
                username:"",
                password:"",
                status:1
            },
            rules:{
                roleid:[
                    { required:true,message:'请选择所属角色',trigger:'change'}
                ],
                username:[
                    {  required:true,message:"请填写用户名",trigger:'blur'},
                    { min :2 , max : 20 , message : "用户名长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                    //判断当前操作是添加还是修改
                    var url = '/api/useradd'
                    if(this.$route.params.id){
                        url = "/api/useredit"
                        this.form.uid = this.$route.params.id
                    }

                    //调用接口完成数据的添加工作
                    // console.log(this.form)
                    this.$http.post(url,this.form).then(result=>{
                        // console.log(result);
                        if(result.data.code!=200){
                            alert(result.data.msg)
                        }else{
                            this.$router.push("/user")
                        }
                    })
                    
                }
            })
        }
    },
    mounted(){
        
        if(this.$route.params.id){
    
            // this.$http({
            //     url:"/api/userinfo",
            //     params:{
            //         uid:this.$route.params.id
            //     }
            // }).then(res=>{
            //     console.log(res);
            //     this.form = res.data.list
            //     this.form.password = ""
            // })

            this.$http.get('/api/userinfo',{uid:this.$route.params.id}).then(res=>{
                this.form = res.data.list;
                this.form.password = ""
            })
        }
        // this.$http({
        //     url:"/api/rolelist",

        // }).then(res=>{
        //     console.log(res.data.list)
        //     this.userArr = res.data.list;
        // })
        this.$http.get('/api/rolelist').then(res=>{
            this.userArr = res.data.list
        })
    }
}
</script>

<style scoped style="stylus">
    
</style>