// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from "axios"
import axios from "./assets/js/http"
console.log(axios,123123123);
console.log(axios,123123123);
console.log(axios,123123123);
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.use(ElementUi)

import store from "./store"


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h=>h(App),
  store

})
