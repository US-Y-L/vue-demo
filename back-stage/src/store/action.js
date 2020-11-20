import axios from 'axios'

export default{
    doLoginSync(context,data){
        return new Promise((reslove , reject) =>{
            axios.post('/api/userlogin',data).then(res=>{
                if(res.data.code == 200){
                    context.commit("setUserInfo",res.data.list)
                }
                reslove(res)
            }).catch(err =>{
                reject(err)
            })
        })
        
    }
}