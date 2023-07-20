import { reqBookDetail, reqAddOrUpdateShopCar } from '@/api'

const state = {
  bookDetailInfo: {}
}
const mutations = {
  GETDETAILINFO (state, data) {
    state.bookDetailInfo = data;
  }
}
const actions = {
  //获取详细书本信息
  async getDetailInfo ({ commit }, id) {
    let result = await reqBookDetail(id);
    let newData = result.data.filter((item) => item.n === +id)[0]//一个对象
    newData.picture = require(`@/assets/images/picture/${newData.picture}`)
    if (result.code == 200) {
      commit('GETDETAILINFO', newData)

    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //
  async addOrUpdateShopCar (context, { skuId, skuNum }) {
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