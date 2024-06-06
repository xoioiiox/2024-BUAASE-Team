<template>
    <div class="back-home" @click="goBackHome()">
			<span class="font_13">乐词不疲</span>
		</div>
  <div class="login-container">
    <img
			class="shrink-0 image_2 pos_74"
			src="../assets/bg-star.png"
		/>
		<img
			class="shrink-0 image_2 pos_68"
			src="../assets/bg-star.png"
		/>
    <el-card class="login-card">
      <!-- 显示单词英语区域 -->
      <!--img src="../assets/user.svg" alt="Logo" class="logo" /-->
      <h2 class="login-title">登录</h2>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        status-icon
        label-position="top"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          >
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
          <el-button
            class="login-button login-font"
            type="primary"
            @click="submitForm(loginFormRef)"
            >登录</el-button
          >
          <!--el-button
            class="login-button"
            type="primary"
            @click="resetForm(loginFormRef)"
            >重置</el-button
          -->
        </div>
        <div class="login-button-container">
          <el-button class="signup-button signup-font" @click="register"
            >没有账号？注册</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/apis/apis";
//import axios from "axios";

import { useUserStore } from "@/stores/userStore";


interface Form {
  username: string;
  password: string;
}

const goBackHome= ()=> {
  router.push('/')
}

const loginForm = reactive<Form>({
  username: "",
  password: "",
});

const loginFormRef = ref<FormInstance>();

const router = useRouter();

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
};

const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

interface LoginForm {
  username: string;
  password: string;
}

const userStore = useUserStore(); // 从stores中引入

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 验证表单内容
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        login(loginForm); // 调用登录api

        userStore.login(loginForm); //  从stores中引入
      } catch (e) {
        // 4. 处理注册失败情况
        this.$message.error("登录失败，请检查用户名或密码");
        console.error(e);
      }
    } else {
      console.log("error submit!");
      this.$message.error("登录失败，请检查用户名或密码");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const register = () => {
  router.push("/register");
};
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /*background-image: url("https://s2.loli.net/2024/04/29/B7Mjd4UkcOPzayH.jpg"); /* 背景图片路径 */
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(180deg, #2c0b6c 30.1%, #974fc7 100%);
}
.back-home {
	position: absolute;
	margin-top: 20px;
	margin-left: 50px;
	cursor: pointer;
	z-index: 99; /*绝对定位下，需要设置高优先级*/
}
.font_13 {
	font-size: 38px;
	font-family: Poppins;
	line-height: 44.5px;
	color: #ffffff;
	text-shadow: 0px 4px 10px #fbdd6f;
}
.image_2 {
  width: 876px;
  height: 546px;
}
.pos_74 {
  position: absolute;
  left: 90px;
  top: 100px;
}
.pos_68 {
  position: absolute;
  right: 30px;
  top: 100px;
}

.login-card {
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

.login-title {
  font-size: 38px;
  font-family: Poppins;
  line-height: 35.5px;
  font-weight: 700;
  color: #ffffff;
}

.login-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.login-button {
  width: 100%;
  height: 100%;
  padding: 14px 0;
  border-radius: 10px;
  background-color: #2c0b6c;
}

.login-font {
  font-size: 16px;
  font-family: Poppins;
  line-height: 19px;
  font-weight: 700;
  color: #ffffff;
}

.signup-button {
  width: 100%;
  height: 100%;
  padding: 14px 0;
  border-radius: 10px;
}

.signup-font {
  font-size: 16px;
  font-family: Poppins;
  line-height: 19px;
  font-weight: 700;
  color: #2c0b6c;
}

.choice-button {
  width: 100%;
  height: 100%;
}

.delete-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.choice-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/deep/.el-form-item__label {
  font-size: 14px;
  color: #ffffff;
}
</style>