<script>
export default {
  name: "HeaderNavigator",

}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 100px"
          src="../assets/logo.svg"
          alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <router-link to="/login">
        登录 / 注册

      </router-link></el-menu-item>

  </el-menu>
</template>




<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>