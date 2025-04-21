<script setup lang="ts">
const config = useRuntimeConfig()

const { data: services, pending, error } = useAsyncData('getServices', () =>
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
    }).then((res: any) => res.data.services.nodes)
)
</script>

<template>
  <div v-if="pending">Loading...</div>
  <div v-else-if="error">An error occurred: {{ error.message }}</div>
  <div
      v-for="(service, index) in services"
      v-else
      :key="service.id"
      class="px-4 py-12 border border-gray-200 w-full md:w-[32%] xl:w-[24%] min-h-80 flex flex-col justify-center"
  >
    <span class="block text-[#ADAFB0] text-xs">/ {{ service.menuOrder }}</span>
    <img
        v-if="service.services?.icon?.node?.sourceUrl"
        :src="service.services.icon.node.sourceUrl"
        :alt="service.services.icon.node.altText || 'Service icon'"
        class="max-w-[48px]"
    />
    <h2 class="text-2xl font-semibold text-heading my-2">{{ service.title }}</h2>
    <div class="text-normal font-light text-gray-300" v-html="service.content"></div>
  </div>
</template>
