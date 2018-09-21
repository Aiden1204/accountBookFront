import axios from 'axios'
import _this from '../main.js'



axios.defaults.crossDomain = true;
axios.defaults.withCredentials  = true;

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
    _this.$alert.on(response.data.errMessage);
  }
  console.log(response);
  return response;
}, function (error) {
  // 对响应错误做点什么
  _this.$alert.on("网络通讯异常，请稍后再试");
  return Promise.reject(error);
});

export default axios;
