//API接口统一管理模块
import requests from "./axios"

//用户注册  /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

//获取验证码  /api/user/passport/getCaptcha
export const reqGetCode = (email) => requests({ url: `/user/passport/getCaptcha/${email}`, method: 'get' })

//用户登录  /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//获取用户信息  /api/user/passport/getUserInfo
export const reqGetUserInfo = () => requests({ url: '/user/passport/getUserInfo', method: 'get' })

//用户注销登录  /api/user/passport/logout
export const reqUserLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取推荐书籍列表  /api/recommendList
export const reqRecommendBookList = () => requests({ url: '/recommendList', method: 'get' })

//获取书籍详细信息 /api/detail/{id}
export const reqBookDetail = (id) => requests({ url: `/detail/${id}`, method: 'get' })

//添加商品到购物车  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//获取购物车列表数据  /api/cart/cartList
export const reqCartListInfo = () => requests({ url: "/cart/cartList", method: "get" });

//删除购物车商品  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
