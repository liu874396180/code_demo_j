<template>
    <!-- <div class="video-box">
        <mu-tabs :value.sync="active1" inverse indicator-color="#fd5962" text-color="rgba(0, 0, 0, .54)"  full-width >
            <mu-tab>点播</mu-tab>
            <mu-tab>直播</mu-tab>
        </mu-tabs>
        <mu-paper ref="container" v-if="active1 === 0">
            <mu-load-more :loading="loading" @load="load">
                <mu-list textline="three-line" class="mulist-self">
                  <a v-for="(ite,index) in haveList" :key="index" :href="'https://p.bokecc.com/qrplay.bo?vid='+ite.id" style="display:block;">
                    <mu-list-item class="botttomLine" :ripple="false">
                        <mu-list-item-action style="position:relative;">
                        <img :src="ite.image">
                        <div class="video-play"><em></em></div>
                        </mu-list-item-action>
                        <mu-list-item-content>
                        <mu-list-item-title class="mb2">{{ite.title}}</mu-list-item-title>
                        <mu-list-item-sub-title class="sub-tit-self">
                            {{ite.desp}}
                        </mu-list-item-sub-title>
                        <div class="money-box">
                          <span class="money">时长:{{ite.duration}}</span>
                        </div>
                        </mu-list-item-content>
                    </mu-list-item>
                  </a>
                </mu-list>
            </mu-load-more>
        </mu-paper>
        <mu-paper ref="container" v-if="active1 === 1">
            <mu-load-more :loading="loading" @load="loadLive">
              <mu-list textline="three-line" class="mulist-self">
                <a :href="'https://view.csslcloud.net/api/view/index?roomid=' + ite.id + '&userid=' + msg" class="displayb" v-for="(ite,index) in liveList" :key="index">
                  <mu-list-item class="botttomLine" :ripple="false">
                      <mu-list-item-action>
                      <img src="/static/images/live-img.jpg">
                      </mu-list-item-action>
                      <mu-list-item-content>
                        <mu-list-item-title style="margin-bottom:.2rem;">{{ite.name}}</mu-list-item-title>
                        <mu-list-item-sub-title class="sub-tit-self" v-html="ite.desc">
                            {{ite.desc}}
                        </mu-list-item-sub-title>
                        <div class="money-box">
                          <span class="money">{{ite.liveStartTime}}</span>
                        </div>
                      </mu-list-item-content>
                  </mu-list-item>
                </a>
                </mu-list>
            </mu-load-more>
        </mu-paper>
    </div> -->
    <div>
        <div class="building">

      </div>
    </div>
</template>
<script>
import { mapActions} from 'vuex';
  export default {
    data() {
      return {
        active1: 0,
        refreshing: false, //刷新
        loading: false, //加载
        haveList: [], //点播list
        liveList:[],  //直播list
        msg:'',
        page:{
          pageNo: 1,
          pageSize: 10,
          total:null,
          pageNum:null
        },
        pagel:{
          pageNo: 1,
          pageSize: 10,
          total:null,
          pageNum:null
        },
        isStop:true,  // 是继续否加载
      }
    },
    created() {
      this.changActiveTabs(2); //触发tabs
      this.$nextTick(() => {
        document.title = '大讲堂'
      })
      this.getVideoListData(); //直播，点播列表
      this.getLiveListData();
    },
    methods: {
      ...mapActions(["changActiveTabs"]),
      //加载更多
      load () {
        let that = this;
        if(!that.isStop){
          return false
        }
        that.page.pageNo = (that.page.pageNo - 0) + 1;
        that.loading = true;
        this.getVideoListData();
      },
      loadLive() {
        let that = this;
        if(!that.isStop){
          return false
        }
        that.pagel.pageNo = (that.pagel.pageNo - 0) + 1;
        that.loading = true;
        this.getLiveListData();
      },
      changeActive(index) {
        this.active = index;
      },
      getVideoListData() {
        let that = this;
        this.api.post(this.GLOBAL.host + '/bokecc/videos',{"pageNo":that.page.pageNo,"pageSize":that.page.pageSize}) //点播列表
        .then(rep => {
            if(rep.result){
              var data = rep.data;
              if(data.list.length){
                data.list.forEach(element => {
                  that.haveList.push(element);
                });
                that.loading = false;
              }else{
                that.isStop = false;
              } 
              that.loading = false;
            }
        });
      },
      getLiveListData() {
        let that = this;
        this.api.post(this.GLOBAL.host + '/bokecc/liveroom',{"pageNo":that.pagel.pageNo,"pageSize":that.pagel.pageSize})
        .then(rep =>  {
            if(rep.result){
              that.msg = rep.msg   
              var data = rep.data;
              if(data.list.length){
                data.list.forEach(element => {
                  that.liveList.push(element);
                });
                that.loading = false;
              }else{
                that.isStop = false;
              }
              that.loading = false;       
            }
        });
      },
    }
  }

</script>
<style lang="less" scoped>
  .video-box {
    .displayb{
      display:block;
    }
    margin-bottom: .28rem;
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
      font-size: .24rem;
    }
    .mb2{
      margin-bottom:.2rem;
    }
    .sub-tit-self {
      display: block;
      margin-bottom: .15rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
    }
    .mu-secondary-text-color{
       color: #fd5962;
    }
    .mu-tab-link-highlight{
       color: #fd5962;
    }
    .mu-tab-active.is-inverse {
      color: #fd5962;
    }
  }
.botttomLine{
    border-bottom: 1px solid #cccccc;
}
.video-play{
  position: absolute;
  left:0;
  top:8px;
  right:0;
  bottom:8px;
  background:rgba(0,0,0,.6);
}
.video-play em{
  display:block;
  width:.4rem;
  height:.4rem;
  margin:.56rem auto;
  background:url(/static/images/play.png) 0 0 no-repeat;
  background-size:cover;
}
.building{
    width:4.75rem;
    height:3.25rem;
    background:url(/static/images/build.png) 0 0 no-repeat;
    background-size:100%;
    display:block;
    margin:3rem auto;
}
</style>