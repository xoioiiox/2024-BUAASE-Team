<template>
    <div class="common-layout">
      <el-container>
        <div aria-label="A complete example of page header">
          <el-page-header @back="back2home">
            <template #content>
            </template>
            <template #extra>
            </template>
          </el-page-header>
        </div>
        <el-header>
          <el-row type="flex" justify="center" align="middle" style="height: 20vh;">
            <el-col :span="18">
              <div class="centered-content">
                <div class="demo-progress">
                  <el-progress :text-inside="true" :stroke-width="35" :percentage="Experience" />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
           <!--剩余抽卡次数-->
            <div>
              <p class="circle-bordered">
                剩余{{Count}} 次
              </p>
            </div>
           <!--选择卡片-->
          <el-row :gutter="30">
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" />
              <div class="choice-button-container">
                <el-button class="choice-button" @click="DrawCard">事件卡</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" />
              <div class="choice-button-container">
                <el-button class="choice-button" @click="DrawCard">事件卡</el-button>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content ep-bg-purple" />
              <div class="choice-button-container">
                <el-button class="choice-button" @click="DrawCard">事件卡</el-button>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </template>

  
  <script setup>
  import { useRouter } from "vue-router";
  import { ElMessage } from 'element-plus'
  import axios from "axios";
  import { onMounted, ref } from "vue";
  
  //返回主页
  const back2home = () => {
    router.push('/')// 主页路由
  }

  //获取用户当前个人经验值
  const Experience = ref(0)
  const getExperience = () => {
    const response = axios.get('/api/word/get-personal-experience/');
    console.log(response.data)
    response.then(function (response) {
      console.log(response.data)
      if (response.status === 200) {
        //console.log(response.data)
        Experience.value = response.data.Experience
      } else {
        ElMessage({
          message: '获取经验总值数据失败',
          type: 'error'
        })
      }
    }
    )
  }

  //获取当前用户的剩余抽卡次数
  const Count = ref(5)
  const getCount = () => {
    const response = axios.get('/api/word/get-draw-count/');
    response.then(function (response) {
      if (response.status === 200) {
        //console.log(response.data)
        Count.value = response.data.Count
      } else {
        ElMessage({
          message: '获取剩余抽卡次数失败',
          type: 'error'
        })
      }
    }
    )
  }

  //抽卡动作
  const DrawCard = () => {
    //router.push('/event2');
    const response = axios.post('/api/game/get-event');
    response.then(function (response) {
      if (response.status === 200) {
        //console.log(response.data)
        if(response.data.event_type=="道具类") {
            //console.log("道具抽卡")




        } else if (response.data.event_type=="任务类"){
            if (response.data.event_name=="汉译英-填空事件") {
              router.push('/event1');
            } else if (response.data.event_name=="汉译英-选择事件") {
              router.push('/event2');
            } else { //英译汉-选择题
              router.push('/event3');
            }
      } else {
        ElMessage({
          message: '抽卡失败',
          type: 'error'
        });
      }
    }
  })
  }

  const noMoreCard = () => {//抽卡次数用尽，返回游戏开始页面
    if (Count.value <= 0) {
      ElMessage({
        message: '没有抽卡次数了',
        type: 'warning'
      });
      router.push('/StartGameHome');
    }
  }
  
  const router = useRouter();
    
  onMounted(() => {
    getExperience();
    getCount();
    noMoreCard();
  })
  
  </script>
  
  
  
  <style scoped>
  .choice-button {
    width: 250px;
    height: 300px;
  }
  
  .choice-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
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
  /*.circle {
    width: 100px;
    height: 100px;
    align-items: center;
    border-radius: 50%;
    background-color: rgb(0, 153, 255);
   }*/

.circle-bordered {
  margin-top: 50px;
  width: 150px;
  height: 150px;
  background-color: rgb(255, 255, 255);
  border: 2px solid #374bae; 
  border-radius: 50%;
  display: flex;          /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中文本 */
  align-items: center;     /* 垂直居中文本 */
  text-align: center;      /* 确保文本水平居中（如果需要） */
  font-size: 16px;         /* 根据需要设置字体大小 */
  font-weight: bold;       /* 根据需要设置字体粗细 */
  line-height: 150px;      /* 与高度相匹配的行高以垂直居中文本 */
}
</style>

