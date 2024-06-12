<script setup>

import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
</script>

<template>
  <AfterHeaderNavigator></AfterHeaderNavigator>

  <el-tabs tab-position="left"  class="demo-tabs">
    <el-tab-pane label="词书创建方法" >
      <img src="https://s2.loli.net/2024/05/07/4dt7eSrksQ5ygXu.jpg" alt="自定义词书创建方法">
    </el-tab-pane>


  </el-tabs>


</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: white;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>