'use strict'
// 配置前端ajax请求的ip+端口号
// let sendIP = 'http://localhost:3000';
// let sendIP = 'http://172.20.10.5:3000';  //笔记本本机ip
let sendIP = 'http://192.168.11.226:3000';  //笔记本本机ip
module.exports = {
  register: sendIP + '/users/register',
  login: sendIP + '/users/login',
  submitLog: sendIP + '/users/submitLog',
  queryLog: sendIP + '/users/queryLog'
}
