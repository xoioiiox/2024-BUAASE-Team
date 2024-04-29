<template>
  <el-row class="side">
    <el-col>
      <img style="width: 100px"
          src="../assets/logo.png"
          alt="Element logo"  @click="toHome()"/>
      <!--h5 class="mb-2" @click="toHome()">Default colors</h5-->
      <el-menu
        :default-active="$route.path"
        :router="true"
        class="el-menu-vertical-demo">
        <div class="avatar">
          <el-avatar :size="130" :src="imageUrl"></el-avatar>
        </div>
        <el-menu-item index="/PersonalBook/">
          <el-icon><Notebook /></el-icon>
          <span>选择词书</span>
        </el-menu-item>
        <el-menu-item index="/Statistics/">
          <el-icon><PieChart /></el-icon>
          <span>统计信息</span>
        </el-menu-item>
        <el-menu-item index="/SavedWords/">
          <el-icon><document /></el-icon>
          <span>生词本记录</span>
        </el-menu-item>
        <el-menu-item index="/PersonalInfo/">
          <el-icon><User /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
        <el-menu-item index="">
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
import axios from "axios"
export default {
  name: "PersonalSide",
  async created() {
		await axios({
			method: 'get',
			url: '/api/word/get-info/'
		}).then((res)=>{
			console.log(res)
			this.imageUrl = res.data.avatar;
		})
	},
  data() {
    return {
      imageUrl: ''
    };
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
    toHome() {
      this.$router.push({path: "/"});
    },
    changeAvatar(img_url) {
      this.imageUrl = img_url
    }
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
  margin-top: 20px;
}
</style>
