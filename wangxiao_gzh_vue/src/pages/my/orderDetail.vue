<template>
    <div class="detail_order">
        <mu-snackbar v-if="dialog.toast" :position="dialog.position" :open="dialog.toast" color="error">
            {{dialog.toastContent}}
        </mu-snackbar>
        <div class="orders">
            <p class="orderHao">订单号：{{dataList.orderNo}} <span v-if="dataList.status != '40'"  @click="changeStuts(dataList.orderNo,dataList.status)" class="creatTimeSpan" :class="{'yiquxiao':dataList.status== '50'}">{{dataList.status== '50'?'已取消':'取消'}}</span></p>
            <p class="creatTime">创建时间：{{dataList.createDate | formatDateTime}}</p>
            <!-- <router-link @click="toNext"> -->
                <div class="orderConent" @click="toNext">
                    <p class="title">{{dataList.productName}}-{{dataList.planName}}</p>
                    <p>被保人:{{dataList.name}}</p>
                    <p>保障期限:{{dataList.dateStart}}至{{dataList.dateEnd}}</p>
                    <p>投保单号:{{dataList.policyNo}}</p>
                    <p>保费:{{dataList.totalPremium | ToFixed}}</p>
                    <img class="fromlogo" :src="GLOBAL.imageRoot+dataList.logo" alt="">
                    <img v-if="dataList.status == '60'" class="guoqi" src="../../../static/images/icon_yiguoqi.png" alt="">
                </div>
            <!-- </router-link> -->
            <!-- <p style="text-align: right;">共一份保单</p> -->
        </div>
         <div class="orderFooter">
            <p class="orderSumP"><span class="orderSum">保费合计</span><span class="money">￥{{dataList.totalPremium | ToFixed}}</span></p>
            <p class="shifuP">实付金额：<span class="shifuMoney">￥{{dataList.totalPremium | ToFixed}}</span></p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'viewOrderDetail',
    data() {
        return{
            orderNo:this.$route.query.orderNo,
            dataList:{},
            dialog: {
                toastTimer: null,
                toast: false,
                position: "top"
            },
        }
    },
    methods:{
        //跳转下一页
        toNext() {
            if(this.dataList.status== '50' || this.dataList.status== '40'){
                return ;
            }else{
                this.$router.push({path:'/policyChange',query:{id:this.dataList.id,policyId:this.dataList.policyId}})
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
      },
        // 取消
      changeStuts(orderNo,status) {
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
            } else {that.openToast("取消失败");}
          })
        }else{
            return;
        }
      },
        getData() {
        var that = this;
        this.api.post(
            this.GLOBAL.host + '/ours/getOrder',
            {"orderNo":that.orderNo}
            ).then(function(response) {
                if (response.result) {
                    // that.openToast("保存成功");
                    that.dataList = response.data.list[0];
                } else {
                    // that.alertOpen("错误", "保存失败" + response.msg);
                }
            })
        },
    },
    created () {
        this.$nextTick(()=>{
            document.title = '订单明细';
            this.getData();
        })
    },
    filters: {
          glass(value) {
               if(value == "1"){
                    return "国产";
               }else if(value == "2"){
                    return "进口";
               }else{
                    return "投保";
               }
          }
    }

}
</script>
<style lang="less" scoped>
.detail_order{
     .orders{
        background: #ffffff;
        padding: 0 0.3rem 0.3rem;
        border-top: 0.22rem solid #f2f2f2;
        .orderHao{
            font-size: 0.26rem;
            padding: 0.33rem 0 0;
        }
        .creatTime{
            font-size: 0.26rem;
            padding: 0.33rem 0;
            color: #666666;
        }
        .creatTimeSpan{
            color: #fd5962;
            float: right;
        }
        .yiquxiao{
            color: #666666;
        }
        .orderConent{
            border:1px solid #d8d8d8;
            padding: 0.34rem 0.19rem 0.21rem;
            font-size: 0.26rem;
            color: #666666;
            min-height: 4.36rem;
            position: relative;
            .fromlogo{
                position: absolute;
                top: 0.34rem;
                right: 0.2rem;
                max-width: 0.56rem;
                max-height: 0.3rem;
            }
            .guoqi{
                position: absolute;
                width: 1.08rem;
                height: 0.82rem;
                top: 1.32rem;
                right: 0.21rem;
            }
            p{
                margin: 0.26rem 0;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                max-width: 5.6rem;
            }
            .title{
                font-size: 0.3rem;
                color: #333333;
                margin-top: 0;
            }
            // .btn{
            //     width: 1.4rem;
            //     height: 0.44rem;
            //     line-height: 0.44rem;
            //     background-color: #ffffff;
            //     border-radius: 8px;
            //     border: solid 1px #5680e0;
            //     color: #5680e0;
            //     font-size: 0.24rem;
            //     float: right;
            // }
        }
    }
    .orderFooter{
        border-top: 0.22rem solid #f2f2f2;
        
        background: #ffffff;
        font-size: 0.26rem;
        line-height: 0.9rem;
        padding: 0 0.3rem;
        .orderSumP{
             height: 0.9rem;
             border-bottom: 1px solid  #d8d8d8;
             .orderSum{
                float: left;
            }
            .money{
                float: right;
                color: #ff6951;
            }
        }
        .shifuP{
             height: 0.9rem;
             text-align: right;
             .shifuMoney{
                 color: #ff6951;
             }
        }

       
    }
}
</style>

