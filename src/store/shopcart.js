import { reqCartListInfo, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const state = {
    cartListInfo: {}
};
const mutations = {
    CARTLISTINFO(state, cartListInfo) {
        state.cartListInfo = cartListInfo;
    }
};
const actions = {
    //获取购物车列表数据
    async getCartListInfo({ commit }) {
        let result = await reqCartListInfo();
        result.data = result.data.map(item => {
            item.picture = require(`@/assets/images/picture/${item.picture}`)
            return item
        })
        if (result.code == 200) {
            commit('CARTLISTINFO', result.data);
        }
    },
    //删除购物车商品信息
    async deleteCartListInfo({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //切换商品选中状态
    async updateCheckedInfo({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //删除购物车选中商品信息
    deleteCheckedInfo({ getters, dispatch }) {
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked ? dispatch('deleteCartListInfo', item.skuId) : '';
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
    //切换购物车所有商品的选中状态
    updateAllChecked({ state, dispatch }, isChecked) {
        let promiseAll = [];
        state.cartListInfo[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedInfo', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
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