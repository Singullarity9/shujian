import { reqCategoryList } from '@/api'

const state = {
  categoryList: []
}
const mutations = {
  GETCATEGORYINFO (state, data) {
    state.categoryList = data;
  }
}
const actions = {
  //获取详细书本信息
  async getCategoryInfo ({ commit }, name) {
    // console.log(name)
    let result = await reqCategoryList(name);
    // console.log('11111', result)//有结果
    for (let i = 0; i < result.data.length; i++) {
      result.data[i].img = require(`@/assets/images/picture/${result.data[i].picture}`)
    }
    let data = []
    if (name === '文学类书籍') {
      data = result.data.splice(21 * 1, 21)
    } else if (name === '非虚构类书籍') {
      data = result.data.splice(21 * 2, 21)
    }
    else if (name === '教育类书籍') {
      data = result.data.splice(21 * 3, 21)

    } else if (name === '生活类书籍') {
      data = result.data.splice(21 * 4, 21)

    } else if (name === '参考类书籍') {
      data = result.data.splice(21 * 5, 21)

    }
    if (result.code == 200) {
      commit('GETCATEGORYINFO', data)
      console.log('1111', data)

    } else {
      return Promise.reject(new Error('failed'))
    }
  },
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}