import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import d3test from '@/components/d3test/dddd3_2.vue'
import d3test3 from '@/components/d3test/ddd4'
import mainvue from '@/views/main'
import index from '@/views/index'
import login from '@/views/login/index'
import modal1 from '@/views/test1/modal1'
import modal2 from '@/views/test2/modal2'
import modal3 from '@/views/test2/modal2_1'
import modal4 from '@/views/test2/modal2_2'
import modal5 from '@/views/test2/modal2_2_1'
import regionalNodeList from '@/views/regionalNode/list'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: 'main',
          name: 'mainvue',
          component: mainvue
        },
        {
          path: 'modal1',
          name: 'modal1',
          component: modal1
        }, {
          path: 'modal2',
          name: 'modal2',
          component: modal2
        }, {
          path: 'modal2_1',
          name: 'modal2_1',
          component: modal3
        }, {
          path: 'modal2_2',
          name: 'modal2_2',
          component: modal4
        }, {
          path: 'modal2_2_1',
          name: 'modal2_2_1',
          component: modal5
        }, {
          path: 'regionalNodeList',
          component: regionalNodeList
        }
      ]
    },
    {
      path: '/1',
      name: '/d3test2',
      component: d3test3
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
/**
 * 全局路由,在进入其他路由地址前,显示加载进度以及title
 */
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

/**
 * 全局路由在进入其他路由后,显示进度完成,页面回到顶部;
 */
router.afterEach(() => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
  // if (!sessionStorage.getItem('user')) {
  //   router.push('/')
  // }
})
export default router
