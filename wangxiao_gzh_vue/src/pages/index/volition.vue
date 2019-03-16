<template>
    <div class="textInfo">
        <h1 class="title">投保声明</h1>
        <div class="content">
            1、请认真阅读
            <router-link v-for="(item,ind) in dataList" :key="ind" target="_blank" :to="{path:'/xuzhiPdf',query:{pdfUrl:item.url}}" class="color-theme">
               {{'《' + item.termsTitle + '》'}}
            </router-link>
            了解并接受包括有关保障内容以及保额、责任条款及免除责任条款、承保地域限制、费用扣除、退保、保单现金价值、投被保险人义务及线上服务协议的约定。投保人已向被保险人明确说明，并征得其同意。
        </div>
        <div class="content">
            2、投保人兹声明各项内容、职业、告知属实。如投保信息不真实，保险公司将有权解除合同不承担保险责任。
        </div>
        <div class="content">
            3、根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。本人接受电子保单作为合法有效凭证。
        </div>
        <div class="content">
            4、18周岁以下的未成年人身故保险金额以保险事故发生时中国保监会规定的金额限额为准。
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id:this.$route.query.prodictId,
            dataList:[],
        }
    },
    created() {
        this.$nextTick(()=>{
            document.title = '投保声明'
        })
        this.getPdfList();
    },
    methods: {
        getPdfList(){
            var that = this;
            this.api.post(
                this.GLOBAL.host + '/product/getproductTermsList',
               {productId:that.id}
            ).then(function(response) {
                if (response.result) {
                    that.dataList = response.data.list;
                    that.refreshing = false;
                }
            })
        },
    }
}
</script>
<style scoped>
.title{
    margin:15px 0;
    font-size:16px;
    color:#333;
    text-align:center;
}
.content{
    margin:0 15px;
    line-height:2;
    font-size:14px;
    color:#333;
}
.content a{
    color:#fd5962;
}
</style>

