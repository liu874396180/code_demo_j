<template>
  <div class="login-body LeveltwoBox">
    <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error">
      {{dialog.toastContent}}
    </mu-snackbar>
    <div class="login-container">
      <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
        <p class="logo">
          <img src="/static/images/headLogo.png" alt="">
        </p>
        <p class="logo-txt">登录</p>
        <el-form-item prop="mobile">
          <mu-text-field v-model="loginForm.mobile" placeholder="请输入手机号码" name="mobile" v-validate="'required|phone'" :errorText="errors.first('mobile')"
            prop="mobile" full-width color="#fd5962"></mu-text-field>
        </el-form-item>
        <el-form-item prop="validateCode" class="code-box">
          <mu-text-field v-model="loginForm.validateCode" placeholder="请输入验证码" name="validateCode" v-validate="'required'" :errorText="errors.first('validateCode')"
            full-width color="#fd5962">
          </mu-text-field>
          <mu-button flat color="#fd5962" class="code-btn" @click="getCode()" v-show="!sendMsgDisabled">获取验证码</mu-button>
          <mu-button flat color="#fd5962" class="code-btn" v-show="sendMsgDisabled">{{time}}s后获取</mu-button>
        </el-form-item>
        <el-form-item>
          <mu-button full-width round :loading="loading" @click.native.prevent="handleLogin" class="full-width-btn">立即登录</mu-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/index/home" tag="p" class="goToBuyText">
            <mu-button full-width round class="full-width-btn">返回首页</mu-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
  export default {
    name: 'login',
    data() {
      return {
        toSwitch: false,
        checked: true,
        loginForm: {
          mobile: '',
          validateCode: '', // 验证码
        },
        dialog: {
          toastTimer: null,
          toast: false,
          position: 'top',
        },
        loading: false,
        sendMsgDisabled: false,
        time: 60,
      }
    },
    created() {
      this.$nextTick(()=>{
            document.title = '登录';
        })
      
    },
    methods: {
      getCode() {
        let that = this;
        window.sessionStorage.loading = "不显示";
        this.$validator.validate('mobile').then((result) => {
          if (result) {
            this.api.post(
              this.GLOBAL.host + '/login/sendValidateSms', {
                receiver: that.loginForm.mobile
              }
            ).then(function (response) {
              if (response.result) {
                window.sessionStorage.loading = "";
                that.sendMsgDisabled = true;
                let interval = window.setInterval(function () {
                  if ((that.time--) <= 0) {
                    that.time = 60;
                    that.sendMsgDisabled = false;
                    window.clearInterval(interval);
                  }
                }, 1000);
              }
            })
          }
        })
      },
      handleLogin() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(data => {
              this.loading = false;
              sessionStorage.setItem('openid', data.data.openid); // openid
              if (true === data.result) {
               //that.$router.push({path:"/my/myIndex"})
                window.localStorage.mobile = data.data.mobile;
                let local = "https://emarking-wap.vip-jb.com/#/" + "wxlogin";
                 
                const AppId = "wx49892953e61ab647";
               // alert(local);
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect` 
                // this.$router.push({path: '/wxlogin',query:{mobile:data.data.mobile}})
                // 从古车险
                // if (window.sessionStorage.formWxQuery != null && window.sessionStorage.formWxQuery != '') {
                //   this.$router.push({
                //     path: window.sessionStorage.formWxQuery || '/'
                //   })
                //   window.sessionStorage.formWxQuery = null;
                // } else {
                //   this.$router.push({
                //     path: window.sessionStorage.formQuery || '/'
                //   })
                // }
              } else {
                this.$message.error(data.msg);
              }
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      getUrlParam(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
        if (r != null) {
            return unescape(r[2]);  //返回参数值 
        } else {
            return null; 
        }
      },
      getOpenId(code) {
        alert(code)
      },
      registered() {
        let that = this;
        this.$validator.validateAll().then((result) => {
          if (result) {
            let P = new Promise((resolve, reject) => {
              that.api.post(
                that.GLOBAL.host + '/login/register',
                that.loginForm
              ).then(function(response) {
                  if(response.result){
                  }            
              })
            }).catch((e) => {
              // this.loading = false
              console.log(e)
            })
          } else {
            return false
          }
        })
      },
      //气泡提示
      openToast(content, func) {
        this.dialog.toast = true;
        this.dialog.toastContent = content;
        if (this.dialog.toastTimer) {
          clearTimeout(this.dialog.toastTimer)
        }
        this.dialog.toastTimer = setTimeout(() => {
          this.dialog.toast = false;
        }, 1000);
      },
    }
  }

</script>
<style lang="less" scoped>
  .login-container {
    padding-top: 1rem;
    .logo {
      text-align: center;
      img {
        width: 1.7rem;
      }
    }
    .logo-txt {
      font-size: 0.54rem;
      text-align: center;
      margin: 0.95rem 0 0.77rem;
    }
    .el-form-item {
      width: 6.1rem;
      margin: 0 auto;
    }
    .full-width-btn {
      width: 6.1rem;
      height: 0.88rem;
      text-align: center;
      background: #fd5962;
      line-height: 0.88rem;
      color: #ffffff;
      font-size: 0.36rem;
      border-radius: 4px;
    }
    .code-box {
      position: relative;
      .code-btn {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .goToBuyText{
        margin-top: 30px;
        font-size: 0.26rem;
        text-align: right;
    }
  }

</style>
