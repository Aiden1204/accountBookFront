// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由注入
import router from './router/route.js'

import md5 from 'js-md5';  //md5加密
Vue.prototype.$md5 = md5;

import cAxios from './fun/cAxios'  //二次封装axios
Vue.prototype.$cAxios = cAxios;




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
