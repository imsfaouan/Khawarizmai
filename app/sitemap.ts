import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.khawarizmai.xyz';
const languages = ['ar', 'fr', 'en'];
// هادو هما الأقسام اللي عندك في مجلد content
// تأكد بلي السميات صحيحة (نفس سميات المجلدات اللي عندك لداخل)
const categories = ['tools', 'open-source', 'projects', 'academy', 'About Us'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    // 1. إضافة الصفحة الرئيسية لكل لغة (مثال: /ar)
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // 2. قراءة الأقسام والمقالات
    categories.forEach((category) => {
      // إضافة رابط القسم (مثال: /ar/tools)
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // تحديد المسار للمجلد اللي فيه المقالات
      const contentDir = path.join(process.cwd(), 'content', lang, category);

      // إيلا كان المجلد كاين، جبد كاع المقالات (.md)
      if (fs.existsSync(contentDir)) {
        try {
          const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
          
          files.forEach((file) => {
            const slug = file.replace('.md', '');
            sitemapEntries.push({
              url: `${baseUrl}/${lang}/${category}/${slug}`,
              lastModified: new Date(), 
              changeFrequency: 'weekly',
              priority: 0.7,
            });
          });
        } catch (error) {
          console.error(`Error reading directory ${contentDir}:`, error);
        }
      }
    });
  });

  return sitemapEntries;
}