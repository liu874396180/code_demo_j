<template>
    <div class="weui-msg">
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">温馨提示</h2>
        <p class="weui-msg__desc">请先关注简保科技公众号，才能享受我们的服务。如果之前已经关注过，请取消关注，重新关注即可。</p>
    </div>
    <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
            <img src="/static/images/erweima.jpg" alt="" style="width: 80%">
        </p>
        <p>
            扫描或常按图片关注简保科技公众号
        </p>
    </div>
    <div class="weui-msg__extra-area">
        <div class="weui-footer">
        <p class="weui-footer__links">
            <a href="javascript:void(0);" class="weui-footer__link">网销事业部</a>
        </p>
        <p class="weui-footer__text">Copyright © 2018 </p>
    </div>
  </div>
</div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.weui-msg {
    padding-top: 36px;
    text-align: center;
    .weui-msg__text-area {
        margin-bottom: 25px;
        padding: 0 20px;
        .weui-msg__title {
            margin-bottom: 5px;
            font-weight: 400;
            font-size: 20px;
        }
        .weui-msg__desc {
            font-size: 14px;
            color: #999;
        }
    }
    .weui-msg__opr-area {
        margin-bottom: 25px;
        .weui-btn-area {
            margin: 1.17647059em 15px .3em;
            img{
                width: 80%;
            }
        }
    }
    .weui-msg__extra-area {
        margin-bottom: 15px;
        font-size: 14px;
        color: #999;
        .weui-footer {
            color: #999;
            .weui-footer__links {
                font-size: 0;
                .weui-footer__link {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 .62em;
                    position: relative;
                    font-size: 14px;
                }
                a{
                    color: #586c94;
                }
            }
            .weui-footer__text {
                padding: 0 .34em;
                font-size: 12px;
            }
        }
    }
}
</style>

