<template>
	<div>
		<BannerSwiper :bannerData="bannerData"/>
		<FindItem :newsArr="newsArr"/>
	</div>
</template>

<script>
import BannerSwiper from "@/components/BannerSwiper.vue";
import FindItem from "@/components/FindItem.vue";
import {getList,getNews} from "@/api/api.js"
import Swiper from "swiper"
import 'swiper/css/swiper.min.css';
export default {
  components: {
    BannerSwiper,
	FindItem
  },
  data(){
  	return{
  		bannerData:[],
		newsArr:[]
  	}  
  },
  created() {
  	getList().then(res=>{
  		this.bannerData = res.data.data
  		this.$nextTick(() => {
  			this.bannerSwiper()
  		})
  	})
	getNews().then(res=>{
		this.newsArr = res.data.data
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

<style>
</style>
