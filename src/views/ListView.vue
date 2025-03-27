<template>
  <section>
    <h2>Categories</h2>
    <ul class="categories-list">
      <li v-for="category in categories" :key="category.id">
        <RouterLink :to="`/categories/${category.id}`">
          <CategoryCard :category="category" @update-image="handleImageUpdate" />
        </RouterLink>
      </li>
    </ul>
  </section>

  <section>
    <h2>Products</h2>
    <ul class="products-list">
      <li v-for="product in products" :key="product.id">
        <RouterLink :to="`/items/${product.id}`">
          <ProductCard :product="product" @add-to-cart="addToCart" />
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EcwidService } from '@/services/EcwidService';
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import type { Product, Category } from "@/types";


const categories = ref<Category[]>([]);
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>();

const fetchData = async () => {
  try {
    const [categoriesData, productsData] = await Promise.all([
      EcwidService.getCategories(),
      EcwidService.getProducts(),
    ]);
    categories.value = categoriesData;
    products.value = productsData;
  } catch (e) {
    error.value = e as Error;
  } finally {
    loading.value = false;
  }
};

const addToCart = (product: Product) => {
  emit('add-to-cart', product);
};

const handleImageUpdate = async (categoryId: number, imageUrl: string) => {
  try {
    await EcwidService.updateCategoryImage(categoryId, imageUrl);
    // Refresh categories list if needed
    await fetchData();
  } catch (error) {
    console.error('Failed to update category image:', error);
    // Handle error (show message to user, etc.)
  }
};

onMounted(fetchData);
</script>

<style>
ul.categories-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    list-style: none;
    padding: 0;
    flex: 1 1 300px;
    max-width: calc(33.333% - 1rem);
    /* 3 items per row */
  }
}

ul.products-list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    list-style: none;
    padding: 0;
    flex: 1 1 300px;
    max-width: calc(25% - 1rem);
    /* 4 items per row */
  }
}

@media (max-width: 768px) {

  ul.categories-list li,
  ul.products-list li {
    max-width: calc(50% - 1rem);
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
