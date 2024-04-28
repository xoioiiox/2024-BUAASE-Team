<template>
    <div class="word-detail">
        <h1>{{ word }}</h1>

        <div class="word-pronunciation">
            <span>发音： </span>
            <span>{{ pronunciation }}</span>
            <button id="sound-button" @click="playtts">🔊</button>
            <audio id="audio" style="display: none;"></audio>
        </div>

        <div class="word-examples">
            <h2>释义：</h2>
            <ul>
                <li v-for="example in examples" :key="example">
                    {{ example.part + ' ' + example.mean }}
                </li>
            </ul>
        </div>

        <div class="buttons">
            <button class="choise" @click="deleteWord">删除</button>
            <button class="choise" @click="correctWord">记错了</button>
            <button class="choise" @click="recognizeWord">认识</button>
        </div>

        <button class="add-to-vocab" @click="addToVocab">添加生词本</button>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();

//word
const word = ref('Hello');//router.query.word
const dict = ref('');
const pronunciation = ref(' həˈləʊ ');
const theSrc = 'https://fanyi-api.baidu.com/api/trans/api/tts?query=hello&appid=20210101000000001&lang=en&sign=169aa0398cfb86ace951aa8a96ec44fd'.replace(/^https:\/\/fanyi-api\.baidu\.com/, '/fanyi');
const pronunciationSrc = ref(theSrc);

const examples = ref([
    {
        part: 'n.',
        mean: '打招呼'
    },
    {
        part: 'v.',
        mean: '说'
    }
]);


const deleteWord = () => {
    // 删除单词的逻辑
    axios.post('/api/word/tag-word', {
        params: {
            word: word.value,
            tag: '完全掌握'
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    router.push('/recite');
};

const correctWord = () => {
    // 记错了单词的逻辑
    axios.post('/api/word/tag-word', {
        params: {
            word: word.value,
            tag: '记错了'
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    router.push('/recite');
};

const recognizeWord = () => {
    // 认识单词的逻辑
    axios.post('/api/word/tag-word', {
        params: {
            word: word.value,
            tag: '认识'
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    router.push('/recite');

};

const addToVocab = () => {
    // 添加到生词本的逻辑
    axios.post('/api/word/add-favor-word', {
        params: {
            word: word.value
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

const queryWord = () => {
    axios.get('/api/query-word-zh-dict', {
        params: {
            word: word.value
        }
    })
        .then((response) => {
            console.log(response);

            dict.value = JSON.parse(response.data.result.trans_result.dict);
            pronunciation.value = dict.value.word_result.simple_means.symbols.ph_am;

            const ttsSrc = response.data.result.trans_result.src_tts;
            pronunciationSrc.value = ttsSrc.replace(/^https:\/\/fanyi-api\.baidu\.com/, '/fanyi');

            examples.value = dict.value.word_result.simple_means.symbols.parts;
        })
        .catch((error) => {
            console.log(error);
        });
}

const playtts = () => {
    const audio = document.getElementById('audio');
    audio.src = pronunciationSrc.value;
    audio.play();
}


onBeforeMount(() => {
    //word.value = router.query.word;
})

onMounted(() => {
    queryWord();
})

</script>

<style scoped>
.word-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.word-detail h1 {
    text-align: center;
}

.word-pronunciation span:first-child {
    font-weight: bold;
}

.word-examples li {
    color: #0366d6;
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

.add-to-vocab {
    position: absolute;
    top: 50px;
    right: 50px;

    padding: 10px 20px;
    border-radius: 5px;
    margin: 50px 50px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    transition: background-color 0.1s ease;
    background-color: #0366d6;
    color: white;
}

.add-to-vocab:active {
    background-color: #5c8db8;
}
</style>