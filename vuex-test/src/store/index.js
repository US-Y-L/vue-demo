import Vue from 'vue'
import vuex from "vuex"

Vue.use(vuex);
import persistedState from "vuex-persistedstate"

import state from "./state"
import getters from "./getter"
import mutations from "./mutation"
import actions from "./action"
import shop from "./shop"
let store = new vuex.Store({
  //进行初始化数据
  state,
  getters,
  mutations,
  actions,
  modules:{
      shop
  },
  plugind:[persistedState()]
  
})

export default store;