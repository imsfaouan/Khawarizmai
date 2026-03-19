import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.khawarizmai.xyz'
  const languages = ['ar', 'fr', 'en']
  
  // الصفحات الأساسية اللي عندك في السيت
  const routes = ['', '/about', '/contact'] 

  const sitemaps = languages.flatMap((lang) =>
    routes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return sitemaps
}