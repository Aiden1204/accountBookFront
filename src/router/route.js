import Vue from 'vue'
import Router from 'vue-router'

// 引入路由的配置文件
import accountIndex from '@/router/accountIndex.js'

Vue.use(Router)


// 将路由的配置文件连接成一个数组
let routerArr = [];
routerArr = routerArr.concat(accountIndex);

export default new Router({
  routes: routerArr
})
