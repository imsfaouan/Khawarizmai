'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10"></div>;

  return (
    <button
      onClick={() => {
        console.log("Current theme:", theme); // شوف هاد الكونسول واش كيتبدل
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}