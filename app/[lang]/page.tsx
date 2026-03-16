import Link from 'next/link';

const homeI18n: any = {
  ar: { 
    welcome: "مرحباً بك في Khawarizmai", 
    subtitle: "منصة متكاملة للأخبار، الأدوات، برمجة، و الأفكار الذكية", 
    dir: "rtl" 
  },
  fr: { 
    welcome: "Bienvenue sur Khawarizmai", 
    subtitle: "Une plateforme intégrée pour l'actualité, les outils, la programmation et les idées intelligentes", 
    dir: "ltr" 
  },
  en: { 
    welcome: "Welcome to Khawarizmai", 
    subtitle: "An integrated platform for news, tools, programming, and smart ideas", 
    dir: "ltr" 
  }
};

const categories = [
  { id: 'About Us', color: 'from-purple-500 to-blue-500', 
    ar: { title: "من نحن", desc: "تعرف على منصة خوارزمي (Khawarizmai)، وجهتكم الأولى لاستكشاف أسرار الذكاء الاصطناعي، والأدوات الذكية، والدروس التطبيقية برؤية عربية وعالمية.", btnText: "اكتشف قصتنا" },
    fr: { title: "À Propos", desc: "Découvrez Khawarizmai, votre destination pour explorer les secrets de l'IA, les outils intelligents et les tutoriels pratiques avec une vision globale.", btnText: "Découvrir notre histoire" },
    en: { title: "About Us", desc: "Learn more about Khawarizmai, your premier destination for exploring AI secrets, smart tools, and practical tutorials with a global perspective.", btnText: "Discover our story" } },
  { id: 'tools', color: 'from-blue-500 to-cyan-500', 
    ar: { title: "الأدوات الذكية", desc: "أفضل أدوات AI مجربة ومحدثة جديدة (ChatGPT، Claude، Midjourney، Grok...) مع مقارنات وprompts جاهزة.", btnText: "جرب الأدوات الآن" },
    fr: { title: "Outils Intelligents", desc: "Les meilleurs outils IA testés et mis à jour avec comparaisons et prompts prêts.", btnText: "Essayez les outils" },
    en: { title: "Smart Tools", desc: "Best tested and updated AI tools with comparisons and ready-to-use prompts.", btnText: "Try tools now" } },
  { id: 'open-source', color: 'from-green-500 to-emerald-500', 
    ar: { title: "Open Source", desc: "أقوى المشاريع المفتوحة المصدر (Open Source) مشاريع و نماذج، وأدوات يمكنك استخدامها فورًا مجانًا.", btnText: "اكتشف المشاريع المفتوحة" },
    fr: { title: "Open Source", desc: "Les projets, modèles et outils open source les plus puissants que vous pouvez utiliser gratuitement.", btnText: "Découvrir l'Open Source" },
    en: { title: "Open Source", desc: "The most powerful open-source projects, models, and tools you can use immediately for free.", btnText: "Explore Open Source" } },
  { id: 'projects', color: 'from-orange-500 to-red-500', 
    ar: { title: "مشاريع Ai", desc: "إكتشف مشاريع جاهزة كاملة (ترجمة، Agent، روبوتات، تحليل بيانات...)", btnText: "تصفح المشاريع الجاهزة" },
    fr: { title: "Projets IA", desc: "Découvrez des projets complets prêts à l'emploi (Traduction, Agent, Robots, Analyse de données...).", btnText: "Parcourir les projets" },
    en: { title: "AI Projects", desc: "Discover complete ready-to-use projects (Translation, Agent, Robots, Data analysis...).", btnText: "Browse ready projects" } },
  { id: 'academy', color: 'from-indigo-500 to-purple-600', 
    ar: { title: "دورات Ai معتمدة", desc: "إكتشف دورات عالمية معتمدة لتطوير مهارتك في عالم دكاء اصطناعي (مجانية + مدفوعة)", btnText: "ابدأ التعلم الأن" },
    fr: { title: "Formations IA Certifiées", desc: "Découvrez des formations mondiales certifiées pour développer vos compétences en IA.", btnText: "Commencer à apprendre" },
    en: { title: "Certified AI Courses", desc: "Discover certified global courses to develop your skills in the AI world.", btnText: "Start learning now" } },
];

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const dict = homeI18n[lang] || homeI18n.en;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6" dir={dict.dir}>
      <div className="max-w-6xl w-full text-center space-y-16">
        
        <header className="space-y-6 pt-10">
          <div className="inline-block px-5 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-black animate-pulse shadow-sm">
            Khawarizmai Engine
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight pb-3 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {dict.welcome}
          </h1>
          
          {/* الوصف الجديد اللي طلبتي */}
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {dict.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* النص الجديد ديال الزر */}
                <span>{cat[lang]?.btnText || cat.en.btnText}</span>
                <span className={`transform transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                  {lang === 'ar' ? '←' : '→'}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}