<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <el-col :span="18" class="saved-words-page">
        <h2>生词本记录</h2>
        <!-- Words List -->
        <el-empty v-if="!words[0]" description="暂无数据" />
        <template v-else>
          <el-scrollbar class="saved-words-list" max-height="600px" height="100%">
            <!-- Word Card/ -->
            <div class="saved-words-card" v-for="word in words" :key="word">
              <div class="word-card-body" @click="onShowWord(word)">
                <div class="word-card-title">
                  <div class="word-card-word">Word {{ word }}</div>
                  <!-- Will be used in beta version -->
                  <!-- <span class="word-card-speak" @click="onListenWord(word)">
                    <IconSpeaker />
                  </span> -->
                </div>
                <!-- <div class="word-card-desc" @click="onShowWord(word)">
                  Lorem ipsum dolor sit amet consectetur
                  <a> More >>></a>
                </div> -->
              </div>
              <div class="word-card-saved">
                <span class="word-card-saved-icon" @click="onUnsaveWord(word)">
                  <IconStar />
                </span>
              </div>
            </div>
          </el-scrollbar>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import IconStar from "@/components/icons/IconStar.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PersonalSide from "../../components/PersonalSide.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

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
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.saved-words-page {
  padding-left: 30px;
  height: 100%;
}

.saved-words-list {
  max-width: 800px;
  width: 100%;
  padding: 10px;
  background-color: inherit;
  /* border: 1px solid red; */
}

.saved-words-card {
  display: flex;
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px 12px;
  box-shadow: rgba(0, 0, 0, 0.101) 0px 2px 4px;
  border-radius: 10px;
  border: 1px solid #e0e0e0d4;
}

.word-card-body {
  width: 100%;
}

.word-card-title {
  width: fit-content;
  display: flex;
  gap: 8px;
  font-size: 24px;
  padding: 5px 0 1px;
  /* border: 1px solid red; */
}

.word-card-speak {
  width: 40px;
  height: 24px;
  /* border: 1px solid red; */
}

.word-card-saved {
  width: 30px;
  height: 30px;
  position: relative;
  /* border: 1px solid green; */
}

.word-card-saved-icon {
  position: absolute;
}

.word-card-desc {
  color: grey;
  font-size: 14px;
  /* border: 1px solid red; */
}
</style>
