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
        :class="[
            'md:text-sm lg:text-base font-medium hover:text-secondary text-white transition-colors duration-300 ease-in-out',
            route.path.startsWith(item.to) ? 'text-red-500 font-bold' : 'text-red'
        ]"
        :target="item.external ? '_blank' : undefined"
    >
      {{ item.label }}
    </NuxtLink>

    <UButton
      to="https://calendly.com/luisfscura/30min"
      target="_blank"
      trailing-icon="bytesize:send"
      size="lg" color="secondary"
      class="text-md w-[75%] font-semibold  max-w-[235px] lg:max-w-[225px] transition-colors duration-300 ease-in-out">
      Book a free call
    </UButton>
  </nav>
</template>
