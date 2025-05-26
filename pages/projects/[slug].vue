<script setup lang="ts">
import { watch } from 'vue'
import LiveExampleIcon from '~/components/LiveExampleIcon.vue'

const route = useRoute()
const config = useRuntimeConfig()

const { pending, data: project, error } = await useFetch(config.public.wordpressUrl, {
  key: () => `project-${route.params.slug}`, // handles route change
  server: true,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: {
    query: `
      query GetSingleProject($slug: ID!) {
        project(id: $slug, idType: SLUG) {
          title
          slug
          content
          excerpt
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
          projects {
            liveLink
            launchedDate
          }
        }
      }
    `,
    variables: {
      slug: route.params.slug,
    },
  },
  transform: res => res.data?.project ?? null,
})

watch(project, (val) => {
  console.log(val.projects)
})

</script>

<template>
  <div v-if="project" :class="project.slug">
    <div class="bg-primary py-8">
      <div class="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1 flex-col bg-primary h-full leading-loose align-start justify-between mt-5 mb-10">
          <div>
              <section class="w-11/12 lg:w-10/12 mx-auto">
                <h1
                  class="text-white text-center text-4xl md:text-5xl lg:text-7xl lg:!leading-[80px] font-bold"
                  v-html="project.title" />
                <div class="text-white/60 text-base leading-relaxed lg:leading-loose my-5 text-center" v-if="!pending && project.excerpt" v-html="project.excerpt"></div>
                <ProjectCategory
                  class="justify-center"
                  v-if="project.categories?.nodes"
                  :categories="project.categories.nodes"/>
              </section>
            </div>
        </div>
        </div>
    </div>
    <div class="max-w-7xl my-10 mx-auto px-4 sm:px-6 lg:px-8 ">
<!--      <img-->
<!--        v-if="project.featuredImage?.node?.sourceUrl"-->
<!--        :src="project.featuredImage?.node?.sourceUrl"-->
<!--        :alt="project.featuredImage?.node?.altText || 'Project Image'"-->
<!--        class="rounded-xl w-full object-cover max-h-[700px] object-top"-->
<!--      />-->
    </div>
    <div class="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row align-start gap-5 justify-between mt-5 mb-10">
        <div class="w-10/12">
          <p class="text-primary" v-if="!pending" v-html="project.content"></p>
        </div>
        <aside class="bg-[#F6F2EF] flex flex-col gap-y-5 leading-loose p-10">
            <div class="flex items-center gap-5 justify-center border border-[#E7E7E7] p-3 max-w-md" v-if="project.projects.liveLink">
                <div class="w-[32px]">
                  <LiveExampleIcon/>
                </div>
                <div class="flex-1">
                  <a
                    :href="project.projects.liveLink"
                    class="text-primary font-bold hover:text-secondary transition-colors duration-300 ease-in-out"
                    target="_blank"
                  >
                    {{ project.projects.liveLink }}
                  </a>
                  <span class="block text-sm text-[#A2B0B3]">Live Link</span>
                </div>
            </div>
            <div class="flex items-center gap-5 justify-center border border-[#E7E7E7] p-3 max-w-md"  v-if="project.projects.launchedDate">
              <div class="w-[32px]">
                <LocationIcon/>
              </div>
              <div class="flex-1">
                <a
                  :href="project.projects.launchedDate"
                  class="text-primary font-bold hover:text-secondary transition-colors duration-300 ease-in-out"
                  target="_blank"
                >
                  {{ project.projects.launchedDate }}
                </a>
                <span class="block text-sm text-[#A2B0B3]">Project Duration</span>
              </div>
            </div>
        </aside>
      </div>
    </div>
  </div>

  <div v-else-if="pending">
    Loading...
  </div>

  <div v-else-if="error">
    <p>Error loading project</p>
  </div>
</template>
