import Link from 'next/link';

export default function Navbar({ lang }: { lang: string }) {
  const menu: any = {
    ar: [
      { name: "من نحن", path: "about-us", desc: "تعرف على منصة خوارزمي (Khawarizmai)." },
      { name: "الأدوات الذكية", path: "tools", desc: "أفضل أدوات AI مجربة ومقارنات بينها." },
      { name: "مشاريع Ai", path: "projects", desc: "مشاريع كاملة جاهزة للاستخدام." },
      { name: "Open Source", path: "open-source", desc: "نماذج ومشاريع مجانية ومفتوحة المصدر." },
      { name: "دورات معتمدة", path: "academy", desc: "تعلم الذكاء الاصطناعي بشهادات عالمية." }
    ],
    fr: [
      { name: "À Propos", path: "about-us", desc: "Découvrez Khawarizmai." },
      { name: "Outils Smart", path: "tools", desc: "Les meilleurs outils IA testés." },
      { name: "Projets IA", path: "projects", desc: "Projets complets prêts à l'emploi." },
      { name: "Open Source", path: "open-source", desc: "Modèles et projets gratuits." },
      { name: "Formations", path: "academy", desc: "Apprenez l'IA avec des certificats." }
    ],
    en: [
      { name: "About Us", path: "about-us", desc: "Learn more about Khawarizmai." },
      { name: "Smart Tools", path: "tools", desc: "Best tested AI tools & prompts." },
      { name: "AI Projects", path: "projects", desc: "Ready-to-use AI projects." },
      { name: "Open Source", path: "open-source", desc: "Free open-source models & tools." },
      { name: "Courses", path: "academy", desc: "Learn AI with certified courses." }
    ]
  };
  const links = menu[lang] || menu.ar;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        
        {/* الشعار - تمت إضافة aria-label */}
        <Link href={`/${lang}`} aria-label="الصفحة الرئيسية لمنصة خوارزمي" className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          Khawarizmai
        </Link>

        {/* روابط الأقسام مع مربع الشرح (Tooltip) */}
        <div className="hidden lg:flex gap-8 items-center relative">
          {links.map((link: any) => (
            <div key={link.path} className="group relative">
              <Link href={`/${lang}/${link.path}`} aria-label={link.name} className="text-base font-bold text-slate-700 hover:text-purple-600 transition-colors py-2">
                {link.name}
              </Link>
              {/* المربع التوضيحي عند تمرير الماوس */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 p-3 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-center">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{link.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* أزرار اللغات - تمت إضافة aria-label */}
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          <Link href="/ar" aria-label="تغيير اللغة إلى العربية" className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'ar' ? 'bg-white shadow-md text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="text-lg">🇸🇦</span> AR
          </Link>
          <Link href="/fr" aria-label="Changer la langue en Français" className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'fr' ? 'bg-white shadow-md text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="text-lg">🇫🇷</span> FR
          </Link>
          <Link href="/en" aria-label="Change language to English" className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-white shadow-md text-purple-700' : 'text-slate-500 hover:text-slate-800'}`}>
            <span className="text-lg">🇬🇧</span> EN
          </Link>
        </div>

      </div>
    </nav>
  );
}