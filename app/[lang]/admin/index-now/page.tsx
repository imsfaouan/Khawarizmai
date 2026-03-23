'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleIndex = async () => {
    setStatus('جاري الإرسال لجوجل... 🚀');
    const res = await fetch('/api/index-now', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus('✅ تم! جوجل دابا في الطريق للمقال.');
    } else {
      setStatus('❌ وقع مشكل: ' + data.error);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto text-center" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">لوحة تحكم الأرشفة الفورية ⚡</h1>
      <input 
        type="text" 
        placeholder="حط رابط المقال هنا..." 
        className="w-full p-3 border rounded-xl mb-4 text-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button 
        onClick={handleIndex}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        أرسل لجوجل دابا!
      </button>
      <p className="mt-6 font-bold text-blue-600">{status}</p>
    </div>
  );
}
