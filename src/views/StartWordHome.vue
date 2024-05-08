<script>
import HeaderNavigator from "@/components/HeaderNavigator.vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import {useUserStore} from "@/stores/userStore.js";
import axios from "axios";

export default {
  name: 'StartWordHome',
  components: {AfterHeaderNavigator, HeaderNavigator},

  // 在Vue组件的生命周期钩子中使用store
  async created() {
    this.userStore = useUserStore();
    console.log(this.userStore.user);
    console.log(this.userStore.isLoggedIn);
    await axios({
      method: 'get',
      url: '/api/word/now-book-ratio/',
      withCredentials: true
    }).then((res)=>{
      console.log(res)
      this.ratio = res.data.ratio * 100

    })
  },

  data() {
    return {
      userStore: null, // 初始化为null
      ratio: 0,
      settingDialog: false,
      settingForm: {
        new_number: "10",
        review_number: "10"
      },
      options: [
        {value: '10', label: '10'},
        {value: '15', label: '15'},
        {value: '20', label: '20'},
      ]
    };
  },

  methods: {

    studySetting() {
      this.settingDialog = true;
    },
    submitInfo() {
      console.log("new:" + this.settingForm.new_number)
      console.log("new:" + this.settingForm.new_number)
      /*修改每日计划新词*/
      axios({
        method: 'post',
        url: '/api/word/set-plan/',
        data: {
          'num': this.settingForm.new_number
        },
        withCredentials: true
      }).then((res) => {
      })
      /*修改每日复习上限*/
      axios({
        method: 'post',
        url: '/api/word/set-review-limit/',
        data: {
          'num': this.settingForm.review_number
        }
      }).then((res) => {
      })
      this.settingDialog = false
      this.$message({
        type: 'success',
        message: "修改成功"
      });
    }
  }


}
</script>

<template>
  <AfterHeaderNavigator></AfterHeaderNavigator>

  <div>

    <el-row>

    </el-row>
    <el-row>

    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="progress-wrapper">
        <el-progress type="circle" :percentage="ratio" />
        </div>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24" class="text-center"><span>当前词书进度
          <el-button class="button-style" type="primary" @click="studySetting()">学习设置</el-button>
         </span></el-col>
    </el-row>

    <div>
    <el-row>
      <el-col :span="24">


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
      </el-col>
    </el-row>
    </div>

    <el-row>
      <el-col :span="24" class="button-center ">
        <router-link to="/recite">
          <el-button type="primary" round class="button-size">
            开始背单词
          </el-button>

        </router-link>
      </el-col>

    </el-row>

  </div>

</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-progress--circle {
  display: flex;
  justify-content: center;
  align-items: center; /* 如果需要垂直居中，添加这行 */
  height: 100px; /* 根据父元素高度自定 */
}

.text-center span {
  text-align: center;
  display: block; /* 或者 inline-block */
  line-height: 100px; /* 根据父元素高度自定，使文本垂直居中 */
}

.button-center {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 可以根据需要设置高度 */
}

.button-size{
  width: 380px;
  height: 60px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-style {
  margin-left: 30px;
}


</style>