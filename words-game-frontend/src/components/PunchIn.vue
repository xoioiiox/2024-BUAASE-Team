<template>
  <div class="study-card">
    <h1>今日任务完成！</h1>
    <p>您已连续打卡 <strong>{{ consecutiveDays }}</strong> 天</p>
    <div>
      <button class="share" @click="isOpened = !isOpened">打卡</button>
      <Teleport to="body">
        <ImagePreviewModal v-if="isOpened" @close="isOpened = !isOpened" :firstProp="consecutiveDays"
          :secondProp="inspiration" />
      </Teleport>
    </div>
    <div class="buttons">
      <button class="choise" @click="goHome">返回首页</button>
      <button class="choise" @click="nextSet">继续下一组</button>
      <button class="choise" @click="playGame">趣味小游戏</button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import ImagePreviewModal from './ImagePreviewModal.vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();

const consecutiveDays = ref(0);
const inspirations = reactive(['鸡汤1',
  '鸡汤2',
  '鸡汤3',
  '鸡汤4',
  '鸡汤5',
  '鸡汤6',
  '鸡汤7',
  '鸡汤8',
  '鸡汤9',
  '鸡汤10',
  '鸡汤11']);
const inspiration = ref('default');

var isOpened = ref(false);

// getInfo
const getInfo = () => {
  axios.get('/api/word/get-daka-days', {
    params: {
    }
  })
    .then((response) => {
      console.log(response);
      consecutiveDays.value = response.data.days;
      inspiration.value = inspirations[consecutiveDays % inspirations.length]
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
    });
}

onBeforeMount(() => {
  getInfo();
})

const goHome = () => {
  // 返回首页的逻辑
  router.push('/');
}

const nextSet = () => {
  // 继续下一组的逻辑
  router.push('/recite');
}

const playGame = () => {
  // 打开趣味小游戏的逻辑
  alert('趣味小游戏功能尚未实现。');
}


</script>

<style scoped>
.study-card {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.inspiration {
  color: #555;
  font-style: italic;
}

.image {
  max-width: 100%;
  height: auto;
}

.choise {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  flex: 1;
  transition: background-color 0.1s ease;
  background-color: #0366d6;
  color: white;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  gap: 50px;
}

.choise:active {
  background-color: #5c8db8;
}

.share {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  flex: 1;
  transition: background-color 0.1s ease;
  background-color: #0366d6;
  color: white;
}

.share:active {
  background-color: #5c8db8;
}
</style>