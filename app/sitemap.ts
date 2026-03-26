import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.khawarizmai.xyz';
const languages = ['ar', 'fr', 'en'];
// هادو هما الأقسام اللي عندك في مجلد content
const categories = ['tools', 'open-source', 'projects', 'academy', 'About Us'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    // 1. إضافة الصفحة الرئيسية لكل لغة
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // 2. قراءة المقالات من كل قسم
    categories.forEach((category) => {
      // إضافة رابط القسم نفسه (مثلاً: /ar/tools)
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      const contentDir = path.join(process.cwd(), 'content', lang, category);

      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
        
        files.forEach((file) => {
          const slug = file.replace('.md', '');
          sitemapEntries.push({
            url: `${baseUrl}/${lang}/${category}/${slug}`,
            lastModified: new Date(), // كيقدر نجبدو التاريخ من الملف إيلا بغينا
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        });
      }
    });
  });

  return sitemapEntries;
}