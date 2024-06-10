<template>
  <div class="back-home" @click="back2home">
	<span class="font_13">乐词不疲</span>
  </div>
  <div class="wordCard">
	<div class="cardCur">
	  <div class="event1">
		<!-- 倒计时 -->
		<div class="timer">
		  <h2>{{ timeLeft }}</h2>
		</div>

		<!-- 音标和发音按钮 -->
		<div class="pronunciation">
		  <h2>{{ word.phonetic }}</h2>
		  <button @click="playAudio" style="height: 30px">🔊</button>
		</div>

		<!-- 单词释义 -->
		<div class="meaning">
		  <ul>
			<li v-for="example in word.examples" :key="example">
			  {{ example.part + ' ' + example.means }}
			</li>
		  </ul>
		</div>

		<!-- 输入框和确认按钮 -->
		<div class="input-area">
		  <input class="block" type="text" v-model="inputWord" placeholder="     输入英文单词">
		  <button class="okbtn" @click="confirmWord">确认</button>
		</div>
	  </div>  
	</div>
	<div class="cardPrev"></div>
	<div class="cardNext"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElNotification as notify } from 'element-plus'
import { useRouter } from "vue-router";

const router = useRouter();

const back2home = () => {
	router.push('/GameChoose')
}
// 单词数据
const word = ref({
  theWord: '单词',
  phonetic: '音标', // 音标
  examples: [{ part: 'n.', means: '释义' }], // 释义
});

const dict = ref('');
const commited = ref(false);

// toast
const isVisible = ref(false);
const message = ref('');

// 输入框单词
const inputWord = ref('');

// 倒计时
const timeLeft = ref(10);

// 定时器
const timer = ref(null);

const getWords = () => {
  axios.get('/api/word/card/get-words/', {
	params: {
	  num: 1,
	  rule: 0,
	}
  })
	.then((response) => {
	  word.value.theWord = response.data.words[0].word;
	  dict.value = JSON.parse(response.data.words[0].meaning).result.trans_result[0].dict;
	  console.log("node 1");
	  //console.log("dict: " + response.data.words[0].meaning.result.trans_result[0].dict);
	  console.log("dict.value: " + dict.value);
	  console.log("parse(dict.value): " + JSON.parse(dict.value));
	  word.value.phonetic = JSON.parse(dict.value).word_result.simple_means.symbols[0].ph_am;
	  console.log("node 2");
	  console.log(" word.value.phonetic: " + word.value.phonetic);
	  word.value.examples = JSON.parse(dict.value).word_result.simple_means.symbols[0].parts;
	  console.log("node 3");
	  console.log(" word.value.examples: " + word.value.examples);

	  //startTimer();
	  playAudio();
	})
	.catch((error) => {
	  console.log(error);
	});

  startTimer();
}

const postResult = () => {
  axios.post('/api/word/card/cur-event-result/', {
	event_name: '汉译英填空',
	event_result: (timeLeft != '时间到') && (word.value.theWord == inputWord.value)
  })
	.then((response) => {
	  console.log(response);
	})
	.catch((error) => {
	  console.log(error);
	});
}

// 播放音频
const playAudio = () => {
  console.log('playAudio');
  if (!window.speechSynthesis) {
	alert('当前浏览器不支持TTS！');
	return;
  }

  const utterance = new SpeechSynthesisUtterance(word.value.theWord);

  const voices = speechSynthesis.getVoices();
  if (voices.length !== 0) {
	utterance.voice = voices[0]; // 选择第一个语音
  }

  utterance.pitch = 1;
  utterance.rate = 1;

  window.speechSynthesis.speak(utterance);
}

// 确认单词的方法
const confirmWord = () => {
  console.log('确认单词:', inputWord.value);
  setTimeout(() => {
	//跳转到抽卡界面
	router.push('/DrawView');
  }, 3000);
  if (word.value.theWord == inputWord.value) {
	ElMessage({
	  type: 'success',
	  message: '回答正确',
	})
  } else {
	ElMessage({
	  type: 'error',
	  message: '回答错误',
	})
  }

  if (!(commited.value)) {
	commited.value = true;
	postResult();
  }

}

// 启动倒计时
const startTimer = () => {
  timer.value = setInterval(() => {
	if (timeLeft.value > 0) {
	  timeLeft.value--;
	} else {
	  clearInterval(timer.value);
	  timeLeft.value = '时间到！';

	  setTimeout(() => {
		//跳转到抽卡界面
		router.push('/DrawView');
	  }, 3000);
	  if (!(commited.value)) {
		commited.value = true;
		postResult();
	  }
	}
  }, 1000);
}

// 重置倒计时
const resetTimer = () => {
  clearInterval(timer.value);
  timeLeft.value = 10;
}

onMounted(() => {
  getWords();
});

onUnmounted(() => {
  resetTimer();
});
</script>

<style scoped>
.input-area {
  width: 100%;
  position: absolute;
  bottom: 60px;
  display: flex;
  justify-content: center;
}
.block {
  width: 600px;
  height: 80px;
  background: #FFFFFF;
  border: 2px solid #A3A3A3;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 23px;
  margin-right: 20px;
}
.wordCard {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.event1 {
	width: 100%;
	z-index: 4;
}
.timer {
	justify-self: center;
	font-family: 'Zen Dots';
	font-weight: 400;
	font-size: 30px;
	text-align: center;
	color: #000000;
}
.pronunciation {
	font-family: 'Poppins';
    font-weight: 400;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: absolute;
	left: 100px;
	top: 100px;
}
.pron {
	box-sizing: border-box;
	width: 100px;
	height: 50px;
	background: #FFD749;
	border: 3px solid #A09B9B;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 23px;
}
.pron:active {
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	background: #E9CAFF;
	transform: translateY(2px);
}
.meaning {
	position: absolute;
	top: 180px;
	left: 100px;;
	width: 100%;
	font-family: 'Poppins';
	font-weight: 400;
	font-size: 20px;
}
.options {
	width: 100%;
	position: absolute;
	bottom: 30px;
	display: flex;
	justify-content: center;
	gap: 30px;
}
.okbtn {
	width: 200px;
	height: 80px;
	background: #FFD749;
	border: 3px solid #A09B9B;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 23px;
	font-size: large;
}
.okbtn:active {
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
	background: #E9CAFF;
	transform: translateY(2px);
}
.cardCur {
	position: absolute;
	display: flex;
	width: 950px;
	height: 500px;
	background: #FEFBF0;
	border: 1px solid #C8B058;
	box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
	border-radius: 24px;
	z-index: 3;
}
.cardPrev {
	position: absolute;
	left: 150px;
	bottom: 170px;
	display: flex;
	width: 500px;
	height: 450px;
	background: #FEFBF0;
	border: 1px solid #C8B058;
	box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
	border-radius: 24px;
	z-index: 3;
	transform: rotate(-3deg);
	z-index: 2;
}
.cardNext {
	position: absolute;
	right: 150px;
	bottom: 170px;
	display: flex;
	width: 500px;
	height: 450px;
	background: #FEFBF0;
	border: 1px solid #C8B058;
	box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
	border-radius: 24px;
	z-index: 3;
	transform: rotate(3deg);
	z-index: 2;
}
</style>