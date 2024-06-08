<script setup>
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import router from "@/router";

const goToRank  = () => {
  router.push({
    path: "/PersonalRank"
  });
}

const goToArchive = () => {
  router.push({
    path: '/PersonalAchieve'
  });

}


const goToDrawCard = () => {
  router.push({
    path: '/DrawView'
  });
}


</script>

<template>
  <div>
   <AfterHeaderNavigator></AfterHeaderNavigator>
  </div>


  <div class="flex-container">



        <el-button type="primary" @click="goToArchive">成就展示</el-button>

        <div>
          <p class="circle-bordered">
            8 次
          </p>


          <p style="margin-left: 25px;">今日剩余次数</p>
        </div>


        <el-button type="primary" @click="goToRank">排行榜</el-button>



  </div>


  <div class="flex-card-container">
    <!-- 按钮居中 -->

    <el-button type="primary" round class="center" @click="goToDrawCard">开始游戏</el-button>

    <!-- 卡片靠右 -->
    <el-card class="right">
      <template #header>
        <div class="card-header">
          <span>每日任务列表</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
    </el-card>
  </div>






</template>

<style scoped>
.flex-container {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-around; /* 子元素之间的间距平均分布 */
}



.circle-bordered {
  margin-top: 50px;
  width: 150px;
  height: 150px;
  background-color: white;
  border: 2px solid #3498db;
  border-radius: 50%;
  display: flex;          /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中文本 */
  align-items: center;     /* 垂直居中文本 */
  text-align: center;      /* 确保文本水平居中（如果需要） */
  font-size: 16px;         /* 根据需要设置字体大小 */
  font-weight: bold;       /* 根据需要设置字体粗细 */
  line-height: 150px;      /* 与高度相匹配的行高以垂直居中文本 */
}


.flex-card-container {
  display: flex;
  justify-content: center; /* 将卡片对齐到容器的末端 */
  align-items: center; /* 垂直居中对齐 */
}

/* 按钮类，可以添加更多样式来调整按钮的外观 */
.center {
  width:270px;
  height: 80px;

  margin-left: 20px;
  margin-right: -200px;
  font-size: 28px;
}

/* 卡片类，确保卡片宽度固定或根据内容自适应 */
.right {
  flex-shrink: 0; /* 防止卡片宽度被压缩 */
  width: 300px; /* 给卡片一个固定宽度，或者使用max-width */

  margin-left: 450px;
  margin-right: -550px;
}




</style>