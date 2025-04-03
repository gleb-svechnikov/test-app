<template>
  <section>
    <div class="categories">
      <h2>Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <RouterLink :to="`/categories/${category.id}`">
            <CategoryCard :category="category" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section>
    <div class="products">
      <h2>Products</h2>
      <ul class="products-list">
        <li v-for="product in products" :key="product.id">
          <RouterLink :to="`/items/${product.id}`">
            <ProductCard :product="product" @add-to-cart="addToCart" />
          </RouterLink>
        </li>
      </ul>
    </div>
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


onMounted(fetchData);
</script>

<style>
section {
  display: flex;
  gap: 1rem;

  .categories {
    min-width: 40ch;
    ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: 1rem;

      li {
        list-style: none;
        padding: 0;
        flex: 1 1 300px;
        max-width: calc(33.333% - 1rem);
        /* 3 items per row */
      }
    }
  }

  .products {
    ul {
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
  }
}


@media (max-width: 768px) {

  ul.categories-list li,
  ul.products-list li {
    max-width: calc(50% - 1rem);
  }
}

@media (width < 1224px) {
  ul.products-list {
    flex-direction: column;
    margin: auto;

    li {
      max-width: unset;
    }
  }
}
</style>
