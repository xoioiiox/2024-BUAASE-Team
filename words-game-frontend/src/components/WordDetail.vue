<template>
    <div class="word-detail">
        <h1>{{ word }}</h1>

        <div class="word-pronunciation">
            <span>发音： </span>
            <span>{{ pronunciation }}</span>
        </div>

        <div class="word-meaning">
            <h2>释义：</h2>
            <p>{{ meaning }}</p>
        </div>

        <div class="word-examples">
            <h2>例句：</h2>
            <ul>
                <li v-for="example in examples" :key="example">
                    {{ example }}
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

//
const word = ref('Hello');
const dict = ref('');
const pronunciation = ref(' həˈləʊ ');
const pronunciationSrc = ref('');

const meaning = ref('你好');
const examples = ref([
    '"Hello, this is John, my colleague."',
    '"Hello, I must be going now."'
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
            meaning.value = response.result.trans_result.dst;

        })
        .catch((error) => {
            console.log(error);
        });
}

const playtts = () => {
    axios.get('/fanyi/api/trans/api/tts?query=%E4%BD%A0%E5%A5%BD&appid=202105250003&lang=zh&sign=4dff83efd4a0ff36e8806efd2a0421b4', {
        params: {
        }
    })
        .then((response) => {
            console.log(response);
            //meaning.value = response.result.trans_result.dst;

        })
        .catch((error) => {
            console.log(error);
        });
}


onBeforeMount(() => {

})

onMounted(() => {
    playtts();
    //queryWord();
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

.word-meaning p {
    font-size: 1.1em;
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