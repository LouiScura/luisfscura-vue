<script setup>
const menu = useMainMenu()
const route = useRoute()
</script>

<template>
  <nav class="hidden md:flex md:gap-8 lg:gap-10">
    <NuxtLink
        v-for="item in menu"
        :key="item.to"
        :to="!item.external ? item.to : undefined"
        :href="item.external ? item.to : undefined"
        class="md:text-sm lg:text-base font-light hover:text-secondary text-white transition-colors duration-300 ease-in-out"
        :target="item.external ? '_blank' : undefined"
        :class="{ 'text-primary': route.path === item.to }"
        activeClass="text-red-500"
    >
      {{ item.label }}
    </NuxtLink>
    <NuxtLink to="/#contact"
              class="bg-secondary md:px-3 lg:px-5 py-3 text-[#2D3436] font-bold border-r-secondary rounded-lg hover:bg-lightSecondary transition-colors duration-300 ease-in-out">
      Let's Connect
    </NuxtLink>
  </nav>
</template>