import wx from "weixin-js-sdk";
import {getSignPackage} from "@/api/api.js"
export function initJsSDK(param) {
  // console.log(param)
  let url = window.location.href
  getSignPackage({url:url}).then(res => {
    wx.config({
      debug: false, // 开启调试模式
      appId: res.data.data.appId, // 必填，公众号的唯一标识
      timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.data.signature, // 必填，签名，见附录1
      jsApiList: [
        // 必填，需要使用的JS接口列表，见附录2
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ]
    });
    wx.ready(() => {
      //分享到朋友圈
       // let url = 'http://project.shunqi.web.c3w.cc'
       let img = "http://zhongcheng.demo.yudw.com/static/img/shaerLogo.png"
      wx.onMenuShareTimeline({
        title:param.title, // 分享标题
        link:param.url, // 分享链接
        imgUrl:img, // 分享图标
        desc: param.desc, // 分享描述
        success: function() {
          // 设置成功
          console.log("成功")
        },
        cancel: function () {
        	// 用户取消分享后执行的回调函数
          console.log("取消")
        }
      })

      //分享给朋友
      wx.onMenuShareAppMessage({
        title: param.title, // 分享标题
        desc: param.desc, // 分享描述
        link:param.url, // 分享链接
        imgUrl:img, // 分享图标
        success: function() {
          // 设置成功
          console.log("成功")
        },
        cancel: function () {
        	// 用户取消分享后执行的回调函数
          console.log("取消")
        }
      })
    })
    wx.error(function(res) {
      console.log("wx.error: ", res);
    })
  })
}
