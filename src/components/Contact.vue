<template>
	<van-popup v-model="showMoel" round lock-scroll  close-icon="close" closeable >
		<div class="ewmBox">
			<p class="ewmp">
				请添加平台负责人<br/>
				获取更多信息~
			</p>
			<img class="ewm" src="../assets/m1.png">
			<p class="contact_info">
				电话/微信：13543250693<br/>
				邮箱：zhangc@unspace.cn
			</p>
		</div>
	</van-popup>
</template>

<script>
export default{
	data(){
		return{
			showMoel:false,
		}
	},
	methods:{
		show(){
			this.showMoel = true;
		},
		hide(){
			this.showMoel = false;
		}
	}
}		
</script>

<style lang="less" scoped>
.ewmBox{
	width:243px;
	height:290px;
	border-radius:10px;
}	
.ewm{
	width:105px;
	height: 105px;
	display: block;
	margin: 0 auto;
}	
.contact_info{
	text-align: center;
	font-size:12px;
	font-weight:400;
	color:rgba(68,68,68,1);
	line-height:20px;
}
.ewmp{
	font-size:15px;
	font-weight:bold;
	color:rgba(68,68,68,1);
	line-height:20px;
	text-align: center;
	padding-top: 35px;
}
</style>
