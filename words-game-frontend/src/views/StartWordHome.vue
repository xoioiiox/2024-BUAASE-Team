<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

export default {
  name: 'StartWordHome',
  components: {AfterHeaderNavigator, HeaderNavigator}
}
</script>

<template>
  <AfterHeaderNavigator></AfterHeaderNavigator>

  <div>

    <router-link to="/">
      <el-button type="primary" round>开始背单词</el-button>

    </router-link>
  </div>

</template>

<style scoped>

</style>