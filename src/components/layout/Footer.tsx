'use client';

export function Footer() {
  return (
    <footer className="border-t bg-zinc-950 border-zinc-900/50 py-8">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[11px] text-zinc-600 uppercase tracking-[0.2em] font-medium">
          © {new Date().getFullYear()} FinFlow Project.
        </p>
      </div>
    </footer>
  );
}
