import { reqUserRegister, reqGetCode, reqGetUserInfo, reqUserLogout } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth.js'

const state = {
    token: getToken(),
    userInfo: {}
}
const mutations = {
    USERLOGIN(state) {
        state.token = getToken();
        console.log(state.token);
    },
    CLEAR(state) {
        state.userInfo = {}
        state.token = null
        removeToken()
    },
    GETUSERINFO(state, data) {
        state.userInfo = data
        //state.userInfo = {}
    }
}

const actions = {
    //用户注册
    async userRegister(context, userInfo) {
        let result = await reqUserRegister(userInfo)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取验证码
    async getCaptcha(context, email) {
        let result = await reqGetCode(email)
        //console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //用户注销登录
    async userLogout({ commit }) {
        let result = await reqUserLogout()
        if (result.code == 200) {
            commit('CLEAR')
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}