<template>
	<div>
		<van-nav-bar
		  title="提交BP"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<van-cell-group>
		  <van-field v-model="form.title" input-align="right" type="text" label="项目名称" required/>
		  <van-field v-model="form.company_name" type="text" input-align="right" label="公司名称" required/>
		  <van-field  type="text" label="上传LOGO" required>
			  <template slot="button">
				<Upload @upImgs="upImgs"/>
			  </template>
		  </van-field>
		  <van-cell title="一句话简介" :border="false" required/>
		  <van-field
		    v-model="form.one_desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-field readonly input-align="right" placeholder="请选择行业领域" v-model="lyName" @click="showLy" type="text" is-link label="行业领域" required/>
		  <van-field readonly input-align="right" placeholder="请选择所在城市" @click="showArea" v-model="cityName" type="text" is-link label="所在城市" required/>
		  <van-cell title="公司简介" :border="false" required/>
		  <van-field
		    v-model="form.company_desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-field readonly input-align="right" @click="showCapital" v-model="capital_name" is-link type="text" label="融资需求" required/>
		  <van-field readonly input-align="right" @click = "showStage" v-model="stage_name" is-link type="text" label="融资阶段" required/>
		  <van-cell title="融资经历" :border="false" required/>
		  <van-field
		    v-model="form.financing"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		  <van-field
		    required
		    label="商业计划书"
		    readonly
			:border="false"
		  >
		    <template #button>
		  				<span v-if="form.file_name" class="flileClass van-ellipsis">{{form.file_name}}</span>
		  	  <van-uploader :after-read="uploads" accept=".doc,.docx,pdf">
		  		<van-button  class="btnColor" size="small" type="danger" >{{form.file_name?"修改文件":"上传商业计划书"}}</van-button>
		  	 </van-uploader>
		    </template>
		  </van-field>
		 <!-- <van-cell title="商业计划书" :border="false" required>
			  <span slot="default">{{fileNmae}}</span>
		  </van-cell>  
		  <van-uploader :after-read="uploads" accept=".doc,.docx,pdf">
		  </van-uploader> -->
		</van-cell-group>
		<van-button class="newBtn" type="default" @click="save">保存</van-button>
		<LyPoup ref="LyPoup" @confirm="seleLy"/>
		<AreaPoup ref="area" @confirm="seletArea"/>
		<Capital ref="Capital" @confirm="seletCapital"/>
		<Stage ref="Stage" @confirm="seletStage"/>
	</div>
</template>

<script>
import {postBp,uploadFile} from "@/api/api.js"	
import LyPoup from "@/components/LyPoup.vue"
import AreaPoup from "@/components/AreaPoup.vue"
import Capital from "@/components/Capital.vue"
import Stage from "@/components/Stage.vue"
import Upload from "@/components/Upload.vue"
export default{
	components:{
		LyPoup,
		AreaPoup,
		Capital,
		Stage,
		Upload
	},
	data(){
		return{
			lyName:"",
			cityName:"",
			stage_name:"",
			capital_name:"",
			form:{
				tel:"",
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
				financing:"",
			}
		}
	},
	methods:{
		async uploads({file}) {
		 let data = new FormData();
		 data.append("file", file);
		 const toast = this.$toast.loading({
		   duration: 0,
		   forbidClick: true,
		   loadingType: "spinner",
		   message: "上传中"
		 });
		 try {
		   uploadFile({file:data}).then(res=>{
			   console.log(res)
			   this.form.file = res.data.data
			   	this.form.file_name = file.name
			   toast.clear();
		   })
		 } catch (error) {
		   toast.clear();
		   this.$toast.fail(error.message);
		 }
		},
		onClickLeft(){
			this.$router.back()
		},	
		showLy(){
			this.$refs["LyPoup"].show()
		},	
		//领域
		seleLy(val,idx){
			this.lyName = val
			this.form.field_id = idx+1
		},
		showArea(){
			this.$refs["area"].show()
		},
		seletArea(list,value){
			console.log(list,value)
			this.cityName = list.join("")
			this.form.city_id = value[1]
		},
		showCapital(){
			this.$refs["Capital"].show()
		},
		seletCapital(val,index){
			this.capital_name = val;
			this.form.capital_id = index+1
			
		},
		showStage(){
			this.$refs["Stage"].show()
		},
		seletStage(val,idx){
			this.stage_name = val
			this.form.stage_id = idx+1
		},
		upImgs(val){
			console.log(val)
			this.form.logo = val
		},
		save(){
			postBp({
				field_name: this.form.field_name,
				title: this.form.title,
				company_name: this.form.company_name,
				logo: this.form.logo,
				one_desc: this.form.one_desc.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;"),
				field_id: this.form.field_id,
				city_id: this.form.city_id,
				company_desc: this.form.company_desc.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;"),
				capital_id: this.form.capital_id,
				stage_id: this.form.stage_id,
				file: this.form.file,
				stage_id: this.form.stage_id,
				financing: this.form.financing.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;")
			}).then(res=>{
				console.log(res)	
				if(res.data.status == 1){
					Dialog.alert({
					  title: '温馨提示',
					  message: res.data.msg
					}).then(() => {
					  // on close
					  this.$router.push("/user")
					});
				}else{
					this.$dialog.alert({
					  title: '温馨提示',
					  message: res.data.msg
					})
				}
			})
		}
	}
}	
</script>

<style scoped>
.btnColor{
	background-color: #deb156;
	border: none;
}	
.van-nav-bar .van-icon{
	color: #464F57;
}	
.van-nav-bar__title{
	font-size:17px;
	font-weight:400;
	color:rgba(70,79,87,1);
}	
.newBtn{
	width:158px;
	height:33px;
	background:rgba(222,177,86,1);
	border-radius:33px;
	line-height: 32px;
	margin:30px auto;
	color: #fff;
	display: flex;
	justify-content: center;
	font-size: 15px;
}	
</style>
