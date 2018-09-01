import Vue from 'vue'
import Router from 'vue-router'

// 引入路由的配置文件
import accountIndex from '@/router/accountIndex.js'
import mainPageIndex from '@/router/mainPageIndex.js'

Vue.use(Router)

// 首页重定向
let index = [
  {
    path: '/',
    redirect:'/account/login'
  }
];


// 将路由的配置文件连接成一个数组，新增路由配置文件时需要修改
let routerArr = [];
routerArr = routerArr.concat(index,accountIndex,mainPageIndex);

export default new Router({
  routes: routerArr
})
