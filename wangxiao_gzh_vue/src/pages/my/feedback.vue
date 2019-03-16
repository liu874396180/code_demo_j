<template>
  <div>
    <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error">
      {{dialog.toastContent}}
    </mu-snackbar>
    <div class="select-control-group">
      <div class="select">选择您遇到的问题类型或建议类型</div>
      <div class="radio-group">
        <span class="span1">
          <input type="radio" v-model="option" name="radio-group" id="toubao" value="10" checked="checked" />
          <label for="toubao">投保</label>
        </span>
        <span>
          <input type="radio" v-model="option" name="radio-group" id="zhifu1" value="20" />
          <label for="zhifu1">支付</label>
        </span>
        <span class="span3">
          <input type="radio" v-model="option" name="radio-group" id="lipei" value="30" />
          <label for="lipei">理赔</label>
        </span>
      </div>
      <div class="radio-group">
        <span class="span1">
          <input type="radio" v-model="option" name="radio-group" id="xubao" value="40" />
          <label for="xubao">续保</label>
        </span>
        <span>
          <input type="radio" v-model="option" name="radio-group" id="xiugai" value="50" />
          <label for="xiugai">修改保障</label>
        </span>
        <span class="span3">
          <input type="radio" v-model="option" name="radio-group" id="huodong" value="60" />
          <label for="huodong">活动</label>
        </span>
      </div>
      <div class="radio-group">
        <span class="span1">
          <input type="radio" v-model="option" name="radio-group" id="qita" value="70" />
          <label for="qita">其他</label>
        </span>
      </div>
    </div>
    <div class="description">
      <mu-text-field v-model="texts" placeholder="请详细描述您的问题和建议，我们将根据您的建议不断提升体验和服务" multi-line :rows="6" :rows-max="6" full-width
        :max-length="500"></mu-text-field>
    </div>

    <div class="contact">
      <mu-text-field v-model="contacts" placeholder="请填写您的联系方式QQ、手机号或微信" :max-length="30" style="width:100%;"></mu-text-field>
    </div>

    <div class="button">
      <mu-button :ripple="false" @click="toSubmit" full-width>提交</mu-button>
    </div>
    <div class="note" style="text-align: center;">
      <p class="noteP1">产品、保险咨询及保单修改请联系</p>
      <p class="noteP1">
        <span style="color:#5680e0;">在线客服</span>或拨打<span style="color:#5680e0;">{{GLOBAL.allPhone.ContactPhoneNumber}}</span>
      </p>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        option: "",   // f反馈标签
        texts: "",  //反馈内容
        contacts: "",  //联系方式
        dialog: {
          toastTimer: null,
          toast: false,
          position: "top"
        }
      }
    },

    created() {
      this.$nextTick(() => {
        document.title = '意见反馈';
      })
    },

    methods: {
      toSubmit() {
        if (!this.option || !this.texts || !this.contacts) {
          this.openToast("反馈类型,内容，联系方式不能为空");
        } else {
          let that = this;
          this.api.post(
            that.GLOBAL.host + '/ours/saveFeedback', {
              type: that.option,
              content: that.texts,
              contact: that.contacts
            }
          ).then(function (response) {
            if (response.result) {
              that.openToast("提交成功",function(){
                that.$router.back(-1);
              });
            } else {}
          })
        }

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


<style lang="less">
  .select-control-group {
    border-bottom: 0.22rem solid #f2f2f2;
    border-top: 0.22rem solid #f2f2f2;
    background: #ffffff;
    padding: 0.3rem 0.3rem;
    overflow: hidden; // 清除浮動
    .select {
      color: #333333;
      font-size: 0.26rem;
      margin-bottom: 0.3rem;
    }
    .radio-group {
      text-align: center;
      .span1 {
        float: left;
      }
      .span3 {
        float: right;
      }
      span {
        position: relative;
        line-height: 0.5rem;
        display: inline-block;
        height: .5rem;
        width: 2rem;
        input:checked+label {
          color: #fd5962;
          border: 1px solid #fd5962;
          border-radius: 24px;
        }
        input {
          position: absolute;
          z-index: 1;
          left: .6rem;
          top: .1rem;
        }

        label {
          position: absolute; // background-color: white;
          color: #666;
          z-index: 2;
          display: inline-block;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          text-align: center;
          background-color: #fff;
          font-size: .2rem;
          border: solid 1px #d8d8d8;
          border-radius: 24px;
        }
      }
    }
  }

  .description {
    margin-bottom: .3rem;
    background: #fff;
    padding: 10px;
    height: 145px;

    .mu-input {
      font-size: 12px;
    }
  }

  .contact {
    height: 48px;
    margin-bottom: 60px;
    background: #fff;
    padding: 10px;

    .mu-input {
      font-size: 12px;
    }
  }

  .button {
    width: 6.1rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: .3rem;

    .mu-button {
      background-color: #fd5962;
      color: white;
      height: 0.88rem;
    }
  }

  .note {
    text-align: center;
    font-size: 0.24rem;
    .noteP1 {
      color: #999999;
    }
  }

  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }

  .clearfloat {
    zoom: 1;
  }

</style>
