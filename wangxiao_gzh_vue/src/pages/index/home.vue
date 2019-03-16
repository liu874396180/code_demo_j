<template>
  <div class="home-box">
    <mu-carousel :active="active" hide-controls class="self-banner">
      <mu-carousel-item v-for="(item,index) in bannerList" :key="index">
        <!-- <router-link :to="{path:item.linkUrl}">
          <img :src="GLOBAL.imageRoot+item.url">
        </router-link> -->
        <a :href="item.linkUrl">
          <img :src="GLOBAL.imageRoot+item.url">
        </a>
      </mu-carousel-item>
    </mu-carousel>
    <div class="info-box" id="nwwest-roll">
      <router-link to="/infoList"><em class="info-bg"></em></router-link>
      <i></i>
      <div id="roll-ul" class="scrolltxt" :style="{ top }">
        <router-link v-for="(item,index) in infoList" :key="index" :to="{path:'/infoDetail',query:{id:item.id}}">{{item.title}} </router-link>
      </div>
    </div>
    <mu-paper ref="container">
      <mu-load-more  :loading="loading" @load="load">
        <mu-list textline="three-line" class="mulist-self">
          <mu-list-item class="botttomLine" v-for="(ite,index) in proList" :key="index" :ripple="false" button :to="{path:'/productDetail',query:{id:ite.id,salesCommisionRate:ite.commisionRate}}">
            <mu-list-item-action>
              <img :src="GLOBAL.imageRoot + ite.imageUrl">
            </mu-list-item-action>
            <mu-list-item-content style="min-height: 1.8rem;position: relative;">
              <mu-list-item-title style="">{{ite.name}}</mu-list-item-title>
              <mu-list-item-sub-title class="sub-tit-self">
                {{ite.salePoint}}
              </mu-list-item-sub-title>
              <p class="" style="margin: 0.1rem 0;color: #ff3339;font-size: 0.24rem;">
                 <span class="" v-if="ite.commisionRate && (switchOnOff-0 !=1)">推广费{{ite.commisionRate}}%</span>
                <!-- <span class="amount">推广费{{ite.commisionRate}}%</span> -->
              </p>
              <div class="money-box">
                <span class="money">￥{{ite.minMount}}起</span>
                <span style="float:right;color:#999;">销量{{ite.salesNum}}</span>
              </div>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-load-more>
    </mu-paper>
  </div>
</template>


<script> 
import { mapActions} from 'vuex';
  export default {
    data() {
      return {
        switchOnOff:"0", // 是否隐藏佣金
        refreshing3: false, //刷新
        loading: false, //加载
        active: 0,
        activeIndex: 0,
        infoList: [], //资讯列表
        bannerList: [], //轮播图列表
        proList: [], //产品列表
        pageSize:"10", // 每页数量
        pageNo:"1",    // 当前页码
        isStop:true,  // 是继续否加载
      }
    },
    
    created() {

      this.changActiveTabs(0); //触发tabs
      this.$nextTick(() => {
        document.title = '首页'
      })
      window.sessionStorage.loading = "bieshanla";
      this.getSwitch();
      this.getBanner(); //轮播图
      this.getInfo(); //头条
      this.getProList(); //产品列表
      this.wshare();
  //     if (typeof WeixinJSBridge == "undefined") {
	//     if (document.addEventListener) {
	//         document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
	//     } else if (document.attachEvent) {
	//         document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
	//         document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
	//     }
	// } else {
	//     this.onBridgeReady();
	// }
        
    //    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //      // 通过下面这个API隐藏右上角按钮
    //      WeixinJSBridge.call('hideOptionMenu');
    //    });
      
      
      
    },
    computed: {
      top() {
        return -this.activeIndex * .9 + 'rem';
      }
    },
    mounted() {
      this.$nextTick(() => {
          setInterval(_ => {
            if (this.activeIndex + 1 < this.infoList.length) {
              this.activeIndex += 1;
            } else {
              this.activeIndex = 0;
            }
          }, 1500);
      });



    },
    methods: {
      ...mapActions(["changActiveTabs"]),
      //  onBridgeReady() {
      //     WeixinJSBridge.call('hideOptionMenu');
      // },
      //分享
      wshare(){
          var that = this;
          
          // let url = this.GLOBAL.host + 
          // let url = "https://emarking-wap.vip-jb.com/router=" + location.hash.substring(2).replace("?","_").replace("&","__");;
        let url = location.href.split("#")[0];
        // https://emarking-wap.vip-jb.com/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
          // alert(url)
          this.api.post(
              this.GLOBAL.host + '/notify/sfjk/wxShareIndex',
              {linkUrl: url}
          ).then(function(response) {
              if (response.result) {
                  that.$wxsdk.wxstart(response.data,url)
                  
              }
          })
      },
      getSwitch() {
            var that = this;
            this.api.post(this.GLOBAL.host + '/ours/essentialInformation',{})
            .then(rep => {
                if(rep.result){
                    that.switchOnOff = rep.data.switchOnOff;
                }else{
                }
            }).catch((e)=>{
            })
        },
      // 加载更多
      load() {
        let that = this;
        if(!that.isStop){
          return false
        }
        that.pageNo = (that.pageNo - 0) + 1;
        that.loading = true;
        this.api.post(
          this.GLOBAL.host + '/index/recProductsList', 
            {pageSize:that.pageSize,pageNo:that.pageNo}
        ).then(function (response) {
          if (response.result) {
            var data = response.data;
            window.sessionStorage.loading = "";
            if(data.list.length){
              data.list.forEach(element => {
                that.proList.push(element);
              });
              that.loading = false;
            }else{
              that.isStop = false;
            }
            that.loading = false;
          }
        })
      },
      // 下拉刷新
      refresh() {
        // 
        this.refreshing3 = true;
        this.pageNo = "1";
        this.getProList();
        this.isStop = true;
      },
      changeActive(index) {
        this.active = index;
      },
      //获取轮播图
      getBanner() {
        let that = this;
        this.api.post(
          this.GLOBAL.host + '/index/banner',{}
        ).then(function (response) {
          if (response.result) {
            window.sessionStorage.loading = "";
            var data = response.data;
            that.bannerList = data.list.list;
          }
        })
      },
      //获取资讯
      getInfo() {
        let that = this;
        this.api.post(
          this.GLOBAL.host + '/index/topLineList', {
            recommendFlag: 1
          }
        ).then(function (response) {
          if (response.result) {
            window.sessionStorage.loading = "";
            var data = response.data;
            that.infoList = data.list;
          }
        })
      },
      //获取产品列表
      getProList() {
        let that = this;
        this.api.post(
          this.GLOBAL.host + '/index/recProductsList', 
            {pageSize:that.pageSize,pageNo:that.pageNo}
        ).then(function (response) {
          if (response.result) {
            var data = response.data;
            window.sessionStorage.loading = "";
            // that.inloading = false;
            //alert(that.refreshing3)
            //that.refreshing3 = false;
            that.proList = data.list;
           
          }
        })
      }
    }
  }

</script>
<style lang="less" scoped>
  .home-box {
    margin-bottom: 1rem;
    // 轮播图
    .self-banner{
      img{
        width:100%;
        height:100%;
      }
    }
    .info-box {
      position: relative;
      margin-bottom: .2rem;
      padding: 0 .3rem 0 2.2rem;
      height: .9rem;
      line-height: .9rem;
      font-size: .26rem;
      background: #fff;
      overflow: hidden;
      .info-bg {
        display: block;
        position: absolute;
        left: .3rem;
        top: .3rem;
        width: 1.18rem;
        height: .28rem;
        background: url(/static/images/info-bg.png) 0 0 no-repeat;
        background-size: cover;
      }
      i {
        display: block;
        position: absolute;
        left: 1.8rem;
        top: .3rem;
        width: 1px;
        height: .36rem;
        background: #d8d8d8;
      }
      .scrolltxt {
        position: relative;
        transition: top 0.5s;
        overflow: hidden;
        a {
          height: .9rem;
          line-height: .9rem;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #666;
        }
      }
    }
    .mu-item-action {
      min-width: 2.88rem;
      width: 2.88rem;
      margin-right: .2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .money-box {
      color: #ff3339;
      line-height: .26rem;
      position: absolute;
      width: 100%;
      bottom: 0;
      .money {
        float: left;
        font-weight: bold;
        font-size: .36rem;
      }
    }
    .sub-tit-self {
      display: block !important;
      // margin-bottom: .2rem;
      text-overflow: ellipsis;
      white-space: nowrap !important;
      width: 100%;
      overflow: hidden;
    }
  }
.botttomLine{
      border-bottom: 1px solid #cccccc;
}
</style>
