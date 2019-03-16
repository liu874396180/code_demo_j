import {getInfo, login, logout} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'
import global from '../../components/global'
const user = {
  actions: {
    // 登录
    Login({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: global.host + "/login/loginauth",
          method: "post",
          data: loginForm
        }).then(data => {
          if (data.result === true) {
            //cookie中保存前端登录状态
            setToken();
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise((resolve, reject) => {
        api({
          url: global.host + "/login/loginout",
          method: "post",
          data: {}
        }).then(data => {
          if (data.result === true) {
            removeToken()
            resolve()
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default user
