<script setup>
import LuisLogo from "~/components/LuisLogo.vue";

const mobileMenu = ref(false)
</script>

<template>
  <header class="w-full bg-primary sticky top-0 z-20 py-3 md:py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between h-full py-5 flex flex-wrap" data-aos="fade-down">
      <NuxtLink to="/" class="pointer
        lg:flex-1  items-center gap-1.5 hover:text-lightSecondary transition-colors duration-300 ease-in-out inline-block max-w-[200px]">
          <LuisLogo class="w-full"/>
      </NuxtLink>
      <MainNav class="flex items-center"/>
      <!-- Mobile toggle -->
      <div @click="mobileMenu = !mobileMenu" class="cursor-pointer md:hidden">
        <span class="block h-0.5 w-6 bg-pb transition ease transform duration-300" :class="{'-rotate-45 translate-y-2' : mobileMenu}"></span>
        <span class="block mt-1 h-0.5 w-6 bg-pb transition ease transform duration-300" :class="{'rotate-45 translate-y-0.5' : mobileMenu}"></span>
      </div>

      <MobileNav :mobileMenu="mobileMenu" @close="mobileMenu=false" />
    </div>
  </header>
</template>
