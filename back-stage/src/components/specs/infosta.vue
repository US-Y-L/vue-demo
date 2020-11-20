<template>
    <div>
        <!-- <h1 v-if="!$route.params.id">商品规格添加页面</h1>
        <h1 v-else>商品规格修改页面</h1> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path : '/specs'}">商品规格管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="!$route.params.id">商品规格添加</el-breadcrumb-item>
            <el-breadcrumb-item v-else>商品规格修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form
            ref="specsform" :model="form" label-width="120px"
            :rules="rules"
        >
            <el-form-item label="商品规格名称" prop="specsname"
                
            >
                <el-input placeholder="请输入商品规格名称" v-model="form.specsname"></el-input>
            </el-form-item>
            <el-form-item 
                label="商品规格属性" 
                v-for="(item,index) of form.specsAttrs" :key="index" 
            >
                <el-input placeholder="请填写商品规格属性" @input='inp' v-model="item.value"></el-input>
                <el-button type="primary" @click="addOpt" v-if="index == 0">增加</el-button>
                <el-button type="danger" @click="deleOpt(index)" v-else>删除</el-button>
            </el-form-item>
            

            <el-form-item label="状态">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" >启用</el-radio>
                    <el-radio :label="2" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('specsform')">提交</el-button>
                <el-button>取消</el-button>
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
                specsname:"",
                specsAttrs:[{value:''}],
                status:1,
                
            },
            rules:{
                specsname:[
                    {  required:true,message:'请填写商品规格名称',trigger:'blur'},
                    { min :2 , max : 20 , message : '名称长度在2到20个字符',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        inp(){
            this.$forceUpdate();
        },
        addOpt(){
            this.$forceUpdate();
            if(this.form.specsAttrs.length < 5){
                this.form.specsAttrs.push({value:''})
            }else{
                this.$message("最多只能添加5个属性")
            }
            
        },
        deleOpt(n){
            this.$forceUpdate();
            this.form.specsAttrs.splice(n,1)
        },
        submitForm(name){
            this.$refs[name].validate(valid => {
                if(valid){
                    // console.log(this.specsAttrs);
                    

                    let str = "";
                    this.form.specsAttrs.map(item=>{
                        str += item['value'] + ","
                    })
                    str = str.substring(0,str.length-1);

                    if(str.length <= 0){
                        this.$message("请填写属性内容")
                        return
                    }
                    delete this.form.specsAttrs;
                    this.form.attrs = str;

                    // let arr = [];
                    // let data = JSON.parse(JSON.stringify(this.form));
                    // data.specsAttrs.map(item=>{
                    //     arr.push(item.value)
                    // })
                    // data.attrs = arr.join(",");


                    
                    //判断当前操作是添加还是修改
                    var url = '/api/specsadd'
                    if(this.$route.params.id){
                        url = "/api/specsedit"
                        this.form.id = this.$route.params.id
                    }
                    this.$http.post(url,this.form).then(result=>{
                            if(result.data.code!=200){
                                alert(result.data.msg)
                            }else{
                                this.$router.push("/specs")
                            }
                    })
                }
            })
        }
    },
    mounted(){
        // console.log(this.$route.params.id)
        // console.log(this.$route);
        if(this.$route.params.id){
            this.$http.get("/api/specsinfo",{id:this.$route.params.id}).then(res=>{
                this.form = res.data.list[0]
                console.log(this.form);
                
                this.form.specsAttrs=[{ value: '' }];
                    this.form.attrs.map((item,i)=>{
                        if(i==0){
                        this.form.specsAttrs[0].value=item
                        
                    }else{
                        this.form.specsAttrs.push({value:item})
                    }

                })
                delete this.form.attrs;
                console.log(this.form)
                
                
            })
        }
        this.$http.get("/api/specslist",{pid:0}).then(res=>{
            this.menuArr = res.data.list
        })
    }
}
</script>

<style scoped lang="stylus">

    .el-form
        width 600px
        .el-input
            width 60%
</style>