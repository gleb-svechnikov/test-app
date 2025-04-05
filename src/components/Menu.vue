<template>
  <nav :class="navClass">
    <RouterLink to="/" @click="handleLinkClick">Products and categories</RouterLink>
    <RouterLink to="/cart" @click="handleLinkClick">
      Shopping cart <sup v-if="cart.length > 0">{{ cart.length }}</sup>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { CartItem } from "@/types";

const props = defineProps<{
  cart: Readonly<CartItem[]>;
  isMobile?: boolean;
}>();

const emit = defineEmits(['linkClick']);

const navClass = computed(() => (props.isMobile ? 'mobile-links' : 'desktop-links'));

const handleLinkClick = () => {
  if (props.isMobile) {
    emit('linkClick');
  }
};
</script>

<style scoped>
nav {
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  gap: var(--space-gap);
}

nav a {
  padding: 1rem;
  text-underline-position: under;
}

nav a sup {
  width: 2rem;
  height: 2rem;
  line-height: 1rem;
  border-radius: 50%;
  padding: 0rem;
  font-size: 1rem;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/* Specific styles for mobile if needed */
.mobile-links {
  flex-direction: column;
  width: 100%;
}
</style> 