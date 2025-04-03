<template>
  <div class="product-card">
    <img :src="product.thumbnailUrl" :alt="product.name" loading="lazy" />
    <div class="description">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price.toFixed(2) }}</p>
      <button type="button" @click="addToCart">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types";
import { EcwidService } from '@/services/EcwidService';
const props = defineProps<{
  product: Product
}>();
const addToCart = (event: any) => {
  event.preventDefault()
  EcwidService.addToCart(Number(props.product.id))
};
</script>

<style scoped>
.product-card {
  position: relative;

  img {
    max-width: 267px;
  }
}

@media (hover: hover) {
  .product-card {
    .description {
      display: none;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
    }

    &:hover {

      .description {
        z-index: 1;
        width: 100%;
        transition: all 0.3s ease;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: Canvas;
        transition: bottom 0.3s ease;
      }
    }
  }

}
</style>