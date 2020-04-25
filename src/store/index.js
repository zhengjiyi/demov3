import Vue from "vue";
import Vuex from "vuex";
import {getUser} from "@/api/api.js"
Vue.use(Vuex);

const userId = sessionStorage.getItem("token");

export default new Vuex.Store({
  state: {
	  userInfo:{
		id:userId
	  }
  },
  getters:{
	  userInfo: state => {
		return state.userInfo;
	  },
  },
  mutations: {
	  updateUserInfo: (state, payload) => {
	    state.userInfo = payload;
	  },
  },
  actions: {
	  async fetchUserInfo({commit}){
		const res = await getUser(); 
		commit("updateUserInfo", res.data.date);
	  }
  },
  modules: {}
});
