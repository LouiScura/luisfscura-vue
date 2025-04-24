<script setup lang="ts">
  defineProps({
    categories: {
      type: Array,
      required: true
    }
  })
</script>

<template>
  <div
      class="flex gap-2 flex-wrap">
    <div
        v-for="(category, index) in categories"
        :key="index"
        class="bg-[#E6F2EE] px-3 py-2 text-center leading-2 flex items-center text-sm text-primary rounded-full font-medium"
    >
      {{ category.name }}
    </div>
  </div>
</template>
