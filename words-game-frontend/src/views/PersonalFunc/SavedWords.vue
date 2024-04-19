<template>
  <div>
    <el-row>
      <el-col :span="6">
        <PersonalSide />
      </el-col>
      <el-col :span="18">
        <el-scrollbar max-height="90vh">
          <el-card v-for="o in 20" :key="o" style="max-width: 80%">
            <p class="text item">
              {{ "Word " + o }}
            </p>
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue";
export default {
  components: { PersonalSide },
  data() {},
};
</script>
