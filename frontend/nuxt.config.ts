// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //     modules: ['nuxt-icon', '@nuxtjs/google-fonts',async (options, nuxt) => {
  //       nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(vuetify()))
  //     },],
  //     typescript: { shim: false },
  //     build: { transpile: ['vuetify'] },
  //     vite:{ssr:{noExternal:["vuetify"]}},
  //     plugins: [
  //     '@/plugins/vuetify'
  //   ],
  //     alias: {
  //         "@":resolve(__dirname,"/")
  //     },
  //    css: ['~/assets/main.scss'],
  //     postcss: {
  //     plugins: {
  //       tailwindcss: {},
  //       autoprefixer: {},
  //     },
  //   },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@pinia/nuxt"],
  css: [
    "~/assets/main.css",
    "vuetify/styles",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: { shim: false },
  build: {
    transpile: ["vuetify", "vue-toastification", "@headlessui/tailwindcss"],
  },
  ssr: false,
});
