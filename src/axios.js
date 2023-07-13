//配置全局的基础配置
import axios from "axios";
//配置中心
import webConfig from "@/global.config"
//baseURL,timeout,header,responseType,withCredentials
//base64
import { base64 } from "js-base64"
//创建axios对象，后面的请求用request来发
const request = axios.create({
  // 1.基础配置
  baseURL: "http://localhost:8080",
  timeout: 30 * 1000,
  //返回数据类型格式
  responseType: "json",
  headers: {
    "a": "123"
  }
})

//请求拦截器
request.interceptors.request.use((config) => {
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
  let _secret = base64.encode(webConfig.secretId + new Date().toString())
  config.headers.secret = _secret
  return config
}, erro => {
  return Promise.reject(new Error(error))
})
//响应拦截器
request.interceptors.response.use(() => {
  //响应的统一处理
})