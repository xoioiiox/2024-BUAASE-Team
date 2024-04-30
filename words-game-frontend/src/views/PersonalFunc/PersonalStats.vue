<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <el-col :span="16" class="stat-page">
        <h2>统计信息</h2>
        <!-- Row 1 -->
        <el-row :span="20" :gutter="20">
          <el-col :span="8">
            <div class="stat-windows stat-daily">
              <el-row :gutter="16">
                <el-col :span="24">
                  <!-- Card -->
                  <div class="stat-card">
                    <el-statistic title="新学" :value="dataToday.learn_number">
                      <template #suffix>
                        <el-icon style="font-size: small"> 词 </el-icon>
                      </template>
                    </el-statistic>
                  </div>
                </el-col>

                <!-- Card 2 -->
                <el-col :span="24">
                  <div class="stat-card">
                    <el-statistic title="复习" :value="dataToday.review_number">
                      <template #suffix>
                        <el-icon style="font-size: small"> 词 </el-icon>
                      </template>
                    </el-statistic>
                  </div>
                </el-col>

                <!-- Card 3 -->
                <el-col :span="8">
                  <div class="stat-card">
                    <el-statistic title="复习" :value="dataToday.time">
                    </el-statistic>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="stat-windows stat-calendar">
              <el-calendar v-model="value" />
            </div>
          </el-col>
        </el-row>
        <!-- Row 2 -->
        <el-row class="stat-weekly-row">
          <el-col :span="20">
            <div class="stat-windows stat-weekly">
              近7天
              <Line :options="options" :data="data" />
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const data = ref({
  labels: ["7", "6", "5", "4", "3", "2", "1"],
  datasets: [
    {
      label: "Study progress",
      backgroundColor: "#0096FF",
      data: [100, 20, 50, 2, 60, 30, 10],
    },
  ],
});

const options = {
  responsive: true,
};

//CALENDAR
const value = ref(new Date());

//API FILLED DATA
const dataToday = {
  time: "0:00:10",
  learn_number: 3,
  review_number: 2,
};

const dataDays = {
  time: "0:00:10",
  learn_number: 3,
  review_number: 2,
};

// FUNCTIONS
/*
const getWordDataToday = async () => {
  const res = await axios("/api/word/get-word-data/today");
  if (!res) {
    console.log("Res ", res);
  } else {
    console.log("Err ", res);
  }
};

const getWordDataBefore = async () => {
  const res = await axios("/api/word/get-word-data/period", {
    params: { days: 4 },
  })
    .then((res) => console.log("res", res))
    .catch((err) => console.log("err", err));
};

onBeforeMount(() => {
  getWordDataToday();
  getWordDataBefore();
});
*/
</script>

<style scoped>
.stat-windows {
  border-radius: 4px;
  padding: 0 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
}

.el-calendar {
  --el-calendar-cell-width: 36px;
}

.stat-page {
  height: 100%!;
}

.stat-daily {
  height: 100%;
}

.stat-weekly-row {
  position: relative;
  margin-top: 20px;
  height: 20%;
}

.stat-weekly {
  height: 100%;
}

/* Copy Pasted */

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.stat-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}
.stat-card-title {
  display: inline-flex;
  align-items: center;
}
</style>
