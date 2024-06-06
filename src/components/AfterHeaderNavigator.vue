<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";
import "../assets/styles/header.css";

export default {
  name: "AfterHeaderNavigator",

  // 在Vue组件的生命周期钩子中使用store
  created() {
    this.userStore = useUserStore();
  },

  data() {
    return {
      userStore: null, // 初始化为null
    };
  },
  methods: {
    goBackHome() {
      this.$router.push({ path: "/" });
    },
    goToGuide() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({ path: "/guide" });
    },

    goToPersonal() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({ name: "PersonalBook" });
    },

    goToLogOut() {
      axios
        .post("/api/word/logout/", {
          params: {},
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ path: "/" });
          this.userStore.logout();
        });
    },
  },
};
</script>

<template class="header">
  <el-menu
    :default-active="activeIndex"
    class="header-menu"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <div
        v-if="$route.name != 'Home'"
        class="header-logo font_13"
        @click="goBackHome()"
      >
        乐词不疲
      </div>
    </el-menu-item>
    <div class="flex-grow"></div>

    <el-menu-item class="header-button-after" index="1" @click="goToGuide">
      使用说明
    </el-menu-item>
    <el-menu-item class="header-button-after" index="2" @click="goToPersonal">
      个人中心
    </el-menu-item>
    <el-menu-item class="header-button-after" index="3" @click="goToLogOut">
      登出
    </el-menu-item>
  </el-menu>
</template>

<style scoped></style>

<!-- <img
        style="width: 200px"
        src="https://s2.loli.net/2024/04/29/cwvlMF4oL83Z5Vt.png"
        alt="Element logo"
/> -->
