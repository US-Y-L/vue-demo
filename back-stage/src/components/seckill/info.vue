<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">活动添加页面</h1>
        <h1 v-else>活动修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/seckill'}">活动管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">活动添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>活动修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="cateform" :model="form" label-width="100px"
            :rules="rules"
        >
            <el-form-item label="活动名称"  prop="title">
                <el-input v-model="form.title" placeholder="请输入活动名称"></el-input>
            </el-form-item>

            <el-form-item label="活动时间" >
                <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getTime"
                >
                </el-date-picker>
            </el-form-item>

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
                <el-select v-model="form.second_cateid" @change="specsChange">
                    <el-option 
                        v-for="cateItem2 of cateArr2" :key="cateItem2.id" 
                        :value="cateItem2.id" :label="cateItem2.catename"
                        
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            

            <el-form-item label="商品" prop="goodsid">
                <el-select v-model="form.goodsid">
                    <el-option 
                    v-for="specsItem of specsArr2" :key="specsItem.id" 
                    :value="specsItem.id" :label="specsItem.goodsname"
                    
                    >
                </el-option>
                </el-select>
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
            value1:[],
            cateArr:[],
            cateArr2:[],
            specsArr:[],
            specsArr2:[],
            form:{
                title:"",
                begintime:"",
                endtime:"",
                first_cateid:"",
                second_cateid:"",
                goodsid:"",
                status:1

            },
            rules:{
                first_cateid:[
                    { required:true,message:'请选择一级分类',trigger:'change'}
                ],
                second_cateid:[
                    { required:true,message:'请选择二级分类',trigger:'change'}
                ],
                goodsid:[
                    { required:true,message:'请选择商品规格',trigger:'change'}
                ],
                title:[
                    { required:true,message:"请填写活动名称",trigger:'blur'},
                    { min :2 , max : 20 , message : "名称长度在2到20个字符",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        getTime(tArr){
            // console.log(tArr);
            this.form.begintime = tArr[0].getTime().toString();
            this.form.endtime = tArr[1].getTime().toString();
        },
        getCate(pid=0){
            this.$http.get("/api/catelist",{pid}).then(res=>{
                if(pid == 0){
                   this.cateArr = res.data.list 
                }else{
                    this.cateArr2 = res.data.list
                }
                
            })
        },
        cateChange(n){
            // console.log(n)  打印的就是他的id
            this.form.second_cateid = "";
            this.form.goodsid = "";
            this.getCate(n);
            this.form.first_cateid = n;

        },
        specsChange(n){
            // console.log(n);
            if(this.$route.params.id){
                this.form.goodsid = "";
            }
            this.form.second_cateid = n;
            this.$http.get('/api/goodslist',{fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
                
                this.specsArr2 = res.data.list
                console.log(res.data.list)
            })
        },
        
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                   
                    //判断当前操作是添加还是修改
                    var url = '/api/seckadd'
                    
                    if(this.$route.params.id){
                        url = "/api/seckedit"
                        this.form.id =Number(this.$route.params.id) 
                    }
                   
                    //调用接口实现数据的添加工作
                    //提交时提交生成的那个表单即可
                    this.$http.post(url,this.form).then(result=>{
                         console.log(this.form, url)
                            if(result.data.code!=200){
                                alert(result.data.msg)
                            }else{
                                this.$router.push("/seckill")
                            }
                    })
                }
            })
        }
    },
    mounted(){
        if(this.$route.params.id){
            this.$http.get("/api/seckinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list
                this.value1=[new Date(Number(res.data.list.begintime)),new Date(Number(res.data.list.endtime))]
                // console.log(this.form,1111111111);
                
                this.$http.get("/api/catelist",{pid:this.form.first_cateid}).then(res=>{
                    this.cateArr2 = res.data.list
                })

                this.$http.get('/api/goodslist',{fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
                    this.specsArr2 = res.data.list
                    // console.log(this.specsArr2,23232323)
                })
                
            })
            
            // console.log(this.form,1111111)
            // this.$http.get('/api/goodslist',{fid:this.form.first_cateid,sid:this.form.second_cateid}).then(res=>{
            //     this.specsArr2 = res.data.list
            //     // console.log(res.data.list)
            // })
            
        }
       this.getCate();
    }
}
</script>

<style scoped lang="stylus">
    .el-form
        width 500px
</style>