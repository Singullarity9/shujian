import { reqRecommendBookList } from '@/api'

const state = {
    recommendBookList: []
}
const mutations = {
    REQRECOMMENDBOOKLIST(state, data) {
        state.recommendBookList = data
    }
}
const actions = {
    async getRecommendBookList({ commit }) {
        let result = await reqRecommendBookList();
        if (result.code == 200) {
            let bookData = result.data.map(item => {
                item.picture = require(`@/assets/images/picture/${item.picture}`)
                return item
            })
            commit('REQRECOMMENDBOOKLIST', bookData)
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