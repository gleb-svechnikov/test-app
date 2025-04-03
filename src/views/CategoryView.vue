<template>
    <section>
        <div class="categories"  v-if="category && !loading">
          <h2>Categories</h2>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <RouterLink :to="`/categories/${category.id}`">
                <CategoryCard :category="category"/>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div v-else-if="loading">
            <progress></progress>
        </div>
        <div v-else>
            Category not found
        </div>
      </section>
      <section>
        <div class="products" v-if="category && !loading">
          <h2>Products from {{ category.name }}</h2>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { EcwidService } from '@/services/EcwidService';
import type { Category, Product } from "@/types";
import ProductCard from '@/components/ProductCard.vue';
import CategoryCard from '@/components/CategoryCard.vue';
const categories = ref<Category[]>([]);
const route = useRoute();
const category = ref<Category | null>(null);
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);
const fetchCategoryData = async () => {
    try {
        const categoryId = Number(route.params.id);
        const [categoriesData, categoryData, productsData] = await Promise.all([
            EcwidService.getCategories(),
            EcwidService.getCategory(categoryId),
            EcwidService.getProducts(categoryId)
        ]);
        
        categories.value = categoriesData;
        category.value = categoryData;
        products.value = productsData;
    } catch (e) {
        error.value = e as Error;
    } finally {
        loading.value = false;
    }
};

watch(() => route.params.id, () => {
    loading.value = true;
    fetchCategoryData();
});

const addToCart = async (product: Product) => {
    await EcwidService.addToCart(product.id);
};

onMounted(fetchCategoryData);
</script>

<style scoped>
.category-view {
    padding: 20px;
}

.category-header {
    margin-bottom: 30px;
}

.category-header img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
}

.products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 0;
    list-style: none;

}


@media (max-width: 768px) {
    .products-list li {
        max-width: calc(50% - 10px);
    }
}
</style>
