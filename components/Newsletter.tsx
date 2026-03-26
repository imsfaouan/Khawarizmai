'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function Newsletter() {
  const params = useParams();
  const lang = (params?.lang as string) || 'ar';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const translations = {
    ar: { 
      placeholder: "بريدك الإلكتروني...", 
      button: "انضم الآن", 
      success: "تم بنجاح! تفقد بريدك.", 
      loading: "جاري الإرسال...", 
      error: "حدث خطأ، حاول مجدداً",
      ariaInput: "أدخل بريدك الإلكتروني للاشتراك",
      ariaButton: "إرسال طلب الاشتراك في القائمة البريدية"
    },
    fr: { 
      placeholder: "Votre email...", 
      button: "S'abonner", 
      success: "Succès ! Vérifiez votre boîte.", 
      loading: "Envoi en cours...", 
      error: "Erreur, réessayez",
      ariaInput: "Entrez votre email pour vous abonner",
      ariaButton: "S'abonner à la newsletter"
    },
    en: { 
      placeholder: "Your email...", 
      button: "Join now", 
      success: "Success! Check your inbox.", 
      loading: "Sending...", 
      error: "Error, try again",
      ariaInput: "Enter your email to subscribe",
      ariaButton: "Subscribe to the newsletter"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.ar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, lang }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          // التعديل هنا: إضافة aria-label للـ Accessibility
          aria-label={t.ariaInput}
          className={`p-3 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-blue-500 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          // التعديل هنا: إضافة aria-label للـ Accessibility
          aria-label={t.ariaButton}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? t.loading : t.button}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-3 text-green-400 text-center text-xs font-bold animate-pulse italic">
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