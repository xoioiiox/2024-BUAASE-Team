<template>

  <div class="common-layout">
    <el-container>
      <!-- 浏览器上方区域 -->
      <div aria-label="A complete example of page header">
        <!-- 返回主页箭头 -->
        <el-page-header @back="back2home">
          <template #content>
          </template>
          <!-- 收藏删除按钮区域 -->
          <template #extra>
            <div class="flex items-center">
              <!-- 收藏按钮 -->
              <el-button @click="collectWord(newWord)">收藏</el-button>
              <!-- 删除按钮，双重确认 -->
              <el-popconfirm title="Are you sure to delete this?" @confirm="deleteWord(newWord)">
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
                <el-progress :text-inside="true" :stroke-width="35" :percentage="Ratio.ratio" />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!-- 展示主体区域 -->
      <el-main>
        <!-- 显示单词英语区域 -->
        <el-card class="word-container">
          <!-- 单词 -->
          <div class="timeNewRomanCard" align="center" style="margin-top: 10px;">
            hello
            <!-- {{ newWord.word }} -->
          </div>
          <!-- 音标 -->
          <div class="black-body" align="center" style="margin-top: 10px;">
            /həˈləʊ/
          </div>
          <!-- 例句 -->
          <div class="black-body" align="center" style="margin-top: 100px;">
            This is a sentence about hello.
          </div>
        </el-card>
        <!-- 下方认识程度选择区域 -->
        <!-- 选择按钮区域 -->
        <!-- 跳转到单词详细释义界面，打上不认识标签 -->
        <el-row :gutter="30">
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="TagWord(newWord, '不认识')">不认识</el-button>
            </div>
          </el-col>
          <!-- 跳转到单词释义界面，同时打上认识标签 -->
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="TagWord(newWord, '认识')">认识</el-button>
            </div>
          </el-col>
          <!-- 跳转到单词释义界面，同时打上模糊标签 -->
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
            <div class="choice-button-container">
              <el-button class="choice-button" @click="TagWord(newWord, '模糊')">模糊</el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage, ElNotification as notify } from 'element-plus'
import axios from "axios";
import { onMounted } from "vue";


//返回主页
const back2home = () => {
  router.push('/')// 主页路由
}

const Ratio = {
  ratio: Number(0)   //学习进度
}
const getDayRatio = () => {
  const response = axios.get('/api/word/get-daily-ratio/');
  response.then(function (response) {
        if (response.status === 200) {
          //console.log(response.data)
          Ratio.ratio = response.data.ratio
          ElMessage({
            message: '获取日常学习数据成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '获取日常学习数据失败',
            type: 'error'
          })
        }
      }
  )
}



//获取到的新单词
const newWord = {
  word: 'hello'
}
onMounted(() => {
  getDayRatio();
  getNextWord();
})
//获取一个新单词
const getNextWord = async () => {
  // 调用后端接口获取新单词
  const response = await axios.get('/api/word/get-next-word/');
  if (response.status === 200) {
    newWord.word = response.data.word;
    ElMessage({
      message: '获取单词成功',
      type: 'success'
    });
  } else {
    ElMessage({
      message: '获取单词失败',
      type: 'error'
    });
  }
}

const TagWord = (newWord, rate) => {
  //notify('Word Detail')
  const response = axios.post('/api/word/tag-word/', {
    params: {
      word: newWord.word,
      tag: rate  //标记为    不认识   认识   模糊
    }
  });
  response.then(function (response) {
    if (response.status === 200) {
      ElMessage({
        message: '标记成功',
        type: 'success'
      });
    } else {
      ElMessage({
        message: '标记失败',
        type: 'error'
      });
    }
  })
  //跳转到单词释义界面
  router.push({ path: '/WordDetail', query: { word: newWord.word } })// 单词详细释义路由
}

//将单词加入生词本
const collectWord = (newWord) => {
  const response = axios.post('/api/word/add-favor-word/', {
    word: newWord.word
  });
  response.then(function (response) {
    if (response.status === 200) {
      ElMessage({
        message: '收藏成功',
        type: 'success'
      });
    } else {
      ElMessage({
        message: '收藏失败',
        type: 'error'
      });
    }
  })
}

//将单词删除
const deleteWord = (newWord) => {
  const response = axios.post('/api/word/tag-word/', {
    word: newWord.word,
    tag: 0  //标记为已删除 = 已认识
  });
  response.then(function (response) {
    if (response.status === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      });
      notify('Delete word success')
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error'
      });
      notify('Failed to Delete word')
    }
  })
  //刷新页面，获取一个新的单词，获取新的学习进度
  getDayRatio();
  getNextWord();
}


const router = useRouter();


</script>



<style scoped>
.choice-button {
  width: 200px;
  height: 100px;
}

.choice-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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

.timeNewRomanCard {
  font-family: 'Time New Roman', Times, serif;
  font-size: 80px;
}

.word-container {
  display: flex;
  justify-content: center;
  height: 50vh;
  margin-top: 25px;
}

.black-body {
  font-family: '黑体', 'Heiti SC', sans-serif;
}
</style>
