<template>
  <div class="home">
    <BannerSwiper :bannerData="bannerData"/>
	<van-tabs @change="onTabChange" v-model="activeTabIndex" line-width="50px" title-inactive-color="#999999" title-active-color="#444" @click="seltIndex">
	  <van-tab title="全部">
		  <van-list
		  v-model="isUpLoading"
		  :finished="upFinished"
		  :immediate-check="false"
		  :offset="10"
		  finished-text="－已无更多内容－"
		    @load="onLoadList">
			<Item :dataArr="dataArr"/>
		  </van-list>
	  </van-tab>
	  <van-tab title="生物医药">
		  <van-list
		  v-model="isUpLoading"
		  :finished="upFinished"
		  :immediate-check="false"
		  :offset="10"
		  finished-text="－已无更多内容－"
		    @load="onLoadList">
		  			<Item :dataArr="dataArr"/>
		  </van-list>
	  </van-tab>
	  <van-tab title="电子信息">
		  <van-list
		  v-model="isUpLoading"
		  :finished="upFinished"
		  :immediate-check="false"
		  :offset="10"
		  finished-text="－已无更多内容－"
		    @load="onLoadList">
		  			<Item :dataArr="dataArr"/>
		  </van-list>
	  </van-tab>
	</van-tabs>
  </div>
</template>

<script>
import BannerSwiper from "@/components/BannerSwiper.vue";
import Item from "@/components/Item.vue";
import {getHome,getBP} from "@/api/api.js"
import Swiper from "swiper"
import 'swiper/css/swiper.min.css';
export default {
  name: "Home",
  components: {
    BannerSwiper,
	Item
  },
  data(){
  	return{
		activeTabIndex: 0,
  		bannerData:[],
		dataArr:[],
		num:0,
		pageSize: 100, // 每页条数
		pageIndex: 1, // 页码
		dtWinNumberInfos: [], // 请求数据
		isDownLoading: false, // 下拉刷新
		isUpLoading: false, // 上拉加载
		upFinished: false, // 上拉加载完毕
		offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
  	}  
  },
  created() {
  	getHome().then(res=>{
  		this.bannerData = res.data.data.banner
  		this.$nextTick(() => {
  			this.bannerSwiper()
  		})
  	})
	this.getBpData()
  },
  mounted() {
  	let initTabIndex = 0;
  	switch (this.tabName) {
  	  case "intention":
  	    initTabIndex = 0;
  	    break;
  	  case "entrust":
  	    initTabIndex = 1;
  	    break;
  	  case "housing":
  	    initTabIndex = 2;
  	    break;
  	  default:
  	    break;
  	}
  	this.activeTabIndex = initTabIndex;
  },
  computed:{
  	  tabName() {
  		return this.$route.query.tab || "home";
  	  },
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
	  seltIndex(name){
		  this.num = name
		  this.getBpData()
	  },
	  getBpData(){
		  getBP({
		  	field_id:this.num
		  }).then(res=>{
		  	this.dataArr = res.data.date
		  })
	  },
	  // 获取资源表单列表
	  getroadList() {
	    const _self = this
	    getBP({
	      page: _self.pageIndex,
	      num: _self.pageSize,
	      field_id:this.num
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
	          _self.dataArr = rows
	        } else {
	          _self.dataArr = _self.dataArr.concat(rows)
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
	  onTabChange(index) {
	    let name = "home";
	    switch (index) {
	      case 0:
	        name = "home";
	        break;
	      case 1:
	        name = "entrust";
	        break;
	      case 2:
	        name = "housing";
	        break;
	      default:
	        break;
	    }
	    this.$router.replace({ name: "homeTab", query: { tab: name } });
	  },
  }
};
</script>

<style scoped lang="less">
.home{
	margin-bottom:60px;
}
@media (min-width:750px) {
	.home{
		margin-bottom:60px;
	}	
}
</style>
