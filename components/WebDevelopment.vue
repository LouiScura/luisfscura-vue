<script setup>
  defineProps({
    faqSection: {
      type: String,
      required: false
    }
  })
</script>

<template>
    <section>
        <div>
            <p>I develop responsive websites that are fast, secure, and optimized for a seamless user experience</p>
            <Button text="Let’s build together" color="bg-pb"
                  hover="hover:bg-sb"
                  textColor="text-heading"
                  href="/projects"
                  src="/icons/up-arrow-icon.svg"
                  class="w-[65%] justify-between py-2 max-w-[235px] lg:max-w-[225px]"/>
        </div>
      <FaqBlock :faq-section="faqSection" />
    </section>
</template>
