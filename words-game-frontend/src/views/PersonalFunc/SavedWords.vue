<template>
  <div>
    <el-row>
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <el-col :span="18" class="saved-words-page">
        <h2>生词本记录</h2>
        <!-- Words List -->
        <el-scrollbar class="saved-words-list" max-height="600px" height="100%">
          <!-- Word Card/ -->
          <div class="saved-words-card" v-for="word in 30" :key="word">
            <div class="word-card-body">
              <div class="word-card-title">
                <div class="word-card-word">Word {{ word }}</div>
                <span class="word-card-speak" @click="onListenWord(word)">
                  <IconSpeaker />
                </span>
              </div>

              <div class="word-card-desc" @click="onShowWord(word)">
                Lorem ipsum dolor sit amet consectetur
                <a> More >>></a>
              </div>
            </div>
            <div class="word-card-saved">
              <span class="word-card-saved-icon" @click="onUnsaveWord(word)">
                <IconStar />
              </span>
            </div>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import IconStar from "@/components/icons/IconStar.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PersonalSide from "../../components/PersonalSide.vue";

export default {
  components: { PersonalSide, IconStar, IconSpeaker },
  methods: {
    onShowWord(word) {
      this.$router.push(`/WordDetail/`);
    },
    onListenWord(word) {
      ElMessage({
        type: "info",
        message: `Listen to ${word}`,
      });
    },
    onUnsaveWord(word) {
      ElMessageBox.confirm("", {
        title: `Do you want to unsave ${word}?`,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  data() {
    return {
      words: [],
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

.saved-words-page {
  padding-left: 30px;
  height: 100%;
  background-color: "#F5F5F5";
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
