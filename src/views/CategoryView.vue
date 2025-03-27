<template>
    <div v-if="category && !loading" class="category-view">
        <div class="category-header">
            <h1>{{ category.name }}</h1>
            <div v-if="category.description" v-html="category.description"></div>
            <img v-if="category.imageUrl" :src="category.imageUrl" :alt="category.name" />
        </div>

        <div class="products-section">
            <h2>Products</h2>
            <ul class="products-list">
                <li v-for="product in products" :key="product.id">
                    <RouterLink :to="`/items/${product.id}`">
                        <ProductCard :product="product" @add-to-cart="addToCart" />
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>

    <div v-else-if="loading">
        <progress></progress>
    </div>
    <div v-else>
        Category not found
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { EcwidService } from '@/services/EcwidService';
import type { Category, Product } from "@/types";
import ProductCard from '@/components/ProductCard.vue';

const route = useRoute();
const category = ref<Category | null>(null);
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<Error | null>(null);

const fetchCategoryData = async () => {
    try {
        const categoryId = Number(route.params.id);
        const [categoryData, productsData] = await Promise.all([
            EcwidService.getCategory(categoryId),
            EcwidService.getProducts(categoryId)
        ]);

        category.value = categoryData;
        products.value = productsData;
    } catch (e) {
        error.value = e as Error;
    } finally {
        loading.value = false;
    }
};

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
