// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由注入
import router from './router/route.js'

//md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//二次封装axios
import cAxios from './fun/cAxios'
Vue.prototype.$cAxios = cAxios;

// 自定义公共waitting层
import _waitting from './components/waittingIndex.js';
Vue.use(_waitting);

// 自定义公共alert框
import localAlert from './components/localAlertIndex.js';
Vue.use(localAlert);

// 定义接口位置
import constantIP from './ipConfig/constantIP.js'
Vue.prototype.$constantIP = constantIP;



Vue.config.productionTip = false

/* eslint-disable no-new */
let myApp = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export default myApp
