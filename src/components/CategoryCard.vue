<template>
  <div class="category">
    <img
      v-if="category.imageUrl"
      :src="category.imageUrl"
      :alt="category.name"
      loading="lazy"
    />
    <h3>{{ category.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import type {  Category } from "@/types";
defineProps<{
  category: Category;
}>();

</script>
<style scoped>
.category{
  display: flex;
  img{
    width: 4rem;
  }
}
</style>