<template>
<div class="infodetail">
    <div class="page-title">{{article.title}}</div>
    <div class="page-date">{{article.date | formatDate}}</div>
    <div class="page-content">
        <p v-html="article.content"></p>
    </div>
</div>
</template>

<script>
export default {
    data (){
        return {
            article: {
                title:"",
                date:"",
                content:"",
                id:this.$route.query.id,
            }
        }
    },
    created() {
        this.$nextTick(()=>{
            document.title = '资讯头条'
        })
        this.getArticle();
    },
    methods: {
        //通过接口获取文章信息
        getArticle(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/index/topLineDetail',
                {"id":that.article.id}
            ).then(function(response) {
                if (response.result) {
                    var data = response.data;
                    that.inloading=false;
                    that.article.title = data.title;
                    that.article.date = data.updateDate;
                    that.article.content = data.comment;
                }
            })
        } 
    }
}
</script>

<style lang="less">
.infodetail{
    padding:0 .3rem;
    font-size:.3rem;
    color:#333;
    line-height:1.5;
    background:#fff;
    min-height:100%;
    .page-title {
        padding-top:.5rem;
        margin:0 0 .35rem;
        font-size: .48rem;
    }
    .page-date {
        margin-bottom:.55rem;
        color: #999;
    }
    .page-content {
        img{
            max-width:100%;
        }
    }
}







</style>
