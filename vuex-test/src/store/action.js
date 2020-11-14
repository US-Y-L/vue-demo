export default{
    changeAge(context) {
      //context参数是默认的，里面包含的是此时的上下文，通过它的commit方法去调用mutations中的函数去修改state中的数据
      setTimeout(function(){
        //提交mutations来实现state的变化
        context.commit("addnum")
      },2000)
    },
    yibujia(context,n) {
      console.log(context);
      if(context.state.cnum % 2 == 0){
        setTimeout(function(n){
          context.commit("addcnum",n)
        },1000)
      }
    }
}