<template>
  <div class="LeveloneBox">
    <certificationInfo v-if="certiData == null"></certificationInfo>
    <certificationResult v-if="certiData != null" :status="certiData.status"></certificationResult>
  </div>
</template>
<script>
  import certificationInfo from './certificationInfo'
  import certificationResult from './certificationResult'
  export default {
    components: {
      certificationInfo,
      certificationResult,
    },
    data() {
      return {
        activeName: '1',
        checked: false,
        certiData: {},
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = '代理人认证';
        this.getData();
      })
    },
    mounted() {},
     
    watch: {
    '$route' (to, from) {
    this.$router.go(0);
    }
    },

    methods: {
      getData() {
        var that = this;
        this.api.post(
          this.GLOBAL.host + '/agentAuthentication/get', {}
        ).then(function (response) {
          if (response.result) {
            that.certiData = response.data;
          }
        })
      },
    }
  }

</script>
<style lang="less" scoped>


</style>
<style>


</style>
