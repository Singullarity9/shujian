<!--  -->
<template>
  <div>
    <div id="container">
      <el-row>
        <el-col :span="6" class="left">
          <div class="grid-content">
            <router-link to="/"><i class="el-icon-s-home m-20"><span>首页</span></i></router-link>
          </div>
        </el-col>
        <el-col :span="5" :offset="13" class="right">
          <div class="grid-content">
            <div>
              <template v-if="!userName">
                <router-link class="active" to="/login">亲，请登录</router-link><span>|</span>
                <router-link to="/register">注册</router-link><span>|</span>
              </template>
              <template v-else>
                <a href="#" class="active">{{ userName }}</a><span>|</span>
                <a @click="userLogout">退出登录</a><span>|</span>
              </template>
              <router-link to="/news">消息</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {}
  },
  mounted() {

  },
  computed: {
    ...mapState({
      userName: (state) => state.user.userInfo.username
    })
  },
  methods: {
    async userLogout() {
      try {
        await this.$store.dispatch('userLogout')
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }

    }
  },
}
</script>
<style lang='less' scoped>
div {
  background-color: #efefef;
  color: #666;

  #container {
    font-size: 20px;
    height: 60px;
    line-height: 60px;

    .left {
      span {
        margin-left: 10px;
      }
    }

    .right {
      .active {
        color: #e61716;
      }

      span {
        padding: 0 15px;
      }
    }
  }
}
</style>