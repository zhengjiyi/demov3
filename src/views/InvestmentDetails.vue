<template>
	<div>
		<van-nav-bar
		  title="发现详情"
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
			  </div>
			  <div>
				  <p>机构简介：</p>
				  <div class="company_desc" v-html="detail.company_desc"></div>
			  </div>
			  <div>
				  <p>投资偏好：</p>
				  <div class="company_desc" v-html="detail.stage_desc"></div>
			  </div>
			  <van-button type="default" class="newBtn" @click="contact">联系平台</van-button>
		  </van-col>
		</van-row>
		<Contact ref="showContact"/>
	</div>
</template>

<script>
import {investorDetails} from "@/api/api.js"	
import Contact from "@/components/Contact"
export default{
	components:{
		Contact
	},
	data(){
		return{
			detail:[]
		}
	},
	created() {
		let id =this.$route.query.id
		investorDetails({id}).then(res=>{
			console.log(res)
			this.detail = res.data.date
		})
	},
	methods: {
	  onClickLeft() {
			this.$router.back()
	  },
	  contact(){
		this.$refs["showContact"].show()  
	  }
	},
}
</script>

<style scoped lang="less">
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

@media (min-width:750px) {
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
}
</style>
