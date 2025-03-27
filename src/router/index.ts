import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import ItemView from '../views/ItemView.vue'
import CartView from '../views/CartView.vue'
import CategoryView from '../views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list-of-items-and-categories',
      component: ListView,
    },
    {
      path: '/items/:id',
      name: 'item',
      component: ItemView,
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
  ],
})

export default router
