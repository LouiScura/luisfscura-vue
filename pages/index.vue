<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();

const { data: page, pending, error } = useAsyncData('homePage', () =>
    $fetch(config.public.wordpressUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        query: `
        query {
          pageBy(uri: "home") {
            title
            content
            home {
              testimonialHero
              satisfiedClients
              projectsCompleted
              reviewsGiven
            }
          }
        }
      `
      }
    }).then(res => res.data.pageBy)
)
</script>
<template>
    <div v-if="page" class="w-full">
      <div class="bg-primary">
        <div class="max-w-7xl mx-auto flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div class="flex flex-1 flex-col bg-primary h-full leading-loose align-start justify-between mt-5 mb-10">
            <div>
              <section>
                <div>
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" width="50" height="50" class="rounded-full" alt="Random person" />
                  <p class="text-md text-white font-semibold">I am <span class="text-yellowish">Luis Scura</span></p>
                </div>
              </section>
              <section class="w-11/12 lg:w-10/12">
                <h1
                    class="text-white text-4xl md:text-5xl lg:text-7xl lg:!leading-[80px] font-semibold my-4 md:my-1"
                    v-html="page.title" />
                <div class="text-white/60 text-base leading-relaxed lg:leading-loose mb-5" v-html="page.content"></div>
              </section>
              <section class="flex justify-between">
                <div class="flex flex-col md:flex-row justify-between gap-10 md:items-center w-11/12 max-w-6xl">
                  <div class="flex flex-col flex-1 gap-5 lg:flex-row">
                    <Button
                        text="Book Consultation"
                        href="/#contact"
                        class="w-[75%] justify-between py-2 max-w-[245px] lg:max-w-[225px]"
                    />
                    <Button text="View all works" color="bg-sb"
                            hover="hover:bg-pb"
                            textColor="text-white"
                            href="/projects"
                            src="/icons/white-up-arrow.svg"
                            class="w-[65%] justify-between py-2 max-w-[235px] lg:max-w-[225px]"
                    />
                  </div>
                  <div v-if="page.home?.testimonialHero" class="md:w-3/12">
                    <img src="/icons/quote-up.svg" alt="Quote Icon" class="mb-5"/>
                    <p class="text-white text-base italic">{{ page.home.testimonialHero }}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <p
                class="text-yellowish tracking-widest text-sm mb-4 rotate-90 font-light"
                style="writing-mode: vertical-rl; transform: rotate(360deg);"
            >
              Follow me on:
            </p>

            <div class="w-px h-16 bg-yellowish mb-6 font-light"></div>
            <div class="flex flex-col items-center space-y-3">
              <a href="#" class="bg-yellowish p-1 rounded">
                <img src="/icons/linkedin-icon.svg" alt="LinkedIn" class="max-w-[20px]"/>
              </a>
              <a href="#" class="bg-yellowish p-1 rounded">
                <img src="/icons/x-icon.svg" alt="LinkedIn" class="max-w-[20px]"/>
              </a>
            </div>

          </div>
        </div>
      </div>

      <section class="flex flex-col flex-wrap md:flex-row text-center max-w-7xl mx-auto justify-center items-center my-20 px-6 md:px-8 gap-10 md:gap-0">
        <StatsBlock
            :satisfiedClients="page.home.satisfiedClients"
            :projectsCompleted="page.home.projectsCompleted"
            :reviewsGiven="page.home.reviewsGiven"/>
      </section>

      <section class="flex flex-col flex-wrap md:flex-row text-center max-w-7xl mx-auto px-6 md:px-8">
          <div class="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-10">
            <h2 class="text-heading text-4xl md:text-5xl font-semibold text-left">Solutions for <br> your Industry</h2>
            <Button text="View all services" color="bg-sb"
                    hover="hover:bg-pb"
                    textColor="text-white"
                    href="/services"
                    src="/icons/white-up-arrow.svg"
                    class="w-[55%] justify-between py-2 max-w-[225px] items-center"/>
          </div>
          <div class="flex flex-col flex-wrap md:flex-row max-w-7xl mx-auto text-left items-start my-20 justify-between gap-y-5 xl:gap-y-0">
            <Services/>
          </div>
      </section>
    </div>

    <div v-else-if="pending">Loading homepage...</div>
</template>