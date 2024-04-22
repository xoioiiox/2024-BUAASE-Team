


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
  
  
  
          <!-- 删除按钮 -->
          <div class="delete-button-container">
            <el-button type="primary" :icon="Delete" />
          </div>
  
        <!-- 选择按钮区域 -->
          <div class="choice-button-container">
            <el-button class="choice-button" @click="register">不认识</el-button>
          </div>
          <div class="choice-button-container">
            <el-button class="choice-button" @click="register">认识</el-button>
          </div>
          <div class="choice-button-container">
            <el-button class="choice-button" @click="register">模糊</el-button>
          </div>
  
  
  
  
        </el-form>
      </el-card>
    </div>
  </template>
  
  
  
  
  
  
  
  
  
  
  <script lang="ts" setup>
  import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import {reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  //import {login} from "@/apis/apis";
  
  
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
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单内容
    formEl.validate(async  (valid) => {
      if (valid) {
        try {
            //login(loginForm);
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
  
  
  

  





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












  <template>
    <div class="login-container">
      <el-card class="login-card">
        <!-- 头像区域 -->
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
  
  
  
  <script>
  import { useRouter } from 'vue-router'
  import { reactive, ref, getCurrentInstance } from 'vue'
  import { FormInstance, FormRules } from 'element-plus'
  import {ElMessage} from "element-plus"
  
  export default {
    setup() {
      const router = useRouter()
      const loginForm = reactive({
        username: '',
        password: '',
      })
      const loginFormRef = ref<FormInstance>()
      const rules = reactive<FormRules<typeof loginForm>>({
        username: [{ validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          } else {
            callback()
          }
        }, trigger: 'blur' }],
        password: [{ validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          } else {
            callback()
          }
        }, trigger: 'blur' }],
      })
  
      const currentInstance = getCurrentInstance()
      const { $axios } = currentInstance.appContext.config.globalProperties
  
      const submitForm = (formEl: FormInstance | undefined) => {
        $axios.request({
          url: '/login',
          method: 'post',
          data: loginForm
        }).then((response) => {
          if (!formEl) return
          // 验证表单内容
          formEl.validate(async  (valid) => {
            if (valid) {
            try {
              if (response.data.status == 200) {
              if (response.data.code === 0) {
                ElMessage({
                  message: '登录成功',
                  type: 'success'
                });
                const userinfo = {
                  userId:response.data.id,
                  userName:response.data.username,
                  userRole:response.data.role,
                }
                router.push('/')// 跳转到首页（默认路由）
              } else if (response.data.code === -1 || response.data.code === -2){
                ElMessage({
                  message: '用户名或密码错误',
                  type: 'warning'
                });
               }
              } else {
                ElMessage({
                  message: '请求失败',
                  type: 'error'
                });
              }
            } catch (e) {
          // 4. 处理注册失败情况
                console.error(e);
              }
            } else {
              console.log('error submit!')
              return false
            }
        })
        })
      }
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
      }
      const register = () => {
        router.push('/register')
      }
      return {
        loginForm,
        loginFormRef,
        rules,
        submitForm,
        resetForm,
        register
      }
    }
  }
  
  </script>
  
  
  
  
  
  
  
  
  
  <!--<script lang="ts" setup>
  //import type { FormInstance, FormRules } from 'element-plus'
  //import {reactive, ref} from "vue";
  //import {useRouter} from "vue-router";
  //import {login} from "@/apis/apis";
  
  
  /*interface Form {
    username: string;
    password: string;
  }*/
  
  /*const loginForm = reactive<Form>({
    username: '',
    password: '',
  })*/
  
  /*const loginFormRef = ref<FormInstance>()*/
  
  /*const router = useRouter();*/
  
  /*const validateUsername = (rule: any, value: any, callback: any) => {
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
  */
  /*const rules = reactive<FormRules<typeof loginForm>>({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
  })*/
  
  /*const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    // 验证表单内容
    formEl.validate(async  (valid) => {
      if (valid) {
        try {
            //login(loginForm);
          }catch (e){
          // 4. 处理注册失败情况
          console.error(e);
        }
      } else {
        console.log('error submit!')
        return false
      }
    })
  }*/
  
  /*const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }*/
  
  /*const register= ()=>{
    router.push('/register')
  }*/
  </script>-->
  
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
  
  </style>
  
  
  
  