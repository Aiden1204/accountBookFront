import axios from 'axios'  //ajax请求

import App from '@/App.vue'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.returnCode === '999999'){
    // App.$emit('_alert',response.data.errMessage);
    App.methods._alert(response.data.errMessage);
  }
  console.log(response);
  console.log(App);
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;
