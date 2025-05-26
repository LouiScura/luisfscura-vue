<script setup lang="ts">
const props = defineProps<{ faq: string | null }>()

const faqJson = computed(() => {
  try {
    return JSON.parse(props.faq ?? '[]')
  } catch (e) {
    console.error('Failed to parse FAQ JSON:', e)
    return []
  }
})

const items = computed<AccordionItem[]>(() =>
  Array.isArray(faqJson.value)
    ? faqJson.value.map((item: any) => ({
      label: item.question,
      content: item.answer,
      icon: 'i-lucide-help-circle',
      trailingIcon: 'i-lucide-plus',
    }))
    : []
)

const active = ref([])

</script>

<template>
  <UAccordion
    v-if="items.length"
    v-model="active"
    :items="items"
    trailing-icon="i-lucide-arrow-down"
    data-aos="fade-right"
  />
</template>
