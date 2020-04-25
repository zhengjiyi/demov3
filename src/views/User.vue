<template>
	<div class="user">
		<van-row type="flex" justify="space-around">
		  <van-col span="23">
			  <div class="flex">
				  <van-image
				    round
				    width="80"
				    height="80"
				    :src="userInfo.avatar"
				  />
				  <div class="head">
					  <p>{{userInfo.nickname}}</p>
					  <p>{{userInfo.phone}}</p>
				  </div>
				  <div class="xg">
					  <router-link to="/register">修改></router-link>
				  </div>
			  </div>
		  </van-col>
		</van-row>
		<van-grid :border="false" :column-num="2" :gutter="17" square :center="false">
		  <van-grid-item v-for="(item,index) in data" :key="index" @click="show(index)" class="frid_item">
			  <i :class="item.icon"></i>
			  <p class="usr-p"><span class="x"></span><span>{{item.name}}</span></p>
		  </van-grid-item>
		</van-grid>
		<van-popup v-model="showMoel" round lock-scroll  close-icon="close" closeable >
			<div class="shaerBox">
				<p class="shaerp">
					长按下方海报保存<br/>
					将海报分享给好友
				</p>
				<!-- <van-image
				  class="shaer-img"
				  width="90%"
				  height="273"
				  fit="contain"
				  src="../../assets/haibao.png"
				/> -->
				<img class="shaer-img" src="../assets/haibao.jpg" alt="">
				<img class="clone" src="../assets/clone.png" alt="">
			</div>
		</van-popup >
		<Contact ref="showContact"/>
	</div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";	
import Contact from "@/components/Contact"	
export default{
	components:{
		Contact
	},
	data(){
		return{
			info:[],
			showMoel:false,
			data:[
				{
					icon:"iconfont iconxiangmu",
					name:"我的项目"
				},
				{
					icon:"iconfont iconguanyu",
					name:"关于我们"
				},
				{
					icon:"iconfont iconlianxi",
					name:"联系中城"
				},
				{
					icon:"iconfont iconfenxiang",
					name:"邀请好友"
				},
			]
		}
	},
	created() {
		// document.body.style.backgroundColor="#f8f8fa"
		// this.getUserInfo()
	},
	computed: {
		...mapGetters(["userInfo"])
	},
	mounted(){
		this.fetchUserInfo(this.userInfo.id);
		console.log(this.userInfo.nickname)
	},	
	methods:{
		...mapActions(["fetchUserInfo"]),
		show(index){
			console.log(index)
			if(index == 3){
				this.showMoel = true
			}else if(index == 2){
				this.$refs["showContact"].show()
			}else if(index == 0){
				this.$router.push("/project")
			}else if(index == 1){
				window.location.href = "https://mp.weixin.qq.com/s/-wqjwsU_q-ktkfOI_pQAhw"
			}
		},
	},
	
}	
</script>

<style lang="less">
.flex{
	display: flex;
	justify-content: start;
	align-items: center;
	position: relative;
}	
.head{
	margin-left: 10px;
}
.xg{
	float: right;
	position: absolute;
	right: 0;
}
.van-grid-item__content{
	border-radius: 15px;
}
.usr-p{
	margin-top: 80px;
	span{
		vertical-align: middle;
	}
}
.shaerBox{
	width:243px;
	height:364px;
	background:rgba(255,255,255,1);
}
.shaerp{
	font-size:15px;
	font-weight:bold;
	color:rgba(68,68,68,1);
	text-align: center;
}
.shaer-img{
	display:block;
	width: 90%;
	height: 273px;
	margin:0 auto;
}
.clone{
	position:relative;
	top: 20px;
}
.frid_item .iconfont{
	font-size: 26px;
}
.iconxiangmu{
	color: #25A975;
}
.iconguanyu{
	color: #854AC2;
}
.iconlianxi{
	color: #EDCB4F;
}
.iconfenxiang{
	color: #E3417B;
}
@media (min-width:750px) {
	.flex{
		display: flex;
		justify-content: start;
		align-items: center;
		position: relative;
	}	
	.head{
		margin-left: 10px;
	}
	.xg{
		float: right;
		position: absolute;
		right: 0;
	}
	.van-grid-item__content{
		border-radius: 15px;
	}
	.usr-p{
		margin-top: 80px;
		span{
			vertical-align: middle;
		}
	}
	.shaerBox{
		width:243px;
		height:364px;
		background:rgba(255,255,255,1);
	}
	.shaerp{
		font-size:15px;
		font-weight:bold;
		color:rgba(68,68,68,1);
		text-align: center;
	}
	.shaer-img{
		display:block;
		width: 90%;
		height: 273px;
		margin:0 auto;
	}
	.clone{
		position:relative;
		top: 20px;
	}
	.frid_item .iconfont{
		font-size: 26px;
	}
	.iconxiangmu{
		color: #25A975;
	}
	.iconguanyu{
		color: #854AC2;
	}
	.iconlianxi{
		color: #EDCB4F;
	}
	.iconfenxiang{
		color: #E3417B;
	}
}
</style>
