import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../components/Layout';
import saoma from '../components/saoma';

Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)

export const constantRouterMap = [
  {path: '/', redirect:'/wxmenu/index'},
  {path: '/login', component: _import('login/login'), hidden: true},  
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/index',
    component: Layout,
    redirect:'/index/home',
    name: '首页',
    children: [
      { path: 'home', component: _import('index/home') },
    ]
  },
  {
    path: '/my',
    component: Layout,
    redirect:'/my/myIndex',
    name: '我的',
    children: [
      { path: 'myIndex', component: _import('my/myIndex') },                     // 我的主页
    ]
  },
  {
    path: '/bigTell',
    component: Layout,
    redirect:'/bigTell/tell',
    name: '大讲堂',
    children: [
      { path: 'tell', component: _import('bigTell/tell') },
    ]
  },
  {
    path: '/security',
    component: Layout,
    redirect:'/security/serverStatic',
    name: '服务',
    children: [
      { path: 'serverStatic', component: _import('security/serverStatic') },
    ]
  },
  {
    path: '/infoList',
    component:  _import('index/infoList'),
    name: '资讯列表',
  },
  {
    path: '/infoDetail',
    component:  _import('index/infoDetail'),
    name: '资讯详情',
  },
  {
    path: '/productDetail',
    component:  _import('index/productDetail'),
    name: '产品详情',
  },
  {
    path: '/touBaoXuZhi',
    component:  _import('index/touBaoXuZhi'),
    name: '投保须知',
  },
  {
    path: '/payResult',
    component:  _import('index/payResult'),
    name: '支付结果',
  },
  {
    path: '/insurPolicy',
    component:  _import('index/insurPolicy'),
    name: '填写保单',
  },
  {
    path: '/policyChange',
    component:  _import('index/policyChange'),
    name: '保单修改',
  },
  {
    path: '/orCode',
    component:  _import('my/orCode'),
    name: '个人店铺二维码',
  },
  {
    path: '/saoma',
    component:  saoma,
    name: '关注公众号二维码',
  },
  {
    path: '/wxlogin',
    component:  _import('login/wxlogin'),
    name: 'weixinlogin',
  },
  {
    path: '/commonwxlogin',
    component:  _import('login/commonwxlogin'),
    name: 'commonwxlogin',
  },
  {
    path: '/wxmenu',
    name: '微信获取',
    component: Layout,
    children: [
      { path: 'index', component: _import('wxmenu/index') }
    ]
  },
  { path: '/recommended', component: _import('my/recommended') },            // 我的推荐（我的团队）
  { path: '/recommendedOrder', component: _import('my/recommendedOrder') },  // 我的推荐人的保单详情（我的团队）
  { path: '/basicInformation', component: _import('my/basicInformation') },  // 我的基本信息
  { path: '/myStores', component: _import('my/myStores') },                  // 我的个人店铺
  { path: '/help', component: _import('my/help') },                          // 我的帮助与反馈
  { path: '/feedback', component: _import('my/feedback') },                  // 我的反馈
  { path: '/order', component: _import('my/order') },                        // 我的订单
  { path: '/orderDetail', component: _import('my/orderDetail') },            //订单详情
  { path: '/certification', component: _import('my/certification') },        //代理人认证
  { path: '/setUp', component: _import('my/setUp') },        //代理人认证
  { path: '/agentResults', component: _import('my/agentResults') },        //代理人业绩
  { path: '/agentResultsDetail', component: _import('my/agentResultsDetail') },        //代理人业绩明细
  { path: '/volition', component: _import('index/volition') },            // 我的推荐（我的团队）
  { path: '/xuzhiPdf', component: _import('index/xuzhiPdf') },            //投保须知iframe
]

export default new Router({
  //  mode: 'history',
  routes: constantRouterMap
})