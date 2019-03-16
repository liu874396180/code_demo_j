<template>
  <div class="LeveloneBox" style="overflow: hidden;">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="我为什么选择在简保科技购买保险？" name="1">
        <div class="texts">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div class="texts">在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="简保科技提供哪些服务？" name="2">
        <div class="texts">控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div class="texts">页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="如何投保？" name="3">
        <div class="texts">简化流程：设计简洁直观的操作流程；</div>
        <div class="texts">清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div class="texts">帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="投保可以使用哪些支付方式？" name="4">
        <div class="texts">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div class="texts">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
      <el-collapse-item title="忘记密码怎么办？" name="5">
        <div class="texts">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div class="texts">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
      <!-- <el-collapse-item title="什么是金豆？" name="6">
        <div class="texts">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div class="texts">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item> -->
      <!-- <el-collapse-item title="慧择金豆有什么规则？" name="7">
        <div class="texts">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div class="texts">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item> -->
      <el-collapse-item title="什么是优惠券？" name="8">
        <div class="texts">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div class="texts">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
    <div class="advice-link">
      <!-- <router-link to="feedback" tag="div"> -->
        <!-- <div class="advice"> -->
          <!-- <mu-icon size="15" value="comment" left></mu-icon>&nbsp;意见反馈 -->
          <mu-button :ripple="false" full-width color="#fd5962" to="feedback" style="height:100%;">
           <mu-icon size="16" value="comment" left></mu-icon>意见反馈
        </mu-button>    
        </div>
      <!-- </router-link>
    </div> -->
  </div> 
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1',
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = '帮助与反馈';
      })
    },
    mounted() {},
    methods: {
      getData() {
        var that = this;
        this.api.post(
          this.GLOBAL.host + '/order/orderCheck', {
            "pageNo": that.pageNo,
            "pageSzie": that.pageSzie
          }
        ).then(function (response) {
          if (response.result) {
            // that.openToast("保存成功");
            that.dataList = response.data.list;
          } else {
            // that.alertOpen("错误", "保存失败" + response.msg);
          }
        })
      },
    }
  }

</script>
<style lang="less" scoped>
.advice-link {
// background-color: #e57373;
    // color: white;
    margin-top: .3rem;
    color: white;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}

.mu-raised-button {
    font-size: 12px;
}

.texts {
    font-size:.26rem;
    color: #666;
}
</style>
<style>
  .el-collapse-item__header {
    padding: 0 0.3rem;
    font-size:.3rem;
  }

  .el-collapse-item__arrow {
    margin-right: 0;
  }
  
  .LeveloneBox .el-collapse-item__wrap {
    padding: 0 0.3rem;
  }

</style>
