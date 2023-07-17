//配置全局的基础配置
import axios from "axios";
//配置中心
import webConfig from "@/global.config"
//baseURL,timeout,header,responseType,withCredentials
//base64
import { Base64 } from "js-base64"
//创建axios对象，后面的请求用request来发
const requests = axios.create({
  // 1.基础配置
  baseURL: "/api",
  timeout: 30 * 1000,
  //返回数据类型格式
  //responseType: "json",
  // headers: {
  //   "a": "123"
  // }
})

//请求拦截器
requests.interceptors.request.use((config) => {
  //token，密钥的设置
  //token 配置
  let whitListApi = webConfig.whiteListApi
  let url = config.url
  let token = localStorage.getItem("token")
  //如果访问的网址不在白名单里，就说明需要token值
  if (whitListApi.indexOf(url) === -1 && token) {
    config.headers.token = token
  }
  //密钥 -secretId + 特殊算法
  let _secret = Base64.encode(webConfig.secretId + new Date().toString())
  config.headers.secret = _secret
  return config
}, error => {
  return Promise.reject(new Error(error))
})
//响应拦截器
requests.interceptors.response.use((res) => {
  console.dir(res);
  return res.data;
}, (error) => {
  return Promise.reject(new Error(error));
})

export default requests;