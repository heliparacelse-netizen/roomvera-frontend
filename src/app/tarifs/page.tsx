// /roomvera-frontend/src/app/tarifs/page.tsx
'use client';
import { useState } from 'react';
import { PRICING } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useColors } from '@/hooks/useColors';
import { useReveal } from '@/hooks/useReveal';
import { checkoutAPI } from '@/lib/api';
import { Glass } from '@/components/ui';

export default function TarifsPage() {
  const [annual, setAnnual] = useState(false);
  const { user } = useAuth(); const toast = useToast(); const c = useColors(); const ref = useReveal();

  const handleSelect = async (plan: typeof PRICING[0]) => {
    if (plan.id === 'free') { toast(user ? 'Découverte' : 'Créez un compte', 'info'); return; }
    if (!user) { toast('Connectez-vous', 'error'); return; }
    try { const { url } = await checkoutAPI(plan.id); window.location.href = url; } catch { toast('Erreur', 'error'); }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 animate-fade-up">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: c.accent }}>Tarifs</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">Des crédits pour chaque besoin</h1>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full" style={{ background: c.bg2, border: `1px solid ${c.border}` }}>
            <span className={`text-sm font-medium ${!annual ? 'font-bold' : ''}`} style={{ color: !annual ? c.accent : c.muted }}>Mensuel</span>
            <button onClick={() => setAnnual(!annual)} className="w-11 h-6 rounded-full relative transition-colors border-none cursor-pointer" style={{ background: annual ? c.accent : c.border }}><div className="w-[18px] h-[18px] rounded-full bg-white absolute top-[3px] transition-all" style={{ left: annual ? '22px' : '3px' }} /></button>
            <span className={`text-sm font-medium ${annual ? 'font-bold' : ''}`} style={{ color: annual ? c.accent : c.muted }}>Annuel <span className="text-xs opacity-70">(-20%)</span></span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" ref={ref}>
          {PRICING.map((p, i) => {
            const price = p.price === 0 ? 0 : annual ? Math.round(p.price * 0.8 * 100) / 100 : p.price;
            return (
              <Glass key={p.id} className={`p-6 flex flex-col animate-fade-up relative ${p.popular ? 'ring-2 ring-brand-500' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: c.accent }}>Populaire</span>}
                <h3 className="font-display text-lg font-bold mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">{price === 0 ? <span className="font-display text-3xl font-bold">Gratuit</span> : (<><span className="font-display text-3xl font-bold">{price.toFixed(2)}€</span><span className="text-sm" style={{ color: c.muted }}>{p.period}</span></>)}</div>
                <div className="flex items-center gap-2 mb-5 pb-5" style={{ borderBottom: `1px solid ${c.border}` }}><i className="fa-solid fa-coins text-xs" style={{ color: c.accent }} /><span className="text-sm" style={{ color: c.fg2 }}>{p.credits === Infinity ? 'Illimités' : `${p.credits} crédits/mois`}</span></div>
                <ul className="space-y-2.5 mb-6 flex-1">{p.features.map(f => <li key={f} className="flex items-start gap-2 text-sm" style={{ color: c.fg2 }}><i className="fa-solid fa-check text-xs mt-0.5 text-emerald-500" />{f}</li>)}</ul>
                <button onClick={() => handleSelect(p)} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 border-none cursor-pointer" style={{ background: p.popular ? c.accent : c.bg2, color: p.popular ? '#fff' : c.fg }}>{p.cta}</button>
              </Glass>
            );
          })}
        </div>
      </div>
    </div>
  );
}
