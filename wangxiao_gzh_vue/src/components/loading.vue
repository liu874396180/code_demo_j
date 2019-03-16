<template>
    <div class="loading">
        <img src="/static/images/houzie.gif" alt="">
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.loading{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    z-index: 99999999;
    background:rgba(0,0,0,.4);
}
img{
    width:125px;
    position:absolute;
    left:50%;
    margin-left:-75px;
    top:50%;
    margin-top:-60px;

}
</style>
