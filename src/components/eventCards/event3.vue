<template>
    <div class="Header">
        <p class="logo">乐词不疲</p>
    </div>
    <div class="wordCard">
        <div class="event3">
            <!-- 倒计时 -->
            <div class="timer">
                <h2>{{ timeLeft }}</h2>
            </div>

            <!-- 单词和发音按钮 -->
            <div class="word-and-pronunciation">
                <h2>{{ word.theWord }}</h2>
                <span>{{ word.phonetic }}</span>
                <button class="pron" @click="playAudio">🔊</button>
            </div>

            <!-- 选择按钮 -->
            <div class="options">
                <button v-for="(mean, index) in options" :key="index" class="button" @click="selectOption(index)">
                    {{ mean }}
                </button>
            </div>

        </div>
        <div class="cardCur"></div>
        <div class="cardPrev"></div>
        <div class="cardNext"></div>
    </div>

    <div class="background"></div>
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
let meanings = reactive(['中文1', '中文2', '中文3', '中文4']);
let numbers = reactive([0, 1, 2, 3]);

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

            meanings = meanings.splice(0, meanings.length);
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

<style scoped>
.Header {
    position: absolute;
    width: 1920px;
    height: 120px;
    left: 0px;
    top: 0px;
}

.wordCard {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 1276px;
    height: 692.06px;
    left: 325px;
    top: 200.94px;
}

.event3 {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 1000px;
    height: 200px;

    z-index: 4;
}

.timer {
    margin-top: 100px;
    width: 300px;
    height: 60px;


    font-family: 'Zen Dots';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 58px;
    text-align: center;
    letter-spacing: 0.03em;

    color: #000000;
}

.word-and-pronunciation {
    margin-top: 100px;
    width: 1000px;
    height: 60px;


    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 60px;
    /* identical to box height */
    display: flex;
    align-items: center;
    gap: 20px;

    color: #000000;
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

.options {
    margin-top: 200px;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.button {
    box-sizing: border-box;

    width: 250px;
    height: 100px;

    background: #FFD749;
    border: 3px solid #A09B9B;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 23px;

    font-size: large;
}

.button:active {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    background: #E9CAFF;
    transform: translateY(2px);
}

.cardCur {
    box-sizing: border-box;

    position: absolute;
    width: 1276px;
    height: 600px;
    left: calc(50% - 1276px/2 + 3px);
    top: calc(50% - 600px/2 + 53px);

    background: #FEFBF0;
    border: 1px solid #C8B058;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    border-radius: 24px;

    z-index: 3;
}

.cardPrev {
    box-sizing: border-box;

    position: absolute;
    width: 833.69px;
    height: 552.53px;
    left: calc(50% - 833.69px/2 - 331.16px);
    top: calc(50% - 552.53px/2 + 77.68px);

    background: #FEFBF0;
    border: 1px solid #C8B058;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    transform: rotate(-2.16deg);

    z-index: 2;
}

.cardNext {
    box-sizing: border-box;

    position: absolute;
    width: 833.69px;
    height: 574.53px;
    left: calc(50% - 833.69px/2 + 331.24px);
    top: calc(50% - 552.53px/2 + 50.32px);

    background: #FEFBF0;
    border: 1px solid #C8B058;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    transform: rotate(2.16deg);

    z-index: 1;
}

.logo {
    position: absolute;
    width: 192px;
    height: 72px;
    left: 138px;
    top: 32px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 72px;
    /* identical to box height */
    display: flex;
    align-items: center;

    color: #FFFFFF;

    text-shadow: 0px 4px 10px #FBDD6F;
}

.background {
    position: fixed;
    width: 100vw;
    height: 100vh;

    background: linear-gradient(180deg, #2C0B6C 30.09%, #974FC7 100%);

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    margin: 0;
    padding: 0;

    z-index: -1;
}
</style>