import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken,removeToken} from '@/utils/auth'
import store from '../store'
import router from '../router'
import global from '../components/global'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 15000,                  // 请求超时时间2
  withCredentials: true
})
// request拦截器
service.interceptors.request.use(config => {
  //  if(!window.sessionStorage.loading){
  //   store.dispatch('axiosLoadings', true);
  //  }  不要加载小猴子了
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == '0000' || res.code == 'wxlogin001') {
      if(!window.sessionStorage.huanmin){
        store.dispatch('axiosLoadings', false); // loading
      }
      return res;
    }
    if (res.code == 'wx0002' || res.code == 'wx0003') {
      if(!window.sessionStorage.huanmin){
        store.dispatch('axiosLoadings', false); // loading
      }
      //关注二维码
      router.push('/saoma')
      return Promise.reject("关注二维码")
    }
    if(res.code == "loginState01"){
      store.dispatch('axiosLoadings', false); // loading
      window.localStorage.wxLoginUrl = global.shareRoot + "#/my/myIndex";
      let local = global.shareRoot + "#/commonwxlogin"; 
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${global.AppId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`

    } else if (res.code == "10010" || res.code == "h5000" || res.code == "wx0000") {
      removeToken()
      //router.replace('/login'); //lpd ：进入【我的】页面，未登录 跳转登录页，我的页面不会出现router.push('/login');
      store.dispatch('axiosLoadings', false); // loading
      window.localStorage.wxLoginUrl = window.location.href;
      let local = global.shareRoot + "#/commonwxlogin";  
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${global.AppId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`


      // Message({
      //   showClose: true,
      //   message: res.msg,
      //   type: 'error',
      //   duration: 500,
      //   onClose: () => {
      //     store.dispatch('FedLogOut').then(() => {
      //       //location.reload()// 为了重新实例化vue-router对象 避免bug
      //       //location.href="/login";
      //       router.push('/login')
      //     })
      //   }
      // });
      return Promise.reject("未登录")
    } else {
      store.dispatch('axiosLoadings', false); // loading
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.error('err' + error)// for debug
    store.dispatch('axiosLoadings', false); // loading
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service

