export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FUJI SHOP',
    titleTemplate: '%s| FUJI SHOP',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase.ts'],
  plugins: [
    { src: '~/plugins/veeValidate', ssr: false },
    { src: '~/plugins/swiper' },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient, isServer }) {
      if (isServer) {
        config.externals = {
          '@firebase/app': 'commonjs @firebase/app',
          '@firebase/firestore': 'commonjs @firebase/firestore',
          '@firebase/storage': 'commonjs @firebase/storage',
          '@firebase/auth': 'commonjs @firebase/auth',
          //etc...
        };
      }
    },
    babel: {
      presets({ isServer }, [preset, options]) {
        options.loose = true;
      },
    },
  },
  vuex: false,
  // render: {
  //   injectScripts: false,
  // },
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  manifest: {
    name: 'FujiShop',
    lang: 'ja',
    short_name: 'FujiShop',
    title: 'FujiShop',
    'og:title': 'FujiShop',
    description: 'FujiShopオフィシャルサイトです',
    'og:description': 'FujiShopオフィシャルサイトです',
    theme_color: '#212121',
    background_color: '#212121',
  },
  workbox: {
    dev: false, // Service Workerを開発環境で使用するかどうか
  }
};
