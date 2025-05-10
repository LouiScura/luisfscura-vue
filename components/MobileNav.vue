<script setup>
const props = defineProps({
  mobileMenu: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const menu = useMainMenu()
const route = useRoute()

// 👇 Watch for route changes and emit a close event
watch(() => route.fullPath, () => {
  if (props.mobileMenu) {
    emit('close')
  }
})
</script>

<template>
  <Transition
      enter-from-class="translate-x-full opacity-0"
      leave-to-class="translate-x-full opacity-0"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
  >
    <nav
        v-if="mobileMenu"
        class="w-full h-full my-4 z-50 bg-custom-black flex flex-col justify-center text-sm text-white font-thin"
    >
      <NuxtLink
          v-for="item in menu"
          :key="item.to"
          :to="!item.external ? item.to : undefined"
          :href="item.external ? item.to : undefined"
          :target="item.external ? '_blank' : undefined"
          class="border-b border-custom-border px-6 py-4 transition-colors duration-300 ease-in-out"
          :class="{ 'text-custom-orange': route.path === item.to }"
      >
        {{ item.label }}
      </NuxtLink>


      <UButton
        to="#contact"
        trailing-icon="icon-park-solid:calendar"
        size="lg" color="secondary"
        class="mt-6 text-md w-[75%] max-w-[175px]  text-center transition-colors duration-300 ease-in-out">
        Book a free call
      </UButton>
    </nav>
  </Transition>
</template>
