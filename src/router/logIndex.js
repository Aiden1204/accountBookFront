import addLog from '@/page/log/addLog'
import addLogRemarks from '@/page/log/addLogRemarks'


let accountIndex = [
  {
    // 添加记录页面
    path: '/log/addLog',
    name: 'addLog',
    component: addLog
  },
  {
    // 添加记录页面备注
    path: '/log/addLogRemarks',
    name: 'addLogRemarks',
    component: addLogRemarks
  }
];

export default accountIndex
