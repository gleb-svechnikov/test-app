<template>
    <header>
        <RouterLink to="/">
          <IconLogo/>
        </RouterLink>
        <Menu :cart="cartRef" class="desktop-nav" />
        <button class="burger-menu" popovertarget="mobile-nav" aria-label="Menu">
          <IconBurger/>
        </button>
        <div id="mobile-nav" popover="auto" class="mobile-nav">
          <Menu :cart="cartRef" :isMobile="true" @linkClick="closePopover" />
        </div>
      </header>
</template>
<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconBurger from '@/components/icons/IconBurger.vue';
import Menu from '@/components/Menu.vue';
import { RouterLink } from 'vue-router'
import { EcwidService, cartRef } from '@/services/EcwidService';
import { ref } from 'vue';

const closePopover = () => {
  document.getElementById('mobile-nav')?.hidePopover?.();
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
}

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

.mobile-nav {
  width: 100%;
  top: 4rem;
  background: Canvas;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

@media (width < 1024px) {
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
  
  #mobile-nav[popover] {
    display: none;
  }
}
</style>