<!--  -->
<template>
  <div>
    <div id="container">
      <!-- 导航栏 -->
      <SubNavBar />
      <!-- 主内容 -->
      <div class="main">
        <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="国家" prop="country">
            <el-select v-model="valueCountry" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-select v-model="valueCity" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import SubNavBar from '../../components/SubNavBar/SubNavBar.vue'
export default {
  data() {
    var validateCountry = (rule, value, callback) => {
      console.log(this)
      if (value === '') {
        callback(new Error('请选择国家'))
      } else {
        callback()
      }
    }
    var validateCity = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择城市'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
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
    return {
      ruleForm: {
        name: '',
        phone: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        country: [{ validator: validateCountry, trigger: 'blur' }],
        city: [{ validator: validateCity, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
      ],
      valueCountry: '江西省',
      valueCity: '南昌市',
      radio: '1',
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  components: { SubNavBar },

  computed: {},

  mounted() {
    console.log(this.value)
  },
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