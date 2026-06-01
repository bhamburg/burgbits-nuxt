// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-content-assets',
    'nuxt-delay-hydration',
    'nuxt-gtag',
    'nuxt-proxy',
  ],
  app: {
    head: {
      bodyAttrs: {
        class: 'dark:text-white dark:bg-zinc-800 transition',
      },
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Brian Hamburg\'s personal portfolio and blog, showcasing his work as a software engineer, designer, and musician based in the Philadelphia area.' }
      ],
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  content: {
    markdown: {
      anchorLinks: false
    }
  },
  compatibilityDate: '2024-10-24',
  // Lighthouse Tweak: Change 'init' to 'mount' or specify replay options so gtag tracks properly
  delayHydration: {
    mode: 'mount',
    debug: process.env.NODE_DIR !== 'production'
  },
  devtools: {enabled: true},
  gtag: {
    id: 'G-30HMKNVJE0',
  },
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