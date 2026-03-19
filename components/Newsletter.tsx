'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Newsletter() {
  const params = useParams();
  const lang = params?.lang as string || 'ar';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const translations = {
    ar: { placeholder: "بريدك الإلكتروني...", button: "انضم الآن ", success: "تم بنجاح!", loading: "جاري...", error: "وقع خطأ، حاول مجدداً" },
    fr: { placeholder: "Votre email...", button: "S'abonner ", success: "Succès !", loading: "Envoi...", error: "Erreur, réessayez" },
    en: { placeholder: "Your email...", button: "Join now ", success: "Success!", loading: "Sending...", error: "Error, try again" }
  };

  const t = translations[lang as keyof typeof translations] || translations.ar;

  // --- الدالة المعدلة ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    console.log("🚀 جاري إرسال الطلب لـ /api/subscribe...");

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ email }),
      });

      console.log("📡 استجابة السيرفر:", res.status);

      if (res.ok) { 
        console.log("✅ تم الاشتراك بنجاح!");
        setStatus('success'); 
        setEmail(''); 
        // كيرجع الزر لحالته الطبيعية بعد 4 ثواني
        setTimeout(() => setStatus('idle'), 4000);
      } else { 
        const errorData = await res.json().catch(() => ({}));
        console.error("❌ فشل الطلب:", errorData);
        setStatus('error'); 
      }
    } catch (err) { 
      console.error(" خطأ في الاتصال بالسيرفر:", err);
      setStatus('error'); 
    }
  };
  // -----------------------

  return (
    <div className="w-full max-w-sm mx-auto text-right">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="p-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-blue-500 transition-all text-right"
          required
        />
        <button
          type="submit" 
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? t.loading : t.button}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-3 text-green-400 text-center text-xs font-bold animate-pulse">
          {t.success}
        </p>
      )}
      
      {status === 'error' && (
        <p className="mt-3 text-red-400 text-center text-xs font-bold">
          {t.error}
        </p>
      )}
    </div>
  );
}