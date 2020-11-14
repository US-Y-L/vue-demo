export default{
    namespaced:true,
    state:{
        num:100
    },
    mutations:{
        
        addshop(sta){
            
            sta.num ++;
            console.log(sta)
        }
    },
    getters:{
        newshop:function(sta){
            return sta.num + 10
        }
    }
    
}