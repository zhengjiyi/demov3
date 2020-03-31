<template>
	<div>
		<van-cell-group>
		  <van-field v-model="form.title" type="tel" label="项目名称" required/>
		  <van-field v-model="form.company_name" type="text" label="公司名称" required/>
		  <van-field v-model="form.logo" type="text" label="上传LOGO" required/>
		  <van-cell title="一句话简介" :border="false" required/>
		  <van-field
		    v-model="form.one_desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-field v-model="tel" type="text" label="行业领域" required/>
		  <van-field v-model="tel" type="text" label="所在城市" required/>
		  <van-cell title="公司简介" :border="false" required/>
		  <van-field
		    v-model="form.company_desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-field v-model="form.capital_id" type="text" label="融资需求" required/>
		  <van-field v-model="form.stage_id" type="text" label="融资阶段" required/>
		  <van-cell title="融资经历" :border="false" required/>
		  <van-field
		    v-model="form.financing"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-cell title="商业计划书" :border="false" required/>
		</van-cell-group>
		<van-button class="newBtn" type="default" @click="save">保存</van-button>
	</div>
</template>

<script>
import {postBp} from "@/api/api.js"	
export default{
	data(){
		return{
			form:{
				title:"",
				company_name:"",
				logo:"",
				one_desc:"",
				field_id:"",
				city_id:"",
				company_desc:"",
				capital_id:"",
				stage_id:"",
				file:"",
				file_name:"",
				stage_id:"",
				financing:"",
			}
		}
	},
	methods:{
		save(){
			postBp({
				field_name: this.form.field_name,
				title: this.form.title,
				company_name: this.form.company_name,
				logo: this.form.logo,
				one_desc: this.form.one_desc,
				field_id: this.form.field_id,
				city_id: this.form.city_id,
				company_desc: this.form.company_desc,
				capital_id: this.form.capital_id,
				stage_id: this.form.stage_id,
				file: this.form.file,
				stage_id: this.form.stage_id,
				financing: this.form.financing
			}).then(res=>{
				console.log(res)	
			})
		}
	}
}	
</script>

<style scoped>
.newBtn{
	width:158px;
	height:33px;
	background:rgba(222,177,86,1);
	border-radius:33px;
	line-height: 32px;
	margin:0 auto;
	color: #fff;
	display: flex;
	justify-content: center;
	font-size: 15px;
}	
</style>
