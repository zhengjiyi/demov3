<template>
	<div class="user">
		<van-row type="flex" justify="space-around">
		  <van-col span="23">
			  <div class="flex">
				  <van-image
				    round
				    width="80"
				    height="80"
				    src="https://img.yzcdn.cn/vant/cat.jpeg"
				  />
				  <div class="head">
					  <p>122121</p>
					  <p>213123132</p>
				  </div>
				  <div class="xg">
					  修改>
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
import Contact from "@/components/Contact"	
export default{
	components:{
		Contact
	},
	data(){
		return{
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
		document.body.style.backgroundColor="#f8f8fa"
	},
	methods:{
		show(index){
			console.log(index)
			if(index == 3){
				this.showMoel = true
			}else if(index == 2){
				this.$refs["showContact"].show()
			}
		}
	}
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

</style>
