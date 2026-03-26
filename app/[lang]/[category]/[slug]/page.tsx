import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Metadata } from 'next';
import Comments from '@/components/Comments'; // 👈 هادي زدناها هنا

// 1. إضافة Metadata ديناميكية لتحسين السيو (SEO)
export async function generateMetadata(props: { params: Promise<{ lang: string, category: string, slug: string }> }): Promise<Metadata> {
  const { lang, category, slug } = await props.params;
  const filePath = path.join(process.cwd(), 'content', lang, category, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) return { title: "Article non trouvé" };
  
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'));
  
  return {
    title: `${data.title} | Khawarizmai`,
    description: data.description || data.title,
    openGraph: {
      images: [data.image],
    },
  };
}

const postI18n: any = {
  ar: { back: "← عودة", home: "الرئيسية", related: "مقالات قد تهمك", readTime: "دقائق قراءة", dir: "rtl" },
  fr: { back: "Retour →", home: "Accueil", related: "Articles suggérés", readTime: "min de lecture", dir: "ltr" },
  en: { back: "Back →", home: "Home", related: "You might like", readTime: "min read", dir: "ltr" }
};

// مكون خاص لمعالجة الروابط داخل المقال
const MarkdownComponents = {
  a: ({ href, children, ...props }: any) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href || '/'} {...props}>
        {children}
      </Link>
    );
  },
};

export default async function PostPage(props: { params: Promise<{ lang: string, category: string, slug: string }> }) {
  const { lang, category, slug } = await props.params;
  const dict = postI18n[lang] || postI18n.en;

  const contentDir = path.join(process.cwd(), 'content', lang, category);
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return <div className="p-20 text-center font-bold text-xl">404 - Article non trouvé</div>;

  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'));
  
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": data.title,
    "image": data.image,
    "datePublished": data.date,
    "author": {
      "@type": "Person",
      "name": "Abdessamad",
      "url": "https://www.khawarizmai.xyz/about-us"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Khawarizmai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.khawarizmai.xyz/logo.png"
      }
    },
    "description": data.description || data.title
  };

  let relatedPosts: any[] = [];
  if (fs.existsSync(contentDir)) {
    const allFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') && f !== `${slug}.md`);
    relatedPosts = allFiles.slice(0, 3).map(filename => {
      const fileContent = fs.readFileSync(path.join(contentDir, filename), 'utf-8');
      const { data: relatedData } = matter(fileContent);
      return { slug: filename.replace('.md', ''), title: relatedData.title, image: relatedData.image };
    });
  }

  return (
    <div className="min-h-screen bg-white pb-20" dir={dict.dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full h-[50vh] md:h-[60vh] relative">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-6 mb-10 mt-8">
          <Link 
            href={`/${lang}/${category}`}
            className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors border border-slate-200 px-5 py-2.5 rounded-full bg-white shadow-sm flex items-center gap-2"
          >
            {dict.back}
          </Link>

          <Link 
            href={`/${lang}`}
            className="text-sm font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4"
          >
            {dict.home}
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-bold border-b border-slate-100 pb-6">
            <span>{data.date}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span>{minutes} {dict.readTime}</span>
            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
            <span className="text-blue-600 uppercase tracking-wider">{category}</span>
          </div>
        </header>

        <article className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-p:text-lg prose-p:leading-relaxed prose-img:rounded-2xl">
          {/* تم تعديل هذا السطر لتفعيل الروابط الذكية */}
          <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
        </article>

        {/* 👈 زدنا هاد السطر هنا: مكون التعليقات */}
        <Comments />

        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              {dict.related}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/${lang}/${category}/${post.slug}`} className="group block">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <h4 className="font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}