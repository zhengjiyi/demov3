<template>
	<div class="swiper-container NotiBar">
		<div class="swiper-wrapper" >
			<div class="swiper-slide" v-for="(banner,index) in goodsArr" :key="index" >
				<p class="swp_p van-ellipsis">{{banner.title}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props:["goodsArr"]
}	
</script>

<style scoped lang="less">
.NotiBar{
	height: 45px;
}	
.swp_p{
	width: 250px;
	line-height: 1;
}
</style>
