import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import d3test from '@/components/d3test/dddd3_2.vue'
import d3test3 from '@/components/d3test/ddd4'
import mainvue from '@/components/main'
import login from '@/views/login/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'mainvue',
      component: mainvue
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
