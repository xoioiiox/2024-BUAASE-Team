<script setup lang="ts">
import router from "@/router";
import axios from "axios";
import LineChart from "../../components/LineChart.vue";
import { computed, onBeforeMount, ref, watch, nextTick } from "vue";
import { CalendarInstance } from "element-plus";
import AfterHeaderNavigator from "@/components/AfterHeaderNavigator.vue";
import "../../assets/styles/stats.css";

function toChooseBook() {
  router.push({ path: "/PersonalBook/" });
}
function toEditInfo() {
  router.push({ path: "/PersonalInfo/" });
}
function toAchieve() {
  router.push({ path: "/PersonalAchieve/" });
}
function toSavedWords() {
  router.push({ path: "/SavedWords" });
}
function toRank() {
  router.push({ path: "/PersonalRank" });
}
function toStatistics() {
  router.push({ path: "/Statistics" });
}

interface WordData {
  time: string;
  learn_num: number;
  review_num: number;
}

const today = new Date();
const dataToday = ref<WordData>();
const dataWeek = ref<WordData[]>();
const calendar = ref<CalendarInstance>();
const dakaDetail = ref([]);
const chartOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
};

// FUNCTIONS
const getLast7Days = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    // console.log("str date: ", date.getDate());
    dates.push(date.toLocaleDateString().split("/").slice(0, 2).join("/"));
  }
  return dates.reverse();
};

const filterHourMin = (dataDay: string) => {
  const timeParts = dataDay.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);
  if (hour === 0) {
    return {
      val: minute,
      type: "min",
    };
  } else {
    return {
      val: hour,
      type: "hr",
    };
  }
};

const getWordDataToday = async () => {
  try {
    const res = await axios.get("/api/word/get-word-data/today/");
    // console.log("get word data res: ", res.data);
    if (res.status === 200) {
      dataToday.value = res.data;
    }
  } catch (error) {
    console.error("Error get today data:", error);
    dataToday.value = {
      learn_num: 0,
      review_num: 0,
      time: "00:00:00",
    };
  }
};

const getWordDataWeek = () => {
  axios
    .get("/api/word/get-word-data/period/", {
      params: { days: 7 },
    })
    .then((res) => {
      // console.log("get week data res:", res);
      dataWeek.value = res.data.word_data;
    })
    .catch((err) => {
      console.log("Error get week data: ", err);
      // dataWeek.value = [
      //   {
      //     learn_num: 3,
      //     review_num: 5,
      //     time: "0:10:34",
      //   },
      //   {
      //     learn_num: 0,
      //     review_num: 10,
      //     time: "0:20:02",
      //   },
      //   {
      //     learn_num: 12,
      //     review_num: 4,
      //     time: "0:21:00",
      //   },
      //   {
      //     learn_num: 10,
      //     review_num: 12,
      //     time: "1:30:02",
      //   },
      //   {
      //     learn_num: 10,
      //     review_num: 20,
      //     time: "1:30:02",
      //   },
      //   {
      //     learn_num: 7,
      //     review_num: 12,
      //     time: "1:30:02",
      //   },
      //   {
      //     learn_num: 0,
      //     review_num: 16,
      //     time: "1:30:02",
      //   },
      // ];
    });
};

const getDakaDetail = () => {
  axios
    .get("/api/word/get-daka-detail/", {
      params: { days: today.getDate() },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("get daka detail: ", res.data.daka);
        dakaDetail.value = res.data.daka;
      }
    })
    .catch((err) => {
      console.log("Error get daka detail: ", err);
      //today, yesterday ...
      //dakaDetail.value = [true, true, true, false, false, true, false, true];
    });
  // .finally(() => console.log("dakaDetails in final: ", dakaDetail.value));
};

//CHART
const chartData = computed(() => {
  //do not delete this line, works as a trigger
  const current = dataWeek.value;
  return {
    labels: getLast7Days(),
    datasets: [
      {
        label: "学习词数",
        backgroundColor: "#ad2a63",
        data: [],
      },
      {
        label: "复习词数",
        backgroundColor: "#07814f",
        data: [],
      },
    ],
  };
});

//CALENDAR
const isPassedDay = (date: Date) => {
  return (
    date.getDate() <= today.getDate() && date.getMonth() == today.getMonth()
  );
};

const isDakaDay = (date: Date) => {
  const dayVal = date.getDate();
  return dakaDetail.value[dayVal - 1];
};

onBeforeMount(() => {
  getWordDataToday();
  getWordDataWeek();
  getDakaDetail();
});

watch(dataWeek, () => {
  chartData.value.datasets[0].data = dataWeek.value
    .map((dataDay) => dataDay.learn_num)
    .reverse();
  chartData.value.datasets[1].data = dataWeek.value
    .map((dataDay) => dataDay.review_num)
    .reverse();
});
</script>

<template class="page-container">
  <div class="header-container">
    <AfterHeaderNavigator />
  </div>

  <div class="stat-page">
    <div class="stat-personal-side">
      <div class="side-item" @click="toChooseBook">
        <span>选择词书</span>
      </div>
      <div class="side-item-selected" @click="toStatistics">
        <img
          class="side-item-icon"
          src="../../assets/personal-center/side-4.png"
        />
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
      <div class="personal-page-header">统计信息</div>
      <div class="stat-inner-card-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- STUDY STATS -->
            <div class="stat-study">
              <!-- DAILY -->
              <el-row class="stat-daily-row stat-windows">
                <span class="stat-daily-header">今日学习统计</span>

                <div class="stat-daily-cards">
                  <!-- Card -->
                  <el-col :span="6" class="stat-card">
                    <div>
                      <el-icon :size="35" color="#2c0b6c"><Reading /></el-icon>
                      <el-statistic title="新学" :value="dataToday?.learn_num">
                        <template #suffix>
                          <el-icon style="font-size: medium"> 词 </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                  <el-divider direction="vertical" />

                  <!-- Card 2 -->
                  <el-col :span="6" class="stat-card">
                    <div>
                      <el-icon :size="35" color="#2c0b6c"><Memo /></el-icon>
                      <el-statistic title="复习" :value="dataToday?.review_num">
                        <template #suffix>
                          <el-icon style="font-size: medium"> 词 </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                  <el-divider direction="vertical" />

                  <!-- Card 3 -->
                  <el-col :span="8" class="stat-card">
                    <div>
                      <el-icon :size="35" color="#2c0b6c"><Timer /></el-icon>
                      <el-statistic
                        title="学习时长"
                        :value="
                          dataToday ? filterHourMin(dataToday?.time).val : 0
                        "
                      >
                        <template #suffix>
                          <el-icon style="font-size: medium">
                            {{
                              dataToday && filterHourMin(dataToday?.time).type
                            }}
                          </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                </div>
              </el-row>

              <!-- WEEKLY -->
              <el-row class="stat-weekly-row">
                <!-- <el-col :span="24"> -->
                <span class="stat-daily-header stat-weeky-header"
                  >近7天学习统计</span
                >
                <div class="stat-windows stat-weekly-graph">
                  <LineChart :data="chartData" :options="chartOptions" />
                </div>
                <!-- </el-col> -->
              </el-row>
            </div>
          </el-col>

          <!-- CALENDAR -->
          <el-col :span="12">
            <div class="stat-windows stat-calendar">
              <el-calendar ref="calendar">
                <template
                  #header="{ date }"
                  style="width: 100%; justify-content: center"
                >
                  <span>本月打卡情况</span>
                </template>
                <template #date-cell="{ data: cellData }">
                  <div
                    :class="
                      isPassedDay(cellData.date) && isDakaDay(cellData.date)
                        ? 'is-checked'
                        : ''
                    "
                  >
                    {{ cellData.day.split("-").slice(2).join("-") }}
                  </div>
                </template>
              </el-calendar>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
