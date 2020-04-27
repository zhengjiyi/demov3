<template>
	<van-popup v-model="visible" position="bottom" :overlay="true">
		<van-picker :columns="columns" @change="onChange" @confirm="onConfirm" show-toolbar/>
	</van-popup>
</template>

<script>
import {getField} from "@/api/api.js"	
export default{
	data(){
		return{
			visible:false,
			columns:[],
			arr:[]
		}
	},
	created() {
		getField().then(res=>{
			this.arr = res.data.data
			this.columns = res.data.data.map(item => item.name)
		})
	},
	methods:{
		onChange(){
			
		},
		show() {
		  this.visible = true;
		},
		hide() {
		  this.visible = false;
		},
		onConfirm(val,idx) {
			console.log(val,idx)
		  this.$emit("confirm",val,idx);
		  this.hide();
		},
	}
}
</script>

<style>
</style>
