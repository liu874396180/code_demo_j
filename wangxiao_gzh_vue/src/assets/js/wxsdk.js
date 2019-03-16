export default {
  jsSDK(opthions, func) {
    let params = {
      'appId': opthions.appId, // 公众号名称，由商户传入
      'timeStamp': opthions.timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': opthions.nonceStr, // 随机串
      'package': "prepay_id=" + opthions.prepayId,
      'signType': 'MD5', // 微信签名方式：
      'paySign': opthions.sign // 微信签名
    };
    //alert("is+"+JSON.stringify(test));
    if (typeof window.WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(params, func), false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(params, func))
        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(params, func))
      }
    } else {
      this.onBridgeReady(params, func);
    }
  },
  onBridgeReady(params, func) {
    try {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': params.appId, // 公众号名称，由商户传入
          'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': params.nonceStr, // 随机串
          'package': params.package,
          'signType': 'MD5', // 微信签名方式：
          'paySign': params.paySign // 微信签名
        },
        function (res) {
          console.log(res.err_code + res.err_desc);
          console.log(res.err_msg);
          //alert(JSON.stringify(res));
          //alert(res.err_code + res.err_desc);
          //alert(res.err_msg);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //alert("支持成功");// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            //window.location.href = ;
            if (func) {
              func();
            }
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            alert("取消支付");
          } else {
            alert(res.err_code + res.err_desc);
            alert(res.err_msg);
          }
        }
      )
    } catch (e) {
      alert(JSON.stringify(e))
    }
  },
  wxstart(data, url) {
    var url = url + "#" + location.href.split("#")[1]; //分享的文章地址
    var appId = data.appId;
    var timestamp = data.timestamp;
    var noncestr = data.noncestr;
    var signature = data.signature;
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function () {
      var imgurl = data.imgUrl;
      var title = data.title;
      var desc = data.desc;
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        success: function () {
          // alert("分享成功");
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // alert("分享取消");
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // alert("分享成功");
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // alert("分享取消");
          // 用户取消分享后执行的回调函数
        }
      });

      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: url, // 分享链接
        imgUrl: imgurl, // 分享图标
        success: function () {
          // alert("分享成功");
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // alert("分享取消");
          // 用户取消分享后执行的回调函数
        }
      });
    });
  },

}
