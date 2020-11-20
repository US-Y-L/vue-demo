<template>
    <div class="pages">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/specs' }">商品规格管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品规格{{tip}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="150px" >
            <el-form-item  label="规格名称：" prop="specsname">
                <el-input  v-model="ruleForm.specsname" placeholder="请输入商品规格名称"></el-input>
            </el-form-item>



            <el-form-item  :label="index==0?'规格属性：':'规格属性' +(index)+'：'" v-for="(item,index) of ruleForm.attrs" :key="item.index"
            :prop="`attrs[${index}].value`"
            :rules="{
                    required: true, message: '规格属性不能为空', trigger: 'blur'
                }">

            
                <el-input v-model="item.value"  class="add" ></el-input>
                <el-button  @click="addDomain" v-if="index==0" type="primary">新增规格属性</el-button>
                <el-button  @click.prevent="removeDomain(item)" v-else type="danger">删除</el-button>
           </el-form-item>

            

            <el-form-item label="状态:" prop="status">
                    <el-switch
                        v-model="ruleForm.status"
                        :active-value="1" :inactive-value="2"
                        :width="60">
                    </el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
                <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item> 
        </el-form>
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data() {
        return {
            tip:"添加",
            ruleForm:{
                specsname:'',
                attrs:[{value: ''}],
                status:1,
            },
            rules: {
                specsname: [
                    { required: true, message: '请输入商品规格名称', trigger: 'blur' }
                ],
            }
      
    
        };
    },
    mounted(){
        if(this.$route.params.id){
            this.tip="修改";
            this.$http.get('/api/specsinfo',{
                id:this.$route.params.id
            }).then(result=>{

                this.ruleForm=result.data.list[0];


                var arr1=[];
                this.ruleForm.attrs.map((item,i)=>{
                    arr1.push({value:item})
                })
                this.ruleForm.attrs=arr1

                // var arr1=[{ value: '' }];
                // this.ruleForm.attrs.map((item,i)=>{
                //     if(i==0){
                //         arr1[0].value=item
                //         this.ruleForm.attrs=arr1
                //     }else{
                //          this.ruleForm.attrs.push({value:item})
                //     }
                    
                // })
                
            })
        }
    },
    methods:{
        // ipt(){
        //     this.$forceUpdate();
        // },
        addDomain() {
            if(this.ruleForm.attrs.length<5){
                this.ruleForm.attrs.push({value: ''}); 
            }else{
                this.$message({
                    type: 'info',
                    message: '最多添加五个规格属性'
                });
            }
        },
        removeDomain(item) {
            var index = this.ruleForm.attrs.indexOf(item)
            // if (index !== 0) {
            this.ruleForm.attrs.splice(index, 1)
            // }
        },
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
            if (valid) {
                var arr=[];
                let data = JSON.parse(JSON.stringify(this.ruleForm))
                data.attrs.map(item=>{
                    arr.push(item.value)
                })

                data.attrs=arr.join(',')

                var url="/api/specsadd";
                //如果是修改的话
                if(this.$route.params.id){
                    url="/api/specsedit"
                    data.id=this.$route.params.id
                }

                this.$http.post(url,data).then(result=>{
                    //   console.log(result);
                    if(result.data.code==200){
                        this.$router.push('/specs')
                    }else{
                        alert(result.data.msg)
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
      
    //    submitForm(ruleForm) {
    //     this.$refs[ruleForm].validate((valid) => {
    //       if (valid) {
    //           var arr=[];
    //           this.ruleForm.attrs.map(item=>{
    //               arr.push(item.value)
    //           })
    //           this.ruleForm.attrs=arr.join(',')
    //         //   this.ruleForm.delete.domains;
    //           console.log(this.ruleForm);
    //           var url="/api/specsadd";
    //           //如果是修改的话
    //           if(this.$route.params.id){
    //               url="/api/specsedit"
    //               this.ruleForm.id=this.$route.params.id
    //           }
    //           this.$http.post(url,this.ruleForm).then(result=>{
    //             //   console.log(result);
    //               if(result.data.code==200){
    //                   this.$router.push('/specs')
    //               }else{
    //                   alert(result.data.msg)
    //               }
    //           })
    //       } else {
    //         console.log('error submit!!');
    //         return false;
    //       }
    //     });
    //   },
    },
    
};
</script>

<style lang="stylus" >

.pages
    width 44.5%
    font-size 18px 
.el-switch__core
    height 30px
    width 80px
    border-radius 20px
    &::after
        width 25px
        height 25px
.el-switch.is-checked .el-switch__core::after {
    left: 100%;
    margin-left: -25px;
}
.add{
    width:300px;
}
</style>
