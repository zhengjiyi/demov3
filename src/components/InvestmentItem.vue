<template>
	<div>
		<van-row type="flex" justify="space-around" v-for="(item,index) in newsArr" :key="index" class="item_find" @click="info(item)">
			<van-col span="22" class="brt">
				<div class="item_box">
					<div>
						<van-image  fit="contain" radius="10"  width="81" height="81" lazy-load :src="item.logo" />
					</div>
					<div class="info_width">
						<p class="title">{{item.company_name}}</p>
						<p class="van-multi-ellipsis--l2 company_desc" v-html="item.company_desc"></p>
						<p class="item_time"><span>{{item.add_time}}</span><span>浏览量：{{item.volume_num}}</span></p>
					</div>
					
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
	export default {
		props: ["newsArr"],
		methods:{
			info(item){
				this.$router.push({
				  path: "/details",
				  query: {
					id: item.id
				  }
				})
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
		width: 248px;
	}
	.company_desc{
		font-size:12px;
		font-weight:400;
		color:rgba(94,94,94,1);
		line-height:17px;
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
			width: 248px;
		}
		.company_desc{
			font-size:12px;
			font-weight:400;
			color:rgba(94,94,94,1);
			line-height:17px;
		}
	}
</style>
