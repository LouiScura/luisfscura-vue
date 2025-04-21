<script setup lang="ts">
const props = defineProps({
  satisfiedClients: Number,
  projectsCompleted: Number,
  reviewsGiven: Number
})

// Convert camelCase to Title Case
function formatLabel(str: string): string {
  return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
}

const stats = Object.entries(props).map(([key, value]) => ({
  label: formatLabel(key),
  value
}))

</script>

<template>
    <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="px-20 py-12 border-gray-200 w-full md:w-[33%] md:min-h-52 xl:min-h-full"
        :class="index % 2 === 0 ? 'border' : 'border md:border-r-0 border-l-0 border-y'"
    >
      <p class="text-4xl font-semibold text-secondary">{{ stat.value }}+</p>
      <p class="text-sm uppercase tracking-wide text-primary">{{ stat.label }}</p>
    </div>
</template>
