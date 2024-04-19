<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

export default {
  name: 'Home',
  components: {AfterHeaderNavigator, HeaderNavigator}
}
</script>

<template>
    <HeaderNavigator></HeaderNavigator>

    <div>
      
      <el-row :gutter="180">
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <el-card style="max-width: 480px">
            <router-link to="/PersonalBook">
              <img class="image"
                  src="../assets/learn.png"
              />

            </router-link>

          </el-card>
          <router-link to="/PersonalBook">
            <el-button type="primary" round>开始背单词</el-button>

          </router-link>


        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <el-card style="max-width: 480px">
            <router-link to="/WordDetail">
              <img class="image"
                  src="../assets/chess.png"

              />
            </router-link>
          </el-card>
          <router-link to="/PersonalBook">
            <el-button type="primary" round>Around the Words
            ——在游戏中学单词</el-button>

          </router-link>

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