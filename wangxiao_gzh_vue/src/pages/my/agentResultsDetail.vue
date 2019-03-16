<template>
  <div class="yejidetail">
       <br><h3>&emsp;业绩查询</h3><br>
        <datetime v-model="startDate" @on-change="changeDate" format="YYYY-MM" :start-date="createDateStart" :end-date="createDateEnd" title="起始日期" ></datetime><br>
      <mu-list class="badge-list-wrap">
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售额</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.salesAmount | ToFixed" :color="resultData.salesAmount>0?'secondary':''"></mu-badge>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item>
          <mu-list-item-content>
            <mu-list-item-title>销售推广费</mu-list-item-title>
          </mu-list-item-content>
          <mu-list-item-action>
          <mu-badge :content="resultData.salesCommision | ToFixed" :color="resultData.salesCommision>0?'secondary':''"></mu-badge>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        resultData:{}, // 本月
        startDate:this.$utils.getMonthChuMo().fullStartOfMonth,  // 开始日期
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
     this.nowMonth()
    },

    methods: {
     changeDate() {
         this.nowMonth();
     },
      nowMonth() {
          let that = this;
          let dataLastDay = new Date(that.startDate.split("-")[0],that.startDate.split("-")[1], 0).getDate(); // 获取本月最后一天
          let startDate = that.startDate + "-01"
          let endDate = that.startDate + "-" + dataLastDay;
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
.yejidetail{
    h3{
        border-left: 6px solid #e91e63;
        margin-left: 0.1rem;
    }
    .mu-list{
        padding: 0 0.3rem;
    }
}
</style>
<style>
.yejidetail a div:first-of-type{
    float: left;
    border-left: 5px solid #3f51b5;
    margin-right: 10px;
    margin-left: 0.1rem;
    padding-left: 0.4rem;
}
</style>
