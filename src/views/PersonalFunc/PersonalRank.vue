<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>
  <div class="personal-rank-page">
    <div class="personal-side">
      <div class="side-item" @click="toChooseBook">
        <span>选择词书</span>
      </div>
      <div class="side-item" @click="toStatistics">
        <span>统计信息</span>
      </div>
      <div class="side-item" @click="toAchieve">
        <span>成就展示</span>
      </div>
      <div class="side-item-selected" @click="toRank">
        <img
          class="side-item-icon"
          src="../../assets/personal-center/side-4.png"
        />
        <span>排行榜</span>
      </div>
      <div class="side-item" @click="toEditInfo">
        <span>个人信息</span>
      </div>
    </div>

    <div class="card-container">
      <div class="personal-page-header">排行榜</div>
      <div class="inner-card-container">
        <el-scrollbar height="450px">
          <div class="scrollbar-card">
            <div class="section_52 rank-1">
              <div class="inner-text">
                <span class="text_54 wd_300">NO.1</span>
                <span class="text_50 wd_280">{{
                  this.rankList[0]?.username
                }}</span>
                <span class="text_50">{{ this.rankList[0]?.exp }}</span>
              </div>
            </div>
            <div class="mt-22 section_53">
              <span class="text_58 ml-20 wd_300">NO.2</span>
              <span class="font_26 wd_300">{{
                this.rankList[1]?.username
              }}</span>
              <span class="font_26">{{ this.rankList[1]?.exp }}</span>
            </div>
            <div
              v-for="(item, index) in rankList.slice(2)"
              :key="index"
              class="mt-22 section_54"
            >
              <span class="font_26 ml-20 wd_280">NO.{{ index + 3 }}</span>
              <span class="font_26 wd_280">{{ item.username }}</span>
              <span class="font_26">{{ item.exp }}</span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import yaml from "js-yaml";
import "../../assets/styles/center.css";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

export default {
  components: { AfterHeaderNavigator },
  async created() {
    await axios.get("/api/word/get-ranking-list-today/").then((res) => {
      console.log(res);
      this.rankList = res.data.ranking_list;
      console.log("rank", this.rankList);
    });
  },
  data() {
    return {
      rankList: [
        /*{username: "mioo", exp: 0, ranking: 1},
				{username: "ssd", exp: 0, ranking: 2},
				{username: "rrt", exp: 0, ranking: 3},
				{username: "ssd", exp: 0, ranking: 2},
				{username: "rrt", exp: 0, ranking: 3},*/
      ],
    };
  },
  methods: {
    goBackHome() {
      this.$router.push("/");
    },
    toChooseBook() {
      this.$router.push({ path: "/PersonalBook/" });
    },
    toEditInfo() {
      this.$router.push({ path: "/PersonalInfo/" });
    },
    toAchieve() {
      this.$router.push({ path: "/PersonalAchieve/" });
    },
    toSavedWords() {
      this.$router.push({ path: "/SavedWords/" });
    },
    toRank() {
      this.$router.push({ path: "/PersonalRank/" });
    },
    toStatistics() {
      this.$router.push({ path: "/Statistics/" });
    },
  },
};
</script>

<style scoped>
.personal-rank-page {
  height: 100%;
  display: flex;
  justify-content: center;
  color: #2c1c55;
}

.pos_79 {
  position: absolute;
  left: 150px;
  top: 180px;
}
.pos_80 {
  position: absolute;
  left: 150px;
  top: 270px;
}
.pos_81 {
  position: absolute;
  left: 150px;
  top: 360px;
}
.pos_82 {
  position: absolute;
  left: 100px;
  top: 445px;
}
.pos_83 {
  position: absolute;
  left: 150px;
  top: 540px;
}
.font_18 {
  font-size: 26px;
  font-family: Poppins;
  line-height: 30.5px;
  font-weight: 800;
  color: #888888;
  line-height: 30.5px;
  margin-left: 30px;
}
.scrollbar-card {
  width: 800px;
}
/*排行列表*/
.ml-190 {
  margin-left: 165px;
}
.section_52 {
  width: 100%;
  height: 0;
  margin-right: 30px;
  padding: 10px 30px;
  border-top: 100px solid #ffda53;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
}
.inner-text {
  display: flex; /*解决块级元素不能一行显示*/
  margin-top: -85px;
}
.text-wrapper_19 {
  width: 80px;
}
.text_54 {
  font-size: 58px;
  font-family: Poppins;
  font-weight: 800;
  line-height: 47.5px;
}
.text_50 {
  font-size: 40px;
  font-family: Poppins;
  font-weight: 800;
  line-height: 47.5px;
}
.wd_280 {
  width: 280px;
}
.wd_300 {
  width: 300px;
}
.font_26 {
  font-size: 36px;
  font-family: Poppins;
  font-weight: 800;
}
/*layer2*/
.font_16 {
  font-size: 48px;
  font-family: Poppins;
  line-height: 46px;
  font-weight: 800;
}
.section_53 {
  margin-right: 40px;
  padding: 20px 10px;
  background-color: #ffe9d4;
  display: flex;
  width: 100%;
}
.text_58 {
  width: 300px;
  font-size: 48px;
  font-family: Poppins;
  line-height: 46px;
  font-weight: 800;
  line-height: 36px;
  margin-left: 10px;
  margin-right: -20px;
}
.text-wrapper_20 {
  margin-left: 180px;
}
.view_11 {
  margin-left: 200px;
  margin-right: 50px;
}
/*other layer*/
.ml-240 {
  margin-left: 180px;
}
.font_25 {
  font-size: 36px;
  font-family: Poppins;
  line-height: 20.5px;
  font-weight: 800;
}
.font_26 {
  font-size: 36px;
  font-family: Poppins;
  line-height: 27px;
  font-weight: 800;
}
.section_54 {
  width: 95%;
  display: flex;
  margin-left: 25px;
  margin-top: 20px;
  padding: 20px 10px;
  background-color: #ffe9d4;
}
.text_60 {
  margin-right: 64px;
}
.ml-20 {
  margin-left: 30px;
}
</style>
