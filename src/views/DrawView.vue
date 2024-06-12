<template class="page-container">
  <div>
    <AfterHeaderNavigator />
  </div>

  <div class="draw-view-page">
    <el-container>
      <!-- <div aria-label="A complete example of page header">
        <el-page-header @back="back2home">
          <template #content> </template>
          <template #extra> </template>
        </el-page-header>
      </div> -->
      <el-header>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 20vh"
        >
          <el-col :span="18">
            <div class="centered-content">
              <div class="demo-progress">
                <el-progress
                  :text-inside="true"
                  :stroke-width="35"
                  :percentage="Experience"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div class="box">
        <div v-for="(item, index) in list" :key="index">
          <div :class="'item'" @click="DrawCard(item)">
            <div :class="item.status > 0 ? 'card1 hide' : 'card1'">
              <template v-if="item.status > 0">
                {{ CardContent.event_description }}
              </template>
              <template v-else>
                <div class="cardcover">?</div>
              </template>
            </div>
            <div
              :class="{
                'card2 show': item.status == 1,
                card2: item.status == 0,
              }"
            >
              <el-button
                class="draw-card-button"
                color="#626aef"
                :dark="isDark"
                @click="fulfillEvent()"
              >
                {{ CardContent.event_description }}
                <!--点击前往完成相应的事件-->
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!--剩余抽卡次数-->
      <div class="flex-container">
        <div>剩余 {{ Count }} 次</div>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
import { onMounted, ref } from "vue";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";

const list = ref([
  { id: 1, name: "事件卡1", is: true, status: 0 },
  { id: 2, name: "事件卡2", is: true, status: 0 },
  { id: 3, name: "事件卡3", is: true, status: 0 },
]);

//返回主页
const back2home = () => {
  router.push("/GameChoose"); // 主页路由
};

//获取用户当前个人经验值
const Experience = ref(0);
const getExperience = () => {
  const response = axios.get("/api/word/get-personal-experience/");
  console.log(response.data);
  response.then(function (response) {
    console.log(response.data);
    if (response.status === 200) {
      //console.log(response.data)
      Experience.value = response.data.exp / 1000;
    } else {
      ElMessage({
        message: "获取经验总值数据失败",
        type: "error",
      });
    }
  });
};

//获取当前用户的剩余抽卡次数
const Count = ref(5);
const getCount = () => {
  const response = axios.get("/api/word/get-draw-count/");
  response.then(function (response) {
    if (response.status === 200) {
      //console.log(response.data)
      Count.value = response.data.count;
    } else {
      ElMessage({
        message: "获取剩余抽卡次数失败",
        type: "error",
      });
    }
  });
};

const CardContent = ref({
  event_description: "事件描述",
  event_name: "汉译英选择",
  event_type: "任务型",
});

let onceAtime = true;

//抽卡动作
const DrawCard = (item) => {
  if (Count.value <= 0) {
    return;
  }
  //标记选中的卡片status为1，被翻了过来,保证只能翻过来一张
  if (onceAtime) {
    onceAtime = false;
    item.status = 1;
    //router.push('/event1');
    const response = axios.get("/api/word/get-event/");
    response
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);

          CardContent.value.event_description = response.data.event_description;
          CardContent.value.event_name = response.data.event_name;
          CardContent.value.event_type = response.data.event_type;

          console.log(CardContent);
        } else {
          ElMessage({
            message: "抽卡失败",
            type: "error",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

//点击前往完成相应的事件
const fulfillEvent = () => {
  onceAtime = true;
  if (CardContent.value.event_type == "道具型") {
    router.push({
      name: "PropCard",
      query: { event_description: CardContent.value.event_description },
    });
  } else if (CardContent.value.event_type == "任务型") {
    if (CardContent.value.event_name == "汉译英填空") {
      //汉译英-填空事件
      router.push("/event1");
    } else if (CardContent.value.event_name == "汉译英选择") {
      //汉译英-选择事件
      router.push("/event2");
    } else {
      //英译汉-选择题
      router.push("/event3");
    }
  } else {
    router.push("/event2");
  }
};

const noMoreCard = () => {
  //抽卡次数用尽，返回游戏开始页面
  if (Count.value <= 0) {
    ElMessage({
      message: "没有抽卡次数了",
      type: "warning",
    });
    router.push("/StartGameHome");
  }
};

const router = useRouter();

onMounted(() => {
  getExperience();
  getCount();
  noMoreCard();
});
</script>

<style scoped>
.flex-container {
  color: #fdf1c6;
  font-size: 40px;
  font-weight: 800;
  margin-top: 30px;
  display: flex;
  /* 启用Flexbox布局 */
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: space-around;
  /* 子元素之间的间距平均分布 */
}

.circle-bordered {
  margin-top: 50px;
  width: 150px;
  height: 150px;
  background-color: rgb(255, 255, 255);
  border: 2px solid #374bae;
  border-radius: 50%;
  display: flex;
  /* 使用Flexbox布局 */
  justify-content: center;
  /* 水平居中文本 */
  align-items: center;
  /* 垂直居中文本 */
  text-align: center;
  /* 确保文本水平居中（如果需要） */
  font-size: 16px;
  /* 根据需要设置字体大小 */
  font-weight: bold;
  /* 根据需要设置字体粗细 */
  line-height: 150px;
  /* 与高度相匹配的行高以垂直居中文本 */
}

.cardcover {
  font-family: "Helvetica Neue", Arial, sans-serif;
  letter-spacing: 25px;
  /* 调整字符间距 */
  position: absolute;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  color: rgb(241, 235, 235);
  font-size: 200px;
}

.box {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.item {
  position: relative;
  margin: 20px;
  width: 280px;
  height: 350px;
}

.card1,
.card2 {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  text-align: center;
  transition: transform 0.4s;
}

.card1 {
  background-color: #ffd749;
  color: #fff;
  cursor: pointer;
}

.card1:hover {
  box-shadow: 0px 0px 100px #c8b058;
}

.card2 {
  color: #ff8800;
  border: 1px solid #ff8800;
  padding: 0 10px;
  transform: scaleX(0);
  background-color: #ffe6c9;
}

.hide {
  transform: scaleX(0);
}

.show {
  transform: scaleX(1);
}

.show-result {
  transform: scaleX(1);
  opacity: 0.5;
}

.draw-card-button {
  padding: 12px;
  overflow-wrap: break-word;
  height: fit-content;
  width: 170px;
}
</style>
