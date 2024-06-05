<script>
export default {
  name: "HeaderNavigator",

  methods: {
    goToLogin() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({name: 'login'});
    }
  }
}
</script>

<template>
  <div class="bg">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 200px"
          src="https://s2.loli.net/2024/04/29/cwvlMF4oL83Z5Vt.png"
          alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" @click="goToLogin">

        登录 / 注册

    </el-menu-item>

  </el-menu>
  </div>
</template>




<style scoped>
.bg {
  background-image: linear-gradient(180deg, #16093d 0%, #2c0b6c 100%);
}
.flex-grow {
  flex-grow: 1;
}
</style>