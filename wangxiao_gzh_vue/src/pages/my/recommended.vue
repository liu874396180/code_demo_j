<template>
  <div>
    <div class="infoTable" v-if="dataList.length">
      <mu-paper class="demo-list-wrap">
        <div class="title">团队列表</div>
        <mu-divider></mu-divider>
        <mu-list style="padding: 0;">
          <router-link :to="{path:'/recommendedOrder',query:{id:item.id}}" v-for="(item,index) in dataList" :key="index" tag="div">
            <mu-divider></mu-divider>
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action class="avatar">
                <img src="static/images/jibenxixin.png">
              </mu-list-item-action>
              <mu-list-item-action class="name1">
                <mu-list-item-title class="name">{{item.name}}</mu-list-item-title>
              </mu-list-item-action>
              <mu-list-item-title>{{item.mobile}}</mu-list-item-title>
              <mu-badge :content="item.tuiJianSum || 0"></mu-badge>
            </mu-list-item>
          </router-link>
        </mu-list>
      </mu-paper>
    </div>
    <div v-else class="tiShi">暂无数据</div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        chenggong: false,
        dataList: []
      }
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    created() {
      this.$nextTick(() => {
        document.title = '我的团队';
        this.getData();
      })
    },
    computed: {

    },
    methods: {
      getData() {
        var that = this;
        this.api.post(
          this.GLOBAL.host + '/ours/agentInfoList', {}
        ).then(function (response) {
          if (response.result) {
            that.dataList = response.data.list;
          } else {
            // that.alertOpen("错误", "保存失败" + response.msg);
          }
        })
      },
    },
  }

</script>
<style lang="less" scoped>
  .tiShi{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    color: #666;
    font-size: 0.28rem;
  }
  .title {
    height: .81rem;
    padding-top: .2rem;
    padding-left: .3rem;
    font-weight: bold;
  }

  .mu-item {
    height: .4rem;
  }

  .mu-item-action {
    margin-right: .5rem;
  }

  .name {
    width: .4rem;
    font-size: .2rem;
  }

  .name1 {
    width: 1.2rem;
  }

  .avatar {
    min-width: .4rem;
  }

  img {
    width: .4rem;
  } // .button {
  //     width: 6.1rem;
  //     padding-left: 1rem;
  //     position: fixed;
  //     bottom: 0;
  //     left: 0;
  //     right: 0;
  //     margin-bottom: .3rem;
  //     .mu-button {
  //         background-color: #e57373;
  //         color: white;
  //     }
  // }

</style>
