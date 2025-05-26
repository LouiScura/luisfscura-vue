<script setup lang="ts">
const config = useRuntimeConfig()

const { data: testimonials, pending, error } = await useAsyncData('getTestimonials', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        query: `
          query GetTestimonials {
            testimonials {
              nodes {
                id
                title
                content
                testimonials {
                  websitecompany
                }
              }
            }
          }
        `
      }
    }).then(res => res.data.testimonials.nodes)
)

const items = testimonials.value;
</script>

<template>
  <UCarousel v-slot="{ item }" :items="items"
             :ui="{
              container: 'px-6 gap-5',
              item: 'basis-full md:basis-1/3 p-3 items-center justify-center text-left border mb-5',
              dot: 'bg-primary',
      }" dots :autoplay="{ delay: 2000 }"
        >
    <div class="mb-5">
      <h3 class="text-primary font-semibold text-xl">{{ item.title }}</h3>
      <p class="tex-xs text-paragraph">{{ item.testimonials.websitecompany }}</p>
    </div>
    <p class="text-primary text-sm leading-relaxed" v-html="item.content" />
  </UCarousel>

  <div v-if="pending">Loading...</div>
  <div v-if="error">Failed to load testimonials.</div>
</template>
