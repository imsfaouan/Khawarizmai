'use client';

import { useState } from 'react';
import Giscus from '@giscus/react';
import { useParams } from 'next/navigation';

export default function Comments() {
  const [show, setShow] = useState(false);
  const params = useParams();
  const lang = params.lang as string;

  return (
    <section className="mt-12 py-6 border-t border-slate-100">
      {!show ? (
        /* الزر الأنيق مع لوغو GitHub وتنبيه بسيط */
        <button 
          onClick={() => setShow(true)}
          className="flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-all duration-300 group bg-slate-50/50 pr-4 pl-2 py-2 rounded-full border border-transparent hover:border-blue-100 hover:bg-blue-50/30"
        >
          {/* أيقونة التعليق */}
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>

          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-black text-slate-700 group-hover:text-blue-600">
              {lang === 'ar' ? 'هل لديك سؤال أو تعليق؟' : lang === 'fr' ? 'Une question ?' : 'Have a question?'}
            </span>
            <div className="flex items-center gap-1.5 opacity-60 mt-0.5">
              {/* لوغو GitHub صغير جداً */}
              <svg height="12" width="12" viewBox="0 0 16 16" fill="currentColor" className="text-slate-500">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span className="text-[10px] font-medium italic">
                {lang === 'ar' ? '(يتطلب حساب GitHub)' : lang === 'fr' ? '(via GitHub)' : '(via GitHub)'}
              </span>
            </div>
          </div>
        </button>
      ) : (
        /* صندوق التعليقات ملي كيتحل */
        <div className="animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="mb-4 flex items-center justify-between px-2">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Discussion</span>
             <button 
              onClick={() => setShow(false)}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 bg-slate-100 px-3 py-1 rounded-full transition-colors"
            >
              {lang === 'ar' ? 'إغلاق' : lang === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
          <Giscus
            id="comments"
            repo="imsfaouan/Khawarizmai"
            repoId="R_kgDORoC6eA"
            category="Announcements"
            categoryId="DIC_kwDORoC6eM4C5Uwd"
            mapping="pathname"
            strict="0"
            reactionsEnabled="0"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang={lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en'}
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
}