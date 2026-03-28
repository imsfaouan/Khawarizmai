'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SearchBar({ lang }: { lang: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [indexData, setIndexData] = useState([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // 1. جلب البيانات من الملف اللي صاوبتي
  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => setIndexData(data))
      .catch((err) => console.error("Search index not found:", err));
  }, []);

  // 2. إعداد محرك البحث
  const fuse = useMemo(() => new Fuse(indexData, {
    keys: ['title', 'category'],
    threshold: 0.4,
  }), [indexData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const searchResults = fuse.search(val).slice(0, 5);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  // 3. وظيفة الضغط على Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      // إيلا برك على Enter، كيديه لأول نتيجة كاينا
      router.push(results[0].item.url);
      setIsExpanded(false);
      setQuery('');
      setResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={searchRef}>
      <motion.div
        initial={false}
        animate={{ width: isExpanded ? '240px' : '40px' }}
        className="flex items-center bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-sm"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-slate-500 hover:text-purple-600 transition-colors shrink-0"
          type="button"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="text"
              autoFocus
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown} // هادي هي اللي كتسمع لـ Enter
              placeholder={lang === 'ar' ? 'ابحث هنا...' : 'Search...'}
              className="w-full bg-transparent border-none outline-none text-sm pr-4 text-slate-900 placeholder:text-slate-400"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* قائمة النتائج اللي كتبان لتحت */}
      <AnimatePresence>
        {isExpanded && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[9999] overflow-hidden left-0"
          >
            <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              {lang === 'ar' ? 'نتائج البحث' : 'Search Results'}
            </div>
            {results.map((result: any) => (
              <button
                key={result.item.url}
                onClick={() => {
                  router.push(result.item.url);
                  setIsExpanded(false);
                  setQuery('');
                  setResults([]);
                }}
                className="w-full text-right p-3 hover:bg-purple-50 border-b last:border-0 border-slate-50 flex flex-col transition-all group"
              >
                <span className="font-bold text-slate-800 text-sm group-hover:text-purple-700">{result.item.title}</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase">{result.item.category}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 