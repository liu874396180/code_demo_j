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
        wxLoginUrl: window.localStorage.wxLoginUrl,
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
      this.getOpenId(code);
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
      getOpenId(code) {
        let that = this;
        this.api.post(
        this.GLOBAL.host + '/login/getCode',{code:code} 
        ).then(function (response) {
            if (response.result) {
                // that.$router.push({path: that.wxLoginUrl})
                window.location.href = that.wxLoginUrl;
            }else{
                that.$router.push({path: '/login'})
            }
        })
      },
    }
}
</script>

