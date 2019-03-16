<template>
  <div>
     
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        //   mobile:this.$route.query.mobile,
        mobile: window.localStorage.mobile
      }
    },
    created() {
      this.$nextTick(()=>{
            // document.title = '登录验证';
        })
      //微信授权登录
      let that = this;
    //   const AppId = "wx49892953e61ab647";
      let code = this.GetRequest();
      let local = window.location.href;
    //   alert(code)
      if(!code){
        this.$router.push({path:"/login"})
      }else{
        this.getOpenId(code,that.mobile);
      }
    //   if(!code){
        // alert("code====="+code+"local===="+local)
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect` 
        // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=http://222.128.9.249:8102/h5/api/login/getCode&response_type=code&scope=snsapi_base&state=1#wechat_redirect` 
    //   }else{
    //     this.getOpenId(code,that.mobile);
    //   }
    },
    watch:{

    },
    methods: {
      GetRequest() {
        var url = "?" + window.location.href.split("?")[1]; //获取url中"?"符后的字串   
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
           var  strs = str.split("&")[0].split("=")[1];
        }
        return strs;
    },
      getOpenId(code,mobile) {
        // alert(code);
        let that = this;
        this.api.post(
        this.GLOBAL.host + '/login/getCode',{code:code,mobile:mobile} 
        ).then(function (response) {
            if (response.result) {
                that.$router.push({path: '/index/home'})
            }else{
                that.$router.push({path: '/login'})
            }
        })
      },
    }
}
</script>

