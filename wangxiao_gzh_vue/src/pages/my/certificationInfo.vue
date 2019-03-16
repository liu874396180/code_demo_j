<template>
  <div class="LeveloneBox">
    <mu-dialog :open="dialog.alert" :title="dialog.alertTitle">
        {{dialog.alertContent}}
        <mu-button slot="actions" flat @click="alertClose" color="#0e99ff">确定</mu-button>
    </mu-dialog>
    <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast">
        {{dialog.toastContent}}
    </mu-snackbar>
    <div class="cer_content">
        <mu-list class="fontSize" style="padding:0">
            <mu-list-item button :ripple="false">
                <mu-list-item-title class="muTitle">姓名</mu-list-item-title>
                <mu-text-field solo v-model="certiData.name" class="inputTestWidth" name="name" v-validate="'required'" :errorText="errors.first('name')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
           <mu-list-item button :ripple="false">
                <mu-list-item-title class="muTitle">性别</mu-list-item-title>
                <mu-select solo v-model="certiData.gender">
                    <mu-option label="男" value="0"></mu-option>
                    <mu-option label="女" value="1"></mu-option>
                </mu-select>
            </mu-list-item>
            <mu-divider />
             <mu-list-item button :ripple="false">
                <mu-list-item-title class="muTitle">手机号码</mu-list-item-title>
                <mu-text-field solo v-model="certiData.mobile" class="inputTestWidth" name="mobile" v-validate="'required|phone'" :errorText="errors.first('mobile')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
             <mu-list-item button :ripple="false">
                <mu-list-item-title class="muTitle">身份证号</mu-list-item-title>
                <mu-text-field solo v-model="certiData.idNo" class="inputTestWidth" name="idNo" v-validate="'required|idcard'" :errorText="errors.first('idNo')"></mu-text-field>
            </mu-list-item>
            <mu-divider />
             <mu-list-item button :ripple="false">
                <mu-list-item-title class="muTitle">执业证编号</mu-list-item-title>
                <mu-text-field solo v-model="certiData.certificateNo" class="inputTestWidth" placeholder="选填"></mu-text-field>
            </mu-list-item>
        </mu-list>
    </div>
    <mu-list style="text-align:center">
        <!-- <mu-checkbox v-model="checked" uncheck-icon="radio_button_unchecked" checked-icon="check_circle" color="#ff5a15" label="我已查看并同意"></mu-checkbox>
        <router-link to="" style="color:#5680e0;vertical-align: top;display: inline-block;line-height: 24px;">《经纪人协议》</router-link> -->
    </mu-list>
    <div style="text-align:center;margin-top:0.78rem;">
        <mu-button full-width round class="full-width-btn" @click="submit">提交</mu-button>
    </div>
  </div> 
</template>
<script>
  export default {
    data() {
      return {
        dialog: {
          alert: false,
          confirm: false,
          alertTitle:"",
          alertContent:"",
          toastTimer:null,
          toast:false,
          position: 'top-end',
        },
        activeName: '1',
        checked:false,
        certiData:{
          name: "",
          gender: "",
          mobile: "",
          idNo: "",
          certificateNo: "",
        }
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = '代理人认证';
      })
    },
    mounted() {},
    methods: {
      
      submit() {
        this.$validator.validateAll().then((result)=>{
          if(result){
            var that = this;
            this.api.post(
              this.GLOBAL.host + '/agentAuthentication/save',
              this.certiData
            ).then(function(response){
              if (response.result) {
                that.openToast("提交成功", function(){
                    that.$router.push({ path: '/my/myIndex' })
                })
            }else {
                that.alertOpen("错误", "保存失败" + response.msg);
            }
            })
          }else {
              this.alertOpen("通知","请输入正确后保存");
              return ;
          }
        }
      )
      },

    alertOpen (title,content) {
      this.dialog.alert = true;
      this.dialog.alertTitle = title;
      this.dialog.alertContent = content;
    },

    alertClose () {
        this.dialog.alert = false
    },

    openToast(content,func){
        this.dialog.toast = true;
        this.dialog.toastContent=content;
        if (this.dialog.toastTimer ) {
                clearTimeout(this.dialog.toastTimer)
        }
        this.dialog.toastTimer = setTimeout(() => { this.dialog.toast = false; if(func) func() }, 1000);
    },
    },
  }

</script>
<style lang="less" scoped>
.cer_content{
    border-bottom: 0.22rem solid #f2f2f2;
    border-top: 0.22rem solid #f2f2f2;
    background: #ffffff;
}
// 输入框
.mu-input{
    margin-bottom: 0;
    padding-bottom:0; 
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
    }
</style>
<style>
/* 输入框宽度 */
.inputTestWidth{
    width: 13rem;
}

</style>
