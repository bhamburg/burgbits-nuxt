interface SeoOptions {
  title:        string
  description:  string
  image?:       string
  type?:        'website' | 'article'
  publishedAt?: string
}

export const useSeo = ({ title, description, image, type = 'website', publishedAt }: SeoOptions) => {
  const url   = `https://burgbits.com${useRoute().path}`
  const img   = image ?? 'https://burgbits.com/images/home.png'
  const full  = `${title} - Brian Hamburg`

  useSeoMeta({
    title,
    description,
    ogTitle:       full,
    ogDescription: description,
    ogUrl:         url,
    ogType:        type,
    ogImage:       img,
    ogImageAlt:    title,
    ...(type === 'article' && publishedAt ? { articlePublishedTime: publishedAt } : {}),
    twitterTitle:       full,
    twitterDescription: description,
    twitterImage:       img,
  })
}