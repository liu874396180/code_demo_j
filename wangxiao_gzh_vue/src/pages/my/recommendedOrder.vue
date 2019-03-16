<template>
  <div>
    <div v-if="dataList.length" class="infoTable">
     <div class="orders" v-for="(item,index) in dataList" :key="index">
          <p class="creatTime">创建时间：{{item.createDate | formatDateTime}}
          </p>
          <div class="orderConent">
            <p class="title">{{item.productName}}-{{item.planName}}</p>
            <p>被保人:{{item.name}}</p>
            <p>保障期限:{{item.dateStart}}至{{item.dateEnd}}</p>
            <p>投保单号:{{item.policyNo}}</p>
            <p>保费:{{item.totalPremium | ToFixed}}</p>
            <img class="fromlogo" :src="GLOBAL.imageRoot+item.logo" alt="">
            <!-- <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt=""> -->
          </div>
        </div>
    </div>
    <div v-else class="tiShi">暂无数据</div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        chenggong: false,
        id:this.$route.query.id,
        dataList: []
      }
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    created() {
      this.$nextTick(() => {
        document.title = '团队成员保单';
        this.getData();
      })
    },
    computed: {

    },
    methods: {
      getData() {
        var that = this;
        this.api.post(
          this.GLOBAL.host + '/ours/tuiJianOrderList', {id:that.id}
        ).then(function (response) {
          if (response.result) {
            that.dataList = response.data.list;
          } else {
            // that.alertOpen("错误", "保存失败" + response.msg);
          }
        })
      },
    },
  }

</script>
<style lang="less" scoped>
.tiShi{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: #666;
    font-size: 0.28rem;
  }
 .orders {
      background: #ffffff;
      padding: 0 0.3rem 0.33rem;
      border-bottom: 0.22rem solid #f2f2f2;
      .creatTime {
        font-size: 0.26rem;
        padding: 0.33rem 0;
        color: #666666;
      }
      .orderConent {
        border: 1px solid #d8d8d8;
        background: #fafafa;
        padding: 0.34rem 0.19rem 0.21rem;
        font-size: 0.26rem;
        color: #666666;
        min-height: 4.36rem;
        position: relative;
        .fromlogo {
          position: absolute;
          top: 0.34rem;
          right: 0.2rem;
          max-width: 0.56rem;
          max-height: 0.3rem;
        }
        .guoqi {
          position: absolute;
          width: 1.08rem;
          height: 0.82rem;
          top: 1.32rem;
          right: 0.21rem;
        }
        p {
          margin: 0.26rem 0;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
          max-width: 5.6rem;
        }
        .title {
          font-size: 0.3rem;
          color: #333333;
          margin-top: 0;
        }
      }
    }


</style>
