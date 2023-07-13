<!--  -->
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
          <li v-for="(item, index) in bookData" :key="item.n">
            <router-link :to="item.path">
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
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import book1 from '@/assets/images/book/book1.png'
import axios from 'axios'
export default {
  name: 'BooKList',
  data() {
    return {
      book1,
      bookData: '',
    }
  },

  components: {},

  computed: {},

  mounted() {
    //下面写的是自己整理的数据
    /*  for (let i = 0; i < this.bookList.length; i++) {
      this.bookList[i].book.img = require(`@/assets/images/book/book${
        i + 1
      }\.png`)
      this.bookList[i].book.path = `/book/${i + 1}`
    }
    console.log(this.bookList) */
    axios.get('/bookList.json').then((res) => {
      this.bookData = res.data.bookList.slice(0, 21) //res.data可根据你的数据格式来，看需求
      console.log(this.bookData) //打印看看数据吧
      //对图片路径进行处理
      for (let i = 0; i < this.bookData.length; i++) {
        this.bookData[
          i
        ].img = require(`@/assets/images/picture/${this.bookData[i].picture}`)
        this.bookData[i].path = `/book/${i + 1}`
      }
    })
  },

  methods: {},
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