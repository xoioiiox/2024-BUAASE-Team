<!--* @Description:游戏页面-->

<template>
  <div class="game-box">
    <!-- 行 -->
    <div class="row"
         v-for='row in gameRow'
         :key='row'>
      <!-- 列 -->
      <div class="col"
           v-for='col in gameCol'
           :key='col'>
        <!-- 小格子 -->
        <Cell :type='map[row-1][col-1]'
              :character='specialChars'></Cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cell from './Cell.vue';
import { gameRow, gameCol } from '../../views/SnakeGame/game/map';
import { defineProps } from 'vue';

defineProps(['map', 'specialChars']);





</script>

<style lang='scss' scoped>
.game-box {
  background: #000;
  opacity: 0.85;
  border: 1px solid #fff;
  .row {
    display: flex;
  }
}
</style>
