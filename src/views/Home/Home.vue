<!--  -->
<template>
  <div>
    <Header />
    <div class="main">
      <div id="container">
        <!-- 导航栏 -->
        <section class="navBar2" style="height:80px">
          <el-row>
            <el-col :span="7">
              <div class="grid-content bg-purple"><router-link to="/"><img :src="$imgLogo" alt="" height="60" style="margin:10px 0"></router-link></div>
            </el-col>
            <el-col :span="10" class="search">
              <div>
                <el-input placeholder="请输入内容" v-model="input1" style="width:533px">
                  <el-button type="primary" icon="el-icon-search" slot="append">搜索</el-button>
                </el-input>
              </div>
            </el-col>
            <el-col :span="7" class="shopChart">
              <div>
                <router-link to="/shopCart">我的购物车</router-link>
              </div>
            </el-col>
          </el-row>

        </section>
      </div>
      <section class="banner">
        <img :src="banner1" alt="" width="100%">
      </section>
      <div id="container">
        <!-- 分类 -->
        <section class="category">
          <div class="tit">
            <span class="border"></span>
            <h3>
              书籍分类
            </h3>
            <span class="border"></span>
          </div>
          <ul>
            <li v-for="(item,index) in bookCategoryList" :key="index">{{item}}</li>
          </ul>
        </section>
        <!-- 图书列表 -->
        <BookList />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/NavBar/NavBar.vue'
import BookList from '@/components/BookList/BookList.vue'

import banner1 from '@/assets/images/banner1.png'
export default {
  name: 'Home',
  data() {
    return {
      banner1,
      input1: '',
      bookCategoryList: [
        '文学类书籍',
        '非虚构类书籍',
        '教育类书籍',
        '生活类书籍',
        '参考类书籍',
      ],
    }
  },

  components: { Header, BookList },

  computed: {},

  mounted() {},

  methods: {},
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
.category {
  height: 300px;
  // background-color: orange;
  ul {
    display: flex;
    justify-content: space-between;
    text-align: center;
    li {
      height: 250px;
      line-height: 250px;
      width: 230px;
      // padding: 40px;
      box-sizing: border-box;
      font-size: 30px;
      font-weight: bold;
      &:nth-child(odd) {
        background-color: #89c6ff;
        color: #3279b6;
      }
      &:nth-child(even) {
        background-color: #c1e7ff;
        color: #3998e3;
      }
    }
  }
}
</style>