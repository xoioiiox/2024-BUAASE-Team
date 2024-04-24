<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import {useUserStore} from "@/stores/userStore.js";


export default {
  name: 'StartWordHome',
  components: {AfterHeaderNavigator, HeaderNavigator},

  // 在Vue组件的生命周期钩子中使用store
  created() {
    this.userStore = useUserStore();
    console.log(this.userStore.user);
    console.log(this.userStore.isLoggedIn);
  },

  data() {
    return {
      userStore: null // 初始化为null
    };
  },


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