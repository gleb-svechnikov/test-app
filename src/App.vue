<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">
      <IconLogo/>
    </RouterLink>
    <nav>
      <RouterLink to="/">Products and categories list</RouterLink>
      <RouterLink to="/cart">Shopping Cart</RouterLink>
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
    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
      &.router-link-exact-active {
        color: var(--color-text);
        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}

</style>
