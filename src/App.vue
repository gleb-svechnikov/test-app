<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main{
  margin: 1rem 0;
  display: flex;
  width: 100%;
}
@media (width < 600px) {
  main{
    flex-direction: column;
  }
  nav {
    flex-direction: column;
  }
}
</style>
