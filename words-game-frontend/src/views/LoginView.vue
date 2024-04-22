<template>
  <div class="login-container">
    
    <el-card class="login-card">
      <!-- 显示单词英语区域 -->
      <img src="../assets/user.svg" alt="Logo" class="logo">
      <h2 class="login-title">登录</h2>
      <!-- 登录表单区域 -->
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          status-icon
          label-position="top">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input 
          v-model="loginForm.username" 
          prefix-icon="el-icon-user" 
          placeholder="请输入用户名">
        </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              show-password
          ></el-input>
        </el-form-item>

      <!-- 按钮区域 -->
        <div class="login-button-container">
          <el-button class="login-button" type="primary" @click="submitForm(loginFormRef)">登录</el-button>
          <el-button class="login-button" type="primary" @click="resetForm(loginFormRef)">重置</el-button>
        </div>
        <div class="login-button-container">
          <el-button class="login-button" @click="register">没有账号？注册</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>







<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {login} from "@/apis/apis";
//import axios from "axios";



interface Form {
  username: string;
  password: string;
}

const loginForm = reactive<Form>({
  username: '',
  password: '',
})

const loginFormRef = ref<FormInstance>()

const router = useRouter();

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }else{
    callback()
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  }else{
    callback()
  }
}

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

interface LoginForm {
    username: string;
    password: string;
}


const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 验证表单内容
  formEl.validate(async  (valid) => {
    if (valid) {
      try {
          login(loginForm);
        }catch (e){
        // 4. 处理注册失败情况
        console.error(e);
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const register= ()=>{
  router.push('/register')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("./src/assets/logoBG.jpg"); /* 背景图片路径 */
  background-size: cover;
  background-position: center;
}

.login-card {
  width: 400px;
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
}



.login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.login-button{
  width: 100%;
  height: 100%;
}

.choice-button{
  width: 100%;
  height: 100%;
}


.delete-button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.choice-button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

</style>