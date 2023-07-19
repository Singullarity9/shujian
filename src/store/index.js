import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from '@/store/user'
import home from '@/store/home'
import detail from '@/store/detail'
import shopcart from '@/store/shopcart'

export default new Vuex.Store({
  modules: {
    user,
    home,
    detail,
    shopcart
  }
})
