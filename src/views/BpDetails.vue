<template>
	<div>
		<van-nav-bar
		  title="BP详情"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<van-row type="flex" justify="space-around">
		  <van-col span="22">
			  <div class="details_head">
				  <van-image  fit="contain" radius="10"  width="81" height="81" lazy-load :src="detail.logo" />
				  <div class="details_head_info">
					  <p class="company_name">{{detail.company_name}}</p>
					  <p class="city">{{detail.city}}</p>
				  </div>
				  <van-tag v-if="detail.status == 0" color="#1767E7">审查中</van-tag>
				  <van-tag v-if="detail.status == 1" color="#9FB534">洽谈中</van-tag>
				  <van-tag v-if="detail.status == 2" color="#9FB534">对接中</van-tag>
				  <van-tag v-if="detail.status == 3" color="#494949">融资失败</van-tag>
				  <van-tag v-if="detail.status == 4" color="#494949">融资失败</van-tag>
			  </div>
			  <div class="details_mj">
			  	<div>
			  		<p>当前轮次及融资需求</p>
			  		<p>{{detail.stage_name}}</p>
			  	</div>
			  	<div class="nth">
			  		<p>所属领域</p>
			  		<p v-for="(item,index) in detail.field_name" :key="index">{{item}}</p>
			  	</div>
			  	<div class="nth">
			  		<p>所属地</p>
			  		<p>{{detail.city}}</p>
			  	</div>
			  </div>
			  <div>
				  <p><span class="x"></span>公司信息：</p>
				  <p>公司全称：{{detail.company_name}}</p>
				  <div>公司简介：<p class="company_desc" v-html="detail.company_desc"></p></div>
			  </div>
			  <div>
				  <p><span class="x"></span>融资经历：</p>
				  <div class="company_desc" v-html="detail.financing"></div>
			  </div>
			  <div>
				  <p><span class="x"></span>商业计划书：</p>
				  <p>{{detail.file_name}}</p>
			  </div>
			  <van-button type="default" class="newBtn" @click="contact">返回</van-button>
		  </van-col>
		</van-row>
	</div>
</template>

<script>
import {bpInfo} from "@/api/api"	
export default{
	data(){
		return{
			detail:[]
		}
	},
	created() {
		const id = this.$route.query.id;
		bpInfo({id}).then(res=>{
			console.log(res)
			this.detail = res.data.date
		})
	},
	methods: {
	  onClickLeft() {
			this.$router.back()
	  },
	  contact(){
		this.$router.back()  
	  }
	},
}		
</script>

<style>
.x{
	margin-left: 0;
}
.details_mj{
	display: flex;
	justify-content: space-between;
	text-align: center;
	align-items: center;
}
	.details_mj div{
		/* margin:10px 0; */
		width: 90px;
		height: 90px;
	}
	.details_mj .nth{
		position: relative;
	}
	
	.details_mj .nth::before{
		content: ' ';
		display: inline-block;
		height:47px;
		 position: absolute;
		top:30%;
		left:-26px;
		border-left:1px solid #CDCDCD;
	}
	.details_mj div p{
		margin:5px 0;
	}
	.details_mj div p:first-child{
		font-size:12px;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.details_mj div p:last-child{
		font-size:14px;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.details_title{
		font-size:18px;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.details_info{
		margin-top:10px ;
		background-color: #fff;
	}
	.details_info_title{
		font-size:17px;
		font-weight:bold;
		color:rgba(51,51,51,1);
		border-bottom: 1px solid #D8D8D8;
		padding:14px 0 14px 15px ;
	}
	.details_info_box{
		margin:0 15px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
.van-nav-bar .van-icon{
	color: #464F57;
}	
.van-nav-bar__title{
	font-size:17px;
	font-weight:400;
	color:rgba(70,79,87,1);
}
.details_head{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.details_head_info{
	margin-left: 19px;
	.company_name{
		font-size:17px;
		font-weight:bold;
		color: #525B63;
	}
	.city{
		font-size:13px;
		font-weight:400;
		color:rgba(94,94,94,1);
	}
	
}
.company_desc{
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
	margin:50px auto 0;
	color: #fff;
	display: flex;
	justify-content: center;
	font-size: 15px;
}
.page{
	margin-bottom: 60px;
}	
</style>
