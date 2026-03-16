import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-black text-slate-100">404</h1>
      <div className="space-y-4 -mt-10">
        <h2 className="text-3xl font-bold text-slate-900">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          The resources you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-6">
          <Link 
            href="/" 
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-bold shadow-xl shadow-purple-200 hover:scale-105 transition-all duration-300 inline-block"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}