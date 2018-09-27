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

// 引入Vux日期插件
import { DatetimePlugin } from 'vux'
Vue.use(DatetimePlugin);

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

// 日期格式过滤器
Vue.filter('dateInitial', function (value) {
  value = value.split('-');
  if(value[1].substr(0,1) === '0'){
    value[1] = value[1].substr(1);
  }
  if(value[2].substr(0,1) === '0'){
    value[2] = value[2].substr(1);
  }
  value.splice(1,0,'年');
  value.splice(3,0,'月');
  value.push('日');
  value = value.join('');
  return value;
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
