<template>

  <div v-if="product !== null" class="item">
    <picture>
      <img :src="product.imageUrl" :alt="product.name" />
    </picture>
    <div class="description">
      <h1>{{ product.name }}</h1>
      <div v-html="product.description"></div>
      <div class="price">Price : ${{ product.price.toFixed(2) }}</div>
      <button @click="addToCart" class="">
        Add to Cart
      </button>
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
.price{

}
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
    max-width: 80ch;
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
