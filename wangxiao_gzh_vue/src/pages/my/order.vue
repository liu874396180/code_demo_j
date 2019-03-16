<template>
  <div class="">
    <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error">
      {{dialog.toastContent}}
    </mu-snackbar>
    <mu-dialog title="确认删除!" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      确认删除此订单？
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="sureDialog">确定</mu-button>
    </mu-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="myorderTabs">
      <!-- <el-tab-pane :label="`全部的${quanBu}`" name="first"> -->
      <el-tab-pane :label="`全部的`" name="first">
        <div class="empty-order" v-if="!dataList.length">暂无数据</div>
        <div class="orders" v-for="(item,index) in dataList" :key="index">
          <p class="creatTime">创建时间：{{item.createDate | formatDateTime}}
            <span v-if="item.status != '40'" @click="changeStuts(item.orderNo,item.status)" class="creatTimeStatusSpan" :class="{'yiquxiao':item.status== '50'}">{{item.status== '50'?'已取消':'取消'}}</span>
          </p>
          <div class="orderConent">
            <p class="title">{{item.productName}}-{{item.planName}}</p>
            <p>被保人:{{item.name}}</p>
            <p>保障期限:{{item.dateStart}}至{{item.dateEnd}}</p>
            <p>投保单号:{{item.policyNo}}</p>
            <p>保费:{{item.totalPremium | ToFixed}}</p>
            <img class="fromlogo" :src="GLOBAL.imageRoot+item.logo" alt="">
            <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
          </div>
          <div class="orderFooter">
            <button class="orderFooter_btn1" v-if="item.status == '40' || item.status == '60'" @click="onloadFile(item.orderNo,item.compCode)">电子保单</button>
            <button class="btn" v-if="item.status =='20'" @click="openFullscreenDialog(item.policyId,item.compCode,item.totalPremium,item.policyNo)">去支付</button>
            <button class="btn" v-if="item.status =='30'">待出单</button>
            <router-link v-if="item.status =='10'" :to="{path:'/policyChange',query:{id:item.id,policyId:item.policyId}}">
              <button class="btn">去完善</button>
            </router-link>
            <!-- <router-link v-if="item.status =='40'" :to="{path:'/policyChange',query:{id:item.id,policyId:item.policyId}}">
              <button class="btn">再次购买</button>
            </router-link> -->
            
            <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
              <button class="orderFooter_btn1">查看详情</button>
            </router-link>
            <button @click="deleteOrder(item.orderNo)" class="orderFooter_btn2" v-if="item.status !='40'">删除</button>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane :label="`待投保${daiTouBao}`" name="second"> -->
      <el-tab-pane :label="`待投保`" name="second">
        <div class="empty-order" v-if="!dataList.length">暂无数据</div>
        <div class="orders" v-for="(item,index) in dataList" :key="index">
          <p class="creatTime">创建时间：{{item.createDate | formatDateTime}}
            <span @click="changeStuts(item.orderNo,item.status)" class="creatTimeStatusSpan" :class="{'yiquxiao':item.status== '50'}">{{item.status== '50'?'已取消':'取消'}}</span>
          </p>
          <div class="orderConent">
            <p class="title">{{item.productName}}-{{item.planName}}</p>
            <p>被保人:{{item.name}}</p>
            <p>保障期限:{{item.dateStart}}至{{item.dateEnd}}</p>
            <p>投保单号:{{item.policyNo}}</p>
            <p>保费:{{item.totalPremium | ToFixed}}</p>
            <img class="fromlogo" :src="GLOBAL.imageRoot+item.logo" alt="">
            <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
          </div>
          <div class="orderFooter">
            <router-link :to="{path:'/policyChange',query:{id:item.id,policyId:item.policyId}}">
              <button class="btn">去完善</button>
            </router-link>
              <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
                <button class="orderFooter_btn1">查看详情</button>
              </router-link>
            <button @click="deleteOrder(item.orderNo)" class="orderFooter_btn2">删除</button>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane :label="`待支付${daiZhiFu}`" name="third"> -->
      <el-tab-pane :label="`待支付`" name="third">
        <div class="empty-order" v-if="!dataList.length">暂无数据</div>
        <div class="orders" v-for="(item,index) in dataList" :key="index">
          <p class="creatTime">创建时间：{{item.createDate | formatDateTime}}
            <span @click="changeStuts(item.orderNo,item.status)" class="creatTimeStatusSpan" :class="{'yiquxiao':item.status== '50'}">{{item.status== '50'?'已取消':'取消'}}</span>
          </p>
          <div class="orderConent">
            <p class="title">{{item.productName}}-{{item.planName}}</p>
            <p>被保人:{{item.name}}</p>
            <p>保障期限:{{item.dateStart}}至{{item.dateEnd}}</p>
            <p>投保单号:{{item.policyNo}}</p>
            <p>保费:{{item.totalPremium | ToFixed}}</p>
            <img class="fromlogo" :src="GLOBAL.imageRoot+item.logo" alt="">
            <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
          </div>
          <div class="orderFooter">
            <button class="btn" @click="openFullscreenDialog(item.policyId,item.compCode,item.totalPremium,item.policyNo)">去支付</button>
            <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
              <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
                <button class="orderFooter_btn1">查看详情</button>
              </router-link>
            </router-link>
            <button @click="deleteOrder(item.orderNo)" class="orderFooter_btn2">删除</button>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane :label="`已支付${yiZhiFu}`" name="fourth"> -->
      <el-tab-pane :label="`已支付`" name="fourth">
        <div class="empty-order" v-if="!dataList.length">暂无数据</div>
        <div class="orders" v-for="(item,index) in dataList" :key="index">
          <p class="creatTime">创建时间：{{item.createDate | formatDateTime}}
            <span @click="changeStuts(item.orderNo,item.status)" class="creatTimeStatusSpan" :class="{'yiquxiao':item.status== '50'}">{{item.status== '50'?'已取消':'取消'}}</span>
          </p>
          <div class="orderConent">
            <p class="title">{{item.productName}}-{{item.planName}}</p>
            <p>被保人:{{item.name}}</p>
            <p>保障期限:{{item.dateStart}}至{{item.dateEnd}}</p>
            <p>投保单号:{{item.policyNo}}</p>
            <p>保费:{{item.totalPremium | ToFixed}}</p>
            <img class="fromlogo" :src="GLOBAL.imageRoot+item.logo" alt="">
            <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
          </div>
          <div class="orderFooter">
            <button class="btn">待出单</button>
            <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
              <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
                <button class="orderFooter_btn1">查看详情</button>
              </router-link>
            </router-link>
            <button @click="deleteOrder(item.orderNo)" class="orderFooter_btn2">删除</button>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane :label="`已完成${yiWanCheng}`" name="five"> -->
      <el-tab-pane :label="`已完成`" name="five">
        <div class="empty-order" v-if="!dataList.length">暂无数据</div>
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
            <img v-if="item.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
          </div>
          <div class="orderFooter">
            <!-- <router-link :to="{path:'/policyChange',query:{id:item.id,policyId:item.policyId}}">
              <button class="btn">再次购买</button>
            </router-link> -->
            <button class="orderFooter_btn1" v-if="item.status == '40' || item.status == '60'" @click="onloadFile(item.orderNo,item.compCode)">电子保单</button>
            <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
              <router-link :to="{path:'/orderDetail',query:{orderNo:item.orderNo}}">
                <button class="orderFooter_btn1">查看详情</button>
              </router-link>
            </router-link>
            <!-- <button @click="deleteOrder(item.orderNo)" class="orderFooter_btn2">删除</button> -->
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="payOpenFullscreen">
      <mu-appbar color="#ffffff" title="选择支付方式" z-depth="1" textColor="#333333" style="text-align:center">
        <mu-button slot="right" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <mu-list class="btnCenter" style="text-align:center">
        <mu-list-item avatar>
          <mu-list-item-action avatar>
            <mu-avatar>
              <img src="../../../static/images/wxzhifu.png">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>微信支付</mu-list-item-title>
          </mu-list-item-content>
          <mu-checkbox v-model="hasChecked" uncheck-icon="radio_button_unchecked" checked-icon="check_circle" color="#ff5a15" label=""></mu-checkbox>
        </mu-list-item>
        <mu-button full-width round class="full-width-btn" @click="pay(toPolicyId,toPayPolicyflag,totalPremium,policyNo)">立即支付</mu-button>
      </mu-list>
    </mu-dialog>

  </div>
</template>
<script>
  export default {
    components: {

    },
    data() {
      return {
        deleteOrderNo:"", //删除订单id 
        openAlert: false, //删除弹窗
        dialog: {
          toastTimer: null,
          toast: false,
          position: "top"
        },
        toPayPolicyflag:"",// 全局支付--去哪家支付
        totalPremium:"",// 全局支付---支付金额
        policyNo:"",// 全局支付----保单号？
        toPolicyId:'', // 全局支付id？
        payOpenFullscreen:false, // 支付弹框
        hasChecked:true, // 默认支付选择
        // 待投保	10	待投保
        // 待支付	20	待支付
        // 已支付	30	已支付
        // 已完成	40	已完成
        activeName: this.$route.query.num,
        pageNo: 1, //当前页数
        pageSzie: 10, // 每页条数
        dataList: [],
        quanBu: "0", //全部
        daiTouBao: "0", //待投保
        daiZhiFu: "0", //待支付
        yiZhiFu: "0", //已支付
        yiWanCheng: "0" //已完成
      }
    },
    created() {
      this.$nextTick(() => {
        document.title = '保单'
      })
      this.getData();
      this.getNumber();
    },
    mounted() {},
    methods: {
      // 下载电子保单
      onloadFile(orderNo,compCode) {
        var that = this;
        let url = compCode=="zxjk"?"/notify/sfjk/zxDownload":"/notify/sfjk/alDownload";
        this.api.post(
          that.GLOBAL.host + url, {
            orderNo: orderNo
          }
        ).then(function (response) {
          if (response.result) {
          //  window.location.href = response.data;
          // alert(JSON.stringify(response))
           that.$router.push({path:"/xuzhiPdf",query:{pdfUrl:response.data,electronicOrder:'electronicOrder'}})
          } else {}
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
      },
       // 支付弹出
      openFullscreenDialog(policyId,toPayPolicyflag,totalPremium,policyNo) {
        this.toPolicyId = policyId;
        this.toPayPolicyflag = toPayPolicyflag;
        this.totalPremium = totalPremium;
        this.policyNo = policyNo;

        this.payOpenFullscreen = true;
      },
      // 支付关闭
      closeFullscreenDialog() {
        this.payOpenFullscreen = false;
      },
      // 删除弹窗 
      // q取消
      closeAlertDialog () {
        this.openAlert = false;
      },
      // 确定
      sureDialog () {
        this.openAlert = false;
        var that = this;
        this.api.post(
          that.GLOBAL.host + '/ours/personalStoreDelete', {
            orderNo: that.deleteOrderNo
          }
        ).then(function (response) {
          if (response.result) {
            that.openToast("删除成功");
            that.getData();
            that.getNumber();
          } else {that.openToast("删除失败");}
        })
      },
      //删除
      deleteOrder(orderNo) {
        this.deleteOrderNo = orderNo;
        this.openAlert = true; 
        
      },
      // 取消
      changeStuts(orderNo, status) {
        var that = this;
        if (status != '50') {
          this.api.post(
            that.GLOBAL.host + '/ours/personalStoreQuXiao', {
              orderNo: orderNo
            }
          ).then(function (response) {
            if (response.result) {
              that.openToast("取消成功");
              that.getData();
              that.getNumber();
            } else {}
          })
        } else {
          // that.openToast("取消失败");
          return;
        }
      },

      // tab
      handleClick(tab, event) {
        this.getData();
      },
      getData() {
        var that = this;
        let orderStatus = (this.activeName == "first" && "") || (this.activeName == "second" && "10") || (this.activeName ==
          "third" && "20") || (this.activeName == "fourth" && "30") || (this.activeName == "five" && "40,50,60") || "";
        this.api.post(
          this.GLOBAL.host + '/ours/orderList', {
            "status": orderStatus
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
      getNumber() {
        var that = this;
        this.api.post(
          this.GLOBAL.host + '/ours/orderNumber', {}
        ).then(function (response) {
          if (response.result) {
            that.quanBu = response.data.quanBu || "";
            that.daiTouBao = response.data.daiTouBao || "";
            that.daiZhiFu = response.data.daiZhiFu || "";
            that.yiZhiFu = response.data.yiZhiFu || "";
            that.yiWanCheng = response.data.yiWanCheng || "";
          } else {}
        })
      },
      pay(id,toPayPolicyflag,totalPremium,policyNo) {
        let that = this;
        let objzx = {
            policyId: id, //订单号
            payType: 'wxpay',
            wxpayType: 'subscription'
        }
        let objal = {
             totalPremium:totalPremium,
             policyRef:policyNo
        }
          if (that.hasChecked) {
            // 去哪家支付
            if(toPayPolicyflag == "zxjk"){
              let P = new Promise((resolve, reject) => {
              that.api.post(
                that.GLOBAL.host + "/order/toPay",
                  objzx
              ).then(function (response) {
                if (response.result) {
                  that.closeFullscreenDialog();
                  window.location.href = response.data;
                }else{
                }
              },function(error){})
            }).catch((e) => {
                console.log(e)
                document.write(e);
              })
            }else{
              window.location.href = `${that.GLOBAL.host}/notify/h5/toAlPay?totalPremium=${objal.totalPremium}&policyRef=${objal.policyRef}`
            }
          } else {
            that.openToast("请选择支付方式");
          }
      },
    }
  }

</script>
<style>
  .myorderTabs .el-tabs__header {
    color: black;
    margin: 0;
    background: #ffffff;
    padding-left: 0.3rem;
  }
  .myorderTabs .el-tabs__nav{
    width: 100%;
  }
  /* tabs 间距 */

  .myorderTabs .el-tabs__item {
    padding: 0 0.2rem;
    width: 20%;
  }

  /* tab 向右偏移 */

  /* 选中的tab字体颜色 */

  .el-tabs__item:hover {
    color: #fd5962;
  }

  .el-tabs__item.is-active {
    color: #fd5962;
  }

  /* 底部滚动线条 */

  .el-tabs__active-bar {
    background: #fd5962;
  }
 /* 支付方式 */

  .mu-avatar-inner {
    background-color: #ffffff;
  }

  .mu-item-action {
    justify-content: flex-start !important;
  }

  .mu-avatar-inner img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0;
  }

  /* 弹窗 */

  .mu-dialog-fullscreen {
    height: 80% !important;
    top: auto;
  }
</style>

<style lang="less" scoped>
 // 立即支付按钮
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
  .myorderTabs {
    position: relative;
    border-top: 0.22rem solid #f2f2f2;
    font-size: 0.3rem;
    .orders {
      background: #ffffff;
      padding: 0 0.3rem;
      border-bottom: 0.22rem solid #f2f2f2;
      .creatTime {
        font-size: 0.26rem;
        padding: 0.33rem 0;
        color: #666666;
        .creatTimeStatusSpan {
          color: #fd5962;
          float: right;
        }
        .yiquxiao {
          color: #666666;
        }
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
          margin: 0.26rem 0; // overflow: hidden;
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
      .orderFooter {
        border-top: 1px solid #d8d8d8;
        margin-top: 0.31rem;
        height: 0.85rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .btn {
          width: 1.4rem;
          height: 0.44rem;
          margin-right: 0.2rem;
          line-height: 0.44rem;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px #fd5962;
          color: #fd5962;
          font-size: 0.24rem;
        }
        .orderFooter_btn1 {
          width: 1.4rem;
          height: 0.44rem;
          text-align: center;
          line-height: 0.44rem;
          font-size: 0.24rem;
          color: #666666;
          background: #ffffff;
          border: 1px solid #d8d8d8;
          border-radius: 4px;
          margin-right: 0.2rem;
          outline: none;
        }
        .orderFooter_btn2 {
          width: 1rem;
          height: 0.44rem;
          text-align: center;
          line-height: 0.44rem;
          font-size: 0.24rem;
          color: #fd5962;
          background: #ffffff;
          border: 1px solid #d8d8d8;
          border-radius: 4px;
          outline: none;
        }
      }
    }
    .empty-order{
      font-size:.38rem;
      margin:4rem 0;
      text-align:center;
      color:#ddd;

    }
  }

</style>
