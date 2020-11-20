import Vue from "vue"
import vuex from "vuex"
import persistedState from 'vuex-persistedstate'
Vue.use(vuex)

import state from "./state"
import mutations from "./mutation"
import getters from "./getter"
import actions from "./action"

let store = new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [persistedState({
        storage:window.sessionStorage
    })]
})

export default store

