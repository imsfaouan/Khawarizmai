'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';

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
      <div className="max-w-7xl mx-auto flex items-center w-full">
        
        {/* 1. الجهة اليسرى: اللوغو + البحث (flex-1 باش ياخد تلت المساحة) */}
        <div className="flex items-center gap-4 flex-1">
          <Link 
            href={`/${lang}`} 
            className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 shrink-0"
          >
            Khawarizmai
          </Link>
          <SearchBar lang={lang} />
        </div>

        {/* 2. الوسط: القائمة (flex-1 + justify-center باش تجي في السنطر بالمليمتر) */}
        <div className="hidden lg:flex gap-8 items-center flex-1 justify-center relative">
          {links.map((link: any) => (
            <div key={link.path} className="group relative">
              <Link 
                href={`/${lang}/${link.path}`} 
                className="text-base font-bold text-slate-700 hover:text-purple-600 transition-colors py-2 whitespace-nowrap"
              >
                {link.name}
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 p-3 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-center">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{link.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. الجهة اليمنى: أزرار اللغات (flex-1 + justify-end باش تهرب لليسار/اليمين الأقصى) */}
        <div className="flex justify-end items-center flex-1 gap-2">
           <div className="flex gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <Link href="/ar" className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'ar' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500'}`}>
              🇸🇦 <span className="hidden xl:inline ml-1">AR</span>
            </Link>
            <Link href="/fr" className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'fr' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500'}`}>
              🇫🇷 <span className="hidden xl:inline ml-1">FR</span>
            </Link>
            <Link href="/en" className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500'}`}>
              🇬🇧 <span className="hidden xl:inline ml-1">EN</span>
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}