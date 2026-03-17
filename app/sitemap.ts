import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://khawarizmai.vercel.app';
  const langs = ['ar', 'en', 'fr'];
  const categories = ['news', 'tools', 'projects', 'open-source', 'academy'];

  const routes = langs.flatMap((lang) => 
    categories.map((cat) => ({
      url: `${baseUrl}/${lang}/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  const homeRoutes = langs.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }));

  return [...homeRoutes, ...routes];
}