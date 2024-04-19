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
    };

    const correctWord = () => {
        // 记错了单词的逻辑
    };

    const recognizeWord = () => {
        // 认识单词的逻辑
    };

    const addToVocab = () => {
        // 添加到生词本的逻辑
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
        margin-top: 20px; /* 按钮之间的垂直间距 */
        padding: 10px 20px; /* 按钮内部的空间 */
        border-radius: 5px; /* 边角半径为5px */
        font-size: 16px; /* 按钮文字的大小 */
        cursor: pointer; /* 鼠标悬停时显示手形图标 */
        border: none;
        flex: 1;
        transition: background-color 0.1s ease; /* 背景颜色变化的过渡效果 */
        background-color: #0366d6;
        color: white;
    }

    .buttons {
        display: flex; /* 使用flexbox布局 */
        justify-content: center; /* 水平居中按钮 */
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
        margin: 50 50px; 
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