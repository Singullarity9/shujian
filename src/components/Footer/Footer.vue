<!--  -->
<template>
  <div>
    <el-container id="container">
      <el-footer class="footer">
        <div class="left">
          <p>招聘邮箱：222277654@qq.com</p>
          <p>公司地址：江西省南昌市xxx</p>
          <p>苏ICP备12019764号-2 Copyright 2009-2024 XXXXXX</p>
        </div>
        <div class="right">
          <p>商务合作电话：0719-83790372</p>
          <p>客服QQ：4493386346</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {},
}
</script>
<style lang='less' scoped>
div {
  background-color: #eaeaea;
  height: 140px;

  .footer {
    display: flex;
    justify-content: space-between;

    .left {
      p {
        margin: 20px 0;
      }
    }

    .right {
      width: 500px;

      p {
        margin: 20px 0;
      }
    }
  }
}

.el-footer {
  padding: 0;
}</style>