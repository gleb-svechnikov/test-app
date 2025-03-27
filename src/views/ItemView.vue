<template>

    <div v-if=" product !== null">
      <div class="">
        <div>
          <img
            :src="product.imageUrl"
            :alt="product.name"
          />
        </div>
        <div>
          <h1>{{ product.name }}</h1>
          <p >${{ product.price.toFixed(2) }}</p>
          <div v-html="product.description"></div>
          <button
            @click="addToCart"
            class=""
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  <div v-if="loading" >
    <progress></progress>
  </div>
  <div v-else>
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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
