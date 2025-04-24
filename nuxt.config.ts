// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
      preset: "cloudflare-pages"
  },
  imports: {
    autoImport: true,
  },
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      wordpressUrl: 'https://luisfscura.dev/graphql'
    }
  },
  app: {
    pageTransition: {
        name: 'page',
        mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})
