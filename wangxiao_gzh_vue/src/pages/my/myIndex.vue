<template>
  <div id="my" class="LeveloneBox">
    <mu-snackbar v-if="dialog.toast" :open="dialog.toast" position="top-end">
      {{dialog.toastContent}}
    </mu-snackbar>
    <div class="top">
      <!-- <div class="topLeft">
        <img src="../../../static/images/headLogo.png" alt="">
      </div> -->
      <!-- <div class="upload-box banner-img topLeft">
          <vue-upload
              ref="uploader"
              :fileList=attachmentList
              :addFileList=addFileList
              :deleteFileList=[]
              :fileNumLimit=1
              :accept=null
              @error="onError"
          ></vue-upload>
      </div> -->
      <el-upload
      class="avatar-uploader topLeft"
      :action="GLOBAL.host + '/file/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
      <div class="topRight">{{userMobile}}</div>
    </div>
    <div class="myTabbar">
      <router-link :to="{path:'/order',query:{num:'first'}}" tag="div" class="myall">
        <span class="myallLeft">我的订单</span>
        <div class="myallRight">
          <span style="vertical-align: middle;">查看全部</span>
          <mu-icon value="keyboard_arrow_right" style="vertical-align: middle;"></mu-icon>
        </div>
      </router-link>
      <div class="mytabs">
        <router-link :to="{path:'/order',query:{num:'second'}}" tag="div" class="tabs">
          <img src="../../../static/images/baozhang.png" alt="">
          <br>待投保
          <span class="num" v-if="daiTouBao">{{daiTouBao}}</span>
        </router-link>
        <router-link :to="{path:'/order',query:{num:'third'}}" tag="div" class="tabs">
          <img src="../../../static/images/icon_fukuan.png" alt="">
          <br>待支付
          <span class="num" v-if="daiZhiFu">{{daiZhiFu}}</span>
        </router-link>
        <router-link :to="{path:'/order',query:{num:'fourth'}}" tag="div" class="tabs">
          <img src="../../../static/images/yizhifu.png" alt="">
          <br>已支付
          <span class="num" v-if="yiZhiFu">{{yiZhiFu}}</span>
        </router-link>
        <router-link :to="{path:'/order',query:{num:'five'}}" tag="div" class="tabs">
          <img src="../../../static/images/yiwancheng.png" alt="">
          <br>已完成
          <span class="num" v-if="yiWanCheng">{{yiWanCheng}}</span>
        </router-link>
      </div>
    </div>
    <div class="myList">
      <mu-list class="muList1">
        <mu-list-item avatar to="/recommended">
          <mu-list-item-action avatar>
            <img src="../../../static/images/wodetuijian.png">
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>我的团队</mu-list-item-title>
          </mu-list-item-content>
          <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
        </mu-list-item>
        <mu-list-item avatar>
          <mu-list-item-action avatar >
            <img src="../../../static/images/dianpu.png">
          </mu-list-item-action>
          <mu-list-item-content @click="toStroe">
            <mu-list-item-title>个人店铺</mu-list-item-title>
          </mu-list-item-content>
            <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
        </mu-list-item>
        <mu-list-item avatar to="/basicInformation">
          <mu-list-item-action avatar>
            <img src="../../../static/images/jibenxixin.png">
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>基本信息</mu-list-item-title>
          </mu-list-item-content>
            <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
        </mu-list-item>
        <mu-list-item avatar class="agentResults">
          <!-- <mu-list-item-action avatar>
            <img src="../../../static/images/jibenxixin.png">
          </mu-list-item-action> -->
          <mu-icon value="equalizer"></mu-icon>&emsp;
          <mu-list-item-content @click="toYeji">
            <mu-list-item-title>代理人业绩</mu-list-item-title>
          </mu-list-item-content>
            <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
        </mu-list-item>
        <mu-list-item avatar to="/help">
          <mu-list-item-action avatar>
            <img src="../../../static/images/bangzhu.png">
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title class="noborder">帮助与反馈</mu-list-item-title>
          </mu-list-item-content>
            <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
        </mu-list-item>
      </mu-list>
      <mu-list class="muList2">
          <mu-list-item avatar to="/certification">
              <mu-list-item-action avatar>
                  <img src="../../../static/images/renzheng.png">
              </mu-list-item-action>
              <mu-list-item-content>
              <mu-list-item-title class="noborder">代理人认证</mu-list-item-title>
              </mu-list-item-content>
              <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
          </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
      <mu-list class="muList2">
          <mu-list-item avatar to="/setUp">
              <mu-list-item-action avatar>
                  <img src="../../../static/images/renzheng.png">
              </mu-list-item-action>
              <mu-list-item-content>
              <mu-list-item-title class="noborder">设置</mu-list-item-title>
              </mu-list-item-content>
              <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
          </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
      <mu-list class="muList2" @click="loginout">
          <mu-list-item avatar>
              <mu-list-item-action avatar>
                <mu-icon value="exit_to_app" color="rgba(160, 160, 160, 0.92)"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-content>
              <mu-list-item-title class="noborder">退出</mu-list-item-title>
              </mu-list-item-content>
              <mu-icon value="keyboard_arrow_right" class="enter-ico"></mu-icon>
          </mu-list-item>
      </mu-list>
    </div>
    <p class="moblie">联系电话：{{GLOBAL.allPhone.ContactPhoneNumber}}</p>
  </div>
</template>
<script>
import { mapActions} from 'vuex';
import { throws } from 'assert';
  export default {
    data() {
      return {
        imageUrl:"../../../static/images/headLogo.png",
        dialog:{
            alert: false,
            confirm: false,
            alertTitle:"",
            alertContent:"",
            toastTimer:null,
            toast:false
        },
        userMobile: null, //昵称（手机号）
        id: null, //代理人id
        quanBu: "0", //全部
        daiTouBao: "", //待投保
        daiZhiFu: "", //待支付
        yiZhiFu: "", //已支付
        yiWanCheng: "", //已完成
      }
    },
    beforeMount() {
      // this.api.post(
      //     this.GLOBAL.host + '/ours/essentialInformation', {}
      //   ).then(function (response) {
          
      //   })
    },
    created() {
      this.changActiveTabs(1); //触发tabs
      this.getCommonData();
      this.$nextTick(()=>{
            document.title = '个人中心';
        })
    },
    methods: {
      ...mapActions(["changActiveTabs"]),
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        var that = this;
        this.api.post(this.GLOBAL.host + '/ours/essentialInformationUpdate',{photoUrl:res.data})
        .then(rep => {
            if(rep.result){
            }
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png' || file.type === 'image/jpeg' ;
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 PNG/JPEG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      //退出
      loginout() {
        window.sessionStorage.loading = "xiaoping";
        this.$store.dispatch('FedLogOut').then(data => {
          window.sessionStorage.loading = "";
          this.$router.push("/login");
        }).catch(() => {
          
        })
          
      },
      toStroe() {
        if(this.id){
          this.$router.push({path:'/myStores',query:{id:this.id,editor:'toEditor'}})
        }else{
         this.openToast("网络异常");
        }
        
      },
      toYeji() {
        if(this.id){
          this.$router.push({path:'/agentResults',query:{id:this.id}})
        }else{
         this.openToast("网络异常");
        }
        
      },
      getCommonData() {
        window.sessionStorage.loading = "xiaoping";
        let that = this;
        this.$validator.validateAll().then((result) => {
          if (result) {
            that.$axios
              .all([
                //昵称
                that.api.post(that.GLOBAL.host + "/ours/essentialInformation", {}),
                // 订单数量
                that.api.post(
                  that.GLOBAL.host + "/ours/orderNumber", {}
                )
              ])
              .then(
                that.$axios.spread(function (resp1, resp2) {
                  window.sessionStorage.loading = "";
                  if (resp1.result) {
                    that.userMobile = resp1.data.mobile;
                    that.id = resp1.data.id;  //代理人id
                    if(!!resp1.data.photoUrl){
                      that.imageUrl = that.GLOBAL.imageRoot + resp1.data.photoUrl;
                    }
                  }
                  if (resp2.result) {
                    that.quanBu = resp2.data.quanBu;
                    that.daiTouBao = resp2.data.daiTouBao;
                    that.daiZhiFu = resp2.data.daiZhiFu;
                    that.yiZhiFu = resp2.data.yiZhiFu;
                    that.yiWanCheng = resp2.data.yiWanCheng;
                  }
                })
              );
          }
        })
      },
      onError() {},
      //打开dialog.alert
      alertOpen (title,content) {
        this.dialog.alert = true;
        this.dialog.alertTitle = title;
        this.dialog.alertContent = content;
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
    },
  }

</script>
<style lang="less" scoped>
  #my {
    .top {
      height: 2.38rem;
      background: #fd5962;
      padding-left: 0.3rem;
      display: flex;
      align-items: center;
      border-bottom: 0.22rem solid #f2f2f2;
      .topLeft {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        margin-right: 0.39rem;
        img {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          box-shadow:0 0 10px #8d0018;
        }
      }
      .topRight {
        flex: 1;
        height: 1.6rem;
        color: #ffffff;
        display: flex;
        align-items: center;
        font-size: 0.36rem;
      }

    }
    .myTabbar {
      background: #ffffff;
      border-bottom: 0.22rem solid #f2f2f2;
      .myall {
        height: 0.81rem;
        border-bottom: 1px solid #d8d8d8;
        line-height: 0.81rem;
        padding: 0 0.33rem;
        .myallLeft {
          font-size: 0.3rem;
          color: #333333;
        }
        .myallRight {
          font-size: 0.26rem;
          color: #999999;
          float: right;
        }
      }
      .mytabs {
        height: 1.66rem;
        display: flex;
        align-items: center;
        width: 100%;
        .tabs {
          width: 25%;
          float: left;
          position: relative;
          text-align: center;
          img {
            width: 0.4rem;

          }
          .num {
            position: absolute;
            top: -0.16rem;
            right: 0.52rem;
            font-size: 0.2rem;
            color: #ff383e;
            border: solid 1px #ff3339;
            min-width: 0.36rem;
            height: 0.36rem;
            border-radius: 50%;
            text-align: center;
            line-height: 0.36rem;
            background:#fff;
          }
        }
      }
    }
    .myList {
      background: #ffffff;
      border-bottom: 0.22rem solid #f2f2f2;
      font-size: 0.3rem;
      color: #666666;
      img {
        width: 0.4rem;
      }
      .muList1 {
        border-bottom: 0.22rem solid #f2f2f2;
        padding:0;
      }
      .muList2{
        padding:0;
      }
      .mu-item-title {
        height:50px;
        line-height:50px;
        border-bottom: 1px solid #d8d8d8;
        font-size:14px;
      }
      .mu-item-action {
        min-width: 0.21rem;
        margin-right:15px;
      }
      .noborder {
        border: 0;
      }
    }
    .moblie {
      text-align: center;
      font-size: 0.26rem;
      color: #666666;
      padding: 0 0 0.8rem;
      margin-top: 0.32rem;
    }
    .enter-ico{
      position:absolute;
      right:15px;
      top:15px;
      color:#999;
    }
    .agentResults{
      .material-icons{
        color: #999;
      }
    }
  }
</style>
