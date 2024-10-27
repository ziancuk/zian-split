// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss'],
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' } // Only run on the client-side
  ],
})
