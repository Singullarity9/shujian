import { reqBookDetail, reqAddOrUpdateShopCar } from '@/api'

const state = {
    bookDetailInfo: {}
}
const mutations = {
    GETDETAILINFO(state, data) {
        state.bookDetailInfo = data;
    }
}
const actions = {
    async getDetailInfo({ commit }, id) {
        let result = await reqBookDetail(id);
        result.data.picture = require(`@/assets/images/picture/${result.data.picture}`)
        if (result.code == 200) {
            commit('GETDETAILINFO', result.data)
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    async addOrUpdateShopCar(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCar(skuId, skuNum);
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