<template>
	<div>
		<van-list v-model="isUpLoading" :finished="upFinished" :immediate-check="false" :offset="10" finished-text="－已无更多内容－"
		 @load="onLoadList">
			<InvestmentItem :newsArr="newsArr" />
		</van-list>
	</div>
</template>

<script>
	import {
		investorList
	} from "@/api/api.js"
	import InvestmentItem from "@/components/InvestmentItem.vue";
	export default {
		components: {
			InvestmentItem
		},
		data() {
			return {
				newsArr: [],
				pageSize: 300, // 每页条数
				pageIndex: 1, // 页码
				isDownLoading: false, // 下拉刷新
				isUpLoading: false, // 上拉加载
				upFinished: false, // 上拉加载完毕
				offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
			}
		},
		created() {
			investorList().then(res => {
				console.log(res)
				this.newsArr = res.data.date
			})
		},
		methods: {
			getroadList() {
				const _self = this
				investorList({
					page: this.pageIndex,
					num: this.pageSize
				}).then(res => {
					if (res.data.status === 1) {
						const rows = res.data.date
						if (rows == null || rows.length === 0) {
							// 加载结束
							_self.upFinished = true
							return
						}
						if (rows.length < this.pageSize) {
							// 最后一页不足10条的情况
							_self.upFinished = true
						}
						// 处理数据
						if (_self.pageIndex === 1) {
							_self.newsArr = rows
						} else {
							_self.newsArr = _self.newsArr.concat(rows)
						}
					}
				}).catch(error => {
					this.$dialog.alert({
						message: '获取资源列表异常{' + error + '}',
						type: 'error'
					})
				}).finally(() => {
					_self.isDownLoading = false
					_self.isUpLoading = false
				})
			},
			// 上拉加载请求方法
			onLoadList() {
				this.pageIndex++;
				this.getroadList();
				this.isUpLoading = false;
			},
		}
	}
</script>

<style scoped>
.page{
	margin-bottom: 60px;
}	
@media (min-width:750px) {
	.page{
		margin-bottom: 60px;
	}	
}
</style>
