<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import {useUserStore} from "@/stores/userStore.js";
import {ElMessage} from "element-plus";



export default {
  name: 'Home',
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

  methods: {
    goToWord() {
      // 用户点击按钮时导航到需要登录权限的页面
      this.$router.push({ name: 'StartWordHome', meta: { requiresAuth: true } });

    },

    goToGame(){
      //this.$router.push({ name: 'StartWordHome', meta: { requiresAuth: true } });

      ElMessage.error('暂未开发完成')
    }
  }

}


</script>

<template>

    <HeaderNavigator  v-if="!userStore.isLoggedIn"></HeaderNavigator>
    <AfterHeaderNavigator v-else></AfterHeaderNavigator>

    <div>
      
      <el-row :gutter="180">
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <el-card style="max-width: 480px">
<!--            <router-link to="/StartWordHome">-->
              <img class="image" @click="goToWord"
                  src="../assets/learn.png"
              />

<!--            </router-link>-->
          </el-card>
            <el-button type="primary" round @click="goToWord">开始背单词</el-button>


        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <el-card style="max-width: 480px">
<!--            <router-link to="/WordDetail">-->
              <img class="image" @click="goToGame"
                  src="../assets/chess.png"

              />
<!--            </router-link>-->
          </el-card>
<!--          <router-link to="/PersonalBook">-->
            <el-button type="primary" round @click="goToGame">Around the Words
            ——在游戏中学单词</el-button>

<!--          </router-link>-->

        </el-col>


        <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>

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

.image {
  width: 380px;
  height: 280px;
}

.el-button {
  width: 380px;
  height: 60px;

}

</style>