'use client';
import { ReactNode } from 'react';
import { useColors } from '@/hooks/useColors';

export function Skeleton({ className = '' }: { className?: string }) { const c = useColors(); return <div className={`animate-pulse rounded-xl ${className}`} style={{ background: c.bg2 }} />; }

export function AILoader() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-brand-100 dark:border-surface-700 border-t-brand-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-brand-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center"><i className="fa-solid fa-wand-magic-sparkles text-brand-500 text-sm" /></div>
      </div>
      <p className="text-sm font-semibold" style={{ color: 'var(--fg2)' }}>L&apos;IA travaille...</p>
      <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-soft" style={{ animationDelay: `${i * 0.3}s` }} />)}</div>
    </div>
  );
}

export function ErrorDisplay({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center"><i className="fa-solid fa-triangle-exclamation text-red-500 text-xl" /></div>
      <p className="text-sm font-medium max-w-sm" style={{ color: 'var(--fg2)' }}>{message}</p>
      {onRetry && <button onClick={onRetry} className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold border-none cursor-pointer"><i className="fa-solid fa-rotate-right mr-2" />Réessayer</button>}
    </div>
  );
}

export function EmptyState({ icon, title, desc, action }: { icon: string; title: string; desc: string; action?: { label: string; href: string } }) {
  const c = useColors();
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center px-4">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: c.bg2 }}><i className={`fa-solid ${icon} text-2xl`} style={{ color: c.muted }} /></div>
      <h3 className="font-display text-lg font-bold" style={{ color: c.fg }}>{title}</h3>
      <p className="text-sm max-w-sm" style={{ color: c.muted }}>{desc}</p>
      {action && <a href={action.href} className="mt-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold no-underline">{action.label}</a>}
    </div>
  );
}

export function Glass({ children, className = '' }: { children: ReactNode; className?: string }) {
  const c = useColors();
  return <div className={`rounded-2xl shadow-lg ${className}`} style={{ background: c.card, border: `1px solid ${c.border}`, backdropFilter: 'blur(20px)' }}>{children}</div>;
}

export function Btn({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: 'primary' | 'secondary' }) {
  const c = useColors();
  if (variant === 'secondary') return <button className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border-none cursor-pointer ${className}`} style={{ background: c.bg2, color: c.fg }} {...props}>{children}</button>;
  return <button className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 border-none cursor-pointer shadow-lg ${className}`} style={{ background: c.accent, color: '#fff', boxShadow: `0 8px 24px ${c.glow}` }} {...props}>{children}</button>;
}
