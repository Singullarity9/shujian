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
  //获取详细书本信息
  async getDetailInfo({ commit }, id) {
    let result = await reqBookDetail(id);
    result.data.picture = `http://192.168.43.171/picture/${result.data.picture}`
    if (result.code == 200) {
      commit('GETDETAILINFO', result.data)

    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //添加购物车
  async addOrUpdateShopCar(context, { bookid, booknum }) {
    let result = await reqAddOrUpdateShopCar(bookid, booknum);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.data))
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