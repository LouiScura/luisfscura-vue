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
  modules: ['@nuxt/devtools', '@nuxt/ui', 'nuxt-aos'],
  css: ['~/assets/css/main.css'],
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './assets/icons'
    }]
  },
  runtimeConfig: {
    public: {
      wordpressUrl: 'https://luisfscura.dev/graphql'
    }
  },
  ui: {
    theme: {
      colors: [
        'pb',
        'sb',
        'secondary',
        'yellowish',
        'paragraph'
      ]
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