import Vue from 'vue'
import Router from 'vue-router'
// const originalPush = Router.prototype.push
//    Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }
// import HelloWorld from '@/components/HelloWorld'
import parent from "@/components/parent"
import box from "@/components/box"
import count from "@/components/count"

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'parent',
      component: parent
    },
    {path:"/box" , component:()=> import("../components/box") ,name:"box",
        children:[{path :"student" , component: ()=>import("../components/student"), name : "student"},
                  {path:"course" , component: ()=>import("../components/course") , name : "course"},
                  {path:"student/info" , component: ()=>import("../components/studentinfo"), name: "studentinfo"}
        ]
    },
    {path:"/blogin", component: ()=>import("../components/blogin") , name:"blogin"},
    {path:"/count",component:count},
    {
      path:"*",
      redirect:'/box'
    }
  ]
})

//全局路由守卫 ，首先判断是否登录，已经登录才能进入想进入的网页，否则跳转到登录界面
router.beforeEach((to,from,next)=>{
    if(to.fullPath === '/blogin'){
        next();
    }else{
        var info = localStorage.getItem('userinfo');
        if(info === null){
          next("blogin")
        }else{
          next();
        }
    }
})

export default router
