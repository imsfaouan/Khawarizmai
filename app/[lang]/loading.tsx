export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest">KHAWARIZMAI...</p>
    </div>
  );
}