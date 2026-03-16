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
  };
}

export default async function RootLayout(props: { children: React.ReactNode, params: Promise<{ lang: string }> }) {
  const { children } = props;
  const { lang } = await props.params;

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased font-sans bg-white selection:bg-purple-100 selection:text-purple-900">
        <Navbar lang={lang} />
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* تفعيل Vercel Analytics */}
        <Analytics />
        
        <footer className="py-10 border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-sm font-medium">
              © {new Date().getFullYear()} <span className="text-slate-900 font-bold">Khawarizmai</span>. Built for the future of AI.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}