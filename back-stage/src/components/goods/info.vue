<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">商品添加页面</h1>
        <h1 v-else>商品修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/goods'}">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">商品添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>商品修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="cateform" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="一级分类" prop="first_cateid">
                <el-select v-model="form.first_cateid" @change="cateChange">
                    <el-option 
                    v-for="cateItem of cateArr" :key="cateItem.id" 
                    :value="cateItem.id" :label="cateItem.catename"
                    
                    >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="second_cateid">
                <el-select v-model="form.second_cateid">
                    <el-option 
                        v-for="cateItem2 of cateArr2" :key="cateItem2.id" 
                        :value="cateItem2.id" :label="cateItem2.catename"
                        
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称"  prop="goodsname">
                <el-input v-model="form.goodsname" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" >
                <el-input v-model="form.price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" >
                <el-input v-model="form.market_price" placeholder="请输入商品市场价格"></el-input>
            </el-form-item>

            <el-form-item label="商品规格" prop="specsid">
                <el-select v-model="form.specsid" @change="specsChange">
                    <el-option 
                    v-for="specsItem of specsArr" :key="specsItem.id" 
                    :value="specsItem.id" :label="specsItem.specsname"
                    
                    >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规格属性" prop="specsattr">
                <el-select v-model="form.specsattr" multiple>
                    <el-option 
                        v-for="(specsItem2,index) of specsArr2" :key="index" 
                        :value="specsItem2" :label="specsItem2"
                        
                        >
                    </el-option>
                </el-select>
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
            <el-form-item label="商品描述" >
                <!-- <el-input v-model="form.description" placeholder="请输入商品描述"></el-input> -->
                <div id="editor"></div>
            </el-form-item>
            <el-form-item label="是否新品" >
                <el-switch
                    v-model="form.isnew"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="2">
                </el-switch>
            </el-form-item>
            <el-form-item label="是否热卖" >
                <el-switch
                    v-model="form.ishot"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="2">
                </el-switch>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" >启用</el-radio>
                    <el-radio :label="2" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('cateform')">提交</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    data(){
        return{
            dialogVisible:false,
            dialogImageUrl:"",
            fileList:[],
            cateArr:[],
            cateArr2:[],
            specsArr:[],
            specsArr2:[],
            form:{
                first_cateid:"",
                second_cateid:"",
                specsid:"",
                specsattr:"",
                goodsname:"",
                price:"",
                market_price:"",
                img:"",
                description:"",
                isnew:1,
                ishot:1,
                status:1
            },
            rules:{
                first_cateid:[
                    { required:true,message:'请选择一级分类',trigger:'change'}
                ],
                second_cateid:[
                    { required:true,message:'请选择二级分类',trigger:'change'}
                ],
                specsid:[
                    { required:true,message:'请选择商品规格',trigger:'change'}
                ],
                specsattr:[
                    { required:true,message:'请选择规格属性',trigger:'change'}
                ],
                goodsname:[
                    { required:true,message:"请填写商品名称",trigger:'blur'},
                    { min :2 , max : 20 , message : "名称长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        getCate(pid=0){
            this.$http.get("/api/catelist",{pid}).then(res=>{
                if(pid == 0){
                   this.cateArr = res.data.list 
                }else{
                    this.cateArr2 = res.data.list
                }
                
            })
        },
        specsChange(n){
            // console.log(n);
            if(this.$route.params.id){
                this.form.specsattr = ""
            }
            this.$http.get('/api/specsinfo',{id:n}).then(res=>{
                this.specsArr2 = res.data.list[0].attrs
            })
        },
        cateChange(n){
            // console.log(n)  打印的就是他的id
            if(this.$route.params.id){
                this.form.second_cateid = ""
            }
            this.getCate(n);
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
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                    this.form.description = this.editor.txt.html();
                    this.form.specsattr = this.form.specsattr.join(",");

                    console.log(this.form);
                    
                    //验证成功时生成一个表单
                    let data = new FormData();
                    for(let i in this.form){
                        data.append(i,this.form[i]); //将form中的每一项都添加到生成的表单里

                    }
                    
                    //判断当前操作是添加还是修改
                    var url = '/api/goodsadd'
                    
                    if(this.$route.params.id){
                        url = "/api/goodsedit"
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
                                this.$router.push("/goods")
                            }
                    })
                }
            })
        }
    },
    mounted(){
        this.$http.get("/api/specslist").then(res=>{
            this.specsArr = res.data.list
        })
        this.editor = new E("#editor");
        this.editor.create();

        console.log(this.$route);
        if(this.$route.params.id){
            this.$http.get("/api/goodsinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list
                console.log(this.form,1111111111);
                this.form.specsattr = this.form.specsattr.split(",");
                this.editor.txt.html(this.form.description);
                this.fileList = this.form.img ? [{url:this.form.img}] : [];

                this.$http.get('/api/catelist',{pid:this.form.first_cateid}).then(res=>{
                    this.cateArr2 = res.data.list
                })
            })
        }
       this.getCate();
    }
}
</script>

<style scoped lang="stylus">
    .el-form
        width 500px
</style>