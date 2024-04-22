<script>
export default {
  name: "AfterHeaderNavigator",

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
    <router-link to="/PersonalBook">
    <el-menu-item index="1">
      个人中心
    </el-menu-item>
    </router-link>

  </el-menu>
</template>




<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>