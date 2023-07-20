<template>
  <div>
    <Header />
    <div id="container">
      <NavBar />
    </div>
    <div class="main">
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
            <li v-for="(item, index) in bookCategoryList" :key="index" @click="getConcreteCate(item)">
              <a>{{ item }}</a>
            </li>
          </ul>
        </section>
      </div>
      <!-- 图书列表 -->
      <BookList />
    </div>
    <Footer />
  </div>
</template>

<script>
import BookList from './BookList/BookList.vue'
import banner1 from '@/assets/images/banner1.png'

export default {
  name: 'Home',
  data() {
    return {
      banner1,
      bookCategoryList: [
        '文学类书籍',
        '非虚构类书籍',
        '教育类书籍',
        '生活类书籍',
        '参考类书籍',
      ],
      bookCategoryListEnglish: [
        'literature',
        'non_fiction',
        'education',
        'life',
        'reference',
      ],
    }
  },

  components: { BookList },
  mounted() {
    this.$store.dispatch('getUserInfo')
    this.$store.dispatch('getRecommendBookList')
  },
  computed: {},
  methods: {
    getConcreteCate(cateName) {
      this.$router.push(`/bookcategory/${cateName}`)
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
      cursor: pointer;

      &:nth-child(odd) {
        background-color: #89c6ff;

        a {
          color: #3279b6;
        }

        // color: #3279b6;
      }

      &:nth-child(even) {
        background-color: #c1e7ff;

        a {
          color: #3998e3;
        }

        // color: #3998e3;
      }

      // a:hover {
      //   color: #e61716;
      //   transition: 0.3s;
      // }

      &:hover {
        box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.4);
        transition: 0.3s;
        transform: translateY(-2px);
      }
    }
  }
}
</style>