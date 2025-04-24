<template>
  <div>
    <h1>Project Page</h1>
    <p>Slug: {{ route.params.slug }}</p>
  </div>
</template>

<script setup>
const route = useRoute()
</script>
