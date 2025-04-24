<script setup lang="ts">
const config = useRuntimeConfig()
const props = defineProps<{ limit?: number }>()

const { data: services, pending, error } = await useAsyncData('getServices', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        query: `
        query GetServices {
          services(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
            nodes {
              id
              title
              content
              menuOrder
              services {
                icon {
                  node {
                    id
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
        }
      `,
      },
    }).then(res => {
      const all = res.data.services.nodes
      return props.limit ? all.slice(0, props.limit) : all
    })
)
</script>

<template>
  <div
      v-for="(service, index) in services"
      :key="service.id"
      class="px-4 py-6 border border-gray-200 w-full md:w-[32%] xl:w-[24%] lg:min-h-[330px] flex flex-col justify-center hover:bg-primary transition-colors duration-300 ease-in-out"
  >
    <span class="block text-[#ADAFB0] text-xs">/ {{ service.menuOrder }}</span>
    <img
        v-if="service.services?.icon?.node?.sourceUrl"
        :src="service.services.icon.node.sourceUrl"
        :alt="service.services.icon.node.altText || 'Service icon'"
        class="max-w-[48px]"
    />
    <h2 class="text-2xl font-semibold text-heading my-2 hover:text-white">{{ service.title }}</h2>
    <div class="text-normal font-light text-gray-300 hover:text-white" v-html="service.content"></div>
  </div>
</template>
