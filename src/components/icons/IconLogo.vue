<template>
  <svg
    version="1.1"
    id="vue-logo"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 600 400"
    enable-background="new 0 0 600 400"
    xml:space="preserve"
    class="logo"
  >
    <path
      fill="#42b883"
      d="M300,0L0,100l150,100L300,100L450,100L600,0L300,0z"
    />
    <path
      fill="#35495e"
      d="M0,100l150,100l150-100L300,100l150,100l150-100L600,100L300,200L0,100z"
    />
    <path
      fill="#41b883"
      d="M0,200l150,100l150-100L300,200l150,100l150-100L600,200L300,300L0,200z"
    />
  </svg>
</template>

<style scoped>
#vue-logo {
  width: 60px;
  height: 60px;
  transition: transform 0.9s ease;
}

#vue-logo:hover {
  transform: rotate(360deg);
}
</style>
