<template>
    <div class="mask">
        <div class="box">
            <h1>用户登录</h1>
            <el-form 
                :rules="rules" :model="form" 
                ref="form"

            >
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="form.password" @keyup.enter="submit('form')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {required:true,message:"请输入用户名",tigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入密码",tigger:'blur'},
                    {min:2 , max: 20 , message : '密码长度应在2-20个字符之间'}
                ]
            }
        }
    },
    methods:{
        submit(obj){
            this.$refs[obj].validate((valid) =>{
                if(valid) {
                    this.$store.dispatch('doLoginSync',this.form).then(res=>{
                        if(res.data.code != 200){
                            this.$message(res.data.msg)
                        }else{
                            // localStorage.setItem("userinfo",JSON.stringify(result.data.list))
                            this.$router.push('/')
                        }
                    })
                }
            })
            
           
        }
    }
    
}
</script>

<style scoped lang="stylus">
@import("../assets/css/index.styl")

.mask
    s-size()
    background-color rgba(0,0,0,.3)
    .box
        width 400px
        height 300px
        background-color #fff
        border-radius 10px
        margin 0 auto
        transform translateY(50%)
        overflow hidden
        h1
            text-align center
            margin 10px 0
        .el-button
            width 80%
            margin 0 auto
            display block

</style>