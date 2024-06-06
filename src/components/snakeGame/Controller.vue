


<template>
  <!-- 过渡动画  添加了0.3s的淡入淡出  显得更加平滑 -->
  <transition name="base">
    <!-- 遮罩层 -->
    <div class="controller-box"
         v-if="isLive !== 2">
      <!-- 游戏未开始 -->
      <div v-if="isLive === 1"
           class="show-btns"
           @click='emit("start")'>
        <img src="../../assets/snakeGame/snake.png"
             class="limit">
        <img src="../../assets/snakeGame/start.png">
        <div class="options-tips">
<!--          <p>手机玩家请点击屏幕进行操作;</p>-->
          <p>电脑玩家请通过按键 ↑ ← ↓  → 或 W A S D 进行操作;</p>
        </div>
      </div>
      <!-- 游戏结束,再来一局 -->
      <div v-if="isLive === 3"
           class="show-btns"
           >
        <img src="../../assets/snakeGame/gameover.png"
             class="limit">
        <div class="btn-img">

          <img src="../../assets/snakeGame/replay.jpg" @click='emit("replay")' class="img-size">
          <img src="../../assets/snakeGame/exit.jpg" class="img-size" @click="goToHome">

        </div>

        <div class="options-tips">
          <!--          <p>手机玩家请点击屏幕进行操作;</p>-->
          <p>电脑玩家请通过按键 ↑ ← ↓  → 或 W A S D 进行操作;</p>
        </div>

      </div>
    </div>
  </transition>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import router from "@/router";

const emit = defineEmits(['start', 'replay']);

defineProps({
  isLive: {
    type: Number,
    default: 1,
  },
});

function goToHome(){
  router.push('/GameChoose');
}

</script>

<style lang='scss' scoped>
.controller-box {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  // 模糊滤镜
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  .show-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .limit {
      width: 300px;
    }

  }

  .btn-img {
    display: flex;
    flex-direction: row; /* 改为行排列 */
    align-items: center;
    justify-content: center;
    gap: 10px; /* 设置图片之间的间隔 */
    .img-size{
      height: 80px;
      width: 280px;
    }
  }

  .options-tips {
    color: #f0d095;
    font-size: 30px;

  }
}
//淡入淡出
.base-enter-active,
.base-leave-active {
  transition: all 0.3s ease;
}
.base-enter-to,
.base-leave-from {
  opacity: 1;
}
.base-enter-from,
.base-leave-to {
  opacity: 0;
}
</style>
