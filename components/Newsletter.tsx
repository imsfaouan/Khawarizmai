'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation'; // هادي هي اللي كتعرف واش السيت بـ ar أو fr أو en

export default function Newsletter() {
  const params = useParams();
  const lang = params?.lang as string || 'ar'; // كياخد اللغة من الرابط

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // الترجمة الواجدة
  const translations = {
    ar: { placeholder: "بريدك الإلكتروني...", button: "انضم الآن 🚀", success: "تم بنجاح!", loading: "جاري..." },
    fr: { placeholder: "Votre email...", button: "S'abonner 🚀", success: "Succès !", loading: "Envoi..." },
    en: { placeholder: "Your email...", button: "Join now 🚀", success: "Success!", loading: "Sending..." }
  };

  const t = translations[lang as keyof typeof translations] || translations.ar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) { setStatus('success'); setEmail(''); } else { setStatus('error'); }
    } catch (err) { setStatus('error'); }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-blue-500 transition-all text-right"
          required
        />
        <button
          type="submit" disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all disabled:opacity-50"
        >
          {status === 'loading' ? t.loading : t.button}
        </button>
      </form>
      {status === 'success' && <p className="mt-3 text-green-400 text-center text-xs font-bold">{t.success}</p>}
    </div>
  );
}