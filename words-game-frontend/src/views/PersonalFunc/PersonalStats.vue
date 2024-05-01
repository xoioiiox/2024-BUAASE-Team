//Stats
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
                      <el-statistic
                        title="新学"
                        :value="dataToday.learn_number"
                      >
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
                      <el-statistic
                        title="复习"
                        :value="dataToday.review_number"
                      >
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
                      <el-statistic title="复习" :value="dataToday.time">
                      </el-statistic>
                    </div>
                  </el-col>
                </div>
              </el-row>

              <!-- WEEKLY -->
              <el-row class="stat-weekly-row">
                <el-col :span="24">
                  <div class="stat-windows stat-weekly-graph">
                    近7天
                    <Line :options="graphOptions" :data="graphData" />
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
                  <!-- <button @click="selectDate('prev-month')">before</button> -->
                  <div>{{ date }}</div>
                  <!-- <button @click="selectDate('next-month')">next</button> -->
                </template>
                <template #date-cell="{ data: cellData }">
                  <div :class="cellData.isSelected ? 'is-selected' : ''">
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
import { onBeforeMount, ref } from "vue";
import {
  CalendarDateType,
  CalendarInstance,
  calendarEmits,
} from "element-plus";

//CHART
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { RefSymbol } from "@vue/reactivity";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// FUNCTIONS
const getWordDataToday = async () => {
  // const res = await axios(
  //   "http://60.205.14.77:8998/api/word/get-word-data/today"
  // );
  // if (!res) {
  //   console.log("Res ", res);
  // } else {
  //   console.log("Err ", res);
  // }
};

const getWordDataWeek = async () => {
  const res = await axios("/api/word/get-word-data/period", {
    params: { days: 4 },
  })
    .then((res) => console.log("res", res))
    .catch((err) => console.log("err", err));
};

onBeforeMount(() => {
  // getWordDataToday();
});

const getLast7Days = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    console.log("str date: ", date.getDate());
    // dates.push(date.toDateString().split(" "));
    dates.push(date.toLocaleDateString().split("/").slice(0, 2).join("/"));
  }
  return dates.reverse();
};

//API FILLED DATA
//if failed to fetch show error
const dataToday = {
  learn_number: 3,
  review_number: 5,
  time: "0:00:10",
};

//今天，昨天，前天，大前天...
const dataWeek = [
  {
    learn_num: 3,
    review_num: 5,
    time: "0:10:34",
  },
  {
    learn_num: 5,
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

const graphData = ref({
  labels: getLast7Days(),
  datasets: [
    {
      label: "学习词数",
      backgroundColor: "#0096FF",
      data: dataWeek.reverse().map((dataDay) => dataDay.learn_num),
    },
    {
      label: "复习词数",
      backgroundColor: " #00FF00",
      data: dataWeek.reverse().map((dataDay) => dataDay.review_num),
    },
  ],
});

const graphOptions = {
  responsive: true,
};

//CALENDAR
const calendar = ref<CalendarInstance>();
// const selectDate = (val: CalendarDateType) => {
//   const today = new Date();
//   const currentMonth = today.getMonth();
//   console.log("next ", calendar.value.modelValue?.getMonth());
//   if (!calendar.value) return;
//   else if (
//     val == "next-month" &&
//     calendar.value.modelValue?.getMonth() > currentMonth
//   ) {
//     return;
//   }
//   calendar.value.selectDate(val);
// };
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

.stat-card {
  border: 1px solid red;
  height: 100%;
  /* padding: 0px 10px 0px 40px; */
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.stat-card-title {
  display: inline-flex;
  align-items: center;
}

.el-calendar {
  --el-calendar-cell-width: 36px;
}

.el-calendar__header {
  display: flex;
  justify-content: center !important;
  border: 1px solid red;
}

.el-divider {
  height: 50px;
}
</style>
