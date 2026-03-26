import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Metadata } from 'next'; // 👈 زدنا هادي

// 👈 هاد الجزء زدناه باش نحلوا مشكل جوجل (الروابط الأساسية للأقسام)
export async function generateMetadata(props: { params: Promise<{ lang: string, category: string }> }): Promise<Metadata> {
  const { lang, category } = await props.params;
  const url = `https://www.khawarizmai.xyz/${lang}/${category}`;
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | Khawarizmai`,
    alternates: {
      canonical: url,
    },
  };
}

const translations: any = {
  ar: { backHome: "الرئيسية", readMore: "إقرأ المزيد", dir: "rtl" },
  fr: { backHome: "Accueil", readMore: "Lire plus", dir: "ltr" },
  en: { backHome: "Home", readMore: "Read More", dir: "ltr" }
};

export default async function CategoryPage(props: { params: Promise<{ lang: string, category: string }> }) {
  const { lang, category } = await props.params;
  const dict = translations[lang] || translations.en;

  const contentDir = path.join(process.cwd(), 'content', lang, category);
  let posts: any[] = [];

  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    posts = files.map(filename => {
      const fileContent = fs.readFileSync(path.join(contentDir, filename), 'utf-8');
      const { data } = matter(fileContent);
      return { slug: filename.replace('.md', ''), ...data };
    });

    // --- السطر المعدل للترتيب من الأحدث للأقدم ---
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6" dir={dict.dir}>
      <div className="max-w-7xl mx-auto">
        
        {/* زر العودة للرئيسية النقي */}
        <div className="mb-12">
          <Link 
            href={`/${lang}`} 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
             {dict.backHome}
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
          <h1 className="text-4xl font-black text-slate-900 capitalize tracking-tight">{category}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${lang}/${category}/${post.slug}`} 
                  className="group bg-slate-50 rounded-[2rem] overflow-hidden hover:bg-white hover:shadow-2xl border border-transparent hover:border-blue-100 transition-all duration-500 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h2>
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">{post.description}</p>
                <div className="mt-auto text-xs font-black text-blue-600 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span>{dict.readMore}</span>
                  <span className={`transform transition-transform ${dict.dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {dict.dir === 'rtl' ? '←' : '→'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}