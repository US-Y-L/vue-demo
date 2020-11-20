<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">商品添加页面</h1>
        <h1 v-else>商品修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/cate'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">商品添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>商品修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="cateform" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="上级分类" prop="pid">
                <el-select v-model="form.pid">
                    <el-option :value="0" label="顶级分类"></el-option>
                    <el-option v-for="cateItem of cateArr" :key="cateItem.id" :value="cateItem.id" :label="cateItem.catename"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="catename">
                <el-input placeholder="请输入商品名称" v-model="form.catename"></el-input>
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
                <el-button type="primary" @click="submitForm('cateform')">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible:false,
            dialogImageUrl:"",
            fileList:[],
            cateArr:[],
            form:{
                pid:"",
                catename:"",
                img:"",
                status:1
            },
            rules:{
                pid:[
                    { required:true,message:'请选择上级分类',trigger:'change'}
                ],
                catename:[
                    { required:true,message:"请填写商品分类名称",trigger:'blur'},
                    { min :2 , max : 20 , message : "名称长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
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
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                    //验证成功时生成一个表单
                    let data = new FormData();
                    for(let i in this.form){
                        data.append(i,this.form[i]); //将form中的每一项都添加到生成的表单里

                    }
                    
                    //判断当前操作是添加还是修改
                    var url = '/api/cateadd'
                    if(this.$route.params.id){
                        url = "/api/cateedit"
                        this.form.id = this.$route.params.id
                        for(let i in this.form){
                            data.append(i,this.form[i]); //将form中的每一项都添加到生成的表单里
                            
                        }
                    }

                    //调用接口实现数据的添加工作
                    //提交时提交生成的那个表单即可
                    this.$http.post(url,data).then(result=>{
                            if(result.data.code!=200){
                                alert(result.data.msg)
                            }else{
                                this.$router.push("/cate")
                            }
                    })
                }
            })
        }
    },
    mounted(){
        console.log(this.$route);
        if(this.$route.params.id){
            this.$http.get("/api/cateinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list
                this.fileList = this.form.img ? [{url:this.form.img}] : []
            })
        }
        this.$http.get("/api/catelist",{pid:0}).then(res=>{
            this.cateArr = res.data.list
        })
       
    }
}
</script>

<style scoped style="stylus">
    
</style>