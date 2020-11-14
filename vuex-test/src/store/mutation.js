export default{
    //只有mutations能修改state中的数据，但是mutations中不能进行异步操作
    //需要进行异步操作时就要用到actions,在actions中调用mutations 对于同样的操作actions和mutations中的函数名不要重名
      addnum(sta,n=3){
        sta.age+=n;
        console.log(sta);
      },
      addshop(sta){
        sta.num++
      },
      addcnum(sta,n=1){
        sta.cnum+=n;
      },
      setUser(sta,info){
          sta.infoArr.push(info);
      }
  }