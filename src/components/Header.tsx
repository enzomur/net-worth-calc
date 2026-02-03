'use client';

export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-3xl">💰</span>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Net Worth <span className="text-emerald-400">Educator</span>
        </h1>
      </div>
      <p className="text-slate-400 max-w-xl mx-auto">
        Calculate your net worth, learn financial fundamentals, and track your progress toward financial freedom.
      </p>
    </header>
  );
}
