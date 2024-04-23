<template>
  <div class="study-card">
    <h1>今日任务完成！</h1>
    <p>您已连续打卡 <strong>{{ consecutiveDays }}</strong> 天</p>
    <!-- <p class="inspiration">{{ inspiration }}</p> -->
    <div>
      <button class="share" @click="isOpened = !isOpened">打卡</button>
      <Teleport to="body">
        <ImagePreviewModal v-if="isOpened" @close="isOpened = !isOpened" />
      </Teleport>
    </div>
    <div class="buttons">
      <button class="choise" @click="goHome">返回首页</button>
      <button class="choise" @click="nextSet">继续下一组</button>
      <button class="choise" @click="playGame">趣味小游戏</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import imgSrc from '../assets/images/BubbleHouse.webp';
  import ImagePreviewModal from './ImagePreviewModal.vue';
  
    const consecutiveDays = ref(10); 
    const inspiration = ref('每天的努力，都是为了让未来的自己更加优秀。'); 
    const imageSrc = ref(imgSrc); 
    var isOpened = ref(false);

    const goHome = () => {
      // 返回首页的逻辑
      alert('返回首页功能尚未实现。');
    }

    const nextSet = () => {
      // 继续下一组的逻辑
      alert('继续下一组功能尚未实现。');
    }
    
    const playGame = () => {
      // 打开趣味小游戏的逻辑
      alert('趣味小游戏功能尚未实现。');
    }

    
</script>

<style scoped>
.study-card {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
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

.share:active {
  background-color: #5c8db8; 
}

</style>