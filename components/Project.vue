<script setup lang="ts">
const config = useRuntimeConfig()
const props = defineProps<{ limit?: number }>()

const { data: projects, pending, error } = await useAsyncData('getProjects', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        query: `
        query GetProjects {
          projects(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
            nodes {
              id
              title
              content
              slug
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              categories {
                nodes {
                  name
                }
              }
              menuOrder
            }
          }
        }
      `,
      },
    }).then(res => {
      const all = res.data.projects.nodes
      return props.limit ? all.slice(0, props.limit) : all
    })
)
</script>

<template>
  <NuxtLink
      v-for="(project, index) in projects"
      :to="{ name: 'projects', params: { slug: project.uri } }"
      :key="project.id"
      class="p-6 border border-gray-200 w-full md:w-[48%] lg:w-[32%] lg:min-h-[330px] flex flex-col justify-center cursor-pointer gap-5 max-w-[450px]"
  >
    <img
        v-if="project.featuredImage?.node?.sourceUrl"
        :src="project.featuredImage?.node?.sourceUrl"
        :alt="project.featuredImage?.node?.altText || 'Project Image'"
        class="rounded-3xl max-w-[350px] h-[260px] max-h-[260px] object-cover"
    />
    <div class="flex items-center justify-between">
      <h2 class="text-2xl w-10/12 font-semibold text-heading m-0 hover:text-secondary transition-colors duration-300 ease-in-out">
        {{ project.slug }}</h2>
      <div class="bg-pb rounded-2xl p-[15px] inline-block text-center hover:bg-secondary transition-colors duration-300 ease-in-out">
        <img src="/icons/up-arrow-icon.svg" class="w-[15px] block" alt="Upw Arrow Icon"/>
      </div>
    </div>
    <div class="text-primary font-light text-gray-300 m-0 leading-loose hover:text-primary transition-colors duration-300 ease-in-out"
         v-html="project.content ? project.content.slice(0, 125) + '...' : ''"></div>
    <ProjectCategory
        v-if="project.categories?.nodes"
        :categories="project.categories.nodes"/>
  </NuxtLink>
</template>
