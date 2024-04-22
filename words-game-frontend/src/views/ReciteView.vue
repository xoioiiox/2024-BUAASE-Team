<template>

  <div class="common-layout">
    <el-container>

      




  <div aria-label="A complete example of page header">
    <!-- 返回主页箭头 -->
    <el-page-header @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
        </el-breadcrumb>
      </template>

      <template #content>
        <div class="flex items-center">
          <!-- 个人头像区域 -->
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          
          <span class="text-large font-600 mr-3"> username </span>
          <el-tag>U can do it!</el-tag>

        </div>
      </template>

      <template #extra>
        <div class="flex items-center">
          <!-- 收藏按钮 -->
          
          <el-button>收藏</el-button>
          <!-- 删除按钮，双重确认 -->
        <el-popconfirm title="Are you sure to delete this?">
          <template #reference>
            <el-button type="primary" class="ml-2">删除</el-button>
          </template>
        </el-popconfirm>   
        </div>
      </template>

    </el-page-header>
  </div>


    <!-- 顶部区域 -->
    <el-header>
    <!-- 进度显示区域 -->
    <el-row type="flex" justify="center" align="middle" style="height: 20vh;">
    <el-col :span="18">
      <div class="centered-content">
        <div class="demo-progress">
         <el-progress :text-inside="true" :stroke-width="35" :percentage="70" />
        </div>
      </div>
    </el-col>
    </el-row>


    </el-header>


      <!-- 展示区域 -->
      <el-main>
      <!-- 显示单词英语区域 -->
      
  <el-descriptions title="乐此不疲">
    <el-descriptions-item label="Words">kooriookami</el-descriptions-item>
    <el-descriptions-item label="">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="单词释义">
      No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>




      <!-- 选择按钮区域 -->
        <el-row :gutter="30">
          <el-col :span="8"><div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="register">不认识</el-button>
            </div>
        </el-col>
          <el-col :span="8"><div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="register">认识</el-button>
            </div>
        </el-col>
          <el-col :span="8"><div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="register">模糊</el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>



      
    </el-container>
  </div>
        



</template>







<script lang="ts" setup>
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
//import {login} from "@/apis/apis";
import { ElNotification as notify } from 'element-plus'

const onBack = () => {
  notify('Back')
}

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

  width: 200px;
  height: 100px;
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
  margin-top: 300px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 1000px;
}

</style>
