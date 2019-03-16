<template>
<div class="LeveltwoBox">
    
    <mu-paper ref="container">
      <mu-load-more :loading="loading" @load="load">
        <router-link v-for="(item,index) in dataList" :key="index" :to="{path:'/infoDetail',query:{id:item.id}}" tag="div" class="infoLists">
            <mu-row gutter>
                <mu-col span="8"><div class="grid-cell">{{item.title}}</div></mu-col>
                <mu-col span="4"><div class="grid-cell infoListRight">{{item.updateDate | formatDate}}</div></mu-col>
            </mu-row>
        </router-link>
      </mu-load-more>
    </mu-paper> 
</div>
</template>

<script>
export default {
    data (){
        return {
            dataList:[],
            refreshing: false, //刷新
            loading: false, //加载
            pageSize:"10", // 每页数量
            pageNo:"1",    // 当前页码
            isStop:true,  // 是继续否加载
        }
    },
    created() {
        this.$nextTick(()=>{
            document.title = '资讯列表'
        })
        this.getArticle();
    },
    methods: {
        getArticle(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/index/topLineList',
               {pageSize:that.pageSize,pageNo:that.pageNo}
            ).then(function(response) {
                if (response.result) {
                    that.dataList = response.data.list;
                    that.refreshing = false;
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
          this.GLOBAL.host + '/index/topLineList', 
            {pageSize:that.pageSize,pageNo:that.pageNo}
        ).then(function (response) {
          if (response.result) {
            var data = response.data;
            // that.inloading = false;
            if(data.list.length){
              data.list.forEach(element => {
                that.dataList.push(element);
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
        this.getArticle();
        this.isStop = true;
      }, 
    }
}
</script>

<style lang="less">
.infoLists{
    font-size: 0.3rem;
    color: #333333;
    padding: 0.3rem;
    .infoListRight{
        text-align: right;
    }
}
.grid-cell{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
    
</style>
