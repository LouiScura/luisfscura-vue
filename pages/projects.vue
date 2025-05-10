<script setup lang="ts">
const config = useRuntimeConfig()

const { data: page, pending, error } = await useAsyncData('projectsPage', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        query: `
          query {
            pageBy(uri: "projects") {
              title
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
              </section>
              <div class="flex flex-col flex-1 gap-5 lg:flex-row mt-5">
                <UButton
                  to="https://calendly.com/luisfscura/30min"
                  target="_blank"
                size="lg" color="pb" hover="sb"
                class="text-md font-bold w-[75%] max-w-[235px] lg:max-w-[225px]">
                <template #trailing>
                  <UpArrowIcon />
                </template>
                Book a consultation
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="flex flex-col flex-wrap md:flex-row max-w-7xl mx-auto text-left items-start my-20 justify-between gap-y-10 px-6 md:px-8"
               data-aos="zoom-in"
               data-aos-easing="ease-in-back"
               data-aos-delay="100"
               data-aos-offset="0">
        <div class="w-full block">
          <h2 class="text-heading text-4xl md:text-5xl font-bold text-left md:w-8/12 leading-tight">Here are some of my projects that I brought to life</h2>
        </div>
        <Project/>
      </section>
    </div>
  </div>
</template>
