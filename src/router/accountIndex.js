import login from '@/page/account/login'
import register from '@/page/account/register'

let accountIndex = [
  {
    // 注册页面
    path: '/account/register',
    name: 'accountRegister',
    component: register
  },
  {
  // 登录页面
  path: '/account/login',
  name: 'accountLogin',
  component: login
  }
];

export default accountIndex
