<template>
	<div>
		<van-nav-bar
		  title="我的项目"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<Item :dataArr="dataArr"/>
		<div class="no-content" v-if="dataArr.length === 0">
		  <img src="../assets/no-content.png" alt="" />
		  <p><strong>暂无项目</strong></p>
		  <p>暂无项目，快去发布吧~</p>
		</div>
	</div>
	
</template>

<script>
import {getUserBp} from "@/api/api"	
import Item from "@/components/Item.vue"
export default{
	components:{
		Item
	},
	data(){
		return{
			dataArr:[]
		}
	},
	created() {
		getUserBp().then(res=>{
			console.log(res)
			this.dataArr = res.data.date
		})
	},
	methods: {
	  onClickLeft() {
			this.$router.back()
	  },
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
.no-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px;

  p {
	font-size: 14px;
	margin: 0;
	color: #999;
	line-height: 2em;
	strong {
	  color: #000;
	  font-size: 1.2em;
	}
  }

  img {
	width: 120px;
	margin-bottom: 30px;
  }
}
</style>
