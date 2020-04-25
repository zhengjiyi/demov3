import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.productionTip = false;
import {checkRegist,subscribe} from "./api/api.js"

router.onReady(async (to, from) => {
	subscribe().then(res=>{
		// if(res.data.data.subscribe == 0){
		// 	window.location.replace("https://mp.weixin.qq.com/s/e_kFlAUdtNv_6zEe3JxNWA")
		// }
	})
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
  	checkRegist().then(res=>{
  		if(res.data.data == 0){
  			router.replace("/register");
  		}else{
  			next();
  		}
  	})  
  }else{
  	next();  
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
