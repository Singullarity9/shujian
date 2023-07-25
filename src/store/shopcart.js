import { reqCartListInfo, reqUpdateCheckedById, reqGetUserOrderId } from '@/api'

const state = {
    cartListInfo: {},
    orderId: ''
};
const mutations = {
    CARTLISTINFO(state, cartListInfo) {
        state.cartListInfo = cartListInfo
    },
    GETUSERORDERID(state, orderId) {
        state.orderId = orderId
    }
};
const actions = {
    //获取购物车列表数据
    async getCartListInfo({ commit }) {
        let result = await reqCartListInfo()
        result.data.list = result.data.list.map(item => {
            item.picture = `http://192.168.43.171/picture/${item.picture}`
            return item
        })
        if (result.code == 200) {
            commit('CARTLISTINFO', result.data)
        }
    },
    //切换商品选中状态
    async updateCheckedInfo(context, { bookid, isChecked }) {
        let result = await reqUpdateCheckedById(bookid, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //删除购物车选中商品信息
    deleteCheckedInfo({ getters, dispatch }) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked ? dispatch('addOrUpdateShopCar', item.bookid, -item.booknum) : ''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    //切换购物车所有商品的选中状态
    updateAllChecked({ state, dispatch }, isChecked) {
        let promiseAll = []
        state.cartListInfo.list.forEach(item => {
            let promise = dispatch('updateCheckedInfo', { bookid: item.bookid, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    //获取用户订单号
    async getUserOrderId({ commit }) {
        let result = await reqGetUserOrderId()
        if (result.code == 200) {
            commit('GETUSERORDERID', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
};
const getters = {
};

export default {
    state,
    mutations,
    actions,
    getters
}