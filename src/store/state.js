export default {
  // 用户未登录的错误码
  errorCode: '',
  // token
  token: '123',
  menuList: [
    {
      id: 1,
      name: '主页',
      router: '/index',
      calss: 'el-icon-setting'
    },
    {
      id: 2,
      name: '测试页面',
      router: '/index/main',
      calss: 'el-icon-menu'
    }, {
      id: 3,
      name: '测试页面2',
      router: '/index/modal1',
      calss: 'el-icon-menu'
    }, {
      id: 4,
      name: '父页面1',
      router: '/index/modal2',
      calss: 'el-icon-menu'
    }, {
      id: 5,
      name: '父页面1的子页面',
      router: '/index/modal2_1',
      calss: 'el-icon-menu',
      parentId: 4
    }, {
      id: 6,
      name: '管理页面模板',
      router: '/index/regionalNodeList',
      calss: 'el-icon-menu'
    }

  ]
}
