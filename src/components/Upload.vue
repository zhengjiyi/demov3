<template>
	<div class="Uploads">
		<van-uploader v-model="fileList" multiple :max-count="1"  :after-read="afterRead" />
		<!-- <van-uploader v-model="fileList" :max-count="4" image-fit="cover" accept="image/*" preview-full-image :after-read="flop" /> -->
	</div>
</template>

<script>
	import {
		uploadFile
	} from "@/api/api.js"
	export default {
		data() {
			return {
				fileList: [],
			}
		},
		methods: {
			afterRead(files) {
				let formData = new FormData();
				if (files && files.length) {
					files.forEach(item => {
						formData.append("file", item.file)
					})
				} else {
					formData.append("file", files.file)
				}
				uploadFile({
					file: formData
				}).then((res) => {
					if (res.data.status == 1) {
						this.$emit("upImgs", res.data.data)
						// this.$toast(res.data.msg)
					} else {
						this.$toast(res.data.msg)
					}
				})
			}
		},
		mounted() {}
	};
</script>

<style lang="less">
</style>
