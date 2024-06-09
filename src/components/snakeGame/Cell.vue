<!--* @Description:每一个小格子-->


<template>
  <!--  <div class='cell-box'-->
  <!--       :class='classes'>-->
  <!--  </div>-->

  <div class="cell-box" :class="classes">
    <!-- 使用v-if指令仅在food类型的格子中显示文本 -->
    <span v-if="props.type === -1" class="cell-text">{{props.character[0]}}</span>

    <span v-if="props.type === -2" class="cell-text">{{props.character[1]}}</span>


  </div>

</template>

<script lang='ts' setup>
import { computed, defineProps } from 'vue';
const props = defineProps(['type', 'character']);


// console.log(props.character)

// 小格子的颜色
const classes = computed(() => {
  return {
    head: props.type === 2,
    body: props.type === 1,
    food: props.type === -1,
    foodTwo: props.type === -2
  };
});
</script>

<style lang='scss' scoped>
.cell-box {
  width: 50px;
  height: 50px;
  @media screen and (max-width: 750px) {
    width: 30px;
    height: 30px;
  }
  border-radius: 8px;
  margin: 2px;

  /*  */
  display: flex;
  justify-content: center;
  align-items: center; /* 确保文本在格子内垂直和水平居中 */
}

.cell-text {
  font-size: 32px; /* 根据需要调整字体大小 */
  color: white; /* 文本颜色，根据背景色调整 */
  /* 其他文本样式 */
}


.head {
  background: #fafafa;
  box-shadow: 0 0 10px #1e88e5, 0 0 20px #1e88e5, 0 0 40px #1e88e5;
}
.body {
  background: black;
  box-shadow: 0 0 5px #76ff03, 0 0 5px #76ff03, 0 0 10px #76ff03;
}
.food {
  background: #d500f9;
  border-radius: 50%;
  animation-name: shineFood;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.foodTwo {
  background: #d500f9;  /* #5bf900 */
  border-radius: 50%;
  animation-name: shineFood;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

@keyframes shineFood {
  0% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
  50% {
    box-shadow: 0 0 10px #d500f9, 0 0 20px #d500f9, 0 0 20px #d500f9;
  }
  100% {
    box-shadow: 0 0 5px #d500f9, 0 0 5px #d500f9, 0 0 5px #d500f9;
  }
}
</style>
