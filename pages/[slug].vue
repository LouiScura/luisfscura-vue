<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const reserved = ['about', 'services', 'contact', 'blog']

// 🔁 Redirect to static route if slug is reserved
if (reserved.includes(route.params.slug)) {
  await navigateTo(`/${route.params.slug}`, { replace: true })
}

// ✅ Fetch the page from WordPress via GraphQL
const { data: page } = await useFetch(config.public.wordpressUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query GetPage($uri: ID!) {
        pageBy(uri: $uri) {
          title
          content
        }
      }
    `,
    variables: {
      uri: route.params.slug
    }
  }),
  transform(data) {
    const pageData = data.data?.pageBy
    if (!pageData) {
      // ❌ If the slug doesn't exist in WP, throw 404
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
    return pageData
  }
})
</script>

<template>
  <div v-if="page" class="prose mx-auto p-8">
    <h1 v-html="page.title" />
    <div v-html="page.content" />
  </div>
</template>