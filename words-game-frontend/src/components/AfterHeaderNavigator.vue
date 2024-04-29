<script>
export default {
  name: "AfterHeaderNavigator",

  methods: {
    goToPersonal() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({name: 'PersonalBook'});
    }
  }

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
      <router-link to="/">
      <img
          style="width: 200px"
          src="../assets/logo.png"
          alt="Element logo"
      />
      </router-link>
    </el-menu-item>
    <div class="flex-grow" />
   
    <el-menu-item index="1" @click="goToPersonal">
      个人中心
    </el-menu-item>


  </el-menu>
</template>




<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>