<template>
  <div class="login" v-loading="loading">
    <div class="login_box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-form-item label="账 号" prop="name" @keyup.enter.native="submitForm('ruleForm')">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password" @keyup.enter.native="submitForm('ruleForm')">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login_box1">
      <h1 class="login_box1_text">
        宾爵后台管理系统
      </h1>
    </div>
  </div>
</template>

<script>
import {login} from '../api/index.js'
export default {
  data () {
    return {
      loading: false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '求求你输入账号吧', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '求求你输入密码吧', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录验证及登录
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          login({
            username: this.ruleForm.name,
            password: this.ruleForm.password
          }).then(res => {
            let timer = setTimeout(() => {
              if (res.code === 200) {
                localStorage.setItem('username', this.ruleForm.name)
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$router.push({
                      path: '/'
                    })
                  }
                })
              } else {
                this.$message.error('怎么回事啊,小老弟?')
              }
              this.loading = false
              clearTimeout(timer)
            }, 2000)
          })
        }
      })
    },
    // 重置输入框
    resetForm () {
      this.$message({
        message: '小老弟,你的思想很危险啊!!!!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

  .login {
    background-image: url('../assets/login-background.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .login_box {
    background-color: rgba(255,255,255,.5);
    position: absolute;
    right: 25%;
    top: 50%;
    transform: translateY(-80%);
    width: 350px;
    height: 350px;
    border-radius: 10px;
  }

  .el-form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .el-form-item:last-child {
    margin-top: 20px;
    margin-bottom: 0;
  }

  .login_box1 {
    position: absolute;
    width: 350px;
    height: 350px;
    left: 25%;
    top: 50%;
    transform: translateY(-80%);
  }

  .login_box1_text {
    text-align: center;
  }

  .el-message-box__message {
    width: 100%;
  }

</style>
