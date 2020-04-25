<template>
	<div>
		<van-cell-group>
		  <van-field
		    v-model="form.nickname"
		    required
		    label="姓名"
		    placeholder="请输入用户名"
			input-align="right"
		  />
		  <van-field
		    v-model="form.phone"
		    required
		    label="手机号码"
		    placeholder="请输入手机号"
			type="number"
			input-align="right"
		  />
		  <van-field
		    v-model="form.email"
		    required
		    label="工作邮箱 "
		    placeholder="工作邮箱"
			input-align="right"
		  />
		  <van-field
		    v-model="form.company_name"
		    required
		    label="公司名称"
		    placeholder="公司名称"
			input-align="right"
		  />
		 
		  <van-field
		    v-model="cityName"
		    required
		    label="所在城市"
		    placeholder="所在城市"
			@click="showArea"
			input-align="right"
			is-link
		  />
		  <van-field
		    v-model="form.position"
		    required
		    label="职位"
		    placeholder="职位"
			input-align="right"
		  />
		  <van-cell title="个人简介" :border="false" />
		  <van-field
		    class="textarea"
		    v-model="form.desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		</van-cell-group>
		<van-cell-group class="cell-group">
		  <van-field
		    v-model="form.sms"
		    center
		    clearable
		    label="短信验证码"
		    placeholder="请输入短信验证码"
			type="number"
		  >
		    <van-button
		      @click="getSms"
		      :disabled="!!smsT"
		      plain
		      slot="button"
		      size="small"
		      type="danger"
		      >{{ smsT ? `${smsT}s` : "获取验证码" }}
		    </van-button>
		  </van-field>
		</van-cell-group>
		<!-- 每个元素的两侧间隔相等 -->
		<van-row type="flex" justify="space-around">
		  <van-col span="6">
			  <van-button type="default" to="/user">取消</van-button>
		  </van-col>
		  <van-col span="6">
			  <van-button type="default" @click="save">保存</van-button>
		  </van-col>
		</van-row>
		<AreaPoup ref="area" @confirm="seletArea"/>
	</div>
</template>

<script>
import {sendSms,saveData} from "@/api/api.js"	
import {mapActions,mapGetters} from "vuex";	
import AreaPoup from "@/components/AreaPoup.vue"
export default{
	components:{
		AreaPoup
	},
	data(){
		return{
			smsT: 0,
			cityName:null,
			form:{
				nickname:"",
				phone:"",
				email:"",
				company_name:"",
				position:"",
				city:"",
				code:"",
				desc:"",
				avatar:"",
				sms:""
			}
		}
	},
	computed: {
		...mapGetters(["userInfo"])
	},
	mounted(){
		this.fetchUserInfo(this.userInfo.id);
		this.form = this.userInfo
	},
	methods:{
		...mapActions(["fetchUserInfo"]),
		showArea(){
			this.$refs["area"].show()
		},
		seletArea(list,value){
			console.log(list,value)
			this.cityName = list.join("")
			this.form.city = value
		},
		getSms() {
			if (!this.form.phone) {
			  this.$toast("请先输入手机号码");
			  return;
			}
			sendSms({
				mobile: this.form.phone
			}).then(res=>{
				console.log(res)
			})
			this.smsT = 60;
			const smsid = setInterval(() => {
			  this.smsT = this.smsT - 1;
			  if (this.smsT == 0) {
			    clearInterval(smsid);
			  }
			}, 1000);
		},
		save(){
			saveData({
				nickname: this.form.nickname,
				phone: this.form.phone,
				email: this.form.email,
				company_name: this.form.company_name,
				position: this.form.position,
				city: this.form.city,
				code: this.form.code,
				desc: this.form.desc.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;"),
				city_name:this.form.city_name
			}).then(res=>{
				if(res.data.status == 1){
					this.$dialog.alert({
					    message: "操作成功"
					}).then(() => {
					    this.$router.replace("/user")
					})
				}else{
					this.$dialog.alert({
					    message: res.data.msg
					})
				}
				
			})
			
		},
	}
}	
</script>

<style>
</style>
