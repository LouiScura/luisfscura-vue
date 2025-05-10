<script setup lang="ts">

const config = useRuntimeConfig()

const isHovered = ref(false)

const { data: page, pending, error } = await useAsyncData('servicesPage', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        query: `
        query {
          pageBy(uri: "services") {
            title
            content
            servicesPage {
              testimonialHero
              faqSection
            }
          }
        }
      `
      }
    }).then(res => res.data.pageBy)
)
</script>
<template>
    <div>
      <div v-if="page" class="w-full">
        <div class="bg-primary py-8">
          <div class="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
            <div class="flex flex-1 flex-col bg-primary h-full leading-loose align-start justify-between mt-5 mb-10">
              <div>
                <section class="w-11/12 lg:w-10/12">
                  <h1
                      class="text-white text-4xl md:text-5xl lg:text-7xl lg:!leading-[80px] font-bold my-4 md:my-1"
                      v-html="page.title" />
                  <div class="text-white/60 text-base leading-relaxed lg:leading-loose my-5" v-html="page.content"></div>
                </section>
                <section class="flex justify-between">
                  <div class="flex flex-col md:flex-row justify-between gap-10 md:items-start w-10/12 max-w-6xl">
                    <div class="flex flex-col flex-1 gap-5 lg:flex-row">
                      <UButton
                        to="https://calendly.com/luisfscura/30min"
                        target="_blank"
                        trailing-icon="icon-park-solid:calendar"
                        size="lg" color="pb"
                        class="text-md w-[75%] max-w-[245px] lg:max-w-[225px] transition-colors duration-300 ease-in-out">
                        Book a Consultation
                      </UButton>
                    </div>
                    <div v-if="page.servicesPage?.testimonialHero" class="md:w-5/12"
                         @mouseenter="isHovered = true"
                         @mouseleave="isHovered = false">
                      <p class="text-white text-base leading-[25px]">{{ page.servicesPage.testimonialHero }}</p>
                      <UBadge icon="i-lucide-rocket"
                              size="lg"
                              color="yellowish" variant="solid" class="font-semibold p-3 mt-5 animate-pulse rounded-full">Available for freelance work</UBadge>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <section class="flex flex-col flex-wrap md:flex-row max-w-7xl mx-auto text-left items-start my-20 justify-between gap-y-5 px-6 md:px-8">
          <div class="w-full mb-20">
            <h2 class="text-heading text-4xl md:text-5xl font-semibold text-left w-full md:w-4/12">Solutions for your Industry</h2>
          </div>
          <Services/>
          <div class="w-full mb-20">
            <h2 class="text-heading text-4xl md:text-5xl font-semibold text-left w-full md:w-4/12">Website Development</h2>
          </div>
        </section>
      </div>
      <div v-else-if="pending">Loading...</div>
      <div v-else>An error occurred: {{ error.message }}</div>
    </div>
</template>
