'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState(''); // خانة الكود
  const [status, setStatus] = useState('');

  const handleIndex = async () => {
    setStatus('جاري التحقق والإرسال... 🚀');
    
    const res = await fetch('/api/index-now', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, password }), // كنصيفطو الكود مع الرابط
    });

    const data = await res.json();
    if (data.success) {
      setStatus('✅ تم! جوجل دابا في الطريق للمقال.');
    } else {
      setStatus('❌ مشكل: ' + data.error);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto text-center font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">لوحة تحكم الأرشفة الفورية ⚡</h1>
      
      <div className="space-y-4 bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
        <input 
          type="password" 
          placeholder="كلمة السر الخاصة بك..." 
          className="w-full p-4 border rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <input 
          type="text" 
          placeholder="حط رابط المقال الكامل (https://...)" 
          className="w-full p-4 border rounded-xl text-black focus:ring-2 focus:ring-blue-500 outline-none"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        
        <button 
          onClick={handleIndex}
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg"
        >
         أرسل لجوجل!
         </button>
      </div>
      
      {status && (
        <div className={`mt-8 p-4 rounded-xl font-bold ${status.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status}
        </div>
      )}
    </div>
  );
}