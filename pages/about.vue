<script setup lang="ts">
const config = useRuntimeConfig()

const { data: page, pending, error } = await useFetch(config.public.wordpressUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: {
    query: `
      query GetAboutPage {
        pageBy(uri: "about") {
          title
          content
        }
      }
    `
  },
  transform(data: any) {
    return data.data.pageBy
  }
})
</script>

<template>
  <div v-if="page" class="prose mx-auto p-8">
    <h1 v-html="page.title" />
    <div v-html="page.content" />
  </div>
  <div v-else-if="pending">Loading...</div>
  <div v-else-if="error">Something went wrong.</div>
</template>