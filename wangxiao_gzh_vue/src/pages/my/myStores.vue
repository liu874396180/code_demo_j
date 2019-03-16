<template>
  <div>
    <mu-container ref="container" style="padding:0 4px">
      <mu-load-more :loading="loading" @load="load">
      <div class="infoback">
        <div class="avatar" clearfloat>
          <div class="img-wrapper">
            <img v-if="user.photoUrl" :src="GLOBAL.imageRoot + user.photoUrl">
            <img v-else src="static/images/headLogo.png">
          </div>
          <div style="margin-top: .1rem;margin-left: 0.2rem; float:left">
            <span class="nickname">{{user.name}}</span>
            <span class="wxcode">微信号：{{user.wxCode}}</span>
          </div>
        </div>
        <div class="infos clearfix">
          <div style="float:left;">
          <div>{{user.companyName}}</div>
            <!-- <input name="companyName" type="text" v-model="user.companyName" disabled="true">
          </div> -->
          <div>{{user.email}}</div>
            <!-- <input name="email" type="text" v-model="user.email" disabled="true">
          </div> -->
          <div style="position:relative">
            <mu-icon size="15" value="phone" style="position:absolute;top:1px"></mu-icon>
            <div style="display:inline-block;margin-left:16px;">{{user.mobile}}</div>
          </div>
          </div>
          <div  class="toStore">
            <!-- <router-link :to="{path:'/orCode',query:{id:haveId,name:user.name}}">
              <img src="static/images/erweima.jpg">
            </router-link> -->
          </div>
        </div>
      </div>
      <!-- <div class="infoback">

      </div> -->

      <!-- <el-row v-for="(ite,index) in proList" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                <router-link to="productDetail">
                <img :src="ite.imageUrl" style="height: 155px; width: 300px;">
                <div>
                    <span id="name">{{ite.name}}</span>
                    <div class="bottom clearfloat">
                    <span id="subname">{{ite.salePoint}}</span>
                    <span id="price">￥{{ite.minMount}}</span>
                    </div>
                </div>
                </router-link>
                </el-card>
            </el-row> -->
      
      <div class="each-item">
        <div class="ad" v-for="(ite,index) in proList" :key="index">
          <router-link :to="{path:'/productDetail',query:{id:ite.id,agentId:user.id}}">
            <img :src="GLOBAL.imageRoot + ite.imageUrl">
            <div class="product">
              <div class="product-name">
                <span id="name">{{ite.name}}</span>
              </div>
              <div class="product-subname" clearfloat >
                <span id="subname">{{ite.salePoint}}</span>
                <span id="price">¥{{ite.minMount}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      </mu-load-more>
    </mu-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        refreshing: false, //刷新
        loading: false, //加载
        pageSize:"10", // 每页数量
        pageNo:"1",    // 当前页码
        isStop:true,  // 是继续否加载
        user: {
          name: "",
          wxCode: "",
          companyName: "",
          email: "",
          mobile: ""
        },
        proList: [],
        toEditor: this.$route.query.editor, // 是否本人登陸
        haveId: this.$route.query.id, // 地址栏id 代理人id
        pageNo: 1, //当前页数
        pageSzie: 10, // 每页条数
        dataList: [],
        num: 30,
        text: "List"
      };
    },
    created() {
      this.wshare();
      this.$nextTick(() => {
        document.title = "个人店铺";
        this.getData();
      });
    },
    methods: {
      //分享
        wshare(){
            var that = this;
            let locurl = ()=>{
                // #/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
                return location.hash.substring(1);
            }
            // let url = this.GLOBAL.host + 
           // let url = "https://emarking-wap.vip-jb.com/router=" + location.hash.substring(2).replace("?","_").replace("&","__");;
          let url = location.href.split("#")[0];
          // https://emarking-wap.vip-jb.com/productDetail?id=99e59be885b94bd19233ecc5a2f77e75&salesCommisionRate
            // alert(url)
            this.api.post(
                this.GLOBAL.host + '/notify/sfjk/wxShareShop',
                {linkUrl: url,agentId:that.haveId}
            ).then(function(response) {
                if (response.result) {
                    that.$wxsdk.wxstart(response.data,url)
                }
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
          this.GLOBAL.host + "/ours/personalStore", 
            {pageSize:that.pageSize,pageNo:that.pageNo,id: that.haveId}
        ).then(function (response) {
          if (response.result) {
            var data = response.data;
            if(data.product.length){
              data.product.forEach(element => {
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
        this.refreshing = true;
        this.pageNo = "1";
        this.getData();
        this.isStop = true;
      },

      getData() {
        let that = this;
        this.api
          .post(this.GLOBAL.host + "/ours/personalStore", {
            pageSize:that.pageSize,pageNo:that.pageNo,id: that.haveId
          })
          .then(function (response) {
            if (response.result) {
              that.user = response.data.AgentInfo;
              that.proList = response.data.product;
              that.refreshing = false;
            }
          });
      }
    }
  };

</script>

<style lang="less" scoped>

 
  .infoback {
    background-color: #fd5962;
    width: 100%;
    height: 3.6rem;
    margin-top: 0.3rem;
    border-radius: 5px;

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

    .avatar {
      padding-top: 0.4rem;
      padding-left: 0.4rem;
      overflow: hidden;

      .img-wrapper {
        float: left;
        border-radius: 5px;
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
        // margin-left: 0.1rem;
        // margin-top: 0.1rem;
        vertical-align: middle;
        border-radius: 50%;
      }

      .nickname {
        color: #fff;
        display: block;
        font-size: 0.36rem;
      }

      .wxcode {
        color: white;
        display: block;
        font-size: 0.3rem;
      }

      .edit {
        margin-right: 0.5rem;
        margin-top: 0.25rem;
        border: none;
        background: transparent;
        color: white;
        display: block;
        float: right;
        font-size: 0.26rem;
        .btn {
          border: none;
          background: transparent;
          color: white;
        }
      }
    }

    .infos {
      margin-left: 1.7rem;
      margin-top:0.5rem;
      color: white;
      line-height: 0.45rem;
      font-size: 0.26rem;
      input {
        height: 0.4rem;
        color: white;
        border: none;
        background: none; //margin-left: 0.4rem;
        // .mobile {
        //     position: fixed;
        // }
      }

      mu-icon {
        margin-left: 0.3rem;
      }

      span {
        width: 1rem;
      }
      .toStore{
        float:right;
        display:block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
        margin-top: 0.2rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .ad {
    margin-top: 0.3rem;
    width: 100%;
    background: #fff;
    border: 0.1px solid #d8d8d8;
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 0.1rem;
    img {
      height: 4.12rem;
      width: 100%;
      border-radius: 5px;
      display: block;
      margin-bottom: 0.1rem;
    }

    .product-name {
      color: #333;
      font-size: 0.3rem;
      padding-left: 10px;
      padding-right: 10px;
      span:first-of-type{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* width: 100%; */
        display: block;
        margin-bottom: 5px;
      }
    }

    .product-subname {
      padding-left: 10px;
      padding-right: 10px;
      
      // justify-content: space-between;
    }
    #subname {
      font-size: 0.24rem;
      color: #666;
      display: block;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 216px;
    }

    #price {
      color: #ff3339;
      display: block;
      float: right;
      font-weight: bold;
      font-size: 15px;
    }
  }

</style>
