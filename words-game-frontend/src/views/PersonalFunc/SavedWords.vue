<template>
  <div>
    <el-row :gutter="20">
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

<script setup>
import IconStar from "@/components/icons/IconStar.vue";
import IconSpeaker from "@/components/icons/IconSpeaker.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PersonalSide from "../../components/PersonalSide.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

//Data
const words = ref([]);

const getSavedWords = () => {
  axios
    .get("/word/get-favor-words/", {
      params: {},
    })
    .then((res) => console.log("res ", res))
    .catch((err) => console.log("err ", err));
  // try {
  //   const { status, data } = await axios.get("/api/word/get-favor-words");

  //   if (status !== 200) {
  //     console.log("Status not 200");
  //   } else {
  //     console.log("data: ", data);
  //   }
  // } catch (error) {
  //   console.log("error axios: ", error);
  // }
};

onMounted(() => {
  console.log("Mounted");
  getSavedWords();
});

//Method
const onShowWord = (word) => {
  ElMessage({
    type: "info",
    message: `Go to ${word} detail`,
  });
};

const onUnsaveWord = (word) => {
  ElMessageBox.confirm(`Do you want to delete ${word}`, "Delete Warning", {
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
        type: "error",
        message: "Delete Canceled",
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
  background-color: #F5F5F5;
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

<!-- // try {
  //   const { data } = await axios.get("/api/word/get-favor-words/", {
  //     params: { begin: 0, end: 3 },
  //   });
  //   console.log("Get data: ", data);
  //   // this.words = data;
  // } catch (error) {
  //   this.words = ["error", "testing"];
  //   console.log("Error get words: ", error);
  // } -->
