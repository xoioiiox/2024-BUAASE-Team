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

    <el-row>

    </el-row>
    <el-row>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="progress-wrapper">
        <el-progress type="circle" :percentage="50" />
        </div>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24" class="text-center"><span>当前词书进度</span></el-col>
    </el-row>
   

    <el-row>
      <el-col :span="24" class="button-center">
        <router-link to="/recite">
          <el-button type="primary" round>
            开始背单词
          </el-button>

        </router-link>
      </el-col>

    </el-row>

  </div>

</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-progress--circle {
  display: flex;
  justify-content: center;
  align-items: center; /* 如果需要垂直居中，添加这行 */
  height: 100px; /* 根据父元素高度自定 */
}

.text-center span {
  text-align: center;
  display: block; /* 或者 inline-block */
  line-height: 100px; /* 根据父元素高度自定，使文本垂直居中 */
}

.button-center {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 可以根据需要设置高度 */
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>