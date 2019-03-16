<template>
  <div class="yeji">
       <br><h3>&emsp;本月业绩</h3>
      <mu-list class="badge-list-wrap">
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售额</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.salesAmount | ToFixed" :color="resultData.salesAmount > 0 ?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售推广费</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.salesCommision | ToFixed" :color="resultData.salesCommision > 0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>推荐奖励</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.recommendCommision | ToFixed" :color="resultData.recommendCommision>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>出单量</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.orderSum" :color="resultData.orderSum>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
     </mu-list>
     <h3>&emsp;总业绩</h3>
     <mu-list>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售额</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="allResultData.salesAmount | ToFixed" :color="allResultData.salesAmount>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售推广费</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="allResultData.salesCommision | ToFixed" :color="allResultData.salesCommision>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>推荐奖励</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="allResultData.recommendCommision | ToFixed" :color="allResultData.recommendCommision>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>出单量</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="allResultData.orderSum" :color="allResultData.orderSum>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <div class="btn" style="text-align: center;"><mu-button color="primary" to="/agentResultsDetail">查看明细</mu-button></div>
      
  </div>
</template>
<script>
  export default {
    data() {
      return {
        resultData:{}, // 本月
        allResultData:{}, // 总业绩
        dialog: {
          toastTimer: null,
          toast: false,
          position: "top"
        }
      }
    },

    created() {
      this.$nextTick(() => {
        document.title = '业绩';
      })
      this.nowMonth();
      this.allMonth();
    },

    methods: {
      nowMonth() {
          let that = this;
          let startDate = this.$utils.getMonthChuMo().fullStartOfMonth;
          let endDate = this.$utils.getMonthChuMo().fullEndOfMonth;
          this.api.post(
            that.GLOBAL.host + '/order/getAgentCountSettle', {
            //   agentId: that.$router.query,
              agentId:"33427e2a86934e328d16cf52e378bc16",
              startDate: startDate,
              endDate: endDate
            }
          ).then(function (response) {
            if (response.result) {
              that.resultData = response.data;
            }
          })
      },
      allMonth() {
          let that = this;
          this.api.post(
            that.GLOBAL.host + '/order/getAgentCountSettle', {
            //   agentId: that.$router.query,
              agentId:"33427e2a86934e328d16cf52e378bc16",
              startDate: "",
              endDate: ""
            }
          ).then(function (response) {
            if (response.result) {
              that.allResultData = response.data;
            }
          })
      },
      //气泡提示
      openToast(content, func) {
        this.dialog.toast = true;
        this.dialog.toastContent = content;
        if (this.dialog.toastTimer) {
          clearTimeout(this.dialog.toastTimer);
        }
        this.dialog.toastTimer = setTimeout(() => { this.dialog.toast = false; if(func) func() }, 1000);
      }
    }


  }

</script>
<style scoped lang="less">
.yeji{
    h3{
        border-left: 6px solid #e91e63;
        margin-left: 0.1rem;
    }
    .mu-list{
        padding: 0 0.3rem;
    }
}
</style>
