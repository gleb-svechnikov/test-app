<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconCart from '@/components/icons/iconCart.vue';
import { RouterLink, RouterView } from 'vue-router'

import { EcwidService } from '@/services/EcwidService';
import type { CartItem } from "@/types";
import { ref } from 'vue';
const cart = ref<CartItem[]>([]);
cart.value = EcwidService.getStoredCart();
  
</script>

<template>
  <header>
    <RouterLink to="/">
      <IconLogo/>
    </RouterLink>
    <nav>
      <RouterLink to="/">Products and categories</RouterLink>
      <RouterLink to="/cart">
        <IconCart /> Shopping Cart <sup v-if="cart.length > 0">{{cart.length}}</sup>
      </RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>


header {
  height: 5rem;
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: space-between;
  a{
    padding: 1rem;
  }
  nav {
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    a{
      text-underline-position: under;
      sup{
        width: 2rem;
        height: 2rem;
        line-height: 1rem;
        border-radius: 50%;
        padding: 0rem;
        font-size: 1rem;
        text-align: center;
      }
      &.router-link-exact-active {
        color: var(--color-text);
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}
main{
  display: flex;
  width: 100%;
}
@media (width < 600px) {
  main{
    flex-direction: column;
  }
  nav {
    flex-direction: column;
  }
}
</style>
