// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en'
      },
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'My personal blog and corner of the web — built to write about things I find interesting and share what I\'m learning.' }
      ],
      bodyAttrs: {
        class: 'dark:text-white dark:bg-zinc-800 transition',
      },
    },
  },
  compatibilityDate: '2024-10-24',
  devtools: {enabled: true},
  gtag: {
    id: 'G-30HMKNVJE0',
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-content-assets',
    'nuxt-gtag',
    'nuxt-proxy',
  ],
  postcss: {
    plugins: {
      'postcss-custom-media': {},
      'postcss-nested': {},
      'postcss-simple-vars': {},
    }
  },
  proxy: {
    options: {
      target: 'https://www.serializd.com/',
      changeOrigin: true,
      headers: {
        'x-requested-with': 'serializd_vercel',
      },
      pathRewrite: {
        '^/serializd/user/burgbits/watched': '/api/user/burgbits/diary?include_target=ALL',
        '^/serializd/user/burgbits/watching': '/api/user/burgbits/currently_watching_page/1?sort_by=date_added_desc',
      },
      pathFilter: [
        '/serializd/user/burgbits/watched',
        '/serializd/user/burgbits/watching',
      ]
    }
  }
})