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
    async getRecommendBookList({ commit }, { page, num }) {
        let result = await reqRecommendBookList({ page, num });
        if (result.code == 200) {
            let bookData = result.data.map(item => {
                item.picture = `http://192.168.43.171/picture/${item.picture}`
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