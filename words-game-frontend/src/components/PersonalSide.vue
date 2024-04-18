<template>
  <el-row>
		<el-col>
      <h5 class="mb-2">Default colors</h5>
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
          <el-icon><icon-menu /></el-icon>
          <span>当前词书</span>
        </el-menu-item>
        <el-menu-item index="2" @click="">
          <el-icon><document /></el-icon>
          <span>统计信息</span>
        </el-menu-item>
        <el-menu-item index="3" @click="">
          <el-icon><setting /></el-icon>
          <span>生词本记录</span>
        </el-menu-item>
        <el-menu-item index="4" @click="toEditInfo()">
          <el-icon><setting /></el-icon>
          <span>修改个人信息</span>
        </el-menu-item>
        <el-menu-item index="5" @click="">
          <el-icon><setting /></el-icon>
          <span>排行榜</span>
        </el-menu-item>
        <el-menu-item index="6" @click="toSetting()">
          <el-icon><setting /></el-icon>
          <span>学习设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
	export default {
		name: "PersonalSide",
		data() {
			return {

			};
		},
		methods: {
			toChooseBook() {
        this.$router.push({path:'/PersonalBook/'})
      },
			toEditInfo() {
        this.$router.push({path:'/PersonalInfo/'})
      },
			toSetting() {
        this.$router.push({path:'/PersonalSetting/'})
      },
		}
	}
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>