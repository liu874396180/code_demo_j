import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import my from '@/components/my'
import checks from '@/components/checks'
import erweima from '@/components/erweima'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/checks',
      name: 'checkbox',
      component: checks
    },
    {
      path: '/erweima',
      name: 'erweima',
      component: erweima
    }
  ]
})
