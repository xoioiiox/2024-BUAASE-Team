<template>
  <div class="register-container">
    <el-card class="register-card">
      <!--img src="../assets/user.svg" alt="Logo" class="logo"-->
      <h2 class="register-title">用户注册</h2>
      <el-form
          ref="registerFormRef"
          :model="registerForm"
          status-icon
          :rules="rules"
          label-position="top"
      >
        <!--输入用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <!--输入手机号码-->
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone" />
        </el-form-item>
        <!--输入密码-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" autocomplete="off"/>
        </el-form-item>
        <!--确认自己的密码-->
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <!--按钮区域-->
        <div class="register-button-container">
          <el-button type="primary" @click="submitForm(registerFormRef)" class="register-button button1">注册</el-button>
          <el-button @click="resetForm(registerFormRef)" class="register-button button2">重置</el-button>
        </div>
        <div class="register-button-container">
          <el-button class="register-button button2" @click="login">已有账号，点我登录</el-button>
        </div>

      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {useRouter} from "vue-router";
import {register} from "@/apis/apis";
import {ElMessage, ElNotification} from 'element-plus'

// 定义一个方法来显示通知
const showNotification = () => {
  ElNotification({
    title: 'Warning',
    message: '本网站尚处于测试阶段，用户名与密码请不要与日常使用相似，以免造成损失 [手机号只需为1开头的11位号码]',
    type: 'warning',
    duration: 5000
  });
}

// 在页面挂载后调用showNotification方法
onMounted(() => {
  showNotification();
});

interface Form {
  username: string;
  phone:string;
  password: string;
  confirmPassword: string;
}


const registerForm = reactive<Form>({
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const registerFormRef = ref<FormInstance>()

const router = useRouter();

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  }else{
    callback()
  }
}

const validatePhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('手机号码不能为空'))
  }else if(value.match(/^[1][0-9]{10}$/)==null){
    return callback(new Error('手机号码格式不正确'))
  }else{
    callback()
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (registerForm.password !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('confirmPassword', () => null)
    }
    callback()
  }
}
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof registerForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async  (valid) => {
    if (valid) {
      try {
        ElMessage({
          type: 'warning',
          message: "请等待几秒，稍后会自动跳转至首页"
        })
        // 1. 发送请求
        register(registerForm);
      } catch (e) {
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

const login= ()=>{
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background-image: url("https://s2.loli.net/2024/04/29/B7Mjd4UkcOPzayH.jpg"); /* 替换为你的背景图片路径 */
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(180deg, #2c0b6c 30.1%, #974fc7 100%);
}

.register-card {
  padding: 10px 60px 50px;
  background-color: #5782c147;
  border-radius: 40px;
  border-image-slice: 1;
  backdrop-filter: blur(12.5px);
  width: 400px;
  border-left: solid 3px #5882c17d;
  border-right: solid 3px #5882c17d;
  border-top: solid 3px #5882c17d;
  border-bottom: solid 3px #5882c17d;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.register-title {
  font-size: 38px;
  font-family: Poppins;
  line-height: 35.5px;
  font-weight: 700;
  color: #ffffff;
}

.register-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.register-button{
  width: 100%;
  height: 100%;
}

.button1 {
  width: 100%;
  height: 100%;
  padding: 14px 0;
  border-radius: 10px;
  background-color: #2c0b6c;
  /*font*/
  font-size: 16px;
  font-family: Poppins;
  line-height: 19px;
  font-weight: 700;
  color: #ffffff;
}

.button2 {
  width: 100%;
  height: 100%;
  padding: 14px 0;
  border-radius: 10px;
  /*font*/
  font-size: 16px;
  font-family: Poppins;
  line-height: 19px;
  font-weight: 700;
  color: #2c0b6c;
}

</style>