//API接口统一管理模块
import requsets from "./axios"

//用户注册  /api/user/passport/register
export const reqUserRegister = (data) => requsets({ url: '/user/passport/register', data, method: 'post' })

//获取验证码  /api/user/passport/getCaptcha
export const reqGetCode = (email) => requsets({ url: `/user/passport/getCaptcha/${email}`, method: 'get' })

//用户登录  /api/user/passport/login
export const reqUserLogin = (data) => requsets({ url: '/user/passport/login', data, method: 'post' })