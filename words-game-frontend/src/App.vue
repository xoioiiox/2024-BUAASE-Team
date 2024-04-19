<script setup>
import {  RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header>
      主页仅供测试跳转


      <nav>
        <RouterLink to="/PersonalBook">PersonalBook</RouterLink>
        <RouterLink to="/WordDetail">WordDetail</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

  </header>



  <RouterView />
</template>

<style scoped>


</style>
