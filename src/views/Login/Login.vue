<!--  -->
<template>
  <div class="login">
    <div id="container">
      <!-- 导航栏 -->
      <SubNavBar />
      <!-- 主内容 -->
      <div class="main">
        <el-row>
          <el-col :span="14" class="left">
            <img :src="login" alt="" width="750px">
          </el-col>
          <el-col :span="8" :offset="2" class="right">
            <el-card class="box-card">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">用户登录</el-menu-item>
              </el-menu>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="65px"
                class="demo-ruleForm ">
                <el-form-item label="用户名" prop="username">
                  <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <div class="text">
                  <router-link to="/register">立即注册</router-link>
                  <router-link to="/fogetPass">忘记密码</router-link>
                </div>
                <el-form-item style="margin:0">
                  <el-button type="primary" @click="userLogin" style="width:300px; margin-top: 30px;">登录</el-button>
                </el-form-item>
              </el-form>
              <div class="svg">
                <router-link to="/#"><img :src="svg.qq" alt="" width="30"></router-link>
                <router-link to="/#"><img :src="svg.wechat" alt="" width="30"></router-link>
                <router-link to="/#"><img :src="svg.weibo" alt="" width="30"></router-link>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { reqUserLogin } from '@/api'
import login from '@/assets/images/login.png'
import qq from '@/assets/svg/qq.svg'
import wechat from '@/assets/svg/微信.svg'
import weibo from '@/assets/svg/微博.svg'
export default {
  data() {
    return {
      ruleForm: {
        pass: '',
        username: '',
      },
      rules: {
        pass: [{ required: true, message: '请输入登录密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      },
      login,
      activeIndex: '1',
      svg: { qq, wechat, weibo },
    }
  },
  computed: {},

  mounted() { },

  methods: {
    userLogin() {
      this.$refs['ruleForm'].validate(async (valid) => {
        const { pass, username } = this.ruleForm;
        if (valid) {
          const res = await reqUserLogin({ password: pass, username });
          if (res.code == 200) {
            this.$store.commit('USERLOGIN')
          } else {
            return Promise.reject(new Error('failed'))
          }
          console.log(res);
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    agree() {
      this.radio = '1'
    },
  },
}
</script>
<style lang='less' scoped>
.login {
  .logo {
    height: 80px;
    line-height: 80px;
    // background-color: var(--color-bg) !important;
  }

  .main {
    padding: 30px 0;

    .right {
      margin-top: 43px;

      .box-card {
        height: 400px;
        margin: 48px 0;

        .demo-ruleForm {
          margin: 30px 0;

          .text {
            display: flex;
            justify-content: space-around;
          }
        }

        .svg {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }
}
</style>