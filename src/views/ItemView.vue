<template>

  <div v-if="product !== null" class="item">
    <picture>
      <img :src="product.imageUrl" :alt="product.name" />
    </picture>
    <div class="description">
      <h1>{{ product.name }}</h1>
      <div v-html="product.description"></div>
      <div class="action">
        <div class="price">Price : ${{ product.price.toFixed(2) }}</div>
        <button @click="addToCart" type="button">
          Add to Cart   <IconCart />
        </button>
      </div>
     
    </div>
  </div>
  <div v-if="loading">
    <progress></progress>
  </div>
  <div  v-if="product === null">
    Product not found
  </div>
</template>

<script setup lang="ts">
import IconCart from '@/components/icons/IconCart.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { EcwidService } from '@/services/EcwidService';
import type { Product } from "@/types";

const route = useRoute();
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const fetchProduct = async () => {
  try {
    product.value = await EcwidService.getProduct(Number(route.params.id));
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  EcwidService.addToCart(Number(route.params.id))
};

onMounted(fetchProduct);
</script>

<style>

.item{
  padding: 1rem;
  display: flex;
  gap: 2rem;
  picture{
    img{
      max-height: calc(100vh - 8rem);
    }
  }
  .description{
    max-width: var(--max-readable-text);
    font-size: 1.25rem;
    line-height: 1.8;
    p{
      margin: 1rem 0;
    }
    .action{
      font-size: 2rem;
      display: flex;
      gap: var(--space-gap);
      justify-content: space-between;
      button{
        font-size: 2rem;
        svg{
          padding: 0.5rem;
        }
      }
    }
  }
}
@media (width < 1024px) {
  .item{
    flex-direction: column;
    display: flex;
    img{
      max-width: 100%;
    }
  }
}
</style>
