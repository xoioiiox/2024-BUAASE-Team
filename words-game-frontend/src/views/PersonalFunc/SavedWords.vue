<template>
  <div>
    <el-row>
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <el-col :span="18" class="saved-words-page">
        <h2>生词本记录</h2>
        <!-- Words List -->
        <el-scrollbar class="saved-words-list" max-height="90vh">
          <!-- Word Card/ -->
          <el-card v-for="word in words" :key="word" class="saved-word-card">
            <div class="saved-word-card-body">
              {{ word }}
            </div>
          </el-card> </el-scrollbar
        >we
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue";
import axios from "axios";

export default {
  components: { PersonalSide },
  data() {
    return {
      // words: [],
      words: ["Hello", "Goodbye", "Dummy"],
    };
  },
  methods: {
    async getSavedWords() {
      const res = await axios.get("/api/word/get-favor-words/?begin=0&end=1");
      if (res.status == 200) {
        console.log("Success: ", res);
      } else {
        console.log("Error: ", res.status);
      }
    },
  },
  beforeMount() {
    this.getSavedWords();
  },
};
</script>

<style>
.saved-words-page {
  padding-left: 30px;
}

.saved-word-card {
  max-width: 50%;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
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
