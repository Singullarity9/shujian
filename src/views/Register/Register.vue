<!--  -->
<template>
  <div>
    <div id="container">
      <!-- 导航栏 -->
      <SubNavBar />
      <!-- 主内容 -->
      <div class="main">
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px" :hide-required-asterisk="true">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-row>
              <el-col :span="13">
                <el-input v-model="ruleForm.captcha"></el-input>
              </el-col>
              <el-col :span="6" :offset="5">
                <el-button @click="getCaptcha" style="width: 102px;">获取验证码</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="ruleForm.isAgree">同意《书荐用户协议》并注册</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userRegister('ruleForm')">完成注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error('长度必须在6-12位'))
      } else if (!/^[a-zA-Z\d]{6,12}$/) {
        callback(new Error('必须为数字或字母'))
      } else {
        callback();
      }
    }
    var validateEmail = (rule, value, callback) => {
      let emailReg = /^[a-zA-Z0-9.!#$%&amp;'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (value === '') {
        callback(new Error('请输入邮箱地址'));
      } else if (!emailReg.test(value)) {
        callback(new Error('输入的邮箱地址格式不对'))
      } else {
        callback();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,12}$/.test(value)) {
          callback(new Error('必须同时包括字母和数字'))
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var isAgreed = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必须同意协议才能进行注册'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        phone: '',
        email: '',
        captcha: '',
        pass: '',
        checkPass: '',
        isAgree: true
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '输入的手机号不符合要求', trigger: 'blur' }
        ],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        isAgree: [{ validator: isAgreed, trigger: 'change' }]
      },
      radio: '1',
    }
  },
  mounted() {

  },
  methods: {
    //点击注册
    userRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { name, phone, captcha, pass, email } = this.ruleForm;
            await this.$store.dispatch('userRegister', { username: name, phoneId: phone, captcha, password: pass, email })
            //注册成功
            this.$router.push('/login')
          } catch (error) {
            alert(error.message)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })

    },
    async getCaptcha() {
      const { email } = this.ruleForm
      try {
        email && await this.$store.dispatch('getCaptcha', email)
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>
<style lang='less' scoped>
#container {
  .main {
    width: 500px;
    margin: 50px auto;
  }
}
</style>