import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Newsletter from '@/components/Newsletter';
import { Metadata } from 'next'; // 👈 زدنا هادي

// 👈 هاد الجزء زدناه باش نحلوا مشكل جوجل للرئيسية بكل اللغات
export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const url = `https://www.khawarizmai.xyz/${lang}`;
  
  return {
    title: `Khawarizmai | ${lang.toUpperCase()}`,
    alternates: {
      canonical: url,
    },
  };
}

const homeI18n: any = {
  ar: { 
    welcome: "مرحباً بك في Khawarizmai", 
    subtitle: "منصة متكاملة للأخبار، الأدوات، البرمجة، والأفكار الذكية", 
    latestTitle: "آخر التحديثات والمقالات",
    dir: "rtl" 
  },
  fr: { 
    welcome: "Bienvenue sur Khawarizmai", 
    subtitle: "Une plateforme intégrée pour l'actualité, les outils, la programmation et les idées intelligentes", 
    latestTitle: "Dernières mises à jour",
    dir: "ltr" 
  },
  en: { 
    welcome: "Welcome to Khawarizmai", 
    subtitle: "An integrated platform for news, tools, programming, and smart ideas", 
    latestTitle: "Latest Updates",
    dir: "ltr" 
  }
};

const categories = [
  { id: 'About Us', color: 'from-purple-500 to-blue-500', 
    ar: { title: "من نحن", btnText: "اكتشف قصتنا", desc: "تعرف على منصة خوارزمي (Khawarizmai)، وجهتكم الأولى لاستكشاف أسرار الذكاء الاصطناعي، والأدوات الذكية، والدروس التطبيقية برؤية عربية وعالمية." },
    fr: { title: "À Propos", btnText: "Découvrir notre histoire", desc: "Découvrez Khawarizmai, votre destination pour explorer les secrets de l'IA, les outils intelligents et les tutoriels pratiques avec une vision globale." },
    en: { title: "About Us", btnText: "Discover our story", desc: "Learn more about Khawarizmai, your premier destination for exploring AI secrets, smart tools, and practical tutorials with a global perspective." } },
  { id: 'tools', color: 'from-blue-500 to-cyan-500', 
    ar: { title: "الأدوات الذكية", btnText: "جرب الأدوات الآن", desc: "أفضل أدوات AI مجربة ومحدثة (ChatGPT، Claude، Midjourney، Grok...) مع مقارنات وprompts جاهزة." },
    fr: { title: "Outils Intelligents", btnText: "Essayez les outils", desc: "Les meilleurs outils IA testés et mis à jour avec comparaisons et prompts prêts." },
    en: { title: "Smart Tools", btnText: "Try tools now", desc: "Best tested and updated AI tools with comparisons and ready-to-use prompts." } },
  { id: 'open-source', color: 'from-green-500 to-emerald-500', 
    ar: { title: "Open Source", btnText: "اكتشف المشاريع المفتوحة", desc: "أقوى المشاريع المفتوحة المصدر (Open Source) مشاريع، نماذج، وأدوات يمكنك استخدامها فوراً ومجاناً." },
    fr: { title: "Open Source", btnText: "Découvrir l'Open Source", desc: "Les projets, modèles et outils open source les plus puissants que vous pouvez utiliser gratuitement." },
    en: { title: "Open Source", btnText: "Explore Open Source", desc: "The most powerful open-source projects, models, and tools you can use immediately for free." } },
  { id: 'projects', color: 'from-orange-500 to-red-500', 
    ar: { title: "مشاريع AI", btnText: "تصفح المشاريع الجاهزة", desc: "اكتشف مشاريع جاهزة كاملة (ترجمة، Agent، روبوتات، تحليل بيانات...)" },
    fr: { title: "Projets IA", btnText: "Parcourir les projets", desc: "Découvrez des projets complets prêts à l'emploi (Traduction, Agent, Robots, Analyse de données...)." },
    en: { title: "AI Projects", btnText: "Browse ready projects", desc: "Discover complete ready-to-use projects (Translation, Agent, Robots, Data analysis...)." } },
  { id: 'academy', color: 'from-indigo-500 to-purple-600', 
    ar: { title: "دورات AI معتمدة", btnText: "ابدأ التعلم الآن", desc: "اكتشف دورات عالمية معتمدة لتطوير مهارتك في عالم الذكاء الاصطناعي (مجانية + مدفوعة)." },
    fr: { title: "Formations IA Certifiées", btnText: "Commencer à apprendre", desc: "Découvrez des formations mondiales certifiées pour développer vos compétences en IA." },
    en: { title: "Certified AI Courses", btnText: "Start learning now", desc: "Discover certified global courses to develop your skills in the AI world." } },
];

async function getLatestPosts(lang: string) {
  const categoriesFolders = ['tools', 'open-source', 'projects', 'academy'];
  let allPosts: any[] = [];

  for (const cat of categoriesFolders) {
    const dirPath = path.join(process.cwd(), `content/${lang}/${cat}`);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
          const { data } = matter(content);
          allPosts.push({
            slug: file.replace('.md', ''),
            category: cat,
            title: data.title,
            date: data.date || '2026-01-01',
          });
        }
      });
    }
  }

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
}

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await props.params; 
  const lang = resolvedParams.lang;
  const dict = homeI18n[lang] || homeI18n.en;
  const latestPosts = await getLatestPosts(lang);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-6" dir={dict.dir}>
      <div className="max-w-6xl w-full space-y-20 pb-20">
        
        {/* 1. قسم الترحيب (Hero Section) */}
        <header className="flex flex-col items-center justify-center text-center pt-20 pb-10 space-y-8">
          <div className="inline-block px-5 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-black animate-pulse shadow-sm">
            Khawarizmai Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent leading-tight">
            {dict.welcome}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {dict.subtitle}
          </p>

          <div className="w-full max-w-md mx-auto">
             <Newsletter />
          </div>
        </header>

        {/* 2. قسم آخر المقالات */}
        {latestPosts.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b-4 border-purple-500 pb-2 mb-8">
              <h3 className="text-3xl font-black text-slate-800">
                {dict.latestTitle}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link 
                  key={post.slug}
                  href={`/${lang}/${post.category}/${post.slug}`}
                  className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group text-start"
                >
                  <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">{post.category}</span>
                  <h4 className="text-lg font-black text-slate-800 mt-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-3 font-medium">{post.date}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 3. شبكة التصنيفات الأساسية */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          {categories.map((cat: any) => (
            <Link 
              key={cat.id} 
              href={`/${lang}/${cat.id}`}
              className="group relative p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 overflow-hidden text-start flex flex-col min-h-[220px]"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${cat.color} group-hover:w-3 transition-all duration-300`}></div>
              <h2 className="text-2xl font-black text-slate-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {cat[lang]?.title || cat.en.title}
              </h2>
              <p className="text-slate-500 text-sm leading-loose mb-6 flex-grow font-medium">
                {cat[lang]?.desc || cat.en.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 text-sm font-black text-blue-600 group-hover:text-purple-600 transition-colors">
                <span>{cat[lang]?.btnText || cat.en.btnText}</span>
                <span className={`transform transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                  {lang === 'ar' ? '←' : '→'}
                </span>
              </div>
            </Link>
          ))}
        </section>

      </div>
    </div>
  );
}