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
          <el-col :span="12">
            <div class="stat-windows stat-daily">
              <el-row :gutter="16">
                <el-col :span="12">
                  <!-- Card -->
                  <div class="stat-card">
                    <el-statistic title="新学" :value="10">
                      <template #suffix>
                        <el-icon style="font-size: small"> 词 </el-icon>
                      </template>
                    </el-statistic>
                  </div>
                </el-col>

                <!-- Card 2 -->
                <el-col :span="12">
                  <div class="stat-card">
                    <el-statistic title="复习" :value="20">
                      <template #suffix>
                        <el-icon style="font-size: small"> 词 </el-icon>
                      </template>
                    </el-statistic>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <!-- Card 3 -->
                <el-col :span="8">
                  <div class="stat-card">
                    <el-countdown title="学习时长" />
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="stat-windows stat-calendar">
              <el-calendar v-model="value" />
            </div>
          </el-col>
        </el-row>
        <!-- Row 2 -->
        <el-row class="stat-weekly-row">
          <el-col :span="20">
            <div class="stat-windows stat-weekly">近7天</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue";
import { ref } from "vue";
const value = ref(new Date());
export default {
  components: { PersonalSide },
  data() {},
};
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
