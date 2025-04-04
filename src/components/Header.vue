<template>
    <header>
        <RouterLink to="/">
          <IconLogo/>
        </RouterLink>
        <nav class="desktop-nav">
          <RouterLink to="/">Products and categories</RouterLink>
          <RouterLink to="/cart">
           Shopping Cart <sup v-if="cart.length > 0">{{cart.length}}</sup>
          </RouterLink>
        </nav>
        <button class="burger-menu" popovertarget="mobile-nav" aria-label="Menu">
          <IconBurger/>
        </button>
        <div id="mobile-nav" popover="auto" class="mobile-nav">
          <nav>
            <RouterLink to="/" @click="closePopover">Products and categories</RouterLink>
            <RouterLink to="/cart" @click="closePopover">
             Shopping Cart <sup v-if="cart.length > 0">{{cart.length}}</sup>
            </RouterLink>
          </nav>
        </div>
      </header>
</template>
<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconBurger from '@/components/icons/IconBurger.vue';

import { RouterLink } from 'vue-router'

import { EcwidService } from '@/services/EcwidService';
import type { CartItem } from "@/types";
import { ref } from 'vue';

const cart = ref<CartItem[]>([]);
cart.value = EcwidService.getStoredCart();

const closePopover = () => {
  document.getElementById('mobile-nav')?.hidePopover();
};
</script>

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
    font-size: 1.5rem;
    text-align: center;
    display: flex;
    gap: var(--space-gap);
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

/* Burger menu styling */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  align-self: center;
  margin-right: 1rem;
  svg{
    width: 2rem;
    height: 2rem;
    color: var(--color-text);
  }
}



/* Mobile navigation popover */
.mobile-nav {
  width: 100%;
  top: 4rem;
  background: Canvas;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.mobile-nav nav {
  flex-direction: column;
  width: 100%;
}

/* Desktop/mobile visibility */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .burger-menu {
    display: flex;
  }
}

@media (min-width: 769px) {
  .burger-menu {
    display: none;
  }
  
  /* Hide the popover button on desktop */
  #mobile-nav[popover] {
    display: none;
  }
}
</style>