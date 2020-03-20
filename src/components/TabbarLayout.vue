<template>
	<van-tabbar :value="activeTabIndex" fixed z-index="55" :safe-area-inset-bottom="true" active-color="#DEB156" inactive-color="#666">  
		<van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="(item.name)" replace>
			 <van-icon :class="props.active?item.active:item.icon" slot-scope="props" class-prefix='icon' slot="icon"></van-icon>
			<span>{{item.title}}</span>
			<!-- <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" /> -->
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				tabbars: [
					{
						name: "/home",
						title: "首页",
						icon:"iconfont iconshouye",
						active:"iconfont iconshouye1",
					},
					{
						name: "/investment",
						title: "投资",
						icon:"iconfont icontouzi",
						active:"iconfont icontouzi1",
					},
					{
						name: "/find",
						title: "发现",
						icon:"iconfont iconfaxian",
						active:"iconfont iconfaxian1",
					},
					{
						name: "/user",
						title: "我的",
						icon:"iconfont iconwode",
						active:"iconfont iconwode1",
					},
				]
			}
		},
		computed: {
			activeTabIndex() {
				const routeName = this.$route.path;
				switch (routeName) {
					case "/home":
						return 0;
					case "/investment":
						return 1;
					case "/find":
						return 2;
					case "/user":
						return 3;
					default:
						return 0;
				}
			}
		},
		created() {
			if (this.$route.name == "/home") {
				this.active = 0;
			} else if (this.$route.name == "/investment") {
				this.active = 1;
			} else if (this.$route.name == "/find") {
				this.active = 2;
			} else if (this.$route.name == "/user") {
				this.active = 3;
			}
		},
		methods: {
			onChange(index) {
				console.log(index)
			}
		},

	}
</script>

<style lang="less">
@media (min-width:750px) {
	.page .van-tabbar,
	.page .van-nav-bar {
	  width: 750px;
	  left: 0;
	  right: 0;
	  margin: auto;
	}
}
</style>
