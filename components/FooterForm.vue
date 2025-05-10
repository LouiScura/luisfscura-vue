<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import emailjs from 'emailjs-com'

/* ────────────────────  validation schema  ──────────────────── */
const schema = v.object({
  full_name:  v.pipe(v.string(), v.minLength(2, 'Name is too short')),
  company_name: v.optional(v.string()),              // optional field
  phone:      v.pipe(v.string(), v.minLength(7, 'Phone is too short')),
  email:      v.pipe(v.string(), v.email('Invalid email')),

  service: v.union([
    v.literal('Website development'),
    v.literal('Site maintenance'),
    v.literal('Consulting')
  ], 'Please choose a service'),

  budget: v.union([
    v.literal('< US$1 500'),
    v.literal('US$600 – 1 110'),
    v.literal('> US$599')
  ], 'Please choose a budget'),

  details:   v.pipe(v.string(), v.minLength(10, 'Please add some details')),

  /* anti-bot */
  bot_check: v.literal('7', 'Please answer the anti-bot question correctly')
})

const budgetOptions = [
  '< US$1 500',
  'US$600 – 1 110',
  '> US$599'
]

const serviceOptions = [
  'Website development',
  'Site maintenance',
  'Consulting'
]


type Schema = v.InferOutput<typeof schema>

/* ────────────────────  reactive state  ──────────────────── */
const state = reactive<Schema>({
  full_name: '',
  company_name: '',
  phone: '',
  email: '',
  service: [],
  budget: [],
  details: '',
  bot_check: ''
})

const toast = useToast()

/* ────────────────────  submit  ──────────────────── */

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    const templateParams = { ...event.data }      // send everything (or pick only what you need)

    await emailjs.send(
        'xxxx1',          // service ID
        'xxx1',          // template ID
        templateParams,
        'xxx1'           // public key
    )

    toast.add({ title: 'Success', description: 'Email sent successfully!', color: 'primary' })
  } catch (error) {
    toast.add({ title: 'Error', description: 'Failed to send email.', color: 'error' })
    console.error(error)
  }
}
</script>

<template>
  <UForm
      :schema="schema"
      :state="state"
      class="p-8 rounded-lg w-full bg-white text-paragraph"
      @submit="onSubmit"
      data-aos="fade-down"
  >
    <div class="grid gap-4 md:grid-cols-2">
      <UFormField label="Full name" name="full_name" required>
        <UInput v-model="state.full_name" placeholder="Full name"
                class="focus:ring-secondary focus:border-secondary"
                highlight
                color="paragraph"
                variant="outline"/>
      </UFormField>

      <UFormField label="Company name" name="company_name">
        <UInput v-model="state.company_name" placeholder="Company name (optional)" />
      </UFormField>

      <UFormField label="Phone number" name="phone">
        <UInput v-model="state.phone" placeholder="+54 11 1234 5678" />
      </UFormField>

      <UFormField label="Email address" name="email">
        <UInput v-model="state.email" placeholder="you@example.com" />
      </UFormField>

      <UFormField label="Service required" name="service">
        <USelectMenu v-model="state.service" :items="serviceOptions" class="bg-white w-full py-4"/>
      </UFormField>


      <UFormField label="Project budget" name="budget">
        <USelectMenu v-model="state.budget" :items="budgetOptions" class="bg-white w-full py-4"/>
      </UFormField>
    </div>

    <UFormField label="Project details" name="details" class="mt-4">
      <UTextarea
          v-model="state.details"
          placeholder="Tell us about your project goals, timeline, etc."
          class="w-full !bg-white"/>
    </UFormField>

    <UFormField label="What is 3 + 4?" name="bot_check" class="mt-4">
      <UInput v-model="state.bot_check" placeholder="Answer the question" />
    </UFormField>

    <UButton
        to="#contact"
        size="lg" color="pb" hover="sb"
        class="text-md font-bold w-[65%] max-w-[150px] mt-6 text-center block">
      Send Inquiry
    </UButton>
  </UForm>
</template>
