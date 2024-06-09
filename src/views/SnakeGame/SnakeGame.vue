
<template>
  <div class='app-content'>
    <Map :map='state.map' :specialChars='specialChars'></Map>  <!-- 调用组件 -->

    <Controller :is-live='isLive'
                @start='start'
                @replay='replay'></Controller>  <!-- 调用组件 -->
    <KeyBoard :is-live='isLive'
              @changeDirection='change'></KeyBoard>   <!-- 调用组件 -->


    <!--    <audio controls-->
    <!--           ref="audio"-->
    <!--           class="audio"-->
    <!--           loop-->
    <!--           autoplay>-->
    <!--      <source src="https://img.tukuppt.com/newpreview_music/09/01/69/5c8a0553e18db46234.mp3"-->
    <!--              type="audio/mpeg" />-->
    <!--    </audio>-->

    <div class="sidebar">

      <p>{{word.slice(0, -1).concat("_")}}</p>

      <p></p>

      <p>(大型)百货商店；储存，储备；商店，店铺</p>


      <p style="color: #d500f9">  : {{specialChars[0]}} </p>

      <p style="color: #5bf900">  : {{ specialChars[1] }}</p>

    </div>

  </div>
</template>

<script lang='ts' setup>
import { startGame, replayGame, changeDirection } from './game';
import Map from '../../components/snakeGame/Map.vue';
import Controller from '../../components/snakeGame/Controller.vue';
import KeyBoard from '../../components/snakeGame/KeyBoard.vue';
import { initGame } from './game';
import {onMounted, reactive, ref} from 'vue';
import { StateType } from './types';
import axios from "axios";


import { state } from '../../components/globalWord';
import { updateGlobalVariable } from '../../components/globalWord';

const audio = ref(null);


// 定义响应式数据
const word = ref('store');
const pronunciation = ref('');
const definition = ref('');
const specialChars = ref(['r', 'e']); // 假设需要传递的字符是固定的

// 获取单词数据
onMounted(async () => {
  const response = await axios.get('/api/word/get-next-word/').then((response) => {
    if (response.status === 200) {//状态码200，请求正确
      const newWord = response.data.word;

      console.log(newWord)

      console.log(state.myGlobalVariable)
      updateGlobalVariable(newWord);

      word.value = response.data.word;

      const myGlobalVariable = state.myGlobalVariable;

      let str = word.value;
      let letter = str.charAt(str.length-1);
      let letter2 = getRandomLetter(letter);
      specialChars.value = [letter, letter2];
    }
  }) .catch((error) => {

  })
  // const data = await getWordData(); // 调api
  // word.value = data.word;
  // pronunciation.value = data.pronunciation;
  // definition.value = data.definition;
  // 根据实际情况可能需要更新specialChars
});

function getRandomLetter(givenLetter) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let randomLetter;
  do {
    randomLetter = alphabet[Math.floor(Math.random() * 26)]; // 生成随机索引并获取字母
  } while (randomLetter === givenLetter); // 如果随机字母与给定字母相同，继续循环
  return randomLetter;
}


// 地图
const state = reactive<StateType>({
  map: [],
});

// 游戏状态 1未开始 2进行中 3已结束
const isLive = ref(1);

// 开始游戏
const start = () => {
  startGame();
  // @ts-ignore
  // audio.value.play();
};
// 再来一局
const replay = () => {
  replayGame();
};
// 修改方向
const change = (direction: string) => {
  changeDirection(direction);
};

// 初始化游戏
initGame(state.map, isLive);


</script>

<style lang='scss' scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app-content {
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;

  background: #000;
  padding: 0;
  overflow: hidden;
  background: url('../../assets/snakeGame/background-b.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 750px) {
    background: url('../../assets/snakeGame/background-c.jpg');
    background-size: contain;
  }
}




.sidebar {
  margin-left: 40px;
  width: 300px; /* 设置侧边栏的宽度 */
  height: 660px;
  background-color: #fff; /* 设置背景颜色为白色 */
  /* 可以添加更多样式来美化侧边栏 */
}



.audio {
  position: absolute;
  z-index: -1;
  visibility: hidden;
}
</style>
