<template>
  <div class="home">
    <BannerSwiper :bannerData="bannerData"/>
	<van-row type="flex" justify="space-around">
	  <van-col span="23">
		  <div class="box-w">
			  <p>喜讯</p>
			  <span class="x"></span>
			  <NotiBar :goodsArr="goodsArr"/>
		  </div>
	  </van-col>
	</van-row>
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
	<van-button to="/submintbp" class="newBtn" type="default" >提交BP</van-button>
  </div>
</template>

<script>
import BannerSwiper from "@/components/BannerSwiper.vue";
import NotiBar from "@/components/NotiBar.vue";
import Item from "@/components/Item.vue";
import {getHome,getBP} from "@/api/api.js"
import Swiper from "swiper"
import 'swiper/css/swiper.min.css';
export default {
  name: "Home",
  components: {
    BannerSwiper,
	Item,
	NotiBar
  },
  data(){
  	return{
		activeTabIndex: 0,
  		bannerData:[],
		dataArr:[],
		goodsArr:[],
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
		this.goodsArr = res.data.data.goods_news
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
		new Swiper(".NotiBar", {
			 direction: 'vertical', 
			loop: true, 
			centeredSlides: true, 
			autoplay: {
				delay: 2500,
				stopOnLastSlide: false,
				disableOnInteraction: false,
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
.box-w{
	display: flex;
	justify-content: center;
	align-items: center;
}
.newBtn{
	width:158px;
	height:33px;
	background:rgba(222,177,86,1);
	border-radius:33px;
	line-height: 32px;
	margin:0 auto;
	color: #fff;
	display: flex;
	justify-content: center;
	font-size: 15px;
	position: fixed;
	left: 50%;
	bottom: 80px;
	transform: translateX(-50%);
}	
@media (min-width:750px) {
	.home{
		margin-bottom:60px;
	}	
}
</style>
