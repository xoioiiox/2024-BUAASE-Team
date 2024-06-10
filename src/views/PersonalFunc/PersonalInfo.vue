<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>
  <div class="personal-info-page">
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
      <div class="side-item" @click="toRank">
        <span>排行榜</span>
      </div>
      <div class="side-item-selected" @click="toEditInfo">
        <img class="image_1" src="../../assets/personal-center/side-4.png" />
        <span>个人信息</span>
      </div>
    </div>

    <div class="card-container">
      <div class="personal-page-header">个人信息</div>
      <div class="inner-card-container">
        <el-row>
          <el-col class="personal-info-left-area" :span="12">
            <div class="personal-info-image"></div>
            <div class="personal-info-user-name">
              <span class="text-name">{{ this.infoForm.username }}</span>
            </div>
            <el-button
              class="personal-info-image-upload"
              type="text"
              @click="uploadAvatar()"
            >
              上转图片
              <el-icon :size="24" color="#D7A15B"><Upload /></el-icon>
            </el-button>
          </el-col>

          <el-col :span="12" class="personal-info-right-area">
            <el-row class="personal-info-profile-input">
              <el-col :span="10" :offset="6"
                >LV. {{ this.infoForm.level }}</el-col
              >
            </el-row>
            <div class="personal-info-profile-input">
              <span>手机号</span>
              <span> {{ this.infoForm.phone }}</span>
            </div>
            <div class="personal-info-profile-input">
              <span>微信号</span>
              <span>{{ this.infoForm.wechat }}</span>
            </div>
            <div class="personal-info-profile-settings">
              <div class="personal-info-profile-button" @click="changePassword">
                <span>修改密码</span>
              </div>
              <div class="personal-info-profile-button" @click="modifyInfo">
                <span>修改信息</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--以下是对话框信息-->
    <div>
      <div>
        <el-dialog title="修改密码" v-model="passwordDialog" width="30%">
          <el-form :model="passwordForm" label-width="auto" :rules="rules">
            <el-form-item label="原密码" prop="old_password">
              <el-input
                v-model="passwordForm.old_password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
              <el-input
                v-model="passwordForm.new_password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="new_password_again">
              <el-input
                v-model="passwordForm.new_password_again"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="passwordDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitPassword()"
              >确 定</el-button
            >
          </div>
        </el-dialog>
      </div>
      <div>
        <el-dialog title="修改信息" v-model="infoDialog" width="30%">
          <el-form :model="infoForm" label-width="auto" :rules="rules">
            <!--el-form-item label="用户名" prop="username">
								<el-input v-model="infoForm.username" autocomplete="off"></el-input>
								</el-form-item-->
            <el-form-item label="绑定手机号" prop="phone">
              <el-input v-model="infoForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="绑定微信" prop="wechat">
              <el-input v-model="infoForm.wechat" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="infoDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitInfo()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="avatarDialog">
        <el-dialog title="上传头像" v-model="uploadDialog" width="30%">
          <el-upload
            class="avatar-uploader"
            action="#"
            :http-request="upload"
            :show-file-list="false"
            :on-change="handleAvatarPreview"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div style="margin-top: 20px">
            <el-button type="primary" @click="submitAvatar()">确认</el-button>
            <el-button @click="uploadDialog = false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import yaml from "js-yaml";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

export default {
  components: { AfterHeaderNavigator },
  async created() {
    await axios.get("/api/word/get-info/").then((res) => {
      this.infoForm.avatar = res.data.avatar;
      this.infoForm.username = res.data.username;
      this.infoForm.phone = res.data.phone;
      this.infoForm.wechat = res.data.wechat;
    });
  },
  data() {
    return {
      infoForm: {
        avatar: "",
        username: "",
        phone: "",
        wechat: "",
        level: "",
      },
      passwordDialog: false,
      infoDialog: false,
      uploadDialog: false,
      imageUrl: "",
      image_formData: new FormData(),
      passwordForm: {
        old_password: "",
        new_password: "",
        new_password_again: "",
      },
      rules: {
        old_password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        new_password_again: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changePassword() {
      this.passwordDialog = true;
    },
    modifyInfo() {
      console.log(1);
      this.infoDialog = true;
    },
    submitInfo() {
      console.log("info-form: ", this.infoForm);
      axios
        .put("/api/word/change-info/", {
          //username: this.infoForm.username,
          avatar: this.infoForm.avatar,
          phone: this.infoForm.phone,
          wechat: this.infoForm.wechat,
        })
        .then((res) => {
          console.log("submit-info: ", res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改个人信息成功",
            });
          }
        });
      this.infoDialog = false;
    },
    submitPassword() {
      console.log(this.passwordForm);
      axios
        .post("/api/word/reset-password/", {
          original_password: this.passwordForm.old_password,
          password: this.passwordForm.new_password,
          password_again: this.passwordForm.new_password_again,
        })
        .then((res) => {
          console.log("submit-res: ", res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改密码成功",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code == 400) {
            this.$message({
              type: "error",
              message: "新密码输入不一致",
            });
          } else {
            this.$message({
              type: "error",
              message: "原密码错误",
            });
          }
        });
    },
    uploadAvatar() {
      this.uploadDialog = true;
    },
    handleAvatarPreview(file) {
      let fd = new FormData();
      fd.append("smfile", file.raw);
      this.image_formData = fd;

      axios
        .post("/api/word/uploadAvatar/", this.image_formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            /*'Authorization': "u6OmOCWVF8lXN6tN2rP8zaJWbWOWRatv",*/
            // 'Content-Type': 'application/json'
          },
        })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });

      axios.get("/api/word/get-info/").then((res) => {
        console.log(res);
        this.imageUrl = res.data.avatar;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("只可上传 JPG 格式图片");
      }

      if (!isLt5M) {
        this.$message.error("图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    submitAvatar() {
      this.infoForm.avatar = this.imageUrl;
      console.log("in" + this.infoForm.avatar);
      axios
        .put("/api/word/change-info/", {
          avatar: this.infoForm.avatar,
          phone: this.infoForm.phone,
          wechat: this.infoForm.wechat,
        })
        .then((res) => {
          console.log("avatar: ", res);
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改头像成功",
            });
          }
        });
      this.$refs.side.changeAvatar(this.imageUrl);
      this.imageUrl = "";
      this.uploadDialog = false;
    },
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
@import url("../../assets/styles/info.css");
</style>
