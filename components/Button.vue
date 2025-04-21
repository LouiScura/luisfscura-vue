<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'bg-pb',
  },
  hover: {
    type: String,
    default: 'hover:bg-sb',
  },
  textColor: {
    type: String,
    default: 'text-[#2D3436]',
  },
  href: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '/icons/up-arrow-icon.svg'
  },
})
</script>

<template>
    <div class="relative flex rounded-lg font-bold transition-colors duration-300 ease-in-out px-5 cursor-pointer"
         :class="[color, hover, textColor]">
      <NuxtLink
          :is="href ? 'a' : 'button'"
          :href="href || undefined"
      >
        {{ text }}
      </NuxtLink>
      <img :src="src" class="max-w-[15px] h-full" alt="Arrow"/>
    </div>
</template>