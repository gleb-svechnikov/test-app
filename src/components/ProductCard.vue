<template>
  <div class="product-card">
    <img :src="product.thumbnailUrl" :alt="product.name" loading="lazy" />
    <div class="description">
      <h3>{{ product.name }}</h3>
      <div class="action">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <button type="button" @click="addToCart">
          {{ isInCart ? 'Added' : 'Add to cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from "@/types";
import { EcwidService, cartRef } from '@/services/EcwidService';

const props = defineProps<{
  product: Product
}>();

const isInCart = computed(() => {
  return cartRef.value.some(item => item.product.id === Number(props.product.id));
});

const addToCart = (event: Event) => {
  event.preventDefault();
  EcwidService.addToCart(Number(props.product.id))
};
</script>

<style scoped>
.product-card {
  position: relative;
  img {
    max-width: var(--thumb-width);
  }
  .description{
    display: flex;
    flex-direction: column;
    gap: var(--space-gap);
    h3{
      text-decoration: none;
    }
    .action{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-gap);
      .price{
        font-size: 1.25rem;
      }
      button{
        z-index: 1;
        white-space: nowrap;
        font-size: 1.25rem;
      }
    }
  }
}
@media (width < 1024px){
  .product-card {
    text-align: center;
    .description{
      padding: 0rem 2rem 4rem 2rem;
      font-size: 1.25rem;
      text-underline-position: unset;
      button{
        padding: 1rem 2rem;
      }
    }
  }
}
@media (hover: hover) {
  .product-card {
   
    .description {
      display: none;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
      border-bottom: 0.5rem solid transparent;
    }

    &:hover {
      .description {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        z-index: 1;
        width: 100%;
        transition: all 0.3s ease;
        position: absolute;
        bottom: 0.25rem;
        left: 0;
        right: 0;
        background: rgba(225,225,225,0.9);
        transition: bottom 0.3s ease;
        box-sizing: border-box;
        border-bottom: 0.5rem solid var(--product-green);
      }
    }
  }

}
</style>