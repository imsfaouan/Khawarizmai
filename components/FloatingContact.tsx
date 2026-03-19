'use client';
import { useState } from 'react';
import Newsletter from './Newsletter';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-72 p-5 bg-white border border-slate-200 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <Newsletter />
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-all active:scale-90"
      >
        {isOpen ? '✕' : '📧'}
      </button>
    </div>
  );
}