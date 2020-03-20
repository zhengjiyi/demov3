<template>
	<div>
		<van-row type="flex" justify="space-around" v-for="(item,index) in newsArr" :key="index" class="item_find" @click="info(item)">
			<van-col span="22" class="brt">
				<div class="item_box">
					<div class="info_width">
						<p class="title">{{item.title}}</p>
						<p class="item_time"><span>{{item.add_time}}</span><span>浏览量：{{item.volume_num}}</span></p>
					</div>
					<div>
						<van-image radius="5"  width="122" height="82" lazy-load :src="item.img" />
					</div>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import {newInc} from '@/api/api.js'
	export default {
		props: ["newsArr"],
		methods:{
			info(item){
				if (item.href != "") {
					window.location.href =item.href
					newInc({
						id:item.id
					}).then(res=>{
						console.log(res)
					})
				}else{
					this.$router.push({
					  path: "/findDetails",
					  query: {
					    id: item.id
					  }
					})
				}
			}
		}
	}

</script>

<style scoped lang="less">
	.item_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item_find{
		margin:7px 0;
	}
	.brt{
		border-bottom:1px solid rgba(241,241,241,1);
	}
	.item_time{
		font-size:12px;
		color:rgba(181,181,181,1);
		line-height:26px;
		display: flex;
		justify-content: space-between;
	}
	.title{
		font-size:14px;
		font-weight:bold;
		color:rgba(82,91,99,1);
	}
	.info_width{
		width: 201px;
	}
	
	@media (min-width:750px) {
		.item_box {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.item_find{
			margin:7px 0;
		}
		.brt{
			border-bottom:1px solid rgba(241,241,241,1);
		}
		.item_time{
			font-size:12px;
			color:rgba(181,181,181,1);
			line-height:26px;
			display: flex;
			justify-content: space-between;
		}
		.title{
			font-size:14px;
			font-weight:bold;
			color:rgba(82,91,99,1);
		}
		.info_width{
			width: 201px;
		}
	}
</style>
