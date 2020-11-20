<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">轮播图添加页面</h1>
        <h1 v-else>轮播图修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/banner'}">轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">轮播图添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>轮播图修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="bannerform" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="轮播图名称" prop="title">
                <el-input placeholder="请输入轮播图名称" v-model="form.title"></el-input>
            </el-form-item>
            

             <el-form-item label="图片" >
                <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false" :on-change="fileChange"
                :file-list="fileList"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <!-- 图片上的放大 -->
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                        </span>
                        <!-- 图片上的删除 -->
                        <span
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                            >
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" >启用</el-radio>
                    <el-radio :label="2" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('bannerform')">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            bannerArr:[],
            dialogVisible:false,
            dialogImageUrl:"",
            fileList:[],
            form:{
                title:"",
                img:"",
                status:1
            },
            rules:{
                title:[
                    {  required:true,message:"请填写轮播图标题",trigger:'blur'},
                    { min :2 , max : 20 , message : "标题长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){

                    //生成一个新的表单
                    let data = new FormData();
                    

                    //判断当前操作是添加还是修改
                    var url = '/api/banneradd'

                    if(this.$route.params.id){
                        url = "/api/banneredit"
                        this.form.id = this.$route.params.id

                        
                    }
                    for(let i in this.form){
                            data.append(i,this.form[i])
                    }


                    this.$http.post(url,data).then(result=>{
                            if(result.data.code!=200){
                                alert(result.data.msg)
                            }else{
                                this.$router.push("/banner")
                            }
                    })
                }
            })
        },
        handleRemove(file){
            console.log(file)
            this.fileList = []
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //在上面通过属性绑定的方式绑定一个函数，两个参数，如果只传了一张图片就使用file参数，多张图片使用fileList参数
        fileChange(file,fileList){
            //把选择的文件信息，赋值给要提交的数据对象
            //此时要提交的对象中包含一个资源（文件），直接提交是不会成功的
            //要提交包含文件的内容时，这个后端规定要使用表单的形式提交
            this.form.img = file.raw;
            // console.log(this.form.img);
        },
    },
    mounted(){
        // console.log(this.$route.params.id)
        console.log(this.$route);
        if(this.$route.params.id){

            this.$http.get("/api/bannerinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list
                this.fileList = this.form.img ? [{url:this.form.img}] : []
            })
        }
        this.$http.get("/api/bannerlist").then(res=>{
            this.bannerArr = res.data.list
            
        })
    }
}
</script>

<style scoped style="stylus">
    
</style>