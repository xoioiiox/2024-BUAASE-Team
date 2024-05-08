<template>
  <div>
    <el-row :gutter="20">
      <!-- PERSONAL SIDE -->
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <!-- STAT PAGE -->
      <el-col :span="18" class="stat-page">
        <h2>统计信息</h2>

        <el-row :span="24" :gutter="20">
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
                      <el-statistic title="新学" :value="dataToday?.learn_num">
                        <template #suffix>
                          <el-icon style="font-size: small"> 词 </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                  <el-divider direction="vertical" />

                  <!-- Card 2 -->
                  <el-col :span="6" class="stat-card">
                    <div>
                      <el-statistic title="复习" :value="dataToday?.review_num">
                        <template #suffix>
                          <el-icon style="font-size: small"> 词 </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                  <el-divider direction="vertical" />

                  <!-- Card 3 -->
                  <el-col :span="8" class="stat-card">
                    <div>
                      <el-statistic
                        title="学习时长"
                        :value="
                          dataToday ? filterHourMin(dataToday?.time).val : 0
                        "
                      >
                        <template #suffix>
                          <el-icon style="font-size: small">
                            <!-- {{ getHourMin(dataToday?.time).type }} -->
                          </el-icon>
                        </template>
                      </el-statistic>
                    </div>
                  </el-col>
                </div>
              </el-row>

              <!-- WEEKLY -->
              <el-row class="stat-weekly-row">
                <el-col :span="24">
                  <div class="stat-windows stat-weekly-graph">
                    <span class="stat-daily-header">近7天学习统计</span>
                    <LineChart :data="chartData" :options="chartOptions" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>

          <!-- CALENDAR -->
          <el-col :span="8">
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
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import PersonalSide from "../../components/PersonalSide.vue";
import LineChart from "../../components/LineChart.vue";
import { computed, onBeforeMount, ref, watch, nextTick } from "vue";
import { CalendarInstance } from "element-plus";

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
    // console.error("Error get today data:", error);
    dataToday.value = {
      learn_num: 3,
      review_num: 5,
      time: "00:10:00",
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
      // console.log("Error get week data: ", err);
      dataWeek.value = [
        {
          learn_num: 3,
          review_num: 5,
          time: "0:10:34",
        },
        {
          learn_num: 0,
          review_num: 10,
          time: "0:20:02",
        },
        {
          learn_num: 12,
          review_num: 4,
          time: "0:21:00",
        },
        {
          learn_num: 10,
          review_num: 12,
          time: "1:30:02",
        },
        {
          learn_num: 10,
          review_num: 20,
          time: "1:30:02",
        },
        {
          learn_num: 7,
          review_num: 12,
          time: "1:30:02",
        },
        {
          learn_num: 0,
          review_num: 16,
          time: "1:30:02",
        },
      ];
    })
    .finally(() => {
      // console.log("finally: ", dataWeek.value[0]);
    });
};

const getDakaDetail = () => {
  axios
    .get("/api/words/get-daka-detail", {
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
      dakaDetail.value = [true, true, true, false, false, true, false, true];
    })
    .finally(() => console.log("dakaDetails in final: ", dakaDetail.value));
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
        backgroundColor: "#0096FF",
        data: [],
      },
      {
        label: "复习词数",
        backgroundColor: "#00FF00",
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

<style scoped>
* {
  box-sizing: border-box;
}

.stat-page {
  /* border: 1px solid red; */
  height: 100%!;
  padding-left: 50px;
}

.stat-windows {
  /* border: 1px solid blue; */
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}

.stat-study {
  /* border: 1px solid red; */
  height: 100%;
  gap: 5px;
}

.stat-daily-row {
  padding-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.stat-daily-header {
  /* border: 1px solid red; */
  padding-left: 30px;
}

.stat-daily-cards {
  /* border: 1px solid orange; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
}

.stat-card {
  /* border: 1px solid red; */
  height: 100%;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.stat-card-title {
  display: inline-flex;
  align-items: center;
}

.stat-weekly-row {
  margin-top: 40px;
  height: 20%;
}

.stat-weekly-graph {
  padding: 10px 20px 4px 10px;
  height: 100%;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.el-calendar {
  --el-calendar-cell-width: 36px;
}

.el-divider {
  height: 50px;
}

.is-checked {
  width: 24px;
  height: 24px;
  position: relative;
  margin: auto;
  border: 3px double #00ff00;
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  background-color: #b2ffb2;
  background-image: repeating-linear-gradient(
    -45deg,
    #fff,
    #fff 7px,
    transparent 0,
    transparent 14px
  );
}
</style>
