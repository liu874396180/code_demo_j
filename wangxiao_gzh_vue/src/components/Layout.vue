<template>
  <div>
    <Loading v-show="axiosLoading"></Loading>
    <transition name="fadeIn">
      <router-view/>
    </transition>
    <mu-tabs :value.sync="activeTabs"  color="#ffffff" indicator-color="#ffffff" @change="change" :full-width="true" class="layout">
      <mu-tab @click="isshishi">
      <mu-icon value="home"></mu-icon>
        首页
      </mu-tab>
      <!-- <mu-tab to="/security">
      <mu-icon value="security"></mu-icon>
        保障
      </mu-tab>
      <mu-tab to="/bigTell">
        <mu-icon value="airplay"></mu-icon>
        大讲堂
      </mu-tab> -->
      <!-- <mu-tab> -->
      <mu-tab @click="isLogin">
      <mu-icon value="person_outline"></mu-icon>
        我的
      </mu-tab>
    </mu-tabs>
  </div>
</template>
<script>
import { mapGetters, mapState,mapActions, mapMutations} from 'vuex';
import Loading from './loading';
export default {
  components: {
    Loading
  },
  data() {
    return{
      // active3: 0
    }
  },
  beforeCreate() {
      //、触发显示加载。。。 true
      // this.$store.dispatch('axiosLoadings', true);
  },
  created(){
    // 两秒后 隐藏加载。。。 false
    // setTimeout(()=>{
    //   this.$store.dispatch('axiosLoadings', false);
    // },1500)
  },
  methods:{
    ...mapActions(["changActiveTabs"]),
    change(value) {
      this.changActiveTabs(value);
    },
    toBaoZhang() {
      window.sessionStorage.loading = "xiaoping";
        var that = this;
        this.api.post(
          that.GLOBAL.host + '/ours/essentialInformation', {}
        ).then(function (response) {
          window.sessionStorage.loading = "";
          if (response.result) {
           if(response.data.mobile){
              window.location.href = `https://emarking-wap.vip-jb.com/baoxian/static/anBang/index_fw.html?userNickname=${response.data.mobile}&userPassword=${response.data.mobile}`
            }else{
              this.$router.push("/login")
            }
          } else {}
        })
    },
    isLogin() {
      window.sessionStorage.loading = "xiaoping";
        var that = this;
        this.api.post(
          that.GLOBAL.host + '/login/checkUserLoginState', {}
        ).then(function (response) {
          window.sessionStorage.loading = "";
          if (response.result) {
            that.$router.push("/my/myIndex")
          } else {
            that.$router.push("/commonwxlogin")
          }
        })
    },
    isshishi() {
      this.$router.push("/index")
    }
  },
  computed:{
    ...mapGetters(['axiosLoading']),
    ...mapState({
      activeTabs:state=>state.global.activeTabs,
    }),
  }
}
</script>
<style scoped>
  .mr20{
    margin-right:20px;
  }
/* 底部tabBar */
.mu-tabs{
  color: #999999;
  font-size: 0.22rem;
  height: 1rem;
  box-shadow: 0px 2px 8px 0px;
}
.mu-tab-active{
  color: #fd5962;
}
/* icon距离下部字体 */
.mu-tab .mu-icon{
  margin-bottom: 0;
}
.material-icons{
  font-size: 0.48rem;
}
</style>