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
        <span class="font_19 text_2 ml-11">成就展示</span>
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
        <el-row :gutter="20">
          <el-col v-for="(item, index) in achieveCards" :key="index" :span="6">
            <el-card
              class="achieve-card"
              shadow="hover"
              :class="item.owned == true ? 'achieve-card-y' : 'achieve-card-g'"
            >
              <div
                class="achieve-card-icon"
                :class="
                  item.owned == true
                    ? 'achieve-card-y-icon'
                    : 'achieve-card-g-icon'
                "
              >
                <el-icon
                  :size="48"
                  :color="item.owned == true ? '#f88' : '#D3D3D3'"
                  ><StarFilled
                /></el-icon>
              </div>

              <p class="achieve-card-title">{{ item.name }}</p>
              <p class="achieve-card-desc">{{ item.description }}</p>
            </el-card>
          </el-col>
        </el-row>
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
  width: 180px;
  height: 200px;
  margin-bottom: 8px;
  border-radius: 20px;
  text-align: center;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
}

.achieve-card-y {
  background-image: linear-gradient(180deg, #fbdd6f 0%, #ffd217 100%);
  text-shadow: 0px 4px 10px #fff;
  color: #2c0b6c;
}
.achieve-card-g {
  background-color: #00000040;
  color: grey;
}

.achieve-card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 auto;
}

.achieve-card-y-icon {
  border: 1px solid #fff;
  background-color: #fff;
}
.achieve-card-g-icon {
  border: 1px solid grey;
  background-color: rgb(131, 131, 131);
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
