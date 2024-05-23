<template>
    <div class="event3">
        <!-- 倒计时 -->
        <div class="timer">
            <h2>{{ timeLeft }}</h2>
        </div>

        <!-- 单词和发音按钮 -->
        <div class="word-and-pronunciation">
            <h2>{{ word.theWord }}</h2>
            <span>{{ word.phonetic }}</span>
            <button @click="playAudio">🔊</button>
        </div>

        <!-- 选择按钮 -->
        <div class="options">
            <button v-for="(mean, index) in options" :key="index" class="button" @click="selectOption(index)">
                {{ mean }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElNotification as notify } from 'element-plus'
import { useRouter } from "vue-router";

const router = useRouter();

// 单词
const word = ref({
    theWord: '单词',
    phonetic: '音标'
});

// 释义选项列表
const meanings = reactive(['中文1', '中文2', '中文3', '中文4']);
const numbers = reactive([0, 1, 2, 3]);

const commited = ref(false);

// 选项列表
const options = computed(() => {
    const letters = ['A', 'B', 'C', 'D'];
    return numbers.map((index, i) => letters[i] + '.' + meanings[index]);
});

// 选中的释义
const selectedMeaning = ref(null);

// 倒计时
const timeLeft = ref(10);

// 定时器
const timer = ref(null);

// 播放音频
function playAudio() {
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

// 选择选项
function selectOption(index) {
    console.log('选中的单词:', index);

    if (numbers[index] == 0) {
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

const getWords = () => {
    axios.get('/api/word/card/get-words/', {
        params: {
            num: 4,
            rule: 0,
        }
    })
        .then((response) => {
            word.value.theWord = response.data.words[0].word;
            dict.value = response.data.words[0].meaning.result.trans_result[0].dict;
            word.value.phonetic = JSON.parse(dict.value).word_result.simple_means.symbols[0].ph_am;
            word.value.examples = JSON.parse(dict.value).word_result.simple_means.symbols[0].parts;

            meanings = [];
            for (let i = 0; i < 4; i++) {
                meanings.push(JSON.parse(response.data.words[i].meaning.result.trans_result[0].dict)
                    .word_result.simple_means.symbols[0].parts[0]
                    .means);
            }
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
        type: '英译汉选择',
        result: (timeLeft != '时间到') && (numbers[index] == 0)
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
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

const shuffle = () => {
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    console.log(numbers);
};

onMounted(() => {
    shuffle();
    getWords();
});

onUnmounted(() => {
    resetTimer();
});
</script>

<style scoped></style>