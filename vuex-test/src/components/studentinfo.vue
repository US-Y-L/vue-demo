<template>
    <div class="container">
        <h1>学生信息添加界面</h1>
        <form action="" class="form-horizontal form">
                <div class="form-group">
                    <label class="col-md-1">姓名：</label>
                    <div class="col-md-8">
                        <input class="form-control" type="text" v-model="info.name" placeholder="请输入姓名">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-1">电话</label>
                    <div class="col-md-8">
                        <input class="form-control" type="text" v-model="info.phone" placeholder="请输入电话号">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-1">状态：</label>
                    <div class="col-md-8">
                        <input type="radio" v-model="info.status" value="1">在籍
                        <input type="radio" v-model="info.status" value="2">毕业
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4"></label>
                    <div class="col-md-8">
                        <button class="btn btn-primary btn-lg" type="button" @click="submit">提交</button>
                    </div>
                </div>
            </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{
                name:"",
                phone:"",
                status:"1"
            }
        }
    },
    methods:{
        submit(){
            this.$store.commit("setUser",this.info);
            this.$router.push("/box/student")

        }
    }
}
</script>

<style scoped lang="stylus">
    
</style>