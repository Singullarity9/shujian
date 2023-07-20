<template>
  <div id="container">
    <div class="tit">
      <span class="border"></span>
      <h3>
        {{ bookCategoryName }}
      </h3>
      <span class="border"></span>
    </div>
    <ul>
      <li v-for="(item, index) in categoryList" :key="item.n" @click="goToDetail(item.n)">
        <div>
          <img :src="item.img" alt="" width="180" height="262">
          <div class="content">
            <p class="name">书名：{{ item.name }}</p>
            <p class="price">￥{{ item.prize }}</p>
            <p class="author">{{ item.author }}</p>
            <p class="publish">出版社：{{ item.publish }}</p>
            <p class="score">评分：{{ item.score }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  name: 'BookCategory',
  props: ['bookCategoryName'],
  data() {
    return {
      bookData: [],
    }
  },
  mounted() {
    this.$store.dispatch('getCategoryInfo', this.bookCategoryName)
    console.log('22222')
    console.log(this.categoryList)
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.category.categoryList,
    }),
  },
  // created() {
  //   axios.get('/bookList.json').then((res) => {
  //     // console.log('axios里的数据bookD', this.bookData) //有
  //     this.bookData = res.data.bookList
  //     //对图片路径进行处理
  //     for (let i = 0; i < this.bookData.length; i++) {
  //       this.bookData[
  //         i
  //       ].img = require(`@/assets/images/picture/${this.bookData[i].picture}`)
  //     }
  //     if (this.$route.path === '/bookcategory/文学类书籍') {
  //       this.bookData = res.data.bookList.splice(21 * 1, 21)
  //     } else if (this.$route.path === '/bookcategory/非虚构类书籍') {
  //       this.bookData = res.data.bookList.splice(21 * 2, 21)
  //     } else if (this.$route.path === '/bookcategory/教育类书籍') {
  //       this.bookData = res.data.bookList.splice(21 * 3, 21)
  //     } else if (this.$route.path === '/bookcategory/生活类书籍') {
  //       this.bookData = res.data.bookList.splice(21 * 4, 21)
  //     } else if (this.$route.path === '/bookcategory/参考类书籍') {
  //       this.bookData = res.data.bookList.splice(21 * 5, 21)
  //     }
  //   })
  // },

  methods: {
    goToDetail(bookId) {
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