<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();

const { data: page, pending, error } = useAsyncData('servicesPage', () =>
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


  <div class="w-full">
    <div class="bg-primary">
      <div class="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1 flex-col bg-primary h-full leading-loose align-start justify-between mt-5 mb-10">
          <div>
            <section class="w-11/12 lg:w-10/12">
              <h1
                  class="text-white text-4xl md:text-5xl lg:text-7xl lg:!leading-[80px] font-semibold my-4 md:my-1"
                  v-html="page.title" />
              <div class="text-white/60 text-base leading-relaxed lg:leading-loose mb-5" v-html="page.content"></div>
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
                <div v-if="page.servicesPage?.testimonialHero" class="md:w-5/12">
                  <p class="text-white text-base">{{ page.servicesPage.testimonialHero }}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <section class="flex flex-col flex-wrap md:flex-row max-w-7xl mx-auto text-left items-start my-20 justify-between gap-y-5 xl:gap-y-0">
      <Services/>
    </section>
  </div>
</template>