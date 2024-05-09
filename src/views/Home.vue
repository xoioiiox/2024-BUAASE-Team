<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import { useUserStore } from "@/stores/userStore.js";
import { ElMessage } from "element-plus";

export default {
  name: "Home",
  components: { AfterHeaderNavigator, HeaderNavigator },
  // 在Vue组件的生命周期钩子中使用store
  created() {
    this.userStore = useUserStore();
    console.log(this.userStore.user);
    console.log(this.userStore.isLoggedIn);
  },

  data() {
    return {
      userStore: null, // 初始化为null
    };
  },

  methods: {
    goToWord() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({
        name: "StartWordHome",
        meta: { requiresAuth: true },
      });
    },

    goToGame() {
      //this.$router.push({ name: 'StartWordHome', meta: { requiresAuth: true } });
      ElMessage.error("暂未开发完成");
    },
  },
};
</script>

<template class="page-container">
  <div class="header-container">
    <HeaderNavigator v-if="!userStore.isLoggedIn"></HeaderNavigator>
    <AfterHeaderNavigator v-else></AfterHeaderNavigator>
  </div>

  <el-row class="home-container">
    <el-col :span="8" class="home-col">
      <el-card class="home-card" :body-style="{ padding: '0px' }">
        <img
          class="home-image"
          @click="goToWord"
          src="https://s2.loli.net/2024/04/29/HPLpnfmO9aGlCbI.png"
        />
        <div class="overlay">
          <el-button type="primary" round @click="goToWord"
            >开始背单词</el-button
          >
        </div>
      </el-card>
    </el-col>

    <el-col :span="8" class="home-col">
      <el-card class="home-card" :body-style="{ padding: '0px' }">
        <img
          class="home-image"
          @click="goToGame"
          src="https://s2.loli.net/2024/04/29/tiKkA4aUm2lLySh.png"
        />
        <div class="overlay">
          <el-button type="primary" round @click="goToGame"
            >Around the Words <br />
            在游戏中学单词</el-button
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
  font: bold;
}

/*
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.image {
  width: 380px;
  height: 280px;
}

.el-button {
  width: 380px;
  height: 60px;
} */
</style>
