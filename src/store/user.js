import { reqUserRegister, reqGetCode } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth.js'

const state = {
    token: getToken()
}
const mutations = {
    USERLOGIN(state) {
        state.token = getToken();
        console.log(state.token);
    },
    CLEAR(state) {
        state.token = null
        removeToken()
    }
}

const actions = {
    async userRegister(context, userInfo) {
        let result = await reqUserRegister(userInfo)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async getCaptcha(context, email) {
        let result = await reqGetCode(email)
        console.log(result)
        if (result.code == 200) {
            return 'ok'
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