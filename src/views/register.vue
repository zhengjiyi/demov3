<template>
	<div class="reg">
		<van-nav-bar
		  title="我的名片"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<van-cell-group>
		  <van-field
		    v-model="from.nickname"
		    required
		    label="姓名"
		    placeholder="请输入用户名"
			input-align="right"
		  />
		  <van-field
		    v-model="from.phone"
		    required
		    label="手机号码"
		    placeholder="请输入手机号"
			type="number"
			input-align="right"
		  />
		  <van-field
		    v-model="from.email"
		    required
		    label="工作邮箱 "
		    placeholder="工作邮箱"
			input-align="right"
		  />
		  <van-field
		    v-model="from.company_name"
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
		    v-model="from.position"
		    required
		    label="职位"
		    placeholder="职位"
			input-align="right"
		  />
		  <van-cell title="个人简介" :border="false" />
		  <van-field
		    class="textarea"
		    v-model="from.desc"
		    type="textarea"
		    placeholder="写点关于您的事情吧..."
		  />
		</van-cell-group>
		<van-cell-group class="cell-group">
		  <van-field
		    v-model="code"
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
		  <van-col span="24">
			  <div class="regbox">
				  <van-button class="cancle" type="default" to="/user">取消</van-button>
				   <van-button class="save" type="default" @click="save">保存</van-button>
			  </div>
		  </van-col>
		</van-row>
		<AreaPoup ref="area" @confirm="seletArea"/>
	</div>
</template>

<script>
import {sendSms,saveData} from "@/api/api.js"	
import {mapActions,mapGetters, mapState } from "vuex";	
import AreaPoup from "@/components/AreaPoup.vue"
export default{
	components:{
		AreaPoup
	},
	data(){
		return{
			smsT: 0,
			cityName:null,
			code:"",
			sms:"",
			from:{
				nickname:"",
				phone:"",
				email:"",
				company_name:"",
				position:"",
				city:"",
				desc:"",
				avatar:"",
			}
		}
	},
	computed: {
		...mapGetters(["userInfo"]),
	},
	async mounted(){
		await this.$store.dispatch("fetchUserInfo", this.userInfo.id);
		this.cityName = this.userInfo.city_name
		this.from = this.userInfo
	},
	methods:{
		...mapActions(["fetchUserInfo"]),
		showArea(){
			this.$refs["area"].show()
		},
		seletArea(list,value){
			console.log(list,value)
			this.cityName = list.join("")
			this.from.city = value
		},
		getSms() {
			if (!this.from.phone) {
			  this.$toast("请先输入手机号码");
			  return;
			}
			sendSms({
				mobile: this.from.phone
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
			console.log(this.code)
			saveData({
				nickname: this.from.nickname,
				phone: this.from.phone,
				email: this.from.email,
				company_name: this.from.company_name,
				position: this.from.position,
				city: this.from.city,
				code: this.code,
				desc: this.from.desc.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;"),
				city_name:this.from.city_name
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
		onClickLeft() {
			this.$router.back()
		},
	}
}	
</script>

<style lang="less">
.van-button--default{
	background-color:inherit;
}
.cancle{
	width:130px;
	height:33px !important;
	line-height: 1 !important;
	border-radius:16px !important;
	background:rgba(153,153,153,1);
	color: #fff;
}
.save{
	width:130px;
	height:33px !important;
	line-height: 1 !important;
	border-radius:16px !important;
	background:rgba(222,177,86,1);
	color: #fff !important;
}	
.regbox{
	display: flex;
	justify-content: space-around;
	margin:20px 0;
}
.reg .van-cell{
}
</style>
