<template>
	<div class="back-home" @click="goHome">
		<span class="font_13">乐词不疲</span>
	</div>
	<div style="display:flex;justify-content: center;align-items: center;height: 100vh;">
		<div class="study-card">
			<div class="study-card-top">
        <span class="top-text">Daily Goal Complete</span>
      </div>
      <div class="day-count">
        <span class="punch-text">您已连续打卡 <strong>{{ consecutiveDays }}</strong> 天</span>
      </div>
			<div class="share" @click="punch">打卡</div>
			<Teleport to="body">
				<ImagePreviewModal v-if="isOpened" @close="isOpened = !isOpened" :firstProp="consecutiveDays"
					:secondProp="inspiration" />
			</Teleport>
			<div class="buttons">
				<!--button class="choise" @click="goHome">返回首页</button-->
				<button class="choise" @click="nextSet">继续下一组</button>
				<button class="choise" @click="playGame">趣味小游戏</button>
			</div>
		</div>
	</div>
	
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import ImagePreviewModal from './ImagePreviewModal.vue';
import axios from 'axios';
import { useRouter } from "vue-router";
import '@fontsource/viga'

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
  axios.post('/api/word/daka/')
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
  axios.get('/api/word/get-daka-days/')
    .then((response) => {
      console.log(response);
      consecutiveDays.value = response.data.days;
      inspiration.value = inspirations[Math.floor(Math.random() * inspirations.length)];
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
  axios.post('/api/word/next-group/')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
    });
  router.push('/recite');
}

const playGame = () => {
  // 打开趣味小游戏的逻辑
  router.push('/StartGameHome')
}


</script>

<style scoped>
.punch-text {
	font-size: 18px;
}
.study-card {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
  width: 400px;
	height: 450px;
	border-radius: 10px;
	background-color: #FFFEFF;
	box-shadow: 0 10px 0 #D3D8FF;
}
.study-card-top {
  display: flex;
  justify-content: center;
  align-items: center;
	position: absolute;
	top: -20px;
	width: 300px;
	height: 80px;
	background-image: linear-gradient(270deg, #3cf4c4 0%, #4fb1ff 100%);
  border-radius: 12px;
}
.top-text {
  font-family: Viga;
  color: #2C0B6C;
  font-size: 30px;
  font-weight: 800;
}
.day-count {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100px;
  background-color: #C2FDFF;
  color: #228AED;
  width: 250px;
  height: 40px;
  border-radius: 20px;
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
  width: 130px;
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
  position: absolute;
  bottom: 50px;
  width: 150px;
  height: 60px;
  border-radius: 30px;
  box-shadow: 0 5px 0 #7031FC;
  cursor: pointer;
  background-color: #9A4AFE;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
}
</style>