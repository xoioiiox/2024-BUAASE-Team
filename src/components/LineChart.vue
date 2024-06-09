<!-- // LineChart.vue -->
<template>
  <Line :data="data" :options="options" class="line-chart" />
</template>

<script>
import { Line } from "vue-chartjs";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Line },
  props: ["data", "options"],
};
</script>

<style scoped>
.line-chart {
  color: #fff;
  max-width: 400px !important;
  width: 100% !important;
  max-height: 180px;
}
</style>
