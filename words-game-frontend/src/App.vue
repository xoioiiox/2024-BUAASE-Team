<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>

  <nav>
    <router-link to="/PunchIn">PunchIn</router-link>
  </nav>
  <nav>
    <router-link to="/WordDetail">WordDetail</router-link>
  </nav>
  <RouterView></RouterView>

</template>

<style scoped></style>
