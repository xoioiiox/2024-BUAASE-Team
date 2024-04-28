<template>
  <el-row class="side">
    <el-col>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <div class="avatar">
          <el-avatar :size="130" :src="circleUrl"></el-avatar>
        </div>
        <el-menu-item index="1" @click="toChooseBook()">
          <el-icon><Notebook /></el-icon>
          <span>选择词书</span>
        </el-menu-item>
        <el-menu-item index="2" @click="toStatistics()">
          <el-icon><PieChart /></el-icon>
          <span>统计信息</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toSavedWords()">
          <el-icon><document /></el-icon>
          <span>生词本记录</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toEditInfo()">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="5" @click="">
          <el-icon><Histogram /></el-icon>
          <span>排行榜</span>
        </el-menu-item>
        <!--el-menu-item index="6" @click="toSetting()">
          <el-icon><setting /></el-icon>
          <span>学习设置</span>
        </el-menu-item-->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "PersonalSide",
  data() {
    return {};
  },
  methods: {
    toChooseBook() {
      this.$router.push({ path: "/PersonalBook/" });
    },
    toEditInfo() {
      this.$router.push({ path: "/PersonalInfo/" });
    },
    toSetting() {
      this.$router.push({ path: "/PersonalSetting/" });
    },
    toSavedWords() {
      this.$router.push({ path: "/SavedWords" });
    },
    toStatistics() {
      this.$router.push({ path: "/Statistics" });
    },
  },
};
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.side {
  margin-top: 50px;
}
</style>
