<script setup lang="ts">
const { data: featuredProjects } = useProjects({ categorySlug: 'featured' })
</script>

<template>
  <NuxtLink
    v-for="(project, index) in featuredProjects"
    :to="`/projects/${project.slug}`"
    :key="project.id"
    class="p-6 border border-gray-200 w-full md:w-[49%] lg:min-h-[330px]
      flex flex-col cursor-pointer gap-5"
  >
    <img
      v-if="project.featuredImage?.node?.sourceUrl"
      :src="project.featuredImage?.node?.sourceUrl"
      :alt="project.featuredImage?.node?.altText || 'Project Image'"
      class="rounded-3xl w-full h-[260px] max-h-[260px] object-cover"
    />
    <div class="flex justify-between">
      <h2 class="text-2xl w-10/12 font-semibold text-left text-heading m-0 hover:text-secondary transition-colors duration-300 ease-in-out">
        {{ project.title }}
      </h2>
      <div class="bg-pb rounded-2xl p-[15px] inline-block text-center hover:bg-secondary transition-colors duration-300 ease-in-out">
        <img src="/icons/up-arrow-icon.svg" class="w-[15px] block" alt="Upw Arrow Icon"/>
      </div>
    </div>
    <div class="text-primary font-thin m-0 leading-loose hover:text-primary transition-colors duration-300 ease-in-out text-left"
         v-html="project.content ? project.content.slice(0, 90) + '...' : ''"></div>
  </NuxtLink>
</template>
