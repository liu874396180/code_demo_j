<template>
  <div class="moneyResult">
    <vue-q-art :config="config"></vue-q-art>
    <span class="info">{{storeName}}的个人店铺</span>
  </div>
</template>
<script>
  import VueQArt from 'vue-qart'
  export default {
    components: {
      VueQArt
    },
    data() {
      return {
        //haveId: this.$route.query.id, // 地址栏id 代理人id
        storeName: this.$route.query.name, // 地址栏name 代理人
        config: {
          // that.config.value = that.GLOBAL.host + '/#/myStores?id=' + response.data.id; //线上
          //that.config.value = 'http://192.168.147.113:9000/#/myStores?id=' + this.haveId; //本地测试
          // value: 'http://192.168.147.113:9000/#/myStores?id=' + this.$route.query.id || 'https://www.baidu.com',
          value: 'https://emarking-wap.vip-jb.com/#/myStores?id=' + this.$route.query.id || 'https://www.baidu.com',
          // imagePath: 'http://pic.hongdagq.com/download/20170523_145520437.jpg',
          imagePath: require('../../../static/images/headLogo.png'),
          filter: 'color',
          size: 300
        },
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = `${this.storeName}保险店铺的二维码`;
      })
    },
    mounted() {
        
    },
    methods:{
    }

  }

</script>
<style lang="less" scoped>
  .moneyResult {
    text-align: center;
    padding-top: 0.85rem;
    .info{
        color: #999999;
        font-size: 0.36rem;

    }
  }

</style>
