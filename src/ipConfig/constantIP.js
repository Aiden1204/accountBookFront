'use strict'
// 配置前端ajax请求的ip+端口号
let sendIP = 'http://localhost:3000';
// let sendIP = 'http://172.20.10.3:3000';  //笔记本本机ip
module.exports = {
  register: sendIP + '/users/register',
  login: sendIP + '/users/login'
}
