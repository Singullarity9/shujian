<template>
  <div>
    <Header />
    <div id="container">
      <NavBar />
    </div>
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">
          <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.bookid">
            <li class="cart-list-con1">
              <input type="checkbox" name="chk_list" :checked="cart.ischecked == 1"
                @change="updateChecked(cart.bookid, $event)">
            </li>
            <li class="cart-list-con2">
              <img :src="cart.picture">
              <div class="item-msg">{{ cart.bookname }}</div>
            </li>
            <li class="cart-list-con4">
              <span class="price">{{ cart.prize }}</span>
            </li>
            <li class="cart-list-con5">
              <a class="mins" @click="handler('minus', -1, cart)">-</a>
              <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.booknum"
                @change="handler('change', $event.target.value * 1, cart)">
              <a class="plus" @click="handler('add', 1, cart)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{ (cart.prize * cart.booknum).toFixed(2) }}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet" @click="deleteCartList(cart.bookid, -cart.booknum)">删除</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllChecked($event)">
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteAllCheckedCart">删除选中的商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择
            <span>0</span>件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">{{ (totalPrice).toFixed(2) }}</i>
          </div>
          <div class="sumbtn">
            <a class="sum-btn" @click="toTradePage">结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'ShopCart',
  data() {
    return {}
  },
  mounted() {
    this.getCartList()
  },
  computed: {
    ...mapState({
      cartInfoList: (state) => state.shopcart.cartListInfo.list || [],
      orderId: (state) => state.shopcart.orderId
    }),
    isAllChecked() {
      if (this.cartInfoList[0]) {
        return this.cartInfoList.every((item) => item.ischecked == 1)
      } else {
        return false
      }
    },
    totalPrice() {
      let newCartList = Object.assign([], this.cartInfoList)
      let total = 0
      newCartList.forEach((item) => {
        total += Number(item.prize) * item.booknum
      })
      return total
    },
  },
  methods: {
    getCartList() {
      this.$store.dispatch('getCartListInfo')
    },
    //修改产品数量
    handler: throttle(async function (type, num, cart) {
      switch (type) {
        case 'add':
          num = 1
          break
        case 'minus':
          num = cart.booknum >= 1 ? -1 : 0
          break
        case 'change':
          if (isNaN(num) || num < 1) {
            num = 0
          } else {
            num = parseInt(num) - cart.booknum
          }
          break
      }
      //派发action
      try {
        await this.$store.dispatch('addOrUpdateShopCar', { bookid: cart.bookid, booknum: num })
        this.getCartList()
      } catch (error) {
        console.log(error)
      }
    }, 500),
    async updateChecked(bookid, event) {
      try {
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateCheckedInfo', { bookid, isChecked })
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteCartList(bookid, booknum) {
      try {
        await this.$store.dispatch('addOrUpdateShopCar', { bookid, booknum })
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async updateAllChecked(event) {
      let isChecked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('updateAllChecked', isChecked)
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteCheckedInfo')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async toTradePage() {
      try {
        await this.$store.dispatch('getUserOrderId')
        this.$router.push(`/trade?orderId=${this.orderId}`)
      } catch (error) {
        alert(error.message)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 20px 20px 0 20px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 20px 20px 0 20px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 52px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 52px;
        float: left;
        padding: 0 10px;

        em {
          font-style: normal;
        }

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 106px;
          height: 56px;
          line-height: 56px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>