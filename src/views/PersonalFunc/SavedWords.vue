<script setup>
import "../../assets/styles/savedwords.css";
import router from "@/router";
import IconStar from "@/components/icons/IconStar.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, onMounted } from "vue";
import axios from "axios";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

//Data
const words = ref([]);

const getSavedWords = async () => {
  await axios
    .get("/api/word/get-favor-words/")
    .then((res) => {
      console.log("Get saved words: ", res.data);
      words.value = res.data.words;
    })
    .catch((err) => {
      console.log("Saved Words Error ", err);
      words.value = [];
    });
};

onMounted(() => {
  getSavedWords();
});

//Card Methods
const onShowWord = (word) => {
  ElMessage({
    type: "info",
    message: `Go to ${word} detail`,
  });
};

const onUnsaveWord = (selectedWord) => {
  ElMessageBox.confirm(`确定删除单词 ${selectedWord}?`, "删除", {
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    type: "error",
  }).then(() => {
    onDeleteWord(selectedWord);
  });
};

const onDeleteWord = async (selectedWord) => {
  await axios
    .delete("/api/word/delete-favor-word/", {
      params: { word: selectedWord },
    })
    .then((delRes) => {
      console.log("Delete response: ", delRes);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      getSavedWords();
    })
    .catch((err) => {
      console.log("Delete err: ", err);
      ElMessage({
        type: "error",
        message: "删除失败",
      });
    });
};

function toChooseBook() {
  router.push({ path: "/PersonalBook/" });
}
function toEditInfo() {
  router.push({ path: "/PersonalInfo/" });
}
function toAchieve() {
  router.push({ path: "/PersonalAchieve/" });
}
function toRank() {
  router.push({ path: "/PersonalRank" });
}
function toStatistics() {
  router.push({ path: "/Statistics" });
}
</script>

<template class="page-container saved-words">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>
  <div class="stat-page">
    <div class="stat-personal-side">
      <div class="side-item-selected" @click="toChooseBook">
        <img
          class="side-item-icon"
          src="../../assets/personal-center/side-4.png"
        />
        <span>选择词书</span>
      </div>
      <div class="side-item" @click="toStatistics">
        <span>统计信息</span>
      </div>
      <div class="side-item" @click="toAchieve">
        <span>成就展示</span>
      </div>
      <div class="side-item" @click="toRank">
        <span>排行榜</span>
      </div>
      <div class="side-item" @click="toEditInfo">
        <span>个人信息</span>
      </div>
    </div>
    <div class="stat-card-container">
      <div class="personal-page-header">生词本记录</div>
      <div class="stat-inner-card-container">
        <div class="saved-words-back" @click="toChooseBook">
          <el-icon :size="36"><ArrowLeftBold /></el-icon>
          <span> 选择词书 </span>
        </div>
        <!-- Words List -->
        <el-empty v-if="!words[0]" description="暂无数据" />
        <template v-else>
          <el-scrollbar
            class="saved-words-list"
            max-height="600px"
            height="100%"
          >
            <!-- Word Card/ -->
            <div class="saved-words-card" v-for="word in words" :key="word">
              <span class="word-card-speak" @click="onListenWord(word)">
                <IconSpeaker />
              </span>
              <div class="word-card-body" @click="onShowWord(word)">
                <div class="word-card-title">
                  <div class="word-card-word">{{ word }}</div>
                </div>
              </div>
              <div class="word-card-star">
                <span class="word-card-star-icon" @click="onUnsaveWord(word)">
                  <IconStar />
                </span>
              </div>
            </div>
          </el-scrollbar>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
