import { reqUserAddressList, reqUserOrderList, reqUserSubmitOrder, reqUpdateUserAddress } from '@/api'

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, data) {
        state.address = data
    },
    GETUSERORDERINFO(state, data) {
        state.orderInfo = data
    }
}
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqUserAddressList()
        if (result.code == 200) {
            result.data.map(item => {
                return item.fullAddress = `${item.proviece}${item.city}${item.detailaddress}`
            })
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //更新用户地址信息
    async updateUserAddress(context, data) {
        let result = await reqUpdateUserAddress(data);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async getUserOrderInfo({ commit }, orderid) {
        let result = await reqUserOrderList(orderid)
        result.data.list = result.data.list.map(item => {
            item.picture = `http://192.168.43.171/picture/${item.picture}`
            return item
        })
        if (result.code == 200) {
            commit('GETUSERORDERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async reqSubmitOrder(context, { orderid, addressid }) {
        let result = await reqUserSubmitOrder(orderid, addressid)
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