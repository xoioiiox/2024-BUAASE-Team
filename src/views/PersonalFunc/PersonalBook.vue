<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>
  <div class="personal-book-page">
    <div class="personal-side">
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

    <div class="card-container">
      <div class="personal-page-header">选择词书</div>
      <div class="inner-card-container personal-book-inner">
        <!-- SAVED WORDS -->
        <el-row>
          <el-col :span="6">
            <div class="book-card-saved" @click="toSavedWords">
              <img
                class="image_27"
                src="../../assets/personal-center/side-4.png"
              />
              <div class="text-wrapper_15">
                <span class="font_21 text_32">收藏生词本</span>
              </div>
            </div>
            <div class="settings">
              <div type="primary" @click="studySetting()" class="setting-bt">
                学习设置
              </div>
              <div
                color="#626aef"
                type="primary"
                @click="wordBookSetting()"
                class="setting-bt"
              >
                上传词书
              </div>
            </div>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>

          <el-col :span="17" class="book-choose-books">
            <el-scrollbar height="450px">
              <el-row>
                <el-col :span="8">
                  <div class="book-card-current">
                    <img
                      class="image_29"
                      src="../../assets/personal-center/planet1.svg"
                    />
                    <div class="text-wrapper_16">
                      <span class="font_21 text_42">{{ this.curBook }}</span>
                    </div>
                  </div>
                </el-col>
                <!-- BOOK CARDS -->
                <el-col
                  v-for="(item, index) in wordBooks"
                  :key="index"
                  :span="8"
                >
                  <div class="section_31" @click="ChooseThisBook(item)">
                    <img class="image_29" :src="images[(index + 1) % 6]" />
                    <div class="text-wrapper_16">
                      <span class="font_21 text_42">{{ item }}</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-col>
        </el-row>

        <!-- CURRENT WORDS BOOK -->
      </div>
    </div>
  </div>

  <!-- ADD NEW BOOK MODAL -->
  <div>
    <el-dialog title="学习设置" v-model="settingDialog" width="30%">
      <el-form :model="settingForm" label-width="auto">
        <el-form-item label="每日计划新词">
          <el-select v-model="settingForm.new_number">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="每日复习上限">
          <el-select v-model="settingForm.review_number">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="settingDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

  <div>
    <el-dialog title="上传词书" v-model="wordBookDialog" width="30%">
      <el-upload
        ref="upload"
        class="upload-demo"
        action="#"
        :limit="1"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary">选择文件 (txt格式)</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传词书
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            限制一次仅上传一个文件。 (文件仅限.txt格式)
          </div>
          <router-link to="/guide"> 自定义词书创建说明 </router-link>
        </template>
      </el-upload>
    </el-dialog>
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
    /*获取当前词书*/
    await axios.get("/api/word/get-now-word-book/").then((res) => {
      //console.log(res)
      this.curBook = res.data.book_name;
    });
    /*获取全部词书*/
    await axios.get("/api/word/get-all-word-book/").then((res) => {
      //console.log(res)
      this.wordBooks = res.data.word_books;
    });
    await axios.get("/api/word/get-plan/").then((res) => {
      this.settingForm.new_number = res.data.num;
    });
    await axios.get("/api/word/get-review-limit/").then((res) => {
      this.settingForm.review_number = res.data.limit;
    });
  },
  data() {
    return {
      wordBookDialog: false,
      // 用于存储当前选择的文件
      currentFile: null,
      uploadBookName: "",
      settingDialog: false,
      settingForm: {
        new_number: "10",
        review_number: "10",
      },
      options: [
        { value: "10", label: "10" },
        { value: "15", label: "15" },
        { value: "20", label: "20" },
      ],
      wordBooks: [],
      curBook: "",
      images: [
        new URL("/src/assets/personal-center/planet1.svg", import.meta.url)
          .href,
        new URL("/src/assets/personal-center/planet2.svg", import.meta.url)
          .href,
        new URL("/src/assets/personal-center/planet3.svg", import.meta.url)
          .href,
        new URL("/src/assets/personal-center/planet4.svg", import.meta.url)
          .href,
        new URL("/src/assets/personal-center/planet5.svg", import.meta.url)
          .href,
        new URL("/src/assets/personal-center/planet6.svg", import.meta.url)
          .href,
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
    ChooseThisBook(bookname) {
      console.log(bookname);
      this.curBook = bookname;
      axios
        .post("/api/word/change-now-book/", {
          bookname: bookname,
        })
        .then((res) => {
          console.log("choose: ", res);
          this.$message({
            type: "success",
            message: "选择成功",
          });
        });
    },
    studySetting() {
      this.settingDialog = true;
    },
    submitInfo() {
      console.log("new:" + this.settingForm.new_number);
      console.log("new:" + this.settingForm.new_number);
      /*修改每日计划新词*/
      axios
        .post("/api/word/set-plan/", {
          num: this.settingForm.new_number,
        })
        .then((res) => {});
      /*修改每日复习上限*/
      axios
        .post("/api/word/set-review-limit/", {
          num: this.settingForm.review_number,
        })
        .then((res) => {});
      this.settingDialog = false;
      this.$message({
        type: "success",
        message: "修改成功",
      });
    },

    /*   以下为上传词书操作   */
    wordBookSetting() {
      this.wordBookDialog = true;
    },
    handleChange(file) {
      // file 参数包含了当前选择的文件信息
      this.currentFile = file.raw; // 'raw' 是原生文件对象
      // 可以在这里添加上传逻辑或进一步处理文件
    },
    handleExceed(files, fileList) {
      // 当上传的文件数量超过限制数量时触发
      this.$message.error("只能选择一个文件进行上传");
    },

    async readFile(file) {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (e) {
          reader.abort();
          reject(e);
        };
      });
      reader.readAsText(file, "UTF-8"); // 将文件读取为文本

      return promise;
    },

    async submitUpload() {
      console.log(this.currentFile);

      const isTXT = this.currentFile.type === "text/plain";
      console.log(isTXT);
      if (!isTXT) {
        this.$message.error("只可上传 TXT 格式文本文件");
        return; // 仅当文件类型为 TXT 时返回 true，否则返回 false
      }

      let res = await this.readFile(this.currentFile); // res 为文件中内容

      const fileName = this.currentFile.name;
      this.uploadBookName = fileName.split(".").slice(0, -1).join(".");

      console.log(this.uploadBookName);

      try {
        // res 为 yaml 格式的内容（从文本文件中取得）

        const json = yaml.load(res); // 输出为 json 格式

        /* console.log(json)
				console.log(typeof json)*/

        const wordArray = json.split(/\s+/);

        /*  console.log(wordArray)
				console.log(typeof wordArray)*/

        axios({
          method: "post",
          url: "/api/word/import/",
          data: {
            book_name: this.uploadBookName,
            words: wordArray,
          },
        }).then((res) => {});
      } catch (e) {
        this.$message({
          message: "格式转换错误，请重新选择文件上传",
          type: "error",
          duration: 2000,
        });
      }

      this.wordBookDialog = false;
      this.currentFile = null;
      this.uploadBookName = "";
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style scoped>
.personal-book-page {
  /* border: 1px solid red; */
  height: 100%;
  display: flex;
  justify-content: center;
}

/* .personal-book-inner {
  flex-direction: row !important;
} */

.settings {
  position: absolute;
  bottom: 100px;
  width: 200px;
  margin-left: 10px;
}
.setting-bt {
  width: 140px;
  height: 40px;
  background-color: #f4ecff;
  border: solid 2px #b4aecc;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-family: Poppins;
  font-size: 18px;
}
/*标签位置*/
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
  left: 150px;
  top: 450px;
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
/*收藏生词本*/
.book-card-saved {
  background-color: #ddf0ff;
  border-radius: 36px;
  width: 180px;
  height: 180px;
  border: solid 2px #5c7fac96;
}
.image_27 {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 10px 0 10px 40px;
}
.text-wrapper_15 {
  display: flex;
  justify-content: center;
  margin: 0 10px;
  padding: 8px 0;
  background-color: #ffffff;
  border-radius: 20px;
  border: solid 1px #5c7fac;
  cursor: pointer;
  z-index: 99;
}
.font_21 {
  font-size: 20px;
  font-family: Poppins;
  color: #150437;
}
/*分割线*/
.el-divider {
  background-color: #fce6c6;
  width: 6px;
  height: 450px;
  border: none;
}

/*当前词书*/

.book-card-current {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 180px;
  height: 180px;
  background-color: #fcda59;
  border-radius: 36px;
  box-shadow: 0px -10px 50px 10px #ffffffb3 inset;
  border: solid 4px #b4aecc;
  cursor: pointer;
  z-index: 99;
  margin-bottom: 20px;
  padding: 10px 10px;
}
.image_29 {
  width: 80px;
  height: 80px;
}
.text-wrapper_16 {
  margin-top: 20px;
}
/*所有词书*/
.image_28 {
  width: 80px;
  height: 80px;
}
.section_31 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffe9d4;
  border-radius: 36px;
  width: 180px;
  height: 180px;
  border: solid 4px #d8a8aa;
  cursor: pointer;
  z-index: 99;
  margin-bottom: 20px;
  padding: 10px 10px;
}

.book-choose-books {
  /* height: 100%; */
  width: 100%;
}

.bookCard {
  width: 200px;
  height: 220px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.101) 4px 6px 3px;
  border-radius: 5px;
  border: 1px solid #e0e0e0d4;
}
/* .curbook {
  background-color: #d9ecff;
  border: 2px dashed #79bbff;
} */
</style>
