<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";
import HeaderNavigator from "./components/HeaderNavigator.vue";
import AfterHeaderNavigator from "./components/AfterHeaderNavigator.vue";
const userStore = useUserStore();
</script>

<template>
  <!-- <div class="header-container">
    <HeaderNavigator v-if="!userStore.isLoggedIn"></HeaderNavigator>
    <AfterHeaderNavigator v-else></AfterHeaderNavigator>
  </div> -->
  <RouterView></RouterView>
</template>

<style scoped></style>
