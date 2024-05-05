<template>
  <div class="study-card">
    <h1>今日任务完成！</h1>
    <p>您已连续打卡 <strong>{{ consecutiveDays }}</strong> 天</p>
    <div>
      <button class="share" @click="punch">打卡</button>
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
const inspirations = reactive(['每一天都是一个新的开始。',
  '微笑是世上最美的风景。',
  '每一步都离梦想更近。',
  '勇敢是在恐惧中前进。',
  '梦想会在终点等你。',
  '每一个困难都是成长的机会。',
  '你的价值由自己的努力来证明。',
  '保持好奇心，生活将充满惊喜。',
  '真正的力量来自于内心的平静和坚定。',
  '做你自己，你的独特是无价之宝。'
]);
const inspiration = ref('default');

var isOpened = ref(false);
const punch = () => {
  isOpened.value = true;
  axios.post('/api/word/daka/', {
    params: {
    }
  })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
}

// getInfo
const getInfo = () => {
  axios.get('/api/word/get-daka-days/', {
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