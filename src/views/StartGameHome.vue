<script setup>
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import router from "@/router";
import { onMounted, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

onMounted(() => {
  getCount();
  getTasks();
});

const goToRank = () => {
  router.push({ path: "/PersonalRank" });
};
const goToArchive = () => {
  router.push({ path: "/PersonalAchieve" });
};
const goToDrawCard = () => {
  router.push({ path: "/DrawView" });
};

//获取当前用户的剩余抽卡次数
const Count = ref(5);
const getCount = () => {
  const response = axios.get("/api/word/get-draw-count/");
  response.then(function (response) {
    if (response.status === 200) {
      //console.log(response.data)
      Count.value = response.data.count;
    } else {
      ElMessage({
        message: "获取剩余抽卡次数失败",
        type: "error",
      });
    }
  });
};

// 获取用户每日任务
const Task = ref([]);
const getTasks = () => {
  const response = axios.get("/api/word/get-tasks/");
  response.then(function (response) {
    if (response.status === 200) {
      //console.log(response.data)
      Task.value = response.data.tasks;
    } else {
      ElMessage({
        message: "获取每日任务失败",
        type: "error",
      });
    }
  });
};

function filterTasks() {
  // 过滤出done为false的任务
  return Task.filter((task) => !task.done);
}
</script>

<template class="page-container">
  <div>
    <AfterHeaderNavigator />
  </div>
  <!--el-button type="primary" @click="goToArchive">成就展示</el-button>
	<el-button type="primary" @click="goToRank">排行榜</el-button-->
  <!--div>
		<p class="circle-bordered">
			剩余 {{Count}} 次
		</p>
	</div-->
  <div class="flex-card-container">
    <!-- 按钮居中 -->
    <el-button type="primary" round class="button-center" @click="goToDrawCard">
      <div style="margin-bottom: 15px; font-size: 36px">开始游戏</div>
      <div style="font-size: 20px; color: white; width: 100%">
        剩余{{ Count }}次
      </div>
    </el-button>
    <!-- 卡片靠右 -->
    <div class="task-card">
      <div class="task-head">
        <div class="task-head-inner"></div>
      </div>
      <div class="task-inner">
        <div class="game-home-card-header">
          <span>每日任务列表</span>
        </div>
        <el-scrollbar>
          <p v-for="task in Task" :key="task.task_name" class="task-item">
            {{ task.task_name }} - {{ task.task_description }}
          </p>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex; /* 启用Flexbox布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-around; /* 子元素之间的间距平均分布 */
  color: #2c1c55;
}

.circle-bordered {
  margin-top: 50px;
  width: 150px;
  height: 150px;
  background-color: white;
  border: 2px solid #3498db;
  border-radius: 50%;
  display: flex; /* 使用Flexbox布局 */
  justify-content: center; /* 水平居中文本 */
  align-items: center; /* 垂直居中文本 */
  text-align: center; /* 确保文本水平居中（如果需要） */
  font-size: 16px; /* 根据需要设置字体大小 */
  font-weight: bold; /* 根据需要设置字体粗细 */
  line-height: 150px; /* 与高度相匹配的行高以垂直居中文本 */
}

.flex-card-container {
  display: flex;
  justify-content: center; /* 将卡片对齐到容器的末端 */
  align-items: center; /* 垂直居中对齐 */
}

/* 按钮类，可以添加更多样式来调整按钮的外观 */
.button-center {
  position: absolute;
  bottom: 150px;
  width: 300px;
  height: 130px;
  font-size: 28px;
  box-shadow: 0px 10px 0px #ba9d32;
}

::v-deep.el-button > span {
  align-items: center; /* 中心对齐 */
  display: inline-flex; /* 使用 inline-flex 布局 */
  flex-direction: column; /* 垂直方向排列子元素 */
  justify-content: center; /* 垂直居中 */
}

/* 卡片类，确保卡片宽度固定或根据内容自适应 */
.task-card {
  position: absolute;
  background-color: #fce6c6;
  border-radius: 30px;
  bottom: 150px;
  right: 100px;
  width: 280px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-inner {
  background-color: #fff9ed;
  border-radius: 30px;
  width: 250px;
  height: 380px;
}
.task-head {
  position: absolute;
  top: -10px;
  background-color: #545454;
  border-radius: 5px;
  width: 110px;
  height: 30px;
  display: flex;
  justify-content: center;
}
.task-head-inner {
  position: absolute;
  top: -5px;
  background-color: #d3d3d3;
  border-radius: 5px;
  width: 70px;
  height: 20px;
}
.game-home-card-header {
  font-family: Poppins;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  padding-left: 30px;
  color: #2c1c55;
}
.task-item {
  font-family: Poppins;
  margin-top: 10px;
  margin-left: 30px;
}
</style>
