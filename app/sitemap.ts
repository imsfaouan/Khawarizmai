import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://khawarizmai.com'; // غادي تبدلو ملي تشري الدومين
  const langs = ['ar', 'en', 'fr'];
  const categories = ['news', 'tools', 'projects', 'open-source', 'academy'];

  const routes = langs.flatMap((lang) => 
    categories.map((cat) => ({
      url: `${baseUrl}/${lang}/${cat}`,
      lastModified: new Date(),
    }))
  );

  const homeRoutes = langs.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
  }));

  return [...homeRoutes, ...routes];
}