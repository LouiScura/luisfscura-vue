<script setup lang="ts">
const menu = useMainMenu()
</script>

<template>
  <footer id="contact">
      <div class="bg-body w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section class="flex flex-col gap-10">
          <div>
            <UBadge icon="i-lucide-rocket"
                    size="lg"
                    color="yellowish" variant="solid" class="font-semibold p-3 animate-pulse rounded-full">Available for freelance work</UBadge>
            <h2
                class="text-heading text-4xl md:text-5xl text-left lg:!leading-[60px] font-bold my-4 md:my-1 w-1/2">
              Ready to share your Ideas?
            </h2>
          </div>
          <FooterForm/>
        </section>
      </div>

      <section class="w-full bg-primary">
        <div class="flex flex-wrap max-w-7xl mx-auto justify-between px-4 sm:px-6 lg:px-8 gap-10 lg:gap-0 mt-20 py-12 lg:py-20">
          <div class="w-full md:basis-[46%] lg:basis-[35%]">
            <h3
                class="text-white text-2xl text-left lg:!leading-[35px] font-bold my-4 md:my-1 w-1/2">
              Ready to share your Ideas?
            </h3>
            <UButton
                trailing-icon="i-lucide-rocket"
                to="#contact"
                size="lg" color="secondary" hover="sb"
                class="text-md font-bold w-[65%] max-w-[150px] mt-6 text-center flex">
              Get Started
            </UButton>
          </div>
          <div class="w-full md:basis-[46%] lg:basis-[20%]">
            <nav class="flex flex-col space-y-2">
              <h3 class="text-xl text-paragraph">Navigation:</h3>
              <NuxtLink
                  v-for="item in menu"
                  :key="item.to"
                  :to="item.to"
                  class="text-white hover:text-secondary transition duration-300 ease-in-out"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
          <div class="w-full md:basis-[46%] lg:basis-[20%]">
            <nav class="flex flex-col space-y-2">
              <h3 class="text-xl text-paragraph">Contact:</h3>
              <ul class="text-white leading-loose">
                <li class="hover:text-secondary transition duration-300 ease-in-out ">
                  <a href="mailto:luisfscura@gmail.com">luisfscura@gmail.com</a>
                </li>
                <li class="hover:text-secondary transition duration-300 ease-in-out ">
                  <a href="tel:+12018990673">+12018990673</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="w-full md:basis-[46%] lg:basis-[20%]">
            <nav class="flex flex-col space-y-2">
              <h3 class="text-xl text-paragraph">Social Media:</h3>
              <ul class="text-white leading-loose">
                <li class="hover:text-secondary transition duration-300 ease-in-out ">
                  <a href="https://www.linkedin.com/in/scuraluis/" target="_blank">LinkedIn</a>
                </li>
                <li class="hover:text-secondary transition duration-300 ease-in-out ">
                  <a href="https://x.com/scura00" target="_blank">X (ex Twitter)</a>
                </li>
                <li class="hover:text-secondary transition duration-300 ease-in-out ">
                  <a href="https://github.com/LouiScura/" target="_blank">GitHub</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

  </footer>
</template>
