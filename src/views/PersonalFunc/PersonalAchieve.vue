<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>
  <div class="personal-achieve-page">
    <div class="personal-side">
      <div class="side-item" @click="toChooseBook">
        <span>选择词书</span>
      </div>
      <div class="side-item" @click="toStatistics">
        <span>统计信息</span>
      </div>
      <div class="side-item-selected" @click="toAchieve">
        <img class="image_1" src="../../assets/personal-center/side-4.png" />
        <span>成就展示</span>
      </div>
      <div class="side-item" @click="toRank">
        <span>排行榜</span>
      </div>
      <div class="side-item" @click="toEditInfo">
        <span>个人信息</span>
      </div>
    </div>
    <div class="card-container">
      <div class="personal-page-header">成就展示</div>
      <div class="inner-card-container">
        <el-scrollbar height="100%">
          <el-row :gutter="20">
            <el-col
              v-for="(item, index) in achieveCards"
              :key="index"
              :span="6"
            >
              <el-card
                class="achieve-card"
                shadow="hover"
                :class="
                  item.owned == true ? 'achieve-card-y' : 'achieve-card-g'
                "
              >
                <div
                  class="achieve-card-icon"
                  :class="
                    item.owned == true
                      ? 'achieve-card-icon-y'
                      : 'achieve-card-icon-g'
                  "
                >
                  <el-icon
                    :size="56"
                    :color="item.owned == true ? '#F9911E' : '#b7a8b5'"
                    ><StarFilled
                  /></el-icon>
                </div>

                <p class="achieve-card-title">{{ item.name }}</p>
                <p class="achieve-card-desc">{{ item.description }}</p>
              </el-card>
            </el-col>
          </el-row>
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
    await axios.get("/api/word/get-achieve-list/").then((res) => {
      this.achieveCards = res.data.achieve_list;
    });
  },
  data() {
    return {
      achieveCards: [
        {
          name: "小试牛刀",
          description: "a this is ...",
          owned: true,
          datetime: "2023-10-21",
        },
        {
          name: "b",
          description: "b this is ...",
          owned: true,
          datetime: "2024-10-21",
        },
        {
          name: "a",
          description: "a this is ...",
          owned: true,
          datetime: "2023-10-21",
        },
        {
          name: "b",
          description: "b this is ...",
          owned: false,
          datetime: "2024-10-21",
        },
        {
          name: "a",
          description: "a this is ...",
          owned: false,
          datetime: "2023-10-21",
        },
        {
          name: "b",
          description: "b this is ...",
          owned: false,
          datetime: "2024-10-21",
        },
        {
          name: "b",
          description: "b this is ...",
          owned: false,
          datetime: "2024-10-21",
        },
        {
          name: "a",
          description: "a this is ...",
          owned: false,
          datetime: "2023-10-21",
        },
        {
          name: "b",
          description: "b this is ...",
          owned: false,
          datetime: "2024-10-21",
        },
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
      this.$router.push({ path: "/SavedWords" });
    },
    toRank() {
      this.$router.push({ path: "/PersonalRank" });
    },
    toStatistics() {
      this.$router.push({ path: "/Statistics" });
    },
  },
};
</script>

<style scoped>
.personal-achieve-page {
  height: 100%;
  display: flex;
  justify-content: center;
}

/*成就卡片*/
.achieve-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 200px;
  border-radius: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #3b276f;
}

.achieve-card-y {
  background-color: #fcdd64;
  background-image: linear-gradient(#ffe65b, #ffc253);
}

.achieve-card-g {
  background-color: #d9cad7;
}

.achieve-card-icon {
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.achieve-card-icon-y {
  border: 1px solid #f9911e;
  background-color: #f6ecc9;
  box-shadow: 0 0 10px #f6ecc9, 0 0 40px #f9911e;
}

.achieve-card-icon-g {
  border: 1px solid #b7a8b5;
  background-color: #d9cad7;
}

.achieve-card-title {
  font-size: 24px;
  font-family: Poppins;
  font-weight: 800;
}

.card-header {
  padding: none;
  border: none;
}

.el-card__header {
  border-bottom: none;
}
</style>
