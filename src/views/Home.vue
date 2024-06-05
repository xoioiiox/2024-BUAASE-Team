<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import { useUserStore } from "@/stores/userStore.js";
import "../assets/styles/home.css";

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
      // ElMessage.error("暂未开发完成");
      this.$router.push({
        name: "StartGameHome",
        meta: { requiresAuth: true },
      });
    },
  },
};
</script>

<template class="page-container">
  <div class="header-container">
    <HeaderNavigator v-if="!userStore.isLoggedIn"></HeaderNavigator>
    <AfterHeaderNavigator v-else></AfterHeaderNavigator>
  </div>

  <div class="home-container">
    <div class="home-logo">
      <div class="logo-orbit-in">
        <div class="logo-planet"></div>
      </div>
      <div class="logo-orbit-out"></div>
      乐词不疲
    </div>

    <div class="home-buttons">
      <el-button type="primary" round @click="goToWord">开始背单词</el-button>
      <el-button type="primary" round @click="goToGame"
        >Around the Words <br />
        在游戏中学单词</el-button
      >
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100vh;
  width: 100vw;
}

.header-container {
  height: 80px;
  width: 100%;
}
</style>
