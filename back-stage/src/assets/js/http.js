import axios from 'axios'
import store from '../../store'
//直接增加一个配置选项
// axios.defaults.headers.common['Authorization'] = store.state.userinfo.token;

//自行封装方法，这样自定义性更强
function get(url,params={}){
    return new Promise((reslove,reject)=>{
        axios({
            url,
            params,
            headers:{ Authorization:store.state.userinfo.token }
        }).then(res=>{
            reslove(res);
        }).catch(err=>{
            reject(err)
        })
    })
}
function post(url,data){
    return new Promise((reslove,reject)=>{
        axios({
            url,
            data,
            method:'post',
            headers:{ Authorization:store.state.userinfo.token }
        }).then(res=>{
            reslove(res);
        }).catch(err=>{
            reject(err)
        })
    })
}
export default {get,post}