<template>
  <div class="event1">
    <!-- 倒计时 -->
    <div class="timer">
      <h2>{{ timeLeft }}</h2>
    </div>

    <!-- 音标和发音按钮 -->
    <div class="pronunciation">
      <h2>{{ word.phonetic }}</h2>
      <button @click="playAudio">🔊</button>
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
      <input type="text" v-model="inputWord" placeholder="输入英文单词">
      <button @click="confirmWord">确认</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElNotification as notify } from 'element-plus'
import { useRouter } from "vue-router";

const router = useRouter();


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
      dict.value = response.data.words[0].meaning.result.trans_result[0].dict;
      word.value.phonetic = JSON.parse(dict.value).word_result.simple_means.symbols[0].ph_am;
      word.value.examples = JSON.parse(dict.value).word_result.simple_means.symbols[0].parts;

      //startTimer();
      playAudio();
    })
    .catch((error) => {
      console.log(error);
    });

  startTimer();
}

const postResult = () => {
  axios.post('/api/word/card/curEventResult/', {
    type: '汉译英填空',
    result: (timeLeft != '时间到') && (word.value.theWord == inputWord.value)
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
  setTimeout(() => {
    //跳转到抽卡界面
  }, 3000);
}

// 启动倒计时
const startTimer = () => {
  timer.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer.value);
      timeLeft.value = '时间到！';
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

<style scoped></style>