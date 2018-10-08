
import Vue from 'vue'
import Router from 'vue-router'
/*
  路由
 */
import MainA from '@/components/MainA'
import MainB from '@/components/MainB'
import MainC from '@/components/MainC'
import MainD from '@/components/MainD'

import MainA1 from '@/components/MainA1'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/a',
      name: 'MainA',
      component: MainA,
      children: [
        {
          path: ':id',
          name: 'MainA1',
          component: MainA1
        }
      ]
    },
    {
      path: '/b',
      name: 'MainB',
      component: MainB
    },
    {
      path: '/c',
      name: 'MainC',
      component: MainC
    },
    {
      path: '/d',
      name: 'MainD',
      component: MainD
    },
    {
      path: '*',
      component: () => import('../page/404')
    }
  ]
})
