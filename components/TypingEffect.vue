<script setup>
const words = ['Partner', 'Consultant', 'Expert', 'Specialist']
const displayText = ref('')
let wordIndex = 0
let charIndex = 0
let isDeleting = false

const type = () => {
  const word = words[wordIndex]

  if (isDeleting) {
    displayText.value = word.substring(0, --charIndex)
  } else {
    displayText.value = word.substring(0, ++charIndex)
  }

  let delay = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === word.length) {
    delay = 4000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    wordIndex = (wordIndex + 1) % words.length
    delay = 1000
  }

  setTimeout(type, delay)
}

onMounted(() => type())
</script>

<template>
  <span class="text-hero-gradiant">{{ displayText }}<span class="cursor">|</span></span>
</template>

<style scoped>
.cursor {
  display: inline-block;
  width: 1px;
  background: currentColor;
  margin-left: 2px;
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>
