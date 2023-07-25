<!-- 推荐书籍 -->
<template>
  <div>
    <div id="container">
      <div class="tit">
        <span class="border"></span>
        <h3>
          推荐书籍
        </h3>
        <span class="border"></span>
      </div>
      <div>
        <ul>
          <li v-for="(item, index) in bookData" :key="item.bookid" @click="getBookDetail(item.bookid)">
            <div>
              <img :src="item.picture" alt="" width="180" height="262">
              <div class="content">
                <p class="name">书名：{{ item.bookname }}</p>
                <p class="price">￥{{ item.prize }}</p>
                <p class="author">{{ item.author }}</p>
                <p class="publish">出版社：{{ item.press }}</p>
                <p class="score">评分：{{ item.score }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BooKList',
  data() {
    return {}
  },

  components: {},

  computed: {
    ...mapState({
      bookData: (state) => state.home.recommendBookList,
    }),
  },

  mounted() { },

  methods: {
    getBookDetail(bookId) {
      this.$router.push(`/book/${bookId}`)
    },
  },
}
</script>
<style lang='less' scoped>
#container {
  padding: 40px 0;

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      margin-top: 40px;
      width: 400px;
      height: 500px;
      // background-color: rgba(102, 153, 204, 0.1);
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
      border-radius: 10px;

      img {
        display: block;
        padding-top: 40px;
        margin: 0 auto;
      }

      .content {
        padding: 30px;
      }
    }

    li:hover {
      transform: translateY(-3px);
      transition: 0.45s;
    }
  }
}
</style>