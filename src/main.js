// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 路由注入
import router from './router/route.js'

// Vuex注入
import store from './store/vuexIndex.js'

//md5加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

//二次封装axios
import cAxios from './fun/cAxios'
Vue.prototype.$cAxios = cAxios;

// 自定义公共waitting层
import _waitting from './plugin/waittingIndex.js';
Vue.use(_waitting);

// 自定义公共alert框
import localAlert from './plugin/localAlertIndex.js';
Vue.use(localAlert);

// 定义接口位置
import constantIP from './ipConfig/constantIP.js'
Vue.prototype.$constantIP = constantIP;



Vue.config.productionTip = false;

// 金钱保留两位
Vue.filter('moneyInitial', function (value) {
  let f = parseFloat(value);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(f*100)/100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
});


/* eslint-disable no-new */
let myApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default myApp
