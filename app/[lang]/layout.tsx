import Navbar from '@/components/Navbar';
import '../globals.css';
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";

// دالة باش السيت يعرف اللغات اللي عندنا ويوجدهم مسبقاً (SSG)
export async function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }, { lang: 'fr' }];
}

// دالة لجلب العناوين والوصف على حسب اللغة (SEO)
export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const titles: any = {
    ar: { title: 'Khawarizmai - منصة الذكاء الاصطناعي', desc: 'إكتشف عالم الـ AI، الأدوات الذكية، والمشاريع البرمجية المفتوحة.' },
    fr: { title: 'Khawarizmai - Plateforme IA', desc: 'Découvrez le monde de l\'IA, les outils smart et les projets open-source.' },
    en: { title: 'Khawarizmai - AI Platform', desc: 'Explore the world of AI, smart tools, and open-source projects.' }
  };

  const meta = titles[lang] || titles.ar;

  return {
    title: meta.title,
    description: meta.desc,
    icons: { icon: '/favicon.ico' },
    verification: {
      google: 'hd8vSauB4oOyAEkQT-AqRp3cMg92_xVE25JCYlGQsPc',
    },
  };
}

export default async function RootLayout(props: { children: React.ReactNode, params: Promise<{ lang: string }> }) {
  const { children } = props;
  const { lang } = await props.params;
  const isAr = lang === 'ar';

  return (
    <html lang={lang} dir={isAr ? 'rtl' : 'ltr'}>
      <body className="antialiased font-sans bg-white selection:bg-purple-100 selection:text-purple-900 relative">
        {/* هادا هو اللي فيه اللوغو والأيقونات واللغات */}
        <Navbar lang={lang} />
        
        <main className="min-h-screen">
          {children}
        </main>

        {/* --- إضافة: صندوق الاشتراك (Newsletter) --- */}
        <section className="w-full bg-slate-50 border-t border-slate-100 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-3">
              {isAr ? 'اشترك في القائمة البريدية' : 'Subscribe to our Newsletter'}
            </h3>
            <p className="text-slate-500 mb-8">
              {isAr ? 'توصل بآخر الأدوات والمقالات الذكية مباشرة في بريدك' : 'Get the latest smart tools and articles directly in your inbox'}
            </p>
            <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder={isAr ? 'بريدك الإلكتروني...' : 'Your email...'} 
                className="flex-1 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 transition-all text-right" 
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                {isAr ? 'انضم الآن' : 'Join Now'}
              </button>
            </div>
          </div>
        </section>

        <Analytics />

        <footer className="py-10 border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} <span className="text-slate-900 font-bold">Khawarizmai</span>. Built for the future of AI.
            </p>
          </div>
        </footer>

        {/* --- إضافة: دائرة Gmail (Floating Mail) بدل Messenger --- */}
        <div className={`fixed bottom-8 ${isAr ? 'left-8' : 'right-8'} z-[999]`}>
          <a 
            href="mailto:contact@khawarizmai.xyz" 
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>

      </body>
    </html>
  );
}