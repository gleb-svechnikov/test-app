<template>
  <div @click="navigateToCategory" class="category">
    <img
      v-if="category.imageUrl"
      :src="category.imageUrl"
      :alt="category.name"
    />
    <h3>{{ category.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type {  Category } from "@/types";

const props = defineProps<{
  category: Category;
}>();

const router = useRouter();

const navigateToCategory = () => {
  router.push({
    name: 'category',
    params: { id: props.category.id.toString() },
  });
};
</script>
<style scoped>
.category{
  display: flex;
  img{
    width: 4rem;
  }
}
</style>