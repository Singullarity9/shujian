//API接口统一管理模块
import requests from "./axios"

//用户注册  /user/register
export const reqUserRegister = (data) => requests({ url: '/user/register', data, method: 'post' })

//获取验证码  /user/getcaptcha
export const reqGetCode = (email) => requests({ url: `/user/getcaptcha/${email}`, method: 'post' })

//用户登录  /user/login
export const reqUserLogin = (data) => requests({ url: '/user/login', data, method: 'post' })

//获取用户信息  /user/info
export const reqGetUserInfo = () => requests({ url: '/user/info', method: 'post' })

//用户注销登录  /user/logout
export const reqUserLogout = () => requests({ url: '/user/logout', method: 'post' })

//获取书籍分类列表 /category/{name}
export const reqCategoryList = (name) => requests({ url: `/category/${name}`, method: 'post' })

//获取推荐书籍列表 /books/info
export const reqRecommendBookList = (data) => requests({ url: '/books/info', data, method: 'post' })

//获取书籍详细信息  /book/info/{bookid}
export const reqBookDetail = (id) => requests({ url: `/book/info/${id}`, method: 'post' })

//添加商品到购物车   /cart/add/{bookid}/{booknum}
export const reqAddOrUpdateShopCar = (bookid, booknum) => requests({ url: `/cart/add/${bookid}/${booknum}`, method: 'post' });

//获取购物车列表数据  /cart/info
export const reqCartListInfo = () => requests({ url: "/cart/info", method: "post" });

//修改商品选中状态  /cart/state/{bookid}/{ischecked}
export const reqUpdateCheckedById = (bookid, isChecked) => requests({ url: `/cart/state/${bookid}/${isChecked}`, method: 'post' });

//获取用户订单号 /order/cart
export const reqGetUserOrderId = () => requests({ url: '/order/cart', method: 'post' })

//获取用户地址信息 /user/address
export const reqUserAddressList = () => requests({ url: '/user/address', method: 'post' })

//更新用户地址信息 /user/address/update
export const reqUpdateUserAddress = (data) => requests({ url: '/user/address/add', data, method: 'post' })

//获取用户订单信息 /order/info/order
export const reqUserOrderList = (data) => requests({ url: "/order/info/order", data, method: 'post' })

//用户提交订单 /order/buy/{orderid}/{addressid}
export const reqUserSubmitOrder = (orderid, addressid) => requests({ url: `/order/buy/${orderid}/${addressid}`, method: 'post' })