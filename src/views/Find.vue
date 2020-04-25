<template>
	<div class="find">
		<p><span class="x"></span>热门活动</p>
		<BannerSwiper :bannerData="bannerData"/>
		<p><span class="x"></span>新闻资讯</p>
		<van-list v-model="isUpLoading" :finished="upFinished" :immediate-check="false" :offset="10" finished-text="－暂无更多内容－"
		 @load="onLoadList">
			<FindItem :newsArr="newsArr"/>
		</van-list>
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
		newsArr:[],
		pageSize: 20, // 每页条数
		pageIndex: 1, // 页码
		isDownLoading: false, // 下拉刷新
		isUpLoading: false, // 上拉加载
		upFinished: false, // 上拉加载完毕
		offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
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
	  getroadList() {
	  	const _self = this
	  	getNews({
	  		page: this.pageIndex,
	  		num: this.pageSize
	  	}).then(res => {
	  		if (res.data.status === 1) {
	  			const rows = res.data.date
	  			if (rows == null || rows.length === 0) {
	  				// 加载结束
	  				_self.upFinished = true
	  				return
	  			}
	  			if (rows.length < this.pageSize) {
	  				// 最后一页不足10条的情况
	  				_self.upFinished = true
	  			}
	  			// 处理数据
	  			if (_self.pageIndex === 1) {
	  				_self.newsArr = rows
	  			} else {
	  				_self.newsArr = _self.newsArr.concat(rows)
	  			}
	  		}
	  	}).catch(error => {
	  		this.$dialog.alert({
	  			message: '获取资源列表异常{' + error + '}',
	  			type: 'error'
	  		})
	  	}).finally(() => {
	  		_self.isDownLoading = false
	  		_self.isUpLoading = false
	  	})
	  },
	  // 上拉加载请求方法
	  onLoadList() {
	  	this.pageIndex++;
	  	this.getroadList();
	  	this.isUpLoading = false;
	  },
  }
};
</script>

<style scoped>
.find{
	margin-bottom: 40px;
}	
.find .x{
	vertical-align: middle;
}
</style>
