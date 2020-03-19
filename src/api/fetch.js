import axios from "axios";
import { API_BASE_URL } from "../config";

// 创建axios实例
const fetch = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10 * 1000, // 请求超时时间
});


// request拦截器
fetch.interceptors.request.use((config)=>{
	if (config.method === "post") {
	  config.headers['token'] = localStorage.getItem("token")
	}
	return config;
})

// respone拦截器
fetch.interceptors.response.use(
);

export default fetch;
