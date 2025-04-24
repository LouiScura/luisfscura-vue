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
                      class="text-white text-4xl md:text-5xl lg:text-7xl lg:!leading-[80px] font-semibold my-4 md:my-1"
                      v-html="page.title" />
                  <div class="text-white/60 text-base leading-relaxed lg:leading-loose my-5" v-html="page.content"></div>
                </section>
                <section class="flex justify-between">
                  <div class="flex flex-col md:flex-row justify-between gap-10 md:items-start w-10/12 max-w-6xl">
                    <div class="flex flex-col flex-1 gap-5 lg:flex-row">
                      <Button
                          text="Book Consultation"
                          href="/#contact"
                          class="w-[75%] justify-between py-2 max-w-[245px] lg:max-w-[225px]"
                      />
                    </div>
                    <div v-if="page.servicesPage?.testimonialHero" class="md:w-5/12"
                         @mouseenter="isHovered = true"
                         @mouseleave="isHovered = false">
                      <p class="text-white text-base leading-[25px]">{{ page.servicesPage.testimonialHero }}</p>
                      <div class="bg-yellowish p-3 inline-flex items-center gap-3 justify-center rounded-full font-medium my-5 cursor-pointer">
                        <div class="relative w-6 h-6 shrink-0">
                          <img
                              src="/icons/freelance-icon.svg"
                              alt="Freelance icon"
                              class="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
                              :class="{ 'opacity-0': isHovered, 'opacity-100': !isHovered }"
                          />
                          <img
                              src="/icons/sd-freelance-icon.svg"
                              alt="Freelance hover icon"
                              class="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
                              :class="{ 'opacity-100': isHovered, 'opacity-0': !isHovered }"
                          />
                        </div>
                        <span class="block text-heading text-sm animate-pulse">Available for freelance work</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <section class="flex flex-col flex-wrap md:flex-row max-w-7xl mx-auto text-left items-start my-20 justify-between gap-y-5 px-6 md:px-8">
          <Services/>
        </section>
      </div>
      <div v-else-if="pending">Loading...</div>
      <div v-else>An error occurred: {{ error.message }}</div>
    </div>
</template>
