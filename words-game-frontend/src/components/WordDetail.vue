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
    import { ref } from 'vue';

    const word = ref('Hello');
    const pronunciation = ref(' həˈləʊ ');
    const meaning = ref('你好');
    const examples = ref([
        '"Hello, this is John, my colleague."',
        '"Hello, I must be going now."'
    ]);


    const deleteWord = () => {
        // 删除单词的逻辑
        alert('删除单词功能尚未实现。');
    };

    const correctWord = () => {
        // 记错了单词的逻辑
        alert('记错了单词功能尚未实现。');
    };

    const recognizeWord = () => {
        // 认识单词的逻辑
        alert('认识单词功能尚未实现。');
    };

    const addToVocab = () => {
        // 添加到生词本的逻辑
        alert('添加到生词本功能尚未实现。');
    };
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
        color:white;
    }
  
    .add-to-vocab:active {
        background-color: #5c8db8; 
    }

</style>