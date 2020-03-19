<template>
  <div class="home">
    <BannerSwiper :bannerData="bannerData"/>
  </div>
</template>

<script>
import BannerSwiper from "@/components/BannerSwiper.vue";
import {getHome} from "@/api/api.js"
import Swiper from "swiper"
import 'swiper/css/swiper.min.css';
export default {
  name: "Home",
  components: {
    BannerSwiper
  },
  data(){
  	return{
  		bannerData:[]
  	}  
  },
  created() {
  	getHome().then(res=>{
  		this.bannerData = res.data.data.banner
  		console.log(this.bannerData)
  		this.$nextTick(() => {
  			this.bannerSwiper()
  		})
  	})
  },
  methods:{
  	  bannerSwiper(){
  	  	new Swiper(".bannerId", {
  	  		// effect: 'coverflow', //3d流
  	  		loop: true, // 循环模式选项
  	  		spaceBetween: 30, //轮播图间距
  	  		slidesPerView:1.3,
  	  		centeredSlides: true, //active slide会居中
  	  		autoplay: {
  	  			delay: 2500,
  	  			stopOnLastSlide: false,
  	  			disableOnInteraction: false,
  	  		},
  	  		pagination: {
  	  			el: '.swiper-pagination',
  	  		},
  	  	});
  	  },
  }
};
</script>
