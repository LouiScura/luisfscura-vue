<script setup lang="ts">
const { data: services, pending, error } = useServices({ limit: 4 })
</script>

<template>
  <div
      v-for="(service, index) in services"
      :key="service.id"
      class="px-4 py-6 group border border-gray-200 w-full md:w-[32%] xl:w-[24%] lg:min-h-[330px]
        flex flex-col justify-center hover:bg-primary transition-colors duration-300 ease-in-out"
  >
    <span class="block text-[#ADAFB0] text-xs font-medium">/ {{ service.menuOrder }}</span>
    <div class="group">
      <div v-html="service.node?.icon" />
    </div>
    <h2 class="text-2xl text-[#555558] group-hover:text-white font-bold my-2 transition-colors duration-300 ease-in-out">{{ service.title }}</h2>
    <div class="text-normal text-[#555558] group-hover:text-white transition-colors duration-300 ease-in-out" v-html="service.content"></div>
  </div>
</template>
