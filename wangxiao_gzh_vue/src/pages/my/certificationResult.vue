<template>
    <div  class="renzhen_result">
        <div v-if="status == '10'" class="ing">
            <div class="waiting certifi-pic"></div>
            <p class="text">请稍后，您的认证正在审核中…</p>
        </div>
        <div v-if="status == '30'" class="failed">
            <div class="failed certifi-pic"></div>
            <p class="text">啊哦，您的认证失败了，请重新认证</p>
        </div>
         <div v-if="status == '20'" class="xiaolian">
            <div class="success certifi-pic"></div>
            <p class="text">恭喜您，您的认证已成功！</p>
        </div>
    </div>
</template>
<script>
export default {
    props:['status'],
    data() {
        return{
            
        }
    },
}
</script>
<style lang="less" scoped>
.renzhen_result{
    text-align: center;
    padding-top: 1.73rem;
    color: #999999;
    font-size: 0.36rem;
    .ing{
        img{
           width: 1.98rem;
           height: 2.63rem; 
        }
        .text{
            margin-top: 1.02rem;
        }
    }
    .failed{
        img{
           width: 2.64rem;
           height: 2.63rem; 
        }
        .text{
            margin-top: 1.02rem;
        }
    }
    .xiaolian{
        img{
           width: 2.72rem;
           height: 2.70rem; 
        }
        .text{
            margin-top: 1.02rem;
        }
    }
    .waiting{
        width:1.98rem;
        height:2.63rem;
        margin:0 auto;
        background:url(/static/images/shenheing.png) 0 0 no-repeat;
        background-size:cover;
    }
    .failed{
        width:2.64rem;
        height:2.64rem;
        margin:0 auto;
        background:url(/static/images/shibai.png) 0 0 no-repeat;
        background-size:cover;
    }
    .success{
        width:2.7rem;
        height:2.7rem;
        margin:0 auto;
        background:url(/static/images/xiaolian.png) 0 0 no-repeat;
        background-size:cover;
    }
}
</style>
