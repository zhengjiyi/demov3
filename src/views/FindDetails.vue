<template>
	<div>
		<van-nav-bar
		  title="发现详情"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<div>
			<van-row type="flex" justify="space-around">
				<van-col span="22" class="brt">
					<div class="item_time">
						<span>{{info.add_time}}</span>
						<span>浏览量：{{info.volume_num}}</span>
					</div>
					<p class="title">{{info.title}}</p>
					 <van-image radius="5"  width="100%" height="210" lazy-load :src="info.img" />
					<p class="desc" v-html="info.content"></p> 
					<van-button type="default" class="newBtn">返回</van-button>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
import {findDetails} from "@/api/api.js"	
export default {
  data(){
	return{
		info:[]
	}  
  },
  methods: {
    onClickLeft() {
		this.$router.back()
    },
  },
  mounted() {
	let id= this.$route.query.id
  	findDetails({id}).then(res=>{
		console.log(res)
		this.info = res.data.data
	})
  },
}	
</script>

<style scoped>
.van-nav-bar .van-icon{
	color: #464F57;
}	
.van-nav-bar__title{
	font-size:17px;
	font-weight:400;
	color:rgba(70,79,87,1);
}
.item_time{
	font-size:12px;
	color:rgba(181,181,181,1);
	line-height:26px;
	display: flex;
	justify-content: space-between;
}
.title{
	font-size:16px;
	font-weight:bold;
	color:rgba(82,91,99,1);
}
.desc{
	font-size:14px;
	font-weight:400;
	color:rgba(71,71,71,1);
	line-height:25px;
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
}
.page{
	margin-bottom: 60px;
}
@media (min-width:750px) {
	.van-nav-bar .van-icon{
		color: #464F57;
	}	
	.van-nav-bar__title{
		font-size:17px;
		font-weight:400;
		color:rgba(70,79,87,1);
	}
	.item_time{
		font-size:12px;
		color:rgba(181,181,181,1);
		line-height:26px;
		display: flex;
		justify-content: space-between;
	}
	.title{
		font-size:16px;
		font-weight:bold;
		color:rgba(82,91,99,1);
	}
	.desc{
		font-size:14px;
		font-weight:400;
		color:rgba(71,71,71,1);
		line-height:25px;
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
	}
	.page{
		margin-bottom: 60px;
	}
}
</style>
