import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import d3test from '@/components/d3test/dddd3_2.vue'
import d3test3 from '@/components/d3test/ddd4'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '/d3test',
      component: d3test
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
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
