<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";


export default {
  name: "Home",
  components: { AfterHeaderNavigator},


  methods: {
    goToCard() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({
        name: "StartGameHome"
      });
    },

    goToSnake() {
      // ElMessage.error("暂未开发完成");
      this.$router.push({
        name: "SnakeGame"

      });
    },
  },
};
</script>

<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator></AfterHeaderNavigator>
  </div>

  <el-row class="home-container">
    <el-col :span="8" class="home-col">
      <el-card class="home-card" :body-style="{ padding: '0px' }">
        <img
            class="home-image"
            @click="goToCard"
            src="../assets/cardPic.jpg"
        />
        <div class="overlay">
          <el-button type="primary" round @click="goToCard"
          >抽卡类游戏</el-button
          >
        </div>
      </el-card>
    </el-col>

    <el-col :span="8" class="home-col">
      <el-card class="home-card" :body-style="{ padding: '0px' }">
        <img
            class="home-image"
            @click="goToSnake"
            src="../assets/snakeGame/snake.png"
        />
        <div class="overlay">
          <el-button type="primary" round @click="goToSnake">
            贪吃蛇游戏</el-button
          >
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page-container {
  height: 100vh;
  width: 100vw;
}

.header-container {
  top: 0;
  height: 60px;
  width: 100%;
}

.home-container {
  /* border: 1px solid blue; */
  height: calc(100vh - 80px);
  width: 100%;
  padding: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 200px;
}

.home-col {
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-card {
  /* border: 1px solid black; */
  position: relative;
}

/* .el-card__body {
  --el-card-padding: 0;
} */

.home-image {
  object-fit: fill;
  display: block;
  width: 100%;
  height: 400px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-card:hover .overlay {
  opacity: 1;
}

.el-button {
  background-color: #fff;
  color: #409eff;
  width: 150px;
  height: 60px;
  overflow-wrap: break-word;
  font-weight: bold;
}


</style>
