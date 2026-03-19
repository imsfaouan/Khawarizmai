'use client';
import Newsletter from './Newsletter';
import { useParams } from 'next/navigation';

export default function Footer() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ar';

  const t = {
    ar: "اشترك في القائمة البريدية ليصلك جديد خوارزمي",
    fr: "Abonnez-vous pour recevoir les nouveautés de Khawarizmai",
    en: "Subscribe to receive Khawarizmai updates"
  };

  return (
    <footer className="w-full py-12 border-t border-slate-200 bg-slate-50/50 mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-slate-800 text-xl font-black mb-6">{t[lang as keyof typeof t]}</h3>
        
        {/* الخانة ديال الاشتراك اللي غاتبان لتحت كاع */}
        <div className="max-w-md mx-auto">
           <Newsletter />
        </div>

        <p className="mt-10 text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-slate-900 font-bold">Khawarizmai</span>. Built for the future of AI.
        </p>
      </div>
    </footer>
  );
}