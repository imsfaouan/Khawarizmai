import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';   // ← هذا هو الـ import اللي كنت محتاجو

const baseUrl = 'https://www.khawarizmai.xyz';

const languages = ['ar', 'fr', 'en'];
const categories = ['tools', 'open-source', 'projects', 'academy', 'about-us'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    // 1. الصفحة الرئيسية لكل لغة
    sitemapEntries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });

    categories.forEach((category) => {
      // 2. صفحة القسم (مثال: /ar/tools)
      sitemapEntries.push({
        url: `${baseUrl}/${lang}/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // 3. المقالات داخل كل قسم
      const contentDir = path.join(process.cwd(), 'content', lang, category);

      if (fs.existsSync(contentDir)) {
        try {
          const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

          files.forEach((file) => {
            const slug = file.replace('.md', '');
            const filePath = path.join(contentDir, file);
            
            // قراءة الـ frontmatter للحصول على التاريخ
            const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

            sitemapEntries.push({
              url: `${baseUrl}/${lang}/${category}/${slug}`,
              lastModified: new Date(data.dateModified || data.date || new Date()),
              changeFrequency: 'weekly',
              priority: 0.75,
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