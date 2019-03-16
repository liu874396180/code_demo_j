// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import MuseUI from 'muse-ui'
import HappyScroll from 'vue-happy-scroll'
import 'muse-ui/dist/muse-ui.css'  
import theme from 'muse-ui/lib/theme'; //主题
import { Datetime ,PopupHeader ,Popup,Group,Radio  } from 'vux'
Vue.component('datetime', Datetime)
Vue.component('popup-header', PopupHeader)
Vue.component('popup', Popup)
Vue.component('group', Group)
Vue.component('radio', Radio)
Vue.use(MuseUI);
//全局参数
import global_ from './components/global'
Vue.prototype.GLOBAL = global_

import axios from 'axios';
Vue.prototype.$axios = axios;

import * as filters from './assets/js/filter.js'  

Object.keys(filters).forEach(key => {  
  Vue.filter(key, filters[key])  
})

Vue.use(MuseUI)
Vue.config.productionTip = false


import utils from './assets/js/utils.js';
Vue.use(utils);
Vue.prototype.$utils = utils;


import wxsdk from './assets/js/wxsdk.js';
Vue.use(wxsdk);
Vue.prototype.$wxsdk = wxsdk;

import './assets/js/validator.js'

import '@/permission' // 权限
import {default as api} from './utils/api'
// import {hasPermission} from "./utils/hasPermission"; // 朱杰
import * as hasPermission from "./utils/hasPermission";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import store from './store'

Vue.use(ElementUI, {locale})
import './assets/sass/quotestyle.css';
import App from './App'
Vue.prototype.api = api
//全局的常量
// Vue.prototype.hasPerm = hasPermission // 朱杰
Vue.prototype.hasPerm = hasPermission.ConstHasPerm;
Vue.prototype.globalVariable = hasPermission.colorList;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})