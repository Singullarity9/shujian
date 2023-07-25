<template>
  <div>
    <Header />
    <div id="container">
      <!-- 导航栏 -->
      <NavBar />
      <el-row class="main">
        <el-col :span="12">
          <div class="left">
            <img :src="singleBookData.picture" alt="" width="300" height="400">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <h1 class="bName">书名：{{ singleBookData.bookname }}</h1>
            <p class="bDescription" v-show="singleBookData.description">{{ singleBookData.description }}</p>
            <div class="clearfix">
              <div class="cost_box">
                <p class="bPrice">
                  售&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：
                  <span class="normal_price">￥ <i>{{ singleBookData.prize }}</i></span>
                </p>
              </div>
            </div>
            <p>作者：{{ singleBookData.author }}</p>
            <p>出版社：{{ singleBookData.press }}</p>
            <p>出版时间:{{ singleBookData.publishtime }}</p>
            <p>评分：{{ singleBookData.score }}</p>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="bookNum" @change="changebookNum">
                <a href="javascript:" class="plus" @click="bookNum++">+</a>
                <a href="javascript:" class="mins" @click="bookNum > 1 ? bookNum-- : bookNum = 1">-</a>
              </div>
              <div class="add">
                <a @click="addShopCar">加入购物车</a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Footer />
  </div>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  name: 'Book',
  props: ['id'],
  data() {
    return {
      bookNum: 1,
    }
  },
  mounted() {
    this.$store.dispatch('getDetailInfo', this.id)
  },

  computed: {
    ...mapState({
      singleBookData: (state) => state.detail.bookDetailInfo,
    }),
  },
  methods: {
    changebookNum(event) {
      let value = event.target.value * 1
      if (isNaN(value) || value < 1) {
        this.bookNum = 1
      } else {
        this.bookNum = parseInt(value)
      }
    },
    async addShopCar() {
      try {
        await this.$store.dispatch('addOrUpdateShopCar', {
          bookid: this.id,
          booknum: this.bookNum,
        })
        //路由跳转,将产品信息带给下一级的路由组件
        this.$router.push({
          name: 'addcartsuccess',
          query: { bookNum: this.bookNum },
        })
        window.sessionStorage.setItem(
          'BOOKINFO',
          JSON.stringify(this.singleBookData)
        )
      } catch (error) {
        alert(error.message)
      }
    },
  },
}
</script>
<style lang='less' scoped>
.search {
  height: 80px;
  display: flex;
  align-items: center;
}

.shopChart {
  text-align: right;
  line-height: 80px;
}

.main {
  height: 600px;
  margin: 40px 0;

  p,
  em {
    font-size: 14px;
    line-height: 30px;
  }

  // background-color: rebeccapurple;
  .left {
    background-color: rgba(103, 155, 206, 0.5);
    border-radius: 20px;

    img {
      display: block;
      margin: 0 auto;
      padding: 100px 0;
    }
  }

  .right {
    padding-left: 100px;
    padding-top: 150px;

    .bName {
      color: #222;
      font-size: 24px;
      font-weight: bold;
      line-height: 22px;
      margin-bottom: 12px px;
    }

    .bDescription {
      font-size: 12px;
      color: grey;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin: 20px 0 0 0;
      max-height: 81px;
      overflow: hidden;
    }

    .clearfix {
      background: #fee9eb;

      .cost_box {
        width: 276px;
        float: left;

        .bPrice {
          .normal_price {
            color: #ee554a;
            font-size: 12px;

            i {
              font-size: 22px;
              font-weight: 700;
              font-style: normal;
            }
          }
        }
      }

      .count_per {
        float: left;

        em {
          font-style: normal;
        }
      }
    }

    .cartWrap {
      margin-top: 15px;

      .controls {
        width: 48px;
        position: relative;
        float: left;
        margin-right: 15px;

        .itxt {
          width: 38px;
          height: 37px;
          border: 1px solid #ddd;
          color: #555;
          float: left;
          border-right: 0;
          text-align: center;
        }

        .plus,
        .mins {
          width: 15px;
          text-align: center;
          height: 17px;
          line-height: 17px;
          background: #f1f1f1;
          color: #666;
          position: absolute;
          right: -8px;
          border: 1px solid #ccc;
        }

        .mins {
          right: -8px;
          top: 19px;
          border-top: 0;
        }

        .plus {
          right: -8px;
        }
      }

      .add {
        float: left;
        cursor: pointer;

        a {
          background-color: #e1251b;
          padding: 0 25px;
          font-size: 16px;
          color: #fff;
          height: 36px;
          line-height: 36px;
          display: block;
        }
      }
    }

    .clearfix:after,
    .clearfix:before {
      content: '';
      display: table;
    }

    .clearfix:after {
      clear: both;
      content: ' ';
      display: block;
      font-size: 0;
      height: 0;
      visibility: hidden;
    }
  }
}
</style>