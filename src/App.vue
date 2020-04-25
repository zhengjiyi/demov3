<template>
  <div id="app">
      <keep-alive>
        <router-view class="page" v-if="this.$route.meta.keepAlive" />
		<TabbarLayout v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
      <router-view class="page" v-if="!this.$route.meta.keepAlive" />
	  <TabbarLayout v-if="this.$route.meta.keepAlive"/>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import {geturl,getlogin} from "@/api/api.js"	
import TabbarLayout from "@/components/TabbarLayout"	
import {initJsSDK} from "./wechat.js"
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
		if (this.$store.state.userInfo.id) {
		  this.$store.dispatch("fetchUserInfo", this.$store.state.userInfo.id);
		}
	  initJsSDK()
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
	  let _than = this;
	  var ua = navigator.userAgent.toLowerCase();
	  //判断是不是微信环境
	  if (ua.match(/MicroMessenger/i) == "micromessenger") {
	    let url = window.location.href;
	    let huoqutoken = sessionStorage.getItem("token");
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
	            sessionStorage.setItem("token", res.data.data.token);
	          }
	        })
	      }
	
	    } else {
	      this.getFollow()
	    }
	
	  } else {
	     sessionStorage.setItem("token",1); 
	    // window.location.href ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx14bd7709ff067c4f&redirect_uri=http%3A%2F%2Fzhongcheng.demo.c3w.com.cn%2F%23%2F&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect"
	  }
	
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
	},
	computed: {
		...mapGetters(["userInfo"])
	},
}	
</script>

<style lang="less">
@import "//at.alicdn.com/t/font_1582608_59vhu9sb4qg.css";	
.x{
	width:3px;
	height:17px;
	background:rgba(222,177,86,1);
	border-radius:1.5px;
	display: inline-block;
	margin-left:10px;
	margin-right:5px;
}
@media (min-width: 750px) {
	.x{
		width:3px;
		height:17px;
		background:rgba(222,177,86,1);
		border-radius:1.5px;
		display: inline-block;
		margin-left:10px;
		margin-right:5px;
	}
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
