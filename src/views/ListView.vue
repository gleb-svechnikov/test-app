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
  gap: var(--space-gap);

  .categories {
    min-width: var(--catergory-min-width);
    h2{
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: var(--space-gap);

      li {
        list-style: none;
        padding: 0;
      }
    }
  }

  .products {
    h2{
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-gap);

      li {
        list-style: none;
        padding: 0;
      }
    }
  }
}



@media (width < 1024px) {
  .categories  {
    margin: 0 1rem 3rem 1rem;
    ul{
     
      flex-direction: row !important;
      li{
        display: inline-flex;
        h3{
          display: inline-flex;
        } 
       }
    }
   
  }
  .products {
    margin: 0 1rem;
    flex-direction: column;
    ul{
      li {
        width: 100%;
      }
    }
  }
}
</style>
