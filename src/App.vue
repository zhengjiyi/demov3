<template>
  <div id="app">
    <transition name="van-slide-right">
      <keep-alive>
        <router-view class="page" v-if="this.$route.meta.keepAlive" />
		<TabbarLayout v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="van-slide-right">
      <router-view class="page" v-if="!this.$route.meta.keepAlive" />
	  <TabbarLayout v-if="this.$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
import {geturl,getlogin} from "@/api/api.js"	
import TabbarLayout from "@/components/TabbarLayout"	
export default{
	components:{
		TabbarLayout
	},
	data() {
	  return {
	    oldScrollTop: 0
	  };
	},
	created() {
	  let _than = this;
	  var ua = navigator.userAgent.toLowerCase();
	  //判断是不是微信环境
	  if (ua.match(/MicroMessenger/i) == "micromessenger") {
	    let url = window.location.href;
	    let huoqutoken = localStorage.getItem("token");
	    if (huoqutoken === null || huoqutoken == "" ||	huoqutoken == null ||	huoqutoken == "null" ||	huoqutoken == undefined) {
	      if (window.location.href.indexOf("code") == 0 || window.location.href.indexOf("code") <= 0) {
	        geturl({
	          baseUrl: url
	        }).then((res) => {
	          window.location.href = res.data.data;
	        })
	      } else {
	        let code = this.getQueryString("code");
	        getlogin({
	          code: code
	        }).then((res) => {
	          if (res.data.status == 1) {
	            localStorage.setItem("token", res.data.data.token);
	          }
	        })
	      }
	
	    } else {
	      this.getFollow()
	    }
	
	  } else {
	     localStorage.setItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODQ2MTA1ODMsImV4cCI6MTU4NDY0NjU4MywidXNlcl9pZCI6NH0.7UkIIzPsqkZ7ZospdDlKURQZWv8P4jS0dKl0DPUDMdM"); //109 需求  103 专家
	    // window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx14bd7709ff067c4f&redirect_uri=http%3A%2F%2Fzhongcheng.demo.c3w.com.cn%2F%23%2F&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect"
	  }
	
	},
	moutend(){
		document.body.addEventListener("focusin", () => {
		  //软键盘弹起事件
		  /* 获取窗口滚动条高度 */
		  function getScrollTop() {
		    let scrollTop = 0;
		    if (document.documentElement && document.documentElement.scrollTop) {
		      scrollTop = document.documentElement.scrollTop;
		    } else if (document.body) {
		      scrollTop = document.body.scrollTop;
		    }
		    return scrollTop;
		  }
		
		  this.oldScrollTop = getScrollTop() || 0; // 记录当前滚动位置
		});
		
		document.body.addEventListener("focusout", () => {
		  //软键盘关闭事件
		  const ua = window.navigator.userAgent;
		  if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0) {
		    //键盘收起页面空白问题
		    document.body.scrollTop = this.oldScrollTop;
		    document.documentElement.scrollTop = this.oldScrollTop;
		  }
		});
	},
	methods: {
	  getQueryString(name) {
	    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    let r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	      return unescape(r[2]);
	    } else {
	      return null;
	    }
	  },
	  getFollow() {
	    isFollow().then(res => {
	      if (res.data.data == 0) {
	        router.replace("/followUs");
	      }
	    })
	  }
	}
}	
</script>

<style lang="less">
@import "//at.alicdn.com/t/font_1582608_59vhu9sb4qg.css";	
@media (min-width: 750px) {
  .page {
    left: 0;
    width: 375px;
    right: 0;
    padding-top: 46px;
    margin: auto;
  }

  .textarea {
    textarea {
      border-radius: 5px;
      padding: 10px;
    }
  }

  .van-overlay {
    max-width: 375px;
    right: 0;
    margin: auto;
  }

  .van-dialog {
    max-width: 400px;
  }

  div.van-image-preview {
    width: 375px;
    left: 50%;
    margin-left: -375px;
  }

  .van-sticky.van-sticky--fixed {
    width: 375px;
    left: 50%;
    margin-left: -375px;
  }

  
}
</style>
