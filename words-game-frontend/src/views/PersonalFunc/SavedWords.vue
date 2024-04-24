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
            <div class="word-card-title">
              <div>Word</div>
              <span>au</span>
            </div>
            <div class="word-card-desc">
              Lorem ipsum dolor sit amet consectetur
            </div>

            <span class="word-card-saved">
              <el-icon :size="10" color="#fc4085">
                <StarFilled
                  style="width: 1em; height: 1em; margin-right: 8px"
                />
              </el-icon>
            </span>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue";
// import axios from "axios";

export default {
  components: { PersonalSide },
  // async created() {
  //   await axios({
  //     method: "get",
  //     url: "/api/word/get-favor-words/",
  //     params: {
  //       begin: 2,
  //       end: 6,
  //     },
  //   }).then((res) => console.log("res", res));
  // },
  methods: {},
  data() {
    return {
      words: ["Hello", "Goodbye", "Dummy"],
    };
  },
};
</script>

<style scoped>
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
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
  padding: 10px 12px;
  box-shadow: rgba(0, 0, 0, 0.101) 0px 2px 4px;
  border-radius: 10px;
  position: relative;
  border: 1px solid #e0e0e0d4;
}

.word-card-title {
  display: flex;
  gap: 8px;
  font-size: 24px;
  /* border: 1px solid red; */
}

.word-card-saved {
  border: 1px solid blue;
  position: absolute;
  top: 16px;
  right: 16px;
}

.word-card-desc {
  color: grey;
  font-size: 14px;
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
