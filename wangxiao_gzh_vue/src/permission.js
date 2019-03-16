import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken} from '@/utils/auth' // 验权
const whiteList = ['/login',             //登录
                   '/404',             //404
                   '/index/home',   //首页
                   '/public/saoma',            //扫码
                   '/login/violationNotice',   //用户须知
                   '/wxmenu/index',            //微信index
                  ] //白名单,不需要登录的路由
router.beforeEach((to, from, next) => {
  window.sessionStorage.formQuery = from.path; //记录路由，登录后从哪来让他到哪去
  NProgress.start()
  next()
  // if(to.path !== '/login/violationNotice' && from.path !== '/login/violationNotice'){
  //   window.sessionStorage.formQuery = from.path; //记录路由，登录后从哪来让他到哪去
  // }
  // NProgress.start()
  // if (getToken()) {
  //   //如果已经登录
  //   if (to.path === '/login') {
  //     //next({path: '/'})
  //      next()
  //     NProgress.done() // 结束Progress
  //   } else {
  //     next()
  //   }
  // } else if (whiteList.indexOf(to.path) !== -1) {
  //   //如果前往的路径是白名单内的,就可以直接前往
  //   next()
  // } else {
  //   //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
  //   //(只要进我的就需要登录)
  //   if(to.path === '/my/myIndex'){
  //     next('/login')
  //   }else{
  //     next()
  //   }
     
  //   //next() // lpd 暂时不登陸
  //   NProgress.done() // 结束Progress
  // }

})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})