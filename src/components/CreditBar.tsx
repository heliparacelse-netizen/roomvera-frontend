// /roomvera-frontend/src/components/CreditBar.tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useColors } from '@/hooks/useColors';
import Link from 'next/link';

export function CreditBar() {
  const { credits, maxCredits, user } = useAuth();
  const c = useColors();
  if (!user) return null;
  const pct = maxCredits === Infinity ? 100 : Math.min(100, (credits / maxCredits) * 100);
  const low = credits <= 3 && credits > 0;
  const empty = credits === 0;
  return (
    <div className="rounded-2xl p-4 mb-6" style={{ background: c.card, border: `1px solid ${empty ? 'rgba(239,68,68,0.2)' : low ? 'rgba(251,146,60,0.2)' : c.border}` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><i className="fa-solid fa-coins text-sm" style={{ color: empty ? '#EF4444' : low ? '#FB923C' : c.accent }} /><span className="text-sm font-semibold" style={{ color: c.fg }}>{credits} crédit{credits !== 1 ? 's' : ''}</span></div>
        {maxCredits !== Infinity && <span className="text-xs" style={{ color: c.muted }}>sur {maxCredits}</span>}
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: c.bg2 }}><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: empty ? '#EF4444' : low ? '#FB923C' : c.accent }} /></div>
      {low && !empty && <Link href="/tarifs" className="flex items-center gap-1.5 mt-2 text-xs font-semibold no-underline" style={{ color: '#FB923C' }}><i className="fa-solid fa-bolt" />Crédits faibles — Obtenir plus</Link>}
      {empty && <Link href="/tarifs" className="flex items-center gap-1.5 mt-2 text-xs font-semibold no-underline" style={{ color: '#EF4444' }}><i className="fa-solid fa-circle-exclamation" />Aucun crédit — Choisir un plan</Link>}
    </div>
  );
}
