export default {
  head: {
    title: 'desafio-luxone',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/css/base.css'],

  plugins: [],

  components: [{ path: '~/components', pathPrefix: false }],

  buildModules: ['@nuxt/typescript-build'],

  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'https://api.github.com/users',
  },

  build: {},
}
