<template>
    <div class="moneyResult">
        <div v-if="status=='30'">
            <img src="../../../static/images/fukuansuccess.png" alt=""><br>
             <span>支付成功</span>
        </div>
        <div v-else-if="status=='40'">
            <img src="../../../static/images/fukuansuccess.png" alt=""><br>
             <span>承保成功</span>
        </div>
        <div v-else>
            <img src="../../../static/images/fukuanfaile.png" alt=""><br>
            <span>正在审核</span>
        </div>
        <mu-button full-width round class="full-width-btn" @click="payResult">确定</mu-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      // policySerialNo       paymentGatewaySn  地址栏参数
      // policyParamsOrder: "", // 订单号
      // policyParamsPolicyNo: "", //保单号
      status: '' // 请求支付状态
      // timer:'',
    }
  },
  created () {
    this.$nextTick(() => {
      document.title = '支付结果'
      this.getStatus()
      window.timer = window.setInterval(() => {
        this.getStatus()
      }, 5000)
    })
  },
  methods: {
    // 获取状态
    getStatus () {
      var that = this
      this.api.post(
        this.GLOBAL.host + '/ours/getByOrderNo',
        {orderNo: this.$route.query.policySerialNo, policyNo: this.$route.query.policyRef}
      ).then(function (response) {
        if (response.result) {
          that.status = response.data.status
          if (that.status == '30' || that.status == '40') {
            clearInterval(window.timer)
          }
        } else {
          clearInterval(window.timer)
        }
      }).catch(() => {
        clearInterval(window.timer)
      })
    },
    payResult () {
      clearInterval(window.timer)

      if (this.status == '30') {
        this.$router.push('/index/home')
      } else {
        this.$router.push('/index/home')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.moneyResult{
    text-align: center;
    padding-top: 0.85rem;
    span{
        font-size: 0.4rem;
        color: #000000;
    }
    img{
        width: 2rem;
        height: 2rem;
    }
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
      margin-top: 1.33rem;
    }
</style>
