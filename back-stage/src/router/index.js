import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"


Vue.use(Router)

let router = new Router({
  routes: [
    {path:"/",component:()=>import("../components/layout"),meta:{selected:'/'},
      children:[{path:"menu",component: ()=>import("../components/menu/index"),name:"menu",meta:{selected:'/menu'}},
                {path:"menu/add",component: ()=>import("../components/menu/info"),name:"menuadd",meta:{selected:'/menu'}},
                {path:"menu/:id", component :()=>import("../components/menu/info"),name:"info",meta:{selected:'/menu'}},
                {path:"role",component: ()=>import("../components/role/index"),meta:{selected:"/role"}},
                {path:"role/add",component: ()=> import("../components/role/info"),meta:{selected:"/role"}},
                {path:"role/:id", component: ()=> import("../components/role/info"),meta:{selected:"/role"}},
                {path:"user",component: ()=>import("../components/user/index"),meta:{selected:"/user"}},
                {path:"user/add",component: ()=> import("../components/user/info"),meta:{selected:"/user"}},
                {path:"user/:id", component: ()=> import("../components/user/info"),meta:{selected:"/user"}},   
                {path:"cate",component: ()=>import("../components/category/index"),meta:{selected:"/cate"}},
                {path:"cate/add",component: ()=> import("../components/category/info"),meta:{selected:"/cate"}},
                {path:"cate/:id", component: ()=> import("../components/category/info"),meta:{selected:"/cate"}},
                {path:"specs",component: ()=>import("../components/specs/index"),meta:{selected:"/specs"}},
                {path:"specs/add",component: ()=> import("../components/specs/info"),meta:{selected:"/specs"}},
                {path:"specs/:id", component: ()=> import("../components/specs/info"),meta:{selected:"/specs"}},
                {path:"goods",component: ()=>import("../components/goods/index"),meta:{selected:"/goods"}},
                {path:"goods/add",component: ()=> import("../components/goods/info"),meta:{selected:"/goods"}},
                {path:"goods/:id", component: ()=> import("../components/goods/info"),meta:{selected:"/goods"}},
                {path:"banner",component: ()=>import("../components/banner/index"),meta:{selected:"/banner"}},
                {path:"banner/add",component: ()=> import("../components/banner/info"),meta:{selected:"/banner"}},
                {path:"banner/:id", component: ()=> import("../components/banner/info"),meta:{selected:"/banner"}},
                {path:"seckill",component: ()=>import("../components/seckill/index"),meta:{selected:"/seckill"}},
                {path:"seckill/add",component: ()=> import("../components/seckill/info"),meta:{selected:"/seckill"}},
                {path:"seckill/:id", component: ()=> import("../components/seckill/info"),meta:{selected:"/seckill"}},
                {path:"home",component: ()=> import("../components/home"),meta:{selected:"/home"}},
                {path:"",redirect:'home'}   
              ]
    },
    {path:"/login",component: ()=> import("../components/login"),name:"login"},
    {path:"*",redirect:"/"}
  ]
})


router.beforeEach((to,from,next)=>{
  var info = store.state.userinfo;
  var token = info.token? info.token : "";
  if(token == ""){
      //没有登陆的情况
      if(to.fullPath === '/login'){
        next();
      }else{
        next('/login');
      }
  }else{
    //已登陆的情况
    if(to.fullPath  === '/login'){
        next('/');
    }else{
        //判断当前访问的路由规则是不是在已分配的规则中
        var nowpath = "/"+(to.fullPath).split("/")[1]
        var allowpath = info.menus_url; 
        allowpath.unshift("/");
        allowpath.unshift("/home");
        
        if(allowpath.indexOf(nowpath)>=0){
            next();
        }else{
          alert("无权访问指定网页")
          next("/")
        }
    }

  }
    
})


export default router
