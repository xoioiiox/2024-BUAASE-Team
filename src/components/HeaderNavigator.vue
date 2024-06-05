<script>
import "../assets/styles/header.css";
export default {
  name: "HeaderNavigator",

  methods: {
    goToLogin() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<template class="header">
  <el-menu
    :default-active="activeIndex"
    :ellipsis="false"
    @select="handleSelect"
    active-text-color="#2c0b6c"
    mode="horizontal"
    class="header-menu"
  >
    <el-menu-item index="0"> </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item class="header-button-before" index="1" @click="goToLogin">
      登录 / 注册
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>
