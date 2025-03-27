<template>
  <div class="product-card">
    <img
      :src="product.imageUrl"
      :alt="product.name"
      @click="navigateToProduct"
    />
    <h3>{{ product.name }}</h3>
    <p>${{ product.price.toFixed(2) }}</p>
    <button
      @click="$emit('add-to-cart', product)"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Product } from "@/types";

const props = defineProps<{
  product: Product
}>();

// const emit = defineEmits<{
//   (e: 'add-to-cart', product: Product): void
// }>();

const router = useRouter();

const navigateToProduct = () => {
  router.push({
    name: 'item-details',
    params: { id: props.product.id.toString() },
  });
};
</script>

<style scoped>
.product-card {
  img {
    max-width: 300px;
  }
}
</style>