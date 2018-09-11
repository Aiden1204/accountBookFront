import wallet from '@/page/mainPage/wallet'
import chart from '@/page/mainPage/chart'
import me from '@/page/mainPage/me'
import timebook from '@/page/mainPage/timebook'

let mainPageIndex = [
  {
    // 钱包
    path: '/mainPage/wallet',
    name: 'wallet',
    component: wallet
  },
  {
    // 图表
    path: '/mainPage/chart',
    name: 'chart',
    component: chart
  },
  {
    // 我的
    path: '/mainPage/me',
    name: 'me',
    component: me
  },
  {
    // 时间簿
    path: '/mainPage/timebook',
    name: 'timebook',
    component: timebook
  }
];

export default mainPageIndex
